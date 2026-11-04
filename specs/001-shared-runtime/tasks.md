---

description: "Task list for the shared sample shell"
---

# Tasks: Shared sample shell

**Input**: Design documents from `/specs/001-shared-runtime/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Included for programmable rules (label table, digit formatting, SCORM session, manifest file list, mastery score), as required by the constitution. Write each test so it fails before the implementation that makes it pass.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Repository root holds `index.html`, `shared/`, `feedback-scenario/`, `safety-challenge/`, `scripts/`, `tests/`, `media/`, and git-ignored `dist/`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Folders, ignore rules, and the only allowed package

- [x] T001 Create `feedback-scenario/`, `safety-challenge/`, `shared/`, `scripts/`, `media/`, and `tests/` at the repository root
- [x] T002 Add `package.json` with `archiver` as the only devDependency and scripts `package` (`node scripts/package.mjs`) and `serve` (`node scripts/serve.mjs`)
- [x] T003 [P] Add `.gitignore` ignoring `node_modules/` and `dist/`
- [x] T004 [P] Add stub `README.md` (English and Arabic headings) and stub `CREDITS.md` stating image and font attribution is still to be filled

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Copy the shared shell into both samples before any story relies on those copies

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Implement `scripts/sync-shared.mjs` so it copies each of `shared/base.css`, `shared/i18n.js`, `shared/scorm12.js`, and `shared/xapi-stub.js` that exists into `feedback-scenario/` and `safety-challenge/` (`base.css` under `css/`, the scripts under `js/`), creating directories as needed. Skip a source that is not created yet. Exit non-zero only when the destination sample folder is missing.

**Checkpoint**: Shared copies can be refreshed. User stories can begin.

---

## Phase 3: User Story 1 - Open a sample as Arabic, right to left (Priority: P1) 🎯 MVP

**Goal**: Each sample page is Arabic, right to left, titled, and readable at 360 px

**Independent Test**: Open each sample page and confirm `lang="ar"`, `dir="rtl"`, the agreed title, no horizontal scroll at 360 px, a skip link, and a 3 px focus ring

### Implementation for User Story 1

- [x] T006 [P] [US1] Write `shared/base.css` with logical properties only, tokens background `#F7F8FA`, primary `#0F766E`, warning `#B45309`, success `#15803D`, error `#B91C1C`, text `#1F2937`, body at least 16 px, no Arabic letter-spacing, 44 px minimum targets, 3 px `:focus-visible` ring, skip-link styles, and motion at or under 300 ms that is removed when `prefers-reduced-motion: reduce`
- [x] T007 [US1] Run `node scripts/sync-shared.mjs` so both samples receive `css/base.css`
- [x] T008 [P] [US1] Write `feedback-scenario/index.html` with `lang="ar"` `dir="rtl"`, charset, viewport `width=device-width, initial-scale=1`, Cairo and Tajawal stylesheet plus fallback stack `'Cairo', 'Tajawal', 'Noto Sans Arabic', Tahoma, sans-serif`, relative links to `css/base.css`, `js/i18n.js`, `js/scorm12.js`, and `js/xapi-stub.js`, a skip link «تخطَّ إلى المحتوى», and a main heading «محادثة التغذية الراجعة: موقف قيادي»
- [x] T009 [P] [US1] Write `safety-challenge/index.html` with the same shell as T008 and main heading «تحدّي السلامة في موقع العمل»

**Checkpoint**: Both placeholder pages open as Arabic RTL without packaging

---

## Phase 4: User Story 2 - Package both samples for a learning system (Priority: P1)

**Goal**: One command produces two SCORM 1.2 zips with the manifest at the archive root and mastery score 70 only on the safety sample

**Independent Test**: `npm run package` creates both zips; each lists every packaged file; only the safety manifest contains mastery score 70

