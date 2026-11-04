import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import test from 'node:test';
import { buildManifest, packageSamples } from '../scripts/package.mjs';

const unzip = promisify(execFile);

const TITLES = {
  'feedback-scenario': 'محادثة التغذية الراجعة: موقف قيادي',
  'safety-challenge': 'تحدّي السلامة في موقع العمل'
};

test('manifest lists every file except itself and sets title and SCO', () => {
  const files = ['index.html', 'css/base.css', 'js/i18n.js'];
  for (const id of Object.keys(TITLES)) {
    const xml = buildManifest(id, files);
    assert.match(xml, new RegExp(`identifier="tp\\.samples\\.${id}"`));
    assert.match(xml, new RegExp(`<title>${TITLES[id]}</title>`));
    assert.match(xml, /href="index\.html"/);
    for (const file of files) assert.match(xml, new RegExp(`href="${file}"`));
    assert.doesNotMatch(xml, /href="imsmanifest\.xml"/);
  }
});

test('mastery score 70 is only on the safety challenge', () => {
  const feedback = buildManifest('feedback-scenario', ['index.html']);
  const safety = buildManifest('safety-challenge', ['index.html']);
  assert.doesNotMatch(feedback, /masteryscore/);
  assert.match(safety, /<adlcp:masteryscore>70<\/adlcp:masteryscore>/);
});

test('packaging exits non-zero when a sample folder or required shared file is missing', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'pkg-'));
  await mkdir(path.join(root, 'feedback-scenario'), { recursive: true });
  await assert.rejects(() => packageSamples(root));
  await mkdir(path.join(root, 'safety-challenge'), { recursive: true });
  await mkdir(path.join(root, 'shared'), { recursive: true });
  await writeFile(path.join(root, 'shared', 'base.css'), 'body{}');
  await assert.rejects(() => packageSamples(root));
  await rm(root, { recursive: true, force: true });
});

test('packaged zips are SCORM 1.2 at the root without XSD or the harness', async () => {
  const root = process.cwd();
  await packageSamples(root);
  for (const id of Object.keys(TITLES)) {
    const zip = path.join(root, 'dist', `${id}-scorm12.zip`);
    const listed = await unzip('unzip', ['-Z1', zip]);
    const names = listed.stdout.split('\n').filter(Boolean);
    assert.equal(names.includes('imsmanifest.xml'), true);
    assert.equal(names.some((name) => name.startsWith(`${id}/`)), false);
    assert.equal(names.some((name) => name.endsWith('.xsd')), false);
    assert.equal(names.some((name) => name.includes('scorm-harness.html')), false);
    const xml = await unzip('unzip', ['-p', zip, 'imsmanifest.xml']);
    const manifest = xml.stdout;
    assert.match(manifest, /<schemaversion>1\.2<\/schemaversion>/);
    assert.match(manifest, new RegExp(`identifier="tp\\.samples\\.${id}"`));
    assert.match(manifest, new RegExp(`<title>${TITLES[id]}</title>`));
    if (id === 'safety-challenge') assert.match(manifest, /<adlcp:masteryscore>70<\/adlcp:masteryscore>/);
    else assert.doesNotMatch(manifest, /masteryscore/);
    for (const name of names) {
      if (name.endsWith('/')) continue;
      if (name === 'imsmanifest.xml') assert.doesNotMatch(manifest, /href="imsmanifest\.xml"/);
      else assert.match(manifest, new RegExp(`href="${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
    }
  }
});
