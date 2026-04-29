import crypto from 'node:crypto';
import { calculateReliability } from './quality.js';
import { inferPlaceType, normalizePlaceType } from './placeType.js';

function normalizeCategory(value = '') {
  const source = String(value).toLowerCase();

  if (
    source.includes('music') ||
    source.includes('concert') ||
    source.includes('dj') ||
    source.includes('jazz') ||
    source.includes('choir') ||
    source.includes('orchestra') ||
    source.includes('band') ||
    source.includes('tribute') ||
    source.includes('reggae') ||
    source.includes('rock')
  ) return 'music';
  if (source.includes('film') || source.includes('movie') || source.includes('cinema') || source.includes('screening')) return 'cinema';
  if (
    source.includes('art') ||
    source.includes('gallery') ||
    source.includes('museum') ||
    source.includes('exhibition') ||
    source.includes('theatre') ||
    source.includes('theater') ||
    source.includes('opera') ||
    source.includes('musical') ||
    source.includes('ballet')
  ) return 'art';
  if (source.includes('dance') || source.includes('salsa') || source.includes('bachata') || source.includes('kizomba')) return 'dance';
  if (source.includes('party') || source.includes('nightlife') || source.includes('club') || source.includes('afterparty')) return 'nightlife';
  if (source.includes('local') || source.includes('community') || source.includes('walk') || source.includes('outdoor')) return 'local';
  if (source.includes('vintage') || source.includes('thrift') || source.includes('second hand')) return 'vintage';
  if (source.includes('brand') || source.includes('design') || source.includes('label')) return 'brand';
  if (source.includes('fair') || source.includes('bazaar') || source.includes('craft fair')) return 'fair';
  if (source.includes('market') || source.includes('expo') || source.includes('trade')) return 'market';
  if (
    source.includes('sport') ||
    source.includes('run') ||
    source.includes('surf') ||
    source.includes('rugby') ||
    source.includes('football') ||
    source.includes('soccer') ||
    source.includes('cricket') ||
    source.includes('tennis') ||
    source.includes('boxing') ||
    source.includes('basketball') ||
    source.includes('marathon') ||
    source.includes('race') ||
    source.includes('match') ||
    source.includes('vs ')
  ) return 'sport';
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
  const sourceRole = cleanText(source.sourceRole || 'official') || 'official';
  const fallbackUrl = cleanText(raw.url || raw.link || '');
  const title = cleanText(raw.title || raw.summary || raw.name || '');
  const startAt = normalizeDate(raw.startAt || raw.start || raw.dtstart || raw.date);
  const endAt = normalizeDate(raw.endAt || raw.end || raw.dtend);
  const venue = cleanText(raw.venue || raw.location || '');
  const address = cleanText(raw.address || '');
  const description = cleanText(raw.description || raw.details || '');
  const sourceUrl = cleanText(
    raw.sourceUrl || raw.officialUrl || (sourceRole === 'official' ? fallbackUrl || source.url : '')
  );
  const discoveryUrl = cleanText(raw.discoveryUrl || (sourceRole === 'discovery' ? fallbackUrl || source.url : ''));
  const ticketsUrl = cleanText(raw.ticketsUrl || raw.ticketUrl || fallbackUrl || '');
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
    sourceId: source.id,
    sourceRole,
    sourceName: source.name,
    sourceUrl,
    discoverySourceName: sourceRole === 'discovery' ? source.name : cleanText(raw.discoverySourceName || ''),
    discoveryUrl,
    ticketsUrl,
    imageUrl,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    verified: Boolean(source.reliable)
  };

  event.reliabilityScore = calculateReliability(event);
  return event;
}
