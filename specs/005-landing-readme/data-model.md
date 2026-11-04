# Data model: Bilingual portfolio front door

Static documents. No stored sessions.

## Home page

| Field | Rule |
|---|---|
| Document language | `en` |
| Document direction | `ltr` |
| Heading | Visible text `Arabic Interactive E-Learning Samples / نماذج تعلّم تفاعلي باللغة العربية` |
| Arabic heading island | `lang="ar"` `dir="rtl"` on `نماذج تعلّم تفاعلي باللغة العربية` |
| Cards | Exactly two, order: feedback scenario, then safety challenge |
| Workflow note | Names Claude (script), Cursor (code), and a manual check on a phone and in a learning system |

## Home card

| Field | Feedback | Safety |
|---|---|---|
| Title | محادثة التغذية الراجعة: موقف قيادي | تحدّي السلامة في موقع العمل |
| Description | موقف من ثلاث قرارات حول إعطاء التغذية الراجعة | عشرة أسئلة عن السلامة في موقع العمل |
| Title, description, try label | `lang="ar"` `dir="rtl"` | same |
| Try label | جرّب النموذج | جرّب النموذج |
| Try href | `./feedback-scenario/` | `./safety-challenge/` |
| Download label | Download SCORM 1.2 | Download SCORM 1.2 |
| Download href | `https://github.com/<account>/arabic-elearning-samples/releases/download/v1.0/feedback-scenario-scorm12.zip` | same host and tag, file `safety-challenge-scorm12.zip` |

Download hrefs contain the characters `<account>` until the owner edits them. They must not start with `./` or `/dist/`.

## Readme guide

| Field | Rule |
|---|---|
| Order | English markdown, then one Arabic block `<div dir="rtl" lang="ar">` |
| Live links | `https://<account>.github.io/arabic-elearning-samples/`, plus `feedback-scenario/` and `safety-challenge/` under that origin, in both languages |
| Local run | How to open the home page and both samples without a learning system |
| Package | `npm run package` produces both zips |
| LMS | SCORM Cloud first; Moodle sandbox if time allows |
| Workflow | Three lines: Claude script, Cursor code, manual phone and LMS check |
| Recordings | `media/feedback-scenario.gif`, `media/safety-challenge.gif` |
| Commands | A fenced block with push of `main`, Pages on branch `main` path `/`, and Release `v1.0` attaching both dist zips. Not executed by this feature |

## Credit row

| Field | Rule |
|---|---|
| Asset | File path or library name |
| Source | Tool, URL, or “drawn for this project” |
| Licence | SPDX-style or the spec’s licence name |
| Optional | OpenMoji and SortableJS rows exist. If unused, the row says not used |

Required image rows follow build-spec §9: feedback cover, Ahmed, Sara, three endings, warehouse, ISO 7010 M014, three badges. Google Fonts Cairo and Tajawal are Open Font License. ISO 7010 M014 is public domain with the Wikimedia Commons URL. Generated rows include the tool and the prompt.

## Publish state

| State | Meaning |
|---|---|
| Placeholder | `<account>` still in live and download URLs. Release v1.0 does not need to exist. |
| Published | Owner has replaced `<account>`, pushed `main`, enabled Pages, and created the release. Out of scope for this feature. |

No transitions are performed by the implementation.
