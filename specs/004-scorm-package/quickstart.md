# Quickstart: SCORM 1.2 packages and local call-order proof

## Prerequisites

- Node.js with npm
- Repository root as the working directory
- Both sample folders already playable from earlier features

## Automated checks

```sh
npm test
npm run package
```

Expected:

- `tests/scorm12.test.mjs` shows the call order in [contracts/wrapper.md](./contracts/wrapper.md): one initialize, one lesson-status read, incomplete, score min/max/raw, lesson status, one commit, session time, one finish, and no second finish after `pagehide`.
- `tests/manifest.test.mjs` shows both zips have `imsmanifest.xml` at the root, schema version 1.2, the Arabic titles and identifiers, mastery 70 only on the safety zip, every packaged file listed, and neither an `.xsd` nor `scorm-harness.html`.
- `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip` exist.

## Harness

```sh
npm run serve
```

Open `http://localhost:4173/scripts/scorm-harness.html` and `http://localhost:4173/scripts/scorm-harness.html?sample=safety-challenge` (use the port `serve` prints if `PORT` is set).

1. Confirm the table lists initialize and lesson status `incomplete` on load.
2. Finish the feedback sample through debrief and «إنهاء النشاط». The table then shows score min, max, and raw, status `completed`, commit, session time, and finish once. The saved message is «تم حفظ نتيجتك. يمكنك إغلاق هذه النافذة.».
3. Reload the safety sample, finish a run at or above 70 base-derived percent, and confirm status `passed`. A run below 70 shows `failed`.
4. Retry a lower score and confirm the table’s latest raw score and status stay at the better attempt.
5. Hide or close the sample frame after finish and confirm `LMSFinish` was not added again.
6. Open either sample directly, with no harness, finish it, and confirm «انتهى النشاط. (وضع العرض: لا يوجد نظام إدارة تعلّم متصل.)».

## Manual gate (not this feature’s automation)

Import each zip into SCORM Cloud. The feedback registration is `completed` with a score and session time. The safety registration is `passed` or `failed` against 70. Moodle is optional and comes after SCORM Cloud.

## README

The section “Build the SCORM package” matches the command, the zip contents, and the registration results above.
