# Feature Specification: SCORM 1.2 packages and local call-order proof

**Feature Branch**: `004-scorm-package`

**Created**: 2026-11-04

**Status**: Draft

**Input**: User description: "Make both samples importable SCORM 1.2 packages and prove the runtime call order locally. (Docs/Specify-prompts/04-scorm-package.md)"

## Clarifications

### Session 2026-11-04

- Q: After a learner retries and scores lower, does the lesson status stay with the better attempt? → A: Yes. Keep the higher score and the lesson status from the better attempt.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Hand a learning system two importable courses (Priority: P1)

A reviewer builds the two course packages and can import each one into a SCORM 1.2 learning system. Each package describes itself as version 1.2, names the course in Arabic, lists every file it contains, and places that description at the package root.

**Why this priority**: Without an importable package, completion and score cannot be recorded in a learning system.

**Independent Test**: Run the documented package command and open both archives. Confirm the root course description, titles, identifiers, file list, and mastery mark.

**Acceptance Scenarios**:

1. **Given** a clean project, **When** the reviewer runs the package command, **Then** shared shell files are copied into both samples first, and two archives appear: `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`.
2. **Given** either archive, **When** it is opened, **Then** `imsmanifest.xml` is at the archive root (the sample folder is not the root), the schema version is 1.2, and every file inside the archive is listed in the course description.
3. **Given** the feedback package, **When** its course description is read, **Then** the identifier is `tp.samples.feedback-scenario`, both titles are «محادثة التغذية الراجعة: موقف قيادي», and no mastery score is set.
4. **Given** the safety package, **When** its course description is read, **Then** the identifier is `tp.samples.safety-challenge`, both titles are «تحدّي السلامة في موقع العمل», and the mastery score is 70.
5. **Given** either package, **When** its contents are listed, **Then** schema definition files are absent, and the local call-order harness is absent.

---

### User Story 2 - Prove the learning-system call order without uploading (Priority: P1)

A reviewer opens a local stand-in learning system, plays one sample inside it, and sees every learning-system call in a visible log in the required order. The stand-in is for development only and is never shipped inside a package.

**Why this priority**: The integration bar is a specific call sequence. A local log proves that sequence before a manual upload.

**Independent Test**: Load each sample in the harness, finish the activity, and read the call table. Repeat by hiding the page and confirm finish happens once.

**Acceptance Scenarios**:

1. **Given** the harness page, **When** it loads, **Then** it provides the eight learning-system operations (initialize, set value, get value, commit, finish, last error, error string, diagnostic), shows every call in a visible table, and loads exactly one chosen sample in a frame.
2. **Given** the feedback sample in the harness, **When** the learner reaches the debrief and ends the activity, **Then** the log matches FR-007 and the lesson status after the score is `completed`.
3. **Given** the safety sample in the harness, **When** the learner reaches results or game over and ends the activity, **Then** the log matches FR-007 and the lesson status after the score is `passed` when the raw score is at least 70 and `failed` when it is below 70.
4. **Given** a session that has already finished, **When** the page is hidden or finish is requested again, **Then** finish is not recorded a second time.
5. **Given** either built package, **When** its file list is checked, **Then** the harness page is not included.

---

### User Story 3 - Record the right score and still finish with no learning system (Priority: P2)

A learner’s reported score matches the published rules, a retry keeps the better score and that attempt’s lesson status, and a learner who is not inside a learning system can still finish and see the agreed standalone message. Learner-facing Arabic and game rules stay as they already are.

**Why this priority**: A wrong score or a crash outside a learning system fails the portfolio even if the package imports.

**Independent Test**: Finish known point totals in the harness and compare the raw score. Open the same sample with no learning system and confirm the standalone message and a completed activity.

**Acceptance Scenarios**:

1. **Given** the feedback sample ends with a point total out of 30, **When** the score is reported, **Then** the raw score is the point total divided by 30, multiplied by 100, and rounded to a whole number.
2. **Given** the safety sample ends with a base-point total, **When** the score is reported, **Then** the raw score uses base points only: base points divided by 1000, multiplied by 100, and rounded to a whole number. Time bonus is not part of the reported score.
3. **Given** a finished attempt, **When** the learner retries and scores lower, **Then** the stored raw score and the lesson status both stay as they were for the better attempt. **When** the retry scores higher, **Then** the stored raw score becomes the new higher value and the lesson status matches that better attempt.
4. **Given** no learning system, **When** the learner finishes the activity, **Then** the activity still completes, nothing fails, and the message is «انتهى النشاط. (وضع العرض: لا يوجد نظام إدارة تعلّم متصل.)».
5. **Given** a learning system, **When** the learner finishes the activity, **Then** the message is «تم حفظ نتيجتك. يمكنك إغلاق هذه النافذة.».

---

### User Story 4 - Tell a reviewer how to build and what an upload should show (Priority: P3)

A reviewer reads one README section that states the package command, what each archive contains, and the result a real learning-system registration should show. Uploading to SCORM Cloud or Moodle stays a manual check outside this feature’s automated proof.

**Why this priority**: The packages are only useful if a reviewer can rebuild them and knows the expected registration result.

**Independent Test**: Read the README section and match it to the two archives and the expected statuses.

**Acceptance Scenarios**:

1. **Given** the README, **When** the reviewer opens the section titled “Build the SCORM package”, **Then** it names the package command and states that each archive is a SCORM 1.2 course with the course description at the root.
2. **Given** that section, **When** the expected registration result is read, **Then** the feedback course is `completed` with a score, and the safety course is `passed` or `failed` against a mastery score of 70.
3. **Given** this feature’s checks, **When** they run, **Then** they do not upload a package to SCORM Cloud or Moodle.

