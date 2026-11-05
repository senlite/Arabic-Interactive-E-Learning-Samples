# Quickstart: Release handoff

Validate the contracts in [package-run.md](./contracts/package-run.md), [handoff-docs.md](./contracts/handoff-docs.md), and [smoke-path.md](./contracts/smoke-path.md). Field rules are in [data-model.md](./data-model.md).

## Preconditions

- Repository root, dependencies already installed (`archiver` only).
- Do not run `git push`, Pages settings, or `gh release`.

## Automated

From the repository root:

```bash
node --test tests/manifest.test.mjs tests/landing-readme.test.mjs
```

Expected after implementation:

- A successful `packageSamples` run produces both named zips with `imsmanifest.xml` at the archive root.
- A run that hits a missing shared file or a forced archive failure exits non-zero, names the failure, and leaves no `dist/*.zip.partial`.
- `index.html` package links are the relative `dist/` zips, and one `RELEASE_PAGE` comment holds the senlite release tag URL.
- `README.md` contains the senlite sample URLs, `completed`, `passed` or `failed`, and `70`, in English and in the Arabic block.
- `.nojekyll` exists and is empty.

Write the failing assertions before changing `scripts/package.mjs`, `index.html`, or `README.md`.

## Package by hand

```bash
npm run package
```

Confirm the two zip names under `dist/` and that a second run overwrites them. Unzip one archive far enough to see `imsmanifest.xml` at the top level.

## Browser

Serve the root or open the files over http. Follow [smoke-path.md](./contracts/smoke-path.md) at desktop width and at 360 px. If a primary control is clipped or the console reports a page error, fix only that defect and repeat the path.

## Reviewer read

Read `README.md` and `CREDITS.md` only. Confirm a reviewer could run the package command and could tell what a SCORM 1.2 import should record, without a claim that SCORM Cloud was already run.
