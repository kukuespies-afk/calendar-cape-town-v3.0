import { parseHtmlJsonLd } from './htmlJsonLd.js';

const TZ_OFFSET = '+02:00';

const MONTHS = {
  january: 1,
  jan: 1,
  february: 2,
  feb: 2,
  march: 3,
  mar: 3,
  april: 4,
  apr: 4,
  may: 5,
  june: 6,
  jun: 6,
  july: 7,
  jul: 7,
  august: 8,
  aug: 8,
  september: 9,
  sep: 9,
  sept: 9,
  october: 10,
  oct: 10,
  november: 11,
  nov: 11,
  december: 12,
  dec: 12
};

const WEEKLY_MOJO_TEMPLATES = [
  { title: 'Mojo Karaoke Mondays', weekday: 1, time: '19:00', category: 'music', description: 'Official weekly karaoke night at Mojo Market.', tags: ['karaoke', 'live music', 'free'], price: 'Free' },
  { title: 'Mojo Jazzy Tuesdays', weekday: 2, time: '19:30', category: 'music', description: 'Official weekly jazz session at Mojo Market.', tags: ['jazz', 'live music', 'free'], price: 'Free' },
  { title: 'Mojo Movie Club Wednesdays', weekday: 3, time: '21:30', category: 'cinema', description: 'Official weekly movie club screening at Mojo Market.', tags: ['cinema', 'community', 'free'], price: 'Free' },
  { title: 'Mojo Silly Thursdays', weekday: 4, time: '19:30', category: 'nightlife', description: 'Official weekly Thursday social at Mojo Market.', tags: ['nightlife', 'social'], price: 'Free' },
  { title: 'Mojo Zumba Sunday Mornings', weekday: 0, time: '10:00', category: 'sport', description: 'Official weekly community workout session at Mojo Market.', tags: ['zumba', 'fitness', 'community'], price: 'Free' },
  { title: 'Mojo Salsa Sundays', weekday: 0, time: '19:00', category: 'dance', description: 'Official weekly salsa social at Mojo Market.', tags: ['salsa', 'dance', 'social'], price: 'Free' }
];

function cleanText(value = '') {
  return String(value).replace(/\s+/g, ' ').trim();
}

