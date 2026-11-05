// scorm12.js – minimal SCORM 1.2 wrapper; no-op when no LMS is present
(function (w) {
  var api = null, started = false, finished = false, t0 = Date.now();
  function find(win) { var n = 0; while (win && !win.API && win.parent && win.parent !== win && n++ < 10) win = win.parent; return win && win.API || null; }
  function getAPI() { return find(w) || (w.opener ? find(w.opener) : null); }
  function fmt(ms) { var s = Math.round(ms / 1000), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60); s = s % 60;
    var p = function (x) { return (x < 10 ? '0' : '') + x; }; return (h < 1000 ? ('000' + h).slice(-4) : h) + ':' + p(m) + ':' + p(s); }
  var S = {
    init: function () { if (started) return true; api = getAPI(); if (!api) { console.info('[SCORM] standalone mode'); return false; }
      started = api.LMSInitialize('') === 'true';
      var st = api.LMSGetValue('cmi.core.lesson_status');
      if (st === 'not attempted' || st === '') api.LMSSetValue('cmi.core.lesson_status', 'incomplete');
      api.LMSCommit('');
      return started; },
    set: function (k, v) { if (started && !finished) return api.LMSSetValue(k, String(v)) === 'true'; console.debug('[SCORM]', k, v); return false; },
    score: function (raw) { this.set('cmi.core.score.min', 0); this.set('cmi.core.score.max', 100); this.set('cmi.core.score.raw', Math.round(raw)); },
    status: function (s) { this.set('cmi.core.lesson_status', s); },
    commit: function () { if (started && !finished) api.LMSCommit(''); },
    finish: function () { if (!started || finished) return; this.set('cmi.core.session_time', fmt(Date.now() - t0));
      this.set('cmi.core.exit', ''); api.LMSCommit(''); api.LMSFinish(''); finished = true; },
    isLMS: function () { return started; }
  };
  w.addEventListener('pagehide', function () { S.finish(); });
  w.addEventListener('beforeunload', function () { S.finish(); });
  w.SCORM = S;
})(window);
