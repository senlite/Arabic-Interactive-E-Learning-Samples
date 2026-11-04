# Feature Specification: Feedback branching scenario

**Feature Branch**: `002-feedback-scenario`

**Created**: 2026-11-04

**Status**: Draft

**Input**: User description: "Build Sample 1, the Arabic RTL branching scenario «محادثة التغذية الراجعة: موقف قيادي», in `feedback-scenario/`. (Docs/Specify-prompts/02-feedback-scenario.md)"

## Clarifications

### Session 2026-11-04

- Q: When the learner retries and reaches the debrief again with a lower percent, which score stays recorded? → A: Keep the higher percent. A lower retry does not replace it.
- Q: On the start, objectives, context, ending, and debrief screens, what should the decision line in the header show? → A: Show «القرار n من 3» only on the three decision screens. Other screens show the title and progress only.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Complete a three-decision feedback conversation (Priority: P1)

A team leader opens the sample, reads the purpose and the situation, then makes three leadership choices in a conversation with أحمد after a message from سارة. Each choice is final, shows how well it landed, and changes what happens next. The attempt ends in one of three narratives based on the total.

**Why this priority**: The sample exists to show a branching conversation with real consequences. Without this path, there is no activity to review.

**Independent Test**: Play from the start through three decisions to an ending and a debrief, and confirm the conversation, points, and ending match the choices taken.

**Acceptance Scenarios**:

1. **Given** a new attempt, **When** the learner opens the sample, **Then** the page is Arabic and right to left, the title is «محادثة التغذية الراجعة: موقف قيادي», and the first screen shows that title, the description «أنت قائد فريق، وستخوض محادثة تغذية راجعة مع أحد أعضاء فريقك. كل قرار تتخذه يغيّر مسار المحادثة ونتيجتها.», the duration «المدة التقريبية: 5–7 دقائق», and the button «ابدأ».
2. **Given** the start screen, **When** the learner chooses «ابدأ», **Then** the objectives screen heading is «ماذا ستتعلّم؟», the lead line is «بنهاية هذا النشاط ستتمكّن من:», and the five objectives are exactly: «تطبيق نموذج «الموقف – السلوك – الأثر» لبدء محادثة التغذية الراجعة بوقائع محددة.», «التمييز بين التغذية الراجعة المبنية على السلوك والأحكام الشخصية.», «اختيار أسئلة مفتوحة تكشف السبب الحقيقي لتراجع الأداء.», «تقييم أثر قراراتك القيادية في الأداء والثقة.», and «صياغة خطة متابعة محددة بالاتفاق مع الموظف.», with the button «التالي».
3. **Given** the objectives screen, **When** the learner chooses «التالي», **Then** the context heading is «صباح يوم الأحد», سارة is identified as «مديرة الإدارة», her message is «صباح الخير. تأخّر التقرير الأسبوعي الذي يعدّه أحمد ثلاث مرات هذا الشهر، ووصلت النسخة الأخيرة إلى العميل وفيها أخطاء في الأرقام. أحمد من أفضل المحللين لدينا، وأريدك أن تتحدث معه هذا الأسبوع.», the background is «يعمل أحمد في فريقك منذ أربع سنوات، وكان أداؤه ممتازاً حتى الشهرين الماضيين.», and the button is «التالي».
4. **Given** any decision, **When** it is shown, **Then** the header reads «القرار {n} من 3» with Western digits, the scene and question use the wording for that decision, and three choice cards appear in a new random order. Choosing a card selects it immediately. Start, objectives, context, feedback, ending, and debrief show the title and progress and do not show «القرار n من 3». Progress fills from the right by confirmed choices only: empty before the first «تابِع», one third after the first, two thirds after the second, and full on the ending and the debrief. The feedback screen still shows the count from before «تابِع».
5. **Given** a choice was just selected, **When** feedback appears, **Then** the learner sees a rating badge with an icon, a colour, and the matching label («موفّق», «مقبول جزئياً», or «غير موفّق»), the choice’s feedback, its consequence, and the points line («+10 نقاط», «+5 نقاط», or «0 نقاط»), then the button «تابِع». There is no way to go back and change the choice.
6. **Given** the first decision «كيف تبدأ؟» with scene «ترى أحمد في المكتب المفتوح، وحوله عدد من الزملاء. ما خطوتك الأولى؟», **When** the learner picks a choice, **Then** the outcome matches that choice:
   - «أطلب من أحمد لقاءً قصيراً على انفراد اليوم، وأبدأ بذكر الوقائع: تأخّر التقرير ثلاث مرات هذا الشهر، ووجود أخطاء في النسخة الأخيرة.» scores 10, rating «موفّق», feedback «اختيار موفّق. التغذية الراجعة على انفراد تحفظ كرامة الموظف، والبدء بوقائع محددة بدلاً من الأحكام العامة يجعل الحوار موضوعياً.», consequence «يوافق أحمد على اللقاء بعد الظهر، ويدخل مكتبك هادئاً ومنتبهاً.», and the next decision is أحمد يشرح الأسباب.
   - «أرسل إلى أحمد رسالة بريد إلكتروني أشير فيها إلى التأخير، وأطلب منه الالتزام بالمواعيد مستقبلاً.» scores 5, rating «مقبول جزئياً», feedback «مقبول جزئياً. الرسالة المكتوبة توثّق الملاحظة، لكنها لا تتيح لك فهم الأسباب ولا تبني الثقة. المحادثات المهمة تكون وجهاً لوجه أولاً، ثم تُوثَّق.», consequence «يردّ أحمد باعتذار مقتضب. بعد يومين تلتقيان لمتابعة الأمر، ويبدو متحفظاً قليلاً.», and the next decision is أحمد يشرح الأسباب.
   - «أقول أمام الفريق: «يا أحمد، التقارير المتأخرة أصبحت عادة عندك، وهذا غير مقبول.»» scores 0, rating «غير موفّق», feedback «اختيار غير موفّق. النقد العلني يحرج الموظف ويضعه في موقف دفاعي، وعبارة «أصبحت عادة» حكمٌ عام وليست وصفاً لسلوك محدد.», consequence «يسود الصمت في المكتب، ويردّ أحمد بحدّة: «الجميع يتأخر أحياناً، لماذا أنا بالذات؟»», and the next decision is أحمد في موقف دفاعي.
