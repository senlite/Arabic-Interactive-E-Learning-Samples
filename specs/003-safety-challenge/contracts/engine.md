# Contract: safety engine

Module: `safety-challenge/js/engine.js`. No DOM, no `window`, no timers, no `sessionStorage`. Tests import the same functions.

## Functions

### `scoreChoice(optionCorrect)`

Returns `{ base: 100, correct: true, lifeLost: false }` or `{ base: 0, correct: false, lifeLost: true }`.

### `scoreOrder(submitted, correct)`

`submitted` and `correct` are arrays of four strings. Returns `{ base: 100, correct: true, lifeLost: false }` when they are equal index by index. Otherwise `base` is 25 times the number of matching indexes (0, 25, 50, or 75), `correct` is false, and `lifeLost` is true.

### `scoreHotspot({ foundCount, wrongTaps, allFound, timedOut })`

- `allFound` true: `base = max(0, 100 - 10 * wrongTaps)`, `correct` is true only when `base === 100`, `lifeLost` is false.
- `timedOut` true and `allFound` false: `base = max(0, 33 * foundCount - 10 * wrongTaps)`, `correct` is false, `lifeLost` is true.
- Any other combination throws. The page must not call this until the question has ended.

### `timeBonus({ correct, timerOn, remainingRatio })`

Returns 50 when `correct` is true, `timerOn` is true, and `remainingRatio >= 0.5`. Otherwise 0. `remainingRatio` is remaining seconds divided by the question limit.

### `badge(base, finishedAll)`

Returns `null` when `finishedAll` is false. Otherwise `gold` when `base >= 900`, `silver` when `base >= 700`, and `bronze` otherwise.

### `scormPercent(base)`

Returns `Math.round(base / 1000 * 100)` for an integer `base` from 0 to 1000.

### `lessonStatus(percent)`

Returns `passed` when `percent >= 70`, otherwise `failed`.

### `keepBest(previous, next)`

Returns the greater of the two whole numbers. A null or missing `previous` returns `next`.

### `shuffleOptions(options, random)`

Returns a new array of the same option objects. `random` returns a number in `[0, 1)`. Does not change which object has `correct: true`.

### `shuffleSteps(steps, random)`

Returns a new array of the same four strings. The result must not be equal index by index to `steps`. Redraws until it differs. `random` is injectable so tests can force a first draw that matches and assert a second draw.

## Page obligations (not in the engine)

- Call `SCORM.init()` once on load (the shell page already does this).
- On entering results or game over, call `SCORM.score(keepBest(bestPercent, scormPercent(base)))`, `SCORM.status(lessonStatus(that percent))`, and `SCORM.commit()`. The percent passed to `status` is the value just stored, which may be the previous best.
- «إنهاء النشاط» calls `SCORM.finish()` once, then shows `UI.saved` or `UI.saved_standalone` from `SCORM.isLMS()`.
- Optional: for each answered question, write `cmi.interactions.n.id`, `.type`, `.student_response`, `.result`, and `.latency` inside try/catch. Types are `performance`, `choice`, `true-false`, and `sequencing`.
- Do not call `XAPI.send`. Do not edit `js/scorm12.js`.
- Persist the attempt, including `bestPercent`, in `sessionStorage` under `safety-challenge:attempt`. Ignore invalid JSON and start fresh.
- Timer: limits come from the question. Announce once when remaining time first reaches 10 seconds. On expiry, announce with an assertive live region and call `scoreHotspot` or the matching scorer with timeout. When `timerOn` is false, do not start a countdown and do not time out. The hotspot then ends only through `allFound: true`.
- `?debug=1` outlines hotspot zones and logs click position as percentages of the image. It does not change the score.
