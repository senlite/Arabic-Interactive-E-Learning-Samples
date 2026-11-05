# /speckit-specify

Close the two finished samples so a reviewer can package them, open them on the public site, and follow the README without asking the author. Target: end of day Friday 6 November 2026. One feature. Do not invent a new product and do not change learner-facing Arabic or game rules.

Read `Docs/Analysis/Arabic-eLearning-Samples-Requirements.md` (packaging, landing, README, credits), constitution principles III and V, and the already-specified features in `Docs/Specify-prompts/04-scorm-package.md` and `05-landing-readme.md`. This feature finishes the handoff those specs left open. It does not re-specify the activities.

Repository: `senlite/Arabic-Interactive-E-Learning-Samples`, branch `main`, site root. Public base, once Pages is enabled by a person: `https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/`. Sample paths: `/feedback-scenario/` and `/safety-challenge/`.

In scope:

1. Packaging. From the repo root, `npm run package` (after shared content is synced) writes exactly `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`. Each zip has `imsmanifest.xml` at the archive root, not inside a nested folder. Running the command again overwrites those two artifacts. If the shared sync was skipped or one sample fails, the command names the failure and does not present a stale or partial zip as success. SCORM 1.2 only. Manifest rules, scores, and the local harness stay as specified in `04-scorm-package.md`.

2. Static hosting readiness. The repo root contains an empty `.nojekyll` so GitHub Pages serves the sample directories and assets without Jekyll. Every sample and landing path stays relative. Do not change GitHub Pages settings in this feature.

3. Smoke-path fixes only. Both samples complete their main path in a desktop-width window and at 360px width, with `dir="rtl"` on the document and no clipped primary controls or forced horizontal scroll. The browser console shows no errors from open, through the main interaction, to the end state (debrief for the feedback scenario; results or game over for the safety challenge). Fix only defects on that path: broken navigation, missing assets, layout that hides controls, script errors. Do not redesign the activities.

4. Documentation. `README.md` is English, then the same content in Arabic inside `<div dir="rtl">` (Arabic, not an untranslated English copy). Both languages state: what each sample is; the live URLs under the senlite Pages base above; how to run locally; the package command and the two zip names; that the intended LMS check is SCORM Cloud with SCORM 1.2 (sample 1 `completed` plus score; sample 2 `passed` or `failed` against 70); and a short AI-workflow note (Claude for the script, Cursor for the code, manual QA on a phone and in an LMS). Do not claim a SCORM Cloud run happened unless a registration report is already in the repo. Links to `media/*.gif` may 404; the links are the contract, recording the files is not. `CREDITS.md` lists every image, font, and library already attributed in the requirements, with source and licence. Do not invent contributors. The activity footer stays «نموذج تجريبي من إعداد Twin Particles».

5. Landing links. Root `index.html` keeps the bilingual heading and two cards from `05-landing-readme.md`. Each card links to the live sample with a relative path and to that sample’s SCORM 1.2 zip. Until GitHub Release v1.0 asset URLs exist, link the `dist/` zips with relative URLs and isolate the Release page URL in one clearly marked placeholder so a single edit finishes the handoff. Also list, in the README only, the exact git and `gh` commands to push `main`, enable Pages from the `main` branch root, and create Release v1.0 with both dist zips attached. Do not run those commands.

Actors: the author runs the package command and commits hosting and docs fixes; the reviewer uses only the README, the landing page, and the two zips. An LMS admin importing the zips is later and outside this feature.

Edge cases to accept or reject in the spec: manifest nested in a folder is a failed package; a 360px Arabic layout that clips a primary button is a failed smoke path; a missing `.nojekyll` is a failed release check even if the HTML works on a local server; unknown Release asset URLs do not block merging the relative dist links.

Success: both zips exist at the names above with a root-level `imsmanifest.xml`; both main paths finish with zero console errors at desktop width and at 360px with RTL intact; English README, Arabic README, and CREDITS contain the documentation points above; the landing page resolves both sample paths and both package links; a reviewer with only the README can package and know what to import into a SCORM 1.2 LMS.

Out of scope (manual, or explicitly deferred): enabling GitHub Pages, creating the GitHub Release, uploading binaries, SCORM Cloud upload and registration-report screenshots, GIF or MP4 recordings, phone-hardware testing, replying to the reviewer, xAPI stub, Moodle packaging, self-hosted fonts, landing-page visual polish beyond the links above, SCORM 2004, cmi5, and any rewrite of learner-facing Arabic.
