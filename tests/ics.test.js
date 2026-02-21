import test from 'node:test';
import assert from 'node:assert/strict';
import { generateIcs } from '../src/events/ics.js';

test('ics generation outputs calendar with events', () => {
  const ics = generateIcs([
    {
      id: 'evt-1',
      title: 'Cape Festival',
      description: 'Outdoor music event',
      startAt: '2026-03-10T10:00:00.000Z',
      endAt: '2026-03-10T14:00:00.000Z',
      venue: 'Green Point Park',
      sourceUrl: 'https://example.com'
    }
  ]);

  assert.ok(ics.includes('BEGIN:VCALENDAR'));
  assert.ok(ics.includes('SUMMARY:Cape Festival'));
  assert.ok(ics.includes('END:VCALENDAR'));
});
