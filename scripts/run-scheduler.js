import { initRepository } from '../src/data/repository.js';
import { runDigestCycle } from '../src/bot/scheduler.js';

await initRepository();
const result = await runDigestCycle(new Date());
console.log(JSON.stringify(result, null, 2));
