function cleanText(value = '') {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function toGoogleDate(dateLike) {
  return new Date(dateLike).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

export function buildMapSearchQuery(event = {}) {
  const chunks = [cleanText(event.venue), cleanText(event.address), 'Cape Town'].filter(Boolean);
  return chunks.join(', ');
}

export function buildMapSearchUrl(event = {}) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(buildMapSearchQuery(event))}`;
}

export function buildMapEmbedUrl(event = {}) {
  return `https://www.google.com/maps?q=${encodeURIComponent(buildMapSearchQuery(event))}&output=embed`;
}

export function normalizeEventEndAt(event = {}, fallbackHours = 2) {
  if (event.endAt) {
    return new Date(event.endAt).toISOString();
  }

  const start = new Date(event.startAt);
  if (Number.isNaN(start.getTime())) {
    return new Date(Date.now() + fallbackHours * 60 * 60 * 1000).toISOString();
  }

  return new Date(start.getTime() + fallbackHours * 60 * 60 * 1000).toISOString();
}

export function buildGoogleCalendarTemplateUrl(event = {}, sourceLabel = 'Source') {
  const details = [
    cleanText(event.description),
    event.sourceUrl ? `${sourceLabel}: ${event.sourceUrl}` : ''
  ]
    .filter(Boolean)
    .join('\n\n');

  const params = new URLSearchParams();
  params.set('action', 'TEMPLATE');
  params.set('text', cleanText(event.title) || 'Cape Town Event');
  params.set('dates', `${toGoogleDate(event.startAt)}/${toGoogleDate(normalizeEventEndAt(event))}`);
  params.set('location', buildMapSearchQuery(event));
  if (details) params.set('details', details);
  if (event.sourceUrl) params.set('sprop', `website:${event.sourceUrl}`);

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildGoogleCalendarInsertPayload(event = {}, timezone = 'Africa/Johannesburg', sourceLabel = 'Source') {
  const title = cleanText(event.title) || 'Cape Town Event';
  const description = [
    cleanText(event.description),
    event.sourceUrl ? `${sourceLabel}: ${event.sourceUrl}` : ''
  ]
    .filter(Boolean)
    .join('\n\n');

  const payload = {
    summary: title,
    description,
    location: buildMapSearchQuery(event),
    start: {
      dateTime: new Date(event.startAt).toISOString(),
      timeZone: timezone
    },
    end: {
      dateTime: normalizeEventEndAt(event),
      timeZone: timezone
    }
  };

  if (event.sourceUrl) {
    payload.source = {
      title: cleanText(event.sourceName) || sourceLabel,
      url: event.sourceUrl
    };
  }

  return payload;
}
