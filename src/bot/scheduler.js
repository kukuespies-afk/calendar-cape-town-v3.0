import { config } from '../config/index.js';
import { getSubscribers, getEvents } from '../data/repository.js';
import { eventsForThisMonth, eventsForThisWeek } from '../events/query.js';
import { sendTelegramMessage } from './telegram.js';

function isMonday(date = new Date()) {
  return date.getDay() === 1;
}

function isFirstDayOfMonth(date = new Date()) {
  return date.getDate() === 1;
}

function digestText(events, title) {
  const top = events.slice(0, 10);
  const lines = top.map((event) => `• ${event.title} (${new Date(event.startAt).toLocaleDateString('ru-RU', { timeZone: config.timezone })})`);
  return `${title}\n\n${lines.join('\n') || 'Пока нет подтвержденных событий.'}`;
}

export async function runDigestCycle(date = new Date()) {
  const subscribers = await getSubscribers();
  if (!subscribers.length) {
    return { sent: 0, skipped: 0 };
  }

  const events = await getEvents();
  const weekly = eventsForThisWeek(events, date);
  const monthly = eventsForThisMonth(events, date);

  let sent = 0;
  let skipped = 0;

  for (const subscriber of subscribers) {
    if (isMonday(date) && subscriber.weeklyDigest) {
      await sendTelegramMessage(subscriber.chatId, digestText(weekly, 'Недельная афиша Кейптауна'));
      sent += 1;
      continue;
    }

    if (isFirstDayOfMonth(date) && subscriber.monthlyDigest) {
      await sendTelegramMessage(subscriber.chatId, digestText(monthly, 'Месячная афиша Кейптауна'));
      sent += 1;
      continue;
    }

    skipped += 1;
  }

  return { sent, skipped };
}
