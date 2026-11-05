import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');

async function readRoot(name) {
  return readFile(path.join(root, name), 'utf8');
}

test('.nojekyll exists and is empty', async () => {
  const file = path.join(root, '.nojekyll');
  const info = await stat(file);
  assert.equal(info.size, 0);
});

test('home page matches the front-door contract', async () => {
  const html = await readRoot('index.html');
  assert.match(html, /<html[^>]*lang="en"[^>]*dir="ltr"/);
  const visible = html.replace(/<[^>]+>/g, '');
  assert.match(visible, /Arabic Interactive E-Learning Samples \/ نماذج تعلّم تفاعلي باللغة العربية/);
  assert.match(html, /<[^>]+lang="ar"[^>]*dir="rtl"[^>]*>نماذج تعلّم تفاعلي باللغة العربية<\/[^>]+>/);
  assert.match(html, /href="assets\/landing\.css"/);
  assert.match(html, /lang="ar"[^>]*dir="rtl"[^>]*>محادثة التغذية الراجعة: موقف قيادي</);
  assert.match(html, /lang="ar"[^>]*dir="rtl"[^>]*>موقف من ثلاث قرارات حول إعطاء التغذية الراجعة</);
  assert.match(html, /href="\.\/feedback-scenario\/"/);
  assert.match(html, /lang="ar"[^>]*dir="rtl"[^>]*>تحدّي السلامة في موقع العمل</);
  assert.match(html, /lang="ar"[^>]*dir="rtl"[^>]*>عشرة أسئلة عن السلامة في موقع العمل</);
  assert.match(html, /href="\.\/safety-challenge\/"/);
  assert.match(html, /lang="ar"[^>]*dir="rtl"[^>]*>جرّب النموذج</);
  assert.match(html, /Download SCORM 1\.2/);
  assert.match(html, /href="https:\/\/github\.com\/senlite\/Arabic-Interactive-E-Learning-Samples\/releases\/download\/v1\.0\/feedback-scenario-scorm12\.zip"/);
  assert.match(html, /href="https:\/\/github\.com\/senlite\/Arabic-Interactive-E-Learning-Samples\/releases\/download\/v1\.0\/safety-challenge-scorm12\.zip"/);
  const releaseNotes = html.match(/<!--[^>]*RELEASE_PAGE[^>]*-->/g) || [];
  assert.equal(releaseNotes.length, 1);
  assert.match(releaseNotes[0], /https:\/\/github\.com\/senlite\/Arabic-Interactive-E-Learning-Samples\/releases\/tag\/v1\.0/);
  assert.match(html, /Claude/);
  assert.match(html, /Cursor/);
  assert.match(html, /phone/);
  assert.match(html, /learning system/);
});

test('readme is English then Arabic and covers both guides', async () => {
  const readme = await readRoot('README.md');
  const splitAt = readme.indexOf('<div dir="rtl" lang="ar">');
  assert.ok(splitAt > 0);
  const english = readme.slice(0, splitAt);
  const arabic = readme.slice(splitAt);
  assert.match(english, /feedback scenario/);
  assert.match(english, /safety challenge/);
  assert.doesNotMatch(english, /<div dir="rtl"/);
  for (const part of [english, arabic]) {
    assert.match(part, /https:\/\/senlite\.github\.io\/Arabic-Interactive-E-Learning-Samples\/feedback-scenario\//);
    assert.match(part, /https:\/\/senlite\.github\.io\/Arabic-Interactive-E-Learning-Samples\/safety-challenge\//);
    assert.match(part, /npm run package/);
    assert.match(part, /dist\/feedback-scenario-scorm12\.zip/);
    assert.match(part, /dist\/safety-challenge-scorm12\.zip/);
    assert.match(part, /completed/);
    assert.match(part, /passed/);
    assert.match(part, /failed/);
    assert.match(part, /70/);
    assert.match(part, /Claude/);
    assert.match(part, /Cursor/);
    assert.match(part, /media\/feedback-scenario\.gif/);
    assert.match(part, /media\/safety-challenge\.gif/);
  }
  assert.notEqual(english.trim(), arabic.replace(/<[^>]+>/g, '').trim());
  assert.doesNotMatch(readme, /registration report is already in the repo/i);
  assert.match(english, /open index\.html/);
  assert.match(arabic, /index\.html/);
  assert.match(arabic, /محادثة التغذية الراجعة/);
  assert.match(arabic, /تحدّي السلامة في موقع العمل/);
});

test('credits name every asset with a source and a licence', async () => {
  const credits = await readRoot('CREDITS.md');
  const rows = [
    'feedback-scenario/img/cover.webp',
    'feedback-scenario/img/ahmed.webp',
    'feedback-scenario/img/sara.webp',
    'feedback-scenario/img/end-best.webp',
    'feedback-scenario/img/end-ok.webp',
    'feedback-scenario/img/end-poor.webp',
    'safety-challenge/img/warehouse.webp',
    'safety-challenge/img/badge-gold.svg',
    'safety-challenge/img/badge-silver.svg',
    'safety-challenge/img/badge-bronze.svg'
  ];
  for (const row of rows) assert.match(credits, new RegExp(row.replaceAll('.', '\\.')));
  assert.match(credits, /safety-challenge\/img\/iso7010-m014\.svg/);
  assert.match(credits, /https:\/\/commons\.wikimedia\.org\/wiki\/File:ISO_7010_M014\.svg/);
  assert.match(credits, /public domain/i);
  assert.match(credits, /Cairo/);
  assert.match(credits, /Tajawal/);
  assert.match(credits, /Open Font License/);
  assert.match(credits, /OpenMoji/);
  assert.match(credits, /CC BY-SA 4\.0/);
  assert.match(credits, /SortableJS/);
  assert.match(credits, /MIT/);
  assert.match(credits, /not used/);
  assert.match(credits, /prompt/i);
});

test('readme lists unpublished publish commands', async () => {
  const readme = await readRoot('README.md');
  const fence = readme.match(/```[\s\S]*?```/);
  assert.ok(fence, 'a fenced command block is required');
  const block = fence[0];
  assert.match(block, /git push -u origin main/);
  assert.match(block, /gh api/);
  assert.match(block, /build_type/);
  assert.match(block, /legacy/);
  assert.match(block, /source\.branch/);
  assert.match(block, /main/);
  assert.match(block, /source\.path/);
  assert.match(block, /gh release create v1\.0/);
  assert.match(block, /dist\/feedback-scenario-scorm12\.zip/);
  assert.match(block, /dist\/safety-challenge-scorm12\.zip/);
});

test('safety hotspot uses a warehouse scene instead of the rectangle stand-in', async () => {
  const app = await readRoot('safety-challenge/js/app.js');
  const art = await readRoot('safety-challenge/img/warehouse.webp');
  assert.match(app, /img\/warehouse\.webp/);
  assert.ok(art.length > 1000);
});

test('activity footers stay Twin Particles', async () => {
  for (const sample of ['feedback-scenario', 'safety-challenge']) {
    const html = await readRoot(path.join(sample, 'js/app.js'));
    assert.match(html, /نموذج تجريبي من إعداد Twin Particles/);
  }
});
