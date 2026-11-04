---

description: "Task list for SCORM 1.2 packages and the local call-order harness"
---

# Tasks: SCORM 1.2 packages and local call-order proof

**Input**: Design documents from `/specs/004-scorm-package/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included for the wrapper call order and for zip contents. The constitution requires those checks to fail before the code that makes them pass. Playing the harness is T013. Uploading to SCORM Cloud stays manual, as in quickstart.md.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Shared wrapper source is `shared/scorm12.js`. Sample copies are `feedback-scenario/js/scorm12.js` and `safety-challenge/js/scorm12.js`. Packaging is `scripts/package.mjs`. The harness is `scripts/scorm-harness.html` and must stay out of both zips. Automated checks live in `tests/`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing package scripts are the only Node step

- [x] T001 Confirm `package.json` still has `package` and `serve` and that `archiver` is the only dependency. Do not add a package. The new page for this feature is only `scripts/scorm-harness.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Make the shared wrapper log the required call order before any story depends on it

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests (write first) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T002 Add failing checks in `tests/scorm12.test.mjs` that a completed session follows the call log in `specs/004-scorm-package/data-model.md`, which is the method-level form of FR-007. Assert `init` does not commit, `finish` does not commit and does not set `cmi.core.exit`, a second `finish` does not call `LMSFinish`, and `pagehide` after finish does not call `LMSFinish` again. `beforeunload` uses that same finish and adds no extra method. With no API, `init` returns false and does not throw

### Implementation

- [x] T003 Update `shared/scorm12.js` until `node --test tests/scorm12.test.mjs` passes. Remove the commit inside `init`. In `finish`, set session time and call `LMSFinish("")` once, with no second commit and no `cmi.core.exit` write. Keep the no-API path as a log and return
- [x] T004 Copy `shared/scorm12.js` to `feedback-scenario/js/scorm12.js` and `safety-challenge/js/scorm12.js` with `scripts/sync-shared.mjs` so the packaged samples match the source

**Checkpoint**: The wrapper order matches `specs/004-scorm-package/contracts/wrapper.md`

---

## Phase 3: User Story 1 - Hand a learning system two importable courses (Priority: P1) 🎯 MVP

**Goal**: One package command writes both SCORM 1.2 archives with the right root description

**Independent Test**: Run `npm run package` and inspect both zips for root `imsmanifest.xml`, schema version 1.2, Arabic titles, identifiers, mastery 70 only on the safety zip, a complete file list, and no XSD or harness file

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T005 [US1] Add failing checks in `tests/manifest.test.mjs` that, after packaging, `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip` each have `imsmanifest.xml` at the archive root (not under a sample folder), `<schemaversion>1.2</schemaversion>`, every other packaged file listed, identifier `tp.samples.feedback-scenario` or `tp.samples.safety-challenge`, and titles «محادثة التغذية الراجعة: موقف قيادي» or «تحدّي السلامة في موقع العمل». The safety manifest contains `<adlcp:masteryscore>70</adlcp:masteryscore>` and the feedback manifest does not contain `masteryscore`. Neither zip contains a file ending in `.xsd` or a path containing `scorm-harness.html`

### Implementation for User Story 1

- [x] T006 [US1] Change `scripts/package.mjs` only where `node --test tests/manifest.test.mjs` still fails. Keep sync-then-zip, identifiers, titles, and mastery 70 only for `safety-challenge`. Do not add XSD files

**Checkpoint**: Both archives are importable descriptions of the two samples

---

## Phase 4: User Story 2 - Prove the learning-system call order without uploading (Priority: P1)

**Goal**: A local parent page shows every SCORM call and loads one sample

**Independent Test**: Open the harness for each sample, finish the activity, and read initialize, incomplete, score min/max/raw, lesson status, commit, session time, and one finish

### Tests for User Story 2 ⚠️

- [x] T007 [P] [US2] Add failing checks in `tests/harness.test.mjs` that `scripts/scorm-harness.html` defines `LMSInitialize`, `LMSSetValue`, `LMSGetValue`, `LMSCommit`, `LMSFinish`, `LMSGetLastError`, `LMSGetErrorString`, and `LMSGetDiagnostic` on `window.API`, includes a visible table and one iframe, loads `../safety-challenge/index.html` when the query is `sample=safety-challenge` and `../feedback-scenario/index.html` otherwise, and that the file path is not under `feedback-scenario/` or `safety-challenge/`

### Implementation for User Story 2

- [x] T008 [US2] Write `scripts/scorm-harness.html` until `node --test tests/harness.test.mjs` passes. Log every API call in the table before returning. `LMSGetValue("cmi.core.lesson_status")` returns `not attempted` until set. Initialize, set, commit, and finish return `"true"`. Last error returns `"0"`. Do not link this file from either sample

**Checkpoint**: The harness proves the order locally and is not inside either zip

---

## Phase 5: User Story 3 - Record the right score and still finish with no learning system (Priority: P2)

