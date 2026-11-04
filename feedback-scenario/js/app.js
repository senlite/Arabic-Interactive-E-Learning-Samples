(function () {
  var KEY = 'feedback-scenario:attempt';
  var CONTENT = window.CONTENT;
  var Engine = window.FeedbackEngine;
  var root = document.getElementById('main');
  var attempt = load();

  function blank(best) {
    return {
      screen: 'start',
      nodeId: null,
      pendingChoiceId: null,
      path: [],
      score: 0,
      bestPercent: best === undefined ? null : best,
      startedAt: Date.now(),
      order: null,
      orderNode: null,
      reported: false,
      finishedMessage: ''
    };
  }

  function load() {
    try {
      var raw = sessionStorage.getItem(KEY);
      if (!raw) return blank();
      var data = JSON.parse(raw);
      if (!data || typeof data.screen !== 'string' || !Array.isArray(data.path)) return blank();
      return data;
    } catch (err) {
      return blank();
    }
  }

  function save() {
    sessionStorage.setItem(KEY, JSON.stringify(attempt));
  }

  function choiceById(node, id) {
    for (var i = 0; i < node.choices.length; i += 1) {
      if (node.choices[i].id === id) return node.choices[i];
    }
    return null;
  }

  function fillRatio() {
    if (attempt.screen === 'ending' || attempt.screen === 'debrief') return 1;
    return attempt.path.length / 3;
  }

  function pointsLine(points) {
    if (points === 10) return '+' + UI.formatNumber(10) + ' نقاط';
    if (points === 5) return '+' + UI.formatNumber(5) + ' نقاط';
    return UI.formatNumber(0) + ' نقاط';
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function portrait() {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 48 48');
    svg.setAttribute('width', '48');
    svg.setAttribute('height', '48');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '24');
    circle.setAttribute('cy', '18');
    circle.setAttribute('r', '10');
    circle.setAttribute('fill', '#0F766E');
    var body = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    body.setAttribute('cx', '24');
    body.setAttribute('cy', '46');
    body.setAttribute('r', '16');
    body.setAttribute('fill', '#0F766E');
    svg.appendChild(circle);
    svg.appendChild(body);
    return svg;
  }

  function button(label, className, onClick) {
    var btn = el('button', className, label);
    btn.type = 'button';
    btn.addEventListener('click', function () {
      try {
        onClick();
      } catch (err) {
        root.dataset.error = String(err && err.stack || err);
      }
    });
    return btn;
  }

  function header() {
    var head = el('header', 'shell-header');
    head.appendChild(el('p', 'sample-title', CONTENT.meta.title));
    if (attempt.screen === 'decision') {
      var n = attempt.path.length + 1;
      var line = UI.decision_of
        .replace('{n}', UI.formatNumber(n))
        .replace('{total}', UI.formatNumber(3));
      head.appendChild(el('p', 'decision-line', line));
    }
    var bar = el('div', 'progress');
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuemin', '0');
    bar.setAttribute('aria-valuemax', '3');
    bar.setAttribute('aria-valuenow', String(Math.round(fillRatio() * 3)));
    var fill = el('span', 'progress-fill');
    fill.style.inlineSize = (fillRatio() * 100) + '%';
    bar.appendChild(fill);
    head.appendChild(bar);
    return head;
  }

  function focusHeading() {
    var heading = document.getElementById('screen-heading');
    if (heading) heading.focus();
  }

  function go(next) {
    attempt = next;
    if (attempt.screen === 'debrief') reportScore();
    save();
    render();
  }

  function reportScore() {
    var pct = Engine.percent(attempt.score);
    attempt.bestPercent = Engine.keepBest(attempt.bestPercent, pct);
    if (attempt.reported) return;
    SCORM.score(attempt.bestPercent);
    SCORM.status('completed');
    SCORM.commit();
    attempt.reported = true;
  }

  function render() {
    root.textContent = '';
    root.appendChild(header());
    var body = el('div', 'screen');
    if (attempt.screen === 'start') renderStart(body);
    else if (attempt.screen === 'objectives') renderObjectives(body);
    else if (attempt.screen === 'context') renderContext(body);
    else if (attempt.screen === 'decision') renderDecision(body);
    else if (attempt.screen === 'feedback') renderFeedback(body);
    else if (attempt.screen === 'ending') renderEnding(body);
    else renderDebrief(body);
    root.appendChild(body);
    root.appendChild(el('p', 'brand', 'نموذج تجريبي من إعداد Twin Particles'));
    focusHeading();
  }

  function renderStart(live) {
    var h = el('h1', null, CONTENT.meta.title);
    h.id = 'screen-heading';
    h.tabIndex = -1;
    live.appendChild(h);
    live.appendChild(el('p', null, CONTENT.meta.description));
    live.appendChild(el('p', null, CONTENT.meta.duration));
    live.appendChild(button(UI.start, 'nav', function () {
      go(Object.assign({}, attempt, { screen: 'objectives' }));
    }));
  }

  function renderObjectives(live) {
    var h = el('h1', null, CONTENT.objectives.heading);
    h.id = 'screen-heading';
    h.tabIndex = -1;
    live.appendChild(h);
    live.appendChild(el('p', null, CONTENT.objectives.lead));
    var list = el('ul');
    CONTENT.objectives.items.forEach(function (item) {
      list.appendChild(el('li', null, item));
    });
    live.appendChild(list);
    live.appendChild(button(UI.next, 'nav', function () {
      go(Object.assign({}, attempt, { screen: 'context' }));
    }));
  }

  function renderContext(live) {
    var h = el('h1', null, CONTENT.context.heading);
    h.id = 'screen-heading';
    h.tabIndex = -1;
    live.appendChild(h);
    var who = el('div', 'who');
    who.appendChild(portrait());
    who.appendChild(el('p', null, CONTENT.context.speaker + ' (' + CONTENT.context.role + ')'));
    live.appendChild(who);
    var bubble = el('blockquote', 'bubble');
    bubble.appendChild(document.createTextNode(CONTENT.context.message));
    live.appendChild(bubble);
    live.appendChild(el('p', 'scene', CONTENT.context.background));
    live.appendChild(button(UI.next, 'nav', function () {
      go(Object.assign({}, attempt, { screen: 'decision', nodeId: 'D1', order: null, orderNode: null }));
    }));
  }

  function orderedChoices(node) {
    if (attempt.orderNode !== node.id || !attempt.order) {
      attempt.order = Engine.shuffle(node.choices, Math.random).map(function (choice) { return choice.id; });
      attempt.orderNode = node.id;
      save();
    }
    return attempt.order.map(function (id) { return choiceById(node, id); });
  }

  function renderDecision(live) {
    var node = CONTENT.nodes[attempt.nodeId];
    var h = el('h1', null, node.title);
    h.id = 'screen-heading';
    h.tabIndex = -1;
    live.appendChild(h);
    var scene = el('div', 'scene');
    var who = el('div', 'who');
    who.appendChild(portrait());
    who.appendChild(el('p', null, 'أحمد'));
    scene.appendChild(who);
    scene.appendChild(el('p', 'bubble', node.scene));
    live.appendChild(scene);
    var list = el('div', 'choices');
    orderedChoices(node).forEach(function (choice) {
      list.appendChild(button(choice.text, 'choice', function () {
        go(Engine.applyChoice(attempt, node, choice.id));
      }));
    });
    live.appendChild(list);
  }

  function polite() {
    var region = el('div', 'live');
    region.setAttribute('aria-live', 'polite');
    return region;
  }

  function renderFeedback(live) {
    var node = CONTENT.nodes[attempt.nodeId];
    var choice = choiceById(node, attempt.pendingChoiceId);
    var h = el('h1', null, CONTENT.ratings[choice.rating]);
    h.id = 'screen-heading';
    h.tabIndex = -1;
    var badge = el('p', 'badge badge-' + choice.rating);
    var icon = choice.rating === 'good' ? '✔' : choice.rating === 'partial' ? '◐' : '✖';
    badge.appendChild(el('span', null, icon));
    badge.appendChild(el('span', null, CONTENT.ratings[choice.rating]));
    var announced = polite();
    announced.appendChild(badge);
    announced.appendChild(el('p', null, choice.feedback));
    announced.appendChild(el('p', null, choice.consequence));
    announced.appendChild(el('p', null, pointsLine(choice.points)));
    live.appendChild(h);
    live.appendChild(announced);
    live.appendChild(button(UI.continue, 'nav', function () {
      go(Engine.confirmChoice(attempt, CONTENT));
    }));
  }

  function renderEnding(live) {
    var id = Engine.endingFor(attempt.score);
    var ending = CONTENT.endings[id];
    var h = el('h1', null, ending.title);
    h.id = 'screen-heading';
    h.tabIndex = -1;
    live.appendChild(h);
    live.appendChild(portrait());
    live.appendChild(el('p', null, ending.narrative));
    live.appendChild(button('عرض التقييم', 'nav', function () {
      go(Object.assign({}, attempt, { screen: 'debrief' }));
    }));
  }

  function withSbi(text) {
    var parts = text.split('SBI');
    var frag = document.createDocumentFragment();
    parts.forEach(function (part, index) {
      frag.appendChild(document.createTextNode(part));
      if (index < parts.length - 1) {
        var bdi = el('bdi');
        bdi.setAttribute('dir', 'ltr');
        bdi.textContent = 'SBI';
        frag.appendChild(bdi);
      }
    });
    return frag;
  }

  function renderDebrief(live) {
    var ending = CONTENT.endings[Engine.endingFor(attempt.score)];
    var pct = Engine.percent(attempt.score);
    var h = el('h1', null, CONTENT.debrief.heading);
    h.id = 'screen-heading';
    h.tabIndex = -1;
    var announced = polite();
    announced.appendChild(el('p', null, 'نتيجتك: ' + UI.formatNumber(attempt.score) + ' من 30 (' + UI.formatNumber(pct) + '%)'));
    if (attempt.finishedMessage) announced.appendChild(el('p', null, attempt.finishedMessage));
    live.appendChild(h);
    live.appendChild(announced);
    live.appendChild(el('p', null, 'النهاية التي وصلت إليها: ' + ending.title));
    live.appendChild(el('h2', null, 'قراراتك'));
    var list = el('ol', 'path');
    attempt.path.forEach(function (step, index) {
      var node = CONTENT.nodes[step.node];
      var choice = choiceById(node, step.choice);
      list.appendChild(el('li', null, 'القرار ' + UI.formatNumber(index + 1) + ': ' + choice.short + ' — ' + UI.formatNumber(step.points) + ' نقاط'));
    });
    live.appendChild(list);
    live.appendChild(el('h2', null, CONTENT.debrief.tipsHeading));
    var tips = el('ol');
    CONTENT.debrief.tips.forEach(function (tip) {
      var item = el('li');
      item.appendChild(withSbi(tip));
      tips.appendChild(item);
    });
    live.appendChild(tips);
    live.appendChild(button(UI.retry, 'nav', function () {
      var best = attempt.bestPercent;
      attempt = blank(best);
      save();
      render();
    }));
    live.appendChild(button(UI.finish, 'nav', function () {
      SCORM.finish();
      attempt.finishedMessage = SCORM.isLMS() ? UI.saved : UI.saved_standalone;
      save();
      render();
    }));
    live.appendChild(el('p', 'disclaimer', CONTENT.debrief.disclaimer));
  }

  render();
})();
