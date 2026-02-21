import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHtmlJsonLd } from '../src/ingest/parsers/htmlJsonLd.js';

test('html json-ld parser extracts Event schema', () => {
  const html = `
    <html>
      <head>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Cape Night Market",
            "startDate": "2026-03-08T18:00:00+02:00",
            "location": {
              "@type": "Place",
              "name": "Mojo Market"
            },
            "url": "https://example.com/night-market"
          }
        </script>
      </head>
    </html>
  `;

  const events = parseHtmlJsonLd(html);
  assert.equal(events.length, 1);
  assert.equal(events[0].title, 'Cape Night Market');
  assert.equal(events[0].location, 'Mojo Market');
});
