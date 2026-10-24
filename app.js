/* Fluence — screens + game logic. No framework, no backend.
   One mixed round per topic: three segments (Image→Name, Name→Image, Speed burst)
   played in a fixed order. */
(function () {
  const app = document.getElementById('app');

  /* ---------- config ---------- */
  const MODES = {
    toName: { label: 'Image → Name', count: 4 },
    toImage: { label: 'Name → Image', count: 4 },
    burst: { label: 'Speed burst', seconds: 20 },
  };
  const RANKS = [
    { min: 0, title: 'Just Starting Out', line: 'Everyone starts somewhere. Round two will feel different.' },
    { min: 90, title: 'Picking Up the Basics', line: 'The names are starting to stick.' },
    { min: 170, title: 'Getting the Hang of It', line: 'You could nod along in a class now.' },
    { min: 250, title: 'Fluent in Movement', line: 'No PT needed. Go own that gym floor.' },
  ];
  const SPEED_MS = 3000, STREAK_AT = 3;

  const GOOD = ['Nice one!', 'Yes, that’s the one!', 'Look at you!', 'Spot on!', 'You’ve got it!', 'Smooth!'];
  const OOPS = ['So close!', 'Tricky one, right?', 'Easy mix-up!', 'Now you know!', 'That one fools everyone!'];

  /* ---------- tiny helpers ---------- */
  const $ = (sel, root) => (root || app).querySelector(sel);
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const byTopic = (t) => MOVEMENTS.filter((m) => m.topic === t);
  const store = {
    get(k, d) { try { const v = localStorage.getItem('fluence:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('fluence:' + k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
  };
  const ICON = {
    back: '<svg viewBox="0 0 16 16"><path d="M13 8H3M7.5 3.5 3 8l4.5 4.5"/></svg>',
    close: '<svg viewBox="0 0 16 16"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9"/></svg>',
    tick: '<svg viewBox="0 0 12 12"><path d="M2 6.5 5 9.2 10 3"/></svg>',
    mark: '<svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 9c4-4 6 4 10 0s6-4 10 0M3 17c4-4 6 4 10 0s6-4 10 0"/></svg>',
  };
  const logo = () => `<span class="logo" aria-label="Fluence">fl<i>u</i>ence<sup>©</sup></span>`;
  const rankFor = (score) => RANKS.reduce((r, x) => (score >= x.min ? x : r), RANKS[0]);

  /* ---------- state ---------- */
  let ui = { screen: 'home', topic: null };
  let G = null; // current round
  let timerId = null, advanceId = null;
  const stopTimers = () => { clearInterval(timerId); clearTimeout(advanceId); timerId = advanceId = null; };

  function go(screen, patch) {
    stopTimers();
    Object.assign(ui, { screen }, patch || {});
    window.scrollTo(0, 0);
    ({ home: renderHome, topics: renderTopics, intro: renderIntro, game: renderGame, end: renderEnd })[screen]();
  }

  const headerBtns = (back, close) => `<div class="top">
      ${back ? `<button class="round-btn sq-btn" data-act="${back}" aria-label="Back">${ICON.back}</button>` : '<span></span>'}
      ${close ? `<button class="round-btn" data-act="home" aria-label="Close">${ICON.close}</button>` : '<span></span>'}
    </div>`;

  /* ---------- HOME ---------- */
  function renderHome() {
    app.innerHTML = `<section class="screen home">
      <div class="scene" aria-hidden="true">
        <div class="glow"><div class="sun"><img src="assets/home/ellipse.svg" alt=""></div></div>
        <span class="grain"></span>
        <div class="land"><img src="assets/home/grass.png" alt=""></div>
        <div class="pose-pos"><div class="pose-in"><img class="pose" src="assets/home/person.png" alt=""></div></div>
        <div class="fade"></div>
      </div>
      <header class="home-top"><img class="home-logo" src="assets/Logo.svg" alt="Fluence"></header>
      <div class="body">
        <div class="copy">
          <h1 class="h-xl"><span class="ln">Fluent in</span> <span class="ln">Movement</span></h1>
          <p class="lead">Learn the language of the gym and other workouts. Match each move to its name.</p>
        </div>
        <button class="pill" data-act="topics">Get Started</button>
      </div>
    </section>`;
  }

  /* ---------- TOPICS (Figma 02 Topics) ---------- */
  const TOPIC_ART = { gym: 'assets/topics/gym.png', pilates: 'assets/topics/pilates.png' };
  const TOPIC_BLURB = { gym: 'Match gym exercises to their names', pilates: 'Match Pilates moves to their names' };
  function renderTopics() {
    const list = Object.values(TOPICS);
    const cards = list.map((t) => {
      const best = store.get('best:' + t.id, null);
      return `<button class="topic-card ${t.id}" data-act="pickTopic" data-topic="${t.id}">
        <span class="hero">
          <img src="${TOPIC_ART[t.id]}" alt="">
          <span class="tone"></span>
          ${best != null ? `<span class="best">Best<b>${best}</b></span>` : ''}
          <span class="name">${t.title}</span>
        </span>
        <span class="info">
          <span class="badge"><span class="day">${byTopic(t.id).length}</span><span class="mon">MOVES</span></span>
          <span class="venue"><b>3 Mins</b><span>${TOPIC_BLURB[t.id]}</span></span>
        </span>
      </button>`;
    }).join('');
    app.innerHTML = `<section class="screen topics">
      <div class="top">
        <button class="round-btn" data-act="home" aria-label="Back">${ICON.back}</button>
        <img class="topics-logo" src="assets/Logo.svg" alt="Fluence">
        <button class="round-btn" data-act="home" aria-label="Close">${ICON.close}</button>
      </div>
      <div class="body">
        <div class="copy">
          <h2 class="title">What do you want to get fluent in?</h2>
          <p class="lead">Pick a topic. Every round mixes things up.</p>
        </div>
        <div class="rail">${cards}</div>
        <div class="dots" aria-hidden="true">${list.map((t, i) => `<i${i ? '' : ' class="on"'}></i>`).join('')}</div>
      </div>
    </section>`;
    const rail = $('.rail'), dots = app.querySelectorAll('.dots i');
    rail.addEventListener('scroll', () => {
      const c = rail.querySelector('.topic-card');
      const i = Math.round(rail.scrollLeft / (c.offsetWidth + 20));
      dots.forEach((d, n) => d.classList.toggle('on', n === i));
    }, { passive: true });
  }

  /* ---------- ROUND: setup ---------- */
  function distractors(target, n) {
    const pool = byTopic(target.topic).filter((m) => m.id !== target.id);
    const similar = shuffle(pool.filter((m) => m.group === target.group)).slice(0, Math.min(2, n));
    const rest = shuffle(pool.filter((m) => !similar.includes(m))).slice(0, n - similar.length);
    return similar.concat(rest);
  }
  const makeQuestion = (target) => ({ target, options: shuffle([target].concat(distractors(target, 3))) });

  function startGame(topic) {
    ui.topic = topic;
    G = {
      topic, plan: ['toName', 'toImage', 'burst'].map((mode) => ({ mode, qs: [] })),
      seg: 0, i: 0, score: 0, streak: 0, bestStreak: 0, correct: 0, answered: 0,
      missed: [], q: null, t0: 0, locked: false, lastId: null, done: false, endAt: null,
    };
    enterSegment();
  }

  /* Never show the same movement twice in a row, even across segments. */
  function freshTarget() {
    const m = pick(byTopic(G.topic).filter((x) => x.id !== G.lastId));
    G.lastId = m.id;
    return m;
  }

  function enterSegment() {
    const seg = G.plan[G.seg];
    G.i = 0;
    if (seg.mode === 'burst') return go('intro');
    const pool = shuffle(byTopic(G.topic));
    const first = pool.findIndex((m) => m.id !== G.lastId);
    pool.unshift(pool.splice(first, 1)[0]);
    seg.qs = pool.slice(0, MODES[seg.mode].count).map(makeQuestion);
    G.lastId = seg.qs[seg.qs.length - 1].target.id;
    G.q = seg.qs[0];
    go('game');
  }

  function advanceSegment() {
    stopTimers();
    G.seg++;
    if (G.seg >= G.plan.length) return finish();
    enterSegment();
  }

  /* ---------- SPEED BURST intro ---------- */
  function renderIntro() {
    app.innerHTML = `<section class="screen intro-screen">
      <div class="top">
        <button class="round-btn" data-act="topics" aria-label="Back">${ICON.back}</button>
        <img class="topics-logo" src="assets/Logo.svg" alt="Fluence">
        <button class="round-btn" data-act="home" aria-label="Close">${ICON.close}</button>
      </div>
      <div class="intro">
        <div class="copy">
          <p class="part">Part ${G.seg + 1} of 3</p>
          <h2 class="title">Speed Round!</h2>
          <p class="lead">${MODES.burst.seconds} seconds. Name as many movements as you can. Take it easy, there are no penalties.</p>
        </div>
        <div class="art" aria-hidden="true">
          <div class="glow"><img src="assets/intro/ellipse.svg" alt=""></div>
          <img class="sky" src="assets/intro/sky.png" alt="">
          <div class="bell"><img src="assets/intro/barbell.png" alt=""></div>
          <span class="grain"></span>
        </div>
      </div>
      <div class="fade"></div>
      <div class="cta"><button class="pill" data-act="startBurst">Let’s Go</button></div>
    </section>`;
  }

  function startBurst() {
    const seg = G.plan[G.seg];
    G.i = 0;
    seg.qs = [makeQuestion(freshTarget())];
    G.q = seg.qs[0];
    G.endAt = performance.now() + MODES.burst.seconds * 1000;
    go('game');
    timerId = setInterval(tick, 100);
    tick();
  }

  /* ---------- GAME: render ---------- */
  function segBars() {
    return G.plan.map((s, i) => `<div class="bar ${s.mode === 'burst' ? 'timer' : ''}"><i data-seg="${i}" style="width:${i < G.seg ? 100 : 0}%"></i></div>`).join('');
  }

  function renderGame() {
    const seg = G.plan[G.seg], mode = seg.mode, q = G.q;
    const optHtml = q.options.map((o) => {
      const body = mode === 'toImage'
        ? `<span class="check">${ICON.tick}</span>${illo(o)}`
        : `<span class="check">${ICON.tick}</span><span class="t">${o.name}</span>`;
      return `<button class="opt ${mode === 'toImage' ? 'img' : ''}" data-act="answer" data-id="${o.id}">${body}</button>`;
    }).join('');

    const question = mode === 'toImage'
      ? `<div class="q"><p class="cap">Find the movement</p><h2 class="q-title">${q.target.name}</h2></div>`
      : `<div class="q"><p class="cap">${mode === 'burst' ? 'Speed burst' : 'Name this movement'}</p><h2 class="q-title">What’s this called?</h2></div>
         <div class="stage">${illo(q.target)}</div>`;

    app.innerHTML = `<section class="screen" id="game" data-topic="${G.topic}">
      <header class="top">
        <button class="round-btn" data-act="topics" aria-label="Back">${ICON.back}</button>
        <img class="topics-logo" src="assets/Logo.svg" alt="Fluence">
        <button class="round-btn" data-act="home" aria-label="Close">${ICON.close}</button>
      </header>
      <div class="g-meta">
        <div class="segbars">${segBars()}</div>
        <div class="stats">
          <span class="part">Part ${G.seg + 1}/3</span>
          <span class="mid" id="mid"></span>
          <span class="score"><span class="cap">Score</span><span class="num" id="score">${G.score}</span></span>
        </div>
      </div>
      <div class="g-body">
        ${question}
        <div class="opts ${mode === 'toImage' ? 'imgs' : ''}" id="opts">${optHtml}</div>
      </div>
      <div class="feedback" id="fb"></div>
    </section>`;

    updateStreak();
    setProgress(G.i / (mode === 'burst' ? 1 : seg.qs.length));
    G.t0 = performance.now();
    G.locked = false;
  }

  function setProgress(frac) {
    const bar = $(`[data-seg="${G.seg}"]`);
    if (bar) bar.style.width = Math.min(1, Math.max(0, frac)) * 100 + '%';
  }

  function updateStreak() {
    const el = $('#mid');
    if (!el) return;
    const hot = G.streak >= STREAK_AT ? ' hot' : '';
    if (G.plan[G.seg].mode === 'burst') {
      const left = Math.max(0, Math.ceil((G.endAt - performance.now()) / 1000));
      el.innerHTML = `<span class="chip${hot}"><span id="clock">${left}</span></span>`;
    } else {
      el.innerHTML = G.streak >= 1 ? `<span class="chip${hot}">Streak!</span>` : '';
    }
  }

  function tick() {
    if (G.plan[G.seg].mode !== 'burst') return;
    const total = MODES.burst.seconds * 1000;
    const left = Math.max(0, G.endAt - performance.now());
    const clock = $('#clock');
    setProgress(1 - left / total);
    if (clock) clock.textContent = Math.ceil(left / 1000);
    if (left <= 0) advanceSegment();
  }

  /* ---------- GAME: answer ---------- */
  function answer(id, btn) {
    if (G.locked) return;
    G.locked = true;
    const seg = G.plan[G.seg], q = G.q, ok = id === q.target.id;
    const ms = performance.now() - G.t0;
    G.answered++;
    let gained = 0, note = '';

    if (ok) {
      const fast = ms < SPEED_MS;
      const mult = G.streak >= STREAK_AT ? 2 : 1;
      gained = (10 + (fast ? 5 : 0)) * mult;
      G.score += gained; G.correct++; G.streak++;
      G.bestStreak = Math.max(G.bestStreak, G.streak);
      note = [fast ? 'Speed bonus +5' : '', mult > 1 ? '×2 streak' : ''].filter(Boolean).join(' · ');
    } else {
      G.streak = 0;
      if (!G.missed.includes(q.target)) G.missed.push(q.target);
    }

    document.querySelectorAll('#opts .opt').forEach((b) => {
      b.classList.add('done');
      if (b.dataset.id === q.target.id) b.classList.add('correct');
      else if (b === btn) b.classList.add('wrong');
      else b.classList.add('dim');
    });
    $('#score').textContent = G.score;
    updateStreak();

    const msg = ok
      ? `<div class="msg ok"><div class="row"><span class="ttl">${pick(GOOD)}</span><b>+${gained}</b></div>${note ? `<small>${note}</small>` : ''}</div>`
      : `<div class="msg"><div class="row"><span class="ttl">${pick(OOPS)}</span></div><small>You are wrong</small></div>`;
    const fb = $('#fb');

    if (seg.mode === 'burst') {
      fb.innerHTML = msg;
      advanceId = setTimeout(nextBurstQuestion, ok ? 650 : 1100);
    } else {
      const lastInSeg = G.i >= seg.qs.length - 1;
      const lastSeg = G.seg >= G.plan.length - 1;
      fb.innerHTML = `${msg}<button class="pill" data-act="next">${lastInSeg && lastSeg ? 'See my result' : 'Next'}</button>`;
      $('[data-act=next]').focus({ preventScroll: true });
      setProgress((G.i + 1) / seg.qs.length);
    }
  }

  function nextBurstQuestion() {
    if (!G || ui.screen !== 'game' || G.plan[G.seg].mode !== 'burst') return;
    if (G.endAt - performance.now() <= 0) return advanceSegment();
    G.q = makeQuestion(freshTarget());
    G.i++;
    renderGame();
  }

  function nextQuestion() {
    const seg = G.plan[G.seg];
    if (G.i >= seg.qs.length - 1) return advanceSegment();
    G.i++;
    G.q = seg.qs[G.i];
    renderGame();
  }

  /* ---------- END ---------- */
  function finish() {
    stopTimers();
    if (!G || G.done) return;
    G.done = true;
    G.prev = store.get('last:' + G.topic, null);
    const best = store.get('best:' + G.topic, 0);
    G.newBest = G.score > best;
    if (G.newBest) store.set('best:' + G.topic, G.score);
    store.set('last:' + G.topic, G.score);
    go('end');
  }

  function renderEnd() {
    const rank = rankFor(G.score);
    const t = TOPICS[G.topic];
    let delta = '';
    if (G.prev != null) {
      const d = G.score - G.prev;
      delta = `<span class="chip delta">${d > 0 ? `Up ${d} from last time` : d < 0 ? `${Math.abs(d)} off last time` : 'Same as last time'}</span>`;
    } else {
      delta = `<span class="chip delta">First score on the board</span>`;
    }
    const missed = G.missed.length
      ? `<h3 class="h-md missed-title">Movements you missed</h3>
         <div class="missed">${G.missed.map((m) => `<div class="card mcard"><div class="mart">${illo(m)}</div><span>${m.name}</span></div>`).join('')}</div>`
      : `<div class="card nice"><div class="h-md">Nothing missed.</div><p class="small">Not one. Try the other topic.</p></div>`;

    app.innerHTML = `<section class="screen end">
      <div class="top">
        <span class="top-gap"></span>
        <img class="topics-logo" src="assets/Logo.svg" alt="Fluence">
        <button class="round-btn" data-act="home" aria-label="Close">${ICON.close}</button>
      </div>
      <div class="end-body">
        <div class="end-head">
          <p class="rank-eyebrow">${t.title}</p>
          <h1 class="rank">${rank.title}</h1>
        </div>
        <div class="scorebox"><div class="big">${G.score}</div><div class="pts">points</div>${delta}</div>
        <p class="end-line">${rank.line}</p>
        <div class="facts">
          <div class="fact"><b>${G.correct} / ${G.answered}</b><span>correct</span></div>
          <div class="fact"><b>${G.bestStreak}</b><span>best streak</span></div>
          <div class="fact"><b>${store.get('best:' + G.topic, G.score)}</b><span>your best</span></div>
        </div>
        ${missed}
      </div>
      <div class="stack end-actions">
        <button class="pill" data-act="replay">Play again</button>
        <button class="pill ghost" data-act="topics">Switch topic</button>
      </div>
    </section>`;
  }

  /* ---------- events ---------- */
  app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]');
    if (!el) return;
    switch (el.dataset.act) {
      case 'home': case 'topics': go(el.dataset.act); break;
      case 'pickTopic': startGame(el.dataset.topic); break;
      case 'startBurst': startBurst(); break;
      case 'replay': startGame(G.topic); break;
      case 'answer': el.classList.add('sel'); answer(el.dataset.id, el); break;
      case 'next': nextQuestion(); break;
    }
  });

  /* dev contact sheet of all placeholder illustrations: index.html#sheet */
  if (location.hash === '#sheet') {
    app.innerHTML = '<div class="sheet">' + MOVEMENTS.map((m) => `<figure>${illo(m)}${m.name}</figure>`).join('') + '</div>';
    return;
  }

  if (location.hash === '#topics') return go('topics');
  /* dev preview of the end screen with Figma sample numbers: index.html#end */
  if (location.hash === '#end') {
    G = { topic: 'pilates', score: 250, correct: 9, answered: 12, bestStreak: 5, missed: [], prev: null, done: true };
    store.set('best:pilates', 190);
    return go('end');
  }
  renderHome();
})();
