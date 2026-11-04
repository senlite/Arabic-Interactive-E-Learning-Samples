# Contract: README and credits

## README.md

1. English prose comes before any Arabic block.
2. One element: `<div dir="rtl" lang="ar">` … `</div>` holds the Arabic guide.
3. Both languages include all of the following:
   - Feedback sample named `محادثة التغذية الراجعة` or the English name “feedback scenario”.
   - Safety sample named `تحدّي السلامة في موقع العمل` or the English name “safety challenge”.
   - `https://<account>.github.io/arabic-elearning-samples/`
   - `feedback-scenario/` and `safety-challenge/` as live paths under that site.
   - How to open the folders locally.
   - `npm run package`.
   - SCORM Cloud named before the Moodle sandbox.
   - Three workflow lines that mention Claude, Cursor, and a manual check on a phone and in a learning system.
   - `media/feedback-scenario.gif` and `media/safety-challenge.gif`.
4. A fenced command block contains these commands and is not run by the feature:
   - `git push -u origin main`
   - A `gh api` invocation that sets GitHub Pages `build_type` to `legacy`, `source.branch` to `main`, and `source.path` to `/`.
   - `gh release create v1.0` with `dist/feedback-scenario-scorm12.zip` and `dist/safety-challenge-scorm12.zip`.

## CREDITS.md

A table with source and licence for each of:

- `feedback-scenario/img/cover.webp`
- `feedback-scenario/img/ahmed.webp`
- `feedback-scenario/img/sara.webp`
- `feedback-scenario/img/end-best.webp`
- `feedback-scenario/img/end-ok.webp`
- `feedback-scenario/img/end-poor.webp`
- `safety-challenge/img/warehouse.webp`
- `safety-challenge/img/iso7010-m014.svg` — public domain, `https://commons.wikimedia.org/wiki/File:ISO_7010_M014.svg`
- `safety-challenge/img/badge-gold.svg`
- `safety-challenge/img/badge-silver.svg`
- `safety-challenge/img/badge-bronze.svg`
- Cairo and Tajawal — Open Font License
- OpenMoji — CC BY-SA 4.0, marked not used when absent
- SortableJS — MIT, marked not used when absent

Each generated-image row names the tool and the prompt.
