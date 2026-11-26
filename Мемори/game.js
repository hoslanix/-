/* Special Cards — логика мемори-игры. Данные разделов: sections.js */
(function () {
  'use strict';

  var THEMES = window.THEMES || [];
  var MAX_PAIRS = 18;          // поле 6 × 6
  var COLS = 6;
  var ABILITY_USES = 3;        // подсказка ×3, заморозка ×3
  var FREEZE_MS = 10000;
  var MISMATCH_MS = 900;
  var STORAGE_KEY = 'special-cards:last-section';

  var el = {
    stage: document.getElementById('stage'),
    crumb: document.getElementById('crumb'),
    timer: document.getElementById('timer'),
    timerBox: document.querySelector('.timer'),
    freezeChip: document.getElementById('freezeChip'),
    stats: document.getElementById('stats'),
    games: document.getElementById('games'),
    sections: document.getElementById('sections'),
    grid: document.getElementById('grid'),
    hintBtn: document.getElementById('hintBtn'),
    hintCount: document.getElementById('hintCount'),
    freezeBtn: document.getElementById('freezeBtn'),
    freezeCount: document.getElementById('freezeCount'),
    restartBtn: document.getElementById('restartBtn'),
    win: document.getElementById('win'),
    winText: document.getElementById('winText'),
    againBtn: document.getElementById('againBtn'),
    nextBtn: document.getElementById('nextBtn'),
    catalogBtn: document.getElementById('catalogBtn'),
    catalog: document.getElementById('catalog'),
    catalogTabs: document.getElementById('catalogTabs'),
    catalogBody: document.getElementById('catalogBody'),
  };

  var state = {
    theme: 0,
    section: 0,
    catalogTheme: 0,
    gameId: 0,
    deck: [],        // { pair, name, img, hue, shape, open, matched }
    tiles: [],       // DOM-кнопки по индексу карточки
    picked: [],      // индексы открытых, но ещё не совпавших карточек
    pairs: 0,
    found: 0,
    moves: 0,
    lock: false,
    finished: false,
    hints: ABILITY_USES,
    freezes: ABILITY_USES,
    running: false,
    elapsed: 0,
    lastTick: 0,
    frozenUntil: 0,
  };

  /* ---------- helpers ---------- */

  function h(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function plural(n, one, few, many) {
    var d = n % 10, dd = n % 100;
    if (d === 1 && dd !== 11) return one;
    if (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) return few;
    return many;
  }

  function formatTime(ms) {
    var total = Math.floor(ms / 1000);
    var m = Math.floor(total / 60);
    var s = total % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function initials(name) {
    var words = name.split(/\s+/).map(function (w) {
      return w.replace(/[^0-9A-Za-zА-Яа-яЁё]/g, '');
    }).filter(Boolean);
    if (!words.length) return '?';
    var out = words.length === 1 ? words[0].slice(0, 2) : words[0][0] + words[1][0];
    return out.toUpperCase();
  }

  function currentTheme() { return THEMES[state.theme]; }
  function currentSection() { return currentTheme().sections[state.section]; }
  function pairCount(section) { return Math.min(MAX_PAIRS, section.cards.length); }

  /* ---------- масштаб сцены под окно ---------- */

  function fit() {
    var s = Math.min(1, window.innerWidth / 1440, window.innerHeight / 960);
    document.documentElement.style.setProperty('--s', String(s));
  }

  /* ---------- сохранение выбора ---------- */

  function saveChoice() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        theme: currentTheme().id,
        section: currentSection().id,
      }));
    } catch (e) { /* хранилище недоступно — не критично */ }
  }

  function loadChoice() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved) return;
      THEMES.forEach(function (theme, ti) {
        if (theme.id !== saved.theme) return;
        state.theme = ti;
        theme.sections.forEach(function (section, si) {
          if (section.id === saved.section) state.section = si;
        });
      });
    } catch (e) { /* игнорируем повреждённые данные */ }
  }

  /* ---------- выбор раздела (левая панель) ---------- */

  function renderPicker() {
    el.games.textContent = '';
    THEMES.forEach(function (theme, i) {
      var chip = h('button', 'chip', theme.name);
      chip.type = 'button';
      chip.setAttribute('aria-pressed', String(i === state.theme));
      chip.addEventListener('click', function () {
        if (i !== state.theme) select(i, 0);
      });
      el.games.appendChild(chip);
    });

    el.sections.textContent = '';
    currentTheme().sections.forEach(function (section, i) {
      var n = pairCount(section);
      var btn = h('button', 'sect');
      btn.type = 'button';
      btn.setAttribute('aria-pressed', String(i === state.section));
      btn.appendChild(h('span', 'sect__radio'));
      var text = h('span', 'sect__text');
      text.appendChild(h('span', 'sect__name', section.name));
      text.appendChild(h('span', 'sect__desc', section.desc));
      btn.appendChild(text);
      btn.appendChild(h('span', 'sect__count', n + ' ' + plural(n, 'пара', 'пары', 'пар')));
      btn.addEventListener('click', function () { select(state.theme, i); });
      el.sections.appendChild(btn);
    });

    el.crumb.textContent = '';
    el.crumb.appendChild(document.createTextNode(currentTheme().name));
    el.crumb.appendChild(h('span', null, '·'));
    el.crumb.appendChild(document.createTextNode(currentSection().name));
  }

  function select(themeIndex, sectionIndex) {
    state.theme = themeIndex;
    state.section = sectionIndex;
    saveChoice();
    renderPicker();
    newGame();
    if (!el.catalog.hidden) renderCatalog();
  }

  /* ---------- таблица разделов (выпадающая панель) ---------- */

  function renderCatalog() {
    el.catalogTabs.textContent = '';
    THEMES.forEach(function (theme, i) {
      var tab = h('button', 'tab', theme.name);
      tab.type = 'button';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(i === state.catalogTheme));
      tab.addEventListener('click', function () {
        state.catalogTheme = i;
        renderCatalog();
      });
      el.catalogTabs.appendChild(tab);
    });

    el.catalogBody.textContent = '';
    el.catalogBody.scrollTop = 0;
    THEMES[state.catalogTheme].sections.forEach(function (section, i) {
      var isCurrent = state.catalogTheme === state.theme && i === state.section;
      var box = h('article', 'cat-sect' + (isCurrent ? ' is-current' : ''));

      var head = h('div', 'cat-sect__head');
      var text = h('div', 'cat-sect__text');
      text.appendChild(h('h3', 'cat-sect__name', section.name));
      text.appendChild(h('p', 'cat-sect__desc', section.desc + ' · ' + section.cards.length + ' ' +
        plural(section.cards.length, 'карточка', 'карточки', 'карточек')));
      head.appendChild(text);

      var play = h('button', 'btn btn--small' + (isCurrent ? '' : ' btn--primary'), isCurrent ? 'Выбрано' : 'Играть');
      play.type = 'button';
      play.addEventListener('click', function () {
        select(state.catalogTheme, i);
        toggleCatalog(false);
      });
      head.appendChild(play);
      box.appendChild(head);

      var list = h('ul', 'cat-sect__cards');
      section.cards.forEach(function (card) {
        list.appendChild(h('li', null, typeof card === 'string' ? card : card.name));
      });
      box.appendChild(list);
      el.catalogBody.appendChild(box);
    });
  }

  function toggleCatalog(open) {
    var show = open == null ? el.catalog.hidden : open;
    el.catalog.hidden = !show;
    el.catalogBtn.setAttribute('aria-expanded', String(show));
    if (show) {
      state.catalogTheme = state.theme;
      renderCatalog();
    }
  }

  /* ---------- партия ---------- */

  function newGame() {
    var section = currentSection();
    var n = pairCount(section);
    var chosen = shuffle(section.cards).slice(0, n);

    var deck = [];
    chosen.forEach(function (card, i) {
      var data = typeof card === 'string' ? { name: card } : card;
      for (var k = 0; k < 2; k++) {
        deck.push({
          pair: i,
          name: data.name,
          img: data.img || null,
          hue: Math.round((360 / n) * i),
          shape: i % 3,
          open: false,
          matched: false,
        });
      }
    });

    state.gameId++;
    state.deck = shuffle(deck);
    state.picked = [];
    state.pairs = n;
    state.found = 0;
    state.moves = 0;
    state.lock = false;
    state.finished = false;
    state.hints = ABILITY_USES;
    state.freezes = ABILITY_USES;
    state.running = false;
    state.elapsed = 0;
    state.frozenUntil = 0;

    el.win.hidden = true;
    renderGrid();
    renderStats();
    renderAbilities();
    renderTimer();
  }

  function renderGrid() {
    el.grid.textContent = '';
    state.tiles = [];
    var row = null;
    state.deck.forEach(function (card, i) {
      if (i % COLS === 0) {
        row = h('div', 'row');
        el.grid.appendChild(row);
      }
      var tile = h('button', 'tile');
      tile.type = 'button';
      tile.setAttribute('aria-label', 'Карточка ' + (i + 1) + ', закрыта');

      var inner = h('span', 'tile__inner');
      inner.appendChild(h('span', 'tile__back'));

      var face = h('span', 'tile__face');
      face.style.setProperty('--h', String(card.hue));
      if (card.img) {
        var img = document.createElement('img');
        img.className = 'tile__img';
        img.src = card.img;
        img.alt = card.name;
        img.draggable = false;
        face.appendChild(img);
      } else {
        face.appendChild(h('span', 'tile__emblem tile__emblem--' + card.shape, initials(card.name)));
        face.appendChild(h('span', 'tile__name', card.name));
      }
      inner.appendChild(face);
      tile.appendChild(inner);

      tile.addEventListener('click', function () { flip(i); });
      row.appendChild(tile);
      state.tiles.push(tile);
    });
  }

  function syncTile(i) {
    var card = state.deck[i];
    var tile = state.tiles[i];
    tile.classList.toggle('is-open', card.open);
    tile.classList.toggle('is-matched', card.matched);
    var status = card.matched ? card.name + ', пара найдена'
      : card.open ? card.name + ', открыта'
      : 'Карточка ' + (i + 1) + ', закрыта';
    tile.setAttribute('aria-label', status);
  }

  function flip(i) {
    if (state.lock || state.finished) return;
    var card = state.deck[i];
    if (card.open || card.matched) return;

    startTimer();
    card.open = true;
    syncTile(i);
    state.picked.push(i);
    if (state.picked.length < 2) return;

    state.moves++;
    var a = state.picked[0], b = state.picked[1];
    if (state.deck[a].pair === state.deck[b].pair) {
      state.deck[a].matched = state.deck[b].matched = true;
      syncTile(a); syncTile(b);
      state.picked = [];
      state.found++;
      if (state.found === state.pairs) finish();
    } else {
      var game = state.gameId;
      state.lock = true;
      state.tiles[a].classList.add('is-wrong');
      state.tiles[b].classList.add('is-wrong');
      setTimeout(function () {
        if (game !== state.gameId) return;
        [a, b].forEach(function (idx) {
          state.deck[idx].open = false;
          state.tiles[idx].classList.remove('is-wrong');
          syncTile(idx);
        });
        state.picked = [];
        state.lock = false;
      }, MISMATCH_MS);
    }
    renderStats();
    renderAbilities();
  }

  function finish() {
    state.finished = true;
    state.running = false;
    state.frozenUntil = 0;
    renderTimer();

    el.winText.textContent = '';
    el.winText.appendChild(document.createTextNode(currentTheme().name + ' · ' + currentSection().name));
    el.winText.appendChild(document.createElement('br'));
    el.winText.appendChild(document.createTextNode('Время: '));
    el.winText.appendChild(h('b', null, formatTime(state.elapsed)));
    el.winText.appendChild(document.createTextNode(' · Ходы: '));
    el.winText.appendChild(h('b', null, String(state.moves)));
    el.win.hidden = false;
    el.againBtn.focus();
  }

  function renderStats() {
    el.stats.textContent = '';
    el.stats.appendChild(document.createTextNode('Ходы: '));
    el.stats.appendChild(h('b', null, String(state.moves)));
    el.stats.appendChild(document.createTextNode('  ·  Пары: '));
    el.stats.appendChild(h('b', null, state.found + ' / ' + state.pairs));
  }

  /* ---------- таймер ---------- */

  function startTimer() {
    if (state.running || state.finished) return;
    state.running = true;
    state.lastTick = performance.now();
    renderAbilities();
  }

  function tick() {
    var now = performance.now();
    if (state.running) {
      if (now >= state.frozenUntil) state.elapsed += now - state.lastTick;
      state.lastTick = now;
    }
    renderTimer();
  }

  function renderTimer() {
    var left = state.frozenUntil - performance.now();
    var frozen = state.running && left > 0;
    el.timer.textContent = formatTime(state.elapsed);
    el.timerBox.classList.toggle('is-frozen', frozen);
    el.freezeChip.hidden = !frozen;
    if (frozen) el.freezeChip.textContent = 'заморозка ' + Math.ceil(left / 1000) + ' с';
    // после окончания заморозки кнопка снова доступна
    if (!frozen && el.freezeBtn.dataset.frozen === '1') {
      el.freezeBtn.dataset.frozen = '0';
      renderAbilities();
    }
  }

  /* ---------- способности ---------- */

  function renderAbilities() {
    var frozen = state.running && performance.now() < state.frozenUntil;
    el.hintCount.textContent = String(state.hints);
    el.freezeCount.textContent = String(state.freezes);
    el.hintBtn.disabled = state.hints <= 0 || state.finished;
    el.freezeBtn.disabled = state.freezes <= 0 || state.finished || !state.running || frozen;
    el.hintBtn.setAttribute('aria-label', 'Подсказка, осталось ' + state.hints);
    el.freezeBtn.setAttribute('aria-label', 'Заморозка таймера, осталось ' + state.freezes);
  }

  // Подсказка: подсвечивает пару. Если одна карточка уже открыта — показывает её пару.
  function useHint() {
    if (state.lock || state.finished || state.hints <= 0) return;

    var pair;
    if (state.picked.length === 1) {
      pair = state.deck[state.picked[0]].pair;
    } else {
      var open = [];
      state.deck.forEach(function (card) {
        if (!card.matched && open.indexOf(card.pair) === -1) open.push(card.pair);
      });
      if (!open.length) return;
      pair = open[Math.floor(Math.random() * open.length)];
    }

    state.hints--;
    startTimer();
    var targets = state.tiles.filter(function (tile, i) { return state.deck[i].pair === pair; });
    targets.forEach(function (tile) {
      tile.classList.remove('is-hint');
      void tile.offsetWidth; // перезапуск анимации
      tile.classList.add('is-hint');
    });
    setTimeout(function () {
      targets.forEach(function (tile) { tile.classList.remove('is-hint'); });
    }, 1900);
    renderAbilities();
  }

  // Заморозка: останавливает таймер на 10 секунд.
  function useFreeze() {
    var now = performance.now();
    if (!state.running || state.finished || state.freezes <= 0 || now < state.frozenUntil) return;
    state.freezes--;
    state.frozenUntil = now + FREEZE_MS;
    el.freezeBtn.dataset.frozen = '1';
    renderTimer();
    renderAbilities();
  }

  /* ---------- события ---------- */

  el.hintBtn.addEventListener('click', useHint);
  el.freezeBtn.addEventListener('click', useFreeze);
  el.restartBtn.addEventListener('click', newGame);
  el.againBtn.addEventListener('click', newGame);
  el.nextBtn.addEventListener('click', function () {
    var theme = state.theme;
    var section = state.section + 1;
    if (section >= currentTheme().sections.length) {
      section = 0;
      theme = (theme + 1) % THEMES.length;
    }
    select(theme, section);
  });

  el.catalogBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleCatalog();
  });
  el.catalog.addEventListener('click', function (e) { e.stopPropagation(); });
  document.addEventListener('click', function () {
    if (!el.catalog.hidden) toggleCatalog(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !el.catalog.hidden) {
      toggleCatalog(false);
      el.catalogBtn.focus();
    }
  });

  window.addEventListener('resize', fit);

  /* ---------- старт ---------- */

  fit();
  if (!THEMES.length) return;
  loadChoice();
  renderPicker();
  newGame();
  setInterval(tick, 200);
})();
