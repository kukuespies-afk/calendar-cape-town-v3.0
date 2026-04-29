const DEFAULT_TIMEZONE = 'Africa/Johannesburg';
const DEFAULT_MAP_EMBED = 'https://www.google.com/maps?q=Cape%20Town&output=embed';
const STORAGE_KEYS = {
  lang: 'afisha_cape_lang_v2',
  saved: 'afisha_cape_saved_v2',
  density: 'afisha_cape_density_v1'
};

const CATEGORY_CHIPS = [
  { id: 'all', key: 'chipAll' },
  { id: 'artCulture', key: 'chipArtCulture' },
  { id: 'music', key: 'chipMusic' },
  { id: 'cinema', key: 'chipCinema' },
  { id: 'sport', key: 'chipSport' },
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
  {
    key: 'new-year',
    month: 1,
    day: 1,
    name: { en: 'New Year\'s Day', ru: 'Новый год' },
    short: { en: 'New Year', ru: 'Новый год' },
    note: {
      en: 'The official start of the year and a national day off in South Africa.',
      ru: 'Официальное начало года и национальный выходной в ЮАР.'
    }
  },
  {
    key: 'human-rights-day',
    month: 3,
    day: 21,
    name: { en: 'Human Rights Day', ru: 'День прав человека' },
    short: { en: 'Human Rights Day', ru: 'День прав человека' },
    note: {
      en: 'Marks the struggle for civil rights and remembers the Sharpeville massacre.',
      ru: 'Напоминает о борьбе за гражданские права и памяти о Шарпевиле.'
    }
  },
  {
    key: 'freedom-day',
    month: 4,
    day: 27,
    name: { en: 'Freedom Day', ru: 'День свободы' },
    short: { en: 'Freedom Day', ru: 'День свободы' },
    note: {
      en: 'Commemorates South Africa’s first democratic elections in 1994.',
      ru: 'Отмечает первые демократические выборы в Южной Африке в 1994 году.'
    }
  },
  {
    key: 'workers-day',
    month: 5,
    day: 1,
    name: { en: 'Workers\' Day', ru: 'День трудящихся' },
    short: { en: 'Workers\' Day', ru: 'День трудящихся' },
    note: {
      en: 'A public holiday dedicated to labour rights and workers’ contributions.',
      ru: 'Праздник, посвящённый трудовым правам и вкладу работников.'
    }
  },
  {
    key: 'youth-day',
    month: 6,
    day: 16,
    name: { en: 'Youth Day', ru: 'День молодёжи' },
    short: { en: 'Youth Day', ru: 'День молодёжи' },
    note: {
      en: 'Honours the youth of 1976 and the Soweto uprising.',
      ru: 'Посвящён молодёжи 1976 года и восстанию в Соуэто.'
    }
  },
  {
    key: 'womens-day',
    month: 8,
    day: 9,
    name: { en: 'National Women\'s Day', ru: 'Национальный женский день' },
    short: { en: 'Women\'s Day', ru: 'Женский день' },
    note: {
      en: 'Marks the 1956 women’s march against pass laws.',
      ru: 'Напоминает о женском марше 1956 года против дискриминационных законов.'
    }
  },
  {
    key: 'heritage-day',
    month: 9,
    day: 24,
    name: { en: 'Heritage Day', ru: 'День наследия' },
    short: { en: 'Heritage Day', ru: 'День наследия' },
    note: {
      en: 'Celebrates South Africa’s many cultures, languages and traditions.',
      ru: 'Празднует культурное, языковое и традиционное разнообразие Южной Африки.'
    }
  },
  {
    key: 'reconciliation-day',
    month: 12,
    day: 16,
    name: { en: 'Day of Reconciliation', ru: 'День примирения' },
    short: { en: 'Reconciliation Day', ru: 'День примирения' },
    note: {
      en: 'A day focused on unity and reconciliation across communities.',
      ru: 'День, посвящённый единству и примирению между сообществами.'
    }
  },
  {
    key: 'christmas-day',
    month: 12,
    day: 25,
    name: { en: 'Christmas Day', ru: 'Рождество' },
    short: { en: 'Christmas', ru: 'Рождество' },
    note: {
      en: 'Christmas Day public holiday.',
      ru: 'Официальный выходной в день Рождества.'
    }
  },
  {
    key: 'goodwill-day',
    month: 12,
    day: 26,
    name: { en: 'Day of Goodwill', ru: 'День доброй воли' },
    short: { en: 'Day of Goodwill', ru: 'День доброй воли' },
    note: {
      en: 'Traditionally linked to family time, sharing and community.',
      ru: 'Традиционно связан с семьёй, взаимопомощью и временем вместе.'
    }
  }
];

const FIRST_THURSDAYS_INFO = {
  title: {
    en: 'First Thursdays',
    ru: 'First Thursdays'
  },
  short: {
    en: 'Gallery night',
    ru: 'Галерейный вечер'
  },
  note: {
    en: 'Cape Town’s monthly first-Thursday art night: galleries, studios, bars and late openings across the city.',
    ru: 'Ежемесячный арт-вечер в первый четверг месяца: галереи, студии, бары и поздние открытия по всему городу.'
  }
};

const FIRST_THURSDAY_ROUTES = [
  {
    tone: 'gallery',
    title: { en: 'Gallery Sprint', ru: 'Галерейный спринт' },
    note: {
      en: 'A short city-centre route for a first-timer: easy walking, early galleries, then one relaxed stop.',
      ru: 'Короткий маршрут по центру для первого раза: пешком, ранние галереи и один спокойный финальный стоп.'
    },
    stops: [
      { time: '17:30', en: 'Church Square / CBD start', ru: 'Старт у Church Square / CBD' },
      { time: '18:15', en: 'Loop and Bree Street galleries', ru: 'Галереи на Loop и Bree Street' },
      { time: '19:45', en: 'Dinner or drinks near Heritage Square', ru: 'Ужин или drinks рядом с Heritage Square' }
    ]
  },
  {
    tone: 'social',
    title: { en: 'Creative Night Out', ru: 'Креативный вечер' },
    note: {
      en: 'For a group plan: art first, then music, cocktails or a late opening nearby.',
      ru: 'Для компании: сначала арт, потом музыка, коктейли или late opening неподалёку.'
    },
    stops: [
      { time: '18:00', en: 'Start around Bree / Wale Street', ru: 'Начать в районе Bree / Wale Street' },
      { time: '19:30', en: 'Pick one live or DJ stop', ru: 'Выбрать один live или DJ-стоп' },
      { time: '21:00', en: 'Late bar in CBD or Kloof', ru: 'Поздний бар в CBD или Kloof' }
    ]
  },
  {
    tone: 'calm',
    title: { en: 'Low-Friction Evening', ru: 'Лёгкий вечер без суеты' },
    note: {
      en: 'A gentler route when you want the atmosphere without turning the night into logistics.',
      ru: 'Более мягкий маршрут, когда хочется атмосферы без сложной логистики.'
    },
    stops: [
      { time: '17:45', en: 'One anchor gallery or museum', ru: 'Одна главная галерея или музей' },
      { time: '18:45', en: 'Walkable second stop nearby', ru: 'Второй стоп рядом пешком' },
      { time: '20:00', en: 'Table booking or quick ride home', ru: 'Бронь на ужин или быстрый путь домой' }
    ]
  }
];

