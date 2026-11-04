# Contract: safety content

Browser script `safety-challenge/content.js` assigns `window.CONTENT`. It is not fetched.

## Shape

- `title`, `description`, `rules` (three strings), `timerLabel`, `timerHint`, `objectivesLead`, `objectives` (five strings), `startButton`
- `feedback`: `correct`, `partial`, `wrong`, `timeout`, `lifeLost` with the placeholders `{points}`, `{answer}`, `{lives}` as in the feature spec
- `next`, `showResult`, `resultsTitle`, `stats` (placeholders `{total}`, `{percent}`, `{correct}`, `{mm}`, `{ss}`)
- `badges.gold`, `badges.silver`, `badges.bronze`: each `{ name, message }` using the Arabic in the feature spec
- `gameOver`, `retry`, `finish`, `disclaimer`
- `questions`: length 10, ids `Q1`–`Q10` in spec order

## Question rules

- Q1 `type: "hotspot"`, `seconds: 60`, five zones, three with `hazard: true`. Prompt, hazard texts, distractor texts, empty-tap text, summary, and alt text match the feature spec.
- Q2, Q5, Q7, Q10 `type: "mcq"`, `seconds: 30`. Exactly one option has `correct: true`. Q10 includes the sign alt text and `img/iso7010-m014.svg`.
- Q3, Q6, Q9 `type: "truefalse"`, `seconds: 20`. Options are «صح» then «خطأ» in that order. Q3 and Q9 mark «خطأ». Q6 marks «صح».
- Q4 and Q8 `type: "order"`, `seconds: 45`, `steps.length === 4` in the correct order.
- Every question has `explain` and `short` from the feature spec.

The page must not rewrite these strings.
