import { getEvents, upsertEvents } from '../data/repository.js';
import { runIngestion } from '../ingest/runIngestion.js';
import { buildCuratedEvents } from '../../scripts/seed-curated-events.js';

export async function refreshAllEvents(options = {}) {
  const includeIngestion = options.includeIngestion !== false;

  const curated = buildCuratedEvents();
  await upsertEvents(curated);

  let ingestion = {
    activeSources: 0,
    rawEvents: 0,
    savedEvents: 0,
    sourceResults: []
  };

  if (includeIngestion) {
    ingestion = await runIngestion();
  }

  const allEvents = await getEvents();

  return {
    ok: true,
    curatedUpserted: curated.length,
    totalEventsInStorage: allEvents.length,
    ingestion
  };
}
