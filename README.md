# AFISHA CAPE

Веб-приложение + Telegram-бот для еженедельной и ежемесячной афиши Кейптауна.

## Что уже реализовано

- Календарный UI (неделя/месяц), map/list, Saved, EN/RU и sticky-фильтры.
- Детали события: источник, карта, цена, add-to-calendar (Google + `.ics`).
- Группы событий: `festival`, `sport`, `music`, `cinema`, `art`, `dance`, `nightlife`, `local`, `brand`, `vintage`, `fair`, `market`.
- Фильтр по типу места: пляжи, винодельни, ТЦ, выставочные комплексы, парки и др.
- API для событий: фильтрация по дате, категории, тексту.
- Экспорт календаря в `.ics` для Google Calendar / Apple / Outlook + `.ics` по одному событию.
- Ingestion-модуль: подключение источников (`.ics` + JSON API + HTML JSON-LD), нормализация, проверка достоверности, дедупликация.
- Telegram webhook-бот с командами `/start`, `/week`, `/month`, `/unsubscribe`.
- Авто-дайджесты через scheduler-скрипт.
- Поддержка Postgres (прод) и JSON-хранилища (локальный MVP).
- API для AI-обогащения события (`/api/ai/enrich`, опционально).

## Быстрый старт

1. Установить зависимости:
```bash
npm install
```

2. Создать `.env`:
```bash
cp .env.example .env
```

3. Запустить приложение:
```bash
npm run dev
```

Откройте: `http://localhost:3400`
По умолчанию этот проект использует `http://localhost:3400`, чтобы не пересекаться с другими локальными сайтами.

Если локальная среда запрещает bind на `0.0.0.0` или дефолтный порт `3400` занят:
```bash
HOST=127.0.0.1 PORT=3500 PUBLIC_BASE_URL=http://localhost:3500 npm run dev
```

## Готовый демо-режим (1 команда)

Если хотите сразу увидеть рабочий календарь с тестовыми событиями:

```bash
npm run demo:start
```

Это добавит 5 демо-событий в ближайшие дни и запустит сервер.  
Откройте: `http://localhost:3400`

Важно: демо-события помечены префиксом `Демо:` и нужны только для проверки интерфейса и API.

## Расширенный каталог реальных событий (курируемый seed)

Чтобы загрузить расширенный набор событий из проверяемых источников (CTICC, Howler, The Galileo, OZCF, Bay Harbour, Parkrun):

```bash
npm run curated:start
```

или только загрузить данные без запуска сервера:

```bash
npm run seed:curated
```

## Подключение Telegram

