# /speckit-specify

Build the shared shell for two Arabic RTL e-learning samples. Do not build either activity’s screens in this feature.

Read `Docs/Arabic-eLearning-Samples-Requirements.md` §6, §7, §8.1–§8.3, §8.5, and §10, and `.specify/memory/constitution.md` principles II and III.

Provide:

- Folders `feedback-scenario/`, `safety-challenge/`, `shared/`, `scripts/`, `media/`, and git-ignored `dist/`.
- `shared/base.css`: mobile-first RTL base using logical properties only, Cairo/Tajawal with the spec fallback stack, colour tokens from §7.5, 3px focus-visible ring, 44px targets, reduced motion, skip link.
- `shared/i18n.js`: the §6 string table as `window.UI`, plus `formatNumber()` with `useArabicIndicDigits` default false (Western digits).
- `shared/scorm12.js`: the §8.3 wrapper pasted as specified. No-op with a console log when no LMS API exists. `LMSFinish` once, including `pagehide`.
- `shared/xapi-stub.js`: the §8.5 logger only. No endpoint and no credentials.
- `scripts/sync-shared.mjs` copies shared files into each sample’s `css/` and `js/`.
- `scripts/package.mjs` writes every file into `imsmanifest.xml` (template §8.2) and zips each sample’s contents to `dist/<name>-scorm12.zip` with the manifest at the zip root. `masteryscore` 70 only for the safety challenge. Only devDependency is `archiver`. `package.json` scripts: `package` and `serve`.
- Each sample gets a placeholder `index.html` with `lang="ar"` `dir="rtl"`, viewport, font link, shared CSS/JS, and a main that shows that sample’s Arabic title from §4.5 or §5.6.
- Root `index.html` is a bilingual landing placeholder (final copy is a later feature). README and CREDITS stubs. `.gitignore` ignores `node_modules` and `dist`.
- All activity paths are relative. No framework and no backend.

Out of scope: decision UI, question UI, real images, GitHub release, Moodle or SCORM Cloud runs.

Success: `npm run package` produces two zips, each with `imsmanifest.xml` at the root, and both placeholder pages open in a browser as Arabic RTL.
