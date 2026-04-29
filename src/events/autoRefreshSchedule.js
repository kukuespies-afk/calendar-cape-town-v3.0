function offsetLabelToMinutes(label = '') {
  const match = String(label).match(/GMT([+\-]\d{1,2})(?::?(\d{2}))?/i);
  if (!match) return 0;
  const sign = match[1].startsWith('-') ? -1 : 1;
  const hours = Math.abs(Number(match[1]));
  const minutes = Number(match[2] || '0');
  return sign * (hours * 60 + minutes);
}

function zonedFormatter(timeZone) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  });
}

export function getTimeZoneOffsetMinutes(date, timeZone) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(date);

    const offsetLabel = parts.find((part) => part.type === 'timeZoneName')?.value || '';
    return offsetLabelToMinutes(offsetLabel);
  } catch {
    return 0;
  }
}

export function zonedDateParts(date, timeZone) {
  const parts = zonedFormatter(timeZone).formatToParts(date);
  const get = (type) => Number(parts.find((part) => part.type === type)?.value);

  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour'),
    minute: get('minute'),
    second: get('second')
  };
}

export function zonedDateFromParts(parts, timeZone) {
  const utcGuess = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second || 0);
  let offsetMinutes = getTimeZoneOffsetMinutes(new Date(utcGuess), timeZone);
  let candidate = new Date(utcGuess - offsetMinutes * 60 * 1000);

  const adjustedOffset = getTimeZoneOffsetMinutes(candidate, timeZone);
  if (adjustedOffset !== offsetMinutes) {
    offsetMinutes = adjustedOffset;
    candidate = new Date(utcGuess - offsetMinutes * 60 * 1000);
  }

  return candidate;
}

function addLocalDays(dateParts, days, timeZone) {
  const anchor = zonedDateFromParts({ ...dateParts, hour: 12, minute: 0, second: 0 }, timeZone);
  const shifted = new Date(anchor.getTime() + days * 24 * 60 * 60 * 1000);
  const next = zonedDateParts(shifted, timeZone);
  return {
    year: next.year,
    month: next.month,
    day: next.day
  };
}

export function nextNightlyRunAt({ now = new Date(), timeZone, hour, minute }) {
  const current = zonedDateParts(now, timeZone);
  let targetDay = {
    year: current.year,
    month: current.month,
    day: current.day
  };

  if (current.hour > hour || (current.hour === hour && current.minute >= minute)) {
    targetDay = addLocalDays(targetDay, 1, timeZone);
  }

  return zonedDateFromParts(
    {
      ...targetDay,
      hour,
      minute,
      second: 0
    },
    timeZone
  );
}