**Goal**: Reported scores and a lower retry stay on the published rules without copy changes

**Independent Test**: Map known totals to rounded percents, keep a lower retry from replacing score or status, and finish once with and without a learning system

### Tests for User Story 3 ⚠️

- [x] T009 [P] [US3] Add checks in `tests/safety-engine.test.mjs` that `lessonStatus(keepBest(80, 50))` is `passed` and `lessonStatus(keepBest(60, 80))` is `passed`, and in `tests/feedback-engine.test.mjs` that `keepBest(67, 50)` stays 67. Add a check in `tests/safety-engine.test.mjs` that the `report` function in `safety-challenge/js/app.js` passes the stored percent from `keepBest` into both `SCORM.score` and `E.lessonStatus`, so a lower later attempt cannot set `failed` over a stored `passed`. If the engine checks already pass, do not change `safety-challenge/js/engine.js` or `feedback-scenario/js/engine.js`

### Implementation for User Story 3

- [x] T010 [US3] In `feedback-scenario/js/app.js`, on debrief keep `SCORM.score(keepBest(best, round(points/30×100)))`, `SCORM.status("completed")`, and `SCORM.commit()`. In `safety-challenge/js/app.js`, on results or game over keep `SCORM.score(keepBest(best, round(base/1000×100)))` and `SCORM.status` from that stored percent (`passed` at 70 or above, otherwise `failed`). «إنهاء النشاط» calls `SCORM.finish()` once and shows «تم حفظ نتيجتك. يمكنك إغلاق هذه النافذة.» when `SCORM.isLMS()` is true, otherwise «انتهى النشاط. (وضع العرض: لا يوجد نظام إدارة تعلّم متصل.)». Do not change any other Arabic string or game rule

**Checkpoint**: Score, status, and the standalone message match the feature spec

---

## Phase 6: User Story 4 - Tell a reviewer how to build and what an upload should show (Priority: P3)

**Goal**: The README explains the package command and the expected registration result

**Independent Test**: Read the section and match it to the two zip names, the root manifest, and the statuses `completed`, `passed`, and `failed`

### Implementation for User Story 4

- [x] T011 [US4] Add a section titled `Build the SCORM package` to `README.md` in the English part and the same facts in the Arabic `dir="rtl"` part. Name `npm run package`, `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`, root `imsmanifest.xml`, schema version 1.2, mastery 70 only on the safety package, and the registration result: feedback `completed` plus score; safety `passed` or `failed` against 70. State that SCORM Cloud or Moodle upload is a manual check. Do not add GitHub Release commands

**Checkpoint**: A reviewer can rebuild the archives from the README alone

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Run the automated half of the quickstart

- [x] T012 Run `npm test` and `npm run package` from the repository root and confirm both zip files exist, per `specs/004-scorm-package/quickstart.md`. Do not upload either zip
- [x] T013 Follow the Harness steps in `specs/004-scorm-package/quickstart.md` for `scripts/scorm-harness.html` and `?sample=safety-challenge`. Confirm each log matches FR-007. Hide the page after finish and confirm `LMSFinish` is not called again. Open one sample with no harness and confirm «انتهى النشاط. (وضع العرض: لا يوجد نظام إدارة تعلّم متصل.)»

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup. Blocks all user stories because the packaged wrapper must already log the required order
- **User Story 1 (Phase 3)**: Depends on Foundational. No dependency on later stories
- **User Story 2 (Phase 4)**: Depends on Foundational. Independently testable from US1, but the zip exclusion of the harness is checked in US1
- **User Story 3 (Phase 5)**: Depends on Foundational. Uses the existing engines and screens
- **User Story 4 (Phase 6)**: Depends on US1 so the README describes the archives that command writes
- **Polish (Phase 7)**: Depends on the stories you include

### User Story Dependencies

- **User Story 1 (P1)**: After Foundational. MVP
- **User Story 2 (P1)**: After Foundational. Does not require README or score edits
- **User Story 3 (P2)**: After Foundational. Does not require the harness
- **User Story 4 (P3)**: After User Story 1

### Parallel Opportunities

- T007 can be written while T005 is written (different test files) after Phase 2
- T009 can run in parallel with T007
- T011 waits until the package command’s outputs are confirmed

### Parallel Example: User Story 2 and User Story 3

```bash
# After Phase 2, different files:
Task: "T007 tests/harness.test.mjs"
Task: "T009 tests/safety-engine.test.mjs and tests/feedback-engine.test.mjs"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2
2. Complete Phase 3
3. Stop and inspect both zips

### Incremental Delivery

1. Setup and wrapper order
2. Importable archives (MVP)
3. Local harness
4. Score and standalone confirmation
5. README section
6. `npm test` and `npm run package`

---

## Notes

- Write a failing check before the wrapper or packaging change that makes it pass
- Do not change learner-facing Arabic or scoring bands
- Do not automate a SCORM Cloud or Moodle upload
