# Implementation Plan: Feedback branching scenario

**Branch**: `002-feedback-scenario` | **Date**: 2026-11-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-feedback-scenario/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Build the Arabic branching conversation in `feedback-scenario/`: start, objectives, سارة’s message, three decisions with shuffled choices, feedback, a score-band ending, and a debrief. Copy stays in `content.js` as `window.CONTENT`. Play rules (next node, bands, percent, keep-best, shuffle) live in a small module that Node tests import before the page is wired. The existing shell (`i18n.js`, `scorm12.js`, `xapi-stub.js`, `base.css`) is used as-is. On the debrief the page calls `SCORM.score` with the higher of the stored percent and this attempt, then `SCORM.status('completed')` and `SCORM.commit()`. «إنهاء النشاط» calls `SCORM.finish()`.

## Technical Context

**Language/Version**: HTML5, CSS, vanilla JavaScript (ES2018+). Node.js only to run tests.

**Primary Dependencies**: The shared shell already in `feedback-scenario/js/` and `css/base.css`. No new package. Google Fonts stay as the shell loads them. Placeholder portraits are inline SVG, not new image files.

**Storage**: Attempt state in memory. A copy in `sessionStorage` under `feedback-scenario:attempt` so a refresh can resume. Recorded percent for keep-best is part of that copy. No server.

**Testing**: Node’s built-in test runner (`node --test`) for scoring, branching, bands, percent rounding, keep-best, and shuffle identity. Browser, 360 px, keyboard, and LMS checks stay manual and are listed in `quickstart.md`.

**Target Platform**: The existing `feedback-scenario/` folder on GitHub Pages, Netlify, `file://`, and an LMS iframe. Relative script paths only.

**Project Type**: One static sample page on top of the shared shell.

**Performance Goals**: A full attempt is 5–7 minutes of reading. Screen changes at or under 300 ms and respect `prefers-reduced-motion`. No network call except the font stylesheet and the SCORM API when an LMS provides it.

**Constraints**: `lang="ar"` and `dir="rtl"` already set by the shell page. Logical CSS. Western digits via `UI.formatNumber`. Choice targets at least 44×44 px. One column at 360 px. «القرار n من 3» only on the three decision screens, using `UI.decision_of`. Rating uses icon, colour token, and text. Focus moves to the new screen heading. Feedback and score use a polite live region. Do not edit `shared/` or the safety sample. Do not send xAPI and do not write SCORM interactions.

**Scale/Scope**: One sample, five decision nodes, fifteen choices, three endings, four proof paths (30, 20, 15, 0). Safety challenge, landing page, and packaging behaviour stay unchanged.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Result |
|---|---|
| I. Verbatim Arabic, RTL, logical CSS, Western digits | Pass. Strings come from the feature spec, which copied §3.1, §4.5, and §6. `UI.formatNumber` stays on Western digits. SBI is wrapped so it keeps order. |
| II. Content and engine stay separate; no fetch, no backend | Pass. `content.js` is `window.CONTENT`. Behaviour is `engine.js` plus `app.js`. Shared files are already copied; this feature does not fetch JSON. |
| III. SCORM 1.2: sample 1 `completed` and `round(total/30×100)`; finish once; keep best when `keepBest` is true | Pass. Debrief sets score and `completed`. Finish stays on the shell’s `SCORM.finish`. Retry keeps the higher percent (clarification 2026-11-04). |
| IV. 360 px, 44 px targets, buttons, focus to heading, polite live region, contrast, reduced motion | Pass. No drag and no timer in this sample. Colour is never the only rating cue. |
| V. Portfolio scope only | Pass. No second activity, no xAPI send, no interactions, no gender toggle, no client logos. Placeholder SVG until §9 images. |
| Stack | Pass. No framework, bundler, or new dependency. |
| Test-first for programmable rules | Pass. Branching, bands, percent, keep-best, and shuffle get failing `node --test` checks before `engine.js` satisfies them. |

Post-design re-check: still pass. Contracts add `window.CONTENT` and pure engine functions only. They do not add a backend, a framework, or an outbound call beyond the shell’s font link and SCORM API.

## Project Structure

### Documentation (this feature)

```text
specs/002-feedback-scenario/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── content.md
│   └── engine.md
└── tasks.md             # /speckit-tasks, not this command
```

### Source Code (repository root)

```text
feedback-scenario/
├── index.html           # shell page; add content.js, engine.js, app.js
├── content.js           # window.CONTENT
├── css/base.css         # existing copy; scenario rules appended or scenario.css
├── css/scenario.css
├── js/i18n.js           # unchanged copy
├── js/scorm12.js        # unchanged copy
├── js/xapi-stub.js      # unchanged copy
├── js/engine.js         # pure rules, also imported by tests
├── js/app.js            # DOM, focus, sessionStorage, SCORM calls
└── imsmanifest.xml      # list new files when packaging is next run
tests/
└── feedback-engine.test.mjs
```

**Structure Decision**: Stay inside `feedback-scenario/` as build spec §10. `js/engine.js` has no DOM and no `window` so `node --test` can import it. `content.js` is a browser script and is not imported by Node; tests pass plain objects that match the contract. `app.js` is the only file that touches the DOM, `sessionStorage`, and `window.SCORM`.

## Complexity Tracking

No constitution violations require justification.
