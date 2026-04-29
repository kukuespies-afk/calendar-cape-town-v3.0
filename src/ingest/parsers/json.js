function cleanText(value = '') {
  return String(value).replace(/\s+/g, ' ').trim();
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
}

function lookupFirst(attributes = {}, keys = []) {
  for (const key of keys) {
    const value = attributes?.[key];
    if (value != null && value !== '') return value;
  }
  return '';
}

function coerceDhlStartAt(dateValue = '', timeValue = '') {
  const dateText = cleanText(dateValue);
  const timeText = cleanText(timeValue);
  if (!dateText) return '';
  if (!timeText) return `${dateText}T19:00:00+02:00`;
  if (/[zZ]|[+\-]\d{2}:?\d{2}$/.test(timeText) || /[zZ]|[+\-]\d{2}:?\d{2}$/.test(dateText)) {
    return `${dateText}T${timeText}`.replace('TT', 'T');
  }
  return `${dateText}T${timeText}+02:00`;
}

function parseDhlStadiumCompetitions(payload, source = {}) {
  const items = Array.isArray(payload?.data) ? payload.data : [];

  return items
    .map((item) => {
      const attributes = item?.attributes || item || {};
      const title = cleanText(
        lookupFirst(attributes, ['title', 'name', 'eventTitle', 'matchTitle', 'heading', 'fixture'])
      );
      const dateValue = lookupFirst(attributes, ['startAt', 'startDate', 'start_date', 'date', 'eventDate', 'matchDate']);
      const timeValue = cleanText(
        lookupFirst(attributes, ['startTime', 'start_time', 'time', 'kickoff', 'kickOffTime'])
      );
      const startAt = coerceDhlStartAt(dateValue, timeValue);
      const categoryHint = cleanText(
        [
          lookupFirst(attributes, ['category', 'type', 'eventType']),
          lookupFirst(attributes, ['competition', 'league', 'genre'])
        ]
          .filter(Boolean)
          .join(' ')
      );
      const derivedCategory = categoryHint || (/vs |stormers|springboks|rugby|match/i.test(title) ? 'sport' : source.categoryHint || '');
      const tags = [
        ...toArray(attributes.tags),
        ...toArray(attributes.teamNames),
        ...toArray(attributes.homeTeam),
        ...toArray(attributes.awayTeam)
      ]
        .map((value) => cleanText(typeof value === 'string' ? value : value?.name || value?.title || ''))
        .filter(Boolean);
      const officialUrl = cleanText(
        lookupFirst(attributes, ['sourceUrl', 'url', 'pageUrl', 'link', 'eventUrl', 'ticketUrl', 'ticketsUrl', 'bookingUrl', 'buyLink'])
      );
      const ticketUrl = cleanText(
        lookupFirst(attributes, ['ticketsUrl', 'ticketUrl', 'bookingUrl', 'buyLink'])
      ) || officialUrl;

      return {
        title,
        startAt,
        endAt: lookupFirst(attributes, ['endAt', 'endDate', 'end_date']),
        venue: cleanText(lookupFirst(attributes, ['venue', 'location'])) || 'DHL Stadium',
        address: 'Fritz Sonnenberg Road, Green Point, Cape Town 8051',
        description: cleanText(lookupFirst(attributes, ['description', 'summary', 'subtitle'])),
        category: derivedCategory || 'sport',
        sourceUrl: officialUrl || 'https://dhlstadium.co.za/events',
        ticketsUrl: ticketUrl || 'https://dhlstadium.co.za/events',
        tags
      };
    })
    .filter((event) => event.title && event.startAt);
}

export function parseJsonFeed(payload, source = {}) {
  if (source.id === 'dhl-stadium-events') {
    return parseDhlStadiumCompetitions(payload, source);
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.events)) {
    return payload.events;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  return [];
}
