import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHtmlSource } from '../src/ingest/parsers/htmlSource.js';

test('ticketmaster html parser extracts concert and sport events', () => {
  const source = {
    id: 'ticketmaster-cape-town',
    url: 'https://www.ticketmaster.co.za/discover/cape-town?page=1'
  };

  const html = `
    <div>
      <a href="/event/bryan-adams">Bryan Adams: Roll with the Punches</a>
      <p>Open additional information for Bryan Adams: Roll with the Punches, Cape Town Grand Arena at GrandWest 2026/04/21, 20:00</p>
      <a href="/event/stormers">DHL Stormers vs Connacht</a>
      <p>Open additional information for DHL Stormers vs Connacht, Cape Town DHL Stadium 2026/04/18, 18:15</p>
    </div>
  `;

  const events = parseHtmlSource(html, source);
  assert.equal(events.length, 2);
  assert.equal(events[0].title, 'Bryan Adams: Roll with the Punches');
  assert.equal(events[0].category, 'music');
  assert.match(events[0].sourceUrl, /ticketmaster\.co\.za\/event\/bryan-adams/);
  assert.equal(events[1].category, 'sport');
});

test('artscape html parser extracts date-ranged cultural events', () => {
  const source = {
    id: 'artscape-events',
    url: 'https://www.artscape.co.za/events/'
  };

  const html = `
    <section>
      <h2>May 2026</h2>
      <div>28 May / 7:30 pm - 30 May / 9:00 pm</div>
      <a href="/events/carmen">All Access Opera - Carmen</a>
      <p>Intimate opera performance in the theatre centre.</p>
      <div>12 June / 7:00 pm - 12 June / 9:30 pm</div>
      <a href="/events/youth-jazz">Artscape Youth Jazz Series</a>
      <p>Live jazz showcase for emerging artists.</p>
    </section>
  `;

  const events = parseHtmlSource(html, source);
  assert.equal(events.length, 2);
  assert.equal(events[0].title, 'All Access Opera - Carmen');
  assert.equal(events[0].category, 'art');
  assert.ok(events[0].startAt.startsWith('2026-05-28T19:30:00+02:00'));
  assert.equal(events[1].category, 'music');
});

test('mojo html parser extracts dated live events', () => {
  const source = {
    id: 'mojo-market-events',
    url: 'https://www.mojomarket.co.za/events'
  };

  const html = `
    <section>
      <div>Apr 24, 2026 8:00 PM</div>
      <a href="/events/friday-jazz">Friday Jazz at Mojo</a>
      <p>Live jazz with free entry.</p>
    </section>
  `;

  const events = parseHtmlSource(html, source);
  assert.equal(events.length, 1);
  assert.equal(events[0].title, 'Friday Jazz at Mojo');
  assert.equal(events[0].category, 'music');
  assert.equal(events[0].price, 'Free');
});

test('rocking the daisies parser extracts festival date range', () => {
  const source = {
    id: 'rocking-the-daisies',
    url: 'https://rockingthedaisies.com/ct/general-info/'
  };

  const html = `
    <main>
      <h1>Rocking the Daisies</h1>
      <div>2-4 OCTOBER 2026</div>
      <div>Cloof Wine Estate, Darling</div>
    </main>
  `;

  const events = parseHtmlSource(html, source);
  assert.equal(events.length, 1);
  assert.equal(events[0].title, 'Rocking the Daisies');
  assert.equal(events[0].category, 'festival');
  assert.ok(events[0].startAt.startsWith('2026-10-02T08:00:00+02:00'));
});

test('galileo html parser extracts official movie lineup cards', () => {
  const source = {
    id: 'galileo-open-air',
    url: 'https://thegalileo.co.za/movies/'
  };

  const html = `
    <li class="wcs-class">
      <time datetime="16 May 2026" class="wcs-class__time"></time>
      <div class="wcs-class__meta">
        <h3 class="wcs-class__title titledesktop">About Time (Final Show Of The Season)</h3>
        <span class="wcs-addons--pipe">Venue: </span>
        <span>Kirstenbosch Garden</span><br>
        <span class="wcs-addons--pipe doorsopen">Doors Open: </span>
        <span>17h00</span>
        <span class="wcs-addons--pipe">Movie Starts:</span>
        <span>19h30</span>
        <span class="wcs-addons--pipe">Genre: </span>
        <span>Comedy Drama Fantasy</span>
      </div>
      <div class="wcs-class__action">
        <a class="wcs-btn wcs-modal-call" href="https://thegalileo.co.za/movie/about-time/">Info</a>
      </div>
    </li>
  `;

  const events = parseHtmlSource(html, source);
  assert.equal(events.length, 1);
  assert.equal(events[0].title, 'About Time (Final Show Of The Season)');
  assert.equal(events[0].category, 'cinema');
  assert.equal(events[0].venue, 'Kirstenbosch Garden');
  assert.ok(events[0].startAt.startsWith('2026-05-16T19:30:00+02:00'));
  assert.equal(events[0].sourceUrl, 'https://thegalileo.co.za/movie/about-time/');
});
