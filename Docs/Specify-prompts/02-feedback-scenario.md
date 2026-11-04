# /speckit-specify

Build Sample 1, the Arabic RTL branching scenario «محادثة التغذية الراجعة: موقف قيادي», in `feedback-scenario/`.

Read `Docs/Arabic-eLearning-Samples-Requirements.md` §3.1, §4 (all subsections), §6, and §7, and constitution principles I, II, and IV. Paste every learner-facing string from §4.5 and §6 verbatim. Do not rephrase Arabic.

The learner is a team leader. Characters are أحمد and سارة. Three decisions, three choices each. Points are 10, 5, or 0 (max 30). Branching is D1 to D2A or D2B, then D3A or D3B, then an ending by score: best 25–30, OK 15–20, poor 0–10. Shuffle choice order every attempt. No back button inside the scenario. After each choice, show a rating badge (موفّق / مقبول جزئياً / غير موفّق) with icon, colour, and text, plus feedback, consequence, and points, then «تابِع».

Screens follow §4.4: start, objectives, context (Sara’s message), three decisions with feedback, ending narrative, debrief. Debrief shows score out of 30 and percent, ending title, the path using the short labels in §4.5, and the four SBI tips. «أعد المحاولة» resets state. «إنهاء النشاط» calls SCORM finish and shows the saved or standalone message from §6. On debrief, set score to round(total/30×100) and lesson status `completed` (no pass/fail). `SCORM.init()` on load. Optional `sessionStorage` so refresh resumes.

UI is a conversation: scene card, speech bubbles, header «القرار n من 3», progress that fills from the right. Choice cards are buttons; one column on a phone. Placeholder SVG avatars until §9 images exist. Focus moves to each new screen heading. Feedback uses `aria-live="polite"`.

State shape is in §7.6. Encode content as `window.CONTENT` (`meta`, `objectives`, `context`, `nodes` D1, D2A, D2B, D3A, D3B, `endings`, `debrief`). Each choice has `id`, `text`, `short`, `points`, `rating` of `good`, `partial`, or `poor`, `feedback`, `consequence`, and `next`.

Prove the four paths in §4.3: 30 best, 20 OK (recovery), 15 OK, 0 poor.

Out of scope: the safety challenge, xAPI sending, SCORM interactions, and changing shared wrapper behaviour.
