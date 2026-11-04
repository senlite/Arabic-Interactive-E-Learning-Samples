---

description: "Task list for the workplace safety challenge"
---

# Tasks: Workplace safety challenge

**Input**: Design documents from `/specs/003-safety-challenge/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included for hotspot scoring, order scoring, lives, time bonus, badge bands, SCORM percent, keep-best, and shuffles. The constitution requires each of those checks to fail before the implementation that makes it pass. Browser, phone, timer, and learning-system checks stay in the quickstart.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Activity files live in `safety-challenge/`. Automated checks live in `tests/safety-engine.test.mjs`. Do not edit `shared/`, `feedback-scenario/`, or the copied shell files `safety-challenge/js/i18n.js`, `safety-challenge/js/scorm12.js`, and `safety-challenge/js/xapi-stub.js`. In code and tasks the first question is a hotspot. The feature spec also calls that question a scene search; both names mean Q1.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Page hooks for the game without changing the shell

- [x] T001 Add `safety-challenge/css/game.css` and link it from `safety-challenge/index.html` after `css/base.css`
- [x] T002 Add classic script tags to `safety-challenge/index.html` after the shell scripts, in this order: `content.js`, `js/engine.js`, `js/app.js`. Leave the existing shell call that starts the learning-system session once. `js/app.js` MUST NOT start it again
- [x] T003 [P] Save the public-domain ISO 7010 M014 sign as `safety-challenge/img/iso7010-m014.svg` and add a source and licence line to `CREDITS.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Verbatim content and the pure rules every screen needs

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests (write first) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T004 [P] Add failing checks in `tests/safety-engine.test.mjs` that import `safety-challenge/js/engine.js` and assert the contract in `specs/003-safety-challenge/contracts/engine.md`: `scoreChoice(true)` is base 100, correct, no life; `scoreChoice(false)` is base 0, not correct, life lost; `scoreOrder` is 100 with no life only when all four indexes match, otherwise 25 per matching index with a life lost; `scoreHotspot` with `allFound` and `wrongTaps` 3 returns base 70, not correct, no life, and with `timedOut`, `foundCount` 1, and `wrongTaps` 0 returns base 33, not correct, life lost; `timeBonus` is 50 only when correct, timer on, and `remainingRatio` is at least 0.5; `badge` is null when `finishedAll` is false, `gold` at base 900, `silver` at 700, and `bronze` at 699; `scormPercent(1000)` is 100 and `scormPercent(700)` is 70; `lessonStatus(70)` is `passed` and `lessonStatus(69)` is `failed`; `keepBest(null, 70)` is 70 and `keepBest(80, 60)` is 80; `shuffleSteps` with an injected `random` that first returns the correct order still returns a different order; `shuffleOptions` does not move `correct: true` onto another object

### Implementation

- [x] T005 [P] Write `safety-challenge/content.js` assigning `window.CONTENT` to the shape in `specs/003-safety-challenge/contracts/content.md` and the fields in `specs/003-safety-challenge/data-model.md`. Copy every Arabic string from `specs/003-safety-challenge/spec.md` exactly. `questions` length is 10, ids `Q1`–`Q10` in that order. Q1 has five zones, three with `hazard: true`. True/false options are «صح» then «خطأ». Q3 and Q9 mark «خطأ». Q6 marks «صح». Q4 and Q8 each have four `steps` in the correct order
- [x] T006 Implement `scoreChoice`, `scoreOrder`, `scoreHotspot`, `timeBonus`, `badge`, `scormPercent`, `lessonStatus`, `keepBest`, `shuffleOptions`, and `shuffleSteps` in `safety-challenge/js/engine.js` with no DOM and no `window`, until `node --test tests/safety-engine.test.mjs` passes. Hotspot `allFound` sets base to `max(0, 100 - 10 * wrongTaps)` and is correct only when that base is 100. A call that is neither `allFound` nor `timedOut` throws

**Checkpoint**: Content and rules exist. Screens can be built on top.

---

## Phase 3: User Story 1 - Play ten safety challenges with lives and a timer (Priority: P1) 🎯 MVP

**Goal**: A learner can move from the start screen through ten questions and feedback to results or game over

**Independent Test**: Start an attempt, answer all ten with the timer on, and see the question order, the top bar, feedback, and a closing screen

### Implementation for User Story 1

