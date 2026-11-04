# Data model: Workplace safety challenge

## Content (static)

### Question

| Field | Rule |
|---|---|
| `id` | `Q1`–`Q10`, unique, fixed order |
| `type` | `hotspot`, `mcq`, `truefalse`, or `order` |
| `seconds` | 60, 30, 20, or 45 matching the type |
| `prompt` | Verbatim Arabic from the feature spec |
| `explain` | Verbatim explanation or hotspot summary |
| `short` | Review-list title, verbatim |
| `options` | MCQ and true/false only. True/false is exactly «صح» then «خطأ». One option has `correct: true` |
| `steps` | Order questions only. Array of four strings in the correct order |
| `zones` | Hotspot only. Five zones: three `hazard: true` and two distractors, each with `id`, `label` («المنطقة 1»–«المنطقة 5»), `name`, `text`, and percent box `top`, `left`, `width`, `height` |
| `imageAlt` | Hotspot and Q10 |

Order in `questions` is the play order in the feature spec. The page must not sort it.

### Screen copy

Start title, description, three rules, timer label and hint, objectives lead and five bullets, feedback templates (`correct`, `partial`, `wrong`, `timeout`, `lifeLost`), next and last-question buttons, results title and stats template, three badge names and messages, game-over text, retry and finish, and the sample disclaimer. All verbatim from the feature spec. Shared labels stay in `UI`.

## Attempt (runtime)

| Field | Rule |
|---|---|
| `screen` | `start`, `question`, `feedback`, `results`, `gameover` |
| `index` | 0–9 while a question is current; 10 when the bank is finished |
| `base` | 0–1000, sum of question base points |
| `bonus` | 0–500, sum of +50 awards |
| `lives` | 3 down to 0 |
| `timerOn` | From the start-screen switch. Default true. Fixed for the attempt |
| `correctCount` | Questions that counted as fully correct |
| `outcomes` | One entry per answered question: `id`, `base`, `bonus`, `correct`, `lifeLost` |
| `startedAt` | Timestamp for elapsed display |
| `bestPercent` | Highest SCORM percent already stored for this browser session |
| `pending` | Current question draft before submit: hotspot `found` ids and `wrongTaps`; order current permutation; choice selected id. Cleared when feedback opens |

Cleared by retry except `bestPercent` is kept and then updated when results or game over report a higher percent.

## Scoring

Numeric rules live in one place: [contracts/engine.md](./contracts/engine.md). That contract is the authority for tests and for `safety-challenge/js/engine.js`. The feature spec remains the learner-facing authority. If a number ever disagrees, fix the contract and the spec together rather than restating the formula here.

The attempt stores `base`, `bonus`, `lives`, `correctCount`, and `outcomes` as defined above. The displayed total is `base + bonus`. The recorded percent uses `base` only.

## State transitions

`start` → `question` (index 0). Answering or timing out → `feedback`. From feedback, if `lives` is 0 → `gameover`. Else if `index` is 9 → `results`. Else → next `question`. `results` and `gameover` → `start` on retry, or the finish message on «إنهاء النشاط».

With `timerOn` false, no transition is caused by the clock. The hotspot leaves `question` only when the third hazard is found.
