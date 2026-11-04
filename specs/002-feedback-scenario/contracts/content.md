# Contract: `window.CONTENT`

Loaded by `feedback-scenario/index.html` before `js/engine.js` and `js/app.js`. A script assignment, not a fetch.

## Shape

```text
CONTENT.meta.title
CONTENT.meta.description
CONTENT.meta.duration
CONTENT.objectives.heading
CONTENT.objectives.lead
CONTENT.objectives.items[5]
CONTENT.context.heading
CONTENT.context.speaker
CONTENT.context.role
CONTENT.context.message
CONTENT.context.background
CONTENT.nodes.D1 | D2A | D2B | D3A | D3B
CONTENT.nodes[id].scene
CONTENT.nodes[id].title
CONTENT.nodes[id].choices[3]
CONTENT.endings.best | ok | poor
CONTENT.endings[id].min
CONTENT.endings[id].max
CONTENT.endings[id].title
CONTENT.endings[id].narrative
CONTENT.debrief.heading
CONTENT.debrief.tipsHeading
CONTENT.debrief.tips[4]
CONTENT.debrief.disclaimer
CONTENT.ratings.good | partial | poor   → Arabic badge label
```

Each choice has `id`, `text`, `short`, `points`, `rating`, `feedback`, `consequence`, `next`.

## Rules

- Arabic values match the feature spec character for character, including punctuation.
- Choice ids, points, and `next` match [data-model.md](../data-model.md).
- `rating` is the token `good`, `partial`, or `poor`. The Arabic badge is `CONTENT.ratings[token]`.
- Shared button labels («ابدأ», «التالي», «تابِع», «أعد المحاولة», «إنهاء النشاط», «القرار {n} من {total}») stay in `window.UI` and are not copied into `CONTENT`, except where the feature spec fixes a screen-specific label that is already the same string (`ابدأ`, `التالي`).
- Finish messages stay in `UI.saved` and `UI.saved_standalone`.
