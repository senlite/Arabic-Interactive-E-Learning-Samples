# /speckit-specify

Make both samples importable SCORM 1.2 packages and prove the runtime call order locally.

Read `Docs/Arabic-eLearning-Samples-Requirements.md` §8 and §11.3, and constitution principle III. Do not change learner-facing Arabic or game rules.

Requirements:

- `npm run package` (sync shared files, then package) writes `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`.
- Each zip has `imsmanifest.xml` at the root, schemaversion 1.2, every packaged file listed, the correct identifier and Arabic title from §8.2, and `adlcp:masteryscore` 70 only on the safety challenge. XSD files are optional and should be omitted.
- The dev-only harness `scripts/scorm-harness.html` defines `window.API` (`LMSInitialize`, `LMSSetValue`, `LMSGetValue`, `LMSCommit`, `LMSFinish`, `LMSGetLastError`, `LMSGetErrorString`, `LMSGetDiagnostic`), logs every call in a visible table, and loads one sample in an iframe. The harness must not be inside either zip.
- Call order to confirm: `LMSInitialize`, then `cmi.core.lesson_status` `incomplete`, then score min, max, and raw, then lesson status `completed` (sample 1 on debrief) or `passed`/`failed` (sample 2 on results or game over), then `LMSCommit`, then `cmi.core.session_time`, then `LMSFinish` exactly once.
- `finish()` also runs on `pagehide` and must not run a second time.
- Sample 1 raw score is round(points/30×100). Sample 2 raw score is round(base points/1000×100). Retry keeps the higher score.
- Standalone (no API) still completes the activity and shows the §6 standalone saved message.
- README section “Build the SCORM package” explains the command and what the zip contains. A real SCORM Cloud or Moodle upload is a manual gate, not part of this feature’s automation. Document the expected registration result: sample 1 `completed` plus score; sample 2 `passed` or `failed` against 70.

Out of scope: SCORM 2004, cmi5, a live xAPI LRS, and hosting the zips on GitHub Releases (a later feature describes the release commands).
