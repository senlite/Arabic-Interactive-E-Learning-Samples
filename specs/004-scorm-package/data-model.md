# Data model: SCORM 1.2 packages and local call-order proof

## Course package

| Field | Rule |
|---|---|
| File name | `dist/feedback-scenario-scorm12.zip` or `dist/safety-challenge-scorm12.zip` |
| Root entry | `imsmanifest.xml` beside `index.html`, not inside a sample folder |
| Identifier | `tp.samples.feedback-scenario` or `tp.samples.safety-challenge` |
| Title | «محادثة التغذية الراجعة: موقف قيادي» or «تحدّي السلامة في موقع العمل», on the organization and the item |
| Schema version | `1.2` |
| File list | Every file in the zip except the manifest itself |
| Mastery score | `70` on the safety item only |
| Excluded | XSD files, `scripts/scorm-harness.html` |

## Learning-system session

| Field | Rule |
|---|---|
| Started | `LMSInitialize("")` once. A second `init` does not initialize again. |
| Incomplete | `cmi.core.lesson_status` = `incomplete` when the current status is empty or `not attempted` |
| Score | `cmi.core.score.min` = `0`, `max` = `100`, `raw` = a whole number |
| Status | Feedback: `completed`. Safety: `passed` if stored raw ≥ 70, otherwise `failed` |
| Commit | One `LMSCommit("")` after that status and before session time |
| Session time | `cmi.core.session_time` as `HHHH:MM:SS` |
| Finished | `LMSFinish("")` once. Further `finish`, including `pagehide` or `beforeunload` after finish, does not call it again. `beforeunload` is the same finish path and adds no extra log step |
| No API | `init` returns false, logs standalone mode, and does not throw |

## Call log

Ordered rows shown by the harness. Each row is the method name plus the element and value for set/get. A finished feedback launch’s set/commit/finish subsequence is:

1. `LMSInitialize`
2. get `cmi.core.lesson_status` (once; `incomplete` is set only when this read is empty or `not attempted`)
3. set `cmi.core.lesson_status` `incomplete`
4. set `cmi.core.score.min` `0`
5. set `cmi.core.score.max` `100`
6. set `cmi.core.score.raw` to the rounded percent
7. set `cmi.core.lesson_status` `completed` (or `passed` / `failed` for safety)
8. `LMSCommit`
9. set `cmi.core.session_time`
10. `LMSFinish`

## Attempt score

| Sample | Raw score | Status stored with the best attempt |
|---|---|---|
| Feedback | `round(points / 30 × 100)` | `completed` |
| Safety | `round(basePoints / 1000 × 100)` | `passed` if that raw score ≥ 70, else `failed` |

A later attempt with a lower raw score does not change the stored raw score or the stored status. The debrief or results screen may still show the current attempt’s own points.

## State transitions

`not started` → `started` on a successful initialize → `scored` when min, max, raw, and lesson status are set → `committed` on the single commit → `finished` when session time is set and `LMSFinish` returns. `finished` ignores another finish. `not started` with no API stays usable and never enters `started`.