- [x] T007 [P] [US1] Style the game in `safety-challenge/css/game.css`: top bar, hearts, countdown, progress that fills from the right, full-width answer buttons at least 44×44 px, a feedback panel, order cards with a handle and ▲/▼ buttons, and hotspot buttons positioned by percent. Use logical properties only. Motion at or under 300 ms and disabled under `prefers-reduced-motion: reduce`. Set `touch-action: none` only on the drag handle
- [x] T008 [US1] Render start, question, feedback, results, and game over in `safety-challenge/js/app.js` from `window.CONTENT` and `window.UI`. Start shows the title, description, three rules, collapsible «ماذا ستتعلّم؟», timer switch default on, and «ابدأ التحدي». Questions stay in content order. On each MCQ show, call `shuffleOptions` with `Math.random`. Leave true/false as «صح» then «خطأ». On each order show, call `shuffleSteps` so the cards are not the correct order. Pointer drag on the handle and ▲/▼ both update that same order. «تحقّق من الترتيب» then calls `scoreOrder`. MCQ and true/false lock on the first tap. A hotspot zone id already in `found` does not increment `foundCount` or the counter. The hotspot ends when all three hazards are found or, when the timer is on, when time runs out. Feedback uses the matching template and «السؤال التالي», or «عرض النتيجة» after question 10. At 0 lives go to game over and ask no further question
- [x] T009 [US1] Move focus to the new screen heading on each change in `safety-challenge/js/app.js`. Put feedback, score, and lives in a polite live region. Put timeout text in an assertive live region

**Checkpoint**: One full attempt reaches results or game over

---

## Phase 4: User Story 2 - Earn points, a pass mark, and a badge by the published rules (Priority: P1)

**Goal**: Points, lives, bonus, badge, and the recorded score follow the feature spec

**Independent Test**: Compare a known attempt’s base, bonus, badge, and stored percent with `specs/003-safety-challenge/data-model.md`

### Implementation for User Story 2

- [x] T010 [US2] In `safety-challenge/js/app.js`, score each answer only through `safety-challenge/js/engine.js`. Add +50 only from `timeBonus`. Keep the displayed total as base plus bonus. Choose the badge from base points only, and only when all ten finish with lives remaining. Game over shows no badge and uses the game-over text from content
- [x] T011 [US2] In `safety-challenge/js/app.js`, on results or game over call `SCORM.score(keepBest(bestPercent, scormPercent(base)))`, `SCORM.status(lessonStatus(storedPercent))`, and `SCORM.commit()`. «إنهاء النشاط» calls `SCORM.finish()` once and shows `UI.saved` or `UI.saved_standalone` from `SCORM.isLMS()`. «حاول مرة أخرى» clears the on-screen attempt and does not lower `bestPercent`. Optional `cmi.interactions.n.*` writes stay in try/catch and use types `performance`, `choice`, `true-false`, and `sequencing`. Do not call `XAPI.send`
- [x] T012 [US2] Persist the attempt, including `bestPercent`, in `sessionStorage` under `safety-challenge:attempt` from `safety-challenge/js/app.js`. Ignore invalid JSON and return to the start screen without reporting a score

**Checkpoint**: A perfect timed attempt shows 1500 and would record 100. A lower retry does not replace a higher stored percent

---

## Phase 5: User Story 3 - Prove the six published checks (Priority: P1)

**Goal**: The six proof runs in the feature spec produce the published outcomes

**Independent Test**: Run `node --test tests/safety-engine.test.mjs` and then the six rows in `specs/003-safety-challenge/quickstart.md`

### Tests for User Story 3 ⚠️

- [x] T013 [P] [US3] Extend `tests/safety-engine.test.mjs` with composed checks that T004 does not already name: ten fully correct answers with bonus 50 each total base 1000, bonus 500, and badge `gold`; the same ten answers with the timer off total bonus 0 and still `gold`; three `scoreChoice(false)` results reach 0 lives; applying ▲/▼ index swaps to a shuffled order can reach the correct four steps, and `scoreOrder` then returns 100. Do not restate the single-call hotspot 70, the single timeout, or the `timeBonus` cases from T004. Write any check that needs a new helper so it fails before that helper exists

### Implementation for User Story 3

- [x] T014 [US3] Add only the helpers those checks need in `safety-challenge/js/engine.js`, or satisfy them with the functions from T006, until `node --test tests/safety-engine.test.mjs` passes
- [x] T015 [US3] Wire the page clock in `safety-challenge/js/app.js`: limits 60, 30, 20, and 45 seconds by type; announce once when remaining time first hits 10 seconds; on expiry score a timeout. When the start switch is off, do not show a countdown, do not time out, and do not add a bonus. With the timer off, the hotspot stays until the third hazard is found

**Checkpoint**: The six numeric proofs pass in Node, and the timer switch changes the page as specified

---

## Phase 6: User Story 4 - Read every question as written (Priority: P1)

**Goal**: Every learner-facing string matches the feature spec

**Independent Test**: Compare `safety-challenge/content.js` with the Arabic in `specs/003-safety-challenge/spec.md` User Story 4

### Implementation for User Story 4

- [x] T016 [US4] In `safety-challenge/js/app.js`, render prompts, options, explanations, feedback, badges, and the disclaimer «نموذج تجريبي لأغراض العرض، ولا يغني عن تدريب السلامة المعتمد في منشأتك.» from `window.CONTENT` without rewriting them. Wrap CO₂, RACE, Near Miss, and ISO 7010 so each stays in reading order. Review-list titles are the ten `short` strings in order, each marked right or wrong
- [x] T017 [P] [US4] Point Q10 in `safety-challenge/content.js` at `img/iso7010-m014.svg` with alt text «لافتة دائرية زرقاء عليها رمز خوذة بيضاء». Until `img/warehouse.webp` exists, Q1 in `safety-challenge/js/app.js` uses an inline placeholder and the five percent zones still receive taps

