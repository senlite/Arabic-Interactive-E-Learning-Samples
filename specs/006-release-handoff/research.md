# Research: Release handoff

## Package success is both archives or neither

**Decision**: `packageSamples` still syncs shared files first, then builds both manifests and writes each zip to a temporary path. It renames both onto `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip` only after both archives close. On any thrown error it deletes temporary files, prints the error message, sets a non-zero exit code, and does not rename.

**Rationale**: The spec rejects a stale or partial zip presented as success. Replacing the final names only at the end means a mid-run failure cannot leave a half-written final zip. A previous successful pair may remain on disk, but the failed command is not a success.

**Alternatives considered**: Delete both final zips at the start of every run (a failure would remove the last good pair). Leave `archiver` writing straight to the final name (a crash can leave a partial final zip).

## Shared sync stays inside the package command

**Decision**: Keep `await syncShared(root)` at the start of `packageSamples`. A missing sample folder or missing shared file still throws `Missing sample folder: …` or `Missing shared file: …` before any rename. Callers who skip the package command’s sync by invoking a zip step alone are out of this command’s surface; the supported command is `npm run package`.

**Rationale**: The current script already copies shared files before zipping. The handoff names that command, not a new sync CLI.

**Alternatives considered**: Require a separate `npm run sync` and fail if a stamp file is absent. That adds a step the spec does not name.

## Landing package links point at `dist/`

**Decision**: Each card’s “Download SCORM 1.2” href becomes a relative `dist/` zip (`./dist/feedback-scenario-scorm12.zip` and `./dist/safety-challenge-scorm12.zip`). One HTML comment, and only one, holds the later release page: `https://github.com/senlite/Arabic-Interactive-E-Learning-Samples/releases/tag/v1.0`, marked `RELEASE_PAGE`. Try links stay `./feedback-scenario/` and `./safety-challenge/`.

**Rationale**: Release asset URLs do not exist yet and must not block merge. One marked comment is a single edit when a person creates Release v1.0. The 005 plan used a `<account>` download placeholder; this feature replaces that with the relative dist links.

**Alternatives considered**: Keep the `<account>` GitHub download URLs until the release exists (blocks a reviewer who only has the repo). Commit the zips into the site tree (the packaging feature keeps `dist/` git-ignored).

## Readme claims only what the repo can show

**Decision**: Update `README.md` in place. English first, then the same points in Arabic inside `<div dir="rtl">`. Live URLs use the senlite Pages base. The LMS paragraph says SCORM Cloud with SCORM 1.2, feedback `completed` plus score, safety `passed` or `failed` against 70, and that this check is intended, not already recorded, because no registration report is in the repo. Keep the existing git and `gh` command list. Do not run those commands. GIF links may 404.

**Rationale**: A reviewer with only the readme must package and know what to import. Claiming a Cloud run without a report would be false.

**Alternatives considered**: Add a second readme file. Leave the 005 wording that treats Moodle as the next check without the 70-point status rule.

## Smoke path is a manual gate, not a redesign

**Decision**: Desktop width means a window at least 1024 px wide. The narrow check is 360 px. Play feedback to the debrief and safety to results or game over. Console errors mean messages from the page, not the browser extension. Fix only broken navigation, missing assets, layout that hides a primary control, or a script error on that path. If the path already passes, do not edit activity files.

**Rationale**: The spec bounds fixes to that path. Automated layout screenshots are not in the stack.

**Alternatives considered**: Add a browser automation dependency. Redesign screens that merely look uneven but still complete.

## Credits and `.nojekyll` are confirmations

**Decision**: Confirm `.nojekyll` is present and empty. Confirm `CREDITS.md` lists images, fonts, and libraries already attributed, with source and licence. Add a missing attributed row if one is absent. Do not invent contributors.

**Rationale**: Both files already exist from the landing feature. This feature fails the release check if `.nojekyll` is missing, and it does not reopen credits as a new catalogue.

**Alternatives considered**: Regenerate credits from a scan of every file in the repo, which would invent rows the requirements never attributed.
