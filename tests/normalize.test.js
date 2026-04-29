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

test('normalize keeps official and discovery source metadata separate', () => {
  const event = normalizeRawEvent(
    {
      title: 'Late Night Jazz Session',
      startAt: '2026-04-18T18:00:00+02:00',
      venue: 'Downtown Club',
      url: 'https://www.shazam.com/events/cape-town/example-jazz',
      sourceUrl: 'https://venue.example.com/jazz-night',
      ticketsUrl: 'https://venue.example.com/jazz-night/tickets'
    },
    {
      id: 'shazam-cape-town',
      name: 'Shazam Cape Town Events',
      url: 'https://www.shazam.com/events/cape-town-western-cape-south-africa',
      sourceRole: 'discovery',
      reliable: false
    }
  );

  assert.equal(event.sourceId, 'shazam-cape-town');
  assert.equal(event.sourceRole, 'discovery');
  assert.equal(event.sourceUrl, 'https://venue.example.com/jazz-night');
  assert.equal(event.discoverySourceName, 'Shazam Cape Town Events');
  assert.equal(event.discoveryUrl, 'https://www.shazam.com/events/cape-town/example-jazz');
});
