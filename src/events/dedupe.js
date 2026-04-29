function normalizeText(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/gi, ' ').trim();
}

function startHourStamp(startAt) {
  if (!startAt) return '';
  const parsed = new Date(startAt);
  if (Number.isNaN(parsed.getTime())) return '';
  return String(parsed.getUTCHours()).padStart(2, '0');
}

function fingerprint(event) {
  const title = normalizeText(event.title);
  const parsed = event.startAt ? new Date(event.startAt) : null;
  const date = parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString().slice(0, 10) : '';
  const venue = normalizeText(event.venue);
  const hour = startHourStamp(event.startAt);
  return `${title}|${date}|${venue}|${hour}`;
}

function qualityScore(event) {
  let score = Number(event.reliabilityScore || 0) * 100;

  if (event.verified) score += 24;
  if (event.endAt) score += 16;
  if (normalizeText(event.description).length > 0) score += 8;
  if (normalizeText(event.address).length > 0) score += 6;
  if (normalizeText(event.sourceUrl).length > 0) score += 5;
  if (normalizeText(event.ticketsUrl).length > 0) score += 3;
  if (normalizeText(event.imageUrl).length > 0) score += 2;

  return score;
}

export function dedupeEvents(events) {
  const map = new Map();

  for (const event of events) {
    const key = fingerprint(event);
    if (!key) continue;

    const existing = map.get(key);
    if (!existing) {
      map.set(key, event);
      continue;
    }

    const existingScore = qualityScore(existing);
    const newScore = qualityScore(event);

    if (newScore > existingScore) {
      map.set(key, event);
    }
  }

  return [...map.values()].sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
}