const MONTH_THEMES = [
  {
    key: 'jan',
    variant: 'stacked',
    scene: 'bo-kaap-sunrise',
    label: { en: 'Bo-Kaap Sunrise', ru: 'Рассвет в Бо-Каапе' },
    mini: { en: 'Terraces / candy paper', ru: 'Террасы / конфетная бумага' },
    caption: {
      en: 'Hand-drawn facades, sugar pink paper and a fast summer start in Cape Town.',
      ru: 'Рисованные фасады, сахарно-розовая бумага и быстрый летний старт Кейптауна.'
    },
    hero: {
      en: 'January turns the calendar into a bright Bo-Kaap poster with sun-washed terraces.',
      ru: 'Январь превращает календарь в яркий постер про Бо-Каап с залитыми солнцем террасами.'
    },
    palette: {
      page: '#efe6d9',
      glowA: 'rgba(255, 104, 162, 0.35)',
      glowB: 'rgba(255, 186, 118, 0.28)',
      surface: 'rgba(255, 248, 250, 0.85)',
      surfaceStrong: '#fff9fb',
      poster: '#ff9bc5',
      ink: '#6d1232',
      softInk: '#8a4860',
      accent: '#e73369',
      accentContrast: '#fff8fb',
      line: 'rgba(109, 18, 50, 0.18)',
      shadow: 'rgba(109, 18, 50, 0.18)',
      highlight: '#ffdbe8',
      outline: '#201313',
      artSky: '#ffd0e2',
      artSea: '#8fd4eb',
      artLand: '#ff5f87',
      artPop: '#ffd25a',
      artPop2: '#6ed2a6',
      artPop3: '#fffaf2'
    }
  },
  {
    key: 'feb',
    variant: 'frame',
    scene: 'table-mountain',
    label: { en: 'Atlantic Green', ru: 'Атлантический зелёный' },
    mini: { en: 'Mountain / sea haze', ru: 'Гора / морская дымка' },
    caption: {
      en: 'Deep green poster stock, cream type and Table Mountain sitting over the bay.',
      ru: 'Глубокий зелёный постер, кремовый шрифт и Столовая гора над заливом.'
    },
    hero: {
      en: 'February goes darker and calmer, with Table Mountain carrying the whole page.',
      ru: 'Февраль становится глубже и спокойнее: всю страницу держит Столовая гора.'
    },
    palette: {
      page: '#e6e0d2',
      glowA: 'rgba(33, 118, 88, 0.28)',
      glowB: 'rgba(248, 220, 176, 0.24)',
      surface: 'rgba(245, 248, 242, 0.84)',
      surfaceStrong: '#fdfcf6',
      poster: '#1e6a54',
      ink: '#124435',
      softInk: '#426c60',
      accent: '#176c59',
      accentContrast: '#fffef9',
      line: 'rgba(18, 68, 53, 0.18)',
      shadow: 'rgba(12, 53, 41, 0.18)',
      highlight: '#d9efe8',
      outline: '#18211d',
      artSky: '#f4e9d2',
      artSea: '#80b8c8',
      artLand: '#2f7d63',
      artPop: '#f9f0d9',
      artPop2: '#f4cf65',
      artPop3: '#d4e7de'
    }
  },
  {
    key: 'mar',
    variant: 'grid',
    scene: 'promenade',
    label: { en: 'Sea Point Air', ru: 'Воздух Sea Point' },
    mini: { en: 'Promenade / pale cyan', ru: 'Променад / светлый циан' },
    caption: {
      en: 'Clean cream space, pale blue lines and a long seaside promenade rhythm.',
      ru: 'Чистый кремовый фон, светло-голубые линии и длинный ритм набережной.'
    },
    hero: {
      en: 'March feels lighter and more open, like the promenade with salt in the air.',
      ru: 'Март становится легче и свободнее, как променад с солью в воздухе.'
    },
    palette: {
      page: '#ede8db',
      glowA: 'rgba(68, 179, 215, 0.28)',
      glowB: 'rgba(250, 241, 210, 0.25)',
      surface: 'rgba(255, 253, 248, 0.88)',
      surfaceStrong: '#fffef9',
      poster: '#fbf6ea',
      ink: '#0f5c84',
      softInk: '#4f7c93',
      accent: '#2d9fd2',
      accentContrast: '#fdfefe',
      line: 'rgba(15, 92, 132, 0.18)',
      shadow: 'rgba(15, 92, 132, 0.14)',
      highlight: '#e1f5ff',
      outline: '#17313f',
      artSky: '#d9f4ff',
      artSea: '#73c2de',
      artLand: '#f8efd8',
      artPop: '#ff8573',
      artPop2: '#1976a5',
      artPop3: '#fffdf9'
    }
  },
  {
    key: 'apr',
    variant: 'arched',
    scene: 'windows',
    label: { en: 'Lilac Stoop', ru: 'Сиреневый stoop' },
    mini: { en: 'Doors / shutters / dusk', ru: 'Двери / ставни / сумерки' },
    caption: {
      en: 'A softer lavender month with close-up façades, windows and stoop details.',
      ru: 'Более мягкий лавандовый месяц с крупными фасадами, окнами и деталями лестниц.'
    },
    hero: {
      en: 'April narrows the frame and moves closer to the painted street details.',
      ru: 'Апрель сужает рамку и подходит ближе к расписанным деталям улицы.'
    },
    palette: {
      page: '#e8e1d5',
      glowA: 'rgba(165, 140, 220, 0.3)',
      glowB: 'rgba(255, 217, 164, 0.22)',
      surface: 'rgba(248, 244, 255, 0.84)',
      surfaceStrong: '#fdfaff',
      poster: '#cdbcf1',
      ink: '#4f2a5c',
      softInk: '#6d5678',
      accent: '#7a43a1',
      accentContrast: '#fcf9ff',
      line: 'rgba(79, 42, 92, 0.18)',
      shadow: 'rgba(79, 42, 92, 0.16)',
      highlight: '#efe7ff',
      outline: '#251b29',
      artSky: '#efe8ff',
      artSea: '#9bc2ea',
      artLand: '#d5517c',
      artPop: '#ffca58',
      artPop2: '#69b8a8',
      artPop3: '#fffaf6'
    }
  },
  {
    key: 'may',
    variant: 'bands',
    scene: 'harbour',
    label: { en: 'Harbour Cyan', ru: 'Бирюзовая гавань' },
    mini: { en: 'Boats / market tarps', ru: 'Лодки / рыночные тенты' },
    caption: {
      en: 'Bright cyan paper, yellow type and a compact harbour scene full of motion.',
      ru: 'Яркий циан, жёлтый шрифт и плотная гавань, в которой всё движется.'
    },
    hero: {
      en: 'May shifts into harbour energy: boats, tarps, ropes and quick decisions.',
      ru: 'Май переходит в энергию гавани: лодки, тенты, тросы и быстрый выбор.'
    },
    palette: {
      page: '#e4dfd2',
      glowA: 'rgba(31, 171, 224, 0.3)',
      glowB: 'rgba(255, 234, 115, 0.24)',
      surface: 'rgba(245, 253, 255, 0.84)',
      surfaceStrong: '#fbfeff',
      poster: '#2ba3d8',
      ink: '#0c4c6f',
      softInk: '#47748a',
      accent: '#1674a3',
      accentContrast: '#f8fdff',
      line: 'rgba(12, 76, 111, 0.18)',
      shadow: 'rgba(12, 76, 111, 0.17)',
      highlight: '#dff6ff',
      outline: '#17313f',
      artSky: '#c6efff',
      artSea: '#5db5d4',
      artLand: '#1a778a',
      artPop: '#ffe971',
      artPop2: '#ff8b54',
      artPop3: '#fffdf5'
    }
  },
  {
    key: 'jun',
    variant: 'frame',
    scene: 'cableway',
    label: { en: 'Cableway Lemon', ru: 'Лимонная канатка' },
    mini: { en: 'Cable cars / winter sun', ru: 'Кабинки / зимнее солнце' },
    caption: {
      en: 'A clean yellow poster with darker mountain lines and bright moving cabins.',
      ru: 'Чистый жёлтый постер с тёмными горными линиями и яркими кабинками.'
    },
    hero: {
      en: 'June keeps the page warm with winter sun and the cableway cutting across it.',
      ru: 'Июнь держит страницу тёплой зимним солнцем и линией канатной дороги.'
    },
    palette: {
      page: '#ebe7d6',
      glowA: 'rgba(255, 231, 67, 0.3)',
      glowB: 'rgba(90, 143, 103, 0.24)',
      surface: 'rgba(255, 255, 241, 0.87)',
      surfaceStrong: '#fffffb',
      poster: '#f8ef77',
      ink: '#24563d',
      softInk: '#5c725f',
      accent: '#2f7a54',
      accentContrast: '#fffffa',
      line: 'rgba(36, 86, 61, 0.18)',
      shadow: 'rgba(36, 86, 61, 0.16)',
      highlight: '#fff6b8',
      outline: '#1d251f',
      artSky: '#fff7b5',
      artSea: '#8fd0df',
      artLand: '#7cad56',
      artPop: '#ff7a5a',
      artPop2: '#24694c',
      artPop3: '#fffef8'
    }
  },
  {
    key: 'jul',
    variant: 'night',
    scene: 'night-city',
    label: { en: 'Midwinter After Dark', ru: 'Июль после заката' },
    mini: { en: 'City lights / table silhouette', ru: 'Огни города / силуэт горы' },
    caption: {
      en: 'Charcoal poster stock, pink type and a colder city skyline under night light.',
      ru: 'Угольный фон, розовый шрифт и холодный городской силуэт под ночным светом.'
    },
    hero: {
      en: 'July gets moodier without losing colour: city lights stay sharp against the dark.',
      ru: 'Июль становится более атмосферным, но не теряет цвет: огни города держат ритм.'
    },
    palette: {
      page: '#ddd8cd',
      glowA: 'rgba(255, 136, 189, 0.22)',
      glowB: 'rgba(93, 117, 166, 0.18)',
      surface: 'rgba(36, 34, 39, 0.86)',
      surfaceStrong: '#2a2730',
      poster: '#2a2727',
      ink: '#ffe0ec',
      softInk: '#d0b1bf',
      accent: '#ff80b4',
      accentContrast: '#23151e',
      line: 'rgba(255, 208, 225, 0.18)',
      shadow: 'rgba(21, 18, 26, 0.32)',
      highlight: '#3a3542',
      outline: '#111111',
      artSky: '#171b2e',
      artSea: '#22334b',
      artLand: '#2e2a32',
      artPop: '#ff9ac1',
      artPop2: '#ffe07e',
      artPop3: '#f9f2f6'
    }
  },
  {
    key: 'aug',
    variant: 'bands',
    scene: 'market',
    label: { en: 'Orange Market Day', ru: 'Оранжевый market day' },
    mini: { en: 'Awnings / signs / palms', ru: 'Навесы / вывески / пальмы' },
    caption: {
      en: 'Late winter gets louder with market stripes, orange paper and hand-lettered signs.',
      ru: 'Конец зимы звучит громче: полосатые рынки, оранжевый фон и ручные вывески.'
    },
    hero: {
      en: 'August pushes the page into market energy with bold orange poster stock.',
      ru: 'Август переводит страницу в рыночную энергию с ярким оранжевым фоном.'
    },
    palette: {
      page: '#e8e2d5',
      glowA: 'rgba(255, 129, 63, 0.31)',
      glowB: 'rgba(255, 229, 173, 0.21)',
      surface: 'rgba(255, 249, 242, 0.86)',
      surfaceStrong: '#fffdf8',
      poster: '#ff7a2d',
      ink: '#87451f',
      softInk: '#94624a',
      accent: '#d45d12',
      accentContrast: '#fffaf5',
      line: 'rgba(135, 69, 31, 0.18)',
      shadow: 'rgba(135, 69, 31, 0.18)',
      highlight: '#ffe6d4',
      outline: '#251914',
      artSky: '#ffd0a8',
      artSea: '#73cae6',
      artLand: '#f0b84e',
      artPop: '#ef3654',
      artPop2: '#6bc18f',
      artPop3: '#fff9f1'
    }
  },
  {
    key: 'sep',
    variant: 'split',
    scene: 'terraces',
    label: { en: 'Spring Terraces', ru: 'Весенние террасы' },
    mini: { en: 'Pastel walls / red type', ru: 'Пастельные стены / красный шрифт' },
    caption: {
      en: 'The page cools down into pale aqua while the red type keeps the month awake.',
      ru: 'Страница уходит в светлый аква-тон, а красный шрифт не даёт месяцу уснуть.'
    },
    hero: {
      en: 'September opens spring with cool air, pastel walls and a sharper red headline.',
      ru: 'Сентябрь открывает весну прохладным воздухом, пастельными стенами и резким красным заголовком.'
    },
    palette: {
      page: '#e7e3d8',
      glowA: 'rgba(164, 231, 237, 0.31)',
      glowB: 'rgba(239, 84, 94, 0.2)',
      surface: 'rgba(245, 254, 255, 0.86)',
      surfaceStrong: '#fbffff',
      poster: '#d5f1f1',
      ink: '#b91e37',
      softInk: '#7b6172',
      accent: '#e43a4e',
      accentContrast: '#fffafb',
      line: 'rgba(185, 30, 55, 0.18)',
      shadow: 'rgba(78, 116, 125, 0.16)',
      highlight: '#eefbfb',
      outline: '#2b1c22',
      artSky: '#d7f6f8',
      artSea: '#8bd2db',
      artLand: '#f6d75a',
      artPop: '#e73b52',
      artPop2: '#5db4ad',
      artPop3: '#fffef7'
    }
  },
  {
    key: 'oct',
    variant: 'stacked',
    scene: 'fynbos',
    label: { en: 'Signal Hill Bloom', ru: 'Цветение на Signal Hill' },
    mini: { en: 'Fynbos / path / red stock', ru: 'Финбош / тропа / красный лист' },
    caption: {
      en: 'A hotter red month with cliff paths, fynbos bursts and sea light in the distance.',
      ru: 'Более горячий красный месяц с тропами, вспышками финбоша и светом моря вдали.'
    },
    hero: {
      en: 'October gets punchier and warmer, like a poster printed for a spring climb.',
      ru: 'Октябрь становится резче и теплее, как постер для весеннего подъёма.'
    },
    palette: {
      page: '#e8e2d7',
      glowA: 'rgba(255, 49, 62, 0.3)',
      glowB: 'rgba(255, 203, 110, 0.22)',
      surface: 'rgba(255, 245, 245, 0.85)',
      surfaceStrong: '#fffafa',
      poster: '#ff2d35',
      ink: '#fff4f4',
      softInk: '#ffd4d6',
      accent: '#c51c26',
      accentContrast: '#fff9f9',
      line: 'rgba(255, 235, 236, 0.2)',
      shadow: 'rgba(110, 25, 29, 0.2)',
      highlight: '#ff7378',
      outline: '#211414',
      artSky: '#ffd9ba',
      artSea: '#77c1d6',
      artLand: '#ff5056',
      artPop: '#ffe36d',
      artPop2: '#5cb67c',
      artPop3: '#fffef5'
    }
  },
  {
    key: 'nov',
    variant: 'arched',
    scene: 'vineyard',
    label: { en: 'Constantia Brown', ru: 'Constantia brown' },
    mini: { en: 'Vines / veranda / late light', ru: 'Лозы / веранда / поздний свет' },
    caption: {
      en: 'Rich brown poster stock with lilac type and vineyard geometry opening into summer.',
      ru: 'Глубокий коричневый лист с лиловым шрифтом и геометрией виноградников на входе в лето.'
    },
    hero: {
      en: 'November leans into wine country tones without losing the editorial poster feel.',
      ru: 'Ноябрь уходит в винные оттенки, но сохраняет постерную редакционную подачу.'
    },
    palette: {
      page: '#e7e0d4',
      glowA: 'rgba(135, 82, 42, 0.28)',
      glowB: 'rgba(214, 186, 242, 0.2)',
      surface: 'rgba(255, 248, 243, 0.86)',
      surfaceStrong: '#fffdf9',
      poster: '#6d3d1c',
      ink: '#e6d7ff',
      softInk: '#c2afd9',
      accent: '#8a5830',
      accentContrast: '#fff8f1',
      line: 'rgba(109, 61, 28, 0.18)',
      shadow: 'rgba(67, 35, 16, 0.22)',
      highlight: '#f5ebdf',
      outline: '#1f1714',
      artSky: '#f4dccf',
      artSea: '#88c4d4',
      artLand: '#875124',
      artPop: '#d8b269',
      artPop2: '#c29de8',
      artPop3: '#fffaf4'
    }
  },
  {
    key: 'dec',
    variant: 'grid',
    scene: 'beach',
    label: { en: 'Camps Bay Light', ru: 'Свет Camps Bay' },
    mini: { en: 'Beach / umbrellas / high season', ru: 'Пляж / зонты / высокий сезон' },
    caption: {
      en: 'Pale ice poster paper with crisp navy type, umbrellas, boulders and bright sea.',
      ru: 'Светлый ледяной фон, чёткий тёмный шрифт, зонты, валуны и яркое море.'
    },
    hero: {
      en: 'December clears the page into beach light, open sky and high-season brightness.',
      ru: 'Декабрь очищает страницу до пляжного света, открытого неба и яркости высокого сезона.'
    },
    palette: {
      page: '#e4dfd4',
      glowA: 'rgba(159, 220, 233, 0.31)',
      glowB: 'rgba(255, 203, 136, 0.2)',
      surface: 'rgba(245, 253, 255, 0.88)',
      surfaceStrong: '#fcffff',
      poster: '#d6eef1',
      ink: '#193247',
      softInk: '#5a6f81',
      accent: '#265f82',
      accentContrast: '#fbfeff',
      line: 'rgba(25, 50, 71, 0.18)',
      shadow: 'rgba(25, 50, 71, 0.14)',
      highlight: '#eefbfd',
      outline: '#1d252b',
      artSky: '#d9f4f9',
      artSea: '#76cbe0',
      artLand: '#f2d79e',
      artPop: '#f25555',
      artPop2: '#f8bc48',
      artPop3: '#fffef8'
    }
  }
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
    filters: 'Filters',
    filtersOpen: 'Hide filters',
    filtersClosed: 'Show filters',
    filterSummaryIdle: 'All events',
    filterSummaryActive: '{count} active',
    filterWhen: 'When',
    filterPrice: 'Price',
    filterCategories: 'Categories',
    filterLayers: 'Layers',
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
    firstThursdayHelp: 'First Thursdays is Cape Town’s monthly first-Thursday art and nightlife evening across galleries, studios and the city centre.',
    calendarViewLabel: 'Calendar view',
    month: 'Month',
    week: 'Week',
    densityComfortable: 'Comfortable',
    densityCompact: 'Compact',
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
    chipMusic: 'Music',
    chipCinema: 'Cinema',
    chipSport: 'Sport',
    chipFoodWine: 'Food & wine',
    chipNightlife: 'Nightlife',
    chipMarkets: 'Markets',
    chipOutdoors: 'Outdoors',
    emptyDay: 'No events for this day.',
    emptyFilter: 'No events match current filters.',
    emptyMap: 'No map results for current filters.',
    emptySaved: 'Nothing saved yet.',
    addToCalendar: 'Add to calendar',
    openEvent: 'Open event',
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
    selectDateHint: 'Select a day to inspect events',
    dayContextHoliday: 'Holiday in South Africa',
    dayContextFirstThursday: 'What is First Thursdays?',
    dayContextWeekend: 'Weekend pattern',
    weekendExplain: 'Weekend dates usually have the highest event density: markets, nightlife, art routes and outdoor plans.',
    firstThursdayRoutesEyebrow: 'Ready routes',
    observedSuffix: '{name} (observed)'
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
    filters: 'Фильтры',
    filtersOpen: 'Скрыть фильтры',
    filtersClosed: 'Показать фильтры',
    filterSummaryIdle: 'Все события',
    filterSummaryActive: 'Активно: {count}',
    filterWhen: 'Когда',
    filterPrice: 'Цена',
    filterCategories: 'Категории',
    filterLayers: 'Слои',
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
    firstThursdayHelp: 'First Thursdays — ежемесячный арт- и nightlife-вечер в первый четверг месяца: галереи, студии и late openings в центре Кейптауна.',
    calendarViewLabel: 'Календарный вид',
    month: 'Месяц',
    week: 'Неделя',
    densityComfortable: 'Комфортно',
    densityCompact: 'Компактно',
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
    chipMusic: 'Музыка',
    chipCinema: 'Кино',
    chipSport: 'Спорт',
    chipFoodWine: 'Еда и вино',
    chipNightlife: 'Ночная жизнь',
    chipMarkets: 'Маркеты',
    chipOutdoors: 'На улице',
    emptyDay: 'На этот день событий нет.',
    emptyFilter: 'По текущим фильтрам событий нет.',
    emptyMap: 'Для карты нет результатов по текущим фильтрам.',
    emptySaved: 'Вы ещё ничего не сохранили.',
    addToCalendar: 'Add to calendar',
    openEvent: 'Открыть',
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
    selectDateHint: 'Выберите день и посмотрите события',
    dayContextHoliday: 'Праздник в ЮАР',
    dayContextFirstThursday: 'Что такое First Thursdays?',
    dayContextWeekend: 'Ритм выходных',
    weekendExplain: 'На выходных обычно самая высокая плотность событий: маркеты, nightlife, арт-маршруты и outdoor-планы.',
    firstThursdayRoutesEyebrow: 'Готовые маршруты',
    observedSuffix: '{name} (выходной переносится)'
  }
};

