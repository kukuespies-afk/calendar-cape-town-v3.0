function escapeText(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function toIcsDate(dateLike) {
  return new Date(dateLike).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

export function generateIcs(events, calendarName = 'Cape Town Afisha') {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AFISHA CAPE//Events Calendar//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(calendarName)}`
  ];

  for (const event of events) {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${event.id || `${event.title}-${event.startAt}`}`);
    lines.push(`DTSTAMP:${toIcsDate(new Date())}`);
    lines.push(`DTSTART:${toIcsDate(event.startAt)}`);
    if (event.endAt) {
      lines.push(`DTEND:${toIcsDate(event.endAt)}`);
    }
    lines.push(`SUMMARY:${escapeText(event.title)}`);
    if (event.description) {
      lines.push(`DESCRIPTION:${escapeText(event.description)}`);
    }
    if (event.venue) {
      lines.push(`LOCATION:${escapeText(event.venue)}`);
    }
    if (event.sourceUrl) {
      lines.push(`URL:${escapeText(event.sourceUrl)}`);
    }
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}
