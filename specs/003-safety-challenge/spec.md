# Feature Specification: Workplace safety challenge

**Feature Branch**: `003-safety-challenge`

**Created**: 2026-11-04

**Status**: Draft

**Input**: User description: "Build Sample 2, the Arabic RTL game «تحدّي السلامة في موقع العمل», in `safety-challenge/`. (Docs/Specify-prompts/03-safety-challenge.md)"

## Clarifications

### Session 2026-11-04

- Q: When the timer is off, how does the learner leave the warehouse scene if they have not found all three hazards? → A: Stay until all three hazards are found. No skip, no life lost.
- Q: If the learner finds all three hazards and also taps empty areas or distractors, what is the question score, and does it still count as fully correct? → A: All three found starts at 100, then −10 per wrong tap, floor 0. Fully correct only at 100. No life lost.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Play ten safety challenges with lives and a timer (Priority: P1)

Any employee opens the sample, reads the rules, and answers ten workplace-safety questions in a fixed order: one scene search, four multiple choice, two ordering tasks, and three true or false. Points, three lives, a countdown, and progress stay visible. A wrong answer or a timeout costs a life. At zero lives the attempt ends. After all ten, the learner sees a result and a badge.

**Why this priority**: The sample exists to show a scored safety game with real consequences. Without this path there is no activity to review.

**Independent Test**: Start a new attempt, answer all ten with the timer on, and confirm the question order, points, lives, feedback, and the results screen.

**Acceptance Scenarios**:

1. **Given** a new attempt, **When** the learner opens the sample, **Then** the page is Arabic and right to left, the title is «تحدّي السلامة في موقع العمل», and the start screen shows that title, the description «اختبر وعيك بالسلامة المهنية في 10 تحديات سريعة. اجمع النقاط، وحافظ على محاولاتك الثلاث، واحصل على شارة السلامة.», these three rules: «لديك 3 محاولات ❤️❤️❤️، وتخسر محاولة مع كل إجابة خاطئة أو عند انتهاء الوقت.», «لكل سؤال وقت محدد، والإجابة الصحيحة السريعة تمنحك 50 نقطة إضافية.», and «تحتاج إلى 70% من النقاط الأساسية لاجتياز التحدي.», a timer switch labelled «تشغيل المؤقت» that is on, the hint «يمكنك إيقاف المؤقت إذا كنت تحتاج إلى وقت إضافي.», a collapsible «ماذا ستتعلّم؟», and the button «ابدأ التحدي».
2. **Given** the start screen, **When** the learner opens «ماذا ستتعلّم؟», **Then** the lead line is «بنهاية هذا التحدي ستتمكّن من:» and the five objectives are exactly: «التعرّف على المخاطر الشائعة في بيئة العمل.», «اختيار طفاية الحريق المناسبة لكل نوع من الحرائق.», «ترتيب خطوات الاستجابة للحريق وخطوات عزل الطاقة قبل الصيانة.», «التعرّف على علامات الإجهاد الحراري والتصرّف الصحيح.», and «تفسير ألوان لافتات السلامة وأشكالها.».
3. **Given** the learner chooses «ابدأ التحدي», **When** each question appears, **Then** the questions appear in this order and these types: scene search, multiple choice, true or false, ordering, multiple choice, true or false, multiple choice, ordering, true or false, multiple choice with a sign. The top bar shows «النقاط: {points}», «السؤال {n} من 10» with Western digits, three hearts at the start, a countdown when the timer is on, and a progress bar that fills from the right.
4. **Given** a multiple-choice or true-or-false question, **When** the learner taps one answer, **Then** that answer locks immediately, with no separate submit. Multiple-choice options appear in a new order each attempt. True or false always shows «صح» then «خطأ».
5. **Given** an ordering question, **When** it appears, **Then** four cards are shuffled and that shuffle is never the correct order. The learner can reorder with a pointer on the handle or with ▲ and ▼ on each card, then confirms with «تحقّق من الترتيب».
6. **Given** the scene-search question, **When** it appears, **Then** the image can be explored by tap or keyboard. Five zones are reachable: three hazards and two distractors, labelled «المنطقة 1» through «المنطقة 5». A found hazard shows a numbered marker and its explanation. The counter reads «المخاطر المكتشفة: {n} من 3». The question ends when all three hazards are found or when time runs out.
7. **Given** an answer or a timeout, **When** feedback appears, **Then** the panel shows one of «إجابة صحيحة! +{points}», «إجابة صحيحة جزئياً. +{points}», «إجابة غير صحيحة. الإجابة الصحيحة: {answer}», or «انتهى الوقت!», plus the explanation and, when a life is lost, «خسرت محاولة. المتبقي: {lives}». The button is «السؤال التالي», or «عرض النتيجة» after the tenth question.
8. **Given** all ten questions are finished with lives remaining, **When** the results screen appears, **Then** the heading is «نتيجتك في التحدي», the learner sees a medal and its name, the matching message, «النقاط: {total} · النسبة: {percent}% · الإجابات الصحيحة: {correct} من 10 · الوقت المستغرق: {mm:ss}», and a review list using the short titles, each marked right or wrong. Buttons are «حاول مرة أخرى» and «إنهاء النشاط».

