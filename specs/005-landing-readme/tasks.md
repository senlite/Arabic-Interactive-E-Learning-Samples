---

description: "Task list for the bilingual portfolio front door"
---

# Tasks: Bilingual portfolio front door

**Input**: Design documents from `/specs/005-landing-readme/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included. The constitution requires a failing check before the pages and markdown that make it pass. `node --test tests/landing-readme.test.mjs` is the automated gate. The 360 px browser pass in `specs/005-landing-readme/quickstart.md` stays manual. Do not run `git push`, Pages setup, or `gh release`.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Home page is `index.html` and `assets/landing.css`. Marker is `.nojekyll`. Guides are `README.md` and `CREDITS.md`. Automated checks are `tests/landing-readme.test.mjs`. Do not edit `feedback-scenario/` or `safety-challenge/`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Lock the file layout and keep the stack unchanged

- [x] T001 Confirm `package.json` gains no dependency and `Docs/TechnologyStack.md` stays as it is. The only new paths for this feature are `index.html`, `assets/landing.css`, `.nojekyll`, `README.md`, `CREDITS.md`, and `tests/landing-readme.test.mjs`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add the text-test file and the Pages marker every later check assumes

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests (write first) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T002 Add `tests/landing-readme.test.mjs` using `node:test` and `node:fs` so it reads the repository root. One check asserts `.nojekyll` exists and is an empty file. Run `node --test tests/landing-readme.test.mjs` and confirm that check fails before T003

### Implementation

- [x] T003 Add an empty `.nojekyll` at the repository root so the T002 check passes

**Checkpoint**: `node --test tests/landing-readme.test.mjs` passes the marker check only

---

## Phase 3: User Story 1 - Choose a sample from the front door (Priority: P1) 🎯 MVP

**Goal**: A left-to-right home page with two Arabic cards, try links, Release v1.0 placeholders, and the workflow note

**Independent Test**: Open `index.html` and confirm the heading, two cards, `./feedback-scenario/` and `./safety-challenge/`, download URLs that contain `<account>` and `releases/download/v1.0/`, and the Claude / Cursor / phone note, without answering either activity

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T004 [US1] Extend `tests/landing-readme.test.mjs` with failing checks for `specs/005-landing-readme/contracts/home-page.md`: `index.html` has `lang="en"` and `dir="ltr"`; the visible heading is `Arabic Interactive E-Learning Samples / نماذج تعلّم تفاعلي باللغة العربية`; the Arabic heading half is an element with `lang="ar"` and `dir="rtl"`; stylesheet href is `assets/landing.css`; feedback title `محادثة التغذية الراجعة: موقف قيادي` and description `موقف من ثلاث قرارات حول إعطاء التغذية الراجعة` are `lang="ar"` `dir="rtl"` with try href `./feedback-scenario/`; safety title `تحدّي السلامة في موقع العمل` and description `عشرة أسئلة عن السلامة في موقع العمل` are `lang="ar"` `dir="rtl"` with try href `./safety-challenge/`; both try labels are `جرّب النموذج` on `lang="ar"` `dir="rtl"`; both download labels are `Download SCORM 1.2` with hrefs `https://github.com/<account>/arabic-elearning-samples/releases/download/v1.0/feedback-scenario-scorm12.zip` and `https://github.com/<account>/arabic-elearning-samples/releases/download/v1.0/safety-challenge-scorm12.zip`; hrefs contain the characters `<account>` and do not start with `./` or `/dist/`; the page text includes Claude, Cursor, phone, and `learning system`. Confirm these checks fail before T005

### Implementation for User Story 1

- [x] T005 [US1] Create `index.html` to satisfy T004. Document language `en`, document direction `ltr`. No JavaScript. Two cards, feedback first
- [x] T006 [US1] Create `assets/landing.css` with background `#F7F8FA`, text `#1F2937`, primary `#0F766E`, body text at least 16 px, no letter-spacing on Arabic, and try and download controls at least 44 px by 44 px. Link it from `index.html` with the relative href `assets/landing.css`

**Checkpoint**: The T004 checks pass. Samples are still unopened

---

## Phase 4: User Story 2 - Read how to run, package, and show the work (Priority: P1)

**Goal**: English guide first, then the same topics in Arabic, including GIF links that may 404

**Independent Test**: Read `README.md` top to bottom and find all seven topics in English and again inside `<div dir="rtl" lang="ar">`, without opening an activity

### Tests for User Story 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T007 [US2] Extend `tests/landing-readme.test.mjs` with failing checks for the readme half of `specs/005-landing-readme/contracts/readme-and-credits.md`: in `README.md`, English prose contains `feedback scenario` and `safety challenge` before the first `<div dir="rtl" lang="ar">`; that div contains `محادثة التغذية الراجعة` and `تحدّي السلامة في موقع العمل`; both the English body and the Arabic div contain `https://<account>.github.io/arabic-elearning-samples/`, `feedback-scenario/`, `safety-challenge/`, `npm run package`, `SCORM Cloud` before `Moodle`, `Claude`, `Cursor`, `media/feedback-scenario.gif`, and `media/safety-challenge.gif`. The English body must contain `open index.html`. The Arabic div must contain `index.html`. Confirm these checks fail before T008

### Implementation for User Story 2

- [x] T008 [US2] Write `README.md` so T007 passes. English first. One `<div dir="rtl" lang="ar">` for the Arabic guide. Do not add the publish command block in this task. Do not create the GIF files

