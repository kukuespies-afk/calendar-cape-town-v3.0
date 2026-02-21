import test from 'node:test';
import assert from 'node:assert/strict';
import { filterEvents } from '../src/events/query.js';

test('query filters by category and text', () => {
  const events = [
    { title: 'Jazz in Cape Town', startAt: '2026-03-01T10:00:00.000Z', category: 'music', placeType: 'beach', venue: 'A' },
    { title: 'Food Market', startAt: '2026-03-02T10:00:00.000Z', category: 'market', placeType: 'mall', venue: 'B' }
  ];

  const filtered = filterEvents(events, {
    category: 'music',
    placeType: 'beach',
    q: 'jazz',
    start: '2026-03-01T00:00:00.000Z',
    end: '2026-03-03T00:00:00.000Z'
  });

  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].title, 'Jazz in Cape Town');
});

test('query searches by tags/address/source and filters by place type', () => {
  const events = [
    {
      title: 'Morning Park Session',
      description: 'Community run day',
      startAt: '2026-03-01T10:00:00.000Z',
      category: 'sport',
      placeType: 'park',
      venue: 'Green Point Park',
      address: 'Bill Peters Dr',
      sourceName: 'Parkrun Cape Town',
      tags: ['run', 'community']
    },
    {
      title: 'Waterfront Food Walk',
      description: 'Local market route',
      startAt: '2026-03-02T10:00:00.000Z',
      category: 'market',
      placeType: 'waterfront',
      venue: 'V&A Waterfront',
      address: 'Dock Rd',
      sourceName: 'City Guide',
      tags: ['market']
    }
  ];

  const byTagAndType = filterEvents(events, {
    placeType: 'park',
    q: 'run',
    start: '2026-03-01T00:00:00.000Z',
    end: '2026-03-03T00:00:00.000Z'
  });
  assert.equal(byTagAndType.length, 1);
  assert.equal(byTagAndType[0].title, 'Morning Park Session');

  const bySource = filterEvents(events, {
    q: 'parkrun'
  });
  assert.equal(bySource.length, 1);
  assert.equal(bySource[0].placeType, 'park');
});

test('smart query matches similar words and ru/en synonyms', () => {
  const events = [
    {
      title: 'Green Point Parkrun 5K',
      description: 'Weekly community run',
      startAt: '2026-03-08T06:00:00.000Z',
      category: 'sport',
      placeType: 'park',
      venue: 'Green Point Park',
      tags: ['run', 'community']
    },
    {
      title: 'Killarney Drag Racing Night',
      description: 'Motorsport race event',
      startAt: '2026-03-09T18:00:00.000Z',
      category: 'sport',
      placeType: 'stadium',
      venue: 'Killarney Raceway',
      tags: ['race', 'motorsport']
    }
  ];

  const running = filterEvents(events, { q: 'бег' });
  assert.equal(running.length, 1);
  assert.equal(running[0].title, 'Green Point Parkrun 5K');

  const racing = filterEvents(events, { q: 'рейс' });
  assert.equal(racing.length, 1);
  assert.equal(racing[0].title, 'Killarney Drag Racing Night');
});
