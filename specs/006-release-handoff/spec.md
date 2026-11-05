# Feature Specification: Release handoff

**Feature Branch**: `006-release-handoff`

**Created**: 2026-11-05

**Status**: Draft

**Input**: User description: "Close the two finished samples so a reviewer can package them, open them on the public site, and follow the README without asking the author. Target: end of day Friday 6 November 2026. (Docs/Specify-prompts/06-release-handoff.md)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Package both samples for a learning system (Priority: P1)

The author, from the project root and after shared content is in place, runs the documented package command once. The result is exactly two replaceable course packages a reviewer can import as SCORM 1.2. A failed or skipped preparation step is named, and a leftover or half-written package is not treated as a successful result.

**Why this priority**: Without trustworthy packages, the reviewer cannot import the samples, which is the handoff the earlier packaging work left unfinished.

**Independent Test**: Run the package command on a prepared tree and again after a deliberate skip or single-sample failure. Confirm the two named packages, a course manifest at the archive root, overwrite on a second successful run, and a named failure with no false success.

**Acceptance Scenarios**:

1. **Given** shared content has been synced, **When** the author runs the package command from the project root, **Then** the only packages produced are `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`.
2. **Given** either package, **When** it is opened, **Then** `imsmanifest.xml` is at the archive root, and the package is SCORM 1.2.
3. **Given** both packages already exist, **When** the command succeeds again, **Then** those two artifacts are replaced.
4. **Given** the shared sync was skipped or one sample fails, **When** the command finishes, **Then** it names that failure and does not present a stale or partial package as success.
5. **Given** a package whose course manifest sits inside a nested folder, **When** the package is checked, **Then** that package is a failure.

---

### User Story 2 - Open the public site without broken sample paths (Priority: P1)

A person who later turns on the public site from the main branch root can open the landing page and both samples. Sample and landing addresses stay relative. An empty `.nojekyll` file at the repository root tells the host to serve those directories and assets as files.

**Why this priority**: Relative links and the empty host file are the difference between a site that shows the samples and a site that hides them. This feature does not change host settings.

**Independent Test**: Confirm `.nojekyll` exists and is empty, and that every sample and landing address on the home page and in the readme is relative to the site root. Do not change hosting settings.

**Acceptance Scenarios**:

1. **Given** the repository root, **When** a release check looks for hosting readiness, **Then** an empty `.nojekyll` file is present. Its absence fails the check even if the pages work on a local server.
2. **Given** the landing page and both samples, **When** their links and asset addresses are inspected, **Then** every sample and landing path is relative.
3. **Given** this feature, **When** the handoff is prepared, **Then** public-site settings are left unchanged.

---

### User Story 3 - Finish each sample on the main path (Priority: P1)

A reviewer plays each sample’s main path in a desktop-width window and in a 360 px-wide window. Arabic layout stays right to left. Primary controls stay visible, the page does not force horizontal scrolling, and the browser console shows no errors from open, through the main interaction, to the end state. Only defects on that path are fixed.

**Why this priority**: A package and a readme do not help if the samples break before the end state.

**Independent Test**: Play the feedback scenario through to the debrief, and the safety challenge through to results or game over, at desktop width and at 360 px, and confirm right-to-left layout, visible primary controls, no forced horizontal scroll, and a console with no errors.

**Acceptance Scenarios**:

1. **Given** the feedback scenario, **When** the reviewer completes the main path, **Then** it reaches the debrief at desktop width and at 360 px width, with the document set right to left.
2. **Given** the safety challenge, **When** the reviewer completes the main path, **Then** it reaches results or game over at desktop width and at 360 px width, with the document set right to left.
3. **Given** either width, **When** the main path is in progress, **Then** primary controls are not clipped and the page does not force horizontal scrolling.
4. **Given** either sample, **When** the reviewer goes from open through the main interaction to the end state, **Then** the browser console shows no errors.
5. **Given** a 360 px Arabic layout that clips a primary button, **When** the smoke path is judged, **Then** that layout is a failure.
6. **Given** a defect off the main path, or a wish to change learner-facing Arabic or game rules, **When** the smoke pass is done, **Then** those items stay unchanged. Fixes are limited to broken navigation, missing assets, layout that hides controls, and script errors on the main path.

---

### User Story 4 - Follow the readme and credits without asking the author (Priority: P2)

A reviewer reads `README.md` in English and then the same content in Arabic, and reads `CREDITS.md` for every image, font, and library already attributed for this project. The readme states what each sample is, the live addresses, how to run locally, how to package, the intended learning-system check, a short note on how the work was assisted, and the exact commands a person would use later to publish. It does not claim a learning-system run that has no registration report in the repository.

**Why this priority**: The reviewer is expected to use only the readme, the landing page, and the two packages.

