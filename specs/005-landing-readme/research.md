# Research: Bilingual portfolio front door

## Page direction

- **Decision**: `index.html` uses `lang="en"` and `dir="ltr"`. The Arabic heading half, each card title, each one-line description, and each «جرّب النموذج» label use `lang="ar"` and `dir="rtl"`. “Download SCORM 1.2” stays in the page’s left-to-right order.
- **Rationale**: Clarification on 2026-11-04. The heading and the readme lead with English. Activity pages stay fully right to left and are not restyled.
- **Alternatives considered**: A fully right-to-left home page was rejected because it would reverse the English heading and the download label.

## Download addresses

- **Decision**: Placeholder hrefs are `https://github.com/<account>/arabic-elearning-samples/releases/download/v1.0/feedback-scenario-scorm12.zip` and the same path with `safety-challenge-scorm12.zip`. The token `<account>` stays literal until the owner substitutes it.
- **Rationale**: The spec requires an obvious Release v1.0 placeholder and forbids serving the zips from the site tree. The `<account>` token cannot resolve, so a click cannot accidentally download a local file.
- **Alternatives considered**: A `href="#"` placeholder hides the release path. Linking `dist/*.zip` would publish packages on Pages.

## Home page behaviour

- **Decision**: Static HTML and CSS only. No JavaScript. Fonts may use the same Google Fonts stylesheet the samples already use. Colours are the constitution tokens. Body text is at least 16 px. Links are inline-block controls with a minimum of 44 px on each side.
- **Rationale**: The page is two cards and a note. A script would add a stack the constitution does not allow for activities and is unnecessary here.
- **Alternatives considered**: A shared runtime import was rejected so sample engines stay untouched.

## One-line descriptions

- **Decision**: Feedback card: «موقف من ثلاث قرارات حول إعطاء التغذية الراجعة». Safety card: «عشرة أسئلة عن السلامة في موقع العمل».
- **Rationale**: The spec assumes short Arabic summaries and does not lock wording in the activity script. These lines name the format without rewriting learner copy.
- **Alternatives considered**: Copying a full overview paragraph would break the one-line card.

## Readme shape

- **Decision**: English sections first. Then one `<div dir="rtl" lang="ar">` containing the same topics in Arabic. Topics, in both languages: what each sample is, live links `https://<account>.github.io/arabic-elearning-samples/` plus `/feedback-scenario/` and `/safety-challenge/`, local open instructions, `npm run package`, SCORM Cloud first and Moodle sandbox if time allows, three workflow lines (Claude script, Cursor code, manual phone and LMS check), and links to `media/feedback-scenario.gif` and `media/safety-challenge.gif`.
- **Rationale**: Matches the build spec §10 prompt and FR-007–FR-008. Missing GIF files do not remove the links.
- **Alternatives considered**: Two files would fail the single bilingual readme deliverable.

## Credits rows

- **Decision**: One markdown table. Rows cover every §9 image path, Google Fonts Cairo and Tajawal (Open Font License), Wikimedia ISO 7010 M014 (public domain, Commons URL), generated art with tool and prompt, optional OpenMoji (CC BY-SA 4.0), and optional SortableJS (MIT). Optional rows say “not used” when the file or library is absent.
- **Rationale**: FR-009 and constitution V. Marking unused optionals avoids claiming a licence that is not in the build.
- **Alternatives considered**: Omitting unused optionals would fail the spec line that names them.

## Publish commands

- **Decision**: The English readme includes a fenced block the owner can copy. This feature does not execute it. Commands are `git push -u origin main`, `gh api` to set Pages to branch `main` and path `/`, and `gh release create v1.0` with both `dist` zips attached.
- **Rationale**: FR-010. Pages from the repository root needs `.nojekyll` so Jekyll does not skip underscored paths or rewrite the site.
- **Alternatives considered**: Running the commands in implementation would publish before the owner chooses the account. A workflow file would add a stack step the brief does not ask for.

## Automated checks

- **Decision**: `tests/landing-readme.test.mjs` reads the files as text with Node’s built-in test runner. It does not launch a browser. The 360 px layout check stays in `quickstart.md`.
- **Rationale**: The programmable contracts are strings, links, and direction attributes. Test-first applies to those checks. Pixel layout is a manual gate, as with earlier features.
- **Alternatives considered**: A browser test runner would be a new dependency. `Docs/TechnologyStack.md` does not list one.
