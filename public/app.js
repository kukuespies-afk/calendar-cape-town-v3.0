const DEFAULT_TIMEZONE = 'Africa/Johannesburg';
const DEFAULT_MAP_EMBED = 'https://www.google.com/maps?q=Cape%20Town&output=embed';
const STORAGE_KEYS = {
  lang: 'afisha_cape_lang_v2',
  saved: 'afisha_cape_saved_v2'
};

const CATEGORY_CHIPS = [
  { id: 'all', key: 'chipAll' },
  { id: 'artCulture', key: 'chipArtCulture' },
  { id: 'foodWine', key: 'chipFoodWine' },
  { id: 'nightlife', key: 'chipNightlife' },
  { id: 'markets', key: 'chipMarkets' },
  { id: 'outdoors', key: 'chipOutdoors' }
];

const CATEGORY_LABELS = {
  festival: { en: 'Festival', ru: 'Фестиваль' },
  sport: { en: 'Sport', ru: 'Спорт' },
  music: { en: 'Music', ru: 'Музыка' },
  cinema: { en: 'Cinema', ru: 'Кино' },
  art: { en: 'Art', ru: 'Искусство' },
  dance: { en: 'Dance', ru: 'Танцы' },
  nightlife: { en: 'Nightlife', ru: 'Ночная жизнь' },
  local: { en: 'Local', ru: 'Локальное' },
  brand: { en: 'Brand', ru: 'Бренды' },
  vintage: { en: 'Vintage', ru: 'Винтаж' },
  fair: { en: 'Fair', ru: 'Ярмарка' },
  market: { en: 'Market', ru: 'Маркет' },
  other: { en: 'Other', ru: 'Другое' }
};

const PLACE_LABELS = {
  beach: { en: 'Beach', ru: 'Пляж' },
  winery: { en: 'Winery', ru: 'Винодельня' },
  mall: { en: 'Mall', ru: 'ТЦ' },
  exhibition_complex: { en: 'Exhibition complex', ru: 'Выставочный комплекс' },
  stadium: { en: 'Stadium', ru: 'Стадион' },
  theatre: { en: 'Theatre', ru: 'Театр' },
  gallery: { en: 'Gallery', ru: 'Галерея' },
  club: { en: 'Club / bar', ru: 'Клуб / бар' },
  shopping_district: { en: 'Shopping district', ru: 'Торговый район' },
  community_hub: { en: 'Community hub', ru: 'Комьюнити-хаб' },
  studio: { en: 'Studio', ru: 'Студия' },
  market: { en: 'Market venue', ru: 'Маркет-площадка' },
  park: { en: 'Park', ru: 'Парк' },
  waterfront: { en: 'Waterfront', ru: 'Ватерфронт' },
  other: { en: 'Other', ru: 'Другое' }
};

const SA_FIXED_HOLIDAYS = [
  { month: 1, day: 1, label: 'New Year\'s Day' },
  { month: 3, day: 21, label: 'Human Rights Day' },
  { month: 4, day: 27, label: 'Freedom Day' },
  { month: 5, day: 1, label: 'Workers\' Day' },
  { month: 6, day: 16, label: 'Youth Day' },
  { month: 8, day: 9, label: 'National Women\'s Day' },
  { month: 9, day: 24, label: 'Heritage Day' },
  { month: 12, day: 16, label: 'Day of Reconciliation' },
  { month: 12, day: 25, label: 'Christmas Day' },
  { month: 12, day: 26, label: 'Day of Goodwill' }
];

