# Research: SCORM 1.2 packages and local call-order proof

## Decision: Align the wrapper log to the specified order

**Decision**: Change `shared/scorm12.js` so a completed launch logs exactly `LMSInitialize`, one `LMSGetValue` of `cmi.core.lesson_status`, lesson status `incomplete` when that value is empty or `not attempted`, score min `0`, score max `100`, score raw, lesson status (`completed`, `passed`, or `failed`), one `LMSCommit`, `cmi.core.session_time`, then one `LMSFinish`. Remove the commit inside `init` and the extra commit and empty `cmi.core.exit` write inside `finish`. `pagehide` and `beforeunload` still call `finish`, and a second `finish` returns without calling `LMSFinish`.

**Rationale**: The current wrapper matches the build-spec snippet, which commits during initialize and again during finish. The feature spec and the SCORM rule require one commit after the lesson status and session time immediately before finish. Constitution principle III still holds: initialize once, set score and status, commit, finish once, no-op without an API.

**Alternatives considered**: Leave the extra commits and treat the spec order as a subsequence. Rejected because the feature spec says the recorded order must be that sequence. Keep `cmi.core.exit`. Rejected because that set-value would sit between session time and finish and break the required order.

## Decision: Do not move score rules into the wrapper

**Decision**: Feedback still reports `round(points/30×100)` and status `completed` on debrief. Safety still reports `round(base/1000×100)` and `passed` or `failed` at 70 on results or game over. Each `app.js` still passes `keepBest` into `SCORM.score` and sets status from that stored percent (`completed` for feedback). The harness only observes those calls.

**Rationale**: Engines and screens already implement the clarification from 2026-11-04: a lower retry keeps the higher score and the lesson status of that better attempt. Rewriting game rules is out of scope.

**Alternatives considered**: Compute keep-best inside `scorm12.js`. Rejected because the wrapper does not know which attempt is better across screens, and sample 1 has no pass/fail status to recompute.

## Decision: Harness is a parent frame, not a packaged file

**Decision**: `scripts/scorm-harness.html` sets `window.API` with the eight SCORM 1.2 methods, appends each call to a visible table, and loads one sample in an iframe. The sample query is `feedback-scenario` or `safety-challenge`, defaulting to the feedback sample. `package.mjs` continues to zip only the two sample folders, so the harness and any XSD files stay out.

**Rationale**: The sample looks up `API` on parent windows. A parent page is the smallest stand-in. Packaging sample folders already excludes `scripts/`.

**Alternatives considered**: Inject a fake API inside each sample. Rejected because that file could be zipped and would not match how a learning system exposes `API`. Automate a SCORM Cloud upload. Rejected by the spec.

## Decision: README section only

**Decision**: Add an English heading “Build the SCORM package” and the matching Arabic block. State `npm run package`, the two zip names, root `imsmanifest.xml`, schema 1.2, mastery 70 only on the safety zip, and the expected registration result. Do not add release or landing-page download links here.

**Rationale**: A later feature owns GitHub Release and the landing page. This feature only has to tell a reviewer how to rebuild the archives and what a manual registration should show.
