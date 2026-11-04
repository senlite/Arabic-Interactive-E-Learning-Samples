# Quickstart: Bilingual portfolio front door

## Prerequisites

- Node.js with `node --test`.
- A browser.
- The two sample folders already built. This check does not start their activities beyond opening the try links.

## Automated check

From the repository root:

```bash
node --test tests/landing-readme.test.mjs
```

Expected: the test fails until `index.html`, `assets/landing.css`, `.nojekyll`, `README.md`, and `CREDITS.md` match [contracts/home-page.md](./contracts/home-page.md) and [contracts/readme-and-credits.md](./contracts/readme-and-credits.md). After implementation, the same command passes.

The test reads files as text. It does not push, enable Pages, or create a release.

## Browser check

1. Open `index.html` over a local static server or `file://`.
2. Confirm the heading, two Arabic titles, two «جرّب النموذج» links, and two “Download SCORM 1.2” links.
3. Confirm the document is left to right and the Arabic title, description, try label, and Arabic heading half are right to left.
4. Follow each try link. Each sample opens. Leave the sample without answering. Footers still read «نموذج تجريبي من إعداد Twin Particles».
5. Hover or copy each download link. The address contains `<account>` and `releases/download/v1.0/` and the matching zip name. It does not point at `dist/`.
6. Set the viewport to 360 px wide. The page does not scroll sideways. Try and download controls are at least 44 px in both directions.

## Readme and credits

1. Open `README.md`. English is first. The Arabic block follows inside `<div dir="rtl" lang="ar">`.
2. In both languages, find the live URL placeholder, local run, `npm run package`, SCORM Cloud before Moodle, the three workflow lines, and both `media/*.gif` links.
3. Find the fenced push, Pages, and `gh release create v1.0` commands. Do not run them.
4. Open `CREDITS.md` and match five rows against [data-model.md](./data-model.md): cover, ISO 7010 M014, one badge, Cairo, and SortableJS.

## Out of this check

- Creating GitHub Release v1.0.
- Enabling GitHub Pages.
- Recording GIFs.
- Changing either activity.
