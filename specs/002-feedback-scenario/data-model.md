# Data model: Feedback branching scenario

## Content (immutable)

### Meta

| Field | Value |
|---|---|
| id | `feedback-scenario` |
| title | محادثة التغذية الراجعة: موقف قيادي |
| description | أنت قائد فريق، وستخوض محادثة تغذية راجعة مع أحد أعضاء فريقك. كل قرار تتخذه يغيّر مسار المحادثة ونتيجتها. |
| duration | المدة التقريبية: 5–7 دقائق |
| startLabel | ابدأ |

### Objectives

Heading «ماذا ستتعلّم؟». Lead «بنهاية هذا النشاط ستتمكّن من:». Five items exactly as in the feature spec. Button «التالي».

### Context

Heading «صباح يوم الأحد». Speaker سارة, role مديرة الإدارة. Message and background exactly as in the feature spec. Button «التالي».

### Decision node

| Field | Rule |
|---|---|
| id | `D1`, `D2A`, `D2B`, `D3A`, or `D3B` |
| title | Header text after the decision count, for example «كيف تبدأ؟» |
| scene | Paragraph exactly as in the feature spec |
| choices | Exactly three |

### Choice

| Field | Rule |
|---|---|
| id | `D1-A`, `D1-B`, `D1-C`, and the same pattern for `D2A`, `D2B`, `D3A`, `D3B` |
| text | Full choice wording |
| short | Debrief label from the feature spec |
| points | 10, 5, or 0 only |
| rating | `good`, `partial`, or `poor` |
| feedback | Exact paragraph |
| consequence | Exact paragraph |
| next | `D2A`, `D2B`, `D3A`, `D3B`, or `END` |

Rating display: `good` → موفّق, `partial` → مقبول جزئياً, `poor` → غير موفّق. Points line: 10 → «+10 نقاط», 5 → «+5 نقاط», 0 → «0 نقاط».

Published links:

| Choice | Points | Next |
|---|---|---|
| D1-A | 10 | D2A |
| D1-B | 5 | D2A |
| D1-C | 0 | D2B |
| D2A-A | 10 | D3A |
| D2A-B | 5 | D3A |
| D2A-C | 0 | D3B |
| D2B-A | 10 | D3A |
| D2B-B | 0 | D3B |
| D2B-C | 5 | D3B |
| D3A-A | 10 | END |
| D3A-B | 5 | END |
| D3A-C | 0 | END |
| D3B-A | 5 | END |
| D3B-B | 0 | END |
| D3B-C | 0 | END |

### Ending

| id | Band | Title |
|---|---|---|
| best | 25–30 | نهاية ممتازة: حوار يبني الأداء والثقة |
| ok | 15–20 | نهاية مقبولة: تحسّن مؤقت |
| poor | 0–10 | نهاية ضعيفة: خسارة محتملة لموظف متميز |

Narratives are the three paragraphs in the feature spec. Button «عرض التقييم».

### Debrief block

Heading «ملخّص أدائك». Score pattern «نتيجتك: {score} من 30 ({percent}%)». Ending pattern «النهاية التي وصلت إليها: {endingTitle}». Path heading «قراراتك». Row pattern «القرار {n}: {choiceShortLabel} — {points} نقاط». Tips heading «مبادئ التغذية الراجعة الفعّالة» and the four tips in the feature spec. Buttons «أعد المحاولة» and «إنهاء النشاط». Disclaimer «نموذج تجريبي لأغراض العرض. الأسماء والمواقف افتراضية.».

## Attempt (mutable)

| Field | Rule |
|---|---|
| screen | `start`, `objectives`, `context`, `decision`, `feedback`, `ending`, `debrief` |
| nodeId | Current decision id, or null off the decision/feedback screens |
| pendingChoiceId | Set on feedback; null otherwise |
| path | Ordered list of `{ node, choice, points }` for committed choices. Length 0–3 |
| score | Sum of path points. 0–30, multiple of 5 |
| bestPercent | Highest percent already reported, or null before the first debrief |
| startedAt | Time the attempt began |

Cleared by «أعد المحاولة» except `bestPercent`, which survives for the browser session.

## Transitions

1. `start` → `objectives` → `context` → `decision` at `D1`.
2. Selecting a choice sets `pendingChoiceId` and `screen = feedback`. It does not append the path yet.
3. «تابِع» appends `{ node, choice, points }`, adds points to `score`, and follows `next`. `END` goes to `ending` after the ending is chosen from `score`. Any other `next` opens that node on `decision`.
4. «عرض التقييم» opens `debrief`. Percent is `round(score / 30 × 100)`. `bestPercent` becomes the greater of itself and that percent. The screen still shows this attempt’s score and percent.
5. «أعد المحاولة» resets screen, node, path, and score. `bestPercent` remains. The next decision shuffles again.
6. «إنهاء النشاط» does not change the attempt. It finishes the learning-system session once.

## Validation

- A node id appears at most once in `path`.
- `D1` is the only legal first node. `D2A` and `D2B` only follow `D1`. `D3A` and `D3B` only follow a D2 node. `END` only follows a D3 choice.
- Ending id is `best` for 25–30, `ok` for 15–20, `poor` for 0–10. Totals 11–14 and 21–24 cannot occur.
- Proof paths: `D1-A → D2A-A → D3A-A` = 30 best; `D1-C → D2B-A → D3A-A` = 20 ok; `D1-A → D2A-C → D3B-A` = 15 ok; `D1-C → D2B-B → D3B-B` = 0 poor.
