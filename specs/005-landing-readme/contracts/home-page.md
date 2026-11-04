# Contract: Home page

`index.html` plus `assets/landing.css`. No script.

## Document

- Root element: `lang="en"` `dir="ltr"`.
- Stylesheet href is relative: `assets/landing.css`.
- Visible heading text is exactly `Arabic Interactive E-Learning Samples / نماذج تعلّم تفاعلي باللغة العربية`.
- The Arabic heading half is an element with `lang="ar"` and `dir="rtl"`.

## Cards

Two cards, feedback first.

| Card | Title element | Description | Try href | Download href |
|---|---|---|---|---|
| Feedback | `lang="ar"` `dir="rtl"`, text `محادثة التغذية الراجعة: موقف قيادي` | `lang="ar"` `dir="rtl"`, text `موقف من ثلاث قرارات حول إعطاء التغذية الراجعة` | `./feedback-scenario/` | `https://github.com/<account>/arabic-elearning-samples/releases/download/v1.0/feedback-scenario-scorm12.zip` |
| Safety | `lang="ar"` `dir="rtl"`, text `تحدّي السلامة في موقع العمل` | `lang="ar"` `dir="rtl"`, text `عشرة أسئلة عن السلامة في موقع العمل` | `./safety-challenge/` | `https://github.com/<account>/arabic-elearning-samples/releases/download/v1.0/safety-challenge-scorm12.zip` |

- Try link visible text is `جرّب النموذج` on an element with `lang="ar"` and `dir="rtl"`.
- Download link visible text is `Download SCORM 1.2`.
- A note on the page contains the words Claude, Cursor, phone, and LMS (or “learning system”).

## Layout

- Background `#F7F8FA`, text `#1F2937`, primary `#0F766E`.
- Body text at least 16 px. Arabic is not letter-spaced.
- Try and download controls are at least 44 px by 44 px.
- At 360 px width the page does not scroll horizontally.
- Text contrast at least 4.5:1.

## Marker

An empty `.nojekyll` file exists at the repository root.
