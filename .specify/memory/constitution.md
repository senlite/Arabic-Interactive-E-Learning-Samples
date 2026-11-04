<!--
Sync Impact Report
- Version change: unratified template → 1.0.0
- Modified principles: none (initial ratification)
- Added sections: Core Principles (I–V), Technical Constraints, Quality Gates, Governance
- Removed sections: none
- Deferred placeholders: none
- Source: Docs/Arabic-eLearning-Samples-Requirements.md v1.0 (2026-11-04)
- Temporary: remove this comment before committing the constitution
-->

# Arabic Interactive E-Learning Samples Constitution

## Core Principles

### I. Verbatim Arabic, RTL by default

Learner-facing Arabic in the build spec (§4.5, §5.5, §5.6, §6) is final copy.
Activities MUST paste those strings exactly. Rephrasing, translation, or typo
"fixes" are forbidden unless an amendment to the spec says otherwise. Every
activity page MUST set `lang="ar"` and `dir="rtl"`. Layout MUST use CSS logical
properties. Mixed Latin tokens (CO₂, RACE, SBI, Near Miss, ISO 7010) MUST stay
in correct bidirectional order. Numerals MUST be Western digits (0–9) unless
`useArabicIndicDigits` is switched on.

Rationale: the samples are a Gulf workplace portfolio. Broken copy or LTR layout
fails the client's Arabic requirement before any interaction is judged.

### II. Content and engine stay separate

Each sample MUST be a self-contained folder that runs from `index.html` over
http(s) and under `file://`. Text and branching data MUST live in `content.js`
as `window.CONTENT`. Behaviour MUST live in `app.js`. Shared runtime files MUST
have a single source under `shared/` and be copied into each sample; samples
MUST NOT fetch JSON at runtime. There is no backend, login, analytics, or
tracking script. The only outbound call allowed is the SCORM API when an LMS
provides it, plus the documented font stylesheet.

Rationale: the portfolio pitch is "new content file, same engine". A fetch or a
framework build step would break strict LMS iframes and `file://`.

### III. SCORM 1.2 is the completion contract

Each sample MUST ship as a SCORM 1.2 zip whose `imsmanifest.xml` sits at the
zip root and lists every packaged file. The runtime MUST use the spec's
minimal wrapper: find `API`, `LMSInitialize` once, set score and lesson status,
`LMSCommit`, and `LMSFinish` exactly once on every exit path, including
`pagehide`. With no API, the wrapper MUST no-op and MUST NOT throw. Sample 1
MUST report `completed` and `score.raw` as round(total/30×100). Sample 2 MUST
report `passed` or `failed` at 70 and `score.raw` from base points only.
`xAPI` MUST log only; credentials MUST NOT enter the public repo. Retry MUST
keep the best score when `keepBest` is true.

Rationale: a public demo that does not record completion and score in an LMS
does not meet the job's integration bar.

### IV. Mobile and accessible interaction (NON-NEGOTIABLE)

Both samples MUST finish on a 360 px-wide phone with no horizontal scroll and
touch targets of at least 44×44 px. Every control MUST be a real button or an
equivalent keyboard control. Drag ordering MUST also work with up/down buttons.
Hotspot zones MUST be keyboard-reachable. The safety timer MUST be switchable
off, and when off MUST award no time bonus and MUST NOT time out. Meaning MUST
NOT depend on colour alone. Text contrast MUST be at least 4.5:1 and UI
contrast at least 3:1. Focus MUST move to the new screen heading. Feedback,
score, and lives MUST use a polite live region; time-out MUST use an assertive
one. Timer warnings MUST fire at 10 seconds, not every second.

Rationale: the client asked for mobile Arabic activities, and the spec aims at
WCAG 2.2 AA for the items in §7.4.

### V. Portfolio scope only

The build MUST deliver the two named samples, the bilingual landing page, the
two SCORM 1.2 packages, credits, and the README. Client source decks, Storyline,
H5P, Genially, SCORM 2004, cmi5, AICC, LTI, a live LRS, runtime AI characters,
voice-over, an English activity, and a gender toggle are out of scope. If time
is short, cuts MUST follow this order: xAPI stub, then interactions, then the
Moodle test, then self-hosted fonts, then landing-page polish. SCORM Cloud
verification stays. Images MUST be free-licensed or generated for this project,
with source and licence in `CREDITS.md`. No stock with an unclear licence and
no real company logos.

Rationale: the time box is two working days of original samples, not a
production course for the client's material.

## Technical Constraints

- Stack: HTML5, CSS, and vanilla JavaScript (ES2018+). No framework and no
  build step for the activities. The only Node step is packaging (`archiver`).
  SortableJS (MIT, vendored) is allowed only if custom Pointer Events drag
  proves unreliable.
- Paths MUST be relative so one folder works on GitHub Pages, Netlify,
  `file://`, and inside an LMS iframe.
- Visual tokens: background `#F7F8FA`, primary `#0F766E`, warning `#B45309`,
  success `#15803D`, error `#B91C1C`, text `#1F2937`. Body text at least 16 px
  (18 px preferred). Arabic MUST NOT be letter-spaced. Motion MUST respect
  `prefers-reduced-motion` and stay at or under 300 ms.
- Fonts: Cairo for headings and UI, Tajawal or IBM Plex Sans Arabic for body,
  with the fallback stack in the spec. Footer brand default is Twin Particles
  until the owner decides otherwise.
- Scoring and branching bands in the spec are exact. Choice order MUST be
  shuffled, and a drag-order shuffle MUST NOT equal the correct order.
- Package size SHOULD stay at or under 5 MB. Each raster SHOULD stay at or
  under 200 KB.
- Test-first: any programmable rule (scoring, branching, lives, shuffle,
  SCORM value mapping) MUST be specified by a failing automated check before
  the implementation that makes it pass. Browser, phone, and LMS checks in the
  spec remain mandatory and are not replaced by unit tests.

## Quality Gates

A sample is not done until the success criteria in the spec are true: public
link, full Arabic RTL, 360 px touch use, SCORM 1.2 completion and score, real
consequences or game rules, and a short recording plus a bilingual README.
The §14 checklist is the release gate. Sample 1 MUST be proven on the four
example paths. Sample 2 MUST be proven on the six scenarios in §11.2. At least
one LMS import (SCORM Cloud first) MUST show the expected status, score, and
session time. Keyboard-only completion and a Lighthouse accessibility score of
at least 90 are required before calling the work ready to show.

## Governance

This constitution governs how the samples are built. The build spec
(`Docs/Arabic-eLearning-Samples-Requirements.md`, to be placed at `docs/SPEC.md`)
governs learner copy, screen flow, scores, and package layout. If they
conflict, learner-facing strings and SCORM numbers follow the spec; stack,
scope, and quality bars follow this constitution, and the conflict MUST be
recorded as an amendment.

Amendments MUST be written into this file with a semantic version bump:
MAJOR for a removed or redefined principle, MINOR for a new principle or a
material expansion, PATCH for wording that does not change a rule. Ratification
date stays 2026-11-04. Last-amended date is the date of the change. The owner
(Muhammad Aboulmagd) accepts product defaults in spec §19; the builder does not
silently change Arabic copy, scoring, or scope.

Compliance review: before a sample is called done, the §14 checklist MUST be
marked against this constitution and the spec. Unjustified complexity (a
framework, a backend, a second authoring tool) MUST be rejected.

**Version**: 1.0.0 | **Ratified**: 2026-11-04 | **Last Amended**: 2026-11-04