---

### Edge Cases

- Finish is requested from the end-activity action and again because the page is hidden: the learning system is finished once.
- The session never started because no learning system exists: finish and score reporting do nothing harmful, and the standalone message is shown.
- A safety score lands exactly on 70: the lesson status is `passed`.
- A later attempt scores below a stored better attempt: the raw score and the lesson status stay with the better attempt, including a safety attempt that was `passed` and a later attempt that would have been `failed`.
- A feedback point total does not divide evenly into a percent: the raw score is the rounded whole number.
- Shared shell files changed since the last copy: the package command copies them into both samples before building the archives.
- The harness is open while packages are built: the harness is still left out of both archives.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The package command MUST copy the shared shell into both samples and then write `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`.
- **FR-002**: Each archive MUST contain `imsmanifest.xml` at its root, with schema version 1.2, and MUST list every file that the archive contains.
- **FR-003**: The feedback course description MUST use identifier `tp.samples.feedback-scenario` and the Arabic title «محادثة التغذية الراجعة: موقف قيادي», and MUST NOT set a mastery score.
- **FR-004**: The safety course description MUST use identifier `tp.samples.safety-challenge` and the Arabic title «تحدّي السلامة في موقع العمل», and MUST set the mastery score to 70.
- **FR-005**: Schema definition files MUST be omitted from both archives.
- **FR-006**: A development-only harness MUST expose the eight SCORM 1.2 operations, log every call in a visible table, and load one sample in a frame. That harness MUST NOT be inside either archive.
- **FR-007**: With a learning system present, the recorded call order MUST be session start, one read of the current lesson status, lesson status `incomplete` when that read is empty or `not attempted`, score minimum, score maximum, and raw score, then lesson status, then commit, then session time, then finish exactly once.
- **FR-008**: The feedback sample MUST set lesson status to `completed` when the debrief is reached. The safety sample MUST set `passed` or `failed` when results or game over is reached, using 70 as the pass line on the reported raw score.
- **FR-009**: Finish MUST also run when the page is hidden. A second finish request MUST NOT call finish again. Closing the page may also request finish; that path is the same single finish and is not an extra step in the call order.
- **FR-010**: The feedback raw score MUST be the rounded whole-number percent of points out of 30. The safety raw score MUST be the rounded whole-number percent of base points out of 1000.
- **FR-011**: A retry MUST keep the higher reported score and the lesson status from that better attempt. A lower later score MUST NOT replace either.
- **FR-012**: With no learning system, the activity MUST still complete and MUST show «انتهى النشاط. (وضع العرض: لا يوجد نظام إدارة تعلّم متصل.)». With a learning system, ending MUST show «تم حفظ نتيجتك. يمكنك إغلاق هذه النافذة.».
- **FR-013**: This feature MUST NOT change learner-facing Arabic or the samples’ game rules.
- **FR-014**: The README section “Build the SCORM package” MUST explain the package command, what each archive contains, and the expected registration result: feedback `completed` plus score; safety `passed` or `failed` against 70.
- **FR-015**: A real SCORM Cloud or Moodle upload MUST remain a manual gate and MUST NOT be part of this feature’s automated checks.

### Key Entities

- **Course package**: One sample archived for import. Attributes: file name, root course description, identifier, Arabic title, schema version 1.2, complete file list, and mastery score only for the safety course.
- **Learning-system session**: One launch. Attributes: started once, lesson status, score minimum 0, score maximum 100, raw score, session time, and finished once.
- **Call log**: The ordered list of learning-system operations shown by the harness for one launch.
- **Attempt score**: Points earned in one try. Feedback uses points out of 30. Safety uses base points out of 1000. The stored score is the higher of the current and previous attempt, and the stored lesson status is the status of that same better attempt.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: One package command produces both named archives, and a reviewer can confirm the root course description, titles, identifiers, full file list, and mastery rule for both in a single inspection.
- **SC-002**: For each sample, one complete launch in the local harness shows the required call order with finish recorded once, including when the page is hidden after finish.
- **SC-003**: Known totals map to the published raw scores: feedback points out of 30, safety base points out of 1000, each rounded to a whole number. A lower retry does not replace the higher score or the lesson status from that better attempt.
- **SC-004**: A learner with no learning system finishes the activity and sees the standalone saved message, with no failure that blocks completion.
- **SC-005**: The README section alone is enough for a reviewer to rebuild both archives and to predict the registration status for each sample. Automated checks perform zero uploads to a live learning system.

## Assumptions

- Shared shell, feedback activity, and safety activity already exist. This feature proves packaging and the learning-system call sequence; it does not redesign screens or scoring bands.
- Learner-facing Arabic, including the two saved messages, stays the wording already fixed in the build spec.
- Score minimum is 0 and score maximum is 100, matching the existing completion contract.
- Session time is reported in the learning system’s hour-minute-second form before finish.
- “Build the SCORM package” is added to the existing bilingual README. Full landing-page and release instructions belong to a later feature.
- SCORM Cloud remains the priority manual check, then Moodle if time allows. Screenshots of those reports are not produced by this feature.
- Optional question-level interaction records and a live learning-record store are out of scope. Logging-only statement notes, if already present, are not expanded here.
- SCORM 2004, cmi5, and publishing the archives on a release page are out of scope.
