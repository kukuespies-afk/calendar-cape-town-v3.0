function fingerprint(event) {
  const title = (event.title || '').toLowerCase().replace(/[^a-z0-9]+/gi, ' ').trim();
  const date = event.startAt ? new Date(event.startAt).toISOString().slice(0, 10) : '';
  const venue = (event.venue || '').toLowerCase().replace(/[^a-z0-9]+/gi, ' ').trim();
  return `${title}|${date}|${venue}`;
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

    const existingScore = Number(existing.reliabilityScore || 0);
    const newScore = Number(event.reliabilityScore || 0);

    if (newScore > existingScore) {
      map.set(key, event);
    }
  }

  return [...map.values()].sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
}