function normalizeKey(value = '') {
  return cleanText(value)
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function decodeHtml(value = '') {
  return String(value)
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, '\'')
    .replace(/&#8211;|&ndash;/gi, '-')
    .replace(/&#8212;|&mdash;/gi, '-')
    .replace(/&#8217;|&rsquo;/gi, '\'')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function htmlToLines(html = '') {
  const text = decodeHtml(html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, '\n')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '\n')
    .replace(/<\/?(?:p|div|section|article|header|footer|aside|main|nav|li|ul|ol|table|tr|td|th|h1|h2|h3|h4|h5|h6|br)\b[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\r/g, '\n');

  return text
    .split('\n')
    .map((line) => cleanText(line))
    .filter(Boolean);
}

function extractAnchors(html = '', baseUrl = '') {
  const anchors = [];
  const regex = /<a\b[^>]*href=(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const href = absolutizeUrl(match[2], baseUrl);
    const text = cleanText(decodeHtml(match[3].replace(/<[^>]+>/g, ' ')));
    if (href && text) anchors.push({ text, key: normalizeKey(text), href });
  }

  return anchors;
}

function absolutizeUrl(href = '', baseUrl = '') {
  try {
    return new URL(href, baseUrl).href;
  } catch {
    return '';
  }
}

function findAnchorUrl(anchors, title, fallback = '') {
  const key = normalizeKey(title);
  const hit = anchors.find((anchor) => anchor.key.includes(key) || key.includes(anchor.key));
  return hit?.href || fallback;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function buildIso(year, month, day, hours = '19', minutes = '00') {
  return `${year}-${pad(month)}-${pad(day)}T${pad(hours)}:${pad(minutes)}:00${TZ_OFFSET}`;
}

function parse24Hour(value = '') {
  const match = cleanText(value).match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  return { hours: Number(match[1]), minutes: Number(match[2]) };
}

function parse12Hour(value = '') {
  const match = cleanText(value).match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2] || '0');
  const meridiem = match[3].toLowerCase();

  if (meridiem === 'pm' && hours < 12) hours += 12;
  if (meridiem === 'am' && hours === 12) hours = 0;

  return { hours, minutes };
}

function monthNumber(name = '') {
  return MONTHS[cleanText(name).toLowerCase()] || null;
}

function englishDateToIso(dateLabel = '', timeLabel = '') {
  const dateMatch = cleanText(dateLabel).match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);
  const time = parse12Hour(timeLabel);
  if (!dateMatch || !time) return '';

  const month = monthNumber(dateMatch[1]);
  if (!month) return '';

  return buildIso(dateMatch[3], month, dateMatch[2], time.hours, time.minutes);
}

function parseHourSeparatorTime(value = '') {
  const match = cleanText(value).match(/^(\d{1,2})h(\d{2})$/i);
  if (!match) return null;
  return { hours: Number(match[1]), minutes: Number(match[2]) };
}

function longMonthDateToIso(dateLabel = '', timeLabel = '') {
  const dateMatch = cleanText(dateLabel).match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  const time = parseHourSeparatorTime(timeLabel) || parse24Hour(timeLabel) || parse12Hour(timeLabel);
  if (!dateMatch || !time) return '';

  const month = monthNumber(dateMatch[2]);
  if (!month) return '';

  return buildIso(dateMatch[3], month, dateMatch[1], time.hours, time.minutes);
}

function rangeToIso(rangeLine = '', fallbackYear = '') {
  const match = cleanText(rangeLine).match(
    /^(\d{1,2})\s+([A-Za-z]+)\s*\/\s*(\d{1,2}:\d{2}\s*(?:am|pm))\s*-\s*(\d{1,2})\s+([A-Za-z]+)\s*\/\s*(\d{1,2}:\d{2}\s*(?:am|pm))$/i
  );
  if (!match) return { startAt: '', endAt: '' };

  const startMonth = monthNumber(match[2]);
  const endMonth = monthNumber(match[5]);
  const startTime = parse12Hour(match[3]);
  const endTime = parse12Hour(match[6]);
  if (!startMonth || !endMonth || !startTime || !endTime) return { startAt: '', endAt: '' };

  return {
    startAt: buildIso(fallbackYear, startMonth, match[1], startTime.hours, startTime.minutes),
    endAt: buildIso(fallbackYear, endMonth, match[4], endTime.hours, endTime.minutes)
  };
}

function inferCategory(value = '') {
  const text = cleanText(value).toLowerCase();

  if (/(rugby|stormers|springboks|match|vs |stadium|football|soccer|cricket|tennis|run|marathon|race|motorsport|fitness|zumba|parkrun)/.test(text)) return 'sport';
  if (/(movie|cinema|screening|film)/.test(text)) return 'cinema';
  if (/(concert|tour|music|jazz|orchestra|band|tribute|live|choir|hip-hop|reggae|rock)/.test(text)) return 'music';
  if (/(opera|theatre|theater|musical|ballet|art|gallery|museum|exhibition)/.test(text)) return 'art';
  if (/(dance|salsa|bachata|kizomba)/.test(text)) return 'dance';
  if (/(festival|camping)/.test(text)) return 'festival';
  if (/(party|nightlife|karaoke|social)/.test(text)) return 'nightlife';

  return '';
}

function inferTicketmasterCategory(title = '', venue = '') {
  const text = `${cleanText(title)} ${cleanText(venue)}`.toLowerCase();
  if (/(stormers|springboks|rugby|football|soccer|cricket|match|vs )/.test(text)) return 'sport';
  if (/(disney|circus|magic|on ice|family)/.test(text)) return 'festival';
  if (/(opera|musical|ballet|theatre|theater|comedy)/.test(text)) return 'art';
  return 'music';
}

function uniqueRawEvents(events = []) {
  const seen = new Set();
  return events.filter((event) => {
    const key = `${cleanText(event.title).toLowerCase()}|${cleanText(event.startAt)}|${cleanText(event.venue).toLowerCase()}`;
    if (!event.title || !event.startAt || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sanitizeRawEvent(event = {}, source = {}) {
  const title = cleanText(decodeHtml(event.title || ''));
  const description = cleanText(decodeHtml(event.description || ''));
  const inferredCategory = inferCategory(`${title} ${description} ${event.category || ''}`);
  let venue = cleanText(decodeHtml(event.venue || event.location || ''));
  let address = cleanText(decodeHtml(event.address || ''));
  let category = cleanText(decodeHtml(event.category || ''));

  if (source.id === 'artscape-events') {
    venue = venue || 'Artscape Theatre Centre';
    address = address || 'D. F. Malan St, Foreshore, Cape Town';
    if (!category || (category === 'dance' && inferredCategory && inferredCategory !== 'dance')) {
      category = inferredCategory || 'art';
    }
  }

  if (source.id === 'mojo-market-events') {
    venue = venue || 'Mojo Market';
    address = address || '30 Regent Rd, Sea Point, Cape Town';
  }

  if (source.id === 'rocking-the-daisies') {
    venue = venue || 'Cloof Wine Estate';
    address = address || 'Darling, Western Cape';
  }

  return {
    ...event,
    title,
    description,
    venue,
    address,
    category: category || inferredCategory,
    sourceUrl: cleanText(event.sourceUrl || event.url || ''),
    ticketsUrl: cleanText(event.ticketsUrl || event.url || ''),
    tags: Array.isArray(event.tags) ? event.tags.map((tag) => cleanText(decodeHtml(tag))) : event.tags
  };
}

function parseTicketmasterHtml(html, source) {
  const lines = htmlToLines(html);
  const anchors = extractAnchors(html, source.url);
  const events = [];

  lines.forEach((line) => {
    const match = line.match(
      /Open additional information for\s+(.+?),\s+([^,]+)\s+(.+?)\s+(\d{4})\/(\d{2})\/(\d{2}),\s+(\d{2}:\d{2})/i
    );

    if (!match) return;

    const [, title, city, venue, year, month, day, time] = match;
    const parsedTime = parse24Hour(time);
    if (!parsedTime) return;

    events.push({
      title: cleanText(title),
      startAt: buildIso(year, month, day, parsedTime.hours, parsedTime.minutes),
      venue: cleanText(venue),
      address: `${cleanText(venue)}, ${cleanText(city)}`,
      category: inferCategory(`${title} ${venue}`) || inferTicketmasterCategory(title, venue),
      sourceUrl: findAnchorUrl(anchors, title, source.url),
      ticketsUrl: findAnchorUrl(anchors, title, source.url)
    });
  });

  return uniqueRawEvents(events);
}

function parseArtscapeHtml(html, source) {
  const lines = htmlToLines(html);
  const anchors = extractAnchors(html, source.url);
  const events = [];
  let currentYear = '';

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const monthHeader = line.match(/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})$/i);
    if (monthHeader) {
      currentYear = monthHeader[2];
      continue;
    }

    if (!currentYear) continue;
    if (!/^\d{1,2}\s+[A-Za-z]+\s*\/\s*\d{1,2}:\d{2}\s*(?:am|pm)\s*-\s*\d{1,2}\s+[A-Za-z]+\s*\/\s*\d{1,2}:\d{2}\s*(?:am|pm)$/i.test(line)) {
      continue;
    }

    const { startAt, endAt } = rangeToIso(line, currentYear);
    if (!startAt) continue;

    const title = cleanText(lines[index + 1] || '');
    const description = cleanText(lines[index + 2] || '');
    if (!title || /^read more$/i.test(title)) continue;

    events.push({
      title,
      description,
      startAt,
      endAt,
      venue: 'Artscape Theatre Centre',
      address: 'D. F. Malan St, Foreshore, Cape Town',
      category: inferCategory(`${title} ${description}`),
      sourceUrl: findAnchorUrl(anchors, title, source.url),
      ticketsUrl: findAnchorUrl(anchors, title, source.url)
    });
  }

  return uniqueRawEvents(events);
}

function generateWeeklySeries({ now = new Date(), days = 84, source, templates = [] }) {
  const events = [];
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  for (const template of templates) {
    const parsedTime = parse24Hour(template.time);
    if (!parsedTime) continue;

    for (let offset = 0; offset <= days; offset += 1) {
      const cursor = new Date(start);
      cursor.setDate(start.getDate() + offset);
      if (cursor.getDay() !== template.weekday) continue;

      const year = cursor.getFullYear();
      const month = cursor.getMonth() + 1;
      const day = cursor.getDate();
      events.push({
        title: template.title,
        description: template.description,
        startAt: buildIso(year, month, day, parsedTime.hours, parsedTime.minutes),
        venue: 'Mojo Market',
        address: '30 Regent Rd, Sea Point, Cape Town',
        category: template.category,
        price: template.price || 'Free',
        sourceUrl: source.url,
        ticketsUrl: source.url,
        tags: template.tags || []
      });
    }
  }

  return events;
}

function parseMojoHtml(html, source) {
  const lines = htmlToLines(html);
  const anchors = extractAnchors(html, source.url);
  const events = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^([A-Za-z]+ \d{1,2}, \d{4})\s+(\d{1,2}(?::\d{2})?\s*[AP]M)$/);
    if (!match) continue;

    const title = cleanText(lines[index + 1] || '');
    const description = cleanText(lines[index + 2] || '');
    const startAt = englishDateToIso(match[1], match[2]);
    if (!title || !startAt) continue;

    events.push({
      title,
      description,
      startAt,
      venue: 'Mojo Market',
      address: '30 Regent Rd, Sea Point, Cape Town',
      category: inferCategory(`${title} ${description}`),
      price: /free/i.test(description) ? 'Free' : '',
      sourceUrl: findAnchorUrl(anchors, title, source.url),
      ticketsUrl: findAnchorUrl(anchors, title, source.url)
    });
  }

  if (events.length) return uniqueRawEvents(events);

  return uniqueRawEvents(generateWeeklySeries({ source, templates: WEEKLY_MOJO_TEMPLATES }));
}