const HOLIDAY_CACHE = new Map();

const elements = {
  body: document.body,
  heroThemeNote: document.getElementById('heroThemeNote'),
  monthPoster: document.getElementById('monthPoster'),
  monthPosterKicker: document.getElementById('monthPosterKicker'),
  monthPosterMini: document.getElementById('monthPosterMini'),
  monthPosterArt: document.getElementById('monthPosterArt'),
  monthPosterTitle: document.getElementById('monthPosterTitle'),
  monthPosterCaption: document.getElementById('monthPosterCaption'),
  navButtons: document.querySelectorAll('.top-nav-item[data-view]'),
  viewPanels: document.querySelectorAll('.view-panel[data-view-panel]'),
  searchInput: document.getElementById('searchInput'),
  filtersToggle: document.getElementById('filtersToggle'),
  filterSummary: document.getElementById('filterSummary'),
  filtersPanel: document.getElementById('filtersPanel'),
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
  densityButtons: document.querySelectorAll('.segment-item[data-density]'),
  weekdayRow: document.getElementById('weekdayRow'),
  calendarGrid: document.getElementById('calendarGrid'),
  selectedDayLabel: document.getElementById('selectedDayLabel'),
  selectedDayMeta: document.getElementById('selectedDayMeta'),
  calendarEventList: document.getElementById('calendarEventList'),
  selectedDayContext: document.getElementById('selectedDayContext'),
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
  drawerMedia: document.getElementById('drawerMedia'),
  drawerCoverImage: document.getElementById('drawerCoverImage'),
  drawerSourceArt: document.getElementById('drawerSourceArt'),
  drawerSourceArtLabel: document.getElementById('drawerSourceArtLabel'),
  drawerSourceArtTitle: document.getElementById('drawerSourceArtTitle'),
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
  calendarMode: 'week',
  calendarDensity: loadDensity(),
  datePreset: 'week',
  cursor: new Date(),
  selectedDateKey: '',
  filtersOpen: false,
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

function loadDensity() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.density);
    if (stored === 'compact' || stored === 'comfortable') return stored;
  } catch {
    // noop
  }
  return 'comfortable';
}

