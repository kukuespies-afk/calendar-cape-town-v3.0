import { config } from '../config/index.js';
import { addSubscriber, getEvents, removeSubscriber } from '../data/repository.js';
import { eventsForThisMonth, eventsForThisWeek } from '../events/query.js';
import { formatHuman } from '../lib/date.js';

function truncate(text, size = 280) {
  if (!text) return '';
  return text.length > size ? `${text.slice(0, size - 1)}…` : text;
}

function renderEventLine(event) {
  const when = formatHuman(event.startAt, config.timezone);
  const title = truncate(event.title, 72);
  const place = event.venue ? `\n📍 ${truncate(event.venue, 54)}` : '';
  const source = event.sourceUrl ? `\n🔗 ${event.sourceUrl}` : '';
  return `• <b>${title}</b>\n🗓 ${when}${place}${source}`;
}

function renderDigest(events, label) {
  if (!events.length) {
    return `На ${label} проверенных мероприятий пока нет.\n\nПопробуйте /week позже.`;
  }

  const lines = events.slice(0, 12).map(renderEventLine);
  return `<b>Афиша Кейптауна: ${label}</b>\n\n${lines.join('\n\n')}\n\nИспользуйте веб-календарь для полного списка.`;
}

export async function sendTelegramMessage(chatId, text) {
  if (!config.telegramBotToken) {
    return { ok: false, reason: 'token_missing' };
  }

  const response = await fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    })
  });

  if (!response.ok) {
    return { ok: false, reason: `http_${response.status}` };
  }

  return response.json();
}

export async function processBotCommand(message) {
  const text = (message.text || '').trim();
  const chatId = message.chat?.id;

  if (!chatId || !text.startsWith('/')) {
    return null;
  }

  if (text.startsWith('/start')) {
    await addSubscriber({
      chatId,
      firstName: message.from?.first_name || '',
      username: message.from?.username || ''
    });

    return sendTelegramMessage(
      chatId,
      'Подписка активна. Команды: /week, /month, /unsubscribe\nВеб-версия: ' + config.publicBaseUrl
    );
  }

  if (text.startsWith('/unsubscribe')) {
    await removeSubscriber(chatId);
    return sendTelegramMessage(chatId, 'Вы отписаны от рассылки.');
  }

  const events = await getEvents();

  if (text.startsWith('/week')) {
    const weekEvents = eventsForThisWeek(events);
    return sendTelegramMessage(chatId, renderDigest(weekEvents, 'текущую неделю'));
  }

  if (text.startsWith('/month')) {
    const monthEvents = eventsForThisMonth(events);
    return sendTelegramMessage(chatId, renderDigest(monthEvents, 'текущий месяц'));
  }

  return sendTelegramMessage(chatId, 'Неизвестная команда. Используйте /week, /month или /unsubscribe.');
}

export function isValidTelegramSecret(headerValue) {
  if (!config.telegramWebhookSecret) {
    return true;
  }
  return String(headerValue || '') === String(config.telegramWebhookSecret);
}
