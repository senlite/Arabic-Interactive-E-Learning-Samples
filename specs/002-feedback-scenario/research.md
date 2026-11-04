# Research: Feedback branching scenario

## Decision: Pure engine module plus a DOM app

**Rationale**: Score bands, `next` links, percent rounding, keep-best, and shuffle identity are programmable rules. The constitution requires a failing automated check before the code that passes it. Node’s test runner cannot load a DOM page. `feedback-scenario/js/engine.js` exports functions with no `window` dependency. `app.js` renders and calls `SCORM`.

**Alternatives considered**: Putting rules only in `app.js` and testing them in a browser (no automated check in `npm test`). Duplicating the rules inside the test file (the test would not lock the page’s code).

## Decision: Content is `window.CONTENT` in `content.js`

**Rationale**: Constitution II and the feature spec require content separate from behaviour, loaded as a script so `file://` and a strict LMS iframe work. No `fetch`.

**Alternatives considered**: JSON fetched at runtime (breaks `file://` and some LMS iframes). Embedding the script inside `app.js` (blocks a later content-only edit).

## Decision: Keep the higher percent in the attempt record, not inside `scorm12.js`

**Rationale**: The shell wrapper’s `score()` always writes the number it is given. Sample 2 will use a different pass mark. Sample 1’s keep-best rule belongs in this activity: before calling `SCORM.score`, `app.js` passes `keepBest(previous, next)`. The debrief still shows this attempt’s own total and percent.

**Alternatives considered**: Changing `shared/js/scorm12.js` to remember a best score (would change the safety sample’s shell and the published wrapper). Always writing the latest percent (rejected in clarification; option B).

## Decision: Resume with `sessionStorage` key `feedback-scenario:attempt`

**Rationale**: The build spec allows an in-session copy so refresh does not reset the run. The feature spec treats resume as best-effort. If the stored value is missing or invalid, the page starts at the start screen and does not report a score.

**Alternatives considered**: `localStorage` (would survive closing the tab and confuse a later demo). No storage (refresh would always wipe a half-finished conversation).

## Decision: «القرار n من 3» only while `screen === 'decision'`

**Rationale**: Clarification on 2026-11-04. Other screens show the sample title and a progress indicator that fills from the right. Progress equals confirmed choices divided by 3: empty before the first «تابِع», one third after it, two thirds after the second, and full on the ending and debrief. Feedback keeps the count from before «تابِع». The label uses `UI.decision_of` with `UI.formatNumber`.

**Alternatives considered**: Showing the line on every screen with the last index (rejected; option B). Showing it on feedback and the ending as well (rejected; option C).

## Decision: Shuffle with `Math.random` in the app, identity checked in the engine

**Rationale**: The engine exposes `shuffle(choices, random)` so tests inject a sequence and prove each choice keeps its id, points, rating, feedback, consequence, and `next`. The page calls it with `Math.random` when a decision is shown and again after retry.

**Alternatives considered**: Sorting by a fixed seed (order would be stable across attempts). Shuffling DOM nodes without a testable function (fails the test-first gate).

## Decision: Placeholder inline SVG avatars

**Rationale**: §9 illustrations are not in this feature. Inline SVG needs no extra file, no licence lookup, and no logo. `CREDITS.md` does not need a new image row until real art is added.

**Alternatives considered**: Stock photos (forbidden). Empty boxes with no portrait (weaker conversation layout, still acceptable, but the spec asks for placeholders).

## Decision: Do not call `XAPI.send` and do not write interactions

**Rationale**: The feature’s out-of-scope list and the cut order put xAPI sending and SCORM interactions after this sample. The stub script may stay loaded by the shell page.

**Alternatives considered**: Logging a statement per choice (scope creep for this feature).
