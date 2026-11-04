# Contract: browser globals

Loaded by each sample page, in order: `js/i18n.js`, `js/scorm12.js`, `js/xapi-stub.js`.

## `window.UI`

- Object whose own keys are exactly the §6 keys.
- Each value equals the §6 Arabic string, including placeholders `{n}`, `{total}`.
- `UI.useArabicIndicDigits === false` initially.
- `UI.formatNumber(n)` is a function.

## `window.SCORM`

Methods: `init()`, `set(key, value)`, `score(raw)`, `status(status)`, `commit()`, `finish()`, `isLMS()`.

`init` and `finish` are safe to call when no LMS API exists. `finish` is idempotent.

## `window.XAPI`

- `endpoint === null`
- `send(verb, extra)` returns a statement object and does not throw when `fetch` is unavailable.
- The returned statement includes `actor`, `verb.id`, `object`, and `timestamp`.