**Checkpoint**: Both languages cover the seven topics. Recording files may still be absent

---

## Phase 5: User Story 3 - See sources and licences (Priority: P2)

**Goal**: Every image, typeface, and library from the asset table has a source and a licence

**Independent Test**: Open `CREDITS.md` and match cover, ISO 7010 M014, one badge, Cairo, and SortableJS to `specs/005-landing-readme/data-model.md`

### Tests for User Story 3 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T009 [US3] Extend `tests/landing-readme.test.mjs` with failing checks that `CREDITS.md` contains rows for `feedback-scenario/img/cover.webp`, `feedback-scenario/img/ahmed.webp`, `feedback-scenario/img/sara.webp`, `feedback-scenario/img/end-best.webp`, `feedback-scenario/img/end-ok.webp`, `feedback-scenario/img/end-poor.webp`, `safety-challenge/img/warehouse.webp`, `safety-challenge/img/iso7010-m014.svg` with `https://commons.wikimedia.org/wiki/File:ISO_7010_M014.svg` and public domain, `safety-challenge/img/badge-gold.svg`, `safety-challenge/img/badge-silver.svg`, `safety-challenge/img/badge-bronze.svg`, Cairo and Tajawal with Open Font License, OpenMoji with CC BY-SA 4.0, and SortableJS with MIT. If OpenMoji or SortableJS is unused, the row must contain `not used`. Each generated-image row must include a tool name and the word `prompt`. Confirm these checks fail before T010

### Implementation for User Story 3

- [x] T010 [P] [US3] Write `CREDITS.md` as one table so T009 passes. Mark OpenMoji and SortableJS `not used` when those files or libraries are absent. Record the tool and the prompt on each generated-image row

**Checkpoint**: A five-row spot check matches the data model

---

## Phase 6: User Story 4 - Publish without this feature doing the publish (Priority: P2)

**Goal**: The owner can copy exact commands. This feature does not run them

**Independent Test**: Read the fenced block in `README.md` and confirm push, Pages from `main` at `/`, and Release v1.0 with both zips. Confirm the remote was not updated by this task

### Tests for User Story 4 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T011 [US4] Extend `tests/landing-readme.test.mjs` with failing checks that `README.md` contains a fenced block with `git push -u origin main`, a `gh api` invocation that sets Pages `build_type` to `legacy`, `source.branch` to `main`, and `source.path` to `/`, and `gh release create v1.0` with `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`. Confirm these checks fail before T012

### Implementation for User Story 4

- [x] T012 [US4] Add that fenced block to `README.md` so T011 passes. Do not execute `git push`, `gh api`, or `gh release`

**Checkpoint**: Commands are documented. Pages and releases are unchanged

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Prove the samples were not edited, then run the manual layout check

- [x] T013 Add a check in `tests/landing-readme.test.mjs` that `feedback-scenario/index.html` and `safety-challenge/index.html` still contain `نموذج تجريبي من إعداد Twin Particles`. Do not assert a git diff from this test. Screens and scores stay a manual look during T014, by opening each sample and leaving it without answering
- [x] T014 Follow the browser steps in `specs/005-landing-readme/quickstart.md` at 360 px width: no horizontal scroll, try and download controls at least 44 px by 44 px, text contrast at least 4.5:1. Do not create the release

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup. Blocks all stories
- **User Stories (Phase 3+)**: Depend on Foundational
- **Polish (Phase 7)**: Depends on the stories you intend to ship

### User Story Dependencies

- **User Story 1 (P1)**: After Phase 2. No dependency on other stories
- **User Story 2 (P1)**: After Phase 2. Independent of the home page
- **User Story 3 (P2)**: After Phase 2. Independent of the home page and the readme. T009 edits the same test file as T007 and is not parallel with it. Write T007 before T009 if both land in one sitting
- **User Story 4 (P2)**: After User Story 2, because T012 edits `README.md` created in T008

### Within Each User Story

- Tests fail before the file that makes them pass
- Do not run publish commands

### Parallel Opportunities

- T009 is not parallel. It shares `tests/landing-readme.test.mjs` with T007, so finish T007 first. T010 (`CREDITS.md`) can then run beside T008 (`README.md`)
- T005 and T006 are sequential: the page links the stylesheet
- T010 (`CREDITS.md`) can run in parallel with T008 (`README.md`) after T007 and T009 exist

---

## Parallel Example: User Story 2 and User Story 3

```bash
# After T007 and T009 are in tests/landing-readme.test.mjs:
Task: "Write README.md so T007 passes"
Task: "Write CREDITS.md so T009 passes"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2
2. Complete Phase 3 (home page)
3. Stop and open `index.html` using the User Story 1 independent test

### Incremental Delivery

1. Home page (US1) is the public front door
2. Bilingual readme (US2) is the second P1 deliverable
3. Credits (US3) and the unpublished command block (US4) complete the portfolio pack
4. T014 is the phone-width gate before calling the front door done

### Parallel Team Strategy

After Phase 2, one person can build `index.html` while another writes the failing readme and credits checks, then fills `README.md` and `CREDITS.md` in parallel.

---

## Notes

- [P] tasks use different files and do not include the shared test file
- Do not record GIFs, do not retouch activity copy, and do not publish
- Verify each new test fails before its implementation task
