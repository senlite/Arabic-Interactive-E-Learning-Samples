---

description: "Task list for the feedback branching scenario"
---

# Tasks: Feedback branching scenario

**Input**: Design documents from `/specs/002-feedback-scenario/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included for branching, score bands, percent rounding, keep-best, and shuffle identity. The constitution requires each of those checks to fail before the implementation that makes it pass. Browser, phone, and learning-system checks stay in the quickstart.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Activity files live in `feedback-scenario/`. Automated checks live in `tests/feedback-engine.test.mjs`. Do not edit `shared/`, `safety-challenge/`, or the copied shell files `feedback-scenario/js/i18n.js`, `feedback-scenario/js/scorm12.js`, and `feedback-scenario/js/xapi-stub.js`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Page hooks for the scenario without changing the shell

- [x] T001 Add `feedback-scenario/css/scenario.css` and link it from `feedback-scenario/index.html` after `css/base.css`
- [x] T002 Add classic script tags to `feedback-scenario/index.html` after the shell scripts, in this order: `content.js`, `js/engine.js`, `js/app.js`. Leave the existing shell call that starts the learning-system session once. `js/app.js` MUST NOT start it again

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Verbatim content and the pure rules every screen needs

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests (write first) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T003 [P] Add failing checks in `tests/feedback-engine.test.mjs` that import `feedback-scenario/js/engine.js` and assert: `endingFor` returns `best` for 25–30, `ok` for 15–20, and `poor` for 0–10, and throws for any other number; `percent` returns 100, 67, 50, 33, 17, and 0 for totals 30, 20, 15, 10, 5, and 0; `keepBest(null, 50)` is 50 and `keepBest(67, 50)` is 67; `shuffle` with an injected `random` reorders three choices without changing `id`, `text`, `short`, `points`, `rating`, `feedback`, `consequence`, or `next`; `applyChoice` sets the feedback screen and `pendingChoiceId` without changing `path` or `score`; `confirmChoice` appends `{ node, choice, points }` and follows `next`, using `END` to set `screen` to `ending`. Include the four sequences `D1-A → D2A-A → D3A-A` = 30 `best`, `D1-C → D2B-A → D3A-A` = 20 `ok`, `D1-A → D2A-C → D3B-A` = 15 `ok`, and `D1-C → D2B-B → D3B-B` = 0 `poor`

### Implementation

- [x] T004 [P] Write `feedback-scenario/content.js` assigning `window.CONTENT` to the shape in `specs/002-feedback-scenario/contracts/content.md` and the ids, points, and `next` values in `specs/002-feedback-scenario/data-model.md`. Copy every Arabic string from `specs/002-feedback-scenario/spec.md` exactly. `rating` tokens are only `good`, `partial`, or `poor`. Each decision node has exactly three choices
- [x] T005 Implement `applyChoice`, `confirmChoice`, `endingFor`, `percent`, `keepBest`, and `shuffle` in `feedback-scenario/js/engine.js` with no DOM and no `window`, until `node --test tests/feedback-engine.test.mjs` passes. `percent` is `Math.round(score / 30 * 100)`. `keepBest` returns the greater whole number, or `next` when `previous` is null

**Checkpoint**: Content and rules exist. Screens can be built on top.

---

## Phase 3: User Story 1 - Complete a three-decision feedback conversation (Priority: P1) 🎯 MVP

**Goal**: A learner can move from the start screen through three committed choices to an ending narrative

**Independent Test**: Play from «ابدأ» to an ending and match the scene, choice, feedback, points line, and ending title to the feature spec

### Implementation for User Story 1

- [x] T006 [P] [US1] Style the conversation in `feedback-scenario/css/scenario.css`: scene card, speech bubbles, choice buttons at least 44×44 px in one column at 360 px, progress that fills from the right by confirmed choices out of 3 (empty before the first «تابِع», one third, two thirds, then full on the ending and debrief; feedback keeps the pre-«تابِع» count), rating colours `#15803D`, `#B45309`, and `#B91C1C` always paired with an icon and text, motion at or under 300 ms and disabled under `prefers-reduced-motion: reduce`. Use logical properties only
- [x] T007 [US1] Render start, objectives, context, decision, feedback, and ending in `feedback-scenario/js/app.js` from `window.CONTENT` and `window.UI`. Show «القرار {n} من 3» only when `screen` is `decision`. Set the progress fill to confirmed choices divided by 3, leaving the feedback screen at the count from before «تابِع», and filling it completely on the ending. Selecting a choice commits immediately via `applyChoice`. «تابِع» calls `confirmChoice`. There is no back control. Shuffle choices with `Math.random` each time a decision is shown. Placeholder portraits are inline SVG
- [x] T008 [US1] Move focus to the new screen heading on each change in `feedback-scenario/js/app.js`, and put feedback text in a polite live region

