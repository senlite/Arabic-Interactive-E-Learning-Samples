(function (w) {
  var UI = {
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
    skip_link: 'تخطَّ إلى المحتوى',
    useArabicIndicDigits: false,
    formatNumber: function (value) {
      if (typeof value !== 'number' || !Number.isFinite(value)) return value;
      var digits = UI.useArabicIndicDigits ? 'arab' : 'latn';
      return new Intl.NumberFormat('en', { numberingSystem: digits, useGrouping: false }).format(value);
    }
  };
  w.UI = UI;
})(window);
