import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { config } from '../config/index.js';
import { nowIso } from '../lib/date.js';

const paths = {
  events: path.join(config.dataDir, 'events.json'),
  sources: path.join(config.dataDir, 'sources.json'),
  subscribers: path.join(config.dataDir, 'subscribers.json')
};

const defaults = {
  events: [],
  sources: [
    {
      id: 'capetown-tourism',
      name: 'Cape Town Tourism',
      type: 'html',
      url: 'https://www.capetown.travel/events/',
      categoryHint: 'city',
      reliable: true,
      active: false,
      notes: 'Можно парсить JSON-LD события прямо со страницы (type=html).'
    },
    {
      id: 'quicket-api',
      name: 'Quicket API',
      type: 'json',
      url: 'https://api.quicket.co.za/events',
      headers: {
        Authorization: 'Bearer ${QUICKET_API_KEY}'
      },
      categoryHint: 'tickets',
      reliable: true,
      active: false,
      notes: 'Требуется QUICKET_API_KEY и корректный endpoint.'
    },
    {
      id: 'cticc-whats-on',
      name: 'CTICC What\'s On',
      type: 'html',
      url: 'https://www.cticc.co.za/visitor/whats-on/',
      categoryHint: 'market',
      reliable: true,
      active: false,
      notes: 'Источник для крупных выставок/форумов. Можно включить после проверки структуры страницы.'
    },
    {
      id: 'openai-custom-events-api',
      name: 'Custom OpenAI Events API',
      type: 'json',
      url: 'https://your-domain.com/api/events/cape-town',
      headers: {
        Authorization: 'Bearer ${OPENAI_EVENTS_API_KEY}'
      },
      categoryHint: 'city',
      reliable: true,
      active: false,
      notes: 'Ваш собственный API. Должен возвращать JSON-массив events/items.'
    }
  ],
  subscribers: []
};

async function ensureFile(filePath, fallbackData) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(fallbackData, null, 2));
  }
}

export async function ensureDataFiles() {
  await ensureFile(paths.events, defaults.events);
  await ensureFile(paths.sources, defaults.sources);
  await ensureFile(paths.subscribers, defaults.subscribers);
}

async function readJson(filePath, fallback) {
  await ensureFile(filePath, fallback);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

async function writeJson(filePath, value) {
  await fs.writeFile(filePath, JSON.stringify(value, null, 2));
}

export async function getEvents() {
  const events = await readJson(paths.events, defaults.events);
  return events.sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
}

export async function replaceEvents(events) {
  await writeJson(paths.events, events);
  return events;
}

export async function upsertEvents(newEvents) {
  const current = await getEvents();
  const map = new Map(current.map((event) => [event.id, event]));

  for (const event of newEvents) {
    if (!event.id) {
      event.id = crypto.createHash('sha256').update(`${event.title}-${event.startAt}-${event.venue || ''}`).digest('hex').slice(0, 16);
    }
    map.set(event.id, {
      ...event,
      updatedAt: nowIso()
    });
  }

  const result = [...map.values()].sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
  await replaceEvents(result);
  return result;
}

export async function getSources() {
  return readJson(paths.sources, defaults.sources);
}

export async function setSources(sources) {
  await writeJson(paths.sources, sources);
}

export async function getSubscribers() {
  return readJson(paths.subscribers, defaults.subscribers);
}

export async function addSubscriber(subscriber) {
  const subscribers = await getSubscribers();
  const exists = subscribers.some((entry) => String(entry.chatId) === String(subscriber.chatId));
  if (!exists) {
    subscribers.push({
      ...subscriber,
      subscribedAt: nowIso(),
      weeklyDigest: true,
      monthlyDigest: true
    });
    await writeJson(paths.subscribers, subscribers);
  }
  return subscribers;
}

export async function removeSubscriber(chatId) {
  const subscribers = await getSubscribers();
  const next = subscribers.filter((entry) => String(entry.chatId) !== String(chatId));
  await writeJson(paths.subscribers, next);
  return next;
}
