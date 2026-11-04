# Quickstart: Shared sample shell

## Prerequisites

Node.js 18 or newer. No global packages.

## Setup

```bash
npm install
```

Only `archiver` should appear in `package.json` dependencies or devDependencies.

## Automated checks

```bash
node --test
```

Expected after implementation: label strings match §6, `formatNumber` uses Western digits by default and Arabic-Indic digits when the flag is on, the safety manifest is the only one with mastery score 70, and every file placed in a sample folder is listed in that manifest.

## Package

```bash
npm run package
```

Expected:

- `dist/feedback-scenario-scorm12.zip`
- `dist/safety-challenge-scorm12.zip`
- Unzipping either archive shows `imsmanifest.xml` beside `index.html`, not inside an extra folder.

## Browser

```bash
npm run serve
```

Open `/`, `/feedback-scenario/`, and `/safety-challenge/`.

Expected:

- Landing page links to both samples in Arabic and English.
- Each sample is `lang="ar"` `dir="rtl"` and shows its §4.5 or §5.6 title.
- At 360 px width the page does not scroll sideways.
- The browser console shows `[SCORM] standalone mode` and does not show an uncaught error.
- Triggering an xAPI send (from the console: `XAPI.send('attempted')`) prints a statement and does not make a network request.
