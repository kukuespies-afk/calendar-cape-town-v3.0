import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateReliability, isTrustedSource, validateEvent } from '../src/events/quality.js';

test('trusted source detection works', () => {
  assert.equal(isTrustedSource('https://www.capetown.travel/events'), true);
  assert.equal(isTrustedSource('https://www.ticketmaster.co.za/discover/cape-town?page=1'), true);
  assert.equal(isTrustedSource('https://www.artscape.co.za/events/'), true);
  assert.equal(isTrustedSource('https://www.mojomarket.co.za/events'), true);
  assert.equal(isTrustedSource('https://unknown.example.com/event'), false);
});

test('reliability score stays between 0 and 1', () => {
  const score = calculateReliability({
    title: 'Cape Jazz Night',
    startAt: new Date(Date.now() + 3600_000).toISOString(),
    venue: 'V&A Waterfront',
    sourceUrl: 'https://www.capetown.travel/events',
    ticketsUrl: 'https://www.capetown.travel/events'
  });

  assert.ok(score > 0.5);
  assert.ok(score <= 1);
});

test('validation catches bad source', () => {
  const verdict = validateEvent({
    title: 'A',
    startAt: 'invalid',
    sourceUrl: 'https://spam.test'
  });

  assert.equal(verdict.isValid, false);
  assert.ok(verdict.issues.includes('invalid_start'));
});