**Independent Test**: Read the English section, the Arabic section, and the credits, and check each documentation point below without opening the activities.

**Acceptance Scenarios**:

1. **Given** `README.md`, **When** a reviewer reads it, **Then** English comes first and the same content follows in Arabic inside a right-to-left region. The Arabic is Arabic, not an untranslated English copy.
2. **Given** either language, **When** the reviewer looks up the samples, **Then** the readme says what each sample is and gives the live addresses `https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/feedback-scenario/` and `https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/safety-challenge/`.
3. **Given** either language, **When** the reviewer looks up local use and packaging, **Then** the readme explains how to run locally, names the package command, and names the two zip files.
4. **Given** either language, **When** the reviewer looks up the learning-system check, **Then** it says the intended check is SCORM Cloud with SCORM 1.2: the feedback sample reports completed plus a score, and the safety sample reports passed or failed against 70.
5. **Given** either language, **When** the reviewer reads the assisted-work note, **Then** it says Claude for the script, Cursor for the code, and manual checks on a phone and in a learning system.
6. **Given** no registration report in the repository, **When** the readme is read, **Then** it does not claim that a SCORM Cloud run already happened.
7. **Given** links to `media/*.gif`, **When** those files are absent, **Then** the links may not resolve. The links are the agreement; recording the files is not part of this feature.
8. **Given** `CREDITS.md`, **When** a reviewer reads it, **Then** every image, font, and library already attributed for this project is listed with its source and licence. No contributors are invented.
9. **Given** either activity, **When** the reviewer reaches the footer, **Then** it still reads «نموذج تجريبي من إعداد Twin Particles».
10. **Given** the readme only, **When** the reviewer looks up publishing steps, **Then** it lists the exact git and `gh` commands to push `main`, enable the public site from the `main` branch root, and create Release v1.0 with both dist packages attached. This feature does not run those commands.

---

### User Story 5 - Leave the landing page one edit from the release (Priority: P2)

The home page keeps the bilingual heading and two cards already specified. Each card links to its sample with a relative path and to that sample’s SCORM 1.2 package. Until Release v1.0 asset addresses exist, the package links point at the `dist/` packages with relative addresses, and the release-page address sits in one clearly marked placeholder so a single edit finishes the handoff.

**Why this priority**: Unknown release-asset addresses must not block merging the relative package links.

**Independent Test**: Open the home page and follow each sample link and each package link. Confirm the release-page address is isolated in one marked placeholder.

**Acceptance Scenarios**:

1. **Given** the home page, **When** a reviewer opens it, **Then** the bilingual heading and two cards from the landing feature are still there.
2. **Given** a card, **When** the reviewer follows the sample link, **Then** it uses a relative path to that sample.
3. **Given** a card, **When** the reviewer follows the package link before Release v1.0 asset addresses exist, **Then** it uses a relative address to that sample’s `dist/` zip.
4. **Given** the home page, **When** the reviewer looks for the release page, **Then** its address is one clearly marked placeholder, so one edit can point the handoff at the release later.
5. **Given** unknown Release asset addresses, **When** the relative `dist/` links are present, **Then** those unknown addresses do not block merging.

---

### Edge Cases

