# Implementation Plan: SCORM 1.2 packages and local call-order proof

**Branch**: `004-scorm-package` | **Date**: 2026-11-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-scorm-package/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Prove both samples as importable SCORM 1.2 archives and show the learning-system call order in a local harness. Packaging, manifests, score math, and keep-best already exist from earlier features. This feature aligns the shared wrapper so the logged order matches the spec, adds `scripts/scorm-harness.html` outside both zips, and adds the README section “Build the SCORM package”. Learner-facing Arabic and game rules stay unchanged. A live SCORM Cloud or Moodle upload stays manual.

## Technical Context

**Language/Version**: HTML5, CSS, vanilla JavaScript (ES2018+). Node.js for packaging and `node --test` only.

**Primary Dependencies**: npm package `archiver`, already the only dependency. No new package.

**Storage**: Files on disk. Scores stay in memory for the session. Zips stay in git-ignored `dist/`.

**Testing**: Node’s built-in test runner. Zip contents and the wrapper call order get failing checks before the code that makes them pass. The harness table is checked in the browser. SCORM Cloud and Moodle are not automated.

**Target Platform**: Static samples inside an LMS iframe, plus a local HTTP preview that can show the harness and one sample frame.

**Project Type**: Static portfolio samples with a packaging script.

**Performance Goals**: One package command produces both archives. A full launch’s call log fits one screen of the harness table.

**Constraints**: Manifest at zip root, schema version 1.2, no XSD files, mastery score 70 only on the safety package. Wrapper finds `API`, initializes once, reads lesson status once, and finishes once on `pagehide`. `beforeunload` may call the same finish and is not a separate log step. No API means no throw and the standalone saved message. Relative paths. Do not change Arabic copy or scoring bands. Package size should stay at or under 5 MB.

**Scale/Scope**: Two archives, one harness page, one README section, one wrapper call-order correction. No SCORM 2004, cmi5, live LRS, or GitHub Release.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Result |
|---|---|
| I. Verbatim Arabic, RTL | Pass. Saved messages stay the §6 strings. No new learner copy except the existing messages already on the end action. |
| II. Content and engine stay separate; no fetch, no backend | Pass. Harness is a static page. Samples still load `content.js` by script tag. |
| III. SCORM 1.2 zip, manifest at root, initialize once, score and status, commit, finish once, no-op without API, keep best | Pass. This feature tightens the wrapper log to that order and leaves keep-best in each sample engine. |
| IV. Mobile and accessible interaction | Pass. No new learner controls. The harness is a developer page and still uses a real table and buttons. |
| V. Portfolio scope only | Pass. SCORM 2004, cmi5, a live LRS, and release hosting stay out. |
| Stack | Pass. HTML, CSS, vanilla JS, existing `archiver`. |
| Test-first | Pass. Call order and zip exclusions are specified by failing checks first. |

Post-design re-check: still pass. Contracts do not add a framework, a backend, credentials, or an outbound call other than the SCORM API when a parent frame provides it.

## Project Structure

### Documentation (this feature)

```text
specs/004-scorm-package/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md             # /speckit-tasks, not this command
```

### Source Code (repository root)

```text
shared/scorm12.js                 # source; sync copies into each sample
feedback-scenario/js/scorm12.js   # copy
safety-challenge/js/scorm12.js    # copy
scripts/package.mjs               # already writes both zips
scripts/scorm-harness.html        # new; not packaged
README.md                         # new “Build the SCORM package” section
tests/scorm12.test.mjs            # call order
tests/manifest.test.mjs           # zip root, no XSD, no harness
```

**Structure Decision**: Keep the §10 layout. The harness lives under `scripts/` so `package.mjs` never sees it. Shared `scorm12.js` remains the only wrapper source and is copied before zip.

## Complexity Tracking

No constitution violations require justification.