function persistDensity() {
  try {
    localStorage.setItem(STORAGE_KEYS.density, state.calendarDensity);
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

function themeText(entry) {
  if (!entry || typeof entry !== 'object') return '';
  return entry[state.lang] || entry.en || '';
}

function localizedText(entry) {
  if (!entry) return '';
  if (typeof entry === 'string') return entry;
  return entry[state.lang] || entry.en || '';
}

function posterMonthLabel(dateLike) {
  return new Intl.DateTimeFormat(localeCode(), { month: 'short' })
    .format(new Date(dateLike))
    .replace(/\./g, '')
    .replace(/\s+/g, '')
    .toLocaleUpperCase(localeCode());
}

function currentMonthTheme() {
  const index = new Date(state.cursor).getMonth();
  return MONTH_THEMES[index] || MONTH_THEMES[0];
}

function svgDataUrl(svg) {
  return `url("data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}")`;
}

function posterSvgShell(theme, content) {
  const p = theme.palette;

  return svgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="760" height="560" viewBox="0 0 760 560" fill="none">
      <rect width="760" height="560" fill="${p.artSky}"/>
      <g opacity="0.18" stroke="${p.outline}" stroke-width="3">
        <path d="M36 62h688"/>
        <path d="M36 498h688"/>
        <path d="M92 34v44"/>
        <path d="M668 482v44"/>
      </g>
      ${content}
    </svg>
  `);
}

function buildPosterArtwork(theme) {
  const p = theme.palette;
  const stroke = `stroke="${p.outline}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"`;
  const lightStroke = `stroke="${p.outline}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;

  switch (theme.scene) {
    case 'bo-kaap-sunrise':
      return posterSvgShell(theme, `
        <circle cx="606" cy="106" r="70" fill="${p.artPop}" opacity="0.76"/>
        <rect y="392" width="760" height="168" fill="${p.artSea}"/>
        <rect x="36" y="218" width="206" height="210" rx="10" fill="${p.artLand}" ${stroke}/>
        <rect x="256" y="174" width="234" height="254" rx="10" fill="${p.artPop2}" ${stroke}/>
        <rect x="506" y="210" width="190" height="218" rx="10" fill="${p.artPop3}" ${stroke}/>
        <path d="M36 218h206M256 174h234M506 210h190" ${stroke}/>
        <path d="M84 428h110v-78H84zM314 428h118v-126H314zM562 428h86v-96h-86z" fill="${p.artPop3}" ${stroke}/>
        <path d="M74 316h74v74H74zM170 286h42v66h-42zM540 284h44v72h-44zM608 284h48v72h-48z" fill="${p.artSky}" ${lightStroke}/>
        <path d="M242 428h70M490 428h44M286 174c18-28 44-42 76-42 30 0 58 14 84 42" ${stroke}/>
        <path d="M230 428h56l34-40M490 428h28l30-30" ${stroke}/>
        <path d="M122 428l42-40M590 428l24-26" ${lightStroke}/>
        <path d="M662 408c-8-42-28-68-60-78" ${lightStroke}/>
        <path d="M640 330l18-70M652 330l24-58M634 332l-12-44" ${lightStroke}/>
      `);
    case 'table-mountain':
      return posterSvgShell(theme, `
        <circle cx="140" cy="96" r="56" fill="${p.artPop}" opacity="0.78"/>
        <rect y="380" width="760" height="180" fill="${p.artSea}"/>
        <path d="M0 354C84 312 164 300 246 296c56-2 102-10 134-26 54-28 88-32 128-10 34 20 60 28 106 30 54 2 102 20 146 64V560H0z" fill="${p.artLand}" ${stroke}/>
        <path d="M178 260c54-44 120-64 202-64 86 0 162 18 222 66" ${stroke}/>
        <path d="M224 232h312" ${stroke}/>
        <path d="M136 208h492" ${lightStroke}/>
        <path d="M82 146H680" ${lightStroke}/>
        <path d="M188 110l390 0" ${lightStroke}/>
        <path d="M186 162l118 78 132-110 140 92" fill="none" ${stroke}/>
        <path d="M218 96l104 54M464 84l94 54" ${lightStroke}/>
        <path d="M288 132l0 82M494 120l0 72" ${lightStroke}/>
        <rect x="290" y="186" width="28" height="20" rx="8" fill="${p.artPop3}" ${lightStroke}/>
        <rect x="480" y="174" width="28" height="20" rx="8" fill="${p.artPop3}" ${lightStroke}/>
      `);
    case 'promenade':
      return posterSvgShell(theme, `
        <rect y="300" width="760" height="260" fill="${p.artSea}"/>
        <rect y="352" width="760" height="208" fill="${p.artLand}"/>
        <path d="M0 324h760" ${stroke}/>
        <path d="M58 358H702" ${lightStroke}/>
        <path d="M96 368v140M176 368v140M256 368v140M336 368v140M416 368v140M496 368v140M576 368v140M656 368v140" ${lightStroke}/>
        <path d="M88 334c44-24 78-24 122 0M268 334c44-24 78-24 122 0M448 334c44-24 78-24 122 0" ${lightStroke}/>
        <path d="M118 260l30 64h-60zM310 246l34 78h-68zM534 256l34 68h-68z" fill="${p.artPop}" ${stroke}/>
        <path d="M620 204c20 12 36 36 46 72M628 196l0 132M628 284c20-8 38-8 56 0" ${stroke}/>
        <path d="M74 210c58-26 112-26 168 0M334 188c72-30 136-30 204 0" ${lightStroke}/>
      `);
    case 'windows':
      return posterSvgShell(theme, `
        <rect x="42" y="72" width="220" height="190" rx="12" fill="${p.artSky}" ${stroke}/>
        <rect x="280" y="42" width="214" height="224" rx="12" fill="${p.artLand}" ${stroke}/>
        <rect x="512" y="82" width="206" height="178" rx="12" fill="${p.artPop2}" ${stroke}/>
        <rect x="80" y="118" width="86" height="118" fill="${p.artPop3}" ${stroke}/>
        <rect x="316" y="92" width="68" height="132" fill="${p.artPop3}" ${stroke}/>
        <rect x="402" y="92" width="56" height="94" fill="${p.artPop3}" ${stroke}/>
        <rect x="554" y="122" width="88" height="96" fill="${p.artPop3}" ${stroke}/>
        <path d="M202 262h34l26-22M280 266h214M70 286h592" ${stroke}/>
        <path d="M72 318c72-12 126-12 184 0M322 320c76-10 130-10 192 0M562 320c48-8 86-8 122 0" ${lightStroke}/>
        <path d="M336 42c18-24 52-38 102-38 44 0 78 12 104 38" ${stroke}/>
        <path d="M134 236v26M364 224v42M598 218v44" ${lightStroke}/>
      `);
    case 'harbour':
      return posterSvgShell(theme, `
        <rect y="338" width="760" height="222" fill="${p.artSea}"/>
        <rect y="298" width="760" height="44" fill="${p.artLand}" ${stroke}/>
        <path d="M78 162v138M114 142v158M602 168v132M646 128v172" ${stroke}/>
        <path d="M78 170h136M602 174h104" ${lightStroke}/>
        <path d="M150 300l32-118M610 300l24-98" ${lightStroke}/>
        <path d="M108 380h164l-30-42H136z" fill="${p.artPop3}" ${stroke}/>
        <path d="M352 412h202l-42-58H388z" fill="${p.artPop}" ${stroke}/>
        <path d="M164 380v70M468 354v98" ${lightStroke}/>
        <path d="M36 454c72 18 136 18 208 0 58-16 110-16 170 0 76 18 144 18 212 0 38-10 74-14 134-8" ${lightStroke}/>
        <circle cx="680" cy="96" r="54" fill="${p.artPop2}" opacity="0.88"/>
      `);
    case 'cableway':
      return posterSvgShell(theme, `
        <circle cx="614" cy="98" r="58" fill="${p.artPop}" opacity="0.82"/>
        <rect y="378" width="760" height="182" fill="${p.artSea}"/>
        <path d="M0 370c82-40 132-62 204-78 76-18 122-40 180-86 50-38 96-56 150-56 70 0 138 30 226 110V560H0z" fill="${p.artLand}" ${stroke}/>
        <path d="M118 132H664" ${lightStroke}/>
        <path d="M122 156l526 0" ${stroke}/>
        <path d="M228 156v120M404 156v82M556 156v110" ${lightStroke}/>
        <rect x="216" y="206" width="34" height="28" rx="8" fill="${p.artPop3}" ${lightStroke}/>
        <rect x="390" y="188" width="34" height="28" rx="8" fill="${p.artPop3}" ${lightStroke}/>
        <rect x="542" y="214" width="34" height="28" rx="8" fill="${p.artPop3}" ${lightStroke}/>
        <path d="M84 248c38-20 76-20 112 0M548 112c34-18 66-18 96 0" ${lightStroke}/>
      `);
    case 'night-city':
      return posterSvgShell(theme, `
        <rect width="760" height="560" fill="${p.artSky}"/>
        <circle cx="614" cy="106" r="54" fill="${p.artPop3}" opacity="0.84"/>
        <path d="M0 360C124 300 228 280 330 280c94 0 160-18 222-62 48-34 90-50 132-50 28 0 54 6 76 18V560H0z" fill="${p.artLand}" ${stroke}/>
        <rect x="62" y="244" width="56" height="162" fill="${p.artPop2}" ${stroke}/>
        <rect x="142" y="214" width="78" height="192" fill="${p.artLand}" ${stroke}/>
        <rect x="244" y="254" width="64" height="152" fill="${p.artPop2}" ${stroke}/>
        <rect x="334" y="224" width="82" height="182" fill="${p.artLand}" ${stroke}/>
        <rect x="444" y="274" width="52" height="132" fill="${p.artPop2}" ${stroke}/>
        <rect x="520" y="238" width="74" height="168" fill="${p.artLand}" ${stroke}/>
        <g fill="${p.artPop}">
          <rect x="76" y="272" width="12" height="12"/><rect x="94" y="272" width="12" height="12"/>
          <rect x="76" y="294" width="12" height="12"/><rect x="166" y="238" width="12" height="12"/>
          <rect x="188" y="238" width="12" height="12"/><rect x="260" y="286" width="12" height="12"/>
          <rect x="352" y="248" width="12" height="12"/><rect x="374" y="248" width="12" height="12"/>
          <rect x="352" y="270" width="12" height="12"/><rect x="542" y="262" width="12" height="12"/>
          <rect x="564" y="262" width="12" height="12"/><rect x="542" y="284" width="12" height="12"/>
        </g>
        <path d="M0 178c72-36 146-36 220 0 74 36 150 36 228 0 68-34 134-34 198 0" ${lightStroke}/>
      `);
    case 'market':
      return posterSvgShell(theme, `
        <rect y="386" width="760" height="174" fill="${p.artLand}"/>
        <rect x="44" y="190" width="204" height="196" rx="12" fill="${p.artPop3}" ${stroke}/>
        <rect x="278" y="178" width="214" height="208" rx="12" fill="${p.artPop2}" ${stroke}/>
        <rect x="522" y="198" width="194" height="188" rx="12" fill="${p.artPop3}" ${stroke}/>
        <path d="M44 190h204l-26 40H70zM278 178h214l-34 44H312zM522 198h194l-28 40H550z" fill="${p.artPop}" ${stroke}/>
        <path d="M92 250h104M332 242h112M570 250h92" ${stroke}/>
        <path d="M102 286h84M346 280h74M582 290h74" ${lightStroke}/>
        <path d="M582 386c10-40 28-66 54-78M594 304l14-54M606 304l20-48M576 388c-8-36-22-62-42-76" ${lightStroke}/>
        <circle cx="156" cy="124" r="44" fill="${p.artSea}" opacity="0.86"/>
        <circle cx="594" cy="120" r="52" fill="${p.artSea}" opacity="0.68"/>
      `);
    case 'terraces':
      return posterSvgShell(theme, `
        <rect x="34" y="64" width="196" height="152" rx="12" fill="${p.artSky}" ${stroke}/>
        <rect x="250" y="40" width="228" height="176" rx="12" fill="${p.artLand}" ${stroke}/>
        <rect x="498" y="72" width="228" height="144" rx="12" fill="${p.artPop2}" ${stroke}/>
        <rect x="70" y="238" width="210" height="164" rx="12" fill="${p.artLand}" ${stroke}/>
        <rect x="300" y="248" width="186" height="154" rx="12" fill="${p.artPop2}" ${stroke}/>
        <rect x="506" y="236" width="188" height="166" rx="12" fill="${p.artPop}" ${stroke}/>
        <path d="M92 216h110M250 216h228M506 216h152M70 402h624" ${stroke}/>
        <path d="M102 108h58v74h-58zM326 98h64v96h-64zM558 112h56v82h-56zM338 286h54v74h-54zM562 288h60v82h-60z" fill="${p.artPop3}" ${lightStroke}/>
        <path d="M166 402l36-34M430 402l32-34M584 402l42-34" ${lightStroke}/>
        <path d="M610 402c-8-34-26-56-54-68" ${lightStroke}/>
      `);
    case 'fynbos':
      return posterSvgShell(theme, `
        <circle cx="594" cy="110" r="60" fill="${p.artPop}" opacity="0.82"/>
        <rect y="386" width="760" height="174" fill="${p.artSea}"/>
        <path d="M0 364C112 320 214 284 290 244c72-38 134-96 202-96 62 0 118 22 268 108V560H0z" fill="${p.artLand}" ${stroke}/>
        <path d="M116 392c32-54 68-82 108-82 38 0 78 22 124 66" ${stroke}/>
        <path d="M110 390c-16-44-42-66-78-66M168 386c-8-40-28-64-56-76" ${lightStroke}/>
        <path d="M112 390l-8 48M132 380l-24 54M168 386l4 54M206 350l-8 74" ${lightStroke}/>
        <circle cx="108" cy="324" r="12" fill="${p.artPop2}"/><circle cx="168" cy="310" r="10" fill="${p.artPop2}"/><circle cx="198" cy="328" r="12" fill="${p.artPop2}"/>
        <circle cx="244" cy="314" r="10" fill="${p.artPop}"/><circle cx="278" cy="332" r="10" fill="${p.artPop}"/>
        <path d="M352 252c36-18 72-18 108 0" ${lightStroke}/>
      `);
    case 'vineyard':
      return posterSvgShell(theme, `
        <rect y="376" width="760" height="184" fill="${p.artLand}"/>
        <path d="M0 274C122 222 206 204 310 204c84 0 156-16 224-48 54-26 98-38 226-26V376H0z" fill="${p.artSea}" ${stroke}/>
        <path d="M96 376c32-58 82-90 150-96 64-4 118 18 170 72 46-54 100-80 164-76 58 2 112 36 162 100" ${stroke}/>
        <path d="M110 420c24-30 50-44 78-44 30 0 58 14 88 44M282 420c26-28 54-42 84-42 28 0 54 12 82 42M468 420c22-28 48-42 78-42 28 0 56 12 82 42" ${lightStroke}/>
        <rect x="508" y="214" width="166" height="114" rx="12" fill="${p.artPop3}" ${stroke}/>
        <path d="M510 328h166M546 214v114M636 214v114" ${lightStroke}/>
        <path d="M132 472l0-58M182 472l0-58M232 472l0-58M282 472l0-58M332 472l0-58M382 472l0-58M432 472l0-58M482 472l0-58M532 472l0-58M582 472l0-58" ${lightStroke}/>
      `);
    case 'beach':
      return posterSvgShell(theme, `
        <rect y="304" width="760" height="256" fill="${p.artSea}"/>
        <rect y="352" width="760" height="208" fill="${p.artLand}"/>
        <path d="M0 330c110 18 208 18 308 0 98-18 190-18 284 0 54 10 110 14 168 12" ${lightStroke}/>
        <path d="M88 272l34 84H54zM252 242l38 92h-76zM454 258l34 82h-68zM624 236l40 96h-80z" fill="${p.artPop}" ${stroke}/>
        <path d="M98 354l14 102M266 334l10 118M468 340l10 108M640 332l14 118" ${lightStroke}/>
        <path d="M544 334c40-62 84-94 134-98" ${stroke}/>
        <path d="M510 378c40-18 78-18 118 0" ${lightStroke}/>
        <circle cx="116" cy="100" r="56" fill="${p.artPop2}" opacity="0.86"/>
        <path d="M552 434c10-42 28-68 56-80M566 352l10-58M578 352l18-54M540 434c-8-38-22-64-44-76" ${lightStroke}/>
      `);
    default:
      return posterSvgShell(theme, `
        <rect x="60" y="120" width="640" height="320" rx="24" fill="${p.artLand}" ${stroke}/>
        <circle cx="608" cy="120" r="58" fill="${p.artPop}" opacity="0.8"/>
        <path d="M112 386h536M160 120v320M320 120v320M480 120v320" ${lightStroke}/>
      `);
  }
}

function applyMonthTheme() {
  const theme = currentMonthTheme();
  const p = theme.palette;
  const posterDate = state.calendarMode === 'week' ? state.cursor : startOfMonth(state.cursor);
  const posterTitle = `${posterMonthLabel(posterDate)} ${posterDate.getFullYear()}`;

  document.documentElement.style.setProperty('--theme-page', '#173246');
  document.documentElement.style.setProperty('--theme-glow-a', p.glowA);
  document.documentElement.style.setProperty('--theme-glow-b', p.glowB);
  document.documentElement.style.setProperty('--theme-surface', 'rgba(24, 41, 60, 0.68)');
  document.documentElement.style.setProperty('--theme-surface-strong', 'rgba(30, 49, 69, 0.86)');
  document.documentElement.style.setProperty('--theme-poster', `color-mix(in srgb, ${p.poster} 48%, #2a5674 52%)`);
  document.documentElement.style.setProperty('--theme-ink', '#f5fbff');
  document.documentElement.style.setProperty('--theme-ink-soft', 'rgba(188, 209, 223, 0.84)');
  document.documentElement.style.setProperty('--theme-accent', p.accent);
  document.documentElement.style.setProperty('--theme-accent-contrast', '#041018');
  document.documentElement.style.setProperty('--theme-line', 'rgba(150, 184, 207, 0.18)');
  document.documentElement.style.setProperty('--theme-shadow', 'rgba(3, 9, 16, 0.36)');
  document.documentElement.style.setProperty('--theme-highlight', `color-mix(in srgb, ${p.highlight} 30%, #214661 70%)`);
  document.documentElement.style.setProperty('--ui-ink', '#f5fbff');
  document.documentElement.style.setProperty('--ui-ink-soft', 'rgba(180, 201, 216, 0.84)');
  document.documentElement.style.setProperty('--ui-border', 'rgba(145, 177, 199, 0.2)');
  document.documentElement.style.setProperty('--ui-border-strong', 'rgba(156, 189, 211, 0.32)');
  document.documentElement.style.setProperty('--ui-surface', 'rgba(22, 39, 57, 0.76)');
  document.documentElement.style.setProperty('--ui-surface-strong', 'rgba(30, 49, 69, 0.86)');
  document.documentElement.style.setProperty('--ui-surface-muted', 'rgba(36, 57, 79, 0.9)');
  document.documentElement.style.setProperty('--ui-shadow', 'rgba(2, 8, 15, 0.28)');
  document.documentElement.style.setProperty('--ui-action', p.artSea || p.accent);
  document.documentElement.style.setProperty('--ui-action-strong', p.accent);
  document.documentElement.style.setProperty('--ui-action-contrast', '#041018');
  document.documentElement.style.setProperty('--ui-action-soft', `color-mix(in srgb, ${p.artSea || p.accent} 18%, transparent)`);
  document.documentElement.style.setProperty('--ui-accent-alt', p.artPop || p.poster);
  document.documentElement.style.setProperty('--ui-accent-tertiary', p.artPop2 || p.highlight);

  elements.body.dataset.monthTheme = theme.key;
  elements.body.dataset.monthVariant = theme.variant;
  elements.monthPoster.dataset.variant = theme.variant;
  elements.monthPosterKicker.textContent = themeText(theme.label);
  elements.monthPosterMini.textContent = themeText(theme.mini);
  elements.monthPosterTitle.textContent = posterTitle;
  elements.monthPosterCaption.textContent = themeText(theme.caption);
  elements.heroThemeNote.textContent = themeText(theme.hero);
  elements.monthPosterArt.style.backgroundImage = buildPosterArtwork(theme);
  elements.monthPosterArt.setAttribute('aria-label', `${themeText(theme.label)} / Cape Town artwork`);
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

function toCalendarDateKey(dateLike) {
  const date = new Date(dateLike);
  if (Number.isNaN(date.getTime())) return '';
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

function dateKeyToUtcDate(dateKey) {
  const [year, month, day] = String(dateKey || '').split('-').map(Number);
  if (!year || !month || !day) return new Date();
  return new Date(Date.UTC(year, month - 1, day, 12));
}

function formatDateKey(dateKey, opts = {}) {
  return new Intl.DateTimeFormat(localeCode(), {
    timeZone: 'UTC',
    ...opts
  }).format(dateKeyToUtcDate(dateKey));
}

function todayKey() {
  return toDateKeyInTimezone(state.now, state.timezone);
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

function nextFirstThursday(fromDate = state.now) {
  const date = parseDateKey(toDateKeyInTimezone(fromDate, state.timezone));
  for (let index = 0; index < 70; index += 1) {
    if (isFirstThursday(date)) return date;
    date.setDate(date.getDate() + 1);
  }
  return parseDateKey(todayKey());
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

function createHolidayEntry(base, extra = {}) {
  return {
    ...base,
    ...extra
  };
}

function buildHolidayMap(year) {
  if (HOLIDAY_CACHE.has(year)) return HOLIDAY_CACHE.get(year);

  const map = new Map();
  const put = (dateLike, holiday) => {
    const key = toCalendarDateKey(dateLike);
    const list = map.get(key) || [];
    if (!list.some((entry) => entry.key === holiday.key)) list.push(holiday);
    map.set(key, list);
  };

  const easter = calculateEasterSunday(year);
  const floating = [
    {
      date: addDays(easter, -2),
      holiday: createHolidayEntry({
        key: 'good-friday',
        name: { en: 'Good Friday', ru: 'Страстная пятница' },
        short: { en: 'Good Friday', ru: 'Страстная пятница' },
        note: {
          en: 'The Friday before Easter Sunday and a major Christian public holiday.',
          ru: 'Пятница перед Пасхой и важный христианский государственный праздник.'
        }
      })
    },
    {
      date: addDays(easter, 1),
      holiday: createHolidayEntry({
        key: 'family-day',
        name: { en: 'Family Day', ru: 'День семьи' },
        short: { en: 'Family Day', ru: 'День семьи' },
        note: {
          en: 'The Monday after Easter, usually focused on family time and rest.',
          ru: 'Понедельник после Пасхи, обычно связанный с семьёй и отдыхом.'
        }
      })
    }
  ];

  const all = [
    ...SA_FIXED_HOLIDAYS.map((item) => ({
      date: new Date(year, item.month - 1, item.day),
      holiday: createHolidayEntry(item)
    })),
    ...floating
  ];

  for (const holiday of all) {
    put(holiday.date, holiday.holiday);
    if (holiday.date.getDay() === 0) {
      put(
        addDays(holiday.date, 1),
        createHolidayEntry(holiday.holiday, {
          key: `${holiday.holiday.key}-observed`,
          observed: true
        })
      );
    }
  }

  HOLIDAY_CACHE.set(year, map);
  return map;
}

function getHolidayEntries(dateLike) {
  const date = new Date(dateLike);
  const map = buildHolidayMap(date.getFullYear());
  const key = toCalendarDateKey(date);
  return map.get(key) || [];
}

function holidayDisplayName(entry) {
  const name = localizedText(entry?.name);
  if (!entry?.observed) return name;
  return t('observedSuffix', { name });
}

function holidayDisplayShort(entry) {
  const short = localizedText(entry?.short) || holidayDisplayName(entry);
  if (!entry?.observed) return short;
  return t('observedSuffix', { name: short });
}

function holidayDisplayNote(entry) {
  const note = localizedText(entry?.note);
  if (!entry?.observed) return note;
  const observedNote = state.lang === 'ru'
    ? 'Официальный выходной перенесён на следующий рабочий день.'
    : 'The public holiday is observed on the next working day.';
  return `${note} ${observedNote}`.trim();
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
    return formatDateKey(toCalendarDateKey(range.start), {
      month: 'long',
      year: 'numeric'
    });
  }

  const startLabel = formatDateKey(toCalendarDateKey(range.start), { day: '2-digit', month: 'short' });
  const endLabel = formatDateKey(toCalendarDateKey(range.end), { day: '2-digit', month: 'short', year: 'numeric' });
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
    case 'music':
      return event.category === 'music';
    case 'cinema':
      return event.category === 'cinema';
    case 'sport':
      return event.category === 'sport';
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
  const startKey = toCalendarDateKey(range.start);
  const endKey = toCalendarDateKey(range.end);
  const key = eventDateKey(event);
  return key >= startKey && key <= endKey;
}

function eventDiscoveryScore(event) {
  const categoryScore = {
    music: 72,
    cinema: 70,
    sport: 68,
    festival: 66,
    art: 64,
    nightlife: 56,
    local: 50,
    fair: 42,
    market: 40,
    vintage: 38,
    dance: 36,
    brand: 32,
    other: 28
  }[event.category] || 30;

  const textBlob = eventSearchBlob(event);
  let score = categoryScore;

  if (event.sourceRole === 'official') score += 10;
  if (event.verified) score += 6;
  if (event.ticketsUrl) score += 2;
  if (isFirstThursday(parseDateKey(eventDateKey(event)))) score += 3;

  if (/(concert|jazz|opera|movie|cinema|screening|rugby|stadium|festival|orchestra|tribute)/.test(textBlob)) {
    score += 4;
  }

  if (/(market|karaoke|salsa|bachata|kizomba|zumba|thrift)/.test(textBlob)) {
    score -= 6;
  }

  return score;
}

function compareEventsForDiscovery(a, b) {
  const dayCompare = eventDateKey(a).localeCompare(eventDateKey(b));
  if (dayCompare !== 0) return dayCompare;

  const scoreCompare = eventDiscoveryScore(b) - eventDiscoveryScore(a);
  if (scoreCompare !== 0) return scoreCompare;

  const timeCompare = new Date(a.startAt) - new Date(b.startAt);
  if (timeCompare !== 0) return timeCompare;

  return cleanText(a.title).localeCompare(cleanText(b.title));
}

function sortEventsForDiscovery(events) {
  return [...events].sort(compareEventsForDiscovery);
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
    .sort(compareEventsForDiscovery);
}

function getEventsForSelectedDay() {
  return sortEventsForDiscovery(state.filteredEvents.filter((event) => eventDateKey(event) === state.selectedDateKey));
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

function activeFilterCount() {
  let count = 0;
  if (state.search) count += 1;
  if (state.firstThursdayOnly) count += 1;
  if (!state.showHolidayLayer) count += 1;
  if (!state.showWeekendLayer) count += 1;
  return count;
}

function renderFilterSummary() {
  const presetKey = {
    week: 'presetWeek',
    month: 'presetMonth'
  }[state.datePreset] || 'presetWeek';

  const parts = [t(presetKey)];

  if (state.priceFilter === 'free') parts.push(t('priceFree'));
  if (state.priceFilter === 'paid') parts.push(t('pricePaid'));

  if (state.activeChip !== 'all') {
    const chip = CATEGORY_CHIPS.find((item) => item.id === state.activeChip);
    if (chip) parts.push(t(chip.key));
  }

  if (state.search) {
    parts.push(`"${cleanText(state.search)}"`);
  }

  const extraCount = activeFilterCount();
  elements.filterSummary.textContent = extraCount
    ? `${parts.join(' · ')} · +${extraCount}`
    : parts.join(' · ') || t('filterSummaryIdle');
}

function syncControlStates() {
  elements.body.dataset.calendarMode = state.calendarMode;
  elements.body.dataset.calendarDensity = state.calendarDensity;

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

  elements.densityButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.density === state.calendarDensity);
  });

  elements.firstThursdayToggle.classList.toggle('is-active', state.firstThursdayOnly);
  elements.holidayToggle.classList.toggle('is-active', state.showHolidayLayer);
  elements.weekendToggle.classList.toggle('is-active', state.showWeekendLayer);

  elements.mobileSurfaceButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.mobileSurface === state.mobileSurface);
  });

  elements.filtersPanel.hidden = !state.filtersOpen;
  elements.filtersToggle.setAttribute('aria-expanded', String(state.filtersOpen));
  elements.filtersToggle.setAttribute('title', t(state.filtersOpen ? 'filtersOpen' : 'filtersClosed'));
  elements.body.dataset.mobileSurface = state.mobileSurface;
}

