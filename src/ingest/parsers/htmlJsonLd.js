function normalizeToArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function extractEventsFromNode(node, collector) {
  if (!node || typeof node !== 'object') return;

  if (Array.isArray(node)) {
    node.forEach((item) => extractEventsFromNode(item, collector));
    return;
  }

  const type = node['@type'];
  const types = normalizeToArray(type);
  if (types.includes('Event')) {
    collector.push({
      title: node.name || '',
      description: node.description || '',
      startAt: node.startDate || '',
      endAt: node.endDate || '',
      location: node.location?.name || node.location?.address?.streetAddress || '',
      address: node.location?.address?.streetAddress || '',
      url: node.url || '',
      category: node.eventAttendanceMode || ''
    });
  }

  Object.values(node).forEach((value) => {
    if (value && typeof value === 'object') {
      extractEventsFromNode(value, collector);
    }
  });
}

export function parseHtmlJsonLd(html) {
  const events = [];
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const content = match[1].trim();
    if (!content) continue;

    try {
      const parsed = JSON.parse(content);
      extractEventsFromNode(parsed, events);
    } catch {
      continue;
    }
  }

  return events;
}
