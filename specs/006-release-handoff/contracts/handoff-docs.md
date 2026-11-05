# Contract: landing, readme, credits, hosting marker

## `.nojekyll`

- Path: repository root.
- Size: 0 bytes.
- This feature does not change GitHub Pages settings.

## Home page (`index.html`)

- Keeps the bilingual heading and exactly two cards from the landing feature.
- Try links: `./feedback-scenario/` and `./safety-challenge/`.
- Package links: `./dist/feedback-scenario-scorm12.zip` and `./dist/safety-challenge-scorm12.zip`.
- Exactly one HTML comment contains the marker `RELEASE_PAGE` and the URL `https://github.com/senlite/Arabic-Interactive-E-Learning-Samples/releases/tag/v1.0`.
- Sample and landing paths stay relative.

## `README.md`

- English section first. Arabic section is Arabic inside `<div dir="rtl">`, covering the same points.
- Both languages include: what each sample is; `https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/feedback-scenario/`; `https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/safety-challenge/`; how to run locally; `npm run package`; both zip names; SCORM Cloud as the intended SCORM 1.2 check; feedback status `completed` plus a score; safety status `passed` or `failed` against 70; Claude, Cursor, and manual phone and LMS checks.
- No sentence claims a SCORM Cloud registration already happened.
- The git and `gh` command block remains the only place those publish commands are listed. Implementation does not run them.
- Links to `media/*.gif` may 404.

## `CREDITS.md`

- Every image, font, and library already attributed for this project has a source and a licence.
- No new contributor names.

## Footer

Activity footer text remains «نموذج تجريبي من إعداد Twin Particles».
