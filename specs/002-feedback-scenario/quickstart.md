# Quickstart: Feedback branching scenario

## Prerequisites

- Node.js with `node --test` (already used by this repo).
- A local static server if the browser blocks module scripts on `file://`. The page itself uses classic scripts and also opens from `file://`.

## Automated checks

From the repo root:

```bash
node --test tests/feedback-engine.test.mjs
```

Expected after the engine exists:

- `D1-A → D2A-A → D3A-A` totals 30 and ending `best` (100%).
- `D1-C → D2B-A → D3A-A` totals 20 and ending `ok` (67%).
- `D1-A → D2A-C → D3B-A` totals 15 and ending `ok` (50%).
- `D1-C → D2B-B → D3B-B` totals 0 and ending `poor` (0%).
- `keepBest(67, 50)` is 67. `keepBest(null, 50)` is 50.
- A shuffled choice list still carries the original id, points, rating, feedback, consequence, and `next`.

Until `js/engine.js` exists, this file is expected to fail. That failure is the test-first gate.

## Manual path

1. Open `feedback-scenario/index.html`.
2. Confirm Arabic, right to left, title «محادثة التغذية الراجعة: موقف قيادي».
3. Walk start → objectives → سارة’s message. The decision line is absent. It appears as «القرار 1 من 3» only on the first decision.
4. Play the four routes in [data-model.md](./data-model.md). Compare ending title, debrief rows, and percent.
5. On a 30% or better first finish, retry into the 0 path. The debrief shows 0 of 30. The recorded score stays 100 if a learning system is connected.
6. «إنهاء النشاط» shows the saved message with a learning system, or the standalone message without one.
7. At 360 px, choices are one column, targets are at least 44 px, and the page does not scroll sideways.
8. Keyboard only: each new screen heading receives focus, and feedback is announced without moving focus.

## Out of this check

Do not require xAPI output, SCORM interaction records, the safety challenge, or final illustrations. Placeholder portraits are enough.
