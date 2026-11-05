# Contract: main-path smoke

Manual check. No new test dependency.

## Feedback scenario

Open `feedback-scenario/` at a window at least 1024 px wide and again at 360 px wide.

- Document is `dir="rtl"`.
- The main path reaches the debrief.
- Primary controls are fully visible.
- The page does not force horizontal scrolling.
- The console shows no error from the page between open and the debrief.

## Safety challenge

Open `safety-challenge/` at the same two widths.

- Document is `dir="rtl"`.
- The main path reaches results or game over.
- Primary controls are fully visible.
- The page does not force horizontal scrolling.
- The console shows no error from the page between open and that end state.

## Fixes allowed

Broken navigation, a missing asset, layout that hides a control, or a script error on that path.

## Fixes refused

Learner-facing Arabic, score bands, lives, branching, a visual redesign, and defects that are not on this path.