### Tests for User Story 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T010 [P] [US2] Add failing checks in `tests/manifest.test.mjs` that a generated manifest lists every file placed in the sample except `imsmanifest.xml` itself, uses identifier `tp.samples.feedback-scenario` or `tp.samples.safety-challenge`, sets the sample title, points the SCO at `index.html`, includes `<adlcp:masteryscore>70</adlcp:masteryscore>` only when the sample id is `safety-challenge`, and that packaging exits non-zero when a sample folder or required shared file is missing

### Implementation for User Story 2

- [x] T011 [US2] Implement `scripts/package.mjs` so it runs the shared copy, writes `imsmanifest.xml` in each sample from the files present after the copy using the §8.2 SCORM 1.2 shape, zips each sample’s contents (not the folder) to `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`, and fails without a successful zip if a sample folder or required shared file is missing. Exit non-zero, and do not leave a successful zip, if `shared/base.css`, `shared/i18n.js`, `shared/scorm12.js`, or `shared/xapi-stub.js` is missing.

**Checkpoint**: Both archives import as single-SCO packages. Activity screens are still absent.

---

## Phase 5: User Story 3 - Behave correctly with and without a learning system (Priority: P2)

**Goal**: The session helper no-ops without an API and finishes exactly once when an API exists

**Independent Test**: Load `shared/scorm12.js` under `node --test` with a stand-in API and with no API

### Tests for User Story 3 ⚠️

- [x] T012 [P] [US3] Add failing checks in `tests/scorm12.test.mjs` that with no API `init` returns false, logs standalone mode, and does not throw; with an API `init` calls `LMSInitialize("")` once and sets `cmi.core.lesson_status` to `incomplete` when status is empty or `not attempted`; `score` sets min `0`, max `100`, and a rounded raw value; `finish` records session time, sets exit to empty, commits, and calls `LMSFinish("")` once; a second `finish` or `finish` before start does not call `LMSFinish`; `pagehide` and `beforeunload` invoke finish

### Implementation for User Story 3

- [x] T013 [US3] Add `shared/scorm12.js` as the §8.3 wrapper (`window.SCORM` with `init`, `set`, `score`, `status`, `commit`, `finish`, `isLMS`) and call `SCORM.init()` from `feedback-scenario/index.html` and `safety-challenge/index.html` on load
- [x] T014 [US3] Re-run `node scripts/sync-shared.mjs` so both samples receive `js/scorm12.js`

**Checkpoint**: A page with no learning system stays usable and logs `[SCORM] standalone mode`

---

## Phase 6: User Story 4 - Share one Arabic label set and Western digits (Priority: P2)

**Goal**: Both samples share the §6 strings, and numbers use Western digits unless Arabic-Indic digits are switched on

**Independent Test**: `node --test tests/i18n.test.mjs`

### Tests for User Story 4 ⚠️

- [x] T015 [P] [US4] Add failing checks in `tests/i18n.test.mjs` that `window.UI` keys are exactly `start`, `next`, `continue`, `retry`, `finish`, `saved`, `saved_standalone`, `points`, `question_of`, `decision_of`, `lives`, `time`, `loading`, `skip_link` with the §6 Arabic values including «تم حفظ نتيجتك. يمكنك إغلاق هذه النافذة.» and «انتهى النشاط. (وضع العرض: لا يوجد نظام إدارة تعلّم متصل.)», that `useArabicIndicDigits` defaults to false, that `formatNumber` returns Western digits `0-9` by default, that it returns Arabic-Indic digits `٠-٩` when the flag is true, and that `formatNumber` returns a non-numeric value unchanged without throwing

### Implementation for User Story 4

- [x] T016 [US4] Implement `shared/i18n.js` exposing `window.UI` and `formatNumber` per `tests/i18n.test.mjs` and `specs/001-shared-runtime/data-model.md`
- [x] T017 [US4] Re-run `node scripts/sync-shared.mjs` so both samples receive `js/i18n.js`, and point the skip link text in `feedback-scenario/index.html` and `safety-challenge/index.html` at `UI.skip_link`

**Checkpoint**: Label strings match the build spec with no rewording

---

## Phase 7: User Story 5 - Bilingual entry point and local experience log (Priority: P3)

**Goal**: A landing placeholder links to both samples, and experience statements stay on the machine

