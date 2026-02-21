import { config } from '../config/index.js';
import {
  ensureDataFiles,
  getEvents as fileGetEvents,
  replaceEvents as fileReplaceEvents,
  upsertEvents as fileUpsertEvents,
  getSources as fileGetSources,
  getSubscribers as fileGetSubscribers,
  addSubscriber as fileAddSubscriber,
  removeSubscriber as fileRemoveSubscriber
} from './fileStore.js';
import {
  ensureSchema,
  pgGetEvents,
  pgReplaceEvents,
  pgUpsertEvents,
  pgGetSubscribers,
  pgAddSubscriber,
  pgRemoveSubscriber
} from './postgresStore.js';

const usePostgres = Boolean(config.databaseUrl);

export async function initRepository() {
  if (usePostgres) {
    await ensureSchema(config.databaseUrl);
    return;
  }
  await ensureDataFiles();
}

export async function getEvents() {
  if (usePostgres) {
    return pgGetEvents(config.databaseUrl);
  }
  return fileGetEvents();
}

export async function upsertEvents(events) {
  if (usePostgres) {
    await pgUpsertEvents(config.databaseUrl, events);
    return getEvents();
  }
  return fileUpsertEvents(events);
}

export async function replaceEvents(events) {
  if (usePostgres) {
    await pgReplaceEvents(config.databaseUrl, events);
    return getEvents();
  }
  return fileReplaceEvents(events);
}

export async function getSources() {
  return fileGetSources();
}

export async function getSubscribers() {
  if (usePostgres) {
    return pgGetSubscribers(config.databaseUrl);
  }
  return fileGetSubscribers();
}

export async function addSubscriber(subscriber) {
  if (usePostgres) {
    await pgAddSubscriber(config.databaseUrl, subscriber);
    return getSubscribers();
  }
  return fileAddSubscriber(subscriber);
}

export async function removeSubscriber(chatId) {
  if (usePostgres) {
    await pgRemoveSubscriber(config.databaseUrl, chatId);
    return getSubscribers();
  }
  return fileRemoveSubscriber(chatId);
}