**Checkpoint**: A string comparison against the feature spec finds no reworded Arabic

---

## Phase 7: User Story 5 - Finish on a phone and with a keyboard (Priority: P2)

**Goal**: A 360 px touch pass and a keyboard-only pass both finish the activity

**Independent Test**: Complete one attempt at 360 px with no horizontal scroll, and another with the keyboard only and the timer off

### Implementation for User Story 5

- [x] T018 [US5] In `safety-challenge/css/game.css`, keep the page free of horizontal scroll at 360 px, stack answers in one column, keep the top bar visible, and keep gaps so 44 px targets do not overlap
- [x] T019 [US5] In `safety-challenge/js/app.js`, make every answer, zone, ▲/▼ control, and screen button a `button` reachable with Tab and activated with Enter or Space. Hotspot zones are labelled «المنطقة 1» through «المنطقة 5». `?debug=1` outlines those zones and logs each tap as a percentage of the picture without changing the score. Draw gold, silver, and bronze medals in SVG with the Arabic badge names. Meaningful images use the Arabic alt text; decorative icons are hidden from assistive tech

**Checkpoint**: Phone width, keyboard-only use, and debug outlines match the feature spec

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Package file list and the quickstart

- [x] T020 Run `npm run package` so `safety-challenge/imsmanifest.xml` lists `content.js`, `css/game.css`, `js/engine.js`, `js/app.js`, and `img/iso7010-m014.svg` in `dist/safety-challenge-scorm12.zip`
- [x] T021 Walk `specs/003-safety-challenge/quickstart.md` and fix only `safety-challenge/` files if a listed check fails

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup. Blocks every user story
- **User Stories (Phases 3–7)**: Depend on Foundational. US2 and US3 extend the US1 page. US4 checks the same content. US5 tightens CSS and keyboard behaviour
- **Polish (Phase 8)**: Depends on the stories you intend to ship

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational. No dependency on US2–US5
- **User Story 2 (P1)**: Starts after US1, because results follow the question loop
- **User Story 3 (P1)**: Numeric cases start after the engine exists. The timer-switch proof starts after US2 so score and lives are on the page
- **User Story 4 (P1)**: Content is written in T005. The reading-order pass starts after US1 renders questions
- **User Story 5 (P2)**: Starts after US1. It can proceed beside US2 if CSS and `app.js` edits are coordinated

### Within Each User Story

- T004 fails before T006
- Content (T005) and the failing test (T004) are different files and can be written together
- Engine (T006) comes before any screen
- T013 fails before T014
- US1 screens before results scoring
- Results scoring before the six-run browser proof

### Parallel Opportunities

- T003 and T001 can run together
- T004 and T005 can run together
- T007 can run beside the start of T008 until both must meet in the page
- T017 can run beside T016
- US5 CSS (T018) can run beside US2 if the editor avoids `app.js`

---

## Parallel Example: Foundational

```bash
# Together, before the engine exists:
Task: "Failing checks in tests/safety-engine.test.mjs"
Task: "window.CONTENT in safety-challenge/content.js"

# Then:
Task: "Implement safety-challenge/js/engine.js until node --test passes"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2
2. Complete Phase 3
3. Stop and play one attempt through to results or game over

### Incremental Delivery

1. Setup plus foundational rules
2. User Story 1: ten questions and feedback
3. User Story 2: points, badge, and recorded score
4. User Story 3: six published runs
5. User Story 4: verbatim Arabic on screen
6. User Story 5: 360 px, keyboard, and debug outlines
7. Package so the new files are in the zip

### Parallel Team Strategy

After Phase 2, one person can own `css/game.css` while another owns `js/app.js`. The engine file should have a single owner after T006.

---

## Notes

- [P] tasks use different files and do not depend on an unfinished task
- Do not rephrase Arabic
- The recorded score uses base points only. The time bonus is display-only
- Score numbers used by tests come from `specs/003-safety-challenge/contracts/engine.md`. Do not copy those formulas into the data model. The feature spec stays the learner-facing wording
- With the timer off, the hotspot ends only when all three hazards are found
- A finished hotspot scores `max(0, 100 - 10 * wrongTaps)` and is fully correct only at 100
- T002: the shell page already starts the learning-system session once. Do not call that start from `js/app.js`
- A Lighthouse accessibility score of at least 90 and one learning-system import stay on the constitution release checklist. They are not tasks in this feature. Keyboard completion is T019. Do not treat this task list as the full release gate
- Do not change the shared SCORM wrapper. Keep-best is applied in `app.js` before `SCORM.score`
- Commit after each task or logical group
- Stop at any checkpoint and check that story on its own

## Phase 9: Convergence

- [x] T022 In `safety-challenge/js/app.js`, when a hotspot hazard is found, show a numbered marker on that zone (1, then 2, then 3) as well as its explanation and the counter «المخاطر المكتشفة: {n} من 3» per US1 acceptance scenario 6 (partial)