---

### User Story 2 - Earn points, a pass mark, and a badge by the published rules (Priority: P1)

A reviewer can predict the score, whether a life is lost, the pass or fail result, and the badge from the rules below, including partial credit and the timer bonus.

**Why this priority**: The portfolio claim is that the game rules are exact. A wrong life or a wrong badge fails the sample.

**Independent Test**: Run the six checks in User Story 3 and compare points, lives, badge, and recorded result with the rules in this story.

**Acceptance Scenarios**:

1. **Given** any question answered fully correctly, **When** it is scored, **Then** it is worth 100 base points. The base total across ten questions is 1,000. The displayed total adds a time bonus when one is earned. The pass mark and the badge use base points only.
2. **Given** the timer is on and the answer is fully correct with at least half the question’s time left, **When** it is scored, **Then** the learner gains 50 extra points. A slow correct answer, a partial answer, a wrong answer, a timeout, or the timer being off gains no bonus. The most the bonus can add is 500.
3. **Given** the scene search, **When** a hazard is found, **Then** it is worth 33 points until all three are found, and finding all three sets the question to 100 before penalties. Each distractor or empty tap then subtracts 10, and the question cannot go below 0. The question is fully correct, uses «إجابة صحيحة! +{points}», and can earn the time bonus only when that score is still 100. A lower score uses «إجابة صحيحة جزئياً. +{points}», earns no bonus, and costs no life. A life is lost on this question only if time runs out before all three hazards are found. Empty taps show «لا يوجد خطر هنا. حاول مرة أخرى.». Distractors show their own “not a hazard” text. With the timer off, the scene stays until all three hazards are found.
4. **Given** an ordering question, **When** the whole order is right, **Then** it scores 100, counts as correct, and costs no life. **When** it is partly right, **Then** it scores 25 for each card in the right place, counts as wrong, costs one life, and uses the partial-credit line.
5. **Given** a multiple-choice or true-or-false question, **When** the chosen answer is wrong, or **When** any question’s time runs out, **Then** one life is lost. At zero lives the game-over screen appears and no further question is shown. Game over never shows a badge.
6. **Given** the timer is on, **When** a question starts, **Then** the limits are 60 seconds for the scene search, 30 seconds for multiple choice, 20 seconds for true or false, and 45 seconds for ordering. The countdown is announced once at 10 seconds, not every second. Time running out is announced immediately.
7. **Given** the timer switch is off, **When** the attempt runs, **Then** there is no countdown, no timeout, and no time bonus.
8. **Given** all ten questions are finished, **When** base points are at least 900 (90%), **Then** the badge is «الشارة الذهبية: بطل السلامة» and the message is «أداء رائع! وعيك بالسلامة يحميك ويحمي زملاءك.». **When** base points are 700–899 (70–89%), **Then** the badge is «الشارة الفضية: حارس السلامة» and the message is «نتيجة جيدة، لقد اجتزت التحدي. راجع الأسئلة التي أخطأت فيها لتصل إلى المستوى الذهبي.». **When** base points are under 700 and all ten were finished, **Then** the badge is «الشارة البرونزية: مستكشف السلامة» and the message is «أكملت التحدي، لكنك لم تبلغ درجة الاجتياز (70%). راجع الشرح وحاول مرة أخرى.».
9. **Given** the results or game-over screen and a connected learning system, **When** the screen appears, **Then** the recorded score is the base points divided by 1,000, multiplied by 100, and rounded to a whole number, and the lesson is passed when that number is at least 70 and failed otherwise. The time bonus is not part of the recorded score. Optional per-question records, if written, must not stop the activity when the learning system rejects them. **When** the learner chooses «إنهاء النشاط», **Then** the session finishes and the message is «تم حفظ نتيجتك. يمكنك إغلاق هذه النافذة.».
10. **Given** no learning system, **When** the learner chooses «إنهاء النشاط», **Then** the message is «انتهى النشاط. (وضع العرض: لا يوجد نظام إدارة تعلّم متصل.)» and the page does not fail.
11. **Given** «حاول مرة أخرى», **When** a new attempt reaches results or game over, **Then** the on-screen attempt starts clean, and the recorded score stays at the higher of the previous recorded score and the new one.
12. **Given** game over, **When** it is shown, **Then** the text is «انتهت المحاولات. نفدت محاولاتك الثلاث، ولا بأس في ذلك، فالتعلّم يبدأ من الأخطاء. راجع الشرح وحاول مجدداً.», with points so far, the review list, «حاول مرة أخرى», and «إنهاء النشاط».

