# Feature Specification: Bilingual portfolio front door

**Feature Branch**: `005-landing-readme`

**Created**: 2026-11-04

**Status**: Draft

**Input**: User description: "Publish a bilingual portfolio front door for the two finished samples. Do not change activity behaviour. (Docs/Specify-prompts/05-landing-readme.md)"

## Clarifications

### Session 2026-11-04

- Q: Should the portfolio home page read left to right, with Arabic phrases set right to left inside it, or should the whole page read right to left? → A: Left-to-right page; Arabic heading half, titles, descriptions, and «جرّب النموذج» are right to left.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Choose a sample from the front door (Priority: P1)

A reviewer opens the portfolio home and sees both samples named in Arabic and English, with a one-line description of each, a way to try the sample, and a way to download its course package.

**Why this priority**: The public demo is the front door. Without it, the two finished samples are folders, not a portfolio.

**Independent Test**: Open the home page and confirm the heading, two cards, try links, and download links, without starting either activity.

**Acceptance Scenarios**:

1. **Given** the portfolio home, **When** a reviewer opens it, **Then** the page reads left to right and the heading reads “Arabic Interactive E-Learning Samples / نماذج تعلّم تفاعلي باللغة العربية”, with the Arabic half reading right to left.
2. **Given** the home page, **When** the reviewer looks at the cards, **Then** there are exactly two: one titled «محادثة التغذية الراجعة: موقف قيادي» and one titled «تحدّي السلامة في موقع العمل», each title, one-line description, and «جرّب النموذج» label reading right to left.
3. **Given** a card, **When** the reviewer follows «جرّب النموذج», **Then** the feedback card opens `./feedback-scenario/` and the safety card opens `./safety-challenge/`.
4. **Given** a card, **When** the reviewer follows “Download SCORM 1.2”, **Then** the link targets that sample’s package on GitHub Release v1.0. Until that release exists, the address is a clearly marked placeholder, not a file inside the site tree.
5. **Given** the home page, **When** the reviewer reads the build note, **Then** it states the assisted workflow in short form: Claude for the script, Cursor for the code, and manual checks on a phone and in a learning system.
6. **Given** the home page is opened from a phone-width window, **When** the reviewer reads both cards, **Then** text stays readable with no horizontal page scroll, and every link or button is at least 44 px in both directions.

---

### User Story 2 - Read how to run, package, and show the work (Priority: P1)

A reviewer opens the project readme, finds the same story in English and then in Arabic, and can follow live-link placeholders, a local run, how the course packages are built, which learning systems were tested, the three-line assisted workflow, and links to the short recordings.

**Why this priority**: The job asks for a bilingual readme as a deliverable alongside the live links.

**Independent Test**: Read the readme top to bottom in both languages and tick each required topic without opening the activities.

**Acceptance Scenarios**:

1. **Given** the readme, **When** a reviewer starts at the top, **Then** the English section comes first and the same topics follow in Arabic inside a right-to-left block.
2. **Given** either language, **When** the reviewer looks for what the samples are, **Then** each sample is named and described in one short passage.
3. **Given** either language, **When** the reviewer looks for the public addresses, **Then** they see placeholders of the form `https://<account>.github.io/arabic-elearning-samples/` plus the two sample paths under that site.
4. **Given** either language, **When** the reviewer looks for local use and packaging, **Then** the readme says how to open the samples locally and how to build the two course packages.
5. **Given** either language, **When** the reviewer looks for learning-system proof, **Then** SCORM Cloud is named first, and the Moodle sandbox is named as the check to do if time allows.
6. **Given** either language, **When** the reviewer looks for how the work was made, **Then** three lines cover script, code, and manual phone plus learning-system checks.
7. **Given** the readme, **When** the reviewer follows the recording links, **Then** they point at `media/feedback-scenario.gif` and `media/safety-challenge.gif`. Missing files do not change the link text; the links themselves are the contract.

---

### User Story 3 - See sources and licences (Priority: P2)

