# Research: Shared sample shell

## Decision: Paste the published SCORM 1.2 wrapper

**Rationale**: Constitution principle III and build spec §8.3 require that exact minimal wrapper: find `API`, `LMSInitialize` once, set score and status, `LMSCommit`, and `LMSFinish` once on `pagehide` and `beforeunload`. A rewrite would drift from the integration bar.

**Alternatives considered**: A thinner wrapper that only no-ops. Rejected because later samples must call `SCORM.score`, `SCORM.status`, `SCORM.commit`, and `SCORM.finish` without a second integration pass.

## Decision: Paste the published xAPI logger with `endpoint: null`

**Rationale**: §8.5 is a pitch stub. It logs statements and never sends them. Credentials must not enter the repo.

**Alternatives considered**: Omitting the stub (constitution allows cutting xAPI first if time is short). Rejected for this feature because the source prompt includes it and it is a few lines with no network call.

## Decision: Shared label table on `window.UI`, digits via `formatNumber`

**Rationale**: §6 is the canonical string table. `useArabicIndicDigits` defaults to false so scores stay Western digits. Turning it on uses `Intl.NumberFormat('ar-SA-u-nu-arab')` or an equivalent Arabic-Indic conversion. The setting lives next to the table so both samples share one switch.

**Alternatives considered**: Hard-coding strings in each placeholder. Rejected because later screens must reuse one table.

## Decision: Node built-in test runner, no extra test package

**Rationale**: Programmable rules (digit formatting, label equality, manifest file list, mastery score) need a failing check before implementation. `node --test` needs no dependency. `Docs/TechnologyStack.md` allows only `archiver` as an npm package.

**Alternatives considered**: Adding a test framework. Rejected because the stack file does not allow it.

## Decision: Preview with Node’s `http` module

**Rationale**: The source prompt asks for a `serve` script. A static server in `scripts/` keeps the only dependency as `archiver`.

**Alternatives considered**: The `serve` npm package. Rejected as a stack addition.

## Decision: Manifest file list generated at package time

**Rationale**: §8.2 says the package script fills every `<file>` entry. Hand-maintained lists go stale as soon as shared copies land in the sample folders. `masteryscore` 70 is inserted only when the sample id is `safety-challenge`.

**Alternatives considered**: Committing a static manifest and not regenerating it. Rejected because the spec requires every packaged file to be listed, including files added later.
