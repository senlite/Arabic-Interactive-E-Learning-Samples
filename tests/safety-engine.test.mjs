import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { loadScript } from './load-script.mjs';

function fields(scored) {
  return { base: scored.base, correct: scored.correct, lifeLost: scored.lifeLost };
}

function engine() {
  const w = { window: null, console };
  w.window = w;
  loadScript(new URL('../safety-challenge/js/engine.js', import.meta.url), w);
  return w.SafetyEngine;
}

const steps = ['a', 'b', 'c', 'd'];

test('scoreChoice', () => {
  const E = engine();
  assert.deepEqual(fields(E.scoreChoice(true)), { base: 100, correct: true, lifeLost: false });
  assert.deepEqual(fields(E.scoreChoice(false)), { base: 0, correct: false, lifeLost: true });
});

test('scoreOrder', () => {
  const E = engine();
  assert.deepEqual(fields(E.scoreOrder(steps, steps)), { base: 100, correct: true, lifeLost: false });
  assert.deepEqual(fields(E.scoreOrder(['a', 'b', 'd', 'c'], steps)), { base: 50, correct: false, lifeLost: true });
  assert.deepEqual(fields(E.scoreOrder(['d', 'c', 'b', 'a'], steps)), { base: 0, correct: false, lifeLost: true });
});

test('scoreHotspot', () => {
  const E = engine();
  assert.deepEqual(fields(E.scoreHotspot({ foundCount: 3, wrongTaps: 3, allFound: true, timedOut: false })), {
    base: 70, correct: false, lifeLost: false
  });
  assert.deepEqual(fields(E.scoreHotspot({ foundCount: 3, wrongTaps: 0, allFound: true, timedOut: false })), {
    base: 100, correct: true, lifeLost: false
  });
  assert.deepEqual(fields(E.scoreHotspot({ foundCount: 1, wrongTaps: 0, allFound: false, timedOut: true })), {
    base: 33, correct: false, lifeLost: true
  });
  assert.throws(() => E.scoreHotspot({ foundCount: 1, wrongTaps: 0, allFound: false, timedOut: false }));
});

test('timeBonus badge percent status keepBest', () => {
  const E = engine();
  assert.equal(E.timeBonus({ correct: true, timerOn: true, remainingRatio: 0.5 }), 50);
  assert.equal(E.timeBonus({ correct: true, timerOn: true, remainingRatio: 0.49 }), 0);
  assert.equal(E.timeBonus({ correct: true, timerOn: false, remainingRatio: 1 }), 0);
  assert.equal(E.timeBonus({ correct: false, timerOn: true, remainingRatio: 1 }), 0);
  assert.equal(E.badge(900, false), null);
  assert.equal(E.badge(900, true), 'gold');
  assert.equal(E.badge(700, true), 'silver');
  assert.equal(E.badge(699, true), 'bronze');
  assert.equal(E.scormPercent(1000), 100);
  assert.equal(E.scormPercent(700), 70);
  assert.equal(E.lessonStatus(70), 'passed');
  assert.equal(E.lessonStatus(69), 'failed');
  assert.equal(E.keepBest(null, 70), 70);
  assert.equal(E.keepBest(80, 60), 80);
  assert.equal(E.lessonStatus(E.keepBest(80, 50)), 'passed');
  assert.equal(E.lessonStatus(E.keepBest(60, 80)), 'passed');
});

test('shuffleSteps is never the correct order and shuffleOptions keeps the correct object', () => {
  const E = engine();
  const out = E.shuffleSteps(steps, function () { return 0; });
  assert.notDeepEqual(out, steps);
  const options = [{ id: 'a', correct: false }, { id: 'b', correct: true }];
  const shuffled = E.shuffleOptions(options, function () { return 0; });
  assert.equal(shuffled.find((o) => o.correct).id, 'b');
});

test('composed proof runs', () => {
  const E = engine();
  let base = 0;
  let bonus = 0;
  for (let i = 0; i < 10; i += 1) {
    const scored = E.scoreChoice(true);
    base += scored.base;
    bonus += E.timeBonus({ correct: scored.correct, timerOn: true, remainingRatio: 1 });
  }
  assert.equal(base, 1000);
  assert.equal(bonus, 500);
  assert.equal(E.badge(base, true), 'gold');

  let offBonus = 0;
  for (let i = 0; i < 10; i += 1) {
    offBonus += E.timeBonus({ correct: true, timerOn: false, remainingRatio: 1 });
  }
  assert.equal(offBonus, 0);
  assert.equal(E.badge(1000, true), 'gold');

  let lives = 3;
  for (let i = 0; i < 3; i += 1) {
    const scored = E.scoreChoice(false);
    if (scored.lifeLost) lives -= 1;
  }
  assert.equal(lives, 0);

  let order = E.shuffleSteps(steps, function () { return 0; });
  const indexOf = (value) => order.indexOf(value);
  while (order.join() !== steps.join()) {
    for (let i = 0; i < steps.length; i += 1) {
      const at = indexOf(steps[i]);
      if (at > i) {
        const tmp = order[at - 1];
        order[at - 1] = order[at];
        order[at] = tmp;
      }
    }
  }
  assert.deepEqual(fields(E.scoreOrder(order, steps)), { base: 100, correct: true, lifeLost: false });
});

test('elapsed time stays fixed after the attempt ends', () => {
  const E = engine();
  const attempt = { startedAt: 1000 };
  assert.equal(E.readElapsed(attempt, 11000), 10);
  E.stampElapsed(attempt, 11000);
  assert.equal(attempt.elapsedSeconds, 10);
  assert.equal(E.readElapsed(attempt, 71000), 10);
  E.stampElapsed(attempt, 71000);
  assert.equal(attempt.elapsedSeconds, 10);
});

test('safety report uses the stored percent for score and status', () => {
  const src = readFileSync(new URL('../safety-challenge/js/app.js', import.meta.url), 'utf8');
  const report = src.slice(src.indexOf('function report()'), src.indexOf('function elapsed()'));
  assert.match(report, /keepBest\(attempt\.bestPercent, percent\)/);
  assert.match(report, /SCORM\.score\(stored\)/);
  assert.match(report, /SCORM\.status\(E\.lessonStatus\(stored\)\)/);
});
