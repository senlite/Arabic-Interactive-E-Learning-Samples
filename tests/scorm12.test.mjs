import assert from 'node:assert/strict';
import test from 'node:test';
import { loadScript } from './load-script.mjs';

function fakeWindow(api) {
  const listeners = {};
  const logs = [];
  const w = {
    API: api || null,
    parent: null,
    opener: null,
    listeners,
    logs,
    console: {
      info: (...args) => logs.push(args),
      debug: () => {}
    },
    addEventListener(type, fn) {
      listeners[type] = fn;
    },
    Date
  };
  w.window = w;
  return w;
}

function fakeApi(status = 'not attempted') {
  const calls = [];
  const values = { 'cmi.core.lesson_status': status };
  return {
    calls,
    values,
    LMSInitialize() { calls.push('init'); return 'true'; },
    LMSGetValue(k) { calls.push(['get', k]); return values[k] ?? ''; },
    LMSSetValue(k, v) { calls.push(['set', k, v]); values[k] = v; return 'true'; },
    LMSCommit() { calls.push('commit'); return 'true'; },
    LMSFinish() { calls.push('finish'); return 'true'; }
  };
}

test('standalone init does not throw and logs', () => {
  const w = fakeWindow(null);
  loadScript(new URL('../shared/scorm12.js', import.meta.url), w);
  assert.equal(w.SCORM.init(), false);
  assert.equal(w.logs.some((line) => String(line[0]).includes('standalone')), true);
  assert.equal(w.SCORM.finish(), undefined);
  assert.doesNotThrow(() => w.listeners.pagehide());
});

test('init once, incomplete when untouched, score bounds, finish once', () => {
  const api = fakeApi('');
  const w = fakeWindow(api);
  loadScript(new URL('../shared/scorm12.js', import.meta.url), w);
  assert.equal(w.SCORM.init(), true);
  w.SCORM.init();
  w.SCORM.score(70.6);
  w.SCORM.status('completed');
  w.SCORM.commit();
  w.SCORM.finish();
  w.SCORM.finish();
  w.listeners.pagehide();
  w.listeners.beforeunload();
  const ordered = api.calls.filter((c) => c === 'init' || c === 'commit' || c === 'finish' || (Array.isArray(c) && (c[0] === 'get' || c[0] === 'set')));
  const time = ordered.find((c) => Array.isArray(c) && c[1] === 'cmi.core.session_time');
  assert.deepEqual(ordered, [
    'init',
    ['get', 'cmi.core.lesson_status'],
    ['set', 'cmi.core.lesson_status', 'incomplete'],
    'commit',
    ['set', 'cmi.core.score.min', '0'],
    ['set', 'cmi.core.score.max', '100'],
    ['set', 'cmi.core.score.raw', '71'],
    ['set', 'cmi.core.lesson_status', 'completed'],
    'commit',
    ['set', 'cmi.core.session_time', time[2]],
    ['set', 'cmi.core.exit', ''],
    'commit',
    'finish'
  ]);
  assert.equal(api.calls.filter((c) => c === 'finish').length, 1);
  assert.equal(api.calls.filter((c) => c === 'commit').length, 3);
  assert.equal(api.values['cmi.core.exit'], '');
  assert.match(api.values['cmi.core.session_time'], /^\d{4}:\d{2}:\d{2}$/);
});
