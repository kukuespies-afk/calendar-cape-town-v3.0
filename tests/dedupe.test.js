import test from 'node:test';
import assert from 'node:assert/strict';
import { dedupeEvents } from '../src/events/dedupe.js';

test('dedupe keeps highest reliability event', () => {
  const list = [
    {
      id: 'a',
      title: 'Sunset Concert',
      startAt: '2026-03-14T18:00:00.000Z',
      venue: 'Sea Point',
      reliabilityScore: 0.7
    },
    {
      id: 'b',
      title: 'Sunset Concert',
      startAt: '2026-03-14T18:00:00.000Z',
      venue: 'Sea Point',
      reliabilityScore: 0.9
    }
  ];

  const result = dedupeEvents(list);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'b');
});