const TRANSLATIONS = {
  en: {
    title: 'AFISHA CAPE · Cape Town Events MVP',
    kicker: 'Cape Town MVP',
    headline: 'Find a plan in 1-2 minutes',
    subheadline: 'Trusted source, clear map, fast calendar add.',
    downloadAllIcs: 'Download all .ics',
    jumpToNow: 'Jump to today',
    navCalendar: 'Calendar',
    navMap: 'Map',
    navSaved: 'Saved',
    search: 'Search',
    searchPlaceholder: 'Search by event, venue, area',
    presetToday: 'Today',
    presetWeek: 'This week',
    presetWeekend: 'Weekend',
    presetMonth: 'This month',
    priceAll: 'All prices',
    priceFree: 'Free',
    pricePaid: 'Paid',
    firstThursdayLayer: 'First Thursdays only',
    holidayLayer: 'Public holidays',
    weekendLayer: 'Weekends',
    calendarViewLabel: 'Calendar view',
    month: 'Month',
    week: 'Week',
    today: 'Today',
    selectedDay: 'Selected day',
    mapViewLabel: 'Map + list',
    mapReady: 'Address and map are always visible',
    mobileMap: 'Map',
    mobileList: 'List',
    savedViewLabel: 'Saved',
    savedSubtitle: 'Your shortlist for tonight and weekend',
    location: 'Location',
    viewSource: 'View source',
    openMap: 'Open map',
    addGoogle: 'Add to Google Calendar',
    downloadIcs: 'Download .ics',
    footerNote: 'MVP focused on quick planning, trusted source links, and clear Cape Town geography.',
    chipAll: 'All',
    chipArtCulture: 'Art & culture',
    chipFoodWine: 'Food & wine',
    chipNightlife: 'Nightlife',
    chipMarkets: 'Markets',
    chipOutdoors: 'Outdoors',
    emptyDay: 'No events for this day.',
    emptyFilter: 'No events match current filters.',
    emptyMap: 'No map results for current filters.',
    emptySaved: 'Nothing saved yet.',
    addToCalendar: 'Add to calendar',
    ratingsReviews: 'Ratings & reviews',
    reviews: 'reviews',
    reviewsOnSource: 'Ratings and reviews are available on the source page.',
    freeLabel: 'Free',
    paidFrom: 'Paid • from',
    paidCheckSource: 'Paid • check source',
    priceOnSource: 'Price on source',
    unknownPrice: 'Unknown price',
    sourceLabel: 'Source',
    savedCount: 'Saved: {count}',
    eventsCount: '{count} events',
    firstThuTag: 'First Thu',
    holidayTag: 'Holiday',
    weekendTag: 'Weekend',
    noVenue: 'Venue on source',
    noAddress: 'Address on source',
    noSource: 'Source unavailable',
    sourceOnly: 'Source only',
    selectDateHint: 'Select a day to inspect events'
  },
  ru: {
    title: 'AFISHA CAPE · MVP событий Кейптауна',
    kicker: 'Cape Town MVP',
    headline: 'Найдите план за 1-2 минуты',
    subheadline: 'Надёжный источник, понятная карта, быстрый add-to-calendar.',
    downloadAllIcs: 'Скачать все .ics',
    jumpToNow: 'К сегодня',
    navCalendar: 'Календарь',
    navMap: 'Карта',
    navSaved: 'Сохранённое',
    search: 'Поиск',
    searchPlaceholder: 'Поиск по событию, месту, району',
    presetToday: 'Сегодня',
    presetWeek: 'Неделя',
    presetWeekend: 'Выходные',
    presetMonth: 'Месяц',
    priceAll: 'Любая цена',
    priceFree: 'Бесплатно',
    pricePaid: 'Платно',
    firstThursdayLayer: 'Только First Thursdays',
    holidayLayer: 'Праздники ЮАР',
    weekendLayer: 'Выходные',
    calendarViewLabel: 'Календарный вид',
    month: 'Месяц',
    week: 'Неделя',
    today: 'Сегодня',
    selectedDay: 'Выбранный день',
    mapViewLabel: 'Карта + список',
    mapReady: 'Адрес и карта всегда на экране',
    mobileMap: 'Карта',
    mobileList: 'Список',
    savedViewLabel: 'Сохранённое',
    savedSubtitle: 'Ваш shortlist на вечер и выходные',
    location: 'Локация',
    viewSource: 'View source',
    openMap: 'Open map',
    addGoogle: 'Добавить в Google Calendar',
    downloadIcs: 'Скачать .ics',
    footerNote: 'MVP фокусируется на быстром выборе, источнике и понятной географии Кейптауна.',
    chipAll: 'Все',
    chipArtCulture: 'Арт и культура',
    chipFoodWine: 'Еда и вино',
    chipNightlife: 'Ночная жизнь',
    chipMarkets: 'Маркеты',
    chipOutdoors: 'На улице',
    emptyDay: 'На этот день событий нет.',
    emptyFilter: 'По текущим фильтрам событий нет.',
    emptyMap: 'Для карты нет результатов по текущим фильтрам.',
    emptySaved: 'Вы ещё ничего не сохранили.',
    addToCalendar: 'Add to calendar',
    ratingsReviews: 'Рейтинг и отзывы',
    reviews: 'отзывов',
    reviewsOnSource: 'Рейтинг и отзывы доступны на странице источника.',
    freeLabel: 'Free',
    paidFrom: 'Paid • from',
    paidCheckSource: 'Paid • check source',
    priceOnSource: 'Price on source',
    unknownPrice: 'Цена неизвестна',
    sourceLabel: 'Источник',
    savedCount: 'Сохранено: {count}',
    eventsCount: '{count} событий',
    firstThuTag: 'First Thu',
    holidayTag: 'Праздник',
    weekendTag: 'Выходной',
    noVenue: 'Локация в источнике',
    noAddress: 'Адрес в источнике',
    noSource: 'Источник недоступен',
    sourceOnly: 'Только источник',
    selectDateHint: 'Выберите день и посмотрите события'
  }
};

const HOLIDAY_CACHE = new Map();

