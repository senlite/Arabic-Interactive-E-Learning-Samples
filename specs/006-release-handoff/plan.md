# Implementation Plan: Release handoff

**Branch**: `006-release-handoff` | **Date**: 2026-11-05 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/006-release-handoff/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Finish the handoff the packaging and landing features left open. The package command still writes exactly `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`, each with `imsmanifest.xml` at the archive root, and a second success overwrites those two files. A skipped shared sync or a sample failure is named on stderr and exits non-zero; a half-written zip is not left behind as this run’s output. The home page keeps its bilingual heading and two cards, points package links at the relative `dist/` zips, and isolates the Release v1.0 page address in one marked placeholder. The readme states the senlite Pages URLs, the SCORM 1.2 check (feedback `completed` plus score; safety `passed` or `failed` against 70), and does not claim a SCORM Cloud run. Smoke fixes are limited to defects on the main path at desktop width and at 360 px. Learner-facing Arabic and game rules stay unchanged. Pages, the GitHub Release, and zip upload stay manual.

## Technical Context

**Language/Version**: HTML5, CSS, vanilla JavaScript (ES2018+). Node.js for `npm run package` and `node --test` only.

**Primary Dependencies**: Existing npm package `archiver`. No new package.

**Storage**: Static files at the repository root. Zips stay in git-ignored `dist/`. Scores stay in memory. No backend.

**Testing**: Node’s built-in test runner. Package failure and landing/readme text contracts get a failing check before the edit that makes it pass. Main-path layout and the browser console are a manual check at a desktop-width window and at 360 px. SCORM Cloud, phone hardware, and `gh` publish commands are not run.

**Target Platform**: Repository root served later by GitHub Pages from `main`, plus local static open. Relative paths. Public base, once a person enables Pages: `https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/`.

**Project Type**: Static portfolio handoff: packaging behaviour, one home-page link change, readme and credits check, smoke-path fixes only.

**Performance Goals**: One package command replaces both archives. A reviewer can follow the readme to package and know what to import without asking the author. Ready by end of Friday 6 November 2026.

**Constraints**: SCORM 1.2 only. Manifest at zip root. Do not change manifest rules, scores, the local harness, learner-facing Arabic, or game rules. Do not change GitHub Pages settings. Do not run git push, Pages enablement, or `gh release`. Empty `.nojekyll` stays. Footer stays «نموذج تجريبي من إعداد Twin Particles». GIF files may be absent. Package size should stay at or under 5 MB.

**Scale/Scope**: Two zips, one empty marker, two landing package links, one release-page placeholder, bilingual readme points, credits already attributed, smoke path on two samples. No new product.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Result |
|---|---|
| I. Verbatim Arabic, RTL | Pass. Activity copy is not rewritten. Smoke checks keep `dir="rtl"`. Readme Arabic is a translation of the handoff guide, not activity strings. |
| II. Content and engine stay separate; no fetch, no backend | Pass. No new runtime. Packaging remains the only Node step. |
| III. SCORM 1.2 zip, manifest at root, scores and statuses unchanged | Pass. This feature does not retouch score math or the wrapper. It only refuses a failed run to look successful. |
| IV. Mobile and accessible interaction | Pass. Smoke path must finish at 360 px with no clipped primary control and no forced horizontal scroll. Fixes are defects only. |
| V. Portfolio scope only | Pass. No SCORM 2004, cmi5, xAPI work, Moodle package, self-hosted fonts, recordings, or landing visual polish beyond the links. |
| Stack | Pass. HTML, CSS, vanilla JS, existing `archiver`. `Docs/TechnologyStack.md` already allows GitHub Pages and the packaging script. |
| Test-first | Pass. The new package-failure and link contracts are specified by a failing Node check first. Browser smoke stays manual. |

Post-design re-check: still pass. Contracts add no framework, no backend, no credentials, and no publish step.

## Project Structure

### Documentation (this feature)

```text
specs/006-release-handoff/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md             # /speckit-tasks, not this command
```

### Source Code (repository root)

```text
scripts/package.mjs               # fail closed; replace both zips only after both succeed
scripts/sync-shared.mjs           # unchanged source of the shared copy step
index.html                        # relative dist links; one release placeholder
.nojekyll                         # already empty; confirm, do not delete
README.md                         # senlite URLs, LMS statuses, no false Cloud claim
CREDITS.md                        # confirm attributed sources; do not invent rows
tests/manifest.test.mjs           # extend: failed run is not success
tests/landing-readme.test.mjs     # extend: dist links and readme points
feedback-scenario/                # smoke fixes only if the main path is broken
safety-challenge/                 # smoke fixes only if the main path is broken
```

**Structure Decision**: Keep the current root layout. Do not add a bundler, a second package script, or a new sample. Landing and readme edits stay in the files the landing feature already created. Activity folders change only when a main-path defect is found.

## Complexity Tracking

No constitution violations require justification.
