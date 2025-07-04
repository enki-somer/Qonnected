import { Category } from "@/types/certifications";

export const certificationCategories: Category[] = [
  {
    id: "development-programming",
    name: "التطوير والبرمجة",
    description: "شهادات معتمدة في مجال البرمجة وتطوير البرمجيات",
    exams: [
      {
        id: "python",
        name: "Python",
        description: "برمجة Python الاحترافية",
        price: "110,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة أساسية بالبرمجة",
          "فهم المفاهيم البرمجية",
          "مهارات حل المشكلات",
        ],
        learningOutcomes: [
          "برمجة تطبيقات Python",
          "التعامل مع البيانات",
          "إنشاء واجهات المستخدم",
          "أتمتة المهام البرمجية",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "برمجة سهلة - تحليل بيانات - أتمتة مهام - تطوير ويب - تعلم آلي",
        ],
      },
      {
        id: "java",
        name: "Java",
        description: "برمجة Java وتطوير التطبيقات",
        price: "110,000",
        duration: "150 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بمبادئ البرمجة",
          "فهم البرمجة كائنية التوجه",
          "خبرة في تطوير البرمجيات",
        ],
        learningOutcomes: [
          "برمجة تطبيقات Java",
          "تطوير تطبيقات الويب",
          "إدارة قواعد البيانات",
          "تطبيق أنماط التصميم",
        ],
        examDetails: {
          format: "اختبار عملي ونظري",
        },
        benefits: [
          "برمجة كائنية - تطوير تطبيقات - برمجة متقدمة - أداء عالي - أنظمة تشغيل",
        ],
      },
      {
        id: "software-development",
        name: "Software Development",
        description: "تطوير البرمجيات الاحترافي",
        price: "110,000",
        duration: "150 دقيقة",
        level: "متقدم",
        prerequisites: [
          "خبرة في البرمجة",
          "معرفة بمنهجيات التطوير",
          "فهم دورة حياة البرمجيات",
        ],
        learningOutcomes: [
          "تصميم وتطوير البرمجيات",
          "إدارة المشاريع البرمجية",
          "ضمان جودة البرمجيات",
          "تطبيق أفضل الممارسات",
        ],
        examDetails: {
          format: "اختبار عملي ونظري",
        },
        benefits: [
          "تطوير برمجيات - دورة حياة - كتابة أكواد - اختبار برامج - تحسين أداء",
        ],
      },
      {
        id: "swift-development",
        name: "Apple Swift Development",
        description: "تطوير تطبيقات iOS باستخدام Swift",
        price: "100,000",
        duration: "150 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بالبرمجة",
          "فهم مبادئ تطوير التطبيقات",
          "خبرة في نظام iOS",
        ],
        learningOutcomes: [
          "برمجة تطبيقات iOS",
          "تصميم واجهات المستخدم",
          "إدارة البيانات",
          "نشر التطبيقات",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "برمجة تطبيقات - تطوير iOS - لغة سويفت - تطبيقات موبايل - تصميم واجهات",
        ],
      },
      {
        id: "html-css",
        name: "HTML & CSS",
        description: "أساسيات هيكلة وتنسيق صفحات الويب",
        price: "110,000",
        duration: "90 دقيقة",
        level: "مبتدئ",
        prerequisites: [
          "معرفة أساسية بالحاسوب",
          "فهم مبادئ الإنترنت",
          "حماس لتعلم البرمجة",
        ],
        learningOutcomes: [
          "إنشاء صفحات ويب تفاعلية",
          "تنسيق المحتوى باحترافية",
          "تطوير واجهات مستخدم جذابة",
          "فهم أساسيات التصميم المتجاوب",
        ],
        examDetails: {
          format: "اختبار عملي ونظري",
        },
        benefits: [
          "تطوير مواقع - تصميم صفحات - تنسيق محتوى - أساسيات ويب - تصميم استجابي",
        ],
      },
      {
        id: "html5",
        name: "HTML5",
        description: "تطوير تطبيقات الويب الحديثة",
        price: "110,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بـ HTML و CSS",
          "فهم أساسيات JavaScript",
          "خبرة في تطوير الويب",
        ],
        learningOutcomes: [
          "استخدام ميزات HTML5 المتقدمة",
          "تطوير تطبيقات ويب تفاعلية",
          "دمج الوسائط المتعددة",
          "إنشاء تطبيقات متجاوبة",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "تقنيات ويب حديثة - تطوير صفحات - دعم الوسائط - تفاعل المستخدم - بناء مواقع",
        ],
      },
      {
        id: "javascript",
        name: "JavaScript",
        description: "لغة البرمجة الأساسية للويب التفاعلي",
        price: "110,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بـ HTML و CSS",
          "فهم أساسيات البرمجة",
          "خبرة في تطوير الويب",
        ],
        learningOutcomes: [
          "برمجة تطبيقات الويب التفاعلية",
          "التعامل مع DOM",
          "إدارة الأحداث والتحقق",
          "تطوير واجهات المستخدم",
        ],
        examDetails: {
          format: "اختبار عملي ونظري",
        },
        benefits: [
          "برمجة ويب - تفاعل صفحات - ديناميكية محتوى - تصميم واجهات - تطوير تطبيقات",
        ],
      },
    ],
  },
  {
    id: "business-office",
    name: "شهادات مايكروسوفت",
    description: "شهادات معتمدة في برامج مايكروسوفت أوفيس والأعمال",
    exams: [
      {
        id: "microsoft-word",
        name: "Microsoft Word",
        description: "معالجة النصوص والمستندات",
        price: "100,000",
        duration: "90 دقيقة",
        level: "مبتدئ إلى متوسط",
        prerequisites: [
          "معرفة أساسية باستخدام الحاسوب",
          "فهم أساسي للغة الإنجليزية",
          "خبرة في استخدام Windows",
        ],
        learningOutcomes: [
          "إنشاء وتحرير المستندات",
          "تنسيق النصوص والفقرات",
          "إدارة الجداول والصور",
          "إنشاء القوالب والنماذج",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "كتابة احترافية - تحرير مستندات - تنسيق نصوص - إنتاج تقارير - مهارات مكتبية",
        ],
      },
      {
        id: "microsoft-excel",
        name: "Microsoft Excel",
        description: "جداول البيانات والتحليل",
        price: "100,000",
        duration: "90 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة أساسية بالحاسوب",
          "فهم أساسي للرياضيات",
          "خبرة في استخدام Office",
        ],
        learningOutcomes: [
          "إنشاء وتحليل البيانات",
          "استخدام المعادلات والدوال",
          "إنشاء المخططات البيانية",
          "أتمتة المهام المتكررة",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "تحليل بيانات - جداول محورية - معادلات متقدمة - رسوم بيانية - إدارة معلومات",
        ],
      },
      {
        id: "microsoft-powerpoint",
        name: "Microsoft PowerPoint",
        description: "برنامج العروض التقديمية الاحترافية",
        price: "100,000",
        duration: "90 دقيقة",
        level: "مبتدئ إلى متوسط",
        prerequisites: [
          "معرفة أساسية بالحاسوب",
          "فهم مبادئ العرض",
          "خبرة في استخدام Office",
        ],
        learningOutcomes: [
          "إنشاء عروض تقديمية احترافية",
          "تصميم الشرائح والانتقالات",
          "إضافة الوسائط المتعددة",
          "تقديم العروض بفعالية",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "عروض تقديمية - تصميم شرائح - تواصل بصري - تأثيرات جذابة - سرد القصص",
        ],
      },
      {
        id: "microsoft-outlook",
        name: "Microsoft Outlook",
        description: "إدارة البريد الإلكتروني والتقويم",
        price: "100,000",
        duration: "90 دقيقة",
        level: "مبتدئ إلى متوسط",
        prerequisites: [
          "معرفة أساسية بالحاسوب",
          "فهم أساسيات البريد الإلكتروني",
          "خبرة في استخدام Office",
        ],
        learningOutcomes: [
          "إدارة البريد الإلكتروني",
          "تنظيم المواعيد والمهام",
          "إدارة جهات الاتصال",
          "تنسيق الاجتماعات",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "إدارة بريد إلكتروني - تنظيم جدول - تقويم مواعيد - اتصال فعال - مهارات عمل جماعي",
        ],
      },
      {
        id: "quickbooks",
        name: "QuickBooks",
        description: "برنامج المحاسبة والإدارة المالية",
        price: "150,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بالمحاسبة الأساسية",
          "فهم المبادئ المالية",
          "خبرة في استخدام الحاسوب",
        ],
        learningOutcomes: [
          "إدارة الحسابات والفواتير",
          "تتبع المصروفات والإيرادات",
          "إعداد التقارير المالية",
          "إدارة الميزانية",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "محاسبة رقمية - إدارة مالية - فواتير ومصاريف - تقارير ضريبية - حسابات الشركات",
        ],
      },
      {
        id: "pmi",
        name: "Project Management (PMI)",
        description: "إدارة المشاريع الاحترافية",
        price: "110,000",
        duration: "180 دقيقة",
        level: "متقدم",
        prerequisites: [
          "خبرة في إدارة المشاريع",
          "فهم منهجيات إدارة المشاريع",
          "معرفة بأدوات إدارة المشاريع",
        ],
        learningOutcomes: [
          "تخطيط وإدارة المشاريع",
          "إدارة الموارد والميزانيات",
          "تحليل المخاطر",
          "قيادة فرق العمل",
        ],
        examDetails: {
          format: "اختبار نظري وعملي",
        },
        benefits: [
          "إدارة مشاريع - تخطيط وتنفيذ - قيادة فرق - جدولة زمنية - تحكم بالمخاطر",
        ],
      },
      {
        id: "esb",
        name: "Entrepreneurship & Business",
        description: "ريادة الأعمال وإدارة المشاريع",
        price: "100,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "فهم أساسيات الأعمال",
          "روح المبادرة",
          "مهارات إدارية أساسية",
        ],
        learningOutcomes: [
          "تخطيط المشاريع التجارية",
          "دراسة السوق والمنافسة",
          "إدارة الموارد المالية",
          "استراتيجيات النمو",
        ],
        examDetails: {
          format: "اختبار نظري",
        },
        benefits: [
          "ريادة أعمال - إدارة مشاريع - تطوير أفكار - تخطيط استراتيجي - مهارات تسويقية",
        ],
      },

    ],
  },
  {
    id: "creative-design",
    name: "التصميم الإبداعي",
    description: "شهادات معتمدة في مجال التصميم الإبداعي والجرافيك",
    exams: [
      {
        id: "photoshop",
        name: "Adobe Photoshop",
        description: "برنامج تحرير وتعديل الصور الاحترافي",
        price: "100,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة أساسية بالتصميم الرقمي",
          "فهم مبادئ معالجة الصور",
          "خبرة في استخدام برامج Adobe",
        ],
        learningOutcomes: [
          "تحرير وتعديل الصور باحترافية",
          "العمل مع الطبقات والفلاتر",
          "تصحيح الألوان والإضاءة",
          "إنشاء تأثيرات خاصة",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "تحرير صور - تصميم إبداعي - تأثيرات بصرية - رسومات رقمية - تحسين الصور",
        ],
      },
      {
        id: "illustrator",
        name: "Adobe Illustrator",
        description: "برنامج تصميم الرسومات المتجهية",
        price: "100,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة أساسية بالتصميم الجرافيكي",
          "فهم مبادئ التصميم المتجهي",
          "خبرة في استخدام برامج Adobe",
        ],
        learningOutcomes: [
          "إنشاء رسومات متجهية",
          "تصميم الشعارات والهويات",
          "العمل مع الأشكال والمسارات",
          "إنشاء تصاميم للطباعة",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "تصميم شعارات - رسوم متجهية - إبداع بصري - رسم دقيق - أعمال فنية رقمية",
        ],
      },
      {
        id: "indesign",
        name: "Adobe InDesign",
        description: "برنامج النشر المكتبي وتصميم المطبوعات",
        price: "100,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بالتصميم الطباعي",
          "فهم مبادئ التنسيق",
          "خبرة في برامج Adobe",
        ],
        learningOutcomes: [
          "تصميم المنشورات المطبوعة",
          "إنشاء الكتب والمجلات",
          "تنسيق النصوص والصور",
          "إعداد ملفات للطباعة",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "تصميم منشورات - تنسيق كتب - إعداد مطبوعات - نشر احترافي - تصاميم متقدمة",
        ],
      },
      {
        id: "dreamweaver",
        name: "Adobe Dreamweaver",
        description: "برنامج تصميم وتطوير مواقع الويب",
        price: "100,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بـ HTML و CSS",
          "فهم مبادئ تصميم الويب",
          "خبرة في برامج Adobe",
        ],
        learningOutcomes: [
          "إنشاء مواقع ويب تفاعلية",
          "تصميم واجهات المستخدم",
          "تطوير صفحات متجاوبة",
          "نشر المواقع على الإنترنت",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "تصميم مواقع - تحرير أكواد - تطوير ويب - تصميم تفاعلي - بناء صفحات",
        ],
      },
    ],
  },
  {
    id: "engineering-architecture",
    name: "الهندسة والعمارة",
    description: "شهادات معتمدة في مجال الهندسة والتصميم المعماري",
    exams: [
      {
        id: "autocad",
        name: "AutoCAD",
        description: "برنامج التصميم الهندسي ثنائي وثلاثي الأبعاد",
        price: "110,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة أساسية بالرسم الهندسي",
          "فهم مبادئ التصميم الهندسي",
          "خبرة في استخدام الحاسوب",
        ],
        learningOutcomes: [
          "إنشاء رسومات ثنائية وثلاثية الأبعاد",
          "تعديل وتحرير التصاميم",
          "العمل مع الطبقات والأبعاد",
          "إنشاء وتعديل الكتل والمراجع",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "تصميم هندسي - رسم دقيق - نمذجة 2D/3D - هندسة مدنية - رسومات تقنية",
        ],
      },
      {
        id: "revit",
        name: "Revit",
        description: "برنامج نمذجة معلومات البناء (BIM)",
        price: "110,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة أساسية بالتصميم المعماري",
          "فهم مبادئ BIM",
          "خبرة في استخدام برامج Autodesk",
        ],
        learningOutcomes: [
          "إنشاء نماذج ثلاثية الأبعاد للمباني",
          "تطوير مخططات البناء",
          "إدارة معلومات المشروع",
          "التعاون في فرق التصميم",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "نمذجة معلومات البناء - تصميم معماري - تخطيط هندسي - تنسيق مشاريع - إدارة البناء",
        ],
      },
      {
        id: "inventor",
        name: "Inventor",
        description: "برنامج التصميم الهندسي والنمذجة ثلاثية الأبعاد",
        price: "110,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بالتصميم الهندسي",
          "فهم مبادئ النمذجة ثلاثية الأبعاد",
          "خبرة في برامج Autodesk",
        ],
        learningOutcomes: [
          "إنشاء نماذج ثلاثية الأبعاد",
          "تطوير رسومات تقنية",
          "محاكاة الحركة والتجميع",
          "إنشاء رسومات الإنتاج",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "تصميم ميكانيكي - نمذجة ثلاثية الأبعاد - محاكاة حركة - هندسة إنتاج - تطوير منتجات",
        ],
      },
      {
        id: "fusion360",
        name: "Fusion 360",
        description: "برنامج التصميم والتصنيع المتكامل",
        price: "110,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بالتصميم ثلاثي الأبعاد",
          "فهم مبادئ التصنيع",
          "خبرة في برامج التصميم",
        ],
        learningOutcomes: [
          "التصميم والنمذجة المتقدمة",
          "المحاكاة والتحليل",
          "برمجة التصنيع",
          "التعاون السحابي",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "تصميم CAD/CAM - تصنيع رقمي - نمذجة متقدمة - محاكاة ديناميكية - تصميم متعدد التخصصات",
        ],
      },
      {
        id: "3dsmax",
        name: "3ds MAX",
        description: "برنامج النمذجة والرسوم المتحركة ثلاثية الأبعاد",
        price: "110,000",
        duration: "150 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بالتصميم ثلاثي الأبعاد",
          "فهم مبادئ الرسوم المتحركة",
          "خبرة في برامج التصميم",
        ],
        learningOutcomes: [
          "إنشاء نماذج ثلاثية الأبعاد",
          "تطوير الرسوم المتحركة",
          "الإضاءة والتصيير",
          "إنشاء مشاهد تفاعلية",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "تصميم 3D - رسوم متحركة - نمذجة معمارية - تأثيرات سينمائية - رندر احترافي",
        ],
      },
      {
        id: "maya",
        name: "Maya",
        description: "برنامج الرسوم المتحركة والمؤثرات البصرية",
        price: "110,000",
        duration: "150 دقيقة",
        level: "متقدم",
        prerequisites: [
          "خبرة في الرسوم المتحركة",
          "معرفة بالتصميم ثلاثي الأبعاد",
          "فهم مبادئ المؤثرات البصرية",
        ],
        learningOutcomes: [
          "إنشاء رسوم متحركة احترافية",
          "تطوير المؤثرات البصرية",
          "النمذجة المتقدمة",
          "التصيير والإضاءة",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "تصميم ثلاثي الأبعاد - رسوم متحركة - مؤثرات بصرية - نمذجة شخصيات - تحريك احترافي",
        ],
      },
    ],
  },
  {
    id: "it-computer-science",
    name: "تكنولوجيا المعلومات وعلوم الحاسوب",
    description: "شهادات معتمدة في مجال تكنولوجيا المعلومات وعلوم الحاسوب",
    exams: [
      {
        id: "ic3",
        name: "IC3 GS6",
        description: "شهادة IC3 Digital Literacy - Global Standard 6",
        price: "125,000",
        duration: "90 دقيقة",
        level: "مبتدئ",
        prerequisites: [
          "معرفة أساسية بالحاسوب",
          "فهم مبادئ التكنولوجيا",
          "مهارات أساسية في الإنترنت",
        ],
        learningOutcomes: [
          "استخدام الحاسوب بكفاءة",
          "التعامل مع البرامج الأساسية",
          "استخدام الإنترنت بأمان",
          "فهم المفاهيم الرقمية",
        ],
        examDetails: {
          format: "اختبار عملي ونظري",
        },
        benefits: [
          "أساسيات الكمبيوتر - الإنترنت - التطبيقات المكتبية - مهارات تقنية - كفاءة رقمية",
        ],
      },
      {
        id: "ic3-spark",
        name: "IC3 GS5",
        description: "شهادة IC3 Digital Literacy - Global Standard 5",
        price: "100,000",
        duration: "90 دقيقة",
        level: "مبتدئ",
        prerequisites: [
          "لا توجد متطلبات مسبقة",
          "الرغبة في تعلم الحاسوب",
          "مهارات أساسية في القراءة",
        ],
        learningOutcomes: [
          "فهم أساسيات الحاسوب",
          "استخدام التطبيقات الأساسية",
          "التعرف على الإنترنت",
          "مهارات الأمان الرقمي",
        ],
        examDetails: {
          format: "اختبار تفاعلي",
        },
        benefits: [
          "تعليم مبسط - مهارات رقمية أولية - أساسيات الكمبيوتر - فهم التكنولوجيا - تحضير الطلاب",
        ],
      },
      {
        id: "microsoft-fundamentals",
        name: "Microsoft Certified Fundamentals",
        description: "أساسيات الحوسبة السحابية والذكاء الاصطناعي",
        price: "100,000",
        duration: "120 دقيقة",
        level: "مبتدئ إلى متوسط",
        prerequisites: [
          "معرفة أساسية بالحوسبة",
          "فهم مبادئ التقنيات الحديثة",
          "خبرة في استخدام الحاسوب",
        ],
        learningOutcomes: [
          "فهم الحوسبة السحابية",
          "أساسيات الذكاء الاصطناعي",
          "مفاهيم الأمن السيبراني",
          "التقنيات الحديثة",
        ],
        examDetails: {
          format: "اختبار نظري",
        },
        benefits: [
          "أساسيات تكنولوجيا - مهارات تقنية - مفاهيم حديثة - تحضير شهادات - تطوير مهني",
        ],
      },
      {
        id: "computational-thinking",
        name: "Computational Thinking",
        description: "مهارات التفكير الحاسوبي وحل المشكلات",
        price: "100,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "فهم أساسيات البرمجة",
          "مهارات التفكير المنطقي",
          "القدرة على حل المشكلات",
        ],
        learningOutcomes: [
          "تطوير التفكير المنطقي",
          "حل المشكلات البرمجية",
          "تصميم الخوارزميات",
          "تحليل وتقييم الحلول",
        ],
        examDetails: {
          format: "اختبار عملي ونظري",
        },
        benefits: [
          "حل مشكلات - تفكير منطقي - برمجة أساسية - تحليل أنظمة - منهجية علمية",
        ],
      },
      {
        id: "cybersecurity",
        name: "Cybersecurity",
        description: "أمن المعلومات والحماية السيبرانية",
        price: "110,000",
        duration: "150 دقيقة",
        level: "متقدم",
        prerequisites: [
          "معرفة بأساسيات الشبكات",
          "فهم مبادئ الأمن السيبراني",
          "خبرة في تقنية المعلومات",
        ],
        learningOutcomes: [
          "حماية الأنظمة والشبكات",
          "اكتشاف ومنع الاختراقات",
          "تحليل المخاطر الأمنية",
          "تطبيق معايير الأمان",
        ],
        examDetails: {
          format: "اختبار عملي ونظري",
        },
        benefits: [
          "أمن المعلومات - حماية البيانات - مكافحة هجمات - نظم مراقبة - إدارة المخاطر",
        ],
      },
      {
        id: "network-security",
        name: "Network Security",
        description: "أمن الشبكات وحماية البنية التحتية",
        price: "110,000",
        duration: "150 دقيقة",
        level: "متقدم",
        prerequisites: [
          "خبرة في إدارة الشبكات",
          "معرفة بأمن المعلومات",
          "فهم بروتوكولات الشبكات",
        ],
        learningOutcomes: [
          "تأمين الشبكات",
          "إدارة جدران الحماية",
          "مراقبة حركة البيانات",
          "الاستجابة للحوادث",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "أمن الشبكات - حماية الاتصال - جدران حماية - كشف التهديدات - حماية البنية التحتية",
        ],
      },
      {
        id: "networking",
        name: "Networking",
        description: "أساسيات الشبكات وإدارتها",
        price: "110,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة أساسية بالشبكات",
          "فهم مبادئ الاتصالات",
          "خبرة في تقنية المعلومات",
        ],
        learningOutcomes: [
          "تصميم وإدارة الشبكات",
          "تكوين أجهزة الشبكة",
          "حل مشكلات الاتصال",
          "إدارة الموارد الشبكية",
        ],
        examDetails: {
          format: "اختبار عملي ونظري",
        },
        benefits: [
          "شبكات حاسوب - نقل بيانات - إعدادات اتصال - بنية تحتية - تقنيات اتصال",
        ],
      },
      {
        id: "cisco-cyber-ops",
        name: "Cisco Cyber Ops",
        description: "عمليات الأمن السيبراني المتقدمة",
        price: "120,000",
        duration: "180 دقيقة",
        level: "متقدم",
        prerequisites: [
          "خبرة في أمن المعلومات",
          "معرفة بأدوات Cisco",
          "فهم عمليات الأمن",
        ],
        learningOutcomes: [
          "إدارة العمليات الأمنية",
          "تحليل التهديدات",
          "الاستجابة للحوادث",
          "حماية البنية التحتية",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "عمليات سيبرانية - مراقبة تهديدات - حماية إلكترونية - استجابة حوادث - أمن مستمر",
        ],
      },
      {
        id: "cisco-professional",
        name: "Cisco Certified Professional",
        description: "الشبكات المتقدمة وأمن المعلومات",
        price: "120,000",
        duration: "180 دقيقة",
        level: "متقدم",
        prerequisites: [
          "شهادات Cisco السابقة",
          "خبرة في إدارة الشبكات",
          "معرفة متقدمة بالأمن",
        ],
        learningOutcomes: [
          "تصميم حلول الشبكات",
          "إدارة الأمن المتقدم",
          "تكوين الأنظمة المعقدة",
          "حل المشكلات المتقدمة",
        ],
        examDetails: {
          format: "اختبار عملي ونظري",
        },
        benefits: [
          "شهادات سيسكو - شبكات متقدمة - إدارة بنية تحتية - حلول تقنية - دعم محترف",
        ],
      },
      {
        id: "ccst",
        name: "CCST",
        description: "أساسيات شبكات Cisco",
        price: "120,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة أساسية بالشبكات",
          "فهم مبادئ Cisco",
          "خبرة في تقنية المعلومات",
        ],
        learningOutcomes: [
          "تكوين أجهزة Cisco",
          "إدارة الشبكات الأساسية",
          "حل المشكلات الشائعة",
          "تطبيق معايير الأمان",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "اختبار تحكم - أنظمة صناعية - صيانة أجهزة - معايير جودة - تشغيل آمن",
        ],
      },
    ],
  },
  {
    id: "languages",
    name: "اللغات",
    description: "شهادات معتمدة في اللغات والتواصل الدولي",
    exams: [
      {
        id: "toefl-ibt",
        name: "TOEFL IBT",
        description: "اختبار إجادة اللغة الإنجليزية للطلاب الأجانب - قسيمة فقط",
        price: "350,000",
        duration: "240 دقيقة",
        level: "متقدم",
        prerequisites: [
          "مستوى متقدم في اللغة الإنجليزية",
          "إعداد مسبق للاختبار",
          "فهم أقسام الاختبار الأربعة",
        ],
        learningOutcomes: [
          "إتقان مهارات الاستماع",
          "تطوير مهارات القراءة",
          "تحسين مهارات التحدث",
          "إجادة الكتابة الأكاديمية",
        ],
        examDetails: {
          format: "اختبار إلكتروني شامل",
        },
        benefits: [
          "شهادة معترف بها عالمياً - مطلوبة للدراسة في الخارج - تفتح آفاق التعليم العالي - معيار دولي لإجادة الإنجليزية",
        ],
      },
      {
        id: "toefl-itp",
        name: "TOEFL ITP Online",
        description: "اختبار إجادة اللغة الإنجليزية المؤسسي عبر الإنترنت",
        price: "225,000",
        duration: "180 دقيقة",
        level: "متوسط إلى متقدم",
        prerequisites: [
          "مستوى متوسط في اللغة الإنجليزية",
          "إعداد للاختبار",
          "معرفة بتقنيات الاختبار عبر الإنترنت",
        ],
        learningOutcomes: [
          "تقييم مهارات الاستماع",
          "تطوير مهارات القراءة",
          "تحسين القواعد النحوية",
          "فهم المفردات الأكاديمية",
        ],
        examDetails: {
          format: "اختبار إلكتروني عبر الإنترنت",
        },
        benefits: [
          "شهادة معتمدة دولياً - مرونة في التوقيت - تقييم سريع للمستوى - أقل تكلفة من TOEFL iBT",
        ],
      },
      {
        id: "business-english",
        name: "Business English",
        description: "اللغة الإنجليزية للأعمال",
        price: "120,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "مستوى متوسط في اللغة الإنجليزية",
          "فهم أساسيات الأعمال",
          "خبرة في بيئة العمل",
        ],
        learningOutcomes: [
          "التواصل المهني باللغة الإنجليزية",
          "كتابة المراسلات التجارية",
          "المصطلحات التجارية",
          "مهارات العرض والتقديم",
        ],
        examDetails: {
          format: "اختبار شفهي وتحريري",
        },
        benefits: [
          "لغة إنجليزية تجارية - تواصل مهني - مفردات أعمال - كتابة رسائل - اجتماعات فعالة",
        ],
      },
      {
        id: "it-english",
        name: "IT English",
        description: "اللغة الإنجليزية لتقنية المعلومات",
        price: "120,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "مستوى متوسط في اللغة الإنجليزية",
          "فهم أساسيات تقنية المعلومات",
          "خبرة في مجال التقنية",
        ],
        learningOutcomes: [
          "التواصل التقني باللغة الإنجليزية",
          "المصطلحات التقنية",
          "كتابة التقارير التقنية",
          "مهارات العرض التقني",
        ],
        examDetails: {
          format: "اختبار شفهي وتحريري",
        },
        benefits: [
          "مصطلحات تقنية - تواصل فني - دعم تقني - كتابة تقارير - مفردات برمجية",
        ],
      },
    ],
  },
  {
    id: "emerging-tech",
    name: "التقنيات الناشئة",
    description: "شهادات في أحدث التقنيات والتوجهات التكنولوجية",
    exams: [

      {
        id: "artificial-intelligence",
        name: "Artificial Intelligence",
        description: "أساسيات الذكاء الاصطناعي وتطبيقاته",
        price: "100,000",
        duration: "180 دقيقة",
        level: "متقدم",
        prerequisites: [
          "معرفة بالبرمجة",
          "فهم الرياضيات والإحصاء",
          "خبرة في تحليل البيانات",
        ],
        learningOutcomes: [
          "فهم نماذج الذكاء الاصطناعي",
          "تطبيق خوارزميات التعلم الآلي",
          "معالجة البيانات الضخمة",
          "تطوير حلول ذكية",
        ],
        examDetails: {
          format: "اختبار عملي ونظري",
        },
        benefits: [
          "تعلم آلي - تحليل بيانات - ذكاء صناعي - أتمتة ذكية - حلول تكنولوجية",
        ],
      },
      {
        id: "cloud-computing",
        name: "Cloud Computing",
        description: "الحوسبة السحابية وتطبيقاتها",
        price: "100,000",
        duration: "150 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بالشبكات",
          "فهم مفاهيم الخوادم",
          "خبرة في تقنية المعلومات",
        ],
        learningOutcomes: [
          "إدارة الخدمات السحابية",
          "نشر التطبيقات",
          "إدارة الموارد",
          "تأمين البيانات",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "حوسبة سحابية - تخزين بيانات - خدمات عبر الإنترنت - إدارة سحابية - تقنيات حديثة",
        ],
      },
      {
        id: "data-analysis",
        name: "Data Analysis",
        description: "تحليل البيانات واستخراج المعرفة",
        price: "110,000",
        duration: "150 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بالإحصاء",
          "فهم أدوات التحليل",
          "خبرة في معالجة البيانات",
        ],
        learningOutcomes: [
          "تحليل البيانات الكمية",
          "إنشاء التقارير التحليلية",
          "استخدام أدوات التحليل",
          "اتخاذ القرارات المدعومة بالبيانات",
        ],
        examDetails: {
          format: "اختبار عملي ونظري",
        },
        benefits: [
          "تحليل بيانات - إحصائيات - استخراج معلومات - صنع قرارات - أدوات تحليل",
        ],
      },
      {
        id: "databases",
        name: "Databases",
        description: "إدارة قواعد البيانات وتطبيقاتها",
        price: "110,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بقواعد البيانات",
          "فهم SQL",
          "خبرة في إدارة البيانات",
        ],
        learningOutcomes: [
          "تصميم قواعد البيانات",
          "إدارة البيانات",
          "تحسين الأداء",
          "ضمان أمن البيانات",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "إدارة قواعد بيانات - تصميم جداول - استعلامات SQL - تخزين معلومات - نظم تنظيمية",
        ],
      },
      {
        id: "device-configuration",
        name: "Device Configuration",
        description: "إعداد وتكوين الأجهزة والمعدات",
        price: "110,000",
        duration: "120 دقيقة",
        level: "متوسط",
        prerequisites: [
          "معرفة بالأجهزة",
          "فهم أنظمة التشغيل",
          "خبرة في الصيانة",
        ],
        learningOutcomes: [
          "تكوين الأجهزة",
          "إعداد الشبكات",
          "حل المشكلات",
          "صيانة المعدات",
        ],
        examDetails: {
          format: "اختبار عملي",
        },
        benefits: [
          "إعداد أجهزة - ضبط أنظمة - حلول تقنية - إدارة شبكات - صيانة أجهزة",
        ],
      },
      
      
    ],
  },
]; 