7. **Given** the decision «أحمد يشرح الأسباب» with scene «تشكر أحمد على وقته وتعرض الوقائع بهدوء. يتنهّد أحمد ويقول: «أعرف… منذ أن انتقلنا إلى نظام التقارير الجديد وأنا أقضي ساعات في إدخال البيانات يدوياً، وفي الوقت نفسه أتابع ظرفاً عائلياً في المنزل.» كيف تردّ؟», **When** the learner picks a choice, **Then**:
   - «أشكره على صراحته، وأسأله: «ما الجزء الذي يستهلك أكثر وقتك في النظام الجديد؟ وما الذي يمكن أن يساعدك؟»» scores 10, «موفّق», feedback «اختيار موفّق. الأسئلة المفتوحة والإصغاء يكشفان السبب الحقيقي للمشكلة، ويُشعران أحمد بأنك شريك في الحل لا قاضٍ.», consequence «يشرح أحمد أن خطوة استيراد البيانات لا تعمل تلقائياً، وأنه لم يتلقَّ تدريباً كافياً على النظام الجديد.», next is الاتفاق على الخطوات التالية.
   - «أقول: «أتفهّم ذلك، لكن مواعيد العميل لا تتغير، وعليك أن تجد طريقة.»» scores 5, «مقبول جزئياً», feedback «مقبول جزئياً. أظهرت تفهّماً ووضوحاً في التوقعات، لكنك أغلقت الباب أمام فهم السبب وإيجاد حل مشترك.», consequence «يومئ أحمد برأسه بصمت: «حسناً، سأحاول.»», next is الاتفاق على الخطوات التالية.
   - «أقول: «الظروف الشخصية لا علاقة لها بالعمل، وأنا أحتاج إلى النتائج فقط.»» scores 0, «غير موفّق», feedback «اختيار غير موفّق. تجاهل ظروف الموظف يضعف الثقة والولاء، ولا يعالج السبب الفعلي للتأخير.», consequence «يتراجع أحمد في كرسيه ويقلّ كلامه، وتشعر بأن المحادثة فقدت حيويتها.», next is استعادة الحوار.
