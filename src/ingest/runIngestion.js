import { getSources, upsertEvents } from '../data/repository.js';
import { normalizeRawEvent } from '../events/normalize.js';
import { validateEvent } from '../events/quality.js';
import { dedupeEvents } from '../events/dedupe.js';
import { parseIcs } from './parsers/ical.js';
import { parseJsonFeed } from './parsers/json.js';
import { parseHtmlJsonLd } from './parsers/htmlJsonLd.js';

function interpolateEnv(value) {
  if (typeof value !== 'string') return value;
  return value.replace(/\$\{([A-Z0-9_]+)\}/g, (_, key) => process.env[key] || '');
}

function headersWithEnv(headers = {}) {
  return Object.fromEntries(Object.entries(headers).map(([key, value]) => [key, interpolateEnv(value)]));
}

async function fetchSource(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(source.url, {
      headers: headersWithEnv(source.headers),
      signal: controller.signal
    });

    if (!response.ok) {
      return { source, events: [], error: `http_${response.status}` };
    }

    if (source.type === 'ical') {
      const text = await response.text();
      return { source, events: parseIcs(text), error: null };
    }

    if (source.type === 'html') {
      const text = await response.text();
      return { source, events: parseHtmlJsonLd(text), error: null };
    }

    const json = await response.json();
    return { source, events: parseJsonFeed(json), error: null };
  } catch (error) {
    return { source, events: [], error: error.name === 'AbortError' ? 'timeout' : 'fetch_failed' };
  } finally {
    clearTimeout(timeout);
  }
}

export async function runIngestion() {
  const sources = await getSources();
  const active = sources.filter((source) => source.active);

  const sourceResults = [];
  const normalized = [];

  for (const source of active) {
    const result = await fetchSource(source);
    sourceResults.push({
      id: source.id,
      name: source.name,
      error: result.error,
      fetched: result.events.length
    });

    for (const rawEvent of result.events) {
      const event = normalizeRawEvent(rawEvent, source);
      const verdict = validateEvent(event);
      if (verdict.isValid) {
        normalized.push(event);
      }
    }
  }

  const deduped = dedupeEvents(normalized);
  const savedEvents = await upsertEvents(deduped);

  return {
    activeSources: active.length,
    rawEvents: normalized.length,
    savedEvents: savedEvents.length,
    sourceResults
  };
}
