# Quickstart: Workplace safety challenge

## Prerequisites

- The shell files already in `safety-challenge/` (`index.html`, `js/i18n.js`, `js/scorm12.js`, `js/xapi-stub.js`, `css/base.css`).
- Node.js to run `node --test`. No install.
- A static open of `safety-challenge/index.html` (or any static server). `file://` must work.

## Automated checks

From the repo root, after the engine tests exist:

```bash
node --test tests/safety-engine.test.mjs
```

Expected: the checks in [contracts/engine.md](./contracts/engine.md) pass, including:

- Choice 100 / 0 and life only on the wrong choice.
- Order 100, or 25 per correct index, life lost under 100.
- Hotspot: three hazards and three wrong taps → base 70, not correct, no life. Timeout with one hazard and no wrong taps → base 33, life lost. Timeout is not scored as correct.
- Bonus 50 only when correct, timer on, and at least half the time left.
- Badge null when the bank is not finished; gold at 900, silver at 700, bronze at 699.
- `scormPercent(1000)` is 100, `scormPercent(700)` is 70, status passed at 70 and failed at 69.
- `keepBest(80, 60)` is 80.
- An order shuffle never equals the correct order.

## Manual checks

Details and Arabic strings: [spec.md](./spec.md). Content shape: [contracts/content.md](./contracts/content.md).

1. Timer on, every question fully correct with time to spare: gold, displayed 1500, and with an LMS the stored score is 100 and status passed.
2. Timer off, same answers: no countdown, displayed 1000, still gold.
3. Three wrong answers: game over, no badge, no further question.
4. Let one question expire: one life lost, «انتهى الوقت!» announced immediately. The countdown speaks at 10 seconds only.
5. Complete one order by dragging the handle and another with ▲/▼ only. Both can score 100.
6. Hotspot: find three hazards, tap both distractors, tap empty once. Score for that question is 70, partial line, no life lost. Empty text is «لا يوجد خطر هنا. حاول مرة أخرى.».
7. Timer off on the hotspot: the scene stays until the third hazard. No life is lost for wrong taps.
8. 360 px width: no horizontal scroll, targets at least 44 px. Keyboard-only run with the timer off reaches results. `?debug=1` outlines the five zones.
9. «إنهاء النشاط» shows the saved message with an LMS and the standalone message without one. «حاول مرة أخرى» starts clean and does not replace a higher stored score with a lower one.

Compare every visible Arabic string with the feature spec before calling the sample done.
