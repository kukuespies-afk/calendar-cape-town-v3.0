import { initRepository } from '../src/data/repository.js';
import { refreshAllEvents } from '../src/events/refreshAll.js';

await initRepository();
const result = await refreshAllEvents({
  includeIngestion: !process.argv.includes('--without-ingestion')
});
console.log(JSON.stringify(result, null, 2));