1. Создайте бота через BotFather.
2. В `.env` задайте:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_BOT_USERNAME`
- `TELEGRAM_WEBHOOK_SECRET`

3. Настройте webhook (пример):
```bash
curl -X POST "https://api.telegram.org/bot<token>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://<your-domain>/api/telegram/webhook","secret_token":"<secret>"}'
```

## Подключение источников событий

Файл: `data/sources.json`

- Для каждого источника задайте:
  - `type`: `ical`, `json` или `html`
  - `url`: endpoint/фид
  - `sourceRole`: `official`, `discovery` или `partner`
  - `active: true`
  - `headers` (если нужен API-ключ)

- Рекомендуемая схема:
  - `sourceUrl` у события хранит официальный URL организатора, venue или ticketing-page.
  - `discoveryUrl` и `discoverySourceName` можно хранить отдельно для Shazam, Expomap, RA и других discovery-источников.

### Уже подключённые source-specific адаптеры

- `galileo-open-air`
  - official open-air screenings и lineup-карточки из [The Galileo](https://thegalileo.co.za/movies/)
- `ticketmaster-cape-town`
  - концерты, arena-шоу и stadium sport из [Ticketmaster Cape Town](https://www.ticketmaster.co.za/discover/cape-town?page=1)
- `dhl-stadium-events`
  - отдельный официальный competitions feed из [DHL Stadium](https://dhlstadium.co.za/events)
- `artscape-events`
  - theatre / opera / jazz / stage-events из [Artscape](https://www.artscape.co.za/events/)
- `mojo-market-events`
  - weekly music / movie / social events из [Mojo Market](https://www.mojomarket.co.za/events)
- `rocking-the-daisies`
  - festival date-range из [Rocking the Daisies](https://rockingthedaisies.com/ct/general-info/)

Сейчас в `data/sources.json` как `active: true` включены:
- `galileo-open-air`
- `ticketmaster-cape-town`
- `dhl-stadium-events`
- `artscape-events`
- `mojo-market-events`
- `rocking-the-daisies`

Примечание по `dhl-stadium-events`: официальный `competitions` feed у стадиона может быть пустым в отдельные даты. Pipeline уже подключён и начнёт сохранять события, как только стадион опубликует записи в своём API.

Запуск ingestion вручную:
```bash
npm run ingest
```

Или через API:
```bash
curl -X POST http://localhost:3400/api/ingest -H "x-admin-key: <ADMIN_KEY>"
```

## Автообновление всех событий

Теперь приложение умеет автоматически обновлять весь каталог:
- переапдейт curared-событий (еженедельные/ежемесячные повторяющиеся блоки),
- подтягивание внешних источников через ingestion.

Управляется через `.env`:
- `AUTO_REFRESH_ENABLED=true`
- `AUTO_REFRESH_ON_BOOT=true`
- `AUTO_REFRESH_MODE=nightly`
- `AUTO_REFRESH_NIGHTLY_HOUR=2`
- `AUTO_REFRESH_NIGHTLY_MINUTE=10`
- `AUTO_REFRESH_INTERVAL_MINUTES=360`
- `AUTO_REFRESH_INGESTION=true`

По умолчанию приложение работает в nightly-режиме и запускает полный refresh раз в сутки по таймзоне `APP_TIMEZONE`.
Если нужен старый интервальный режим, переключите:

```bash
AUTO_REFRESH_MODE=interval
AUTO_REFRESH_INTERVAL_MINUTES=360
```

Ручной запуск полного refresh:
```bash
npm run refresh:all
```

API запуск полного refresh:
```bash
curl -X POST http://localhost:3400/api/refresh-all -H "x-admin-key: <ADMIN_KEY>"
```

## Google Calendar direct insert (опционально)

Чтобы кнопка `Add to Google Calendar` вставляла событие напрямую через OAuth (а не только prefill):

1. Создайте OAuth Client в Google Cloud Console (Web application).
2. В `.env` заполните:
```bash
GOOGLE_CALENDAR_CLIENT_ID=...
GOOGLE_CALENDAR_CLIENT_SECRET=...
GOOGLE_CALENDAR_REDIRECT_URI=http://localhost:3400/api/google/oauth/callback
```
3. В Google OAuth настройках добавьте redirect URI из шага 2.

Если переменные не заданы, UI автоматически использует prefilled Google Calendar ссылку.

### Подключение собственного OpenAI API как источника

В `data/sources.json` уже добавлен шаблон `openai-custom-events-api`.

1. Пропишите URL вашего API и токен в `.env`:
```bash
OPENAI_EVENTS_API_KEY=your_token
```
2. В `data/sources.json` включите источник:
```json
{
  "id": "openai-custom-events-api",
  "active": true
}
```
3. Ваш API должен возвращать JSON вида:
```json
{
  "events": [
    {
      "title": "Event title",
      "description": "Short description",
      "startAt": "2026-03-22T18:00:00.000Z",
      "endAt": "2026-03-22T21:00:00.000Z",
      "venue": "Venue",
      "address": "Address",
      "category": "music",
      "placeType": "club",
      "sourceUrl": "https://source.example/event"
    }
  ]
}
```

## Точность данных

В проекте встроены:

- whitelist надежных доменов,
- валидация обязательных полей,
- reliability score для каждого события,
- дедупликация дублей по названию+дате+локации,
- обязательное сохранение `sourceUrl`.

## База данных

### Локально (по умолчанию)

JSON-файлы в `data/`.

### Продакшн

Postgres через `DATABASE_URL`.

Запуск Postgres через Docker:
```bash
docker compose up -d
```

## Тесты

```bash
npm test
```

Отдельный MVP smoke-check:
```bash
npm run smoke
```

Покрыты:

- проверка достоверности событий,
- дедупликация,
- генерация `.ics`,
- парсинг `.ics`,
- фильтрация API.

## Основные endpoints

- `GET /api/health`
- `GET /api/events`
  - query params: `start`, `end`, `category`, `placeType`, `q`
- `GET /api/events/week`
- `GET /api/events/month`
- `GET /api/calendar.ics`
  - query param (optional): `eventId`
- `GET /api/google/oauth/start?eventId=<id>` (optional direct insert, если настроен Google OAuth)
- `GET /api/google/oauth/callback` (OAuth callback)
- `POST /api/events` (admin)
- `POST /api/ingest` (admin)
- `POST /api/refresh-all` (admin)
- `POST /api/ai/enrich` (admin, optional OpenAI)
- `POST /api/telegram/webhook`

## Backlog

### Следующий этап после завершения сайта: conversational Telegram-бот

- Добавить сценарий вопроса: `Что мне сделать сегодня?`
- Бот должен:
  - показать актуальные события на сегодня,
  - уточнить, какой тип событий интересует пользователя,
  - уметь отвечать и на запросы по конкретной дате,
  - использовать тот же каталог событий, что и сайт, без отдельной ручной базы.
- Первый релиз бота делать как discovery-assistant, а не как сложный AI-консьерж:
  - сначала подборка + уточняющий вопрос по категории,
  - затем выдача релевантных событий со ссылками на источник.
