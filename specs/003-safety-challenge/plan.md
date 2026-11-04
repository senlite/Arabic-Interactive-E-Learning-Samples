# Implementation Plan: Workplace safety challenge

**Branch**: `003-safety-challenge` | **Date**: 2026-11-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-safety-challenge/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Build the Arabic safety game in `safety-challenge/`: start screen, ten questions (hotspot, four MCQ, two drag-order, three true/false), immediate feedback, results with a badge, and game over at zero lives. Copy stays in `content.js` as `window.CONTENT`. Score, lives, bonus, badge, pass/fail, shuffle, and ordering rules live in a DOM-free module that Node tests import before the page is wired. The existing shell (`i18n.js`, `scorm12.js`, `xapi-stub.js`, `base.css`) is used as-is. On results or game over the page calls `SCORM.score` with the higher of the stored percent and `round(base/1000×100)`, then `SCORM.status('passed'|'failed')` and `SCORM.commit()`. «إنهاء النشاط» calls `SCORM.finish()`. Optional `cmi.interactions` writes stay in try/catch. The timer switch defaults on; off means no countdown, no timeout, and no +50.

## Technical Context

**Language/Version**: HTML5, CSS, vanilla JavaScript (ES2018+). Node.js only to run tests.

**Primary Dependencies**: The shared shell already copied into `safety-challenge/js/` and `css/base.css`. No new package. Pointer Events for the drag handle. SortableJS is not added unless a later manual check shows custom drag is unreliable; that would be a stack question before vendoring. Google Fonts stay as the shell loads them. Medals and a warehouse placeholder are inline SVG. The ISO 7010 M014 file is saved at `safety-challenge/img/iso7010-m014.svg`.

**Storage**: Attempt state in memory. A copy in `sessionStorage` under `safety-challenge:attempt` so a refresh can resume, including `bestPercent`. No server.

**Testing**: Node’s built-in test runner (`node --test`) for hotspot scoring, order scoring, life loss, time bonus, badge bands, SCORM percent, keep-best, and shuffles that must not match the correct order. Browser, 360 px, keyboard, timer, and LMS checks stay manual and are listed in `quickstart.md`.

**Target Platform**: The existing `safety-challenge/` folder on GitHub Pages, Netlify, `file://`, and an LMS iframe. Relative script paths only.

**Project Type**: One static sample page on top of the shared shell.

**Performance Goals**: A full attempt is 5–8 minutes. Feedback motion at or under 300 ms and respects `prefers-reduced-motion`. No network call except the font stylesheet and the SCORM API when an LMS provides it.

**Constraints**: `lang="ar"` and `dir="rtl"` already set by the shell page. Logical CSS. Western digits via `UI.formatNumber`. Targets at least 44×44 px. No horizontal scroll at 360 px. `touch-action: none` only on the drag handle. Hotspot zones are percent-positioned buttons. Focus moves to the new screen heading. Feedback, score, and lives use a polite live region. Timeout uses an assertive region. The timer is announced only at 10 seconds. Do not edit `shared/` or the feedback sample. Do not send xAPI. Do not replace `scorm12.js`.

**Scale/Scope**: One sample, ten questions, three lives, six proof runs. Feedback scenario, landing page, and packaging behaviour stay unchanged except listing new files in this sample’s manifest when packaging is next run.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Result |
|---|---|
| I. Verbatim Arabic, RTL, logical CSS, Western digits | Pass. Strings come from the feature spec, which copied §3.2, §5.5, §5.6, and §6. `UI.formatNumber` stays on Western digits. CO₂, RACE, Near Miss, and ISO 7010 are wrapped so they keep order. |
| II. Content and engine stay separate; no fetch, no backend | Pass. `content.js` is `window.CONTENT`. Behaviour is `engine.js` plus `app.js`. Shared files are already copied; this feature does not fetch JSON. |
| III. SCORM 1.2: sample 2 `passed`/`failed` at 70 and `score.raw` from base points only; finish once; keep best | Pass. Results and game over set score from base points and status from the 70 line. Finish stays on the shell’s `SCORM.finish`. Retry keeps the higher percent. Interactions are optional and wrapped so a rejecting LMS cannot break the page. |
| IV. 360 px, 44 px targets, real buttons, drag plus ▲/▼, keyboard hotspots, timer off with no bonus and no timeout, contrast, focus, polite live region, assertive timeout, warning at 10 s | Pass. Clarification 2026-11-04: timer off keeps the hotspot open until all three hazards are found. |
| V. Portfolio scope only | Pass. No feedback-scenario edits, no live LRS, no runtime AI, no voice-over, no English activity, no gender toggle. Images are a public-domain sign, original medal drawings, and a placeholder until the warehouse picture exists. |
| Stack | Pass. No framework, bundler, or new dependency. |
| Test-first for programmable rules | Pass. Scoring, lives, bonus, badge, percent, keep-best, and both shuffles get failing `node --test` checks before `engine.js` satisfies them. |

Post-design re-check: still pass. Contracts add `window.CONTENT` and pure engine functions only. They do not add a backend, a framework, or an outbound call beyond the shell’s font link and SCORM API.

## Project Structure

### Documentation (this feature)

```text
specs/003-safety-challenge/
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
safety-challenge/
├── index.html
├── content.js
├── css/base.css
├── css/game.css
├── js/i18n.js
├── js/scorm12.js
├── js/xapi-stub.js
├── js/engine.js
├── js/app.js
├── img/iso7010-m014.svg
└── imsmanifest.xml
tests/
└── safety-engine.test.mjs
```

**Structure Decision**: Stay inside `safety-challenge/` as build spec §10. `js/engine.js` has no DOM and no `window` so `node --test` can import it. `content.js` is a browser script and is not imported by Node; tests pass plain objects that match the contract. `app.js` is the only file that touches the DOM, the timer, `sessionStorage`, and `window.SCORM`.

## Complexity Tracking

No constitution violations require justification.