const elements = {
  body: document.body,
  navButtons: document.querySelectorAll('.top-nav-item[data-view]'),
  viewPanels: document.querySelectorAll('.view-panel[data-view-panel]'),
  searchInput: document.getElementById('searchInput'),
  datePresetButtons: document.querySelectorAll('.segment-item[data-date-preset]'),
  priceButtons: document.querySelectorAll('.segment-item[data-price-filter]'),
  langButtons: document.querySelectorAll('.segment-item[data-lang]'),
  firstThursdayToggle: document.getElementById('firstThursdayToggle'),
  holidayToggle: document.getElementById('holidayToggle'),
  weekendToggle: document.getElementById('weekendToggle'),
  categoryChips: document.getElementById('categoryChips'),
  calendarRangeLabel: document.getElementById('calendarRangeLabel'),
  monthModeButton: document.getElementById('monthModeButton'),
  weekModeButton: document.getElementById('weekModeButton'),
  weekdayRow: document.getElementById('weekdayRow'),
  calendarGrid: document.getElementById('calendarGrid'),
  selectedDayLabel: document.getElementById('selectedDayLabel'),
  selectedDayMeta: document.getElementById('selectedDayMeta'),
  calendarEventList: document.getElementById('calendarEventList'),
  mapList: document.getElementById('mapList'),
  mapFrame: document.getElementById('mapFrame'),
  savedList: document.getElementById('savedList'),
  savedCountLabel: document.getElementById('savedCountLabel'),
  mobileSurfaceButtons: document.querySelectorAll('.segment-item[data-mobile-surface]'),
  prevButton: document.getElementById('prevButton'),
  nextButton: document.getElementById('nextButton'),
  todayButton: document.getElementById('todayButton'),
  jumpToNowButton: document.getElementById('jumpToNowButton'),
  eventCardTemplate: document.getElementById('eventCardTemplate'),
  drawer: document.getElementById('eventDrawer'),
  drawerClose: document.getElementById('drawerClose'),
  drawerCategory: document.getElementById('drawerCategory'),
  drawerTitle: document.getElementById('drawerTitle'),
  drawerDatetime: document.getElementById('drawerDatetime'),
  drawerPriceRow: document.getElementById('drawerPriceRow'),
  drawerDescription: document.getElementById('drawerDescription'),
  drawerVenue: document.getElementById('drawerVenue'),
  drawerAddress: document.getElementById('drawerAddress'),
  drawerMapFrame: document.getElementById('drawerMapFrame'),
  drawerRatingBlock: document.getElementById('drawerRatingBlock'),
  drawerSourceButton: document.getElementById('drawerSourceButton'),
  drawerMapButton: document.getElementById('drawerMapButton'),
  drawerGoogleButton: document.getElementById('drawerGoogleButton'),
  drawerIcsButton: document.getElementById('drawerIcsButton')
};

const state = {
  lang: loadLang(),
  timezone: DEFAULT_TIMEZONE,
  now: new Date(),
  view: 'calendar',
  calendarMode: 'month',
  datePreset: 'today',
  cursor: new Date(),
  selectedDateKey: '',
  search: '',
  priceFilter: 'all',
  activeChip: 'all',
  firstThursdayOnly: false,
  showHolidayLayer: true,
  showWeekendLayer: true,
  mobileSurface: 'map',
  googleCalendarDirectInsertEnabled: false,
  events: [],
  filteredEvents: [],
  savedById: loadSavedById(),
  mapEventId: null,
  drawerEventId: null
};

let searchDebounce = null;

function loadLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.lang);
    if (stored === 'ru' || stored === 'en') return stored;
  } catch {
    // noop
  }
  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

function loadSavedById() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.saved);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch {
    // noop
  }
  return {};
}

function persistSavedById() {
  try {
    localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(state.savedById));
  } catch {
    // noop
  }
}

function persistLang() {
  try {
    localStorage.setItem(STORAGE_KEYS.lang, state.lang);
  } catch {
    // noop
  }
}

function t(key, vars = {}) {
  const table = TRANSLATIONS[state.lang] || TRANSLATIONS.en;
  const fallback = TRANSLATIONS.en[key] || key;
  let text = table[key] || fallback;
  for (const [name, value] of Object.entries(vars)) {
    text = text.replaceAll(`{${name}}`, String(value));
  }
  return text;
}

function localeCode() {
  return state.lang === 'ru' ? 'ru-RU' : 'en-ZA';
}

