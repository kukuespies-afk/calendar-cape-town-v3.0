function unfoldLines(content) {
  return content.replace(/\r\n[ \t]/g, '');
}

function parseDate(value) {
  if (!value) return null;

  if (/^\d{8}$/.test(value)) {
    const year = Number(value.slice(0, 4));
    const month = Number(value.slice(4, 6)) - 1;
    const day = Number(value.slice(6, 8));
    return new Date(Date.UTC(year, month, day)).toISOString();
  }

  if (/^\d{8}T\d{6}Z$/.test(value)) {
    const year = Number(value.slice(0, 4));
    const month = Number(value.slice(4, 6)) - 1;
    const day = Number(value.slice(6, 8));
    const hour = Number(value.slice(9, 11));
    const min = Number(value.slice(11, 13));
    const sec = Number(value.slice(13, 15));
    return new Date(Date.UTC(year, month, day, hour, min, sec)).toISOString();
  }

  if (/^\d{8}T\d{6}$/.test(value)) {
    const year = Number(value.slice(0, 4));
    const month = Number(value.slice(4, 6)) - 1;
    const day = Number(value.slice(6, 8));
    const hour = Number(value.slice(9, 11));
    const min = Number(value.slice(11, 13));
    const sec = Number(value.slice(13, 15));
    return new Date(year, month, day, hour, min, sec).toISOString();
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }

  return null;
}

export function parseIcs(content) {
  const normalized = unfoldLines(content);
  const blocks = normalized.split('BEGIN:VEVENT').slice(1);

  return blocks.map((block) => {
    const eventText = block.split('END:VEVENT')[0] || '';
    const lines = eventText.split(/\r?\n/).map((line) => line.trim());

    const props = {};
    for (const line of lines) {
      if (!line || !line.includes(':')) continue;
      const colonIndex = line.indexOf(':');
      const keyPart = line.slice(0, colonIndex);
      const key = keyPart.split(';')[0].toUpperCase();
      const value = line.slice(colonIndex + 1);
      props[key] = value;
    }

    return {
      title: props.SUMMARY || '',
      description: props.DESCRIPTION || '',
      location: props.LOCATION || '',
      startAt: parseDate(props.DTSTART),
      endAt: parseDate(props.DTEND),
      url: props.URL || '',
      categories: props.CATEGORIES || ''
    };
  });
}
