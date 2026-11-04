# Contract: packaging commands

## `npm run package`

1. Copy shared shell files into both sample folders.
2. Write `imsmanifest.xml` in each sample from the files present after the copy.
3. Write `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`.
4. Each zip’s first-level entries include `imsmanifest.xml` and `index.html` (no wrapping folder).
5. Safety manifest contains `<adlcp:masteryscore>70</adlcp:masteryscore>`. Feedback manifest does not contain `masteryscore`.
6. Exit non-zero with a message if a sample folder or a required shared file is missing. Do not leave a zip that claims success.

## `npm run serve`

Serves the repository root over HTTP so `/`, `/feedback-scenario/`, and `/safety-challenge/` open in a browser. No extra npm dependency.