function cleanText(value = '') {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeText(value = '') {
  return cleanText(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ');
}

function toDateKeyInTimezone(dateLike, timeZone = DEFAULT_TIMEZONE) {
  const date = new Date(dateLike);
  if (Number.isNaN(date.getTime())) return '';

  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(date);

    const year = parts.find((part) => part.type === 'year')?.value;
    const month = parts.find((part) => part.type === 'month')?.value;
    const day = parts.find((part) => part.type === 'day')?.value;
    if (year && month && day) {
      return `${year}-${month}-${day}`;
    }
  } catch {
    // fallback below
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = String(dateKey || '').split('-').map(Number);
  if (!year || !month || !day) return new Date();
  return new Date(year, month - 1, day);
}

function startOfWeekMonday(dateLike) {
  const date = new Date(dateLike);
  date.setHours(0, 0, 0, 0);
  const day = date.getDay();
  const delta = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + delta);
  return date;
}

function addDays(dateLike, days) {
  const date = new Date(dateLike);
  date.setDate(date.getDate() + days);
  return date;
}

function addHours(dateLike, hours) {
  const date = new Date(dateLike);
  date.setHours(date.getHours() + hours);
  return date;
}

function startOfMonth(dateLike) {
  const date = new Date(dateLike);
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(dateLike) {
  const date = new Date(dateLike);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function formatDateTime(dateLike, opts = {}) {
  return new Intl.DateTimeFormat(localeCode(), {
    timeZone: state.timezone,
    ...opts
  }).format(new Date(dateLike));
}

function weekdayLabels() {
  const monday = new Date(2026, 0, 5);
  return Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat(localeCode(), { weekday: 'short' }).format(addDays(monday, index))
  );
}

function isFirstThursday(dateLike) {
  const date = new Date(dateLike);
  return date.getDay() === 4 && date.getDate() <= 7;
}

function calculateEasterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function buildHolidayMap(year) {
  if (HOLIDAY_CACHE.has(year)) return HOLIDAY_CACHE.get(year);

  const map = new Map();
  const put = (dateLike, label) => {
    const key = toDateKeyInTimezone(dateLike, state.timezone);
    const list = map.get(key) || [];
    if (!list.includes(label)) list.push(label);
    map.set(key, list);
  };

  const easter = calculateEasterSunday(year);
  const floating = [
    { date: addDays(easter, -2), label: 'Good Friday' },
    { date: addDays(easter, 1), label: 'Family Day' }
  ];

  const all = [
    ...SA_FIXED_HOLIDAYS.map((item) => ({
      date: new Date(year, item.month - 1, item.day),
      label: item.label
    })),
    ...floating
  ];

  for (const holiday of all) {
    put(holiday.date, holiday.label);
    if (holiday.date.getDay() === 0) {
      put(addDays(holiday.date, 1), `${holiday.label} (Observed)`);
    }
  }

  HOLIDAY_CACHE.set(year, map);
  return map;
}

function getHolidayLabels(dateLike) {
  const date = new Date(dateLike);
  const map = buildHolidayMap(date.getFullYear());
  const key = toDateKeyInTimezone(date, state.timezone);
  return map.get(key) || [];
}

function categoryLabel(category) {
  const entry = CATEGORY_LABELS[category] || CATEGORY_LABELS.other;
  return state.lang === 'ru' ? entry.ru : entry.en;
}

function placeLabel(placeType) {
  const entry = PLACE_LABELS[placeType] || PLACE_LABELS.other;
  return state.lang === 'ru' ? entry.ru : entry.en;
}

function formatCalendarRangeLabel(range) {
  if (state.calendarMode === 'month') {
    return new Intl.DateTimeFormat(localeCode(), {
      month: 'long',
      year: 'numeric'
    }).format(range.start);
  }

  const startLabel = formatDateTime(range.start, { day: '2-digit', month: 'short' });
  const endLabel = formatDateTime(range.end, { day: '2-digit', month: 'short', year: 'numeric' });
  return `${startLabel} - ${endLabel}`;
}

function eventDateKey(event) {
  return toDateKeyInTimezone(event.startAt, state.timezone);
}

function getVisibleRange() {
  if (state.calendarMode === 'week') {
    const start = startOfWeekMonday(state.cursor);
    const end = addDays(start, 6);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  const start = startOfMonth(state.cursor);
  const end = endOfMonth(state.cursor);
  return { start, end };
}

function formatEventTime(event) {
  const start = formatDateTime(event.startAt, {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  if (!event.endAt) return start;
  const end = formatDateTime(event.endAt, {
    hour: '2-digit',
    minute: '2-digit'
  });
  return `${start} - ${end}`;
}

function eventSearchBlob(event) {
  return normalizeText([
    event.title,
    event.description,
    event.shortDescription,
    event.venue,
    event.address,
    event.category,
    event.placeType,
    event.sourceName,
    Array.isArray(event.tags) ? event.tags.join(' ') : ''
  ].join(' '));
}

function findPriceAmount(rawPrice = '') {
  const match = String(rawPrice).match(/(?:R|ZAR|\$)\s?\d+[\d,.]*/i);
  return match ? match[0].replace(/\s+/g, ' ') : '';
}

function detectPriceMeta(event) {
  const raw = cleanText(event.price);
  if (!raw) {
    return {
      tier: 'unknown',
      text: t('priceOnSource'),
      className: 'badge-source-price'
    };
  }

  const value = raw.toLowerCase();
  const freeKeywords = ['free', 'бесплат', 'no charge', 'free entry', 'mostly free'];
  if (freeKeywords.some((keyword) => value.includes(keyword))) {
    return {
      tier: 'free',
      text: t('freeLabel'),
      className: 'badge-free'
    };
  }

  const amount = findPriceAmount(raw);
  const paidHints = ['paid', 'ticket', 'registration', 'venue dependent', 'check source', 'проверьте', 'от', 'from', 'by registration'];
  if (amount) {
    return {
      tier: 'paid',
      text: `${t('paidFrom')} ${amount}`,
      className: 'badge-paid'
    };
  }

  if (paidHints.some((keyword) => value.includes(keyword))) {
    return {
      tier: 'paid',
      text: t('paidCheckSource'),
      className: 'badge-paid'
    };
  }

  return {
    tier: 'unknown',
    text: t('priceOnSource'),
    className: 'badge-source-price'
  };
}

function detectRatingMeta(event) {
  const rawRating = Number(event.rating ?? event.placeRating ?? event.googleRating ?? Number.NaN);
  const rawReviews = Number(event.reviewCount ?? event.reviewsCount ?? event.userRatingsTotal ?? Number.NaN);

  if (!Number.isFinite(rawRating)) return null;

  return {
    rating: rawRating.toFixed(1),
    reviews: Number.isFinite(rawReviews) ? rawReviews : null
  };
}

function mapQuery(event) {
  const chunks = [cleanText(event.venue), cleanText(event.address), 'Cape Town'].filter(Boolean);
  return chunks.join(', ');
}

function eventSourceUrl(event) {
  const source = cleanText(event.sourceUrl) || cleanText(event.ticketsUrl);
  return source || mapDeepLink(event);
}

function mapDeepLink(event) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery(event))}`;
}

function mapEmbedLink(event) {
  return `https://www.google.com/maps?q=${encodeURIComponent(mapQuery(event))}&output=embed`;
}

function toGoogleDate(dateLike) {
  return new Date(dateLike).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function googleCalendarLink(event) {
  const start = event.startAt;
  const end = event.endAt || addHours(event.startAt, 2).toISOString();
  const details = [
    cleanText(event.description),
    event.sourceUrl ? `${t('sourceLabel')}: ${event.sourceUrl}` : ''
  ].filter(Boolean).join('\n\n');

  const params = new URLSearchParams();
  params.set('action', 'TEMPLATE');
  params.set('text', cleanText(event.title) || 'Cape Town Event');
  params.set('dates', `${toGoogleDate(start)}/${toGoogleDate(end)}`);
  params.set('location', mapQuery(event));
  if (details) params.set('details', details);
  if (event.sourceUrl) params.set('sprop', `website:${event.sourceUrl}`);

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function eventIcsLink(event) {
  return `/api/calendar.ics?eventId=${encodeURIComponent(event.id)}`;
}

function googleOauthStartLink(event) {
  return `/api/google/oauth/start?eventId=${encodeURIComponent(event.id)}`;
}

function matchesCategoryChip(event) {
  switch (state.activeChip) {
    case 'artCulture':
      return ['art', 'fair', 'festival', 'cinema'].includes(event.category);
    case 'foodWine': {
      const tags = Array.isArray(event.tags) ? event.tags.join(' ').toLowerCase() : '';
      return ['market', 'local', 'brand'].includes(event.category) || event.placeType === 'winery' || tags.includes('food') || tags.includes('wine');
    }
    case 'nightlife':
      return ['nightlife', 'dance', 'music'].includes(event.category);
    case 'markets':
      return ['market', 'vintage', 'fair', 'brand'].includes(event.category);
    case 'outdoors':
      return ['sport', 'local', 'festival'].includes(event.category) || ['beach', 'park', 'waterfront'].includes(event.placeType);
    default:
      return true;
  }
}

function inVisibleRange(event, range) {
  const startKey = toDateKeyInTimezone(range.start, state.timezone);
  const endKey = toDateKeyInTimezone(range.end, state.timezone);
  const key = eventDateKey(event);
  return key >= startKey && key <= endKey;
}

function applyFilters(events) {
  const range = getVisibleRange();
  const search = normalizeText(state.search);

  return events
    .filter((event) => inVisibleRange(event, range))
    .filter((event) => {
      if (!search) return true;
      return eventSearchBlob(event).includes(search);
    })
    .filter((event) => matchesCategoryChip(event))
    .filter((event) => {
      const price = detectPriceMeta(event);
      if (state.priceFilter === 'free') return price.tier === 'free';
      if (state.priceFilter === 'paid') return price.tier === 'paid';
      return true;
    })
    .filter((event) => {
      if (!state.firstThursdayOnly) return true;
      return isFirstThursday(parseDateKey(eventDateKey(event)));
    })
    .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
}

function getEventsForSelectedDay() {
  return state.filteredEvents.filter((event) => eventDateKey(event) === state.selectedDateKey);
}

function getEventById(eventId) {
  return state.events.find((event) => String(event.id) === String(eventId)) || state.savedById[eventId] || null;
}

function isSaved(eventId) {
  return Boolean(state.savedById[eventId]);
}

function toggleSaved(event) {
  if (isSaved(event.id)) {
    delete state.savedById[event.id];
  } else {
    state.savedById[event.id] = {
      ...event,
      savedAt: new Date().toISOString()
    };
  }
  persistSavedById();
}

function mergeSavedWithFreshEvents() {
  for (const event of state.events) {
    if (state.savedById[event.id]) {
      state.savedById[event.id] = {
        ...state.savedById[event.id],
        ...event
      };
    }
  }
  persistSavedById();
}

function applyStaticTranslations() {
  document.documentElement.lang = state.lang;
  document.title = t('title');

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (!key) return;
    node.textContent = t(key);
  });

  elements.searchInput.placeholder = t('searchPlaceholder');
}

function renderCategoryChips() {
  elements.categoryChips.innerHTML = '';

  CATEGORY_CHIPS.forEach((chip) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'chip';
    if (chip.id === state.activeChip) button.classList.add('is-active');
    button.textContent = t(chip.key);
    button.addEventListener('click', () => {
      state.activeChip = chip.id;
      renderAll();
    });
    elements.categoryChips.appendChild(button);
  });
}

function syncControlStates() {
  elements.navButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.view === state.view);
  });

  elements.viewPanels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.dataset.viewPanel === state.view);
  });

  elements.datePresetButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.datePreset === state.datePreset);
  });

  elements.priceButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.priceFilter === state.priceFilter);
  });

  elements.langButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === state.lang);
  });

  elements.monthModeButton.classList.toggle('is-active', state.calendarMode === 'month');
  elements.weekModeButton.classList.toggle('is-active', state.calendarMode === 'week');

  elements.firstThursdayToggle.classList.toggle('is-active', state.firstThursdayOnly);
  elements.holidayToggle.classList.toggle('is-active', state.showHolidayLayer);
  elements.weekendToggle.classList.toggle('is-active', state.showWeekendLayer);

  elements.mobileSurfaceButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.mobileSurface === state.mobileSurface);
  });

  elements.body.dataset.mobileSurface = state.mobileSurface;
}

