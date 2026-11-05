# Data model: Release handoff

No learner records. The handoff is files a reviewer can see.

## Course package

| Field | Rule |
|---|---|
| Identity | `feedback-scenario` or `safety-challenge` |
| Final path | `dist/<id>-scorm12.zip` |
| Temporary path | `dist/<id>-scorm12.zip.partial` while that run is writing |
| Manifest | `imsmanifest.xml` at the archive root, SCORM 1.2, same rules as the packaging feature |
| Success | Both finals replaced only after both archives close |
| Failure | Named error, non-zero exit, temporary files removed, finals not replaced by a partial archive |

Relationship: one package per sample. A run has two packages or it is not a success.

## Hosting marker

| Field | Rule |
|---|---|
| Path | `.nojekyll` at the repository root |
| Contents | Empty file |
| Paths | Sample and landing addresses stay relative |

Absence fails the release check even when a local server can open the HTML.

## Landing card

| Field | Rule |
|---|---|
| Count | Exactly two cards and the existing bilingual heading |
| Try link | `./feedback-scenario/` or `./safety-challenge/` |
| Package link | `./dist/feedback-scenario-scorm12.zip` or `./dist/safety-challenge-scorm12.zip` |
| Release placeholder | One comment marked `RELEASE_PAGE` whose value is `https://github.com/senlite/Arabic-Interactive-E-Learning-Samples/releases/tag/v1.0` |

Unknown release asset URLs do not block the relative package links.

## Reviewer readme

| Field | Rule |
|---|---|
| Order | English, then the same points in Arabic inside `<div dir="rtl">` |
| Samples | What each sample is |
| Live URLs | `https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/feedback-scenario/` and `…/safety-challenge/` |
| Local run | How to open the site locally |
| Package | `npm run package` and the two zip names |
| LMS | Intended SCORM Cloud check, SCORM 1.2; feedback `completed` plus score; safety `passed` or `failed` against 70; not claimed as already done |
| Assisted work | Claude for the script, Cursor for the code, manual checks on a phone and in a learning system |
| Publish list | Exact git and `gh` commands to push `main`, enable Pages from the `main` branch root, and create Release v1.0 with both dist zips; not executed by this feature |
| Recordings | Links to `media/*.gif` may not resolve |

## Credits list

Each image, font, and library already attributed for this project has a source and a licence. No invented contributors. Activity footer remains «نموذج تجريبي من إعداد Twin Particles».

## Smoke path

| Field | Rule |
|---|---|
| Feedback end | Debrief |
| Safety end | Results or game over |
| Widths | At least 1024 px, and 360 px |
| Direction | Document `dir="rtl"` |
| Failure | Clipped primary control, forced horizontal scroll, or a console error from the page on that path |
| Allowed edits | Broken navigation, missing assets, layout that hides controls, script errors on that path |

## State

1. Shared files missing or a sample folder missing → named error, no final replace.
2. Both archives closed → both final zips replaced.
3. Either archive fails after a temporary file exists → temporary file removed, command failed, previous finals left in place if they existed.