---

### User Story 3 - Prove the six published checks (Priority: P1)

A reviewer can reproduce six documented runs and get the published outcomes.

**Why this priority**: These six runs are the proof that scoring, lives, the timer, ordering, and the scene search work.

**Independent Test**: Perform each check below and compare the outcome with the expected result.

**Acceptance Scenarios**:

1. **Given** the timer is on, **When** every question is fully correct with at least half the time left, **Then** the badge is gold and the displayed total is 1,500 (1,000 base plus 500 bonus). The recorded score is 100 and the lesson is passed.
2. **Given** the timer is off, **When** the same perfect answers are given, **Then** there is no countdown and no bonus, the displayed total is 1,000, and the badge is still gold.
3. **Given** three wrong answers, **When** the third life is lost, **Then** game over appears, with no badge, and no further question is asked.
4. **Given** the timer is on, **When** a question’s time runs out, **Then** one life is lost and the timeout text is shown.
5. **Given** an ordering question, **When** the learner reorders by dragging the handle and, on another attempt, by ▲ and ▼ only, **Then** both ways can produce the correct order and the same score.
6. **Given** the scene search, **When** the learner finds all three hazards, taps both distractors, and taps one empty area, **Then** each distractor explains itself, the empty tap shows «لا يوجد خطر هنا. حاول مرة أخرى.», the score is 70, the feedback is partial, no life is lost, and no time bonus is added.

---

### User Story 4 - Read every question as written (Priority: P1)

The learner sees the agreed Arabic for all ten questions, the feedback lines, and the shared labels, with no rewording.

**Why this priority**: The Arabic is the client-facing script. A paraphrase fails the sample before the game is judged.

**Independent Test**: Open each question and the start, feedback, results, and game-over screens and compare every string with the script in this story.

**Acceptance Scenarios**:

1. **Given** question 1 (scene search, 60 seconds), **When** it is shown, **Then** the question is «ابحث عن 3 مخاطر في هذا المستودع، وانقر على كل خطر تجده.» The image description is «مستودع فيه رفوف وصناديق، وعامل يرتدي خوذة وسترة عاكسة، وطفاية حريق على الجدار، وبقعة سائل على الأرض، وصناديق أمام باب الطوارئ، وسلك كهربائي ممدود عبر الممر.» Until the warehouse picture exists, a placeholder stands in and the zones still work. The hazards are:
   - أرضية مبللة دون لافتة تحذير: «انسكاب السوائل دون لافتة تحذير يسبب الانزلاق. يجب تنظيفه فوراً ووضع لافتة «أرضية مبللة».»
   - مخرج طوارئ مسدود بالصناديق: «يجب أن تبقى مخارج الطوارئ وممراتها خالية دائماً حتى يتمكن الجميع من الإخلاء بسرعة.»
   - سلك كهربائي ممدود عبر الممر: «الأسلاك الممدودة في الممرات تسبب التعثّر، وقد تتلف فتسبب صعقة كهربائية. استخدم أغطية أو مسارات مخصصة للأسلاك.»
   The distractors are:
   - طفاية الحريق على الجدار: «هذه طفاية حريق في مكانها الصحيح، وليست خطراً.»
   - العامل بالخوذة والسترة العاكسة: «هذا العامل يرتدي معدات الوقاية الشخصية المناسبة.»
   The summary is «المخاطر الثلاثة: أرضية مبللة دون تحذير، ومخرج طوارئ مسدود، وسلك ممدود عبر الممر. ملاحظة المخاطر والإبلاغ عنها مسؤولية الجميع.»
