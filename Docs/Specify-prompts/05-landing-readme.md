# /speckit-specify

Publish a bilingual portfolio front door for the two finished samples. Do not change activity behaviour.

Read `Docs/Arabic-eLearning-Samples-Requirements.md` §10 (landing paragraph), §9, §12, and §13, and constitution principle V.

The root `index.html` heading is “Arabic Interactive E-Learning Samples / نماذج تعلّم تفاعلي باللغة العربية”. Two cards, one per sample, each with the Arabic title, a one-line description, a «جرّب النموذج» link to `./feedback-scenario/` or `./safety-challenge/`, and a “Download SCORM 1.2” link aimed at a GitHub Release v1.0 asset (placeholder URL until the release exists). A short note states the AI-assisted workflow: Claude for the script, Cursor for the code, manual QA on a phone and in an LMS. Add `.nojekyll`. Every path is relative.

`README.md` is English, then the same content in Arabic inside `<div dir="rtl">`: what each sample is, live link placeholders `https://<account>.github.io/arabic-elearning-samples/`, how to run locally, how to build the SCORM zip, LMS tested (SCORM Cloud first, Moodle sandbox if time allows), the three-line AI workflow, and links to `media/*.gif` (files may be absent; the links are the contract). `CREDITS.md` lists every image, font, and library from §9 with source and licence, including generated art, Wikimedia ISO 7010 M014 (public domain), Google Fonts (OFL), optional OpenMoji (CC BY-SA 4.0), and optional SortableJS (MIT).

Footer on both activities stays «نموذج تجريبي من إعداد Twin Particles» unless the owner changes branding.

Also list the exact git and `gh` commands to push `main`, enable GitHub Pages from the main branch root, and create Release v1.0 with both `dist` zips attached. Do not run those commands in this feature.

Out of scope: new question types, rewriting Arabic activity copy, SCORM 2004, and recording the GIFs (the README only links them).