A reviewer opens the credits list and can match every picture, typeface, and library used by the samples to a source and a licence.

**Why this priority**: The portfolio rule is that images are generated for this project or free-licensed, and that proof lives in the credits file.

**Independent Test**: Compare the credits list with the asset table in the build spec and confirm each named item has a source and a licence.

**Acceptance Scenarios**:

1. **Given** the credits file, **When** a reviewer scans images, **Then** each sample image is listed with source and licence, including art generated for this project and the Wikimedia ISO 7010 M014 mark as public domain.
2. **Given** the credits file, **When** the reviewer scans typefaces, **Then** Google Fonts used by the samples are listed under the Open Font License.
3. **Given** optional pieces that may or may not ship, **When** the reviewer scans libraries, **Then** OpenMoji is listed as CC BY-SA 4.0 and SortableJS as MIT, each marked optional when it is not actually used.
4. **Given** generated art, **When** the reviewer reads its row, **Then** the generating tool and the prompt used are recorded.

---

### User Story 4 - Publish without this feature doing the publish (Priority: P2)

The owner can copy exact commands to push `main`, turn on GitHub Pages from the main branch root, and create Release v1.0 with both course packages attached. This feature writes those commands. It does not run them.

**Why this priority**: The live links and the release are how the portfolio is handed over, and the owner must run them on the chosen account.

**Independent Test**: Read the published command list and confirm it covers push, Pages from `main` at the repository root, and Release v1.0 with both packages, and confirm no publish step was executed by this feature.

**Acceptance Scenarios**:

1. **Given** the command list in the readme, **When** the owner reads it, **Then** it includes the exact git and `gh` commands to push `main`, enable GitHub Pages from the `main` branch root, and create Release v1.0 with `feedback-scenario-scorm12.zip` and `safety-challenge-scorm12.zip` attached.
2. **Given** this feature is finished, **When** the repository history is checked, **Then** those publish commands have not been run as part of the feature.
3. **Given** the site root, **When** the host is prepared for plain-file publishing, **Then** a `.nojekyll` marker is present so the host does not rewrite the site.
4. **Given** any link on the home page or inside a sample, **When** its address is inspected, **Then** it is relative, so the same folders work on the public site, a drop host, a local disk, and inside a learning-system frame.

---

### Edge Cases

- The home page is left to right. Only the Arabic heading half, card titles, one-line descriptions, and «جرّب النموذج» read right to left. Activity pages stay fully right to left, as already specified for those samples.
- The GitHub account name is still unknown. Live links stay as `https://<account>.github.io/arabic-elearning-samples/` until the owner substitutes the account. Download links stay as Release v1.0 placeholders until the release exists.
- Recording files may be absent. The readme still links `media/*.gif`. This feature does not record them.
- Optional OpenMoji or SortableJS may be unused. Credits still name them and mark them optional when absent.
- Footer branding stays «نموذج تجريبي من إعداد Twin Particles» on both activities unless the owner changes branding. This feature does not rewrite activity screens, scores, or Arabic activity copy.
- A visitor with no network can still open the home page and the try links by relative path. Font stylesheets may be the only outbound request already allowed by the samples; the home page adds none of its own.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The portfolio MUST offer a home page whose heading is “Arabic Interactive E-Learning Samples / نماذج تعلّم تفاعلي باللغة العربية”. The page itself MUST read left to right. The Arabic half of the heading MUST read right to left.
- **FR-002**: The home page MUST show exactly two cards, one for each finished sample. Each card has the Arabic title, one line of description, and a «جرّب النموذج» label, and those three read right to left. Each card also has a “Download SCORM 1.2” link that stays in the left-to-right page order.
- **FR-003**: Try links MUST open `./feedback-scenario/` and `./safety-challenge/` respectively.
- **FR-004**: Download links MUST aim at the matching package on GitHub Release v1.0. Until that release exists, the address MUST be an obvious placeholder and MUST NOT point at a copy of the package inside the published site.
- **FR-005**: The home page MUST include a short note that the script was drafted with Claude, the pages were built in Cursor, and a person checked them on a phone and in a learning system.
- **FR-006**: The site root MUST include a `.nojekyll` marker, and every path used by the home page MUST be relative.
- **FR-007**: `README.md` MUST present the English guide first, then the same guide in Arabic inside a right-to-left block.
- **FR-008**: Each language in the readme MUST cover what each sample is, live-link placeholders `https://<account>.github.io/arabic-elearning-samples/` (including both sample paths), how to run locally, how to build the two course packages, learning systems tested (SCORM Cloud first, Moodle sandbox if time allows), the three-line assisted workflow, and links to `media/feedback-scenario.gif` and `media/safety-challenge.gif`.
- **FR-009**: `CREDITS.md` MUST list every image, typeface, and library from the build-spec asset table with source and licence, including generated art (tool and prompt), Wikimedia ISO 7010 M014 (public domain), Google Fonts (Open Font License), optional OpenMoji (CC BY-SA 4.0), and optional SortableJS (MIT).
- **FR-010**: The readme MUST list the exact git and `gh` commands to push `main`, enable GitHub Pages from the main branch root, and create Release v1.0 with both package files attached. This feature MUST NOT run those commands.
- **FR-011**: Activity behaviour, Arabic activity copy, scores, and the activity footer «نموذج تجريبي من إعداد Twin Particles» MUST stay as they are unless the owner changes branding.
- **FR-012**: The home page MUST be readable at 360 px width with no horizontal scroll, with try and download controls at least 44 px, and with text contrast of at least 4.5:1.

