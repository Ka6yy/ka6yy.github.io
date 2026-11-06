(() => {
  'use strict';

  const P = window.PROFILE || {};
  const WORKS = window.WORKS || [];
  const CATS = window.CATEGORIES || {};
  const KINDS = window.KINDS || {};
  const root = document.documentElement;
  const $ = (sel, el = document) => el.querySelector(sel);

  // ─── хранилище (может быть недоступно в приватном окне) ───────────────────
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* пусть так */ } },
  };

  let lang = root.lang === 'en' ? 'en' : 'ru';
  let filter = 'all';

  // ─── тексты интерфейса ───────────────────────────────────────────────────
  const UI = {
    ru: {
      nav_works: 'Работы', nav_about: 'Обо мне', nav_contact: 'Контакты',
      skip: 'К работам', see_works: 'Смотреть работы',
      works_title: 'Работы',
      works_lead: 'Продукт LexFiles, над которым работаю в команде, и мои собственные проекты. В командных работах отдельно сказано, что сделал я, а что — команда.',
      all: 'Все', more: 'Подробнее', empty: 'Тут пока пусто — скоро допишу.',
      about_title: 'Обо мне', stack_title: 'Стек',
      contact_title: 'Связаться', contact_lead: 'Есть задача или вопрос — пиши в Telegram или загляни на GitHub.',
      done: 'Что сделал', mine: 'Моя часть', team: 'Команда', contrib: 'мой вклад', stack: 'Стек', links: 'Ссылки',
      close: 'Закрыть', prev: 'Предыдущая', next: 'Следующая',
      stats_note: 'по всем репозиториям · сентябрь 2026 · примерно',
      theme_light: 'Включить светлую тему', theme_dark: 'Включить тёмную тему',
      shot: 'скриншот', title: 'портфолио',
      count: (n) => `${n} ${plural(n, 'работа', 'работы', 'работ')}`,
    },
    en: {
      nav_works: 'Work', nav_about: 'About', nav_contact: 'Contact',
      skip: 'Skip to work', see_works: 'See my work',
      works_title: 'Work',
      works_lead: 'LexFiles, the product I build with my team, and my own projects. Team cards say what I did and what the team did.',
      all: 'All', more: 'Details', empty: 'Nothing here yet — coming soon.',
      about_title: 'About', stack_title: 'Toolbox',
      contact_title: 'Get in touch', contact_lead: 'Got a task or a question? Ping me on Telegram or drop by GitHub.',
      done: 'What I built', mine: 'My part', team: 'The team', contrib: 'my share', stack: 'Stack', links: 'Links',
      close: 'Close', prev: 'Previous', next: 'Next',
      stats_note: 'across all repositories · Sep 2026 · rough estimate',
      theme_light: 'Switch to light theme', theme_dark: 'Switch to dark theme',
      shot: 'screenshot', title: 'portfolio',
      count: (n) => `${n} ${n === 1 ? 'project' : 'projects'}`,
    },
  };
  const u = (k) => UI[lang][k];

  function plural(n, one, few, many) {
    const a = n % 10, b = n % 100;
    if (a === 1 && b !== 11) return one;
    if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return few;
    return many;
  }

  /** Строка или { ru, en } → строка текущего языка. Массивы отдаются как есть. */
  const t = (v) => {
    if (v == null) return '';
    if (typeof v === 'object' && !Array.isArray(v)) return v[lang] ?? v.ru ?? v.en ?? '';
    return v;
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rich = (s) => esc(t(s)).replace(/`([^`]+)`/g, '<code>$1</code>');

  // ─── меловые иконки ──────────────────────────────────────────────────────
  const D = {
    terminal: '<rect x="4" y="7" width="32" height="26" rx="2"/><path d="M9 16l5 4-5 4M20 26h9"/>',
    prompt: '<path d="M7 11l11 9-11 9M22 29h12"/>',
    bug: '<ellipse cx="20" cy="22" rx="8" ry="10"/><path d="M20 12v-3M12 16l-4-3M28 16l4-3M12 22H5M28 22h7M13 29l-4 3M27 29l4 3"/>',
    braces: '<path d="M13 8 5 20l8 12M27 8l8 12-8 12M23 6 17 34"/>',
    lock: '<rect x="8" y="18" width="24" height="17" rx="3"/><path d="M13 18v-5a7 7 0 0 1 14 0v5M20 25v4"/>',
    gear: '<circle cx="20" cy="20" r="7"/><path d="M20 6v4M20 30v4M6 20h4M30 20h4M10 10l3 3M27 27l3 3M30 10l-3 3M13 27l-3 3"/>',
    nodes: '<circle cx="9" cy="10" r="3"/><circle cx="31" cy="13" r="3"/><circle cx="18" cy="31" r="3"/><path d="M11 13l6 15M29 15.5 20 28.5M12 10.4l16 2.2"/>',
    phone: '<rect x="12" y="4" width="16" height="32" rx="3"/><path d="M17 31h6"/>',
    db: '<ellipse cx="20" cy="10" rx="12" ry="4.5"/><path d="M8 10v20c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V10M8 20c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5"/>',
    caliper: '<path d="M4 14h32v7H4z"/><path d="M9 14v-3M14 14v-5M19 14v-3M24 14v-5M29 14v-3M10 21v13l4-3V21M27 21v9"/>',
    doc: '<path d="M11 4h13l7 7v25H11z"/><path d="M24 4v7h7M16 18h10M16 24h10M16 30h6"/>',
    wifi: '<path d="M6 16a20 20 0 0 1 28 0M11 22a12 12 0 0 1 18 0M16 28a5 5 0 0 1 8 0"/><circle cx="20" cy="33" r="1.4"/>',
    skull: '<path d="M20 5c-9 0-14 6-14 14 0 5 2 8 5 10v5h18v-5c3-2 5-5 5-10 0-8-5-14-14-14z"/><circle cx="14.5" cy="19.5" r="3"/><circle cx="25.5" cy="19.5" r="3"/><path d="M18 27l2-3 2 3M16 34v-4M20 34v-4M24 34v-4"/>',
    rocket: '<path d="M20 4c6 5 8 12 8 18l-4 4h-8l-4-4c0-6 2-13 8-18Z"/><circle cx="20" cy="16" r="3"/><path d="M12 22l-5 5 2 5 5-3M28 22l5 5-2 5-5-3M18 30l2 6 2-6"/>',
    git: '<circle cx="10" cy="8" r="3"/><circle cx="10" cy="32" r="3"/><circle cx="30" cy="14" r="3"/><path d="M10 11v18M30 17c0 8-12 6-18 13"/>',
    coffee: '<path d="M8 15h20v9a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8z"/><path d="M28 18h3a4 4 0 0 1 0 8h-3M14 5c-2 2.5 2 4 0 7M20 5c-2 2.5 2 4 0 7M26 5c-2 2.5 2 4 0 7M6 36h24"/>',
    chart: '<path d="M6 5v29h29"/><path d="M12 28v-6M19 28V16M26 28v-9M33 28V10"/>',
    film: '<rect x="6" y="16" width="28" height="18" rx="1.5"/><path d="M6 16 7 9l26-3 1 7M14 8l-2 7M22 7l-2 7M30 6l-2 7M17 21v8l7-4z"/>',
    desktop: '<rect x="4" y="6" width="32" height="22" rx="2"/><path d="M15 34h10M20 28v6M9 12h10"/>',
    kanban: '<rect x="5" y="6" width="9" height="28" rx="1.5"/><rect x="17" y="6" width="9" height="18" rx="1.5"/><rect x="29" y="6" width="7" height="12" rx="1.5"/>',
    shield: '<path d="M20 4l13 6v9c0 8-6 13-13 17-7-4-13-9-13-17v-9z"/><path d="M14 20l4 4 8-8"/>',
    mask: '<path d="M6 10c4-2 9-3 14-3s10 1 14 3c0 12-5 22-14 24C11 32 6 22 6 10z"/><path d="M11 17c2-2 5-2 7 0M22 17c2-2 5-2 7 0M14 25c3 2.5 9 2.5 12 0"/>',
    scales: '<path d="M20 5v28M12 34h16M8 10h24M8 10l-5 11M8 10l5 11M32 10l-5 11M32 10l5 11"/><path d="M3 21a5 4 0 0 0 10 0zM27 21a5 4 0 0 0 10 0z"/>',
    star: '<path d="M20 4 23 16 36 19 23 22 20 34 17 22 4 19 17 16Z"/>',
    person: '<circle cx="20" cy="14" r="6.5"/><path d="M8 34c1.5-7 6-10.5 12-10.5S30.5 27 32 34"/>',
    box: '<rect x="5" y="13" width="30" height="21" rx="2"/><path d="M14 13V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4M5 21h30"/>',
    plane: '<path d="M35 6 4 18l10 4 4 11 5-7 8 6z"/><path d="M14 22 30 10"/>',
  };
  const doodle = (name, cls = '', attrs = '') =>
    `<svg class="${cls}" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${attrs}>${D[name] || D.terminal}</svg>`;

  const I = {
    sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    left: '<path d="M15 5l-7 7 7 7"/>',
    right: '<path d="M9 5l7 7-7 7"/>',
    arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    down: '<path d="M12 4v15M6 13l6 6 6-6"/>',
    ext: '<path d="M7 17 17 7M9 7h8v8"/>',
    telegram: '<path d="M21 4 2.5 11.2l6 2.2L18 7.5l-7.3 7.3.3 5.7 3.3-3.7 4.7 3.4z"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
  };
  const icon = (name, cls = '') =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name] || I.arrow}</svg>`;

  const rule = () =>
    `<svg class="rule" viewBox="0 0 1000 16" preserveAspectRatio="none" aria-hidden="true"><path d="M4 9 C180 3 340 14 500 8 C680 2 840 13 996 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" filter="url(#rough)"/></svg>`;
  const uline = () =>
    `<svg class="uline" viewBox="0 0 170 12" preserveAspectRatio="none" aria-hidden="true"><path d="M3 7 C45 3 100 10 167 5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" filter="url(#rough)"/></svg>`;
  const heading = (ico, text, id = '') =>
    `<h2 class="h2"${id ? ` id="${id}"` : ''}>${doodle(ico)}${esc(text)}</h2>${uline()}`;

  // детерминированный «случай» — чтобы обложки не прыгали между перерисовками
  const seeded = (str) => {
    let h = 2166136261;
    for (const ch of str) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    return () => {
      h = Math.imul(h ^ (h >>> 15), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return ((h ^= h >>> 16) >>> 0) / 4294967296;
    };
  };

  const contactBtn = (c) =>
    `<a class="btn sk" href="${esc(c.url)}" target="_blank" rel="noopener">${icon(c.icon)}${esc(t(c.label))} <small>${esc(t(c.value))}</small></a>`;

  // ─── hero ────────────────────────────────────────────────────────────────
  const HERO_DOODLES = [
    ['prompt', 4, 12, 54, -6, .14], ['braces', 10, 46, 48, 8, .09], ['bug', 5, 78, 50, -10, .1],
    ['star', 88, 10, 36, 0, .22], ['prompt', 92, 34, 46, 5, .12], ['lock', 85, 60, 44, -7, .09],
    ['prompt', 14, 26, 34, 4, .08], ['nodes', 93, 84, 48, 9, .09], ['git', 79, 30, 36, -4, .06],
    ['shield', 18, 66, 36, 6, .06],
  ];

  // те же меловые значки по боковым полям остальных секций (видны от 1280px, см. .doodles--side)
  const SIDE_DOODLES = {
    works: [
      ['prompt', 4, 6, 46, -6, .12], ['star', 95, 9, 30, 0, .2], ['braces', 7, 22, 42, 8, .08],
      ['lock', 96, 27, 40, -7, .08], ['bug', 4, 41, 46, -10, .09], ['nodes', 95, 47, 44, 9, .09],
      ['git', 6, 62, 36, -4, .07], ['prompt', 96, 68, 42, 5, .11], ['shield', 4, 82, 38, 6, .07],
      ['star', 94, 88, 26, 0, .16],
    ],
    about: [
      ['terminal', 5, 18, 44, -5, .09], ['star', 95, 12, 28, 0, .18], ['gear', 94, 58, 42, 8, .08],
      ['prompt', 4, 72, 40, 4, .1],
    ],
    contact: [
      ['plane', 95, 30, 42, -8, .1], ['prompt', 5, 40, 40, 5, .1], ['star', 6, 82, 26, 0, .16],
    ],
  };

  function renderSideDoodles() {
    for (const [id, list] of Object.entries(SIDE_DOODLES)) {
      const sec = document.getElementById(id);
      if (!sec || sec.querySelector(':scope > .doodles')) continue;
      const svgs = list.map(([n, x, y, s, r, o]) =>
        doodle(n, '', `style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;transform:translate(-50%,-50%) rotate(${r}deg);opacity:${o}"`)
      ).join('');
      sec.insertAdjacentHTML('afterbegin', `<div class="doodles doodles--side" aria-hidden="true">${svgs}</div>`);
    }
  }

  function renderHero() {
    const doodles = HERO_DOODLES.map(([n, x, y, s, r, o]) =>
      doodle(n, '', `style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;transform:translate(-50%,-50%) rotate(${r}deg);opacity:${o}"`)
    ).join('');

    $('#hero').innerHTML = `
      <div class="doodles" aria-hidden="true">${doodles}</div>
      <div class="wrap hero__in">
        <p class="whoami">&gt;_ whoami</p>
        <h1 class="name">${esc(P.name)} <span>(${esc(P.alias)})</span></h1>
        <svg class="swoosh" viewBox="0 0 440 30" fill="none" aria-hidden="true"><path pathLength="1" d="M8 20 C90 7 160 7 230 13 C300 19 370 17 432 9" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" filter="url(#rough)"/></svg>
        <p class="tagline">${esc(t(P.tagline))}</p>
        <p class="role">${esc(t(P.role))}</p>
        <p class="intro">${rich(P.intro)}</p>
        <div class="cta">
          <a class="btn btn--solid" href="#works">${esc(u('see_works'))} ${icon('down')}</a>
          ${(P.contacts || []).map(contactBtn).join('')}
        </div>
        ${(P.stats || []).length ? `
          <ul class="stats">${P.stats.map((s) => `<li class="stat"><b>${esc(s.value)}</b><span>${esc(t(s.label))}</span></li>`).join('')}</ul>
          <p class="stats-note">${esc(u('stats_note'))}</p>` : ''}
      </div>`;
  }

  // ─── работы ──────────────────────────────────────────────────────────────
  const visibleWorks = () => (filter === 'all' ? WORKS : WORKS.filter((w) => (w.tags || []).includes(filter)));

  function chalkCover(w) {
    const rnd = seeded(w.slug);
    const bits = Array.from({ length: 5 }, (_, i) => {
      const left = i % 2 ? 62 + rnd() * 30 : 4 + rnd() * 26;
      const top = 8 + rnd() * 70;
      const size = 18 + rnd() * 18;
      return doodle(i === 2 ? 'star' : 'prompt', 'chalk__bit',
        `style="left:${left.toFixed(1)}%;top:${top.toFixed(1)}%;width:${size.toFixed(0)}px;transform:rotate(${(rnd() * 24 - 12).toFixed(0)}deg)"`);
    }).join('');
    const rot = (rnd() * 12 - 6).toFixed(1);
    return `<div class="chalk" style="--rot:${rot}deg">${bits}${doodle(w.icon, 'chalk__icon')}<span class="chalk__path">~/${esc(w.slug)}</span></div>`;
  }

  // ?v=… из works.js — чтобы после замены картинок браузер не показывал старые из кэша
  function asset(src) {
    const v = window.ASSET_VERSION;
    return v && !/^(https?:|data:)/.test(src) ? `${src}${src.includes('?') ? '&' : '?'}v=${encodeURIComponent(v)}` : src;
  }

  function coverHTML(w, src = w.cover) {
    if (!src) return chalkCover(w);
    return `<img src="${esc(asset(src))}" alt="${esc(t(w.title))} — ${esc(u('shot'))}" loading="lazy" decoding="async" data-slug="${esc(w.slug)}">`;
  }

  // если картинку ещё не положили — показываем меловую обложку вместо битой
  function guardImages(scope) {
    scope.querySelectorAll('img[data-slug]').forEach((img) => {
      const fallback = () => {
        const w = WORKS.find((x) => x.slug === img.dataset.slug);
        if (w) img.outerHTML = chalkCover(w);
      };
      if (img.complete && img.naturalWidth === 0) fallback();
      else img.addEventListener('error', fallback, { once: true });
    });
  }

  function renderWorksHead() {
    $('#works-head').innerHTML = `
      ${rule()}
      <div class="section__head">
        <div>
          ${heading('star', u('works_title'))}
          <p class="lead">${esc(u('works_lead'))}</p>
        </div>
        <span class="count" id="count"></span>
      </div>`;
  }

  function renderFilters() {
    const keys = Object.keys(CATS).filter((k) => WORKS.some((w) => (w.tags || []).includes(k)));
    const chip = (key, label, n) =>
      `<button type="button" class="chip sk" data-filter="${key}" aria-pressed="${filter === key}">${esc(label)}<sup>${n}</sup></button>`;
    $('#filters').setAttribute('aria-label', u('works_title'));
    $('#filters').innerHTML = [
      chip('all', u('all'), WORKS.length),
      ...keys.map((k) => chip(k, t(CATS[k]), WORKS.filter((w) => (w.tags || []).includes(k)).length)),
    ].join('');
  }

  function cardHTML(w, i) {
    const stack = w.stack || [];
    const shown = stack.slice(0, 4).map((s) => `<li>${esc(t(s))}</li>`).join('');
    const rest = stack.length > 4 ? `<li>+${stack.length - 4}</li>` : '';
    return `
      <a class="card sk" href="#/w/${esc(w.slug)}" style="--i:${i}">
        <div class="cover">${coverHTML(w)}</div>
        <div class="card__meta"><span>${esc(t(KINDS[w.kind]) || '')}</span><i class="dot"></i><span>${esc(w.year ?? '')}</span>${w.badge ? `<b class="card__badge">${esc(t(w.badge))}</b>` : ''}</div>
        <h3 class="card__title">${esc(t(w.title))}</h3>
        <p class="card__sum">${rich(w.summary)}</p>
        ${stack.length ? `<ul class="card__stack">${shown}${rest}</ul>` : ''}
        <span class="card__more">${esc(u('more'))} ${icon('arrow')}</span>
      </a>`;
  }

  function renderGrid() {
    const list = visibleWorks();
    const grid = $('#grid');
    grid.innerHTML = list.length ? list.map(cardHTML).join('') : `<p class="empty">${esc(u('empty'))}</p>`;
    guardImages(grid);
    $('#count').textContent = u('count')(list.length);
  }

  // ─── обо мне + стек ──────────────────────────────────────────────────────
  function renderAbout() {
    const about = (P.about || []).map((a) =>
      `<li>${doodle(a.icon)}<div><b>${esc(t(a.title))}</b><span>${rich(a.text)}</span></div></li>`).join('');
    const tools = (P.toolbox || []).map((g) => `
      <div class="tools__group">
        <h3>${doodle(g.icon)}${esc(t(g.title))}</h3>
        <ul>${g.items.map((it) => `<li class="chip chip--sm sk">${esc(t(it))}</li>`).join('')}</ul>
      </div>`).join('');

    $('#about-body').innerHTML = `
      ${rule()}
      <div class="about">
        <div class="about__intro">
          ${heading('person', u('about_title'))}
          <p class="lead">${rich(P.intro)}</p>
        </div>
        <ul class="about__list">${about}</ul>
      </div>
      <div class="stack">
        ${heading('box', u('stack_title'))}
        <div class="tools">${tools}</div>
      </div>`;
  }

  function renderContact() {
    $('#contact-body').innerHTML = `
      ${rule()}
      ${heading('plane', u('contact_title'))}
      <p class="lead">${esc(u('contact_lead'))}</p>
      <div class="cta">${(P.contacts || []).map(contactBtn).join('')}</div>`;
  }

  // ─── окно работы ─────────────────────────────────────────────────────────
  const dlg = $('#work');
  let current = null;
  let pushedHash = false;
  let restoreY = null;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function workHTML(w) {
    const imgs = [w.cover, ...(w.shots || [])].filter(Boolean);
    const list = visibleWorks().some((x) => x.slug === w.slug) ? visibleWorks() : WORKS;
    const idx = list.findIndex((x) => x.slug === w.slug);
    const prev = list[(idx - 1 + list.length) % list.length];
    const next = list[(idx + 1) % list.length];
    const items = (v) => [].concat(t(v) || []).map((p) => `<li>${rich(p)}</li>`).join('');
    const points = items(w.points);
    const mine = items(w.mine);
    const team = items(w.team);
    const links = (w.links || []).map((l) =>
      `<a class="btn sk" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(t(l.label))} ${icon('ext')}</a>`).join('');
    const tags = (w.tags || []).map((k) => t(CATS[k])).filter(Boolean).join(' · ');

    return `
      <div class="sheet">
        <div class="sheet__bar">
          <span class="sheet__crumbs">~/works/${esc(w.slug)}</span>
          <button type="button" class="icon-btn" data-close aria-label="${esc(u('close'))}">${icon('close')}</button>
        </div>
        <div class="gallery">
          <div class="gallery__main sk"><div class="cover">${imgs.length ? coverHTML(w, imgs[0]) : chalkCover(w)}</div></div>
          ${imgs.length > 1 ? `<div class="thumbs">${imgs.map((src, i) =>
            `<button type="button" data-shot="${esc(src)}" aria-current="${i === 0}" aria-label="${esc(u('shot'))} ${i + 1}"><img src="${esc(asset(src))}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
        </div>
        <h2 class="work__title" id="work-title">${esc(t(w.title))}</h2>
        <div class="work__meta">
          <span>${esc(t(KINDS[w.kind]) || '')}</span><span>${esc(w.year ?? '')}</span>${tags ? `<span>${esc(tags)}</span>` : ''}
        </div>
        <p class="work__sum">${rich(w.summary)}</p>
        ${w.contrib ? `<p class="contrib"><span>${esc(u('contrib'))}</span>${rich(w.contrib)}</p>` : ''}
        ${points ? `<h3>${esc(u('done'))}</h3><ul class="points">${points}</ul>` : ''}
        ${mine ? `<h3>${esc(u('mine'))}</h3><ul class="points">${mine}</ul>` : ''}
        ${team ? `<h3>${esc(u('team'))}</h3><ul class="points points--team">${team}</ul>` : ''}
        ${(w.stack || []).length ? `<h3>${esc(u('stack'))}</h3><ul class="work__stack">${w.stack.map((s) => `<li class="chip chip--sm sk">${esc(t(s))}</li>`).join('')}</ul>` : ''}
        ${links ? `<h3>${esc(u('links'))}</h3><div class="work__links">${links}</div>` : ''}
        ${list.length > 1 ? `
          <nav class="pager">
            <button type="button" data-go="${esc(prev.slug)}" data-dir="prev">${icon('left')}<span>${esc(u('prev'))}<b>${esc(t(prev.title))}</b></span></button>
            <button type="button" data-go="${esc(next.slug)}" data-dir="next"><span>${esc(u('next'))}<b>${esc(t(next.title))}</b></span>${icon('right')}</button>
          </nav>` : ''}
      </div>`;
  }

  function openWork(slug, focusDir) {
    const w = WORKS.find((x) => x.slug === slug);
    if (!w) return false;
    current = w;
    dlg.innerHTML = workHTML(w);
    guardImages(dlg);
    if (!dlg.open) dlg.showModal();
    $('.sheet', dlg).scrollTop = 0;
    if (focusDir) $(`[data-dir="${focusDir}"]`, dlg)?.focus();
    document.title = `${t(w.title)} — ${P.name} (${P.alias})`;
    return true;
  }

  function setDocTitle() {
    document.title = `${P.name} (${P.alias}) — ${u('title')}`;
  }

  function route() {
    // после «назад» из окна работы остаёмся там же, где были, а не прыгаем к #works
    if (restoreY != null) { window.scrollTo({ top: restoreY, behavior: 'instant' }); restoreY = null; }
    const m = location.hash.match(/^#\/w\/([\w-]+)/);
    if (m && openWork(m[1])) return;
    if (dlg.open) dlg.close();
  }

  dlg.addEventListener('close', () => {
    current = null;
    setDocTitle();
    if (/^#\/w\//.test(location.hash)) {
      if (pushedHash) { restoreY = window.scrollY; history.back(); }
      else history.replaceState(null, '', location.pathname + location.search);
    }
    pushedHash = false;
  });

  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) return dlg.close();
    if (e.target.closest('[data-close]')) return dlg.close();
    const go = e.target.closest('[data-go]');
    if (go) {
      history.replaceState(null, '', `#/w/${go.dataset.go}`);
      openWork(go.dataset.go, go.dataset.dir);
      return;
    }
    const shot = e.target.closest('[data-shot]');
    if (shot) {
      $('.gallery__main .cover', dlg).innerHTML = coverHTML(current, shot.dataset.shot);
      dlg.querySelectorAll('[data-shot]').forEach((b) => b.setAttribute('aria-current', String(b === shot)));
    }
  });

  dlg.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const btn = $(`[data-dir="${e.key === 'ArrowLeft' ? 'prev' : 'next'}"]`, dlg);
    if (btn) { e.preventDefault(); btn.click(); }
  });

  // ─── шапка, язык, тема ───────────────────────────────────────────────────
  function renderChrome() {
    root.lang = lang;
    document.querySelectorAll('[data-ui]').forEach((el) => { el.textContent = u(el.dataset.ui); });
    $('.skip').textContent = u('skip');
    document.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    const dark = root.dataset.theme !== 'light';
    const btn = $('#theme');
    btn.innerHTML = icon(dark ? 'sun' : 'moon');
    btn.setAttribute('aria-label', u(dark ? 'theme_light' : 'theme_dark'));
    btn.title = btn.getAttribute('aria-label');
    $('meta[name="theme-color"]').setAttribute('content', getComputedStyle(root).getPropertyValue('--bg').trim());
  }

  function renderAll() {
    renderChrome();
    renderHero();
    renderSideDoodles();
    renderWorksHead();
    renderFilters();
    renderGrid();
    renderAbout();
    renderContact();
    if (current) openWork(current.slug);
    else setDocTitle();
  }

  document.addEventListener('click', (e) => {
    const l = e.target.closest('[data-lang]');
    if (l && l.dataset.lang !== lang) {
      lang = l.dataset.lang;
      store.set('lang', lang);
      renderAll();
      return;
    }
    if (e.target.closest('#theme')) {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      store.set('theme', root.dataset.theme);
      renderChrome();
      return;
    }
    const f = e.target.closest('[data-filter]');
    if (f) {
      filter = f.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === f)));
      renderGrid();
      return;
    }
    if (e.target.closest('.card')) pushedHash = true;
  });

  const top = $('.top');
  const onScroll = () => top.classList.toggle('is-stuck', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', route);

  renderAll();
  onScroll();
  route();
})();
