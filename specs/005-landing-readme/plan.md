# Implementation Plan: Bilingual portfolio front door

**Branch**: `005-landing-readme` | **Date**: 2026-11-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/005-landing-readme/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add a static bilingual home page for the two finished samples, a `.nojekyll` marker, an English-then-Arabic `README.md`, and a `CREDITS.md` that names every image, typeface, and library with source and licence. Download links point at GitHub Release v1.0 placeholders that contain the literal `<account>` token. The readme lists the git and `gh` commands to push `main`, enable Pages from the main branch root, and attach both zips. This feature does not run those commands and does not change activity behaviour, Arabic activity copy, scores, or footers.

## Technical Context

**Language/Version**: HTML5, CSS, no JavaScript on the home page. Node.js `node --test` only to read the new files as text.

**Primary Dependencies**: None added. Google Fonts (Cairo and Tajawal) may be linked from the home page the same way the samples already load them. Packaging still uses the existing `archiver` script and is only documented here.

**Storage**: Static files at the repository root. No scores, no backend, no release assets committed.

**Testing**: Node’s built-in test runner asserts headings, card links, direction markers, placeholder download URLs, readme topics in both languages, credit rows, and `.nojekyll`. A browser check at 360 px confirms no horizontal scroll and 44 px targets. Publishing and LMS checks stay manual.

**Target Platform**: GitHub Pages from the `main` branch root, and the same files opened locally. Relative paths keep Netlify Drop, `file://`, and an LMS iframe possible.

**Project Type**: Static portfolio front door plus two markdown deliverables.

**Performance Goals**: The home page is one HTML file and one stylesheet. A reviewer can open both try links in under a minute.

**Constraints**: Page `lang="en"` and `dir="ltr"`. Arabic heading half, card titles, one-line descriptions, and «جرّب النموذج» use `lang="ar"` and `dir="rtl"`. Colours and type sizes follow the constitution tokens. Text contrast at least 4.5:1. Touch targets at least 44 px. No activity file edits. Do not run git push, Pages setup, or `gh release`. GIF files may be absent. Package zips stay out of the Pages tree.

**Scale/Scope**: One home page, one empty `.nojekyll`, one bilingual readme, one credits file, one text test. Two cards only.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Result |
|---|---|
| I. Verbatim Arabic, RTL | Pass. Activity pages stay `lang="ar"` and `dir="rtl"`. New landing Arabic is short portfolio copy, not a rewrite of §4.5, §5.5, §5.6, or §6. Sample titles are copied exactly. |
| II. Content and engine stay separate; no fetch, no backend | Pass. The home page has no script and no fetch. Samples are unchanged. |
| III. SCORM 1.2 contract | Pass. This feature does not retouch the wrapper, scores, or manifests. Download links name the existing zip filenames on Release v1.0. |
| IV. Mobile and accessible interaction | Pass. Home controls are real links, at least 44 px, readable at 360 px, contrast at least 4.5:1. |
| V. Portfolio scope only | Pass. No new question types, no SCORM 2004, no GIF recording, no activity rewrite. Credits list generated art and free licences only. |
| Stack | Pass. HTML and CSS only. No new library. `Docs/TechnologyStack.md` already allows GitHub Pages. |
| Test-first | Pass. File contracts are checked by a failing Node test before the pages and markdown are filled in. Layout at 360 px stays a manual browser check. |

Post-design re-check: still pass. Contracts add no framework, no backend, no outbound call except the existing font stylesheet, and no publish step.

## Project Structure

### Documentation (this feature)

```text
specs/005-landing-readme/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md             # /speckit-tasks, not this command
```

### Source Code (repository root)

```text
index.html                        # new home page
assets/landing.css                # new; home page only
.nojekyll                         # empty marker
README.md                         # replace or create bilingual guide
CREDITS.md                        # sources and licences
tests/landing-readme.test.mjs     # text contracts
feedback-scenario/                # unchanged
safety-challenge/                 # unchanged
media/feedback-scenario.gif       # linked; file may be absent
media/safety-challenge.gif        # linked; file may be absent
```

**Structure Decision**: Keep the build-spec root layout. The home page and its stylesheet sit at the repository root so GitHub Pages from `main` / root serves them. Sample folders are not edited. The stylesheet lives under `assets/` so it is not confused with `shared/` or either sample’s `css/`.

## Complexity Tracking

No constitution violations require justification.