### Key Entities

- **Home card**: One sample’s public entry: Arabic title, one-line description, try link, download link.
- **Readme guide**: The bilingual operating note: sample summaries, public addresses, local run, package build, learning-system checks, workflow, recording links, and the unpublished command list.
- **Credit row**: One asset’s name, where it is used, source, and licence. Optional assets stay in the list and are marked optional when unused.
- **Release placeholder**: The not-yet-published v1.0 address for each course package, replaced only when the owner creates the release.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reviewer can name both samples and open each try link from the home page in under one minute.
- **SC-002**: Both download links name Release v1.0 and the correct package, and neither link serves a package from the site tree before that release exists.
- **SC-003**: A reviewer can find all seven readme topics (what the samples are, live links, local run, package build, learning systems, three-line workflow, recording links) in English and again in Arabic without asking the author.
- **SC-004**: Every image, typeface, and library named in the asset table has a credits row with source and licence. A spot check of five rows matches the table.
- **SC-005**: The command list contains one push of `main`, one Pages setup from the main branch root, and one Release v1.0 that attaches both packages. Completing this feature leaves the remote, Pages, and releases unchanged.
- **SC-006**: Opening both activities after this feature shows the same screens, scores, and footer as before it.

## Assumptions

- The home page reads left to right. Arabic card copy and the Arabic half of the heading are right-to-left islands inside that page. The English readme block stays left to right; the Arabic readme block stays right to left, as already required.
- One-line card descriptions are short Arabic summaries of the existing samples: a three-decision feedback conversation, and a ten-question workplace safety challenge. They are new landing copy, not a rewrite of activity script.
- The GitHub account is still the owner’s choice. Placeholders use `<account>` until that name is known. The repository name in public URLs is `arabic-elearning-samples`.
- Course packages already exist as build outputs named `feedback-scenario-scorm12.zip` and `safety-challenge-scorm12.zip`. This feature links them; it does not rebuild them.
- Recording the GIFs and uploading them is out of scope. Linking them is in scope.
- Moodle proof stays optional and second to SCORM Cloud, matching the build spec. This feature documents that order; it does not run the learning-system checks.
- Footer text stays Twin Particles. Senlite or a personal name would be an owner decision, not part of this feature.
- Netlify Drop remains a documented fallback in the build spec. This feature does not require a Netlify deploy; relative paths keep that fallback possible.
- Out of scope: new question types, rewriting Arabic activity copy, SCORM 2004, and recording the GIFs.
