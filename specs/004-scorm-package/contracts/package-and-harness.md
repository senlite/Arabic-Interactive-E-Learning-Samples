# Contract: package command and local harness

## `npm run package`

1. Copy `shared/` into both sample folders.
2. Write each `imsmanifest.xml` from the files present after the copy.
3. Write `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip` with `imsmanifest.xml` at the zip root.
4. Schema version is `1.2`. Identifiers and Arabic titles match [data-model.md](../data-model.md). Mastery score `70` only in the safety zip.
5. The zip contains no `.xsd` file and no `scorm-harness.html`.
6. Every other file in the zip is listed in the manifest.

## `scripts/scorm-harness.html`

- Defines `window.API` with `LMSInitialize`, `LMSSetValue`, `LMSGetValue`, `LMSCommit`, `LMSFinish`, `LMSGetLastError`, `LMSGetErrorString`, and `LMSGetDiagnostic`.
- Appends every call to a visible table before returning.
- `LMSGetValue("cmi.core.lesson_status")` returns `not attempted` until a set changes it. Other gets return an empty string. Set, commit, finish, and initialize return `"true"`. Last error returns `"0"`.
- Loads `../feedback-scenario/index.html` or `../safety-challenge/index.html` in one iframe. The query `?sample=safety-challenge` selects the safety sample. Any other value selects the feedback sample.
- The page is not copied into either sample and is not part of either zip.

## README

A section titled `Build the SCORM package` names `npm run package`, both zip file names, the root manifest, schema 1.2, mastery 70 only on the safety package, and the registration result: feedback `completed` plus score; safety `passed` or `failed` against 70. The Arabic README block states the same facts. It does not claim an automated upload.