2. **Given** question 2 (multiple choice, 30 seconds), **When** it is shown, **Then** the question is «اندلع حريق صغير في لوحة كهربائية. أي طفاية هي الأنسب؟» and the options are «طفاية الماء المضغوط», «طفاية ثاني أكسيد الكربون (CO₂)», «طفاية الرغوة», and «بطانية الحريق». Only «طفاية ثاني أكسيد الكربون (CO₂)» is correct. The explanation is «طفاية ثاني أكسيد الكربون لا توصل الكهرباء ولا تترك بقايا، لذلك تناسب حرائق المعدات الكهربائية. أما الماء ومعظم أنواع الرغوة فتوصل الكهرباء وقد تسبب صعقة. افصل التيار الكهربائي أولاً إن كان ذلك آمناً.» The token CO₂ stays in correct reading order.
3. **Given** question 3 (true or false, 20 seconds), **When** it is shown, **Then** the statement is «يمكن استخدام المصعد للنزول بسرعة أثناء إخلاء المبنى بسبب حريق.» and the correct answer is «خطأ». The explanation is «استخدم السلالم دائماً عند الإخلاء. قد يتوقف المصعد بسبب انقطاع الكهرباء، أو يفتح في طابق يشتعل فيه الحريق، أو يمتلئ بالدخان.»
4. **Given** question 4 (ordering, 45 seconds), **When** it is shown, **Then** the question is «رتّب خطوات التصرّف عند اكتشاف حريق وفق نموذج RACE:» and the correct order is «إنقاذ من هم في خطر مباشر إن كان ذلك آمناً (R)», «إطلاق إنذار الحريق وإبلاغ الطوارئ (A)», «احتواء الحريق بإغلاق الأبواب والنوافذ (C)», «إطفاء الحريق إن كان صغيراً، أو الإخلاء فوراً (E)». The explanation is «يرتّب نموذج RACE الأولويات: الأرواح أولاً، ثم التنبيه، ثم منع انتشار الحريق، ثم الإطفاء أو الإخلاء. اتّبع دائماً خطة الطوارئ المعتمدة في منشأتك.» The token RACE stays in correct reading order.
5. **Given** question 5 (multiple choice, 30 seconds), **When** it is shown, **Then** the question is «ما الطريقة الصحيحة لرفع صندوق ثقيل من الأرض؟» and the options are «ثني الركبتين مع إبقاء الظهر مستقيماً والحمل قريباً من الجسم», «ثني الظهر مع إبقاء الساقين مستقيمتين», «رفع الصندوق بسرعة مع لفّ الجذع», and «حمل الصندوق بعيداً عن الجسم لرؤية الطريق». Only the first of those is correct. The explanation is «استخدم عضلات الساقين لا الظهر، وأبقِ الحمل قريباً من جسمك، وتجنّب الالتواء. وإذا كان الحمل ثقيلاً جداً فاطلب المساعدة أو استخدم وسيلة رفع.»
6. **Given** question 6 (true or false, 20 seconds), **When** it is shown, **Then** the statement is «يجب الإبلاغ عن «الحادث الوشيك» (Near Miss) حتى لو لم يُصب أحد ولم تتضرر أي معدات.» and the correct answer is «صح». The explanation is «الحوادث الوشيكة إنذار مبكر، والإبلاغ عنها يساعد على معالجة السبب قبل أن يتحول إلى إصابة فعلية.» The token Near Miss stays in correct reading order.
7. **Given** question 7 (multiple choice, 30 seconds), **When** it is shown, **Then** the question is «زميلك يعمل في موقع خارجي في يوم صيفي حار، ويشكو من دوار وصداع وتعرّق شديد. ما الإجراء الأول الصحيح؟» and the options are «نقله إلى مكان مظلل أو مكيّف، وإعطاؤه الماء إن كان واعياً، وإبلاغ المشرف أو المسعف», «إعطاؤه مشروب طاقة ليواصل العمل», «إعطاؤه مسكّناً للصداع ليكمل الوردية», and «تركه يستريح في سيارة مغلقة حتى نهاية الدوام». Only the first of those is correct. The explanation is «هذه علامات الإجهاد الحراري، وقد تتطور إلى ضربة شمس تهدد الحياة. التبريد السريع وطلب المساعدة أولوية، واطلب الإسعاف فوراً إذا فقد الوعي أو اضطرب كلامه.»
8. **Given** question 8 (ordering, 45 seconds), **When** it is shown, **Then** the question is «رتّب خطوات عزل الطاقة (القفل والبطاقة) قبل صيانة آلة:» and the correct order is «إبلاغ العاملين المتأثرين بأعمال الصيانة», «إيقاف تشغيل الآلة بالطريقة المعتادة», «عزل مصدر الطاقة وتركيب القفل والبطاقة», «التحقق من انعدام الطاقة بمحاولة التشغيل قبل البدء». The explanation is «خطوة التحقق يتجاهلها كثيرون، مع أنها هي التي تؤكد أن الآلة لن تعمل فجأة أثناء الصيانة. لا تبدأ العمل قبل التأكد من عزل جميع مصادر الطاقة.»
9. **Given** question 9 (true or false, 20 seconds), **When** it is shown, **Then** the statement is «لا بأس بإبقاء باب الحريق مفتوحاً بإسفين لتسهيل الحركة ما دام لا يوجد حريق.» and the correct answer is «خطأ». The explanation is «صُممت أبواب الحريق لتبقى مغلقة حتى تمنع انتشار الدخان والنار، وإبقاؤها مفتوحة يُفقدها وظيفتها في اللحظة التي تحتاج إليها.»
10. **Given** question 10 (multiple choice with a sign, 30 seconds), **When** it is shown, **Then** the image is the public-domain ISO 7010 “wear head protection” sign, described as «لافتة دائرية زرقاء عليها رمز خوذة بيضاء». The question is «ماذا تعني هذه اللافتة؟» and the options are «ارتداء خوذة الرأس إلزامي في هذه المنطقة», «يُمنع ارتداء الخوذة هنا», «تحذير من سقوط أجسام», and «مكان حفظ الخوذات». Only the first of those is correct. The explanation is «اللافتات الدائرية الزرقاء تعني «إلزامي» وفق المعيار الدولي ISO 7010، والمثلث الأصفر يعني «تحذير»، والدائرة الحمراء المشطوبة تعني «ممنوع».» The token ISO 7010 stays in correct reading order.
11. **Given** the review list, **When** it is shown, **Then** the short titles are exactly: «اكتشاف المخاطر», «طفاية الحريق الكهربائي», «المصعد أثناء الإخلاء», «خطوات RACE», «رفع الأحمال», «الحوادث الوشيكة», «الإجهاد الحراري», «عزل الطاقة», «أبواب الحريق», and «لافتات السلامة».
12. **Given** any screen, **When** shared labels are used, **Then** they are exactly: «ابدأ», «التالي», «تابِع», «أعد المحاولة», «إنهاء النشاط», «تم حفظ نتيجتك. يمكنك إغلاق هذه النافذة.», «انتهى النشاط. (وضع العرض: لا يوجد نظام إدارة تعلّم متصل.)», «النقاط», «السؤال {n} من {total}», «المحاولات», «الوقت», «جارٍ التحميل…», and «تخطَّ إلى المحتوى». Scores, timers, and counters use Western digits.

