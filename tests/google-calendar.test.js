import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGoogleCalendarInsertPayload,
  buildGoogleCalendarTemplateUrl,
  buildMapEmbedUrl,
  buildMapSearchQuery,
  buildMapSearchUrl,
  normalizeEventEndAt
} from '../src/events/googleCalendar.js';

const sampleEvent = {
  title: 'First Thursdays: Art Walk',
  description: 'Monthly art route in Cape Town CBD.',
  startAt: '2026-03-05T16:00:00.000Z',
  endAt: '2026-03-05T19:00:00.000Z',
  venue: 'Cape Town City Centre Galleries',
  address: 'Long St / Bree St / Church St, Cape Town',
  sourceName: 'First Thursdays Cape Town',
  sourceUrl: 'https://first-thursdays.co.za/cape-town'
};

test('google calendar helper builds map urls', () => {
  const query = buildMapSearchQuery(sampleEvent);
  const mapUrl = buildMapSearchUrl(sampleEvent);
  const embedUrl = buildMapEmbedUrl(sampleEvent);

  assert.ok(query.includes('Cape Town'));
  assert.ok(mapUrl.startsWith('https://www.google.com/maps/search/'));
  assert.ok(embedUrl.includes('output=embed'));
});

test('google calendar helper builds prefilled template url', () => {
  const url = buildGoogleCalendarTemplateUrl(sampleEvent, 'Source');

  assert.ok(url.startsWith('https://calendar.google.com/calendar/render?'));
  assert.ok(url.includes('action=TEMPLATE'));
  assert.ok(url.includes('website%3Ahttps%3A%2F%2Ffirst-thursdays.co.za%2Fcape-town'));
});

test('google calendar helper falls back to +2h when end date is missing', () => {
  const end = normalizeEventEndAt({
    startAt: '2026-03-05T16:00:00.000Z'
  });

  assert.equal(end, '2026-03-05T18:00:00.000Z');
});

test('google calendar helper builds insert payload', () => {
  const payload = buildGoogleCalendarInsertPayload(sampleEvent, 'Africa/Johannesburg', 'Source');

  assert.equal(payload.summary, sampleEvent.title);
  assert.equal(payload.start.timeZone, 'Africa/Johannesburg');
  assert.equal(payload.end.timeZone, 'Africa/Johannesburg');
  assert.equal(payload.source.url, sampleEvent.sourceUrl);
});
