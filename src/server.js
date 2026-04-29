import fs from 'node:fs/promises';
import http from 'node:http';
import crypto from 'node:crypto';
import path from 'node:path';
import { URL } from 'node:url';
import { config } from './config/index.js';
import { processBotCommand, isValidTelegramSecret } from './bot/telegram.js';
import { initRepository, getEvents, getSources, upsertEvents } from './data/repository.js';
import { generateIcs } from './events/ics.js';
import { buildGoogleCalendarInsertPayload, buildGoogleCalendarTemplateUrl } from './events/googleCalendar.js';
import { enrichEventWithAI } from './events/enrich.js';
import { dedupeEvents } from './events/dedupe.js';
import { filterEvents, eventsForThisWeek, eventsForThisMonth } from './events/query.js';
import { normalizeRawEvent } from './events/normalize.js';
import { validateEvent } from './events/quality.js';
import { refreshAllEvents } from './events/refreshAll.js';
import { nextNightlyRunAt } from './events/autoRefreshSchedule.js';
import { runIngestion } from './ingest/runIngestion.js';
import { readJsonBody, sendJson, sendText } from './lib/http.js';

const publicDir = path.join(process.cwd(), 'public');
let refreshInFlight = false;
const GOOGLE_OAUTH_STATE_TTL_MS = 10 * 60 * 1000;
const googleOauthStateStore = new Map();

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sendHtml(res, statusCode, html) {
  sendText(res, statusCode, html, 'text/html; charset=utf-8');
}