function renderWeekdayRow() {
  elements.weekdayRow.innerHTML = weekdayLabels()
    .map((label) => `<div class="weekday-cell">${label}</div>`)
    .join('');
}

function renderCalendarGrid() {
  const range = getVisibleRange();
  elements.calendarRangeLabel.textContent = formatCalendarRangeLabel(range);
  elements.calendarGrid.innerHTML = '';

  const eventsByDay = new Map();
  state.filteredEvents.forEach((event) => {
    const key = eventDateKey(event);
    const list = eventsByDay.get(key) || [];
    list.push(event);
    eventsByDay.set(key, list);
  });

  const monthAnchor = startOfMonth(state.cursor);
  const start = state.calendarMode === 'month' ? startOfWeekMonday(monthAnchor) : startOfWeekMonday(state.cursor);
  const total = state.calendarMode === 'month' ? 42 : 7;

  for (let index = 0; index < total; index += 1) {
    const day = addDays(start, index);
    const dayKey = toDateKeyInTimezone(day, state.timezone);
    const dayEvents = eventsByDay.get(dayKey) || [];
    const holidayLabels = getHolidayLabels(day);
    const dayCard = document.createElement('button');

    dayCard.type = 'button';
    dayCard.className = 'calendar-day';
    if (state.selectedDateKey === dayKey) dayCard.classList.add('is-selected');
    if (state.calendarMode === 'month' && day.getMonth() !== monthAnchor.getMonth()) dayCard.classList.add('is-other-month');
    if (state.showWeekendLayer && (day.getDay() === 0 || day.getDay() === 6)) dayCard.classList.add('is-weekend');
    if (state.showHolidayLayer && holidayLabels.length) dayCard.classList.add('is-holiday');
    if (isFirstThursday(day)) dayCard.classList.add('is-first-thursday');

    const labelParts = [];
    if (isFirstThursday(day)) labelParts.push(t('firstThuTag'));
    if (state.showHolidayLayer && holidayLabels.length) labelParts.push(t('holidayTag'));
    if (state.showWeekendLayer && (day.getDay() === 0 || day.getDay() === 6)) labelParts.push(t('weekendTag'));

    const dots = new Array(Math.min(3, dayEvents.length)).fill('<span class="density-dot"></span>').join('');

    dayCard.innerHTML = `
      <span class="calendar-day-number">${day.getDate()}</span>
      <span class="calendar-day-label">${labelParts.join(' • ')}</span>
      <span class="density">${dots}${dayEvents.length ? `<span class="density-count">${dayEvents.length}</span>` : ''}</span>
    `;

    dayCard.addEventListener('click', () => {
      state.selectedDateKey = dayKey;
      renderAll();
    });

    elements.calendarGrid.appendChild(dayCard);
  }
}

