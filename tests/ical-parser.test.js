import test from 'node:test';
import assert from 'node:assert/strict';
import { parseIcs } from '../src/ingest/parsers/ical.js';

test('ical parser extracts event fields', () => {
  const sample = [
    'BEGIN:VCALENDAR',
    'BEGIN:VEVENT',
    'SUMMARY:Jazz Evening',
    'DESCRIPTION:Live performance',
    'DTSTART:20260310T180000Z',
    'DTEND:20260310T210000Z',
    'LOCATION:Cape Town City Hall',
    'URL:https://www.capetown.travel/events/jazz-evening',
    'CATEGORIES:music',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const events = parseIcs(sample);
  assert.equal(events.length, 1);
  assert.equal(events[0].title, 'Jazz Evening');
  assert.equal(events[0].location, 'Cape Town City Hall');
  assert.equal(events[0].url, 'https://www.capetown.travel/events/jazz-evening');
});

test('ical parser handles local datetime without Z', () => {
  const sample = [
    'BEGIN:VCALENDAR',
    'BEGIN:VEVENT',
    'SUMMARY:Local Time Event',
    'DTSTART:20260311T090000',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const events = parseIcs(sample);
  assert.equal(events.length, 1);
  assert.equal(typeof events[0].startAt, 'string');
  assert.ok(events[0].startAt.includes('T'));
});