8. **Given** the decision «أحمد في موقف دفاعي» with scene «أحمد منزعج ويقف إلى جوار مكتبه، والزملاء يتابعون بصمت. ما تصرّفك الآن؟», **When** the learner picks a choice, **Then**:
   - «أعتذر عن طرح الموضوع أمام الزملاء، وأطلب منه أن نكمل الحديث على انفراد، ثم أعرض الوقائع بهدوء.» scores 10, «موفّق», feedback «تصرّف قيادي ناضج. الاعتراف بالخطأ بسرعة يخفّف التوتر ويعيد المحادثة إلى مسارها الصحيح.», consequence «يهدأ أحمد تدريجياً في غرفة الاجتماعات، ويخبرك أن النظام الجديد يستهلك وقته، وأنه يمرّ بظرف عائلي.», next is الاتفاق على الخطوات التالية.
   - «أردّ: «لا تقارن نفسك بغيرك، فأنت المسؤول عن هذا التقرير.»» scores 0, «غير موفّق», feedback «اختيار غير موفّق. الجدال العلني يرفع التوتر، ويحوّل الحديث إلى صراع على المواقف بدلاً من حل المشكلة.», consequence «يجلس أحمد صامتاً، ويتجنّب النظر إليك بقية اليوم.», next is استعادة الحوار.
   - «أقول: «حسناً، نتحدث لاحقاً»، ثم أعود إلى مكتبي دون أي توضيح.» scores 5, «مقبول جزئياً», feedback «مقبول جزئياً. أوقفت التصعيد، لكنك تركت الموقف معلّقاً دون اعتذار أو خطة، وقد يفهم أحمد ذلك على أنه تهديد مؤجَّل.», consequence «في اليوم التالي تلتقيان، فيبدو أحمد متحفظاً ويجيب باقتضاب.», next is استعادة الحوار.
9. **Given** the decision «الاتفاق على الخطوات التالية» with scene «اتضحت لك أسباب التأخير، وبقيت دقائق على نهاية اللقاء. كيف تختم المحادثة؟», **When** the learner picks a choice, **Then** the attempt ends after feedback:
   - «نتفق معاً على خطة: أرتّب له جلسة تدريب على النظام هذا الأسبوع، ويسلّم مسودة التقرير القادم يوم الأربعاء للمراجعة، ونلتقي بعد أسبوعين للمتابعة.» scores 10, «موفّق», feedback «اختيار موفّق. خطة محددة وقابلة للقياس ولها موعد متابعة، وقد شارك أحمد في وضعها، فيزداد التزامه بها.», consequence «يبتسم أحمد ويقول: «هذا يساعدني كثيراً. شكراً لأنك استمعت إليّ.»».
   - «أكتب له قائمة بما يجب أن يفعله من الآن فصاعداً، وأطلب منه التوقيع عليها.» scores 5, «مقبول جزئياً», feedback «مقبول جزئياً. الخطة واضحة، لكنها مفروضة عليه، فقد يلتزم بها شكلياً دون اقتناع.», consequence «يوقّع أحمد على القائمة ويقول: «كما تريد.»».
   - «أقول: «المهم أن تحاول أكثر في المرة القادمة»، وأنهي اللقاء.» scores 0, «غير موفّق», feedback «اختيار غير موفّق. عبارة «حاول أكثر» لا تحدد ما الذي يجب أن يتغير ولا متى، لذلك تتكرر المشكلة غالباً.», consequence «يغادر أحمد دون أن يعرف ما المطلوب منه تحديداً.».
