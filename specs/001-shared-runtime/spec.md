# Feature Specification: Shared sample shell

**Feature Branch**: `001-shared-runtime`

**Created**: 2026-11-04

**Status**: Draft

**Input**: User description: "Build the shared shell for two Arabic RTL e-learning samples. Do not build either activity’s screens in this feature. (Docs/Specify-prompts/01-shared-runtime.md)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open a sample as Arabic, right to left (Priority: P1)

A reviewer opens either sample from the portfolio site or directly, and sees a right-to-left Arabic page that names that sample and can be read on a phone without horizontal scrolling.

**Why this priority**: The portfolio fails the Arabic requirement if a page is left-to-right or untitled, even before any activity exists.

**Independent Test**: Open each sample page in a browser at phone width and confirm language, direction, title, and readable layout.

**Acceptance Scenarios**:

1. **Given** the feedback sample page, **When** a reviewer opens it, **Then** the page language is Arabic, the reading direction is right to left, and the visible title is «محادثة التغذية الراجعة: موقف قيادي».
2. **Given** the safety sample page, **When** a reviewer opens it, **Then** the page language is Arabic, the reading direction is right to left, and the visible title is «تحدّي السلامة في موقع العمل».
3. **Given** a 360 px-wide screen, **When** either placeholder page is shown, **Then** the title remains readable with no horizontal page scroll, body text is at least 16 px, and Arabic text is not letter-spaced.
4. **Given** keyboard-only use, **When** the reviewer tabs into the page, **Then** a skip link labelled «تخطَّ إلى المحتوى» is available, focus is shown with a 3 px ring, and interactive targets are at least 44 px.

---

### User Story 2 - Package both samples for a learning system (Priority: P1)

A reviewer produces two course packages and can hand each one to a learning system. Each package describes itself as SCORM 1.2, lists every file it contains, and places that description at the package root.

**Why this priority**: Completion reporting later depends on a package a learning system can import. This feature only prepares that package; it does not run an LMS check.

**Independent Test**: Run the packaging step and inspect both archives: root course description, complete file list, titles, and the mastery mark only on the safety package.

**Acceptance Scenarios**:

1. **Given** a clean project, **When** packaging is run, **Then** two packages appear, one for each sample, named so a reviewer can tell them apart.
2. **Given** either package, **When** it is opened, **Then** the course description is at the archive root (the sample folder itself is not the archive root) and every packaged file is listed.
3. **Given** the feedback package, **When** its course description is read, **Then** the title is «محادثة التغذية الراجعة: موقف قيادي» and no mastery score is set.
4. **Given** the safety package, **When** its course description is read, **Then** the title is «تحدّي السلامة في موقع العمل» and the mastery score is 70.
5. **Given** shared shell files have changed, **When** packaging is run, **Then** both samples receive the same shared shell before they are packaged.

---

### User Story 3 - Behave correctly with and without a learning system (Priority: P2)

A learner can open a sample with no learning system connected and still see the page. When a learning system is present, the sample starts a session once, can record a score and a lesson status, and ends the session exactly once, including when the page is hidden or closed.

**Why this priority**: The job’s integration bar is a session that records and then finishes cleanly, and a public demo that does not crash when no learning system exists.

**Independent Test**: Open a sample with no learning system and confirm it stays usable and logs a standalone note. With a stand-in learning system, confirm one start, one finish on close, and no second finish.

**Acceptance Scenarios**:

1. **Given** no learning system, **When** a sample loads, **Then** nothing is thrown, a standalone note is written to the console, and score or status calls do not fail the page.
2. **Given** a learning system, **When** the sample loads, **Then** the session starts once and an untouched lesson is marked incomplete.
3. **Given** an open session, **When** the page is hidden or unloaded, **Then** session time is recorded and the session finishes exactly once.
4. **Given** a finished session, **When** finish is requested again, **Then** the learning system is not finished a second time.
5. **Given** a score is reported, **When** it is stored, **Then** the minimum is 0, the maximum is 100, and the raw score is a whole number.

---

### User Story 4 - Share one Arabic label set and Western digits (Priority: P2)

Both samples use the same learner-facing labels, and scores, timers, and counters show Western digits unless Arabic-Indic digits are explicitly switched on.

**Why this priority**: Later screens must not invent or rephrase shared labels, and Gulf workplace samples use Western digits by default.

**Independent Test**: Read the shared label set and format sample numbers with the default setting and with Arabic-Indic digits switched on.

**Acceptance Scenarios**:

1. **Given** the shared label set, **When** it is compared with the agreed table, **Then** every key and Arabic string matches, including «تم حفظ نتيجتك. يمكنك إغلاق هذه النافذة.» and «انتهى النشاط. (وضع العرض: لا يوجد نظام إدارة تعلّم متصل.)».
2. **Given** the default digit setting, **When** a number is formatted, **Then** it uses Western digits 0–9.
3. **Given** Arabic-Indic digits are switched on, **When** a number is formatted, **Then** it uses ٠–٩.

---

### User Story 5 - Show a bilingual entry point without sending experience data (Priority: P3)

A visitor lands on a short bilingual page that points at both samples. Experience statements can be composed for a later pitch, but they stay on the machine: no address, no credentials, and nothing is sent.

**Why this priority**: Reviewers need a way to find both samples. A live learning-record store is out of scope and must not appear by accident.

**Independent Test**: Open the landing page and confirm both samples are linked in Arabic and English. Trigger an experience log and confirm it is only printed locally.

**Acceptance Scenarios**:

