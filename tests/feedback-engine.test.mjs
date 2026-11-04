import assert from 'node:assert/strict';
import test from 'node:test';
import { loadScript } from './load-script.mjs';

function load() {
  const w = { window: null, console };
  w.window = w;
  loadScript(new URL('../feedback-scenario/content.js', import.meta.url), w);
  loadScript(new URL('../feedback-scenario/js/engine.js', import.meta.url), w);
  return { CONTENT: w.CONTENT, Engine: w.FeedbackEngine };
}

function fresh() {
  return {
    screen: 'decision',
    nodeId: 'D1',
    pendingChoiceId: null,
    path: [],
    score: 0,
    bestPercent: null,
    startedAt: 0
  };
}

function play(Engine, CONTENT, ids) {
  let attempt = fresh();
  for (const id of ids) {
    const node = CONTENT.nodes[attempt.nodeId];
    attempt = Engine.applyChoice(attempt, node, id);
    assert.equal(attempt.screen, 'feedback');
    assert.equal(attempt.pendingChoiceId, id);
    const pathBefore = attempt.path.length;
    const scoreBefore = attempt.score;
    assert.equal(pathBefore, attempt.path.length);
    attempt = Engine.confirmChoice(attempt, CONTENT);
    assert.ok(attempt.score >= scoreBefore);
  }
  return attempt;
}

test('bands, percent, keep-best, shuffle, and the four published paths', () => {
  const { CONTENT, Engine } = load();
  assert.equal(Engine.endingFor(25), 'best');
  assert.equal(Engine.endingFor(30), 'best');
  assert.equal(Engine.endingFor(15), 'ok');
  assert.equal(Engine.endingFor(20), 'ok');
  assert.equal(Engine.endingFor(0), 'poor');
  assert.equal(Engine.endingFor(10), 'poor');
  assert.throws(() => Engine.endingFor(12));
  assert.deepEqual([30, 20, 15, 10, 5, 0].map(Engine.percent), [100, 67, 50, 33, 17, 0]);
  assert.equal(Engine.keepBest(null, 50), 50);
  assert.equal(Engine.keepBest(67, 50), 67);

  const original = CONTENT.nodes.D1.choices;
  const shuffled = Engine.shuffle(original, () => 0);
  assert.notDeepEqual(shuffled.map((choice) => choice.id), original.map((choice) => choice.id));
  for (const choice of original) {
    const again = shuffled.find((item) => item.id === choice.id);
    assert.equal(again.text, choice.text);
    assert.equal(again.short, choice.short);
    assert.equal(again.points, choice.points);
    assert.equal(again.rating, choice.rating);
    assert.equal(again.feedback, choice.feedback);
    assert.equal(again.consequence, choice.consequence);
    assert.equal(again.next, choice.next);
  }

  const paths = [
    [['D1-A', 'D2A-A', 'D3A-A'], 30, 'best'],
    [['D1-C', 'D2B-A', 'D3A-A'], 20, 'ok'],
    [['D1-A', 'D2A-C', 'D3B-A'], 15, 'ok'],
    [['D1-C', 'D2B-B', 'D3B-B'], 0, 'poor']
  ];
  for (const [ids, score, ending] of paths) {
    const attempt = play(Engine, CONTENT, ids);
    assert.equal(attempt.score, score);
    assert.equal(attempt.screen, 'ending');
    assert.equal(Engine.endingFor(attempt.score), ending);
    assert.equal(Engine.percent(attempt.score), Engine.percent(score));
  }

  const mid = Engine.applyChoice(fresh(), CONTENT.nodes.D1, 'D1-A');
  assert.equal(mid.path.length, 0);
  assert.equal(mid.score, 0);
  assert.throws(() => Engine.applyChoice(fresh(), CONTENT.nodes.D1, 'nope'));
});
