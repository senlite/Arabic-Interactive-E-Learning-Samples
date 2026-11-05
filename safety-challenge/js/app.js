(function () {
  var E = window.SafetyEngine;
  var C = window.CONTENT;
  var main = document.getElementById('main');
  var polite = document.getElementById('polite');
  var assertive = document.getElementById('assertive');
  var KEY = 'safety-challenge:attempt';
  var debug = /(?:^|[?&])debug=1(?:&|$)/.test(location.search);
  var clock = null;
  var warned = false;
  var interactionIndex = 0;
  if (debug) document.body.classList.add('debug');

  function fresh(best) {
    return {
      screen: 'start',
      index: 0,
      base: 0,
      bonus: 0,
      lives: 3,
      timerOn: true,
      correctCount: 0,
      outcomes: [],
      startedAt: Date.now(),
      bestPercent: best == null ? null : best,
      pending: null,
      reported: false,
      finishedMessage: ''
    };
  }

  function load() {
    try {
      var raw = sessionStorage.getItem(KEY);
      if (!raw) return fresh(null);
      var data = JSON.parse(raw);
      if (!data || typeof data.base !== 'number') return fresh(null);
      return data;
    } catch (err) {
      return fresh(null);
    }
  }

  var attempt = load();

  function save() {
    sessionStorage.setItem(KEY, JSON.stringify(attempt));
  }

  function bidi(text) {
    return String(text)
      .replace(/CO₂/g, '<bdi>CO₂</bdi>')
      .replace(/RACE/g, '<bdi>RACE</bdi>')
      .replace(/Near Miss/g, '<bdi>Near Miss</bdi>')
      .replace(/ISO 7010/g, '<bdi>ISO 7010</bdi>');
  }

  function fill(template, map) {
    return template.replace(/\{(\w+)\}/g, function (_, key) {
      return map[key] == null ? '' : String(map[key]);
    });
  }

  function clearClock() {
    if (clock) clearInterval(clock);
    clock = null;
  }

  function question() {
    return C.questions[attempt.index];
  }

  function correctAnswerText(q) {
    if (q.type === 'order') return q.steps.join(' — ');
    if (q.type === 'hotspot') return q.explain;
    var hit = q.options.filter(function (o) { return o.correct; })[0];
    return hit ? hit.text : '';
  }

  function beginQuestion() {
    var q = question();
    warned = false;
    attempt.pending = { started: Date.now(), note: '' };
    if (q.type === 'mcq') attempt.pending.options = E.shuffleOptions(q.options, Math.random);
    if (q.type === 'truefalse') attempt.pending.options = q.options.slice();
    if (q.type === 'order') attempt.pending.order = E.shuffleSteps(q.steps, Math.random);
    if (q.type === 'hotspot') {
      attempt.pending.found = [];
      attempt.pending.wrongTaps = 0;
    }
    attempt.screen = 'question';
    save();
    render(true);
    if (attempt.timerOn) startClock(q.seconds);
  }

  function startClock(seconds) {
    clearClock();
    attempt.pending.remaining = seconds;
    clock = setInterval(function () {
      attempt.pending.remaining -= 1;
      var label = document.getElementById('clock');
      if (label) label.textContent = formatClock(attempt.pending.remaining);
      if (attempt.pending.remaining === 10 && !warned) {
        warned = true;
        polite.textContent = '10';
      }
      if (attempt.pending.remaining <= 0) {
        clearClock();
        finishQuestion(true);
      }
    }, 1000);
  }

  function formatClock(seconds) {
    var s = Math.max(0, seconds);
    var m = Math.floor(s / 60);
    var r = s % 60;
    return UI.formatNumber(m) + ':' + (r < 10 ? '0' : '') + UI.formatNumber(r);
  }

  function remainingRatio(q) {
    if (!attempt.timerOn) return 0;
    var left = attempt.pending.remaining == null ? 0 : attempt.pending.remaining;
    return left / q.seconds;
  }

  function applyScore(q, scored, timedOut) {
    var bonus = E.timeBonus({
      correct: scored.correct,
      timerOn: attempt.timerOn,
      remainingRatio: remainingRatio(q)
    });
    attempt.base += scored.base;
    attempt.bonus += bonus;
    if (scored.correct) attempt.correctCount += 1;
    if (scored.lifeLost) attempt.lives -= 1;
    attempt.outcomes.push({
      id: q.id,
      short: q.short,
      base: scored.base,
      bonus: bonus,
      correct: scored.correct,
      lifeLost: scored.lifeLost
    });
    var points = scored.base + bonus;
    var line;
    if (timedOut) line = C.feedback.timeout;
    else if (scored.correct) line = fill(C.feedback.correct, { points: UI.formatNumber(points) });
    else if (scored.base > 0) line = fill(C.feedback.partial, { points: UI.formatNumber(points) });
    else line = fill(C.feedback.wrong, { answer: correctAnswerText(q) });
    attempt.pending.line = line;
    attempt.pending.explain = q.explain;
    attempt.pending.lifeLine = scored.lifeLost
      ? fill(C.feedback.lifeLost, { lives: UI.formatNumber(attempt.lives) })
      : '';
    recordInteraction(q, scored);
    attempt.screen = 'feedback';
    save();
    polite.textContent = line + ' ' + attempt.pending.lifeLine;
    if (timedOut) assertive.textContent = C.feedback.timeout;
    render(true);
  }

  function finishQuestion(timedOut) {
    clearClock();
    var q = question();
    var scored;
    if (q.type === 'hotspot') {
      scored = E.scoreHotspot({
        foundCount: attempt.pending.found.length,
        wrongTaps: attempt.pending.wrongTaps,
        allFound: !timedOut,
        timedOut: timedOut
      });
    } else if (q.type === 'order') {
      scored = timedOut
        ? { base: 0, correct: false, lifeLost: true }
        : E.scoreOrder(attempt.pending.order, q.steps);
    } else {
      scored = timedOut
        ? { base: 0, correct: false, lifeLost: true }
        : E.scoreChoice(!!attempt.pending.pickedCorrect);
    }
    applyScore(q, scored, timedOut);
  }

  function recordInteraction(q, scored) {
    var type = { hotspot: 'performance', mcq: 'choice', truefalse: 'true-false', order: 'sequencing' }[q.type];
    var response = q.id;
    if (q.type === 'hotspot') response = attempt.pending.found.join(',');
    if (q.type === 'order') response = attempt.pending.order.join('|');
    if (attempt.pending.pickedId) response = attempt.pending.pickedId;
    var latency = '0000:00:' + String(Math.max(0, Math.round((Date.now() - attempt.pending.started) / 1000))).padStart(2, '0');
    var n = interactionIndex;
    interactionIndex += 1;
    try {
      SCORM.set('cmi.interactions.' + n + '.id', q.id);
      SCORM.set('cmi.interactions.' + n + '.type', type);
      SCORM.set('cmi.interactions.' + n + '.student_response', response);
      SCORM.set('cmi.interactions.' + n + '.result', scored.correct ? 'correct' : 'wrong');
      SCORM.set('cmi.interactions.' + n + '.latency', latency);
    } catch (err) {
      /* some LMSs reject interactions */
    }
  }

  function afterFeedback() {
    assertive.textContent = '';
    if (attempt.lives <= 0) {
      attempt.screen = 'gameover';
      report();
    } else if (attempt.index >= C.questions.length - 1) {
      attempt.screen = 'results';
      report();
    } else {
      attempt.index += 1;
      beginQuestion();
      return;
    }
    save();
    render(true);
  }

  function report() {
    if (attempt.reported) return;
    var percent = E.scormPercent(attempt.base);
    var stored = E.keepBest(attempt.bestPercent, percent);
    attempt.bestPercent = stored;
    SCORM.score(stored);
    SCORM.status(E.lessonStatus(stored));
    SCORM.commit();
    attempt.reported = true;
    save();
  }

  function elapsed() {
    var s = Math.max(0, Math.round((Date.now() - attempt.startedAt) / 1000));
    return {
      mm: String(Math.floor(s / 60)).padStart(2, '0'),
      ss: String(s % 60).padStart(2, '0')
    };
  }

  function medal(kind, name) {
    var fill = kind === 'gold' ? '#D4A017' : kind === 'silver' ? '#9CA3AF' : '#B45309';
    return '<svg class="medal" viewBox="0 0 96 96" role="img" aria-label="' + name + '"><circle cx="48" cy="40" r="28" fill="' + fill + '"/><path d="M36 64 L48 84 L60 64" fill="' + fill + '"/></svg>';
  }

  function render(moveFocus) {
    clearNode(main);
    var wrap = el('div', 'game');
    if (attempt.screen !== 'start') wrap.appendChild(hud());
    if (attempt.screen === 'start') wrap.appendChild(startScreen());
    if (attempt.screen === 'question') wrap.appendChild(questionScreen());
    if (attempt.screen === 'feedback') wrap.appendChild(feedbackScreen());
    if (attempt.screen === 'results') wrap.appendChild(endScreen(true));
    if (attempt.screen === 'gameover') wrap.appendChild(endScreen(false));
    var foot = el('p', '');
    foot.textContent = C.disclaimer;
    wrap.appendChild(foot);
    var brand = el('p', '');
    brand.textContent = 'نموذج تجريبي من إعداد Twin Particles';
    wrap.appendChild(brand);
    main.appendChild(wrap);
    if (moveFocus) {
      var heading = main.querySelector('h1');
      if (heading) {
        heading.tabIndex = -1;
        heading.focus();
      }
    }
  }

  function hud() {
    var bar = el('div', 'hud');
    var points = el('span', '');
    points.textContent = UI.points + ': ' + UI.formatNumber(attempt.base + attempt.bonus);
    var qn = el('span', '');
    qn.textContent = fill(UI.question_of, {
      n: UI.formatNumber(Math.min(attempt.index + 1, 10)),
      total: UI.formatNumber(10)
    });
    var lives = el('span', '');
    lives.textContent = '❤'.repeat(Math.max(0, attempt.lives));
    lives.setAttribute('aria-label', UI.lives + ' ' + UI.formatNumber(attempt.lives));
    bar.appendChild(points);
    bar.appendChild(qn);
    bar.appendChild(lives);
    if (attempt.timerOn && attempt.screen === 'question') {
      var time = el('span', '');
      time.id = 'clock';
      var q = question();
      var left = attempt.pending && attempt.pending.remaining != null ? attempt.pending.remaining : q.seconds;
      time.textContent = formatClock(left);
      bar.appendChild(time);
    }
    var progress = el('div', 'progress');
    var fillBar = el('span', '');
    var done = attempt.outcomes.length;
    fillBar.style.inlineSize = (done / 10 * 100) + '%';
    progress.appendChild(fillBar);
    bar.appendChild(progress);
    return bar;
  }

  function startScreen() {
    var box = el('section', '');
    var h = el('h1', '');
    h.textContent = C.title;
    var p = el('p', '');
    p.textContent = C.description;
    box.appendChild(h);
    box.appendChild(p);
    var list = el('ul', 'rules');
    C.rules.forEach(function (rule) {
      var li = el('li', '');
      li.textContent = rule;
      list.appendChild(li);
    });
    box.appendChild(list);
    var details = document.createElement('details');
    var summary = document.createElement('summary');
    summary.textContent = C.objectivesToggle;
    details.appendChild(summary);
    var lead = el('p', '');
    lead.textContent = C.objectivesLead;
    details.appendChild(lead);
    var objs = el('ul', '');
    C.objectives.forEach(function (item) {
      var li = el('li', '');
      li.textContent = item;
      objs.appendChild(li);
    });
    details.appendChild(objs);
    box.appendChild(details);
    var label = el('label', '');
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = attempt.timerOn;
    input.addEventListener('change', function () { attempt.timerOn = input.checked; save(); });
    label.appendChild(input);
    label.appendChild(document.createTextNode(' ' + C.timerLabel));
    box.appendChild(label);
    var hint = el('p', '');
    hint.textContent = C.timerHint;
    box.appendChild(hint);
    box.appendChild(button(C.startButton, 'primary', function () {
      attempt.startedAt = Date.now();
      attempt.outcomes = [];
      attempt.base = 0;
      attempt.bonus = 0;
      attempt.lives = 3;
      attempt.correctCount = 0;
      attempt.index = 0;
      attempt.reported = false;
      beginQuestion();
    }));
    return box;
  }

  function questionScreen() {
    var q = question();
    var box = el('section', '');
    var h = el('h1', '');
    h.innerHTML = bidi(q.prompt);
    box.appendChild(h);
    if (q.type === 'mcq' || q.type === 'truefalse') {
      if (q.image) {
        var img = document.createElement('img');
        img.className = 'sign';
        img.src = q.image;
        img.alt = q.imageAlt;
        box.appendChild(img);
      }
      attempt.pending.options.forEach(function (option) {
        box.appendChild(button(option.text, 'choice', function (btn) {
          if (attempt.pending.locked) return;
          attempt.pending.locked = true;
          attempt.pending.pickedCorrect = !!option.correct;
          attempt.pending.pickedId = option.id;
          btn.disabled = true;
          finishQuestion(false);
        }));
      });
    }
    if (q.type === 'order') box.appendChild(orderList());
    if (q.type === 'hotspot') box.appendChild(hotspot(q));
    return box;
  }

  function orderList() {
    var list = el('div', '');
    attempt.pending.order.forEach(function (step, index) {
      var card = el('div', 'order-card');
      var handle = button('⋮⋮', 'handle', function () {});
      handle.setAttribute('aria-label', 'مقبض');
      handle.addEventListener('pointerdown', function (event) {
        dragStart(event, index, list);
      });
      var text = el('span', '');
      text.innerHTML = bidi(step);
      var up = button('▲', 'tiny', function () { moveStep(index, -1); });
      var down = button('▼', 'tiny', function () { moveStep(index, 1); });
      card.appendChild(handle);
      card.appendChild(text);
      card.appendChild(up);
      card.appendChild(down);
      list.appendChild(card);
    });
    list.appendChild(button(C.checkOrder, 'primary', function () { finishQuestion(false); }));
    return list;
  }

  function moveStep(index, delta) {
    var next = index + delta;
    var order = attempt.pending.order;
    if (next < 0 || next >= order.length) return;
    var tmp = order[index];
    order[index] = order[next];
    order[next] = tmp;
    save();
    render(false);
  }

  function dragStart(event, index, list) {
    var handle = event.currentTarget;
    handle.setPointerCapture(event.pointerId);
    var origin = index;
    var startY = event.clientY;
    function onMove(ev) {
      var shift = Math.round((ev.clientY - startY) / 64);
      var target = Math.max(0, Math.min(attempt.pending.order.length - 1, origin + shift));
      if (target === index) return;
      var order = attempt.pending.order;
      var item = order.splice(index, 1)[0];
      order.splice(target, 0, item);
      index = target;
      startY = ev.clientY;
      origin = target;
      save();
      render(false);
      list = main.querySelector('.game');
    }
    function onUp() {
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onUp);
    }
    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onUp);
  }

  function hotspot(q) {
    var box = el('div', 'scene');
    var art = document.createElement('img');
    art.src = 'img/warehouse.svg';
    art.alt = '';
    box.appendChild(art);
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', q.imageAlt);
    var counter = el('p', '');
    counter.textContent = fill(C.foundCount, { n: UI.formatNumber(attempt.pending.found.length) });
    var note = el('p', '');
    note.textContent = attempt.pending.note || '';
    q.zones.forEach(function (zone) {
      var btn = button(zone.label, 'zone', function (buttonEl, event) {
        var rect = box.getBoundingClientRect();
        if (debug) {
          var x = Math.round((event.clientX - rect.left) / rect.width * 100);
          var y = Math.round((event.clientY - rect.top) / rect.height * 100);
          console.info('[hotspot]', x + '%', y + '%');
        }
        if (attempt.pending.found.indexOf(zone.id) !== -1) return;
        if (zone.hazard) {
          attempt.pending.found.push(zone.id);
          attempt.pending.note = zone.text;
          if (attempt.pending.found.length === 3) finishQuestion(false);
          else {
            save();
            render(false);
          }
        } else {
          attempt.pending.wrongTaps += 1;
          attempt.pending.note = zone.text;
          save();
          render(false);
        }
      });
      btn.style.top = zone.top + '%';
      btn.style.insetInlineStart = zone.left + '%';
      btn.style.width = zone.width + '%';
      btn.style.height = zone.height + '%';
      box.appendChild(btn);
      var foundAt = attempt.pending.found.indexOf(zone.id);
      if (foundAt !== -1) {
        var marker = el('span', 'marker');
        marker.textContent = UI.formatNumber(foundAt + 1);
        marker.setAttribute('aria-hidden', 'true');
        marker.style.top = zone.top + '%';
        marker.style.insetInlineStart = zone.left + '%';
        box.appendChild(marker);
      }
    });
    box.addEventListener('click', function (event) {
      if (event.target.closest && event.target.closest('button')) return;
      var rect = box.getBoundingClientRect();
      if (debug) {
        console.info('[hotspot]', Math.round((event.clientX - rect.left) / rect.width * 100) + '%', Math.round((event.clientY - rect.top) / rect.height * 100) + '%');
      }
      attempt.pending.wrongTaps += 1;
      attempt.pending.note = C.emptyTap;
      save();
      render(false);
    });
    var holder = el('div', '');
    holder.appendChild(counter);
    holder.appendChild(box);
    holder.appendChild(note);
    return holder;
  }

  function feedbackScreen() {
    var box = el('section', '');
    var h = el('h1', '');
    h.textContent = attempt.pending.line;
    var panel = el('div', 'feedback');
    var line = el('p', '');
    line.textContent = attempt.pending.line;
    var explain = el('p', '');
    explain.innerHTML = bidi(attempt.pending.explain);
    panel.appendChild(line);
    panel.appendChild(explain);
    if (attempt.pending.lifeLine) {
      var life = el('p', '');
      life.textContent = attempt.pending.lifeLine;
      panel.appendChild(life);
    }
    box.appendChild(h);
    box.appendChild(panel);
    var label = attempt.index >= C.questions.length - 1 || attempt.lives <= 0 ? C.showResult : C.next;
    box.appendChild(button(label, 'primary', afterFeedback));
    return box;
  }

  function endScreen(results) {
    var box = el('section', '');
    var h = el('h1', '');
    h.textContent = results ? C.resultsTitle : 'انتهت المحاولات';
    box.appendChild(h);
    if (results) {
      var kind = E.badge(attempt.base, true);
      var badge = C.badges[kind];
      box.insertAdjacentHTML('beforeend', medal(kind, badge.name));
      var name = el('p', '');
      name.textContent = badge.name;
      var message = el('p', '');
      message.textContent = badge.message;
      box.appendChild(name);
      box.appendChild(message);
    } else {
      var over = el('p', '');
      over.textContent = C.gameOver;
      box.appendChild(over);
    }
    var time = elapsed();
    var stats = el('p', '');
    stats.textContent = fill(C.stats, {
      total: UI.formatNumber(attempt.base + attempt.bonus),
      percent: UI.formatNumber(E.scormPercent(attempt.base)),
      correct: UI.formatNumber(attempt.correctCount),
      mm: time.mm,
      ss: time.ss
    });
    box.appendChild(stats);
    var review = el('ul', '');
    attempt.outcomes.forEach(function (item) {
      var li = el('li', '');
      li.textContent = (item.correct ? '✔ ' : '✖ ') + item.short;
      review.appendChild(li);
    });
    box.appendChild(review);
    if (attempt.finishedMessage) {
      var done = el('p', '');
      done.textContent = attempt.finishedMessage;
      box.appendChild(done);
    }
    box.appendChild(button(C.retry, 'primary', function () {
      var best = attempt.bestPercent;
      clearClock();
      attempt = fresh(best);
      save();
      render(true);
    }));
    box.appendChild(button(C.finish, 'primary', function () {
      SCORM.finish();
      attempt.finishedMessage = SCORM.isLMS() ? UI.saved : UI.saved_standalone;
      save();
      polite.textContent = attempt.finishedMessage;
      render(false);
    }));
    return box;
  }

  function button(text, className, onClick) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = className;
    btn.innerHTML = bidi(text);
    btn.addEventListener('click', function (event) { onClick(btn, event); });
    return btn;
  }

  function el(tag, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  function clearNode(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  render(true);
})();
