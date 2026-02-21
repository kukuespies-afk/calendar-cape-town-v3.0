import { initRepository } from '../src/data/repository.js';
import { runIngestion } from '../src/ingest/runIngestion.js';

await initRepository();
const result = await runIngestion();
console.log(JSON.stringify(result, null, 2));