function renderWeekdayRow() {
  if (state.calendarMode === 'week') {
    elements.weekdayRow.hidden = true;
    elements.weekdayRow.innerHTML = '';
    return;
  }

  elements.weekdayRow.hidden = false;
  elements.weekdayRow.innerHTML = weekdayLabels()
    .map((label, index) => `<div class="weekday-cell${index >= 5 ? ' is-weekend' : ''}">${label}</div>`)
    .join('');
}

function timePartsInTimezone(dateLike) {
  const date = new Date(dateLike);
  if (Number.isNaN(date.getTime())) return null;

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: state.timezone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === 'hour')?.value);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value);

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
  return { hour, minute };
}

function minuteOfDayInTimezone(dateLike) {
  const parts = timePartsInTimezone(dateLike);
  if (!parts) return 0;
  return parts.hour * 60 + parts.minute;
}

function resolvedEventEndAt(event) {
  const start = new Date(event.startAt);
  if (Number.isNaN(start.getTime())) return addHours(new Date(), 2);

  const end = event.endAt ? new Date(event.endAt) : addHours(start, 2);
  if (Number.isNaN(end.getTime()) || end.getTime() <= start.getTime()) {
    return addHours(start, 1);
  }

  return end;
}

function eventDurationMinutes(event) {
  const start = new Date(event.startAt);
  const end = resolvedEventEndAt(event);
  const minutes = Math.round((end.getTime() - start.getTime()) / 60000);
  return Math.max(30, minutes);
}