---

### User Story 5 - Finish on a phone and with a keyboard (Priority: P2)

A reviewer can finish the game on a narrow phone and with a keyboard only. The screen looks like a game: a top bar, hearts, and a medal. Focus moves to each new heading. Feedback is announced without taking focus. Time running out is announced at once.

**Why this priority**: The portfolio is judged on a phone and on basic accessibility, after the game itself works.

**Independent Test**: Complete one attempt at 360 px width using touch, and another using only the keyboard with the timer off, and confirm no horizontal scroll, reachable zones, and announced feedback.

**Acceptance Scenarios**:

1. **Given** a 360 px-wide screen, **When** any question is shown, **Then** answers stack in one column, each control is at least 44×44 px, body text is at least 16 px, Arabic is not letter-spaced, the top bar stays visible, and the page does not scroll sideways. The drag handle is the only place that stops the page from scrolling while a finger is down.
2. **Given** keyboard-only use, **When** the learner moves to a new screen, **Then** focus lands on that screen’s heading, and every answer, zone, reorder button, and screen button can be reached and activated from the keyboard.
3. **Given** feedback, the score, or the lives change, **When** it appears, **Then** it is announced politely. Time running out is announced immediately. Meaning does not rely on colour alone. Text contrast is at least 4.5:1 and control contrast at least 3:1.
4. **Given** reduced motion is requested, **When** the feedback panel appears, **Then** motion stays at or under 300 ms or is reduced.
5. **Given** a reviewer adds debug mode to the page address, **When** they tap the scene, **Then** the five zones are outlined and each tap is reported as a percentage of the picture, so the zones can be fitted to the final warehouse picture.
6. **Given** the results screen, **When** a badge is earned, **Then** the medal is an original drawing labelled with the Arabic badge name. The safety sign is the public-domain head-protection sign. Neither uses a real company logo.