10. **Given** the decision «استعادة الحوار» with scene «المحادثة متوترة، وأحمد قليل الكلام، والتقرير القادم بعد أسبوع. ما خطوتك الأخيرة؟», **When** the learner picks a choice, **Then** the attempt ends after feedback:
    - «أقول: «يبدو أنني لم أُحسن بدء هذا الحديث. ما الذي يجعل التقرير يتأخر؟ وكيف أساعدك؟»، ثم نحدد موعداً للمتابعة.» scores 5, «مقبول جزئياً», feedback «خطوة جيدة لإصلاح المسار. الاعتراف والسؤال المفتوح يعيدان بعض الثقة، وإن كانت البداية الأفضل ستوفّر عليك هذا الجهد.», consequence «يتردّد أحمد قليلاً ثم يشرح مشكلة النظام الجديد، وتتفقان على اللقاء مجدداً الأسبوع القادم.».
    - «أبلغه بأنني سأرفع إنذاراً رسمياً إلى الموارد البشرية إذا تأخر التقرير مرة أخرى.» scores 0, «غير موفّق», feedback «اختيار غير موفّق. الإنذار الرسمي قبل فهم الأسباب أو تقديم الدعم قفزٌ إلى العقوبة، وقد يدفع موظفاً متميزاً إلى الرحيل.», consequence «يقول أحمد ببرود: «مفهوم.»».
    - «أنهي اللقاء، وأقرر مراقبة أدائه دون أن أقول شيئاً آخر.» scores 0, «غير موفّق», feedback «اختيار غير موفّق. الصمت يترك الموظف دون توقعات واضحة ودون دعم، فتبقى المشكلة كما هي.», consequence «يغادر أحمد المكتب، ولا يتغير شيء في الأسبوع التالي.».
11. **Given** three decisions are complete, **When** the total is 25–30, **Then** the ending title is «نهاية ممتازة: حوار يبني الأداء والثقة» and the narrative is «بعد أسبوعين يسلّم أحمد التقرير قبل موعده ودون أخطاء، وتشكرك سارة على طريقة تعاملك مع الموقف. ويقترح أحمد أيضاً تحسيناً على النظام الجديد يستفيد منه الفريق كله.».
12. **Given** three decisions are complete, **When** the total is 15–20, **Then** the ending title is «نهاية مقبولة: تحسّن مؤقت» and the narrative is «يتحسن التزام أحمد بالمواعيد في الأسابيع التالية، لكنه يبدو أقل حماساً، ولم يعد يشارك أفكاره كما كان يفعل. عولجت المشكلة جزئياً، أما الثقة فتحتاج إلى عمل إضافي.».
13. **Given** three decisions are complete, **When** the total is 0–10, **Then** the ending title is «نهاية ضعيفة: خسارة محتملة لموظف متميز» and the narrative is «يتكرر التأخير، ويتراجع تفاعل أحمد مع الفريق. بعد شهر يطلب الانتقال إلى إدارة أخرى، فتخسر الإدارة أحد أفضل محلليها.».
14. **Given** an ending, **When** it is shown, **Then** the button is «عرض التقييم».

---

### User Story 2 - Review the path and try again or finish (Priority: P1)

After the ending, the learner sees a debrief: score out of 30 and as a percent, the ending title, the three choices by their short labels, and four feedback principles. They can start over or finish the activity.

**Why this priority**: The debrief is how a reviewer sees the score, the path, and the teaching point, and how a learning system receives completion.

**Independent Test**: Reach the debrief on a known path and check the score line, the three short labels, the four tips, retry, and the finish message with and without a learning system.

**Acceptance Scenarios**:

