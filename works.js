/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  Всё содержимое портфолио — здесь. Код сайта трогать не нужно.
 *
 *  Любой текст можно писать строкой ('...') — тогда он одинаковый на обоих
 *  языках, — или объектом { ru: '...', en: '...' }.
 *
 *  Новая работа = новый объект в массиве WORKS (шаблон — в самом низу файла).
 *  Картинки кладите в assets/works/<slug>/ и указывайте путь в cover / shots.
 *  Без cover карточка рисует меловую обложку по полю icon.
 *
 *  Командные работы: mine — что сделал я, team — что делала команда,
 *  contrib — короткая строка про вклад (коммиты, PR), badge — подпись на карточке.
 *
 *  Заменили картинки под теми же именами — поменяйте ASSET_VERSION, иначе
 *  браузеры покажут старые из кэша.
 * ─────────────────────────────────────────────────────────────────────────────
 */

window.ASSET_VERSION = '2026-11-06c';

window.PROFILE = {
  name: 'ka6yy',
  alias: 'localhost',
  tagline: 'build it · break it · ship it.',
  role: {
    ru: 'Full-stack продуктовый инженер с привычкой к безопасности (DevSecOps)',
    en: 'Full-stack product engineer with a security habit (DevSecOps)',
  },
  intro: {
    ru: 'Делаю продукты целиком: Python / LLM-бэкенды, Next.js-фронтенды, десктоп и мобилки — а потом пентестю их, чтобы они уезжали в прод без дыр.',
    en: 'I ship end-to-end: Python / LLM backends, Next.js frontends, desktop & mobile apps — then pentest them so they ship without holes.',
  },
  about: [
    {
      icon: 'braces',
      title: 'Full-stack',
      text: 'Python (FastAPI / Django / Flask) · Next.js / React / TypeScript · PostgreSQL',
    },
    {
      icon: 'nodes',
      title: { ru: 'LLM и автоматизация', en: 'LLM & automation' },
      text: {
        ru: 'промпт-пайплайны, генерация документов, скрейпинг и интеграции',
        en: 'prompt pipelines, document generation, scraping & integrations',
      },
    },
    {
      icon: 'phone',
      title: { ru: 'Приложения', en: 'Apps' },
      text: {
        ru: 'десктоп (Electron, SwiftUI) + мобилки (Flutter / Capacitor)',
        en: 'desktop (Electron, SwiftUI) + mobile (Flutter / Capacitor)',
      },
    },
    {
      icon: 'shield',
      title: { ru: 'Безопасность', en: 'Security' },
      text: 'pentest (SQLi · XSS · IDOR · RCE · LFI) · Burp / Nmap / SQLmap',
    },
  ],
  contacts: [
    { icon: 'telegram', label: 'Telegram', value: '@nynelocalhost', url: 'https://t.me/nynelocalhost' },
    { icon: 'github', label: 'GitHub', value: 'ka6yy', url: 'https://github.com/ka6yy' },
  ],
  toolbox: [
    { icon: 'db', title: 'Backend', items: ['Python', 'FastAPI', 'Flask', 'Django', 'SQLAlchemy', 'PostgreSQL', 'MySQL', 'MSSQL', 'Node.js', 'Express'] },
    { icon: 'braces', title: 'Frontend', items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Vite', 'HTML5', 'CSS3', 'Tailwind'] },
    { icon: 'phone', title: { ru: 'Приложения', en: 'Apps' }, items: ['Electron', 'Flutter', 'Dart', 'Capacitor', 'Android', 'SwiftUI'] },
    { icon: 'nodes', title: 'AI / ML', items: ['OpenRouter API', 'Vercel AI SDK', { ru: 'LLM-интеграции', en: 'LLM integration' }, 'Prompt engineering', 'PyTorch', 'Transformers'] },
    { icon: 'shield', title: 'Security / DevSecOps', items: ['Burp Suite', 'Nmap', 'SQLmap', 'Metasploit', 'Wireshark', 'Hydra', 'Gobuster', 'hping3', 'iptables'] },
    { icon: 'chart', title: { ru: 'Данные и автоматизация', en: 'Data / Automation' }, items: ['pandas', 'SciPy', { ru: 'Скрейпинг', en: 'Web scraping' }, 'REST APIs', 'OSINT', 'Playwright'] },
    { icon: 'git', title: { ru: 'Инфра и инструменты', en: 'Infra & Tools' }, items: ['Docker', 'Git', 'Bash', 'Linux', 'GitHub Actions', 'VPN'] },
  ],
};

// Фильтры над сеткой работ. Ключи используются в поле tags у работ.
window.CATEGORIES = {
  web: { ru: 'Веб', en: 'Web' },
  apps: { ru: 'Приложения', en: 'Apps' },
  ai: 'AI / ML',
  security: { ru: 'Безопасность', en: 'Security' },
  data: { ru: 'Данные', en: 'Data' },
};

// Подпись «что это за работа» на карточке.
window.KINDS = {
  own: { ru: 'свой проект', en: 'own project' },
  team: { ru: 'в команде', en: 'team' },
  freelance: { ru: 'фриланс', en: 'freelance' },
  study: { ru: 'учёба', en: 'study' },
};

window.WORKS = [
  {
    slug: 'lexfiles',
    title: 'LexFiles',
    year: '2026',
    kind: 'team',
    tags: ['web', 'ai'],
    icon: 'scales',
    cover: 'assets/works/lexfiles/case.webp',
    shots: [
      'assets/works/lexfiles/case-map.webp',
      'assets/works/lexfiles/creditors.webp',
      'assets/works/lexfiles/documents.webp',
      'assets/works/lexfiles/meetings.webp',
      'assets/works/lexfiles/lexup-canvas.webp',
    ],
    summary: {
      ru: 'Рабочая среда для юристов и арбитражных управляющих: дела о банкротстве, документы, сроки, почта и ИИ-ассистент LexUp в одном месте. Python / LLM-бэкенд, фронтенд на Next.js.',
      en: 'A workspace for lawyers and insolvency practitioners: bankruptcy cases, documents, deadlines, mail and the LexUp AI assistant in one place. Python / LLM backend, Next.js frontend.',
    },
    mine: {
      ru: [
        'Модуль банкротства: экраны дела и «Карта дела» — граф процедуры по стадиям (суд, кредиторы, споры, собрания, торги, публикации, закрытие) с редактором этапов drag & drop.',
        'Интеграции с госсистемами: парсинг КАД Арбитр, суды общей юрисдикции, ЕФРСБ и «Коммерсантъ», «Мой арбитр» с проверкой подписи (цепочка доверия, CRL), подпись документов через КриптоПро.',
        'LexUp: агенты для почты, документов, отслеживания и ИИ-секретаря, голосовой ввод и подтверждение действий, публикация в ЕФРСБ из чата от начала до конца.',
        'Финансы и роли в банкротстве: операции АУ с выгрузкой в XLSX и импортом выписок, ролевая модель с отделами и передачей дела, генератор конвертов и почтовых форм по ГОСТ.',
        'Платформа: календарь процессуальных сроков, онбординг-туры, согласия и экран «Мои данные» (152-ФЗ), подтверждение почты кодом, ИИ-поддержка, звонки в мессенджере, e2e-тесты.',
      ],
      en: [
        'Bankruptcy module: case screens and the Case Map — a graph of the procedure by stage (court, creditors, disputes, meetings, auctions, publications, closing) with a drag & drop stage editor.',
        'Government integrations: KAD Arbitr scraping, general-jurisdiction courts, EFRSB and Kommersant, My Arbitr with signature checks (trust chain, CRL), CryptoPro document signing.',
        'LexUp: agents for mail, documents, tracking and the AI secretary, voice input and action confirmation, an EFRSB publication driven end to end from chat.',
        'Bankruptcy finance and roles: practitioner operations with XLSX export and statement import, a role model with departments and case hand-over, a GOST envelope and postal-form generator.',
        'Platform: a procedural-deadline calendar, onboarding tours, consents and a “My data” screen (152-FZ), email verification by code, AI support, calls in the messenger, e2e tests.',
      ],
    },
    team: {
      ru: 'Ядро продукта — бэкенд, генерация документов на LLM, редактор Canvas, анонимизация данных, инфраструктура и релизы — делает вся команда; ревью и мёрж — у ведущего разработчика.',
      en: 'The product core — backend, LLM document generation, the Canvas editor, data anonymisation, infrastructure and releases — is built by the whole team; reviews and merges belong to the lead developer.',
    },
    stack: ['Python', 'Next.js', 'TypeScript', 'LLM'],
    links: [],
  },
  {
    slug: 'lexfiles-mobile',
    title: 'LexFiles Mobile',
    year: 2026,
    kind: 'team',
    tags: ['apps'],
    icon: 'phone',
    cover: 'assets/works/lexfiles-mobile/cover.webp',
    shots: ['assets/works/lexfiles-mobile/bankruptcy.webp', 'assets/works/lexfiles-mobile/dark.webp'],
    summary: {
      ru: 'Мобильное приложение LexFiles для Android (RuStore): дела о банкротстве, документы, задачи и чат с LexUp. Сначала прототип на Capacitor, затем нативный клиент на Flutter.',
      en: 'The LexFiles Android app (RuStore): bankruptcy cases, documents, tasks and LexUp chat. A Capacitor prototype first, then a native Flutter client.',
    },
    mine: {
      ru: [
        'Приложение целиком: от демо на Capacitor 6 до Flutter-клиента и релиза APK.',
        'Банкротство: список дел с серверным поиском, карточка дела, задачи с исполнителями, комментариями и чек-листами.',
        'Чат с LexUp: потоковый ответ с этапами работы агента, markdown, вложения; просмотр PDF и DOCX прямо в приложении.',
        'Push-уведомления, светлая бежевая и тёмная фиолетовая темы.',
        'Аудит безопасности приложения и его доработка по итогам.',
        'Разбор для тимлида перед выбором стека: стоимость и риски переписывания.',
      ],
      en: [
        'The whole app: from a Capacitor 6 demo to the Flutter client and APK releases.',
        'Bankruptcy: case list with server-side search, case card, tasks with assignees, comments and checklists.',
        'LexUp chat: streamed answers with agent stages, markdown, attachments; in-app PDF and DOCX viewing.',
        'Push notifications, a light beige and a dark violet theme.',
        'A security audit of the app and the fixes that followed.',
        'A write-up for the team lead before picking the stack: the cost and risks of a rewrite.',
      ],
    },
    team: {
      ru: 'API платформы и макеты экранов; решение уйти с WebView на Flutter принял тимлид.',
      en: 'The platform API and screen mockups; the call to move from WebView to Flutter was the team lead’s.',
    },
    stack: ['Flutter', 'Dart', 'Android'],
    links: [],
  },
  {
    slug: 'spyde',
    title: 'Spyde',
    year: 2026,
    kind: 'own',
    tags: ['apps', 'ai'],
    icon: 'terminal',
    cover: 'assets/works/spyde/agent.webp',
    shots: ['assets/works/spyde/appearance.webp', 'assets/works/spyde/providers.webp'],
    summary: {
      ru: 'Десктопная AI-IDE для macOS — графический аналог Claude Code: чат с любой моделью и агент, который читает и правит файлы и запускает команды, спрашивая разрешение на каждое действие.',
      en: 'A desktop AI IDE for macOS — a GUI take on Claude Code: chat with any model plus an agent that reads and edits files and runs commands, asking before every side effect.',
    },
    points: {
      ru: [
        'Свои ключи: OpenAI, Anthropic, OpenRouter, Gemini, Ollama и любой OpenAI-совместимый эндпоинт; ключи шифруются через safeStorage.',
        'Monaco-редактор, настоящий терминал (node-pty + xterm), встроенный браузер, чат слева или справа — как расширение в VS Code.',
        'Консольный клиент `spyde` поверх того же агента; ключи — только из переменных окружения.',
        'История в SQLite, версионированные настройки с миграциями, сборка в .app / .dmg под arm64 и x64.',
      ],
      en: [
        'Bring your own keys: OpenAI, Anthropic, OpenRouter, Gemini, Ollama or any OpenAI-compatible endpoint; keys are encrypted with safeStorage.',
        'Monaco editor, a real terminal (node-pty + xterm), a built-in browser, chat docked left or right like a VS Code extension.',
        'A `spyde` CLI on top of the same agent; keys come from env only.',
        'SQLite history, versioned settings with migrations, packaged as .app / .dmg for arm64 and x64.',
      ],
    },
    stack: ['Electron', 'React 19', 'TypeScript', 'Tailwind v4', 'Vercel AI SDK', 'Monaco', 'node-pty', 'SQLite'],
    links: [],
  },
  {
    slug: 'lexfiles-desktop',
    title: 'LexFiles Desktop',
    year: 2026,
    kind: 'team',
    tags: ['apps', 'security'],
    icon: 'desktop',
    cover: 'assets/works/lexfiles-desktop/connectors.webp',
    shots: ['assets/works/lexfiles-desktop/cases.webp'],
    summary: {
      ru: 'Десктоп-приложение LexFiles на Electron: та же рабочая среда плюс то, что не может сервер, — запросы в госсистемы с IP пользователя, подпись УКЭП и подача документов.',
      en: 'The LexFiles desktop app on Electron: the same workspace plus what a server can’t do — government-system requests from the user’s IP, qualified e-signatures and filing.',
    },
    mine: {
      ru: [
        'Десктоп-релей: актуализация КАД через компьютер пользователя, согласие в настройках, метрики и алерты.',
        'Подача черновиков во встроенном окне «Мой арбитр» / ЕФРСБ, вход через Госуслуги с сессией внутри приложения.',
        'Подпись документов настольным КриптоПро, суды общей юрисдикции напрямую с IP пользователя, перенос шлюза ЕФРСБ в десктоп.',
        'Единое нативное окно настроек вместо веб-страницы.',
      ],
      en: [
        'Desktop relay: KAD updates through the user’s machine, consent in settings, metrics and alerts.',
        'Filing drafts in an embedded My Arbitr / EFRSB window, Gosuslugi sign-in with the session kept in the app.',
        'Desktop CryptoPro signing, general-jurisdiction courts straight from the user’s IP, the EFRSB gateway ported to desktop.',
        'One native settings window instead of a web page.',
      ],
    },
    team: {
      ru: 'Оболочка приложения и его безопасная архитектура.',
      en: 'The app shell and its secure architecture.',
    },
    stack: ['Electron', 'TypeScript', 'macOS'],
    links: [],
  },
  {
    slug: 'vernier',
    title: 'Vernier',
    year: 2026,
    kind: 'own',
    tags: ['web', 'ai'],
    icon: 'caliper',
    cover: 'assets/works/vernier/cover.webp',
    shots: ['assets/works/vernier/explore.webp'],
    summary: {
      ru: 'Открытый индекс измеренного качества для скиллов, MCP-серверов и адаптеров, на которых работают AI-агенты. Любое значение — замер с доверительным интервалом, а не голая цифра.',
      en: 'An open index of measured quality for the skills, MCP servers and adapters AI coding agents rely on. Every value is a reading with a confidence interval, never a bare score.',
    },
    points: {
      ru: [
        'Explore-хаб: ~450 реальных проектов по 12 областям, 60 задачам, 7 типам и 39 моделям.',
        'Главный цикл: найти лучшее под задачу → собрать набор → обучить адаптер → сравнить выигрыш.',
        'Честный интерфейс: «не измерено» — отдельное состояние, сортировка несравнимых замеров блокируется с объяснением.',
        'RU / EN, темы и акценты, экспорт в SKILL.md, доступность (WCAG AA, reduced motion), адаптив до телефона.',
      ],
      en: [
        'Explore hub: ~450 real projects across 12 fields, 60 tasks, 7 types and 39 models.',
        'The core loop: find the best fit for a task → build a set → train an adapter → measure the trade.',
        'Honest UI: “unassayed” is a state, not a zero; sorting incomparable readings is blocked with an explanation.',
        'RU / EN, themes and accents, SKILL.md export, accessibility (WCAG AA, reduced motion), responsive down to mobile.',
      ],
    },
    stack: ['React', 'TypeScript', 'Vite', 'React Router', 'Vitest'],
    links: [],
  },
  {
    slug: 'crm',
    title: 'CRM',
    year: 2026,
    kind: 'own',
    tags: ['web'],
    icon: 'kanban',
    cover: 'assets/works/crm/board.webp',
    shots: ['assets/works/crm/timeline.webp'],
    summary: {
      ru: 'CRM для команды разработки: таймлайн задач на две недели и канбан, сотрудники, контакты и аналитика нагрузки.',
      en: 'A CRM for a dev team: a two-week task timeline and kanban, people, contacts and workload analytics.',
    },
    points: {
      ru: [
        'Продукт целиком: сервер, вход и роли, API и деплой.',
        'Дизайн-система «Студия»: живой фон, стеклянное превью задач, палитры тем и выбор шрифта.',
        'Таймлайн на две недели и канбан: массовый выбор задач и перенос по статусам.',
        'Описание и заметки в Markdown с предпросмотром (таблицы, цитаты), вставка фото и файлов из буфера обмена.',
        'Нагрузка по сотрудникам, контакты и аналитика. На скриншотах — демо-данные.',
      ],
      en: [
        'The whole product: the server, sign-in and roles, the API and deployment.',
        'The “Studio” design system: a live background, glassy task preview, theme palettes and a font picker.',
        'A two-week timeline and kanban: bulk task selection and moving across statuses.',
        'Markdown descriptions and notes with preview (tables, quotes), pasting photos and files from the clipboard.',
        'Per-person workload, contacts and analytics. Screenshots show demo data.',
      ],
    },
    stack: ['JavaScript', 'HTML', 'CSS', 'Node.js'],
    links: [],
  },
  {
    slug: 'pentesthub',
    title: 'PentestHub',
    year: 2026,
    kind: 'own',
    tags: ['security'],
    icon: 'bug',
    cover: 'assets/works/pentesthub/cover.webp',
    summary: {
      ru: 'Локальный веб-сервис с 51 инструментом для авторизованного пентеста и разведки. Бэкенд на FastAPI, инструменты — на чистом Python, без внешних бинарников.',
      en: 'A local web service with 51 tools for authorized pentesting and recon. FastAPI backend, tools in pure Python with no external binaries.',
    },
    points: {
      ru: [
        '«Полный анализ»: одна цель — все подходящие проверки параллельно и единый отчёт.',
        'Recon / OSINT, сеть, веб, крипто, CVE, генераторы пейлоадов, мини-Repeater.',
        'Терминал в дашборде — по умолчанию в изолированном Kali в Docker.',
        'Гейт авторизации для активных проверок, rate limit, логирование согласий.',
      ],
      en: [
        '“Full analysis”: one target — every relevant check in parallel and a single report.',
        'Recon / OSINT, network, web, crypto, CVE lookup, payload builders, a mini Repeater.',
        'An in-dashboard terminal running in an isolated Kali container by default.',
        'An authorization gate for active checks, rate limits, consent logging.',
      ],
    },
    stack: ['Python', 'FastAPI', 'SQLite', 'Docker', 'Kali Linux'],
    links: [],
  },
  {
    slug: 'lexfiles-landing',
    title: { ru: 'Лендинг LexFiles', en: 'LexFiles landing' },
    year: 2026,
    kind: 'team',
    tags: ['web'],
    icon: 'doc',
    cover: 'assets/works/lexfiles-landing/home.webp',
    shots: ['assets/works/lexfiles-landing/features.webp', 'assets/works/lexfiles-landing/security.webp', 'assets/works/lexfiles-landing/product.webp'],
    summary: {
      ru: 'Сайт LexFiles: главная с окном продукта, страницы «Возможности» и «Безопасность», тарифы и заявка на пробный период.',
      en: 'The LexFiles website: a home page with a live product window, Features and Security pages, pricing and a trial request.',
    },
    contrib: {
      ru: 'в команде с коллегой по работе',
      en: 'in a team with a colleague',
    },
    mine: {
      ru: [
        'Страницы «Возможности» (раскрывающийся список разделов рядом с окном продукта) и «Безопасность».',
        'Цены из продукта, заявка на пробный период на весь экран, cookie-уведомление.',
        'Боевая сборка главной v2 со своими шрифтами и видео-обзор продукта, собранный кодом.',
      ],
      en: [
        'The Features page (an expandable section list next to a product window) and the Security page.',
        'Pricing pulled from the product, a full-screen trial request, a cookie notice.',
        'The production build of home v2 with self-hosted fonts and a product overview film built in code.',
      ],
    },
    team: {
      ru: 'Макет главной v2 и её первая вёрстка, тексты и тарифы — от команды.',
      en: 'The home v2 mockup and its first layout, copy and pricing came from the team.',
    },
    stack: ['HTML', 'CSS', 'JavaScript', 'Python'],
    links: [],
  },
  {
    slug: 'osint-terminal',
    title: 'osint-terminal',
    year: 2026,
    kind: 'own',
    tags: ['security', 'data'],
    icon: 'wifi',
    cover: 'assets/works/osint-terminal/cover.webp',
    summary: {
      ru: 'Браузерная OSINT-платформа: разведка (дорки и поиск по утечкам), сеть / WHOIS / DNS, экспорт отчёта. Встроенный Sherlock и LLM-анализ через OpenRouter.',
      en: 'A browser OSINT platform: recon (dorks + breach lookup), network / WHOIS / DNS, report export. Built-in Sherlock and LLM analysis via OpenRouter.',
    },
    stack: ['Python', 'OpenRouter', 'Sherlock', 'OTX', 'Wayback'],
    links: [],
  },

  /* ── Шаблон новой работы — скопируйте, раскомментируйте и заполните ──────────
  {
    slug: 'my-new-thing',              // латиница, уникально: из него ссылка #/w/my-new-thing
    title: 'My new thing',             // или { ru: '…', en: '…' }
    year: 2026,
    kind: 'own',                       // own | team | freelance | study
    tags: ['web'],                     // ключи из CATEGORIES
    icon: 'rocket',                    // меловая обложка, если нет cover:
                                       // terminal bug lock gear nodes phone db braces caliper doc wifi
                                       // skull rocket git coffee chart film desktop kanban shield mask scales
    cover: 'assets/works/my-new-thing/cover.webp',      // необязательно, лучше 16:10 (png/jpg тоже можно)
    shots: ['assets/works/my-new-thing/screen-1.webp'], // необязательно, галерея в окне работы
    summary: { ru: 'Одно-два предложения.', en: 'One or two sentences.' },
    points: { ru: ['Что сделал'], en: ['What I did'] }, // для своих проектов
    // для командных — вместо points:
    // badge: { ru: 'моя часть — UI', en: 'UI by me' },        // подпись на карточке
    // contrib: { ru: '40 из 120 коммитов', en: '40 of 120 commits' },
    // mine: { ru: ['Что сделал я'], en: ['What I did'] },
    // team: { ru: 'Что делала команда', en: 'What the team did' },
    stack: ['React', 'TypeScript'],
    links: [
      { label: 'Demo', url: 'https://…' },
      { label: 'GitHub', url: 'https://github.com/ka6yy/…' },
    ],
  },
  ──────────────────────────────────────────────────────────────────────────── */
];
