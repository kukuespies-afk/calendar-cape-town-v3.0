import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeRawEvent } from '../src/events/normalize.js';

test('normalize maps movie event to cinema and infers winery place type', () => {
  const event = normalizeRawEvent(
    {
      title: 'Dirty Dancing',
      startAt: '2026-02-21T20:00:00+02:00',
      location: 'Blaauwklippen Wine Estate',
      category: 'movie'
    },
    { id: 'src', name: 'Test Source', url: 'https://thegalileo.co.za', reliable: true }
  );

  assert.equal(event.category, 'cinema');
  assert.equal(event.placeType, 'winery');
});