1. **Given** the ending, **When** the learner chooses «عرض التقييم», **Then** the heading is «ملخّص أدائك», the score line is «نتيجتك: {score} من 30 ({percent}%)» using Western digits, the ending line is «النهاية التي وصلت إليها: {endingTitle}», the path heading is «قراراتك», and each decision is one row «القرار {n}: {choiceShortLabel} — {points} نقاط».
2. **Given** the debrief, **When** the path is listed, **Then** short labels are exactly: «لقاء على انفراد مع عرض الوقائع», «رسالة بريد إلكتروني», «نقد أمام الفريق», «أسئلة مفتوحة وإصغاء», «تفهّم ثم إصرار على الموعد», «تجاهل الظروف الشخصية», «اعتذار وحديث على انفراد», «جدال أمام الزملاء», «تأجيل دون توضيح», «خطة مشتركة وموعد متابعة», «قائمة مفروضة», ««حاول أكثر»», «اعتراف وسؤال وموعد متابعة», «إنذار رسمي», and «صمت ومراقبة», matched to the choices taken.
3. **Given** the debrief, **When** the tips are shown, **Then** the heading is «مبادئ التغذية الراجعة الفعّالة» and the four tips are «اختر الخصوصية والتوقيت المناسب، وتحدّث في أقرب وقت بعد الموقف.», «صِف الموقف والسلوك والأثر (نموذج SBI) بدلاً من إطلاق الأحكام العامة.», «اسأل وأصغِ قبل أن تقترح الحلول، فالسبب الحقيقي قد لا يكون ظاهراً.», and «اختم بخطة محددة يشارك الموظف في وضعها، مع موعد واضح للمتابعة.». The token SBI stays in correct reading order.
4. **Given** the debrief, **When** the learner chooses «أعد المحاولة», **Then** the on-screen path and running total return to a new start, the next attempt shuffles choices again, and the learning system keeps the higher recorded percent.
5. **Given** the debrief and a connected learning system, **When** the debrief is reached, **Then** the recorded score is the higher of any percent already recorded and this attempt’s total divided by 30, multiplied by 100, and rounded to a whole number from 0 to 100, and the lesson is marked completed with no pass or fail. **When** the learner then chooses «إنهاء النشاط», **Then** the session finishes and the message is «تم حفظ نتيجتك. يمكنك إغلاق هذه النافذة.».
6. **Given** the debrief and no learning system, **When** the learner chooses «إنهاء النشاط», **Then** the message is «انتهى النشاط. (وضع العرض: لا يوجد نظام إدارة تعلّم متصل.)» and the page does not fail.
7. **Given** the debrief, **When** it is shown, **Then** the sample disclaimer «نموذج تجريبي لأغراض العرض. الأسماء والمواقف افتراضية.» is visible.

---

### User Story 3 - Prove the four published paths (Priority: P1)

A reviewer can reproduce four documented routes and get the published totals and endings, including a recovery from a poor opening.

**Why this priority**: These four routes are the proof that branching and score bands work, including a path that recovers after a public criticism.

**Independent Test**: Play each route below and compare total, ending, and debrief rows with this table.

**Acceptance Scenarios**:

1. **Given** a private meeting with facts, then open questions, then a shared plan, **When** the attempt ends, **Then** the total is 30, the ending is excellent, and the percent is 100.
2. **Given** public criticism, then an apology and a private talk, then a shared plan, **When** the attempt ends, **Then** the total is 20, the ending is acceptable, and the percent is 67.
3. **Given** a private meeting with facts, then dismissing personal circumstances, then an admission with an open question and a follow-up date, **When** the attempt ends, **Then** the total is 15, the ending is acceptable, and the percent is 50.
4. **Given** public criticism, then arguing in front of colleagues, then a formal warning, **When** the attempt ends, **Then** the total is 0, the ending is poor, and the percent is 0.

---

### User Story 4 - Use the conversation on a phone and with a keyboard (Priority: P2)

A reviewer can finish the conversation on a narrow phone and with a keyboard only. The screen looks like a conversation: a scene card and speech for سارة and أحمد. Placeholder portraits stand in until final illustrations exist. New screens move focus to the heading, and feedback is announced without taking focus away.

**Why this priority**: The portfolio is judged on a phone and on basic accessibility, after the conversation itself works.

**Independent Test**: Complete one attempt at 360 px width using touch, and another using only the keyboard, and confirm no horizontal scroll, readable contrast, and announced feedback.

**Acceptance Scenarios**:

