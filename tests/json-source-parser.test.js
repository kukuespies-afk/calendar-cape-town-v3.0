import test from 'node:test';
import assert from 'node:assert/strict';
import { parseJsonFeed } from '../src/ingest/parsers/json.js';

test('dhl stadium parser extracts official competition events from strapi payload', () => {
  const source = {
    id: 'dhl-stadium-events',
    name: 'DHL Stadium Events',
    categoryHint: 'sport'
  };

  const payload = {
    data: [
      {
        id: 12,
        attributes: {
          title: 'DHL Stormers vs Glasgow Warriors',
          startDate: '2026-08-07',
          startTime: '19:10:00',
          description: 'Official DHL Stadium fixture night in Green Point.',
          venue: 'DHL Stadium',
          ticketUrl: 'https://dhlstadium.co.za/events/stormers-vs-glasgow'
        }
      }
    ]
  };

  const events = parseJsonFeed(payload, source);
  assert.equal(events.length, 1);
  assert.equal(events[0].title, 'DHL Stormers vs Glasgow Warriors');
  assert.equal(events[0].category, 'sport');
  assert.equal(events[0].venue, 'DHL Stadium');
  assert.equal(events[0].address, 'Fritz Sonnenberg Road, Green Point, Cape Town 8051');
  assert.equal(events[0].sourceUrl, 'https://dhlstadium.co.za/events/stormers-vs-glasgow');
  assert.equal(events[0].ticketsUrl, 'https://dhlstadium.co.za/events/stormers-vs-glasgow');
  assert.equal(events[0].startAt, '2026-08-07T19:10:00+02:00');
});

test('dhl stadium parser returns empty list when official feed is empty', () => {
  const source = {
    id: 'dhl-stadium-events'
  };

  const payload = {
    data: [],
    meta: {
      pagination: {
        total: 0
      }
    }
  };

  const events = parseJsonFeed(payload, source);
  assert.deepEqual(events, []);
});
