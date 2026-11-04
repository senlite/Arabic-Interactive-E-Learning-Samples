# Research: Workplace safety challenge

## Hotspot score after wrong taps

- **Decision**: While hazards are still missing, each new hazard adds 33. When the third hazard is found, set the question to 100, then subtract 10 for every distractor or empty tap made on that question, floored at 0. Fully correct only at 100. No life lost for those taps.
- **Rationale**: Matches the 2026-11-04 clarification and the build-spec line “33 per hazard, 100 if all three, −10, floor 0”. The proof case (3 hazards, 2 distractors, 1 empty tap) is 70, partial, no bonus, no life.
- **Alternatives considered**: Ignore penalties after all three are found (always 100). Force 100 even after penalties. Both were rejected in clarification.

## Leaving the hotspot with the timer off

- **Decision**: No skip control. The question ends only when all three hazards are found. With the timer on, it also ends on timeout, and a timeout before three hazards costs one life.
- **Rationale**: The published timer-off rule removes timeout and the time bonus and does not add another exit. Clarification confirmed this.
- **Alternatives considered**: A «تم» button that either costs a life or does not. Rejected in clarification.

## Drag without a library

- **Decision**: Reorder with Pointer Events on the handle (`touch-action: none` only there) and with ▲/▼ buttons that call the same reorder function. Do not vendor SortableJS in the first build.
- **Rationale**: Constitution allows SortableJS only if custom pointer drag proves unreliable. The engine only needs the resulting order, so the page can swap implementations later without changing score tests.
- **Alternatives considered**: SortableJS now. Rejected until a manual check fails.

## Where the rules live

- **Decision**: Pure functions in `safety-challenge/js/engine.js`, tested with `node --test`. The page owns the clock, the DOM, and SCORM calls.
- **Rationale**: Same split as the feedback sample. Constitution requires a failing automated check before the code that implements score, lives, shuffle, and SCORM mapping.
- **Alternatives considered**: Testing only in the browser. Rejected because the six proof runs are numeric rules.

## SCORM interactions

- **Decision**: After each answered question, `app.js` may set `cmi.interactions.n.*` inside try/catch. Types: hotspot `performance`, MCQ `choice`, true/false `true-false`, order `sequencing`. A throw is ignored. xAPI is not sent.
- **Rationale**: Build spec §8.4 is optional and must not break the activity. Constitution cut order drops the xAPI stub before interactions, and this feature’s prompt keeps interactions in scope while forbidding a live LRS and a wrapper replacement.
- **Alternatives considered**: Skip interactions entirely. Rejected because the feature prompt includes them. Sending xAPI. Rejected by the feature assumptions.

## Assets

- **Decision**: Save the public-domain ISO 7010 M014 SVG from Wikimedia at `img/iso7010-m014.svg` and record it in `CREDITS.md`. Draw medal SVGs in the page. Use an inline placeholder for the warehouse until `img/warehouse.webp` exists. Hotspot zones are percentages. `?debug=1` outlines them and logs click percentages.
- **Rationale**: Build spec §9. Package stays small. Zones can be fitted after the picture exists without changing the engine.
- **Alternatives considered**: Block the sample on the generated warehouse image. Rejected by the feature spec.
