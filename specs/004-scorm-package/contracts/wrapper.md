# Contract: shared SCORM 1.2 wrapper

Source: `shared/scorm12.js`, copied into each sample before packaging. Behaviour is covered by `tests/scorm12.test.mjs`.

## `SCORM.init()`

- No `window.API` on this window, a parent, or the opener: log `[SCORM] standalone mode`, return `false`, do not throw.
- Otherwise call `LMSInitialize("")` once. When `LMSGetValue("cmi.core.lesson_status")` is `""` or `"not attempted"`, set it to `incomplete`. Do not commit inside `init`.

## `SCORM.score(raw)` / `SCORM.status(value)` / `SCORM.commit()`

- While started and not finished, `score` sets min `0`, max `100`, and `Math.round(raw)`.
- `status` sets `cmi.core.lesson_status`.
- `commit` calls `LMSCommit("")` once per call. Activities call it once after status.

## `SCORM.finish()`

- If not started or already finished, return without `LMSFinish`.
- Otherwise set `cmi.core.session_time` to `HHHH:MM:SS`, then call `LMSFinish("")` once. Do not commit again and do not set `cmi.core.exit` in this call.
- `pagehide` and `beforeunload` call `finish`.

## Sample use

- Feedback, on debrief: `SCORM.score(keepBest(best, round(points/30×100)))`, `SCORM.status("completed")`, `SCORM.commit()`.
- Safety, on results or game over: `SCORM.score(keepBest(best, round(base/1000×100)))`, `SCORM.status` from that stored percent (`passed` at 70 or above), `SCORM.commit()`.
- «إنهاء النشاط» calls `SCORM.finish()` and shows «تم حفظ نتيجتك. يمكنك إغلاق هذه النافذة.» when `SCORM.isLMS()` is true, otherwise «انتهى النشاط. (وضع العرض: لا يوجد نظام إدارة تعلّم متصل.)».
