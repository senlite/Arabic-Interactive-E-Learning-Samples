# Contract: feedback engine

Module: `feedback-scenario/js/engine.js`. No DOM, no `window`, no `sessionStorage`. Tests import the same functions.

## Functions

### `applyChoice(attempt, node, choiceId)`

Returns a new attempt on the feedback screen with `pendingChoiceId` set. Does not change `path` or `score`. Throws if `choiceId` is not on `node`.

### `confirmChoice(attempt, content)`

Appends the pending choice to `path`, adds its points, and clears `pendingChoiceId`. If `next` is `END`, sets `screen` to `ending`. Otherwise sets `screen` to `decision` and `nodeId` to `next`.

### `endingFor(score)`

Returns `best` for 25–30, `ok` for 15–20, `poor` for 0–10. Throws for any other number.

### `percent(score)`

Returns `Math.round(score / 30 * 100)` for a legal total. Examples: 30 → 100, 20 → 67, 15 → 50, 10 → 33, 5 → 17, 0 → 0.

### `keepBest(previous, next)`

Returns the greater of the two whole numbers. A null or missing `previous` returns `next`.

### `shuffle(choices, random)`

Returns a new array of the same choice objects. Order may change. Each object’s `id`, `text`, `short`, `points`, `rating`, `feedback`, `consequence`, and `next` are unchanged. `random` is a function returning a number in `[0, 1)`.

## Page obligations (not in the engine)

- Call `SCORM.init()` once on load (the shell page already does this).
- On entering the debrief, call `SCORM.score(keepBest(bestPercent, percent(score)))`, `SCORM.status('completed')`, and `SCORM.commit()`.
- «إنهاء النشاط» calls `SCORM.finish()` once, then shows `UI.saved` or `UI.saved_standalone` from `SCORM.isLMS()`.
- Do not call `XAPI.send`. Do not write `cmi.interactions`.
- Persist the attempt, including `bestPercent`, in `sessionStorage` under `feedback-scenario:attempt`. Ignore invalid JSON and start fresh.