function createBadge(text, className = '') {
  const badge = document.createElement('span');
  badge.className = `badge ${className}`.trim();
  badge.textContent = text;
  return badge;
}

function createEventCard(event, context = 'calendar') {
  const card = elements.eventCardTemplate.content.firstElementChild.cloneNode(true);
  const titleNode = card.querySelector('.event-title');
  const kickerNode = card.querySelector('.event-kicker');
  const timeNode = card.querySelector('.event-time');
  const locationNode = card.querySelector('.event-location');
  const summaryNode = card.querySelector('.event-summary');
  const badgesNode = card.querySelector('.event-badges');
  const saveButton = card.querySelector('.save-btn');
  const sourceLink = card.querySelector('.source-link');
  const mapLink = card.querySelector('.map-link');
  const detailsButton = card.querySelector('.details-link');

  const title = cleanText(event.title) || 'Event';
  const summary = cleanText(event.shortDescription || event.description || '');
  const venue = cleanText(event.venue) || t('noVenue');
  const address = cleanText(event.address) || t('noAddress');
  const priceMeta = detectPriceMeta(event);
  const ratingMeta = detectRatingMeta(event);

  const firstThursday = isFirstThursday(parseDateKey(eventDateKey(event)));
  const category = categoryLabel(event.category);
  const place = placeLabel(event.placeType);

  titleNode.textContent = title;
  kickerNode.textContent = `${category} • ${place}`;
  timeNode.textContent = formatEventTime(event);
  locationNode.textContent = `${venue} • ${address}`;
  summaryNode.textContent = summary;

  if (!summary) {
    summaryNode.remove();
  }

  badgesNode.appendChild(createBadge(priceMeta.text, priceMeta.className));
  badgesNode.appendChild(createBadge(category, 'badge-category'));

  if (firstThursday) {
    badgesNode.appendChild(createBadge(t('firstThuTag'), 'badge-free'));
  }

  if (ratingMeta) {
    const reviews = ratingMeta.reviews ? ` (${ratingMeta.reviews})` : '';
    badgesNode.appendChild(createBadge(`${ratingMeta.rating}/5${reviews}`, 'badge-source-price'));
  }

  saveButton.classList.toggle('is-saved', isSaved(event.id));
  saveButton.textContent = isSaved(event.id) ? '★' : '☆';
  saveButton.addEventListener('click', (evt) => {
    evt.stopPropagation();
    toggleSaved(event);
    renderAll();
  });

  sourceLink.href = eventSourceUrl(event);
  sourceLink.textContent = t('viewSource');

  mapLink.href = mapDeepLink(event);
  mapLink.textContent = t('openMap');

  detailsButton.textContent = t('addToCalendar');
  detailsButton.addEventListener('click', () => {
    openDrawer(event.id);
  });

  if (context === 'map') {
    card.addEventListener('click', (evt) => {
      if (evt.target.closest('button, a')) return;
      state.mapEventId = event.id;
      updateMapFrame();
      renderMapPanel();
    });

    if (state.mapEventId === event.id) {
      card.style.borderColor = 'rgba(13, 43, 69, 0.48)';
      card.style.boxShadow = 'inset 0 0 0 1px rgba(13, 43, 69, 0.4)';
    }
  }

  return card;
}