**Independent Test**: Open `/` and follow both links. `XAPI.send('attempted')` logs a statement and does not request a network endpoint.

### Tests for User Story 5 ⚠️

- [x] T018 [P] [US5] Add failing checks in `tests/xapi-stub.test.mjs` that `endpoint` is `null`, `send` returns a statement with `actor`, `verb.id` under `http://adlnet.gov/expapi/verbs/`, `object`, and `timestamp`, and that `send` does not call `fetch`

### Implementation for User Story 5

- [x] T019 [US5] Add `shared/xapi-stub.js` as the §8.5 logger (`window.XAPI.endpoint === null`, `send(verb, extra)` logs and returns the statement)
- [x] T020 [US5] Re-run `node scripts/sync-shared.mjs` so both samples receive `js/xapi-stub.js`
- [x] T021 [US5] Write root `index.html` as a bilingual placeholder linking to `feedback-scenario/index.html` and `safety-challenge/index.html` in Arabic and English, without final marketing copy

**Checkpoint**: A visitor can open both samples from the site root, and the experience logger has no destination and no credentials

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Local preview and the quickstart checklist

- [x] T022 Implement `scripts/serve.mjs` with Node’s built-in `http` module serving the repository root so `/`, `/feedback-scenario/`, and `/safety-challenge/` open, with no npm package besides `archiver`
- [x] T023 Run `node --test` and `npm run package`, then follow `specs/001-shared-runtime/quickstart.md` in the browser at 360 px width

---

## Phase 9: Convergence

- [x] T024 CRITICAL: Replace physical `padding` shorthands in `shared/base.css` with logical `padding-block` and `padding-inline`, then copy the file into both samples with `scripts/sync-shared.mjs`, per Constitution I and FR-003 (partial)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup. Blocks every user story that copies shared files
- **User stories (Phases 3–7)**: Depend on Foundational. US1 and US2 are both P1; do US1 before US2 so the pages exist to package. US3, US4, and US5 can follow in that order
- **Polish (Phase 8)**: Depends on the stories you intend to show

### User Story Dependencies

- **User Story 1 (P1)**: After Phase 2. No other story required
- **User Story 2 (P1)**: After Phase 2 and US1 pages, so the zips contain the placeholder entry
- **User Story 3 (P2)**: After Phase 2. Pages from US1 should already load `js/scorm12.js`
- **User Story 4 (P2)**: After Phase 2. Independent of the session helper
- **User Story 5 (P3)**: After Phase 2. Landing page only needs the two sample folders

### Within Each User Story

- Tests, when listed, are written and failing before the implementation task that follows them
- Shared source is edited under `shared/`, then `scripts/sync-shared.mjs` is run so samples do not become a second source

### Parallel Opportunities

- T003 and T004 can run in parallel after T001
- T008 and T009 can run in parallel after T006
- T010, T012, T015, and T018 touch different test files and can be written in parallel once their story phase has started
- T006 is the only CSS file; do not edit it in parallel with another CSS task

---

## Parallel Example: User Story 1

```bash
# After shared/base.css exists and has been copied:
# Write both placeholder pages together
Task: "feedback-scenario/index.html"
Task: "safety-challenge/index.html"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Phase 1 and Phase 2
2. Complete Phase 3 (Arabic RTL placeholders)
3. Stop and open both pages at 360 px

### Incremental Delivery

1. Add Phase 4 so `npm run package` produces two valid zips
2. Add Phase 5 so the session helper is safe with and without a learning system
3. Add Phase 6 so labels and digits are shared
4. Add Phase 7 so the landing page and local experience log exist
5. Run Phase 8 before calling the shell done

### Parallel Team Strategy

After Phase 2, one person can take the pages (US1) and another can draft the manifest tests (US2). Do not package until the placeholder pages exist.

---

## Notes

- [P] tasks use different files and do not depend on an unfinished task
- Do not build decision screens, question screens, images, a release, or an LMS import in this list
- Footer text, if a footer is added, stays «نموذج تجريبي من إعداد Twin Particles»