1. **Given** a 360 px-wide screen, **When** any decision is shown, **Then** the three choices stack in one column, each control is at least 44×44 px, body text is at least 16 px, Arabic is not letter-spaced, and the page does not scroll sideways.
2. **Given** a wide screen, **When** choices are shown, **Then** they may sit side by side and remain real buttons.
3. **Given** keyboard-only use, **When** the learner moves to a new screen, **Then** focus lands on that screen’s heading and every choice and button can be reached and activated from the keyboard.
4. **Given** feedback, the score, or the debrief update, **When** it appears, **Then** it is announced politely. Rating meaning is carried by icon and text as well as colour (green with «موفّق», amber with «مقبول جزئياً», red with «غير موفّق»). Text contrast is at least 4.5:1 and control contrast at least 3:1.
5. **Given** the conversation layout, **When** a scene is shown, **Then** سارة and أحمد speak in bubbles on a scene card, and portraits are placeholders until the project’s own illustrations replace them. Decorative images do not add a spoken description; meaningful images have Arabic descriptions.
6. **Given** reduced motion is requested, **When** screens change, **Then** motion stays at or under 300 ms or is reduced.

---

### Edge Cases

- Choice order changes on every new attempt, including after «أعد المحاولة», and a shuffle never changes which wording belongs to which points, rating, feedback, consequence, or next step.
- Scores are only 0, 5, or 10 per choice, so the total is a multiple of 5 from 0 to 30. Bands 25–30, 15–20, and 0–10 cover every possible total with no overlap.
- The learner cannot return to a previous decision. The browser back control is not part of the activity; the activity itself offers no back step.
- Refresh during an attempt restores it from the browser session store, including the recorded percent. If that store is missing or invalid, the learner starts again from the start screen and no score is reported until a new debrief.
- «إنهاء النشاط» finishes the learning-system session once. A second finish does not finish it again.
- Opening the sample starts the learning-system session once when a system is present, and does nothing harmful when it is absent. The lesson stays incomplete until the debrief.
- A retry clears the on-screen attempt. When the learner reaches the debrief again, the recorded percent stays at the higher of the previous recorded percent and the new attempt. A lower retry does not replace it. The debrief itself still shows the current attempt’s score and percent.
- The activity does not invent company names. Characters stay the learner («أنت»), أحمد, and سارة.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The sample MUST present the Arabic title «محادثة التغذية الراجعة: موقف قيادي» and run right to left in Arabic.
- **FR-002**: The learner MUST be addressed as a team leader. The only named characters MUST be أحمد, a senior analyst on the learner’s team, and سارة, the department director, in a fictional reporting team.
- **FR-003**: The activity MUST follow this order: start, objectives, context (سارة’s message), three decisions each followed by feedback, an ending narrative, then the debrief.
- **FR-004**: Every learner-facing string in this specification MUST appear exactly as written. Copy MUST NOT be rephrased, translated, or “corrected”.
- **FR-005**: Each decision MUST offer exactly three choices. Each choice MUST be worth 10, 5, or 0. The maximum total MUST be 30.
- **FR-006**: The first decision MUST lead either to «أحمد يشرح الأسباب» or to «أحمد في موقف دفاعي», as specified per choice. The second decision MUST lead either to «الاتفاق على الخطوات التالية» or to «استعادة الحوار». The third decision MUST end the attempt.
- **FR-007**: The ending MUST be excellent for 25–30, acceptable for 15–20, and poor for 0–10, using the titles and narratives in User Story 1.
- **FR-008**: Choice order MUST be shuffled on every attempt. There MUST be no back control inside the scenario, and a choice MUST be committed as soon as it is selected.
- **FR-009**: After each choice, the learner MUST see the rating badge (icon, colour, and text), feedback, consequence, points, and «تابِع» before the next screen.
- **FR-010**: The three decision screens MUST show «القرار {n} من 3» and progress that fills from the right. Start, objectives, context, feedback, ending, and debrief MUST show the title and progress and MUST NOT show «القرار n من 3». The filled portion MUST equal the number of confirmed choices divided by 3: 0 before the first «تابِع», 1/3 after it, 2/3 after the second, and 3/3 on the ending and the debrief. Feedback MUST keep the count from before «تابِع». The conversation MUST use a scene card and speech bubbles.
- **FR-011**: The debrief MUST show the score out of 30, the percent, the ending title, the path using the short labels, and the four principles. Buttons MUST be «أعد المحاولة» and «إنهاء النشاط».
- **FR-012**: «أعد المحاولة» MUST clear the on-screen attempt and MUST leave the recorded percent for FR-013 to update on the next debrief. «إنهاء النشاط» MUST finish the learning-system session and show «تم حفظ نتيجتك. يمكنك إغلاق هذه النافذة.» when a system is connected, or «انتهى النشاط. (وضع العرض: لا يوجد نظام إدارة تعلّم متصل.)» when it is not.
- **FR-013**: On the debrief, the recorded score MUST be the higher of any percent already recorded and the rounded whole-number percent of this attempt’s total out of 30, and the lesson MUST be marked completed with no pass or fail mark.
- **FR-014**: The sample MUST load a learning-system session once when a system is present, and MUST remain usable when none is present.
- **FR-015**: On a 360 px-wide screen, choices MUST stack in one column, targets MUST be at least 44×44 px, and the page MUST NOT scroll horizontally. On a wide screen, choices MAY use more than one column.
- **FR-016**: Focus MUST move to each new screen heading. Feedback and the score MUST be announced politely. Meaning MUST NOT rely on colour alone. Numerals MUST be Western digits.
- **FR-017**: Scenario text, choices, ratings, points, next steps, endings, and debrief copy MUST be stored as content separate from the behaviour that plays the attempt, so a later edit can change the conversation without rewriting the player.
- **FR-018**: Until project illustrations exist, portraits MUST be placeholders. The sample disclaimer «نموذج تجريبي لأغراض العرض. الأسماء والمواقف افتراضية.» MUST appear on the debrief.

