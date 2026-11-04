# Data model: Shared sample shell

No learner database. These are the file-level records this feature creates.

## Sample

| Field | Rule |
|---|---|
| id | `feedback-scenario` or `safety-challenge` |
| title | «محادثة التغذية الراجعة: موقف قيادي» or «تحدّي السلامة في موقع العمل» |
| entry | `index.html` with `lang="ar"` and `dir="rtl"` |
| masteryScore | Absent for feedback. `70` for safety. |
| shell copies | `css/base.css`, `js/i18n.js`, `js/scorm12.js`, `js/xapi-stub.js` |

A sample does not fetch JSON. Paths inside the folder are relative.

## Label table (`window.UI`)

Keys and Arabic values match build spec §6 exactly: `start`, `next`, `continue`, `retry`, `finish`, `saved`, `saved_standalone`, `points`, `question_of`, `decision_of`, `lives`, `time`, `loading`, `skip_link`.

`useArabicIndicDigits` is a boolean, default `false`.

`formatNumber(value)` returns Western digits when the flag is false and Arabic-Indic digits when it is true. For a finite number it formats that number. For any other value it returns the input unchanged and does not throw.

## SCORM session

States: `idle` → `started` → `finished`.

- `init` with no API: stay idle, log `[SCORM] standalone mode`, return false, do not throw.
- `init` with API: one `LMSInitialize("")`. If lesson status is empty or `not attempted`, set `incomplete`, then commit. Further `init` calls must not start a second session.
- `score` sets min 0, max 100, raw rounded.
- `finish` records session time, sets exit to empty, commits, calls `LMSFinish("")` once. A second finish, or finish before start, does nothing.
- `pagehide` and `beforeunload` call `finish`.

## Experience statement

Built in memory only. Fields: demo actor name and `mailto:demo@example.com`, verb id under `http://adlnet.gov/expapi/verbs/`, object id from the page location, Arabic name from the document title, ISO timestamp. `endpoint` stays `null`. `send` logs the statement and returns it. It does not perform a network request.

## Course package

One zip per sample at `dist/<id>-scorm12.zip`. Zip root contains `imsmanifest.xml` and the sample files, not a parent folder. The manifest is SCORM 1.2, identifier `tp.samples.<id>`, title as above, one SCO pointing at `index.html`, and a `<file>` entry for every file in the archive except the manifest itself (the manifest is the descriptor, not a listed resource file, matching the §8.2 template).

## Landing page

Root `index.html` links to both samples in Arabic and English. It is a placeholder; final marketing copy is a later feature.
