import assert from 'node:assert/strict';
import test from 'node:test';
import { loadScript } from './load-script.mjs';

test('xAPI send logs locally and never calls fetch', () => {
  let fetched = false;
  const w = {
    console: { info() {} },
    location: { origin: 'http://localhost', pathname: '/feedback-scenario/index.html' },
    document: { title: 'محادثة التغذية الراجعة: موقف قيادي' },
    fetch() { fetched = true; }
  };
  w.window = w;
  loadScript(new URL('../shared/xapi-stub.js', import.meta.url), w);
  assert.equal(w.XAPI.endpoint, null);
  const stmt = w.XAPI.send('attempted');
  assert.equal(fetched, false);
  assert.ok(stmt.actor);
  assert.match(stmt.verb.id, /^http:\/\/adlnet\.gov\/expapi\/verbs\//);
  assert.ok(stmt.object);
  assert.match(stmt.timestamp, /^\d{4}-\d{2}-\d{2}T/);
});