- A course manifest nested inside a folder is a failed package.
- A 360 px Arabic layout that clips a primary button is a failed smoke path.
- A missing `.nojekyll` file is a failed release check even when the pages work on a local server.
- Unknown Release asset addresses do not block merging the relative `dist/` package links.
- Running the package command again replaces the two named packages; it does not add a third package or leave the previous zip as the successful result.
- A skipped shared sync or a single-sample failure names the problem and does not report success from a stale or partial zip.
- Links to short recordings under `media/*.gif` may not resolve. That absence does not fail this feature.
- A SCORM Cloud registration report is not in the repository, so the readme must not describe that check as already done.
- Learner-facing Arabic and game rules that are not broken on the main path stay as they are.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: After shared content is synced, the package command run from the project root MUST write exactly `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`.
- **FR-002**: Each package MUST be SCORM 1.2 and MUST contain `imsmanifest.xml` at the archive root.
- **FR-003**: A second successful package run MUST overwrite those two artifacts.
- **FR-004**: If the shared sync was skipped or one sample fails, the command MUST name the failure and MUST NOT present a stale or partial package as success.
- **FR-005**: Manifest rules, scores, and the local harness MUST stay as already specified for the packaging feature. This feature MUST NOT re-specify the activities.
- **FR-006**: The repository root MUST contain an empty `.nojekyll` file so a later public site serves the sample directories and assets as files.
- **FR-007**: Every sample and landing path MUST stay relative. This feature MUST NOT change public-site settings.
- **FR-008**: Both samples MUST complete their main path at desktop width and at 360 px width, with the document set right to left, with no clipped primary controls and no forced horizontal scroll.
- **FR-009**: From open, through the main interaction, to the end state, the browser console MUST show no errors. The feedback end state is the debrief. The safety end state is results or game over.
- **FR-010**: Fixes MUST be limited to defects on that path: broken navigation, missing assets, layout that hides controls, and script errors. Learner-facing Arabic and game rules MUST stay unchanged.
- **FR-011**: `README.md` MUST present English first, then the same content in Arabic inside a right-to-left region. The Arabic MUST be Arabic.
- **FR-012**: Both languages MUST state what each sample is; the live addresses under `https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/`; how to run locally; the package command and the two zip names; that the intended learning-system check is SCORM Cloud with SCORM 1.2 (feedback sample: completed plus score; safety sample: passed or failed against 70); and a short assisted-work note (Claude for the script, Cursor for the code, manual checks on a phone and in a learning system).
- **FR-013**: The readme MUST NOT claim a SCORM Cloud run happened unless a registration report is already in the repository.
- **FR-014**: The readme MAY link to `media/*.gif`. Those links are the agreement; producing the recording files is out of scope.
- **FR-015**: `CREDITS.md` MUST list every image, font, and library already attributed for this project, with source and licence, and MUST NOT invent contributors.
- **FR-016**: The activity footer MUST remain «نموذج تجريبي من إعداد Twin Particles».
- **FR-017**: The home page MUST keep the bilingual heading and two cards. Each card MUST link to its sample with a relative path and to that sample’s SCORM 1.2 package.
- **FR-018**: Until GitHub Release v1.0 asset addresses exist, package links MUST use relative `dist/` addresses, and the release-page address MUST be isolated in one clearly marked placeholder.
- **FR-019**: The readme only MUST list the exact git and `gh` commands to push `main`, enable the public site from the `main` branch root, and create Release v1.0 with both dist packages attached. This feature MUST NOT run those commands.

### Key Entities

- **Course package**: One SCORM 1.2 zip per sample, named as above, with the course manifest at the archive root, replaced on each successful package run.
- **Hosting marker**: An empty `.nojekyll` file at the repository root. Sample and landing addresses stay relative to that root.
- **Smoke path**: The main path of each sample from open to its end state, judged at desktop width and at 360 px, right to left, with a quiet console.
- **Reviewer readme**: English then Arabic instructions covering samples, live addresses, local run, packaging, the intended learning-system check, the assisted-work note, recording links, and unpublished git and `gh` commands.
- **Credits list**: Source and licence for each image, font, and library already attributed for this project.
- **Landing card**: One card per sample, with a relative try link, a relative package link, and a single placeholder for the later release page.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Both named packages exist, each opens with `imsmanifest.xml` at the archive root, and a second successful run replaces those two files only.
- **SC-002**: A skipped shared sync or a one-sample failure is named, and that run is not counted as success.
- **SC-003**: Both main paths finish with zero console errors at desktop width and at 360 px width, with right-to-left layout intact and no clipped primary control or forced horizontal scroll.
- **SC-004**: The English readme, the Arabic readme, and the credits list contain every documentation point in FR-011 through FR-016 and FR-019.
- **SC-005**: The landing page resolves both sample paths and both package links, and the release-page address is one marked placeholder.
- **SC-006**: A reviewer who has only the readme can produce the two packages and can tell what to import into a SCORM 1.2 learning system, without asking the author.
- **SC-007**: The handoff is ready for review by the end of Friday 6 November 2026, without enabling the public site, creating the release, or uploading the packages as part of this feature.

## Assumptions

- The two activities, their learner-facing Arabic, their scores, and their game rules are already specified. This feature finishes packaging, hosting readiness, smoke-path defects, documentation, and landing links.
- The public site base, once a person enables it, is `https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/`. Sample paths are `/feedback-scenario/` and `/safety-challenge/`. Repository `senlite/Arabic-Interactive-E-Learning-Samples`, branch `main`, site root.
- Actors for this feature are the author, who runs the package command and commits hosting and documentation fixes, and the reviewer, who uses only the readme, the landing page, and the two packages. A learning-system administrator who imports the packages comes later and is outside this feature.
- Manifest rules, scores, and the local package check stay as specified in the SCORM packaging feature. The landing heading and two cards stay as specified in the landing feature, except that package links now point at the relative `dist/` zips until release asset addresses exist.
- Out of scope, because a person does them later or they were explicitly deferred: enabling the public site, creating Release v1.0, uploading the packages, a SCORM Cloud upload and registration-report screenshots, GIF or MP4 recordings, phone-hardware testing, replying to the reviewer, the xAPI log stub, Moodle packaging, self-hosted fonts, landing-page visual polish beyond the links above, SCORM 2004, cmi5, and any rewrite of learner-facing Arabic.
- No new product is introduced. Credits name only sources already attributed for this project.
