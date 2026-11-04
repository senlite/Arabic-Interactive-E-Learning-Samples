import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('harness exposes the SCORM API and loads one sample', () => {
  const file = new URL('../scripts/scorm-harness.html', import.meta.url);
  const html = readFileSync(file, 'utf8');
  assert.equal(file.pathname.includes('/feedback-scenario/'), false);
  assert.equal(file.pathname.includes('/safety-challenge/'), false);
  for (const name of ['LMSInitialize', 'LMSSetValue', 'LMSGetValue', 'LMSCommit', 'LMSFinish', 'LMSGetLastError', 'LMSGetErrorString', 'LMSGetDiagnostic']) {
    assert.match(html, new RegExp(name));
  }
  assert.match(html, /<table/);
  assert.match(html, /<iframe/);
  assert.match(html, /window\.API/);
  assert.match(html, /safety-challenge/);
  assert.match(html, /feedback-scenario/);
  assert.match(html, /sample === 'safety-challenge'/);
});
