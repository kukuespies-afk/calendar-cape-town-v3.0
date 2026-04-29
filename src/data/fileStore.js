import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { config } from '../config/index.js';
import { nowIso } from '../lib/date.js';
import { defaultSources } from './defaultSources.js';
import { dedupeEvents } from '../events/dedupe.js';

const paths = {
  events: path.join(config.dataDir, 'events.json'),
  sources: path.join(config.dataDir, 'sources.json'),
  subscribers: path.join(config.dataDir, 'subscribers.json')
};

const defaults = {
  events: [],
  sources: defaultSources,
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
  const deduped = dedupeEvents(events);
  if (deduped.length !== events.length) {
    await writeJson(paths.events, deduped);
  }
  return deduped;
}

export async function replaceEvents(events) {
  await writeJson(paths.events, events);
  return events;
}

export async function upsertEvents(newEvents) {
  const current = await getEvents();
  const map = new Map(current.map((event) => [event.id, event]));

  for (const event of newEvents) {
    const eventId = event.id
      || crypto.createHash('sha256').update(`${event.title}-${event.startAt}-${event.venue || ''}`).digest('hex').slice(0, 16);

    map.set(eventId, {
      ...event,
      id: eventId,
      updatedAt: nowIso()
    });
  }

  const result = dedupeEvents([...map.values()]);
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
