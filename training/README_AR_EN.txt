CAD & SURVEY Tools - Training pack / حزمة التدريب
By Eng. Ali - CAD & SURVEY (Rumaila, Basra)  ·  version 2.4
========================================================================

[عربي]
تحتوي هذه الحزمة على تمرين لكل أداة من أدوات الشريط CAD & SURVEY، بالترتيب نفسه الموجود في الشريط.
في كل مجلد: ملفات بيانات التمرين (CSV / TXT / XLSX / GSI ...) ورسم البداية بصيغة DXF (والسكربت SCR للرسم نفسه).
الدليل بثلاث نسخ: العربية الفصحى، واللهجة العراقية، والإنجليزية:
   CAD_SURVEY_Training_MSA.pdf   CAD_SURVEY_Training_IQ.pdf   CAD_SURVEY_Training_EN.pdf
كيف تبدأ:
  1) انسخ مجلد Training كاملاً إلى مجلد خاص بك (مثل Documents).
  2) افتح index.html أو ملف PDF بلغتك، وابدأ بصفحة "ابدأ من هنا".
  3) في AutoCAD: OPEN ثم اختر نوع الملف DXF وافتح <TOOL>_start.dxf من مجلد التمرين، ثم احفظه DWG.
     إذا لم يُفتح ملف DXF: ارسم رسماً جديداً مترياً (acadiso.dwt) واكتب SCRIPT واختر <TOOL>_start.scr.
  4) اتبع الخطوات وقارن كل رقم بمربع "ما يجب أن تراه". الملفات التي في اسمها EXPECTED تحوي الأجوبة.
الوحدات بالمتر، والإحداثيات UTM النطاق 38 شمالاً (WGS 84) ما لم يُذكر نظام محلي.

[English]
One exercise for every tool of the CAD & SURVEY ribbon, in the order of the ribbon.
Each folder holds the exercise data (CSV / TXT / XLSX / GSI ...) and the starting drawing as DXF (plus the same drawing as an AutoCAD script, .scr).
The guide comes in three languages: Modern Standard Arabic (MSA), Iraqi Arabic (IQ) and English (EN) - the three PDF files above.
How to start:
  1) Copy the whole Training folder to a folder of yours (e.g. Documents).
  2) Open index.html or the PDF in your language and read "Start here".
  3) In AutoCAD: OPEN, file type DXF, open <TOOL>_start.dxf of the exercise, then SAVEAS a DWG.
     If a DXF does not open: new metric drawing (acadiso.dwt), type SCRIPT and choose <TOOL>_start.scr.
  4) Follow the steps and compare every number with "What you should see". Files named *EXPECTED* hold the answers.
Units are metres; coordinates are UTM zone 38 north (WGS 84) unless a local (plant) system is named.

------------------------------------------------------------------------
Folders / المجلدات
------------------------------------------------------------------------
01_CLABEL/   Plot corners: numbers, table, plant system, latitude / longitude
             أركان قطعة: ترقيم وجدول ونظام المصنع وخط العرض والطول
               - CLABEL_EXPECTED_corners.csv
               - CLABEL_start.dxf
               - CLABEL_start.scr
02_CLEAD/    Valve labels along a flowline, a special note and the table
             كتابة إحداثيات الصمامات على خط الجريان وملاحظة خاصة وجدول
               - CLEAD_EXPECTED_labels.csv
               - CLEAD_start.dxf
               - CLEAD_start.scr
03_CTRANS/   Plant system ↔ UTM: setup, verify, import, move a drawing
             نظام المصنع ↔ UTM: الإعداد والتحقق والاستيراد ونقل الرسم
               - CTRANS_Project_PointRotation.ctrans
               - CTRANS_Project_TwoPoints.ctrans
               - CTRANS_control_points_local_grid.csv
               - CTRANS_points_local_to_grid.csv
               - CTRANS_points_local_to_grid_EXPECTED.csv
               - CTRANS_start.dxf
               - CTRANS_start.scr
               - CTRANS_verify_paste_tab.txt
