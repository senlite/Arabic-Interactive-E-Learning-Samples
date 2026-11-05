# Contract: package run

**Command**: `npm run package` from the repository root.

**Preconditions**: `feedback-scenario/`, `safety-challenge/`, and the shared files the packaging feature already requires are present. The command copies shared files before it zips.

## Success

- Exit code 0.
- Exactly these two files are the packages written by the run: `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`.
- Each zip has `imsmanifest.xml` as an entry at the archive root, not under a folder name.
- Schema version remains 1.2. Mastery score 70 remains only on the safety package. Score math and the harness stay as in the packaging feature.
- A second success overwrites those two paths.

## Failure

- Exit code is non-zero.
- stderr includes the error message (`Missing sample folder: …`, `Missing shared file: …`, or the sync or archive error text).
- No `dist/*.zip.partial` file remains.
- The command does not exit 0 because an older zip is still on disk.

## Out of contract

SCORM 2004, cmi5, Moodle packaging, and uploading the zips.