function formatDurationBadge(event) {
  const minutes = eventDurationMinutes(event);
  return state.lang === 'ru' ? `${minutes} мин` : `${minutes} min`;
}

function formatTimeRangeShort(event) {
  const start = formatDateTime(event.startAt, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  });
  const end = formatDateTime(resolvedEventEndAt(event), {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  });
  return `${start} - ${end}`;
}

function formatClockLabel(totalMinutes) {
  const hour = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const minute = String(totalMinutes % 60).padStart(2, '0');
  return `${hour}:${minute}`;
}

function buildVisibleWeekDays() {
  const start = startOfWeekMonday(state.cursor);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

function eventTone(event) {
  if (['music', 'nightlife', 'dance'].includes(event.category)) return 'sunset';
  if (['art', 'cinema'].includes(event.category)) return 'violet';
  if (['market', 'fair', 'vintage', 'brand'].includes(event.category)) return 'gold';
  if (['festival', 'sport', 'local'].includes(event.category)) return 'teal';
  return 'ocean';
}

function renderDrawerMedia(event) {
  const imageUrl = cleanText(event.imageUrl);
  const sourceName = cleanText(event.sourceName || event.discoverySourceName) || categoryLabel(event.category);
  const title = cleanText(event.title) || 'Cape Town';

  elements.drawerMedia.hidden = false;
  elements.drawerSourceArt.dataset.tone = eventTone(event);
  elements.drawerSourceArtLabel.textContent = `${categoryLabel(event.category)} • ${sourceName}`;
  elements.drawerSourceArtTitle.textContent = truncateText(title, 54);

  if (imageUrl) {
    elements.drawerCoverImage.hidden = false;
    elements.drawerSourceArt.hidden = true;
    elements.drawerCoverImage.src = imageUrl;
    elements.drawerCoverImage.alt = title;
    return;
  }

  elements.drawerCoverImage.hidden = true;
  elements.drawerCoverImage.removeAttribute('src');
  elements.drawerCoverImage.alt = '';
  elements.drawerSourceArt.hidden = false;
}

function rerenderCalendarPreservingScroll() {
  const { scrollTop, scrollLeft } = elements.calendarGrid;
  renderAll();
  elements.calendarGrid.scrollTop = scrollTop;
  elements.calendarGrid.scrollLeft = scrollLeft;
}

function syncWeekBoardSelection(dayKey) {
  elements.calendarGrid.querySelectorAll('.week-day-head').forEach((node) => {
    node.classList.toggle('is-selected', node.dataset.dayKey === dayKey);
  });

  elements.calendarGrid.querySelectorAll('.week-column').forEach((node) => {
    node.classList.toggle('is-selected', node.dataset.dayKey === dayKey);
  });
}

function formatClockTime(dateLike) {
  return formatDateTime(dateLike, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  });
}

