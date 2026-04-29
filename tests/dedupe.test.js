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

test('dedupe keeps separate sessions on same day when start hours differ', () => {
  const list = [
    {
      id: 'morning',
      title: 'Open Mic',
      startAt: '2026-04-12T10:00:00.000Z',
      venue: 'Mojo Market',
      reliabilityScore: 0.8
    },
    {
      id: 'evening',
      title: 'Open Mic',
      startAt: '2026-04-12T18:00:00.000Z',
      venue: 'Mojo Market',
      reliabilityScore: 0.8
    }
  ];

  const result = dedupeEvents(list);
  assert.equal(result.length, 2);
  assert.deepEqual(result.map((event) => event.id), ['morning', 'evening']);
});

test('dedupe prefers richer event metadata when reliability is equal', () => {
  const list = [
    {
      id: 'thin',
      title: 'Mojo Karaoke Mondays',
      startAt: '2026-05-04T17:00:00.000Z',
      venue: 'Mojo Market',
      reliabilityScore: 0.9
    },
    {
      id: 'rich',
      title: 'Mojo Karaoke Mondays',
      startAt: '2026-05-04T17:00:00.000Z',
      endAt: '2026-05-04T20:30:00.000Z',
      venue: 'Mojo Market',
      description: 'Live karaoke session',
      sourceUrl: 'https://www.mojomarket.co.za/events',
      reliabilityScore: 0.9
    }
  ];

  const result = dedupeEvents(list);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'rich');
});
