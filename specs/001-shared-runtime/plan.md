# Implementation Plan: Shared sample shell

**Branch**: `001-shared-runtime` | **Date**: 2026-11-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-shared-runtime/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Stand up the two sample folders, a single shared shell, placeholder Arabic RTL pages, a bilingual landing stub, and a packaging step that copies the shell into each sample and writes SCORM 1.2 zips. Activity screens stay out of this feature. The session helper and experience logger are the published snippets from the build spec. Digit formatting, the label table, and the manifest file list are covered by failing automated checks before the code that makes them pass.

## Technical Context

**Language/Version**: HTML5, CSS, vanilla JavaScript (ES2018+). Node.js for packaging scripts only.

**Primary Dependencies**: npm package `archiver` as the only dependency. Google Fonts Cairo and Tajawal via a stylesheet link. No UI framework, bundler, or backend.

**Storage**: Files on disk. Learner state is not stored. Generated zips live in git-ignored `dist/`.

**Testing**: Node’s built-in test runner (`node --test`). No extra test library. Browser and phone checks for the placeholder pages stay manual, as in the build spec.

**Target Platform**: Static pages on GitHub Pages, Netlify, `file://`, and an LMS iframe. Packaging runs on the developer machine.

**Project Type**: Static bilingual portfolio site plus two self-contained sample folders.

**Performance Goals**: Placeholder pages readable at 360 px with no horizontal scroll. Motion at or under 300 ms. Package size is not a gate yet because this feature adds no images.

**Constraints**: Relative paths only. Logical CSS properties only. Western digits by default. SCORM wrapper no-ops without an API and calls `LMSFinish` once, including `pagehide` and `beforeunload`. `masteryscore` 70 only on the safety challenge. No credentials and no xAPI endpoint. Footer brand «نموذج تجريبي من إعداد Twin Particles» if a footer is shown.

**Scale/Scope**: Two placeholder samples, one shared source, one landing stub, two zip outputs. No decision UI, question UI, images, release, or LMS import in this feature.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Result |
|---|---|
| I. Verbatim Arabic, RTL, logical CSS, Western digits | Pass. Titles and the §6 label table are copied as written. `useArabicIndicDigits` defaults to false. |
| II. Content and engine stay separate; shared files copied; no fetch, no backend | Pass. Placeholders do not add `content.js` activity data. Shared source is `shared/`; samples get copies. |
| III. SCORM 1.2 zip, manifest at root, wrapper as specified, xAPI log only | Pass. Sample 1/2 score rules are not implemented here because result screens are out of scope. The wrapper still exposes `score`, `status`, `commit`, and `finish`. |
| IV. 360 px, 44 px targets, skip link, focus ring, reduced motion, contrast tokens | Pass for the shell. Live regions, drag alternatives, and the timer switch wait for activity screens. |
| V. Portfolio scope only | Pass. No Storyline, H5P, SCORM 2004, LRS, or English activity. |
| Stack | Pass. HTML, CSS, vanilla JS, `archiver` only. Preview server uses Node’s built-in HTTP module so no second package is added. |
| Test-first for programmable rules | Pass. Label table, digit formatting, mastery-score presence, and the manifest file list get failing checks first. |

Post-design re-check: still pass. Contracts do not add a backend, a framework, or an outbound call other than the font stylesheet and the SCORM API when an LMS provides it.

## Project Structure

### Documentation (this feature)

```text
specs/001-shared-runtime/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md             # /speckit-tasks, not this command
```

### Source Code (repository root)

```text
index.html
README.md
CREDITS.md
package.json
.gitignore
shared/
├── base.css
├── i18n.js
├── scorm12.js
└── xapi-stub.js
feedback-scenario/
├── index.html
├── css/base.css          # copy
└── js/                   # copies of i18n.js, scorm12.js, xapi-stub.js
safety-challenge/
├── index.html
├── css/base.css
└── js/
scripts/
├── sync-shared.mjs
└── package.mjs
media/
dist/                     # git-ignored
tests/
├── i18n.test.mjs
└── manifest.test.mjs
```

**Structure Decision**: Match build spec §10. `shared/` is the only source for the shell. `scripts/sync-shared.mjs` copies `base.css` into each sample’s `css/` and the three scripts into each sample’s `js/` before packaging. `scripts/package.mjs` rewrites `imsmanifest.xml` inside each sample and zips that folder’s contents to `dist/<name>-scorm12.zip`.

## Complexity Tracking

No constitution violations require justification.
