import fs from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { generateIcs } from '../src/events/ics.js';
import { buildGoogleCalendarTemplateUrl, buildMapEmbedUrl, buildMapSearchUrl } from '../src/events/googleCalendar.js';

const events = JSON.parse(fs.readFileSync('data/events.json', 'utf8'));
const indexHtml = fs.readFileSync('public/index.html', 'utf8');
const appJs = fs.readFileSync('public/app.js', 'utf8');
const serverJs = fs.readFileSync('src/server.js', 'utf8');

test('mvp smoke: event cards have required source and core fields', () => {
  assert.ok(events.length > 0, 'events dataset should not be empty');

  const broken = events.filter((event) => {
    const hasTitle = Boolean(String(event.title || '').trim());
    const hasStart = Boolean(String(event.startAt || '').trim());
    const hasVenueOrAddress = Boolean(String(event.venue || '').trim() || String(event.address || '').trim());
    const hasCategory = Boolean(String(event.category || '').trim());
    const hasSource = Boolean(String(event.sourceUrl || '').trim());
    return !(hasTitle && hasStart && hasVenueOrAddress && hasCategory && hasSource);
  });

  assert.equal(
    broken.length,
    0,
    `events with missing required card fields: ${broken.slice(0, 5).map((event) => event.id).join(', ')}`
  );
});

test('mvp smoke: map and google calendar links are generated', () => {
  const sample = events[0];
  assert.ok(sample, 'sample event is required');

  const mapUrl = buildMapSearchUrl(sample);
  const mapEmbedUrl = buildMapEmbedUrl(sample);
  const calendarUrl = buildGoogleCalendarTemplateUrl(sample);

  assert.ok(mapUrl.startsWith('https://www.google.com/maps/search/'));
  assert.ok(mapEmbedUrl.includes('output=embed'));
  assert.ok(calendarUrl.startsWith('https://calendar.google.com/calendar/render?'));
});

test('mvp smoke: single-event ics generation has one VEVENT', () => {
  const sample = events[0];
  const ics = generateIcs([sample]);

  const veventCount = (ics.match(/BEGIN:VEVENT/g) || []).length;
  assert.equal(veventCount, 1);
  assert.ok(ics.includes('BEGIN:VCALENDAR'));
  assert.ok(ics.includes('END:VCALENDAR'));
});

test('mvp smoke: index includes calendar/map/saved and en-ru switch', () => {
  assert.match(indexHtml, /data-view="calendar"/);
  assert.match(indexHtml, /data-view="map"/);
  assert.match(indexHtml, /data-view="saved"/);
  assert.match(indexHtml, /data-lang="en"/);
  assert.match(indexHtml, /data-lang="ru"/);
  assert.match(indexHtml, /id="mapFrame"/);
  assert.match(indexHtml, /id="savedList"/);
  assert.match(indexHtml, /id="drawerGoogleButton"/);
  assert.match(indexHtml, /id="drawerIcsButton"/);
});

test('mvp smoke: app logic includes direct google oauth fallback switch', () => {
  assert.match(appJs, /googleCalendarDirectInsertEnabled/);
  assert.match(appJs, /\/api\/google\/oauth\/start\?eventId=/);
  assert.match(appJs, /\/api\/calendar\.ics\?eventId=/);
});

test('mvp smoke: server includes google oauth and event-level ics endpoints', () => {
  assert.match(serverJs, /\/api\/calendar\.ics/);
  assert.match(serverJs, /eventId/);
  assert.match(serverJs, /\/api\/google\/oauth\/start/);
  assert.match(serverJs, /\/api\/google\/oauth\/callback/);
});