function renderList(container, events, emptyKey, context = 'calendar') {
  container.innerHTML = '';
  if (!events.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = t(emptyKey);
    container.appendChild(empty);
    return;
  }

  events.forEach((event) => {
    container.appendChild(createEventCard(event, context));
  });
}

function renderSelectedDayPanel() {
  const selectedDate = parseDateKey(state.selectedDateKey);
  const dayLabel = formatDateTime(selectedDate, {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  });
  const dayEvents = getEventsForSelectedDay();

  elements.selectedDayLabel.textContent = dayLabel;
  elements.selectedDayMeta.textContent = dayEvents.length ? t('eventsCount', { count: dayEvents.length }) : t('selectDateHint');

  renderList(elements.calendarEventList, dayEvents, 'emptyDay', 'calendar');
}

function updateMapFrame() {
  const event = getEventById(state.mapEventId);
  if (!event) {
    elements.mapFrame.src = DEFAULT_MAP_EMBED;
    return;
  }
  elements.mapFrame.src = mapEmbedLink(event);
}

function renderMapPanel() {
  renderList(elements.mapList, state.filteredEvents, 'emptyMap', 'map');

  const hasMapEvent = state.filteredEvents.some((event) => event.id === state.mapEventId);
  if (!hasMapEvent) {
    state.mapEventId = state.filteredEvents[0]?.id || null;
  }

  updateMapFrame();
}

function renderSavedPanel() {
  const savedEvents = Object.values(state.savedById)
    .filter((event) => event && event.startAt)
    .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));

  elements.savedCountLabel.textContent = t('savedCount', { count: savedEvents.length });
  renderList(elements.savedList, savedEvents, 'emptySaved', 'saved');
}