04_GEOUTM/   Latitude / longitude ↔ UTM 38N by hand and with the tool, KML
             التحويل بين الجغرافي و UTM 38N يدوياً وبالأداة، وملف KML
               - GEOUTM_EXPECTED_answers.csv
               - GEOUTM_geo_DD.csv
               - GEOUTM_geo_DMS_symbols.csv
               - GEOUTM_start.dxf
               - GEOUTM_start.scr
               - GEOUTM_utm_to_geo.csv
05_SREPORT/  Anchor bolts design against field, benchmark level check
             البراغي المثبتة: التصميم مقابل الحقل، وفحص مناسيب الروبيرات
               - SREPORT_BM_LevelRun_fieldbook.csv
               - SREPORT_BM_Level_known.csv
               - SREPORT_BM_Level_measured.csv
               - SREPORT_General_design_anchor_bolts.csv
               - SREPORT_General_field_anchor_bolts.csv
               - SREPORT_start.dxf
               - SREPORT_start.scr
06_CCOMP/    Design against as-built points: moved, added, deleted
             نقاط التصميم مقابل المنفّذ: متحرك ومضاف ومحذوف
               - CCOMP_EXPECTED_result.csv
               - CCOMP_design_and_asbuilt.csv
               - CCOMP_start.dxf
               - CCOMP_start.scr
07_CROUTE/   Pipeline route: legs, deflection angles, KP, marks and stakeout
             مسار خط الأنابيب: الأضلاع وزوايا الانحراف والـ KP والتوقيع
               - CROUTE_FL-123_flowline_route.csv
               - CROUTE_help_example.csv
               - CROUTE_staked_points.csv
               - CROUTE_start.dxf
               - CROUTE_start.scr
08_CDIV/     Three partners 2 : 1 : 1 and a road deduction
             قسمة بين شركاء 2 : 1 : 1 مع استقطاع طريق
               - CDIV_parcel_150x50_turned.csv
               - CDIV_parcel_help_example_ABCD.csv
               - CDIV_start.dxf
               - CDIV_start.scr
09_CAREA/    Areas with an island, an arc side and a small gap
             مساحات بجزيرة داخلية وضلع قوسي وفتحة صغيرة
               - CAREA_start.dxf
               - CAREA_start.scr
10_ANUM/     Fence posts every 25 m, plot numbers, renumbering
             ترقيم أعمدة سياج كل 25 م وأرقام القطع وإعادة الترقيم
               - ANUM_start.dxf
               - ANUM_start.scr
11_CVOL/     A stockpile of known shape and a platform on flat ground
             تشوين شكله معلوم ومنصة على أرض مستوية
               - CVOL_Grading_NGL_flat_10m.csv
               - CVOL_Grading_platform_outline.csv
               - CVOL_Stockpile_ST01_frustum.csv
               - CVOL_grading_start.dxf
               - CVOL_grading_start.scr
               - CVOL_stockpile_start.dxf
               - CVOL_stockpile_start.scr
12_CPROF/    Road and pipeline profiles: a level typo, vertical curves, crossings and clearance, sheets
             مقاطع طريق وخط أنابيب: خطأ منسوب ومنحنيات رأسية وتقاطعات وخلوص وصفحات طباعة
               - CPROF_EXPECTED_answers.csv
               - CPROF_LongRoute_12km.csv
               - CPROF_Pipe_crossings.csv
               - CPROF_Pipe_route_NGL_TOP.csv
               - CPROF_Road1_CL_2digit_stations.csv
               - CPROF_Road1_CL_STA_RL_DESC.csv
               - CPROF_Road1_LCLR_coords.csv
               - CPROF_Road1_design_PVI.csv
               - CPROF_start.dxf
               - CPROF_start.scr