function oauthResultHtml({ title, message, linkUrl = '', linkLabel = '' }) {
  const action = linkUrl
    ? `<a href="${escapeHtml(linkUrl)}" target="_blank" rel="noreferrer">${escapeHtml(linkLabel || 'Open link')}</a>`
    : '';

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      body { margin: 0; font-family: Arial, sans-serif; background: #f6f1e8; color: #111827; }
      main { max-width: 720px; margin: 64px auto; padding: 20px; background: #fff; border: 1px solid #d8dde3; border-radius: 14px; }
      h1 { margin: 0 0 10px; color: #0d2b45; }
      p { margin: 0 0 14px; line-height: 1.4; }
      a { display: inline-flex; padding: 10px 14px; border-radius: 10px; background: #0d2b45; color: #fff; text-decoration: none; }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(message)}</p>
      ${action}
    </main>
  </body>
</html>`;
}

function getGoogleRedirectUri() {
  return config.googleCalendarRedirectUri || `${config.publicBaseUrl}/api/google/oauth/callback`;
}

function isGoogleCalendarConfigured() {
  return Boolean(config.googleCalendarClientId && config.googleCalendarClientSecret && getGoogleRedirectUri());
}

function pruneGoogleOauthStates() {
  const now = Date.now();
  for (const [token, payload] of googleOauthStateStore.entries()) {
    if (!payload || payload.expiresAt <= now) {
      googleOauthStateStore.delete(token);
    }
  }
}

function createGoogleOauthState(eventId) {
  pruneGoogleOauthStates();
  const state = crypto.randomBytes(24).toString('hex');
  googleOauthStateStore.set(state, {
    eventId,
    expiresAt: Date.now() + GOOGLE_OAUTH_STATE_TTL_MS
  });
  return state;
}

function consumeGoogleOauthState(state) {
  pruneGoogleOauthStates();
  const payload = googleOauthStateStore.get(state);
  if (!payload) return null;
  googleOauthStateStore.delete(state);
  if (payload.expiresAt <= Date.now()) return null;
  return payload;
}

function buildGoogleOauthAuthorizeUrl(eventId) {
  const state = createGoogleOauthState(eventId);
  const params = new URLSearchParams({
    client_id: config.googleCalendarClientId,
    redirect_uri: getGoogleRedirectUri(),
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/calendar.events',
    access_type: 'offline',
    include_granted_scopes: 'true',
    prompt: 'consent',
    state
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

async function runRefreshCycle(trigger = 'manual') {
  if (refreshInFlight) {
    return {
      ok: false,
      skipped: true,
      reason: 'refresh_in_progress',
      trigger
    };
  }

  refreshInFlight = true;
  try {
    const result = await refreshAllEvents({ includeIngestion: config.autoRefreshIngestion });
    return {
      ...result,
      trigger,
      refreshedAt: new Date().toISOString()
    };
  } finally {
    refreshInFlight = false;
  }
}

async function serveStatic(req, res, pathname) {
  const filePath = pathname === '/' ? path.join(publicDir, 'index.html') : path.join(publicDir, pathname);
  if (!filePath.startsWith(publicDir)) {
    sendText(res, 403, 'Forbidden');
    return true;
  }

  try {
    const file = await fs.readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    const contentType = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.jpg': 'image/jpeg'
    }[extension] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(file);
    return true;
  } catch {
    return false;
  }
}

function isAuthorized(req) {
  if (!config.adminKey) return true;
  return req.headers['x-admin-key'] === config.adminKey;
}

function scheduleNightlyAutoRefresh() {
  const nextRun = nextNightlyRunAt({
    now: new Date(),
    timeZone: config.timezone,
    hour: config.autoRefreshNightlyHour,
    minute: config.autoRefreshNightlyMinute
  });
  const delayMs = Math.max(1000, nextRun.getTime() - Date.now());

  const timer = setTimeout(() => {
    runRefreshCycle('nightly')
      .then((result) => {
        if (!result.skipped) {
          console.log(`auto-refresh nightly: curated=${result.curatedUpserted || 0}, total=${result.totalEventsInStorage || 0}`);
        }
      })
      .catch((error) => {
        console.error('auto-refresh nightly error:', error.message);
      })
      .finally(() => {
        scheduleNightlyAutoRefresh();
      });
  }, delayMs);

  timer.unref();
  console.log(
    `auto-refresh nightly scheduled for ${nextRun.toISOString()} (${config.timezone} ${String(config.autoRefreshNightlyHour).padStart(2, '0')}:${String(config.autoRefreshNightlyMinute).padStart(2, '0')})`
  );
}

async function handleApi(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/health') {
    sendJson(res, 200, {
      ok: true,
      timezone: config.timezone,
      mode: config.databaseUrl ? 'postgres' : 'file',
      googleCalendarDirectInsertEnabled: isGoogleCalendarConfigured(),
      telegramBotUsername: config.telegramBotUsername,
      autoRefresh: {
        enabled: config.autoRefreshEnabled,
        onBoot: config.autoRefreshOnBoot,
        mode: config.autoRefreshMode,
        nightlyHour: config.autoRefreshNightlyHour,
        nightlyMinute: config.autoRefreshNightlyMinute,
        intervalMinutes: config.autoRefreshIntervalMinutes,
        includeIngestion: config.autoRefreshIngestion
      },
      now: new Date().toISOString()
    });
    return true;
  }

  if (req.method === 'GET' && url.pathname === '/api/sources') {
    const sources = await getSources();
    sendJson(res, 200, {
      sources
    });
    return true;
  }

  if (req.method === 'GET' && url.pathname === '/api/events') {
    const events = await getEvents();
    const start = url.searchParams.get('start');
    const end = url.searchParams.get('end');
    const category = url.searchParams.get('category');
    const placeType = url.searchParams.get('placeType');
    const q = url.searchParams.get('q');

    const filtered = filterEvents(events, { start, end, category, placeType, q });
    sendJson(res, 200, {
      total: filtered.length,
      events: filtered
    });
    return true;
  }

  if (req.method === 'GET' && url.pathname === '/api/events/week') {
    const events = await getEvents();
    sendJson(res, 200, { events: eventsForThisWeek(events) });
    return true;
  }

  if (req.method === 'GET' && url.pathname === '/api/events/month') {
    const events = await getEvents();
    sendJson(res, 200, { events: eventsForThisMonth(events) });
    return true;
  }

  if (req.method === 'GET' && url.pathname === '/api/calendar.ics') {
    const events = await getEvents();
    const eventId = url.searchParams.get('eventId');
    const selected = eventId ? events.filter((event) => String(event.id) === String(eventId)) : events;

    if (eventId && selected.length === 0) {
      sendJson(res, 404, { error: 'event_not_found' });
      return true;
    }

    const ics = generateIcs(selected);
    sendText(res, 200, ics, 'text/calendar; charset=utf-8');
    return true;
  }

  if (req.method === 'GET' && url.pathname === '/api/google/oauth/start') {
    if (!isGoogleCalendarConfigured()) {
      sendJson(res, 503, { error: 'google_calendar_not_configured' });
      return true;
    }

    const eventId = url.searchParams.get('eventId');
    if (!eventId) {
      sendJson(res, 400, { error: 'event_id_required' });
      return true;
    }

    const events = await getEvents();
    const event = events.find((item) => String(item.id) === String(eventId));
    if (!event) {
      sendJson(res, 404, { error: 'event_not_found' });
      return true;
    }

    const authorizeUrl = buildGoogleOauthAuthorizeUrl(event.id);
    res.writeHead(302, {
      Location: authorizeUrl,
      'Cache-Control': 'no-store'
    });
    res.end();
    return true;
  }

  if (req.method === 'GET' && url.pathname === '/api/google/oauth/callback') {
    if (!isGoogleCalendarConfigured()) {
      sendHtml(res, 503, oauthResultHtml({
        title: 'Google Calendar is not configured',
        message: 'Set Google Calendar env variables and retry from the app.'
      }));
      return true;
    }

    const oauthError = url.searchParams.get('error');
    if (oauthError) {
      sendHtml(res, 400, oauthResultHtml({
        title: 'Google authorization failed',
        message: `Google returned: ${oauthError}.`
      }));
      return true;
    }

    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    if (!code || !state) {
      sendHtml(res, 400, oauthResultHtml({
        title: 'Missing OAuth callback fields',
        message: 'Required code/state query params are missing.'
      }));
      return true;
    }

    const payload = consumeGoogleOauthState(state);
    if (!payload) {
      sendHtml(res, 400, oauthResultHtml({
        title: 'OAuth state expired',
        message: 'Please return to the app and start Add to Google Calendar again.'
      }));
      return true;
    }

    const events = await getEvents();
    const event = events.find((item) => String(item.id) === String(payload.eventId));
    if (!event) {
      sendHtml(res, 404, oauthResultHtml({
        title: 'Event not found',
        message: 'The selected event was not found in storage.'
      }));
      return true;
    }

    try {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          code,
          client_id: config.googleCalendarClientId,
          client_secret: config.googleCalendarClientSecret,
          redirect_uri: getGoogleRedirectUri(),
          grant_type: 'authorization_code'
        }).toString()
      });

      if (!tokenResponse.ok) {
        throw new Error(`token_exchange_failed_${tokenResponse.status}`);
      }

      const tokenPayload = await tokenResponse.json();
      const accessToken = tokenPayload.access_token;
      if (!accessToken) {
        throw new Error('token_exchange_missing_access_token');
      }

      const insertResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(buildGoogleCalendarInsertPayload(event, config.timezone))
      });

      const insertPayload = await insertResponse.json();
      if (!insertResponse.ok) {
        throw new Error(`calendar_insert_failed_${insertResponse.status}`);
      }

      sendHtml(res, 200, oauthResultHtml({
        title: 'Event added to Google Calendar',
        message: 'The event is now in your primary calendar.',
        linkUrl: insertPayload.htmlLink || 'https://calendar.google.com/calendar/u/0/r',
        linkLabel: 'Open Google Calendar'
      }));
      return true;
    } catch (error) {
      console.error('google calendar oauth callback failed:', error.message);
      sendHtml(res, 502, oauthResultHtml({
        title: 'Could not insert event directly',
        message: 'Open the fallback prefilled Google Calendar form instead.',
        linkUrl: buildGoogleCalendarTemplateUrl(event),
        linkLabel: 'Open prefilled Google Calendar form'
      }));
      return true;
    }
  }

  if (req.method === 'POST' && url.pathname === '/api/events') {
    if (!isAuthorized(req)) {
      sendJson(res, 401, { error: 'unauthorized' });
      return true;
    }

    const body = await readJsonBody(req);
    const payload = Array.isArray(body.events) ? body.events : [];
    const source = {
      id: 'manual',
      name: 'Manual Admin Entry',
      url: config.publicBaseUrl,
      categoryHint: 'other',
      reliable: true
    };

    const normalized = payload
      .map((item) => normalizeRawEvent(item, source))
      .filter((event) => validateEvent(event).isValid);

    const deduped = dedupeEvents(normalized);
    const events = await upsertEvents(deduped);

    sendJson(res, 200, {
      added: deduped.length,
      total: events.length
    });
    return true;
  }

  if (req.method === 'POST' && url.pathname === '/api/ingest') {
    if (!isAuthorized(req)) {
      sendJson(res, 401, { error: 'unauthorized' });
      return true;
    }
    const result = await runIngestion();
    sendJson(res, 200, result);
    return true;
  }

  if (req.method === 'POST' && url.pathname === '/api/refresh-all') {
    if (!isAuthorized(req)) {
      sendJson(res, 401, { error: 'unauthorized' });
      return true;
    }
    const result = await runRefreshCycle('api');
    sendJson(res, 200, result);
    return true;
  }

  if (req.method === 'POST' && url.pathname === '/api/ai/enrich') {
    if (!isAuthorized(req)) {
      sendJson(res, 401, { error: 'unauthorized' });
      return true;
    }

    const body = await readJsonBody(req);
    const event = await enrichEventWithAI(body.event || {});
    sendJson(res, 200, { event });
    return true;
  }

  if (req.method === 'POST' && url.pathname === '/api/telegram/webhook') {
    const secretHeader = req.headers['x-telegram-bot-api-secret-token'];
    if (!isValidTelegramSecret(secretHeader)) {
      sendJson(res, 401, { error: 'bad_telegram_secret' });
      return true;
    }

    const payload = await readJsonBody(req);
    if (payload.message) {
      await processBotCommand(payload.message);
    }
    sendJson(res, 200, { ok: true });
    return true;
  }

  return false;
}

async function main() {
  await initRepository();

  if (config.autoRefreshEnabled) {
    if (config.autoRefreshOnBoot) {
      runRefreshCycle('boot')
        .then((result) => {
          console.log(`auto-refresh boot: curated=${result.curatedUpserted || 0}, total=${result.totalEventsInStorage || 0}`);
        })
        .catch((error) => {
          console.error('auto-refresh boot error:', error.message);
        });
    }

    if (config.autoRefreshMode === 'interval') {
      const intervalMs = Math.max(15, config.autoRefreshIntervalMinutes) * 60 * 1000;
      const timer = setInterval(() => {
        runRefreshCycle('interval')
          .then((result) => {
            if (!result.skipped) {
              console.log(`auto-refresh interval: curated=${result.curatedUpserted || 0}, total=${result.totalEventsInStorage || 0}`);
            }
          })
          .catch((error) => {
            console.error('auto-refresh interval error:', error.message);
          });
      }, intervalMs);
      timer.unref();
    } else {
      scheduleNightlyAutoRefresh();
    }
  }

  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);

      if (url.pathname.startsWith('/api/')) {
        const handled = await handleApi(req, res, url);
        if (!handled) {
          sendJson(res, 404, { error: 'not_found' });
        }
        return;
      }

      const served = await serveStatic(req, res, url.pathname);
      if (!served) {
        sendText(res, 404, 'Not found');
      }
    } catch (error) {
      if (!res.headersSent) {
        sendJson(res, 500, {
          error: 'internal_error',
          detail: error.message
        });
      } else {
        res.end();
      }
    }
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Server could not start: port ${config.port} is already in use on ${config.host}.`);
      console.error(`Try: HOST=${config.host} PORT=${config.port + 1} npm run dev`);
      process.exit(1);
    }

    if (error.code === 'EPERM') {
      console.error(`Server could not bind to ${config.host}:${config.port}.`);
      console.error('Try setting HOST=127.0.0.1 or another free local port before running npm run dev.');
      process.exit(1);
    }

    console.error(error);
    process.exit(1);
  });

  server.listen(config.port, config.host, () => {
    console.log(`AFISHA CAPE server is running at ${config.publicBaseUrl} (host ${config.host}, port ${config.port})`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
