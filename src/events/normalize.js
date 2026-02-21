import crypto from 'node:crypto';
import { calculateReliability } from './quality.js';
import { inferPlaceType, normalizePlaceType } from './placeType.js';

function normalizeCategory(value = '') {
  const source = String(value).toLowerCase();

  if (source.includes('music') || source.includes('concert') || source.includes('dj') || source.includes('jazz')) return 'music';
  if (source.includes('film') || source.includes('movie') || source.includes('cinema') || source.includes('screening')) return 'cinema';
  if (source.includes('art') || source.includes('gallery') || source.includes('museum') || source.includes('exhibition')) return 'art';
  if (source.includes('dance') || source.includes('salsa') || source.includes('bachata') || source.includes('kizomba')) return 'dance';
  if (source.includes('party') || source.includes('nightlife') || source.includes('club') || source.includes('afterparty')) return 'nightlife';
  if (source.includes('local') || source.includes('community') || source.includes('walk') || source.includes('outdoor')) return 'local';
  if (source.includes('vintage') || source.includes('thrift') || source.includes('second hand')) return 'vintage';
  if (source.includes('brand') || source.includes('design') || source.includes('label')) return 'brand';
  if (source.includes('fair') || source.includes('bazaar') || source.includes('craft fair')) return 'fair';
  if (source.includes('market') || source.includes('expo') || source.includes('trade')) return 'market';
  if (source.includes('sport') || source.includes('run') || source.includes('surf')) return 'sport';
  if (source.includes('festival') || source.includes('carnival') || source.includes('pride')) return 'festival';

  return source || 'other';
}

function normalizeDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function cleanText(value = '') {
  return String(value).replace(/\s+/g, ' ').trim();
}

export function normalizeRawEvent(raw, source) {
  const title = cleanText(raw.title || raw.summary || raw.name || '');
  const startAt = normalizeDate(raw.startAt || raw.start || raw.dtstart || raw.date);
  const endAt = normalizeDate(raw.endAt || raw.end || raw.dtend);
  const venue = cleanText(raw.venue || raw.location || '');
  const address = cleanText(raw.address || '');
  const description = cleanText(raw.description || raw.details || '');
  const sourceUrl = raw.sourceUrl || raw.url || source.url;
  const ticketsUrl = raw.ticketsUrl || raw.ticketUrl || raw.url || '';
  const imageUrl = cleanText(raw.imageUrl || raw.image || '');

  const idSeed = `${title}|${startAt}|${venue}|${source.id}`;
  const id = crypto.createHash('sha256').update(idSeed).digest('hex').slice(0, 18);

  const event = {
    id,
    title,
    description,
    startAt,
    endAt,
    venue,
    address,
    category: normalizeCategory(raw.category || raw.categories || source.categoryHint || ''),
    placeType: normalizePlaceType(raw.placeType || '') || inferPlaceType(venue, address),
    price: raw.price ? String(raw.price) : '',
    currency: raw.currency || 'ZAR',
    sourceName: source.name,
    sourceUrl,
    ticketsUrl,
    imageUrl,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    verified: Boolean(source.reliable)
  };

  event.reliabilityScore = calculateReliability(event);
  return event;
}