13_CGRID/    A 50 m coordinate grid with a second (plant) system
             شبكة إحداثيات كل 50 م مع نظام ثانٍ للمصنع
               - CGRID_start.dxf
               - CGRID_start.scr
14_PTX/      Numbering a polyline, instrument files CSV and Leica GSI-16
             ترقيم بولي لاين وملفات الأجهزة CSV و Leica GSI-16
               - PTX_start.dxf
               - PTX_start.scr
15_OINFO/    Length, bearing, arc and polygon values by hand
             الطول والاتجاه وقيم القوس والمضلع يدوياً
               - OINFO_start.dxf
               - OINFO_start.scr
16_CPOINTS/  Import a field file, bad rows, N before E
             استيراد ملف حقلي وصفوف خاطئة وملف يبدأ بالشمالي
               - CPOINTS_GSI16.gsi
               - CPOINTS_csv_N_before_E_noheader.csv
               - CPOINTS_csv_bad_rows.csv
               - CPOINTS_csv_header.csv
               - CPOINTS_start.dxf
               - CPOINTS_start.scr
               - CPOINTS_xlsx_header.xlsx
17_CBM/      Benchmarks from points, level texts and a block; latitude / longitude by hand
             نقاط مناسيب من نقاط ونصوص مناسيب وكتلة، وخط العرض والطول يدوياً
               - CBM_EXPECTED_benchmarks.csv
               - CBM_start.dxf
               - CBM_start.scr
18_CLEN/     Lengths of every kind: arc in a polyline, 3D trench, perimeter, by type
             أطوال كل الأنواع: قوس في بولي لاين وخندق ثلاثي الأبعاد ومحيط، وملخص حسب النوع
               - CLEN_EXPECTED_lengths.csv
               - CLEN_start.dxf
               - CLEN_start.scr
19_CSEL/     Find by value: plots of about 500 m², 6 m kerbs, Ø 0.60 pipes, levels in a range, no level; Focus, PDF
             البحث بالقيمة: قطع نحو 500 م² وأرصفة 6 م وأنابيب Ø 0.60 ومناسيب ضمن مدى ونقاط بلا منسوب، و Focus و PDF
               - CSEL_EXPECTED_counts.csv
               - CSEL_start.dxf
               - CSEL_start.scr
20_CNOTE/    Site notes on a footing, an area and a polygon; photo, voice, a late reminder and its alert; PDF
             ملاحظات موقع على قاعدة ومنطقة ومضلع، وصورة وصوت، وتذكير متأخر وتنبيهه، و PDF
               - CNOTE_EXPECTED_notes.csv
               - CNOTE_photo_F3_rebar.jpg
               - CNOTE_photo_drain_MH1.jpg
               - CNOTE_start.dxf
               - CNOTE_start.scr
21_PROFILE/  My Profile: name, instruments with calibration, a project linked at the first save, reports that fill themselves
             الملف الشخصي: الاسم والأجهزة ومعايرتها، ومشروع يُربط عند أول حفظ، وتقارير تملأ نفسها
               - PROFILE_EXPECTED_fields.csv
               - PROFILE_start.dxf
               - PROFILE_start.scr
22_CSCOORD/  One drawing, a plant and two sites with their own systems; Dual Draw with Pick site
             رسم واحد فيه مصنع وموقعان لكل منهما نظامه، والرسم بـ Dual Draw و Pick site
               - CSCOORD_EXPECTED_points.csv
               - CSCOORD_System_Plant.ctrans
               - CSCOORD_System_SiteA_PS3.ctrans
               - CSCOORD_System_SiteB_Camp.ctrans
               - CSCOORD_ready.dxf
               - CSCOORD_start.dxf
               - CSCOORD_start.scr
guide/       the HTML pages of the guide (msa, iq, en) / صفحات الدليل بصيغة HTML

The PDFs are made from guide/ with:  python tools/make_training_pdf.py
CAD & SURVEY | Eng. Ali - YouTube @Eng.alicadsurvey