1. **Given** the site root, **When** a visitor opens it, **Then** they see an Arabic and English heading area and a way to open each sample.
2. **Given** an experience event, **When** it is recorded, **Then** the statement is written locally, names the demo learner, and includes the verb, the Arabic page title, and a timestamp.
3. **Given** the shared experience logger, **When** the project is inspected, **Then** it has no destination address and no credentials.

---

### Edge Cases

- Packaging an empty or missing sample folder fails with a clear message and does not write a partial archive as if it succeeded.
- A shared file that is missing when packaging runs fails with a clear message instead of producing a package that omits it silently.
- Calling finish before a session has started does nothing and does not throw.
- Looking for a learning system stops after a bounded number of parent windows and also checks the window that opened the page.
- Reduced-motion preference removes non-essential motion; any remaining motion stays at or under 300 ms.
- Colour tokens keep text contrast of at least 4.5:1 against white: background `#F7F8FA`, primary `#0F766E`, warning `#B45309`, success `#15803D`, error `#B91C1C`, text `#1F2937`.
- Paths inside a sample stay relative so the same folder works from a public site, from a local file, and inside a learning-system frame.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The project MUST contain two sample folders (feedback scenario and safety challenge), one shared-source folder, a scripts folder, a media folder, and a generated-packages folder that is excluded from version control.
- **FR-002**: Each sample MUST be a self-contained folder whose entry page sets Arabic language and right-to-left direction, includes a viewport for phone width, loads the Arabic typefaces Cairo and Tajawal with the fallback stack Cairo, Tajawal, Noto Sans Arabic, Tahoma, sans-serif, and shows that sample’s Arabic title in the main content.
- **FR-003**: Shared presentation MUST be mobile-first, use logical (start/end) spacing only, expose the colour tokens in FR edge contrast, provide a 3 px focus ring, 44 px targets, a skip link, and respect reduced motion.
- **FR-004**: Both samples MUST share one label table whose keys and Arabic strings match the agreed shared UI strings, including the skip link, saved, and standalone-saved messages.
- **FR-005**: Number formatting MUST default to Western digits and MUST switch to Arabic-Indic digits only when that setting is turned on.
- **FR-006**: The learning-system session helper MUST find the system when one is present, start once, mark an untouched lesson incomplete, set score bounds and a rounded raw score, set lesson status, commit, and finish exactly once on hide and unload. With no system it MUST do nothing harmful and MUST note standalone mode.
- **FR-007**: The experience logger MUST build statements and write them locally only. It MUST NOT include a destination or credentials.
- **FR-008**: One packaging action MUST copy the shared shell into both samples, write a SCORM 1.2 course description, and produce one archive per sample with that description at the archive root. The description MUST list every packaged file except the description file itself.
- **FR-009**: The safety package MUST declare a mastery score of 70. The feedback package MUST NOT declare a mastery score.
- **FR-010**: Course titles in the packages MUST be «محادثة التغذية الراجعة: موقف قيادي» and «تحدّي السلامة في موقع العمل».
- **FR-011**: The site root MUST be a bilingual placeholder that links to both samples. Final landing copy is a later feature. Credits and a bilingual readme MUST exist as stubs that name image and font attribution as still to be filled.
- **FR-012**: Sample pages MUST use relative paths. There MUST be no application framework and no server for learner state. The only project dependency for packaging is the archive tool. Version control MUST ignore installed packages and generated archives.
- **FR-013**: A small footer on sample pages MUST default to «نموذج تجريبي من إعداد Twin Particles» when a footer is shown. Placeholder pages MAY omit activity chrome that later screens will add, but MUST NOT invent a different brand line.

### Key Entities

- **Sample**: One self-contained Arabic activity folder with an entry page, a course description, and copies of the shared shell. Two samples exist: feedback scenario and safety challenge.
- **Shared shell**: The single source for presentation, shared labels, digit formatting, the learning-system session helper, and the local experience logger. Samples receive copies; they do not keep a second source.
- **Course package**: An archive of one sample’s contents, with the course description at the root and a complete file list. Mastery score applies only to the safety challenge.
- **Label table**: The agreed Arabic strings both samples will reuse, plus the digit-style setting.
- **Landing page**: A bilingual pointer to both samples. Final marketing copy is outside this feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reviewer can produce both course packages in one step, and each archive has its course description at the root and lists every archived file except the course description itself.
- **SC-002**: Both sample pages open in a browser as Arabic, right to left, each showing its own agreed title, with no horizontal scroll at 360 px width.
- **SC-003**: Shared labels match the agreed table with zero reworded strings, and formatted numbers use Western digits in the default setting.
- **SC-004**: With no learning system, a sample page remains usable and records a standalone note; with a stand-in system, the session starts once and finishes once, including when the page is closed.
- **SC-005**: The safety package is the only package that states a mastery score, and that score is 70.
- **SC-006**: A visitor can open both samples from the landing page, and an experience statement stays on the machine with no destination and no credentials.

## Assumptions

- Learner-facing titles and the shared label table are copied from the build spec and are not rewritten in this feature.
- This feature delivers placeholder pages and the shared shell. Decision screens, question screens, images, a public release, and learning-system import tests are later work.
- “Paste the session helper as specified” means the published minimal session behaviour, including a single finish on page hide and before unload.
- The landing page in this feature is a placeholder. Final bilingual marketing copy, download links, and a build note belong to a later feature.
- Footer brand stays «نموذج تجريبي من إعداد Twin Particles» until the owner changes it.
- Packaging may use a local development tool; the activities themselves do not require a framework, a build step, or a backend.
- Media and credits folders exist so later assets have a home; this feature does not add real images.
