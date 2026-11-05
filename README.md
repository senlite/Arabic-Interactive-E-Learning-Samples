# Arabic Interactive E-Learning Samples

Two Arabic workplace samples for a portfolio.

The feedback scenario, «محادثة التغذية الراجعة: موقف قيادي», is a three-decision conversation about giving feedback. The safety challenge, «تحدّي السلامة في موقع العمل», is ten questions about hazards on a work site.

Live links, confirmed on GitHub Pages:

- https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/feedback-scenario/
- https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/safety-challenge/

To run locally, open index.html in a browser. The try links open `feedback-scenario/` and `safety-challenge/`.

`npm run package` writes both course packages:

- `dist/feedback-scenario-scorm12.zip`
- `dist/safety-challenge-scorm12.zip`

The intended learning-system check is SCORM Cloud with SCORM 1.2. The feedback sample should report `completed` plus a score. The safety sample should report `passed` or `failed` against 70. No registration report is in this repo, so that check is not claimed as already done. Moodle is a later check if time allows.

How it was built:

1. Claude drafted the script.
2. Cursor built the pages.
3. A person checked them on a phone and in a learning system.

Recordings (files may be absent; these links are the contract):

- [Feedback scenario](media/feedback-scenario.gif)
- [Safety challenge](media/safety-challenge.gif)

## Publish (do not run from this feature)

```sh
git push -u origin main
gh api --method POST repos/senlite/Arabic-Interactive-E-Learning-Samples/pages -f build_type=legacy -f source.branch=main -f source.path=/
gh release create v1.0 dist/feedback-scenario-scorm12.zip dist/safety-challenge-scorm12.zip
```

<div dir="rtl" lang="ar">

# نماذج تعلّم تفاعلي باللغة العربية

عينتان عربيتان لمحفظة أعمال.

محادثة التغذية الراجعة: موقف قيادي هي موقف من ثلاث قرارات. تحدّي السلامة في موقع العمل هو عشرة أسئلة عن مخاطر موقع العمل.

روابط العرض المؤكدة على GitHub Pages:

- https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/feedback-scenario/
- https://senlite.github.io/Arabic-Interactive-E-Learning-Samples/safety-challenge/

للتشغيل محليًا افتح index.html في المتصفح. روابط التجربة تفتح `feedback-scenario/` و`safety-challenge/`.

يبني `npm run package` الحزمتين `dist/feedback-scenario-scorm12.zip` و`dist/safety-challenge-scorm12.zip`.

الفحص المقصود هو SCORM Cloud بمعيار SCORM 1.2. عينة التغذية الراجعة تُبلّغ `completed` مع درجة. عينة السلامة تُبلّغ `passed` أو `failed` مقابل 70. لا يوجد تقرير تسجيل في هذا المستودع، لذا لا يُدّعى أن الفحص تم. Moodle لاحقًا إذا سمح الوقت.

كيف بُني العمل:

1. Claude كتب النص.
2. Cursor بنى الصفحات.
3. راجعها شخص على الهاتف وفي نظام تعلم.

التسجيلات (قد تغيب الملفات؛ الروابط هي الاتفاق):

- media/feedback-scenario.gif
- media/safety-challenge.gif

</div>
