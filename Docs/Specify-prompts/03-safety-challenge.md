# /speckit-specify

Build Sample 2, the Arabic RTL game «تحدّي السلامة في موقع العمل», in `safety-challenge/`.

Read `Docs/Arabic-eLearning-Samples-Requirements.md` §3.2, §5 (all subsections), §6, §7, §8.4, and the Q1/Q10 rows of §9. Paste §5.5, §5.6, and §6 verbatim. Do not rephrase Arabic.

Ten questions in §5.5 order: 1 hotspot, 4 multiple choice, 2 drag-to-order, 3 true/false. Encode them as `window.CONTENT`. Mark correct MCQ options with `correct: true`. Shuffle MCQ options each attempt. Keep true/false as «صح» then «خطأ».

Rules from §5.2 are exact:

- 100 base points per question (1,000 total). Time bonus +50 only when the timer is on, the answer is correct, and at least half the time is left.
- Hotspot: 33 per hazard found (100 if all three). Wrong or empty click −10, floor 0. A life is lost on the hotspot only if time runs out before all three hazards are found.
- Drag order: 100 if the whole order is correct, otherwise 25 per item in the right position. The question is “correct” (no life lost) only when the whole order is right. Shuffle must never equal the correct order.
- 3 lives. A wrong answer or a timeout loses one life. At 0 lives show game over. No badge on game over.
- Timers: MCQ 30s, true/false 20s, drag 45s, hotspot 60s. Start-screen switch «تشغيل المؤقت» is on by default. Off means no countdown, no timeout, and no time bonus (WCAG 2.2.1).
- Pass mark 700 base points (70%). Badges: gold ≥90% «بطل السلامة», silver 70–89% «حارس السلامة», bronze if all 10 are finished under 70%.
- SCORM on results or game over: `score.raw` = round(base/1000×100), status `passed` if ≥70 else `failed`. Optional `cmi.interactions` in try/catch per §8.4.

HUD: points, «السؤال n من 10», hearts, countdown, right-to-left progress. Feedback panel shows correct, partial, wrong, or timeout text from §5.6, the explanation, and life change. Results and game over match §5.4 and §5.6. MCQ and true/false lock on tap. Drag uses a pointer handle (`touch-action: none` only on the handle) plus ▲/▼ buttons. Hotspots are percent-positioned buttons; counter «المخاطر المكتشفة: n من 3»; `?debug=1` outlines zones and logs click percentages. Announce the timer at 10 seconds only. Timer expiry uses `aria-live="assertive"`.

Q10 image is the public-domain ISO 7010 M014 SVG from the Wikimedia URL in §9, saved as `img/iso7010-m014.svg`. Q1 may use a placeholder until `img/warehouse.webp` exists. Draw gold, silver, and bronze medal SVGs in code with the Arabic badge names.

Prove the six checks in §11.2: perfect run with timer (gold, about 1,500 points), timer off (no bonus, no countdown), three wrong answers (game over), timeout loses a life, drag works by pointer and by ▲/▼, hotspot finds three hazards, distractors explain themselves, empty taps cost 10.

Out of scope: the feedback scenario, a live LRS, and replacing the shared SCORM wrapper.
