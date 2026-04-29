import test from 'node:test';
import assert from 'node:assert/strict';
import { nextNightlyRunAt } from '../src/events/autoRefreshSchedule.js';

test('nextNightlyRunAt keeps same local day when target time is ahead', () => {
  const nextRun = nextNightlyRunAt({
    now: new Date('2026-04-27T00:05:00.000Z'),
    timeZone: 'Africa/Johannesburg',
    hour: 2,
    minute: 10
  });

  assert.equal(nextRun.toISOString(), '2026-04-27T00:10:00.000Z');
});

test('nextNightlyRunAt moves to next local day when target time already passed', () => {
  const nextRun = nextNightlyRunAt({
    now: new Date('2026-04-27T00:30:00.000Z'),
    timeZone: 'Africa/Johannesburg',
    hour: 2,
    minute: 10
  });

  assert.equal(nextRun.toISOString(), '2026-04-28T00:10:00.000Z');
});