function parseRockingTheDaisiesHtml(html, source) {
  const text = htmlToLines(html).join('\n');
  const dateMatch = text.match(/(\d{1,2})\s*-\s*(\d{1,2})\s*(January|February|March|April|May|June|July|August|September|October|November|December)\s*(\d{4})/i);
  if (!dateMatch) return [];

  const month = monthNumber(dateMatch[3]);
  if (!month) return [];

  return [
    {
      title: 'Rocking the Daisies',
      description: 'Official Cape Town edition page for the music and lifestyle festival at Cloof Wine Estate.',
      startAt: buildIso(dateMatch[4], month, dateMatch[1], '08', '00'),
      endAt: buildIso(dateMatch[4], month, dateMatch[2], '23', '00'),
      venue: 'Cloof Wine Estate',
      address: 'Darling, Western Cape',
      category: 'festival',
      sourceUrl: source.url,
      ticketsUrl: source.url,
      tags: ['festival', 'music', 'camping']
    }
  ];
}

function parseGalileoHtml(html, source) {
  const events = [];
  const itemRegex = /<li class="wcs-class">([\s\S]*?)<\/li>/gi;
  let match;

  while ((match = itemRegex.exec(html)) !== null) {
    const block = match[1];
    const title = cleanText(
      decodeHtml(
        block.match(/<h3 class="wcs-class__title[^"]*">\s*([\s\S]*?)\s*<\/h3>/i)?.[1]?.replace(/<[^>]+>/g, ' ') || ''
      )
    );
    const dateLabel = cleanText(decodeHtml(block.match(/<time datetime="([^"]+)"/i)?.[1] || ''));
    const venue = cleanText(
      decodeHtml(block.match(/Venue:\s*<\/span>\s*<span>([\s\S]*?)<\/span>/i)?.[1]?.replace(/<[^>]+>/g, ' ') || '')
    );
    const doorsOpen = cleanText(
      decodeHtml(block.match(/Doors Open:\s*<\/span>\s*<span>([\s\S]*?)<\/span>/i)?.[1]?.replace(/<[^>]+>/g, ' ') || '')
    );
    const movieStarts = cleanText(
      decodeHtml(block.match(/Movie Starts:\s*<\/span>\s*<span>([\s\S]*?)<\/span>/i)?.[1]?.replace(/<[^>]+>/g, ' ') || '')
    );
    const genre = cleanText(
      decodeHtml(block.match(/Genre:\s*<\/span>\s*<span>([\s\S]*?)<\/span>/i)?.[1]?.replace(/<[^>]+>/g, ' ') || '')
    );
    const infoUrl = absolutizeUrl(block.match(/<a class="wcs-btn wcs-modal-call" href="([^"]+)"/i)?.[1] || '', source.url);

    const startAt = longMonthDateToIso(dateLabel, movieStarts || doorsOpen);
    if (!title || !startAt) continue;

    const tags = genre
      ? genre
          .split(/\s+/)
          .map((value) => cleanText(value).toLowerCase())
          .filter(Boolean)
      : ['cinema', 'outdoors'];

    events.push({
      title,
      description: venue
        ? `Official open-air movie screening by The Galileo at ${venue}.`
        : 'Official open-air movie screening by The Galileo.',
      startAt,
      venue: venue || 'The Galileo Open Air Cinema',
      address: venue || 'Cape Town',
      category: 'cinema',
      price: 'Paid',
      sourceUrl: infoUrl || source.url,
      ticketsUrl: infoUrl || source.url,
      tags
    });
  }

  return uniqueRawEvents(events);
}

export function parseHtmlSource(html, source) {
  const jsonLd = parseHtmlJsonLd(html).map((event) => sanitizeRawEvent(event, source));
  let sourceSpecific = [];

  switch (source.id) {
    case 'ticketmaster-cape-town':
      sourceSpecific = parseTicketmasterHtml(html, source);
      break;
    case 'artscape-events':
      sourceSpecific = parseArtscapeHtml(html, source);
      break;
    case 'mojo-market-events':
      sourceSpecific = parseMojoHtml(html, source);
      break;
    case 'rocking-the-daisies':
      sourceSpecific = parseRockingTheDaisiesHtml(html, source);
      break;
    case 'galileo-open-air':
      sourceSpecific = parseGalileoHtml(html, source);
      break;
    default:
      sourceSpecific = [];
  }

  return uniqueRawEvents([...sourceSpecific, ...jsonLd].map((event) => sanitizeRawEvent(event, source)));
}
