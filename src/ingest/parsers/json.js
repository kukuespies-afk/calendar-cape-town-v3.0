export function parseJsonFeed(payload) {
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