**Checkpoint**: One full attempt reaches an ending whose title matches the total

---

## Phase 4: User Story 2 - Review the path and try again or finish (Priority: P1)

**Goal**: The debrief shows this attempt, retry clears the attempt, and the recorded percent never falls

**Independent Test**: Finish a known path, read the three short labels and four tips, retry onto a lower path, and confirm the on-screen score is the new attempt while the stored percent stays the higher one

### Implementation for User Story 2

- [x] T009 [US2] Render the debrief in `feedback-scenario/js/app.js`: «ملخّص أدائك», «نتيجتك: {score} من 30 ({percent}%)» for this attempt, ending title, path rows «القرار {n}: {short} — {points} نقاط», four tips, and the disclaimer «نموذج تجريبي لأغراض العرض. الأسماء والمواقف افتراضية.»
- [x] T010 [US2] On entering the debrief, call `SCORM.score(keepBest(bestPercent, percent(score)))`, `SCORM.status('completed')`, and `SCORM.commit()` from `feedback-scenario/js/app.js`. «إنهاء النشاط» calls `SCORM.finish()` once and shows `UI.saved` when `SCORM.isLMS()` is true, otherwise `UI.saved_standalone`. Do not call `XAPI.send` and do not write interactions
- [x] T011 [US2] «أعد المحاولة» in `feedback-scenario/js/app.js` clears `screen`, `nodeId`, `path`, and `score` but keeps `bestPercent`. Persist the attempt, including `bestPercent`, in `sessionStorage` under `feedback-scenario:attempt`. Invalid JSON starts a fresh attempt and reports no score

**Checkpoint**: Debrief, retry, keep-best, and finish work with and without a learning system

---

## Phase 5: User Story 3 - Prove the four published paths (Priority: P1)

**Goal**: The four documented routes show the published totals, percents, and endings

**Independent Test**: `node --test tests/feedback-engine.test.mjs` passes the four sequences, and each route played in the browser matches the debrief

### Implementation for User Story 3

- [x] T012 [US3] Play the four routes from `specs/002-feedback-scenario/data-model.md` in `feedback-scenario/index.html` and fix `feedback-scenario/js/app.js` if any debrief total, percent, ending title, or short label differs. Percents are 100, 67, 50, and 0

**Checkpoint**: The four proof paths match the spec on screen and in the test file

---

## Phase 6: User Story 4 - Use the conversation on a phone and with a keyboard (Priority: P2)

**Goal**: A 360 px touch pass and a keyboard-only pass both finish the activity

**Independent Test**: Complete one attempt at 360 px with no horizontal scroll, and another with the keyboard only, with focus on each new heading

### Implementation for User Story 4

- [x] T013 [US4] In `feedback-scenario/css/scenario.css`, keep the page free of horizontal scroll at 360 px, stack choices in one column, and keep gaps so 44 px targets do not overlap. At wider widths, choices may sit in a grid
- [x] T014 [US4] In `feedback-scenario/js/app.js`, make every choice and navigation control a `button` that is reachable with Tab and activated with Enter or Space. Decorative SVG portraits use an empty accessible name. Wrap the Latin token SBI so it stays in reading order

