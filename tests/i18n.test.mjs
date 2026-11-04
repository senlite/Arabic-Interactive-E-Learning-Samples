import assert from 'node:assert/strict';
import test from 'node:test';
import { loadScript } from './load-script.mjs';

const STRINGS = {
  start: 'ابدأ',
  next: 'التالي',
  continue: 'تابِع',
  retry: 'أعد المحاولة',
  finish: 'إنهاء النشاط',
  saved: 'تم حفظ نتيجتك. يمكنك إغلاق هذه النافذة.',
  saved_standalone: 'انتهى النشاط. (وضع العرض: لا يوجد نظام إدارة تعلّم متصل.)',
  points: 'النقاط',
  question_of: 'السؤال {n} من {total}',
  decision_of: 'القرار {n} من {total}',
  lives: 'المحاولات',
  time: 'الوقت',
  loading: 'جارٍ التحميل…',
  skip_link: 'تخطَّ إلى المحتوى'
};

function load() {
  const w = { window: null };
  w.window = w;
  loadScript(new URL('../shared/i18n.js', import.meta.url), w);
  return w.UI;
}

test('UI strings match the shared table and digits default to Western', () => {
  const UI = load();
  assert.deepEqual(Object.keys(UI).filter((k) => k !== 'useArabicIndicDigits' && k !== 'formatNumber').sort(), Object.keys(STRINGS).sort());
  for (const [key, value] of Object.entries(STRINGS)) assert.equal(UI[key], value);
  assert.equal(UI.useArabicIndicDigits, false);
  assert.equal(UI.formatNumber(12), '12');
  UI.useArabicIndicDigits = true;
  assert.equal(UI.formatNumber(12), '١٢');
  UI.useArabicIndicDigits = false;
  assert.equal(UI.formatNumber('n/a'), 'n/a');
});