### Key Entities

- **Attempt**: Current screen, current decision, running total (0–30), the ordered path of choices, and when the attempt started. Cleared by retry.
- **Decision**: One of five moments: how to start; أحمد explains; أحمد is defensive; agree next steps; recover the conversation. Each has a scene and exactly three choices.
- **Choice**: Wording, short label, points (10, 5, or 0), rating (successful, partly acceptable, or unsuccessful), feedback, consequence, and the next decision or the end.
- **Ending**: Excellent, acceptable, or poor, chosen only from the total, with a title and a narrative.
- **Debrief**: Score line, percent, ending title, three path rows, four principles, retry, and finish.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A learner can move from «ابدأ» to the debrief in one sitting of about 5–7 minutes, with exactly three committed decisions.
- **SC-002**: The four published routes produce 30 (excellent, 100%), 20 (acceptable, 67%), 15 (acceptable, 50%), and 0 (poor, 0%), and the debrief lists the matching short labels.
- **SC-003**: Across two fresh attempts at the same decision, choice order differs or, if a shuffle repeats by chance, a further attempt shows that order is not fixed. The best choice is not locked to the first position.
- **SC-004**: On a 360 px-wide phone, a reviewer completes an attempt with touch only, with no horizontal scrolling and with every choice easy to tap.
- **SC-005**: A keyboard-only reviewer completes an attempt, hears or reads each feedback update without it stealing focus, and lands on each new heading.
- **SC-006**: With a learning system connected, reaching the debrief stores a whole-number score from 0 to 100 equal to the rounded percent, or the higher percent already stored if this attempt is lower, marks the lesson completed, and «إنهاء النشاط» shows the saved message. With no system, finish shows the standalone message and the activity still completes on screen.
- **SC-007**: A reviewer comparing the screens with the agreed script finds no reworded Arabic on titles, objectives, scenes, choices, feedback, consequences, endings, tips, or buttons.

## Assumptions

- The shared sample shell already provides the Arabic page, the shared button labels, learning-system start and finish, Western digits, the skip link, and the brand footer «نموذج تجريبي من إعداد Twin Particles». This feature adds the conversation and does not change that shell’s behaviour.
- The sample-specific disclaimer in FR-018 is shown in addition to the shared brand footer.
- Refresh resume uses the browser session store. A missing or invalid store returns the learner to the start and does not report a score.
- Placeholder portraits are acceptable until the project’s illustrations are ready. They must not use a real company’s logo.
- Percent rounding uses ordinary half-up rounding to a whole number (20/30 → 67, 10/30 → 33, 5/30 → 17).
- This feature does not include the safety challenge, outbound experience records, per-choice learning-system interaction records, or a gender toggle. Choices stay in the first person so the same wording fits every learner.
- The setting stays fictional. No client or employer name is added.
