import test from 'node:test';
import assert from 'node:assert/strict';
import { inferPlaceType, normalizePlaceType } from '../src/events/placeType.js';

test('infer place type by venue keywords', () => {
  assert.equal(inferPlaceType('Grand Cafe and Beach', ''), 'beach');
  assert.equal(inferPlaceType('CTICC Hall 8', ''), 'exhibition_complex');
  assert.equal(inferPlaceType('Blaauwklippen Wine Estate', ''), 'winery');
});

test('normalize place type aliases', () => {
  assert.equal(normalizePlaceType('wine estate'), 'winery');
  assert.equal(normalizePlaceType('expo'), 'exhibition_complex');
});
