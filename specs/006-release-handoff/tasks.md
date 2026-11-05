---

description: "Task list for the release handoff"
---

# Tasks: Release handoff

**Input**: Design documents from `/specs/006-release-handoff/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included. The constitution requires a failing check before the package and documentation edits that make it pass. `node --test tests/manifest.test.mjs tests/landing-readme.test.mjs` is the automated gate. The browser pass in `specs/006-release-handoff/contracts/smoke-path.md` stays manual. Do not run `git push`, Pages settings, or `gh release`.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Packaging is `scripts/package.mjs`. Home page is `index.html`. Marker is `.nojekyll`. Guides are `README.md` and `CREDITS.md`. Automated checks are `tests/manifest.test.mjs` and `tests/landing-readme.test.mjs`. Edit `feedback-scenario/` or `safety-challenge/` only when a smoke-path defect in that folder matches the allowed fix list.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Keep the stack and the file set unchanged except for the handoff edits

- [x] T001 Confirm `package.json` gains no dependency and `Docs/TechnologyStack.md` stays as it is. Allowed edits are `scripts/package.mjs`, `index.html`, `README.md`, `CREDITS.md`, `.nojekyll` only if it is missing or non-empty, `tests/manifest.test.mjs`, `tests/landing-readme.test.mjs`, and a sample folder only for a smoke-path defect

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Keep the existing package and landing checks as the files this feature extends

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Run `node --test tests/manifest.test.mjs tests/landing-readme.test.mjs` and leave both files as the extension points. Do not add a new test runner. `tests/manifest.test.mjs` remains the package contract file. `tests/landing-readme.test.mjs` remains the `.nojekyll`, home page, and readme contract file

**Checkpoint**: Both existing test files pass before any new assertion is added

---

## Phase 3: User Story 1 - Package both samples for a learning system (Priority: P1) 🎯 MVP

**Goal**: `npm run package` writes exactly two SCORM 1.2 zips and does not treat a failed run as success

**Independent Test**: From a prepared root, `packageSamples` replaces `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`, each with `imsmanifest.xml` at the archive root. A missing shared file throws `Missing shared file: …`, leaves no `dist/*.zip.partial`, and does not replace a previous final zip

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T003 [US1] Extend `tests/manifest.test.mjs` with failing checks for `specs/006-release-handoff/contracts/package-run.md`. On a temp root that already has both final zips with known bytes, calling `packageSamples` when `shared/base.css` is absent throws an error whose message includes `Missing shared file: base.css`, leaves those final zip bytes unchanged, and leaves no file matching `dist/*.zip.partial`. A successful call still writes only `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`, and each archive lists `imsmanifest.xml` at the archive root. Run `node --test tests/manifest.test.mjs` and confirm the new failure checks fail before T004

### Implementation for User Story 1

- [x] T004 [US1] Update `scripts/package.mjs` so `packageSamples` writes `dist/<id>-scorm12.zip.partial` and renames both to `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip` only after both archives close. On any throw, delete every `dist/*.zip.partial`, do not rename, and leave previous final zips in place. The CLI path still prints `error.message` and sets exit code 1. Manifest rules, scores, and `scripts/scorm-harness.html` stay unchanged

**Checkpoint**: `node --test tests/manifest.test.mjs` passes. A second successful `npm run package` overwrites the same two paths

---

## Phase 4: User Story 2 - Open the public site without broken sample paths (Priority: P1)

**Goal**: An empty `.nojekyll` stays at the repository root and sample paths stay relative

**Independent Test**: `.nojekyll` exists and is 0 bytes. This feature does not change GitHub Pages settings

### Tests for User Story 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T005 [US2] In `tests/landing-readme.test.mjs`, keep or add a check that `.nojekyll` at the repository root exists and has byte length 0. If that check already passes, do not weaken it. Confirm it fails if the file is deleted, then restore the file before T006

### Implementation for User Story 2

- [x] T006 [US2] Confirm `.nojekyll` at the repository root is an empty file. Do not edit GitHub Pages settings. Do not change try hrefs `./feedback-scenario/` and `./safety-challenge/` in `index.html`

**Checkpoint**: The empty-marker check in `tests/landing-readme.test.mjs` passes

---

## Phase 5: User Story 3 - Finish each sample on the main path (Priority: P1)

**Goal**: Both main paths finish at desktop width and at 360 px with right-to-left layout and no page console errors

**Independent Test**: Follow `specs/006-release-handoff/contracts/smoke-path.md`. Feedback reaches the debrief. Safety reaches results or game over. A clipped primary control or a page console error fails the story

### Implementation for User Story 3

- [x] T007 [P] [US3] Play `feedback-scenario/` at a window at least 1024 px wide and at 360 px wide per `specs/006-release-handoff/contracts/smoke-path.md`. Document `dir="rtl"`. If a primary control is clipped, the page forces horizontal scroll, navigation breaks, an asset is missing, or the page throws a script error before the debrief, fix only that defect under `feedback-scenario/`. Do not change learner-facing Arabic or game rules
- [x] T008 [P] [US3] Play `safety-challenge/` at a window at least 1024 px wide and at 360 px wide per `specs/006-release-handoff/contracts/smoke-path.md`. Document `dir="rtl"`. If a primary control is clipped, the page forces horizontal scroll, navigation breaks, an asset is missing, or the page throws a script error before results or game over, fix only that defect under `safety-challenge/`. Do not change learner-facing Arabic or game rules

**Checkpoint**: Both paths finish at both widths with no page console error. If no defect was found, both sample folders are unchanged

---

## Phase 6: User Story 4 - Follow the readme and credits without asking the author (Priority: P2)

**Goal**: English then Arabic readme states the handoff facts, and credits stay limited to attributed sources

**Independent Test**: Read `README.md` and `CREDITS.md` and find every point in `specs/006-release-handoff/contracts/handoff-docs.md` without opening an activity

### Tests for User Story 4 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T009 [US4] Extend `tests/landing-readme.test.mjs` with failing checks for the readme rows in `specs/006-release-handoff/contracts/handoff-docs.md`. `README.md` contains `https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/feedback-scenario/`, `https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/safety-challenge/`, `npm run package`, `dist/feedback-scenario-scorm12.zip`, `dist/safety-challenge-scorm12.zip`, `completed`, `passed`, `failed`, and `70`. The Arabic block is a `<div dir="rtl">` whose text is Arabic and is not a copy of the English paragraphs. The file does not contain a sentence that a SCORM Cloud registration report is already in the repo. `CREDITS.md` still has a source and a licence for each existing image, font, and library row. `feedback-scenario/index.html` and `safety-challenge/index.html` still contain `نموذج تجريبي من إعداد Twin Particles`. Confirm the new readme URL checks fail before T010

### Implementation for User Story 4

- [x] T010 [US4] Update `README.md` so English comes first and the same points follow in Arabic inside `<div dir="rtl">`: what each sample is, the two senlite live URLs, how to run locally, `npm run package` and both zip names, the intended SCORM Cloud SCORM 1.2 check (feedback `completed` plus score; safety `passed` or `failed` against 70) without claiming that run already happened, and the note that Claude wrote the script, Cursor wrote the code, and manual checks were on a phone and in a learning system. Keep the git and `gh` commands that push `main`, enable Pages from the `main` branch root, and create Release v1.0 with both dist zips. Do not run those commands. Links to `media/*.gif` may stay even if the files are absent
- [x] T011 [P] [US4] Read `CREDITS.md`. Add a source and a licence only for an image, font, or library the requirements already attribute and the file omits. Do not invent contributors

**Checkpoint**: The T009 checks pass. A reader of `README.md` can package and can say what a SCORM 1.2 import should record

---

## Phase 7: User Story 5 - Leave the landing page one edit from the release (Priority: P2)

**Goal**: Card package links point at the relative `dist/` zips, and one comment holds the release page

**Independent Test**: Open `index.html` and follow both try links and both package links. One `RELEASE_PAGE` comment is the only release URL

### Tests for User Story 5 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T012 [US5] Extend `tests/landing-readme.test.mjs` with failing checks for `specs/006-release-handoff/contracts/handoff-docs.md`. `index.html` keeps the bilingual heading and exactly two cards. Try hrefs stay `./feedback-scenario/` and `./safety-challenge/`. Download hrefs are `./dist/feedback-scenario-scorm12.zip` and `./dist/safety-challenge-scorm12.zip`. Exactly one HTML comment contains `RELEASE_PAGE` and `https://github.com/senlite/Arabic-Interactive-E-Learning-Samples/releases/tag/v1.0`. Confirm these checks fail before T013

### Implementation for User Story 5

- [x] T013 [US5] Update the two download hrefs in `index.html` to `./dist/feedback-scenario-scorm12.zip` and `./dist/safety-challenge-scorm12.zip`. Add one HTML comment marked `RELEASE_PAGE` with `https://github.com/senlite/Arabic-Interactive-E-Learning-Samples/releases/tag/v1.0`. Leave the heading, card copy, and try links as they are

**Checkpoint**: The T012 checks pass. Unknown release asset URLs do not block the relative `dist/` links

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Run the quickstart gate across the stories

- [x] T014 Run `node --test tests/manifest.test.mjs tests/landing-readme.test.mjs` and `npm run package` as in `specs/006-release-handoff/quickstart.md`. Confirm both zip names, a root `imsmanifest.xml` in each, an empty `.nojekyll`, and that no git or `gh` publish command was executed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup. Blocks every user story
- **User Stories (Phase 3+)**: Depend on Foundational. US1, US2, and US3 can proceed in parallel. US4 and US5 both edit `tests/landing-readme.test.mjs`, so US5 starts after US4’s test edits
- **Polish (Phase 8)**: Depends on the stories included in the handoff

### User Story Dependencies

- **User Story 1 (P1)**: After Phase 2. No dependency on other stories
- **User Story 2 (P1)**: After Phase 2. No dependency on US1
- **User Story 3 (P1)**: After Phase 2. No dependency on US1 or US2
- **User Story 4 (P2)**: After Phase 2. Independently readable. Shares `tests/landing-readme.test.mjs` with US2 and US5, so apply its test edit after T005
- **User Story 5 (P2)**: After T009, because it extends the same test file. The home page change does not require the package script

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- US3 has no new Node test; the contract is the manual smoke path
- Story complete before the next priority when one person is doing the work

### Parallel Opportunities

- T007 and T008 touch different sample folders
- T010 and T011 touch `README.md` and `CREDITS.md`
- US1 (`tests/manifest.test.mjs`, `scripts/package.mjs`) can run beside US3

---

## Parallel Example: User Story 3

```bash
# Two sample folders, after Phase 2:
Task: "Play feedback-scenario/ per specs/006-release-handoff/contracts/smoke-path.md"
Task: "Play safety-challenge/ per specs/006-release-handoff/contracts/smoke-path.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2
2. Complete Phase 3 (failing package checks, then `scripts/package.mjs`)
3. Stop and run `node --test tests/manifest.test.mjs`

### Incremental Delivery

1. Setup and foundation
2. User Story 1: trustworthy packages
3. User Story 2: empty `.nojekyll`
4. User Story 3: main-path smoke
5. User Story 4: readme and credits
6. User Story 5: relative `dist/` links and one release placeholder
7. Phase 8 quickstart

### Parallel Team Strategy

After Phase 2, one person can take `scripts/package.mjs` (US1), another the two sample smoke paths (US3). Readme and landing test edits stay with one person because they share `tests/landing-readme.test.mjs`.

---

## Notes

- [P] tasks use different files
- [US] labels map to spec.md stories in that order
- Do not rewrite learner-facing Arabic, scores, or game rules
- Do not run `git push`, enable Pages, or `gh release create`
- Commit after each task or logical group only when the user asks for a commit