function buildDayRangeSummary(dayEvents) {
  if (!dayEvents.length) return '';

  const sorted = [...dayEvents].sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  return `${formatClockTime(first.startAt)} - ${formatClockTime(resolvedEventEndAt(last))}`;
}

function truncateText(value = '', max = 56) {
  const text = cleanText(value);
  if (text.length <= max) return text;
  return `${text.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

function briefEventSummary(event) {
  if (!event) return '';
  const summary = cleanText(event.shortDescription || event.description || '');
  if (summary) return truncateText(summary, 72);
  return '';
}

function buildCompactEventsCount(count) {
  if (!count) return '—';
  return state.lang === 'ru' ? `${count} соб.` : `${count} evt`;
}

function eventDedupeFingerprint(event) {
  const date = eventDateKey(event);
  const title = normalizeText(event.title);
  const venue = normalizeText(event.venue);
  const parts = timePartsInTimezone(event.startAt);
  const hour = parts ? String(parts.hour).padStart(2, '0') : '';
  return `${title}|${date}|${venue}|${hour}`;
}

function eventQualityScore(event) {
  let score = Number(event.reliabilityScore || 0) * 100;

  if (event.verified) score += 24;
  if (event.endAt) score += 16;
  if (cleanText(event.description)) score += 8;
  if (cleanText(event.address)) score += 6;
  if (cleanText(event.sourceUrl)) score += 5;
  if (cleanText(event.ticketsUrl)) score += 3;
  if (cleanText(event.imageUrl)) score += 2;

  return score;
}

function dedupeClientEvents(events) {
  const map = new Map();

  events.forEach((event) => {
    const key = eventDedupeFingerprint(event);
    if (!key) return;

    const existing = map.get(key);
    if (!existing || eventQualityScore(event) > eventQualityScore(existing)) {
      map.set(key, event);
    }
  });

  return [...map.values()].sort(compareEventsForDiscovery);
}

function weekEventHook(event) {
  const summary = briefEventSummary(event);
  if (summary) return summary;
  return `${categoryLabel(event.category)} • ${placeLabel(event.placeType)}`;
}

function buildWeekScheduleBoard(eventsByDay) {
  const days = buildVisibleWeekDays();

  const board = document.createElement('div');
  board.className = 'week-board';

  const header = document.createElement('div');
  header.className = 'week-board-header';

  days.forEach((day) => {
    const dayKey = toCalendarDateKey(day);
    const headerButton = document.createElement('button');
    const holidayEntries = getHolidayEntries(day);
    const primaryHoliday = holidayEntries[0] || null;
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
    const isToday = dayKey === todayKey();

    headerButton.type = 'button';
    headerButton.className = 'week-day-head';
    headerButton.dataset.dayKey = dayKey;

    if (state.selectedDateKey === dayKey) headerButton.classList.add('is-selected');
    if (isWeekend && state.showWeekendLayer) headerButton.classList.add('is-weekend');
    if (holidayEntries.length && state.showHolidayLayer) headerButton.classList.add('is-holiday');
    if (isToday) headerButton.classList.add('is-today');

    const badgeBits = [];
    if (isToday) badgeBits.push(state.lang === 'ru' ? 'Сегодня' : 'Today');
    if (isFirstThursday(day)) badgeBits.push(localizedText(FIRST_THURSDAYS_INFO.short));
    if (state.showHolidayLayer && primaryHoliday) badgeBits.push(holidayDisplayShort(primaryHoliday));
    if (state.showWeekendLayer && isWeekend) badgeBits.push(t('weekendTag'));

    headerButton.innerHTML = `
      <span class="week-day-name">${formatDateKey(dayKey, { weekday: 'short' })}</span>
      <span class="week-day-date">${formatDateKey(dayKey, { day: '2-digit', month: '2-digit' })}</span>
      <span class="week-day-badges">${badgeBits.join(' • ')}</span>
    `;
    if (badgeBits.length) {
      headerButton.title = badgeBits.join(' • ');
    }

    headerButton.addEventListener('click', () => {
      state.selectedDateKey = dayKey;
      rerenderCalendarPreservingScroll();
    });

    header.appendChild(headerButton);
  });

  board.appendChild(header);

  const columns = document.createElement('div');
  columns.className = 'week-columns';

  days.forEach((day) => {
    const dayKey = toCalendarDateKey(day);
    const dayEvents = dedupeClientEvents(eventsByDay.get(dayKey) || []);
    const holidayEntries = getHolidayEntries(day);
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
    const isDenseDay = dayEvents.length >= 6;
    const column = document.createElement('div');
    const track = document.createElement('div');
    const stack = document.createElement('div');
    const meta = document.createElement('div');

    column.className = 'week-column';
    column.dataset.dayKey = dayKey;
    if (state.selectedDateKey === dayKey) column.classList.add('is-selected');
    if (isWeekend && state.showWeekendLayer) column.classList.add('is-weekend');
    if (holidayEntries.length && state.showHolidayLayer) column.classList.add('is-holiday');
    if (isFirstThursday(day)) column.classList.add('is-first-thursday');

    track.className = 'week-column-track';
    stack.className = 'week-column-stack';
    if (isDenseDay) stack.classList.add('is-dense');
    meta.className = 'week-column-meta';
    meta.innerHTML = `
      <span class="week-column-range">${buildDayRangeSummary(dayEvents) || '&nbsp;'}</span>
      <span class="week-column-count" title="${dayEvents.length ? t('eventsCount', { count: dayEvents.length }) : t('emptyDay')}">${buildCompactEventsCount(dayEvents.length)}</span>
    `;
    track.addEventListener('click', () => {
      state.selectedDateKey = dayKey;
      rerenderCalendarPreservingScroll();
    });

    if (!dayEvents.length) {
      const empty = document.createElement('div');
      empty.className = 'week-column-empty';
      empty.textContent = t('emptyDay');
      stack.appendChild(empty);
    }

    dayEvents.forEach((event, index) => {
      const eventButton = document.createElement('button');
      const compactCard = isDenseDay && index > 1;
      const teaser = truncateText(weekEventHook(event), compactCard ? 70 : 94);
      const venue = truncateText(cleanText(event.venue) || t('noVenue'), compactCard ? 48 : 54);

      eventButton.type = 'button';
      eventButton.className = 'week-event';
      if (compactCard) eventButton.classList.add('is-compact');
      eventButton.dataset.tone = eventTone(event);
      eventButton.innerHTML = `
        <span class="week-event-row">
          <span class="week-event-chip week-event-chip-time">${formatClockTime(event.startAt)}</span>
          <span class="week-event-chip">${formatDurationBadge(event)}</span>
        </span>
        <strong class="week-event-title">${cleanText(event.title) || 'Event'}</strong>
        <span class="week-event-hook">${teaser}</span>
        <span class="week-event-venue">${venue}</span>
        <span class="week-event-time">${formatTimeRangeShort(event)}</span>
        <span class="week-event-cta">${t('openEvent')}</span>
      `;

      eventButton.addEventListener('click', (evt) => {
        evt.stopPropagation();
        state.selectedDateKey = dayKey;
        syncWeekBoardSelection(dayKey);
        renderSelectedDayPanel();
        openDrawer(event.id);
      });

      stack.appendChild(eventButton);
    });

    track.appendChild(meta);
    track.appendChild(stack);
    column.appendChild(track);
    columns.appendChild(column);
  });

  board.appendChild(columns);
  return board;
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

  if (state.calendarMode === 'week') {
    elements.calendarGrid.classList.add('is-schedule-board');
    elements.calendarGrid.appendChild(buildWeekScheduleBoard(eventsByDay));
    requestAnimationFrame(() => {
      if (elements.calendarGrid.scrollWidth <= elements.calendarGrid.clientWidth + 4) {
        elements.calendarGrid.scrollLeft = 0;
      }
    });
    return;
  }

  elements.calendarGrid.classList.remove('is-schedule-board');

  const monthAnchor = startOfMonth(state.cursor);
  const start = startOfWeekMonday(monthAnchor);
  const total = 42;

  for (let index = 0; index < total; index += 1) {
    const day = addDays(start, index);
    const dayKey = toCalendarDateKey(day);
    const dayEvents = sortEventsForDiscovery(eventsByDay.get(dayKey) || []);
    const holidayEntries = getHolidayEntries(day);
    const primaryHoliday = holidayEntries[0] || null;
    const headlineEvents = dayEvents.slice(0, 2);
    const primaryEvent = dayEvents[0] || null;
    const dayCard = document.createElement('button');

    dayCard.type = 'button';
    dayCard.className = 'calendar-day';
    if (state.selectedDateKey === dayKey) dayCard.classList.add('is-selected');
    if (state.calendarMode === 'month' && day.getMonth() !== monthAnchor.getMonth()) dayCard.classList.add('is-other-month');
    if (state.showWeekendLayer && (day.getDay() === 0 || day.getDay() === 6)) dayCard.classList.add('is-weekend');
    if (state.showHolidayLayer && holidayEntries.length) dayCard.classList.add('is-holiday');
    if (isFirstThursday(day)) dayCard.classList.add('is-first-thursday');

    const labelParts = [];
    if (isFirstThursday(day)) labelParts.push(localizedText(FIRST_THURSDAYS_INFO.title));
    if (state.showHolidayLayer && primaryHoliday) labelParts.push(holidayDisplayShort(primaryHoliday));
    if (state.showWeekendLayer && (day.getDay() === 0 || day.getDay() === 6)) labelParts.push(t('weekendTag'));
    const noteParts = [];
    if (state.showHolidayLayer && primaryHoliday) noteParts.push(holidayDisplayNote(primaryHoliday));
    else if (isFirstThursday(day)) noteParts.push(localizedText(FIRST_THURSDAYS_INFO.note));
    const spotlight = briefEventSummary(primaryEvent);

    const dots = new Array(Math.min(3, dayEvents.length)).fill('<span class="density-dot"></span>').join('');
    const eventPreview = headlineEvents.length
      ? `
        <div class="calendar-day-events">
          ${headlineEvents.map((event) => `
            <span class="calendar-day-event">
              <span class="calendar-day-event-time">${formatClockTime(event.startAt)}</span>
              <span class="calendar-day-event-title">${truncateText(event.title, 34)}</span>
            </span>
          `).join('')}
        </div>
      `
      : '';
    const spotlightHtml = spotlight ? `<span class="calendar-day-spotlight">${spotlight}</span>` : '';

    dayCard.innerHTML = `
      <span class="calendar-day-number">${day.getDate()}</span>
      <span class="calendar-day-label">${labelParts.join(' • ')}</span>
      <span class="calendar-day-note">${noteParts.join(' ')}</span>
      ${eventPreview}
      ${spotlightHtml}
      <span class="density">${dots}${dayEvents.length ? `<span class="density-count">${dayEvents.length}</span>` : ''}</span>
    `;
    if (labelParts.length || noteParts.length) {
      dayCard.title = [...labelParts, ...noteParts].join(' — ');
    }

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

function renderFirstThursdayRoutes() {
  const wrap = document.createElement('div');
  wrap.className = 'first-thursday-routes';

  FIRST_THURSDAY_ROUTES.forEach((route) => {
    const card = document.createElement('article');
    card.className = `first-thursday-route first-thursday-route-${route.tone}`;
    card.innerHTML = `
      <p class="context-card-eyebrow">${t('firstThursdayRoutesEyebrow')}</p>
      <h4 class="context-card-title">${localizedText(route.title)}</h4>
      <p class="context-card-note">${localizedText(route.note)}</p>
      <ol class="first-thursday-stops">
        ${route.stops.map((stop) => `
          <li>
            <time>${stop.time}</time>
            <span>${state.lang === 'ru' ? stop.ru : stop.en}</span>
          </li>
        `).join('')}
      </ol>
    `;
    wrap.appendChild(card);
  });

  elements.selectedDayContext.appendChild(wrap);
}

function renderSelectedDayContext() {
  const selectedDate = parseDateKey(state.selectedDateKey);
  const holidayEntries = getHolidayEntries(selectedDate);
  const contexts = [];

  if (holidayEntries.length) {
    holidayEntries.forEach((holiday) => {
      contexts.push({
        tone: 'holiday',
        eyebrow: t('dayContextHoliday'),
        title: holidayDisplayName(holiday),
        note: holidayDisplayNote(holiday)
      });
    });
  }

  if (isFirstThursday(selectedDate)) {
    contexts.push({
      tone: 'first-thursday',
      eyebrow: t('dayContextFirstThursday'),
      title: localizedText(FIRST_THURSDAYS_INFO.title),
      note: localizedText(FIRST_THURSDAYS_INFO.note)
    });
  }

  if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
    contexts.push({
      tone: 'weekend',
      eyebrow: t('dayContextWeekend'),
      title: formatDateKey(state.selectedDateKey, { weekday: 'long' }),
      note: t('weekendExplain')
    });
  }

  elements.selectedDayContext.innerHTML = '';

  if (!contexts.length) {
    elements.selectedDayContext.hidden = true;
    return;
  }

  elements.selectedDayContext.hidden = false;

  contexts.forEach((item) => {
    const card = document.createElement('article');
    card.className = `context-card context-card-${item.tone}`;
    card.innerHTML = `
      <p class="context-card-eyebrow">${item.eyebrow}</p>
      <h4 class="context-card-title">${item.title}</h4>
      <p class="context-card-note">${item.note}</p>
    `;
    elements.selectedDayContext.appendChild(card);
  });

  if (isFirstThursday(selectedDate)) {
    renderFirstThursdayRoutes();
  }
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

  card.dataset.tone = eventTone(event);
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
      card.classList.add('is-map-active');
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
  const dayLabel = formatDateKey(state.selectedDateKey, {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  });
  const dayEvents = getEventsForSelectedDay();

  elements.selectedDayLabel.textContent = dayLabel;
  elements.selectedDayMeta.textContent = dayEvents.length ? t('eventsCount', { count: dayEvents.length }) : t('selectDateHint');

  renderSelectedDayContext();
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
  const date = parseDateKey(toDateKeyInTimezone(fromDate, state.timezone));
  while (date.getDay() !== 6) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

function focusToday() {
  const defaultDate = parseDateKey(todayKey());
  state.datePreset = 'week';
  state.calendarMode = 'week';
  state.cursor = defaultDate;
  state.selectedDateKey = todayKey();
}

function applyDatePreset(preset) {
  state.datePreset = preset === 'month' ? 'month' : 'week';
  const defaultDate = parseDateKey(todayKey());

  if (state.datePreset === 'week') {
    state.calendarMode = 'week';
    state.cursor = defaultDate;
    state.selectedDateKey = todayKey();
    return;
  }

  state.calendarMode = 'month';
  state.cursor = defaultDate;
  state.selectedDateKey = todayKey();
}

function openDrawer(eventId) {
  const event = getEventById(eventId);
  if (!event) return;

  const ratingMeta = detectRatingMeta(event);
  const priceMeta = detectPriceMeta(event);
  const sourceUrl = eventSourceUrl(event);

  state.drawerEventId = event.id;

  renderDrawerMedia(event);
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
  const rangeStartKey = toCalendarDateKey(range.start);
  const rangeEndKey = toCalendarDateKey(range.end);
  if (!state.selectedDateKey || state.selectedDateKey < rangeStartKey || state.selectedDateKey > rangeEndKey) {
    state.selectedDateKey = rangeStartKey;
  }
}

function renderAll() {
  applyStaticTranslations();
  applyMonthTheme();
  renderCategoryChips();
  syncControlStates();
  renderFilterSummary();
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
  state.events = dedupeClientEvents(Array.isArray(payload.events) ? payload.events : []);

  state.cursor = parseDateKey(todayKey());
  state.selectedDateKey = todayKey();
  applyDatePreset('week');
  mergeSavedWithFreshEvents();
}

function wireUi() {
  elements.drawerCoverImage.addEventListener('error', () => {
    elements.drawerCoverImage.hidden = true;
    elements.drawerSourceArt.hidden = false;
  });

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

  elements.filtersToggle.addEventListener('click', () => {
    state.filtersOpen = !state.filtersOpen;
    renderAll();
  });

  elements.datePresetButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyDatePreset(button.dataset.datePreset || 'week');
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

  elements.densityButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.calendarDensity = button.dataset.density === 'compact' ? 'compact' : 'comfortable';
      persistDensity();
      renderAll();
    });
  });

  elements.monthModeButton.addEventListener('click', () => {
    state.datePreset = 'month';
    state.calendarMode = 'month';
    renderAll();
  });

  elements.weekModeButton.addEventListener('click', () => {
    state.datePreset = 'week';
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
    focusToday();
    renderAll();
  });

  elements.jumpToNowButton.addEventListener('click', () => {
    state.view = 'calendar';
    focusToday();
    renderAll();
  });

  elements.firstThursdayToggle.addEventListener('click', () => {
    state.firstThursdayOnly = !state.firstThursdayOnly;
    if (state.firstThursdayOnly) {
      const target = nextFirstThursday(state.now);
      state.view = 'calendar';
      state.datePreset = 'week';
      state.calendarMode = 'week';
      state.cursor = target;
      state.selectedDateKey = toCalendarDateKey(target);
    }
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