function getNextSaturday(fromDate) {
  const date = new Date(fromDate);
  date.setHours(0, 0, 0, 0);
  while (date.getDay() !== 6) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

function applyDatePreset(preset) {
  state.datePreset = preset;

  if (preset === 'today') {
    state.calendarMode = 'week';
    state.cursor = new Date(state.now);
    state.selectedDateKey = toDateKeyInTimezone(state.now, state.timezone);
    return;
  }

  if (preset === 'week') {
    state.calendarMode = 'week';
    state.cursor = new Date(state.now);
    state.selectedDateKey = toDateKeyInTimezone(state.now, state.timezone);
    return;
  }

  if (preset === 'weekend') {
    const saturday = getNextSaturday(state.now);
    state.calendarMode = 'week';
    state.cursor = saturday;
    state.selectedDateKey = toDateKeyInTimezone(saturday, state.timezone);
    return;
  }

  state.calendarMode = 'month';
  state.cursor = new Date(state.now);
  state.selectedDateKey = toDateKeyInTimezone(state.now, state.timezone);
}

function openDrawer(eventId) {
  const event = getEventById(eventId);
  if (!event) return;

  const ratingMeta = detectRatingMeta(event);
  const priceMeta = detectPriceMeta(event);
  const sourceUrl = eventSourceUrl(event);

  state.drawerEventId = event.id;

  elements.drawerCategory.textContent = `${categoryLabel(event.category)} • ${placeLabel(event.placeType)}`;
  elements.drawerTitle.textContent = cleanText(event.title) || 'Event';
  elements.drawerDatetime.textContent = formatEventTime(event);
  elements.drawerPriceRow.innerHTML = '';
  elements.drawerPriceRow.appendChild(createBadge(priceMeta.text, priceMeta.className));
  elements.drawerDescription.textContent = cleanText(event.description || event.shortDescription || '');
  elements.drawerVenue.textContent = cleanText(event.venue) || t('noVenue');
  elements.drawerAddress.textContent = cleanText(event.address) || t('noAddress');

  elements.drawerMapFrame.src = mapEmbedLink(event);

  elements.drawerRatingBlock.innerHTML = '';
  const title = document.createElement('h4');
  title.textContent = t('ratingsReviews');
  const body = document.createElement('p');
  if (ratingMeta) {
    body.textContent = ratingMeta.reviews
      ? `${ratingMeta.rating}/5 • ${ratingMeta.reviews} ${t('reviews')}`
      : `${ratingMeta.rating}/5`;
  } else {
    body.textContent = t('reviewsOnSource');
  }
  elements.drawerRatingBlock.appendChild(title);
  elements.drawerRatingBlock.appendChild(body);

  elements.drawerSourceButton.href = sourceUrl;
  elements.drawerSourceButton.removeAttribute('aria-disabled');

  elements.drawerMapButton.href = mapDeepLink(event);
  elements.drawerGoogleButton.href = state.googleCalendarDirectInsertEnabled
    ? googleOauthStartLink(event)
    : googleCalendarLink(event);
  elements.drawerIcsButton.href = eventIcsLink(event);

  elements.drawer.hidden = false;
  elements.body.classList.add('drawer-open');
}

function closeDrawer() {
  state.drawerEventId = null;
  elements.drawer.hidden = true;
  elements.body.classList.remove('drawer-open');
}

function ensureSelectedDateInRange() {
  const range = getVisibleRange();
  const selected = parseDateKey(state.selectedDateKey);
  if (selected < range.start || selected > range.end) {
    state.selectedDateKey = toDateKeyInTimezone(range.start, state.timezone);
  }
}

function renderAll() {
  applyStaticTranslations();
  renderCategoryChips();
  syncControlStates();
  renderWeekdayRow();

  ensureSelectedDateInRange();
  state.filteredEvents = applyFilters(state.events);

  renderCalendarGrid();
  renderSelectedDayPanel();
  renderMapPanel();
  renderSavedPanel();
}

async function loadInitialData() {
  const healthRes = await fetch('/api/health', { cache: 'no-store' });
  if (healthRes.ok) {
    const health = await healthRes.json();
    if (health.timezone) {
      state.timezone = String(health.timezone);
    }
    if (health.googleCalendarDirectInsertEnabled === true) {
      state.googleCalendarDirectInsertEnabled = true;
    }
    if (health.now) {
      const now = new Date(health.now);
      if (!Number.isNaN(now.getTime())) {
        state.now = now;
      }
    }
  }

  const eventsRes = await fetch('/api/events', { cache: 'no-store' });
  if (!eventsRes.ok) throw new Error(`events_${eventsRes.status}`);
  const payload = await eventsRes.json();
  state.events = Array.isArray(payload.events) ? payload.events : [];

  state.cursor = new Date(state.now);
  state.selectedDateKey = toDateKeyInTimezone(state.now, state.timezone);
  applyDatePreset('today');
  mergeSavedWithFreshEvents();
}

function wireUi() {
  elements.navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.view = button.dataset.view || 'calendar';
      renderAll();
    });
  });

  elements.searchInput.addEventListener('input', (event) => {
    const value = event.target.value || '';
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      state.search = value;
      renderAll();
    }, 180);
  });

  elements.datePresetButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyDatePreset(button.dataset.datePreset || 'today');
      renderAll();
    });
  });

  elements.priceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.priceFilter = button.dataset.priceFilter || 'all';
      renderAll();
    });
  });

  elements.langButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.lang = button.dataset.lang === 'ru' ? 'ru' : 'en';
      persistLang();
      renderAll();
    });
  });

  elements.monthModeButton.addEventListener('click', () => {
    state.calendarMode = 'month';
    renderAll();
  });

  elements.weekModeButton.addEventListener('click', () => {
    state.calendarMode = 'week';
    renderAll();
  });

  elements.prevButton.addEventListener('click', () => {
    if (state.calendarMode === 'week') {
      state.cursor = addDays(state.cursor, -7);
    } else {
      state.cursor = new Date(state.cursor.getFullYear(), state.cursor.getMonth() - 1, 1);
    }
    renderAll();
  });

  elements.nextButton.addEventListener('click', () => {
    if (state.calendarMode === 'week') {
      state.cursor = addDays(state.cursor, 7);
    } else {
      state.cursor = new Date(state.cursor.getFullYear(), state.cursor.getMonth() + 1, 1);
    }
    renderAll();
  });

  elements.todayButton.addEventListener('click', () => {
    applyDatePreset('today');
    renderAll();
  });

  elements.jumpToNowButton.addEventListener('click', () => {
    state.view = 'calendar';
    applyDatePreset('today');
    renderAll();
  });

  elements.firstThursdayToggle.addEventListener('click', () => {
    state.firstThursdayOnly = !state.firstThursdayOnly;
    renderAll();
  });

  elements.holidayToggle.addEventListener('click', () => {
    state.showHolidayLayer = !state.showHolidayLayer;
    renderAll();
  });

  elements.weekendToggle.addEventListener('click', () => {
    state.showWeekendLayer = !state.showWeekendLayer;
    renderAll();
  });

  elements.mobileSurfaceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.mobileSurface = button.dataset.mobileSurface || 'map';
      renderAll();
    });
  });

  elements.drawerClose.addEventListener('click', closeDrawer);
  elements.drawer.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-close-drawer')) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !elements.drawer.hidden) {
      closeDrawer();
    }
  });
}

async function init() {
  wireUi();
  renderAll();

  try {
    await loadInitialData();
    renderAll();
  } catch (error) {
    console.error(error);
    state.events = [];
    renderAll();
  }
}

init();
