import path from 'node:path';

const cwd = process.cwd();
const toBool = (value, fallback = false) => {
  if (value == null || value === '') return fallback;
  return String(value).toLowerCase() === 'true';
};
const toPositiveNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
const toRefreshMode = (value, fallback = 'nightly') => {
  const normalized = String(value || fallback).toLowerCase();
  return ['nightly', 'interval'].includes(normalized) ? normalized : fallback;
};

export const config = {
  port: Number(process.env.PORT || 3400),
  host: process.env.HOST || '127.0.0.1',
  nodeEnv: process.env.NODE_ENV || 'development',
  timezone: process.env.APP_TIMEZONE || 'Africa/Johannesburg',
  publicBaseUrl: process.env.PUBLIC_BASE_URL || 'http://localhost:3400',
  adminKey: process.env.ADMIN_KEY || '',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
  telegramWebhookSecret: process.env.TELEGRAM_WEBHOOK_SECRET || '',
  telegramBotUsername: process.env.TELEGRAM_BOT_USERNAME || 'your_bot_username',
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
  googleCalendarClientId: process.env.GOOGLE_CALENDAR_CLIENT_ID || '',
  googleCalendarClientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET || '',
  googleCalendarRedirectUri: process.env.GOOGLE_CALENDAR_REDIRECT_URI || '',
  databaseUrl: process.env.DATABASE_URL || '',
  autoRefreshEnabled: toBool(process.env.AUTO_REFRESH_ENABLED, true),
  autoRefreshOnBoot: toBool(process.env.AUTO_REFRESH_ON_BOOT, true),
  autoRefreshMode: toRefreshMode(process.env.AUTO_REFRESH_MODE, 'nightly'),
  autoRefreshNightlyHour: Math.min(23, toPositiveNumber(process.env.AUTO_REFRESH_NIGHTLY_HOUR, 2)),
  autoRefreshNightlyMinute: Math.min(59, toPositiveNumber(process.env.AUTO_REFRESH_NIGHTLY_MINUTE, 10)),
  autoRefreshIntervalMinutes: toPositiveNumber(process.env.AUTO_REFRESH_INTERVAL_MINUTES, 360),
  autoRefreshIngestion: toBool(process.env.AUTO_REFRESH_INGESTION, true),
  dataDir: path.join(cwd, 'data')
};