---

### Edge Cases

- An ordering shuffle is discarded and drawn again if it matches the correct order, including after «حاول مرة أخرى».
- A scene-search score never goes below 0, even after many empty taps. Once all three hazards are found, the score is 100 minus 10 for each distractor or empty tap so far, floored at 0. Taps after the question has already ended do not change it.
- Finding the same hazard twice does not add points or change the counter.
- Partial ordering credit is 0, 25, 50, or 75. A life is still lost unless the score is 100.
- The scene search does not lose a life for wrong taps. It loses a life only when time runs out with fewer than three hazards found. With the timer off, the learner leaves that question only by finding all three hazards, because there is no timeout.
- Game over on the tenth question shows game over, not the bronze badge, even if all ten were reached.
- A pass is possible on game over when base points are already at least 700. The recorded result still follows that number. No badge is shown.
- The recorded score ignores the time bonus. A perfect timed run shows 1,500 and records 100.
- «إنهاء النشاط» finishes the learning-system session once. A second finish does not finish it again.
- Opening the sample starts the learning-system session once when a system is present, and does nothing harmful when it is absent. Nothing is recorded until results or game over.
- Refresh during an attempt restores it, including the recorded score. If that stored attempt is missing or invalid, the learner starts again from the start screen and no score is reported until results or game over.
- «حاول مرة أخرى» clears the on-screen attempt. The recorded score stays at the higher of the previous score and the new one.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The sample MUST present the Arabic title «تحدّي السلامة في موقع العمل» and run right to left in Arabic.
- **FR-002**: The activity MUST follow this order: start (rules, objectives, timer switch), ten questions in the published order each followed by feedback, then either results or game over.
- **FR-003**: Every learner-facing string in this specification MUST appear exactly as written. Copy MUST NOT be rephrased, translated, or “corrected”.
- **FR-004**: Base points MUST be 100 for a fully correct question and 1,000 for a perfect base total. A time bonus of 50 MUST be added only when the timer is on, the answer is fully correct, and at least half the time remains.
- **FR-005**: The scene search MUST score 33 per new hazard until all three are found, then MUST set the score to 100 and subtract 10 for each distractor or empty tap already made, floored at 0. It MUST count as fully correct only when that score is 100. It MUST cost a life only when time runs out before all three hazards are found. With the timer off it MUST stay open until all three hazards are found, with no skip.
- **FR-006**: Ordering MUST score 100 when the whole order is right and 25 per card in the right place otherwise. Only a fully correct order counts as correct. Any other submitted order MUST cost one life.
- **FR-007**: A wrong multiple-choice or true-or-false answer, and any timeout, MUST cost one life. At zero lives the attempt MUST end on game over with no badge and no further question.
- **FR-008**: Timers MUST be 60, 30, 20, and 45 seconds for scene search, multiple choice, true or false, and ordering. The start-screen switch «تشغيل المؤقت» MUST be on by default. Off MUST mean no countdown, no timeout, and no time bonus.
- **FR-009**: Multiple-choice options MUST be shuffled every attempt. True or false MUST stay «صح» then «خطأ». An ordering shuffle MUST NOT equal the correct order. Multiple choice and true or false MUST lock on the first tap.
- **FR-010**: Pass and badge MUST use base points only: gold at 900 or more, silver from 700 to 899, bronze when all ten are finished below 700. Game over MUST NOT show a badge. Results and game over MUST use the messages in User Story 2.
- **FR-011**: On results or game over, the recorded score MUST be the rounded whole-number percent of base points out of 1,000, keeping the higher score if one is already recorded, and the lesson MUST be passed at 70 or above and failed below 70. «إنهاء النشاط» MUST finish the session and show the saved or standalone message. Optional per-question records MUST NOT break the activity if rejected.
- **FR-012**: Ordering MUST work by pointer on the handle and by ▲ and ▼. Scene zones MUST be keyboard reachable and labelled «المنطقة 1» to «المنطقة 5». A reviewer debug mode MUST outline zones and report tap position as a percentage.
- **FR-013**: On a 360 px-wide screen, targets MUST be at least 44×44 px and the page MUST NOT scroll horizontally. Focus MUST move to each new heading. Feedback, score, and lives MUST be announced politely. Timeout MUST be announced immediately. The timer warning MUST fire at 10 seconds only. Numerals MUST be Western digits.
- **FR-014**: Question text, answers, explanations, points rules, and screen copy MUST be stored as content separate from the behaviour that plays the attempt.
- **FR-015**: The head-protection sign MUST be the public-domain ISO 7010 sign. Gold, silver, and bronze medals MUST be original drawings labelled with the Arabic badge names. The warehouse picture MAY be a placeholder until the project picture exists. Sources and licences MUST be recorded. The sample disclaimer «نموذج تجريبي لأغراض العرض، ولا يغني عن تدريب السلامة المعتمد في منشأتك.» MUST be visible.

