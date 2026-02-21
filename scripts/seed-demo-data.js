import { initRepository, upsertEvents } from '../src/data/repository.js';

function isoAt(date, hour, minute = 0) {
  const d = new Date(date);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function buildDemoEvents() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const events = [
    {
      id: 'demo-jazz-night',
      title: 'Демо: Cape Jazz Sunset Session',
      description: 'Демо-событие для теста календаря и карточек мероприятия.',
      startAt: isoAt(addDays(today, 1), 18, 30),
      endAt: isoAt(addDays(today, 1), 21, 0),
      venue: 'V&A Waterfront Amphitheatre',
      address: '19 Dock Rd, Victoria & Alfred Waterfront, Cape Town',
      category: 'music',
      placeType: 'waterfront',
      price: 'R250',
      currency: 'ZAR',
      sourceName: 'Demo Seed',
      sourceUrl: 'https://www.capetown.travel/events/',
      ticketsUrl: 'https://www.capetown.travel/events/',
      tags: ['music', 'sunset', 'demo'],
      verified: true,
      reliabilityScore: 0.95
    },
    {
      id: 'demo-food-market',
      title: 'Демо: Oranjezicht Food Market Weekend',
      description: 'Демо-событие для проверки фильтров категории food.',
      startAt: isoAt(addDays(today, 3), 10, 0),
      endAt: isoAt(addDays(today, 3), 15, 0),
      venue: 'Oranjezicht City Farm Market',
      address: 'Granger Bay Blvd, V&A Waterfront, Cape Town',
      category: 'market',
      placeType: 'market',
      price: 'Free entry',
      currency: 'ZAR',
      sourceName: 'Demo Seed',
      sourceUrl: 'https://www.capetown.travel/events/',
      ticketsUrl: 'https://www.capetown.travel/events/',
      tags: ['market', 'food', 'demo'],
      verified: true,
      reliabilityScore: 0.93
    },
    {
      id: 'demo-trail-day',
      title: 'Демо: Table Mountain Trail Day',
      description: 'Демо-событие для weekly/monthly представления.',
      startAt: isoAt(addDays(today, 5), 7, 30),
      endAt: isoAt(addDays(today, 5), 12, 0),
      venue: 'Table Mountain Aerial Cableway',
      address: '5821 Tafelberg Rd, Cape Town',
      category: 'travel',
      placeType: 'park',
      price: 'R180',
      currency: 'ZAR',
      sourceName: 'Demo Seed',
      sourceUrl: 'https://www.capetown.travel/events/',
      ticketsUrl: 'https://www.capetown.travel/events/',
      tags: ['hiking', 'travel', 'demo'],
      verified: true,
      reliabilityScore: 0.92
    },
    {
      id: 'demo-arts-festival',
      title: 'Демо: Cape Arts Micro Festival',
      description: 'Демо-событие на следующую неделю для навигации по календарю.',
      startAt: isoAt(addDays(today, 9), 16, 0),
      endAt: isoAt(addDays(today, 9), 22, 0),
      venue: 'Baxter Theatre Centre',
      address: 'Main Rd, Rondebosch, Cape Town',
      category: 'festival',
      placeType: 'theatre',
      price: 'R320',
      currency: 'ZAR',
      sourceName: 'Demo Seed',
      sourceUrl: 'https://www.capetown.travel/events/',
      ticketsUrl: 'https://www.capetown.travel/events/',
      tags: ['festival', 'arts', 'demo'],
      verified: true,
      reliabilityScore: 0.94
    },
    {
      id: 'demo-run',
      title: 'Демо: Sea Point Morning Run Club',
      description: 'Демо-событие для категории sport и проверки поиска.',
      startAt: isoAt(addDays(today, 12), 6, 30),
      endAt: isoAt(addDays(today, 12), 8, 0),
      venue: 'Sea Point Promenade',
      address: 'Beach Rd, Sea Point, Cape Town',
      category: 'sport',
      placeType: 'beach',
      price: 'Free',
      currency: 'ZAR',
      sourceName: 'Demo Seed',
      sourceUrl: 'https://www.capetown.travel/events/',
      ticketsUrl: 'https://www.capetown.travel/events/',
      tags: ['sport', 'community', 'demo'],
      verified: true,
      reliabilityScore: 0.9
    }
  ];

  return events;
}

await initRepository();
const seeded = await upsertEvents(buildDemoEvents());

console.log(
  JSON.stringify(
    {
      ok: true,
      message: 'Demo events seeded',
      totalEventsInStorage: seeded.length,
      seededIds: [
        'demo-jazz-night',
        'demo-food-market',
        'demo-trail-day',
        'demo-arts-festival',
        'demo-run'
      ]
    },
    null,
    2
  )
);
