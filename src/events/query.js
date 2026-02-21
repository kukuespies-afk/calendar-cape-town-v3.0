import { addDays, endOfDay, inRange, startOfDay, startOfWeek } from '../lib/date.js';

const SEARCH_CONCEPTS = [
  {
    key: 'running',
    aliases: ['run', 'running', 'runner', 'jog', 'jogging', 'parkrun', '5k', '10k', 'trail', 'marathon', 'бег', 'забег', 'марафон', 'пробежка']
  },
  {
    key: 'racing',
    aliases: [
      'race',
      'racing',
      'motorsport',
      'drag',
      'drift',
      'kart',
      'karting',
      'rally',
      'гонка',
      'гонки',
      'рейс',
      'рейсинг',
      'автогонки',
      'картинг',
      'ралли'
    ]
  },
  {
    key: 'rugby',
    aliases: ['rugby', 'urc', 'stormers', 'регби']
  },
  {
    key: 'soccer',
    aliases: ['football', 'soccer', 'premier league', 'footy', 'футбол']
  },
  {
    key: 'music',
    aliases: ['music', 'concert', 'live', 'dj', 'band', 'jazz', 'музыка', 'концерт', 'джаз']
  },
  {
    key: 'cinema',
    aliases: ['cinema', 'movie', 'film', 'screening', 'кино', 'фильм', 'кинопоказ']
  },
  {
    key: 'market',
    aliases: ['market', 'bazaar', 'fair', 'expo', 'маркет', 'ярмарка', 'базар']
  },
  {
    key: 'vintage',
    aliases: ['vintage', 'thrift', 'pre-loved', 'retro', 'винтаж', 'секонд', 'thrifting']
  },
  {
    key: 'beach',
    aliases: ['beach', 'ocean', 'waterfront', 'пляж', 'океан', 'набережная']
  }
];

const tokenExpansionCache = new Map();

function normalizeForSearch(value = '') {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function searchableBlob(event) {
  const tags = Array.isArray(event.tags) ? event.tags.join(' ') : '';
  return normalizeForSearch([
    event.title,
    event.description,
    event.venue,
    event.address,
    tags,
    event.category,
    event.placeType,
    event.sourceName
  ]
    .filter(Boolean)
    .join(' '));
}

function levenshteinLimited(a, b, limit = 2) {
  if (a === b) return 0;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > limit) return limit + 1;

  let prev = new Array(lb + 1);
  let curr = new Array(lb + 1);
  for (let j = 0; j <= lb; j += 1) prev[j] = j;

  for (let i = 1; i <= la; i += 1) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= lb; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + cost
      );
      if (curr[j] < rowMin) rowMin = curr[j];
    }
    if (rowMin > limit) return limit + 1;
    [prev, curr] = [curr, prev];
  }

  return prev[lb];
}

function isSimilarToken(a, b) {
  if (a === b) return true;
  if (a.length >= 3 && (a.includes(b) || b.includes(a))) return true;
  if (a.length < 5 || b.length < 5) return false;
  if (a[0] !== b[0]) return false;
  const limit = a.length <= 6 ? 1 : 2;
  return levenshteinLimited(a, b, limit) <= limit;
}

function expandToken(token) {
  const normalized = normalizeForSearch(token);
  if (!normalized) return [normalized];

  const cached = tokenExpansionCache.get(normalized);
  if (cached) return cached;

  const terms = new Set([normalized]);

  for (const concept of SEARCH_CONCEPTS) {
    if (concept.aliases.some((alias) => isSimilarToken(normalized, normalizeForSearch(alias)))) {
      concept.aliases.forEach((alias) => terms.add(normalizeForSearch(alias)));
    }
  }

  if (normalized.endsWith('ing') && normalized.length > 5) {
    terms.add(normalized.slice(0, -3));
  }
  if (normalized.endsWith('s') && normalized.length > 4) {
    terms.add(normalized.slice(0, -1));
  }
  if (normalized.endsWith('ы') && normalized.length > 3) {
    terms.add(normalized.slice(0, -1));
  }

  const expanded = [...terms].filter(Boolean);
  tokenExpansionCache.set(normalized, expanded);
  return expanded;
}

function termMatchesBlob(term, blob, words) {
  if (!term) return false;
  if (term.length < 5) {
    return words.includes(term);
  }
  if (blob.includes(term)) return true;

  for (const word of words) {
    if (word.startsWith(term)) {
      return true;
    }
    if (word[0] === term[0] && Math.abs(word.length - term.length) <= 1 && levenshteinLimited(word, term, 1) <= 1) {
      return true;
    }
  }
  return false;
}

function smartQueryMatch(event, rawQuery) {
  const query = normalizeForSearch(rawQuery);
  if (!query) return true;

  const blob = searchableBlob(event);
  if (!blob) return false;
  if (blob.includes(query)) return true;

  const tokens = query.split(' ').filter((token) => token.length > 1);
  if (!tokens.length) return true;

  const words = blob.split(' ').filter(Boolean);
  return tokens.every((token) => {
    const variants = expandToken(token);
    return variants.some((term) => termMatchesBlob(term, blob, words));
  });
}

export function filterEvents(events, params = {}) {
  const start = params.start ? startOfDay(params.start) : null;
  const end = params.end ? endOfDay(params.end) : null;
  const category = params.category ? normalizeForSearch(params.category) : '';
  const placeType = params.placeType ? normalizeForSearch(params.placeType) : '';
  const q = params.q ? String(params.q) : '';

  return events.filter((event) => {
    if (start && end && !inRange(event.startAt, start, end)) {
      return false;
    }

    if (category && normalizeForSearch(event.category || '') !== category) {
      return false;
    }

    if (placeType && normalizeForSearch(event.placeType || '') !== placeType) {
      return false;
    }

    if (q && !smartQueryMatch(event, q)) {
      return false;
    }

    return true;
  });
}

export function eventsForThisWeek(events, baseDate = new Date()) {
  const start = startOfWeek(baseDate);
  const end = endOfDay(addDays(start, 6));
  return filterEvents(events, { start, end });
}

export function eventsForThisMonth(events, baseDate = new Date()) {
  const date = new Date(baseDate);
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  return filterEvents(events, { start, end });
}