### Key Entities

- **Attempt**: Current question, base points, bonus points, lives remaining (0–3), timer on or off, elapsed time, and the per-question outcomes. Cleared by retry.
- **Question**: One of ten items with a type, a time limit, a prompt, the accepted answer, an explanation, and a short review title.
- **Outcome**: Points awarded, whether it counts as correct, whether a life was lost, and the feedback line (correct, partial, wrong, or timeout).
- **Result**: Badge or game over, displayed total, base percent, correct count, time taken, and the ten-row or partial review list.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A learner can move from «ابدأ التحدي» through ten questions in one sitting of about 5–8 minutes when answers are given without waiting out the timers.
- **SC-002**: A perfect run with the timer on shows gold and 1,500 points. The same answers with the timer off show 1,000 points, no countdown, and still gold.
- **SC-003**: Three wrong answers end on game over with no badge. One timeout costs exactly one life.
- **SC-004**: Both a pointer and the ▲/▼ buttons can set a correct order. Finding all three hazards plus two distractors and one empty tap scores 70, shows partial feedback, costs no life, and adds no time bonus.
- **SC-005**: On a 360 px-wide phone, a reviewer completes an attempt with touch only, with no horizontal scrolling. A keyboard-only reviewer completes an attempt with the timer off.
- **SC-006**: With a learning system connected, results or game over store a whole-number score from 0 to 100 equal to the rounded base percent, or the higher score already stored, and mark the lesson passed at 70 or above and failed below. «إنهاء النشاط» shows the saved message. With no system, finish shows the standalone message and the activity still completes on screen.
- **SC-007**: A reviewer comparing the screens with the agreed script finds no reworded Arabic on the title, rules, objectives, questions, explanations, feedback, badges, or buttons.

## Assumptions

- The shared sample shell already provides the Arabic page, the shared labels in User Story 4 scenario 12, learning-system start and finish, Western digits, the skip link, and the brand footer «نموذج تجريبي من إعداد Twin Particles». This feature adds the game and does not replace that shell.
- The sample-specific disclaimer in FR-015 is shown in addition to the shared brand footer.
- Refresh resume uses the browser session store. A missing or invalid store returns the learner to the start and does not report a score.
- Percent rounding uses ordinary half-up rounding to a whole number.
- The warehouse picture may be missing at first. Zones are still specified as percentages of the picture so they can be aligned later. The head-protection sign is obtained from the public-domain ISO 7010 file named in the build spec and stored with the sample.
- This feature does not include the feedback conversation, a live experience-record service, or a replacement of the shared learning-system shell. Per-question records are optional and must fail quietly.
- The setting stays a generic workplace. No client or employer name, and no real company logo, is added.