**Checkpoint**: Phone width and keyboard-only use match the feature spec

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Package file list and the quickstart

- [x] T015 Run `npm run package` so `feedback-scenario/imsmanifest.xml` lists `content.js`, `css/scenario.css`, `js/engine.js`, and `js/app.js` in `dist/feedback-scenario-scorm12.zip`
- [x] T016 Walk `specs/002-feedback-scenario/quickstart.md` and fix only `feedback-scenario/` files if a listed check fails

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup. Blocks every user story
- **User Stories (Phases 3–6)**: Depend on Foundational. US2 extends the US1 page. US3 checks that page. US4 tightens the same CSS and keyboard behaviour
- **Polish (Phase 7)**: Depends on the stories you intend to ship

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational. No dependency on US2–US4
- **User Story 2 (P1)**: Starts after US1, because the debrief follows the ending screen
- **User Story 3 (P1)**: Automated cases are already in T003. The browser proof starts after US2 so the debrief rows exist
- **User Story 4 (P2)**: Starts after US1. It can proceed beside US2 if CSS and `app.js` edits are coordinated

### Within Each User Story

- T003 fails before T005
- Content (T004) and the failing test (T003) are different files and can be written together
- Engine (T005) comes before any screen
- US1 screens before the debrief
- Debrief before the four-path browser proof

### Parallel Opportunities

- T003 and T004 can run together
- T006 can run beside the start of T007 until both must meet in the page
- US4 CSS (T013) can run beside US2 if the editor avoids `app.js`

---

## Parallel Example: Foundational

```bash
# Together, before the engine exists:
Task: "Failing checks in tests/feedback-engine.test.mjs"
Task: "window.CONTENT in feedback-scenario/content.js"

# Then:
Task: "Implement feedback-scenario/js/engine.js until node --test passes"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2
2. Complete Phase 3
3. Stop and play one path through to an ending

### Incremental Delivery

1. Setup plus foundational rules
2. User Story 1: conversation through the ending
3. User Story 2: debrief, retry, keep-best, finish
4. User Story 3: four published routes
5. User Story 4: 360 px and keyboard
6. Package so the new files are in the zip

### Parallel Team Strategy

After Phase 2, one person can own `css/scenario.css` while another owns `js/app.js`. The engine file should have a single owner after T005.

---

## Notes

- [P] tasks use different files and do not depend on an unfinished task
- Do not rephrase Arabic
- FR-012 only clears the on-screen attempt and finishes the session. FR-013 is the only rule for which percent is recorded
- FR-014 is T002: the shell page already starts the learning-system session once. Do not call that start from `js/app.js`
- A Lighthouse accessibility score of at least 90 and one learning-system import stay on the constitution release checklist. They are not tasks in this feature. Keyboard completion is T014. Do not treat this task list as the full release gate
- Do not change the shared SCORM wrapper. Keep-best is applied in `app.js` before `SCORM.score`
- Commit after each task or logical group
- Stop at any checkpoint and check that story on its own

## Phase 8: Convergence

- [x] T017 CRITICAL: In `feedback-scenario/js/app.js`, make each screen title the first heading on the page (`h1`) so heading levels are not skipped per Constitution IV (partial)
- [x] T018 Move `aria-live="polite"` in `feedback-scenario/js/app.js` off the whole screen and onto the feedback, score, and finish message only, leaving the screen heading outside that region per FR-016 (partial)

## Phase 9: Convergence

- [x] T019 Rebuild `dist/feedback-scenario-scorm12.zip` with `npm run package` so the packaged `js/app.js` matches `feedback-scenario/js/app.js`, including the `h1` screen title and the limited polite region per T015 (partial)
