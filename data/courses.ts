import { Category } from "./categories";

export interface Course {
  id: number;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  image?: string;
  sections: Section[];
}

export interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: "project" | "registration";
  description?: string;
}

export const courses: Course[] = [
  // Microsoft Office Courses
  {
    id: 11,
    title: "Excel للمبتدئين",
    description: "تعلم أساسيات Microsoft Excel وإدارة البيانات بكفاءة. دورة شاملة للمبتدئين تغطي المفاهيم الأساسية وأدوات التنظيم.",
    level: "beginner",
    category: "microsoft-mastery",
    image: "/images/excell.png",
    sections: [
      {
        id: 1,
        title: "محتوى الدورة",
        lessons: [
          {
            id: 1,
            title: "نظرة عامة على الدورة",
            duration: "محتوى الدورة",
            type: "project",
            description: "• واجهة Excel وأساسيات التنقل\n• إدخال وتنسيق البيانات\n• الصيغ والدوال الأساسية"
          },
          {
            id: 2,
            title: "سجل الآن",
            duration: "زر التسجيل",
            type: "registration",
            description: "ابدأ رحلتك في تعلم Excel الآن"
          }
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Excel المتوسط",
    description: "ارتقِ بمهاراتك في Excel إلى المستوى المتوسط. تعلم التحليل المتقدم وإدارة البيانات باحترافية.",
    level: "intermediate",
    category: "microsoft-mastery",
    image: "/images/excell.png",
    sections: [
      {
        id: 1,
        title: "محتوى الدورة",
        lessons: [
          {
            id: 1,
            title: "نظرة عامة على الدورة",
            duration: "محتوى الدورة",
            type: "project",
            description: "• الدوال المتقدمة والشرطية\n• جداول وتخطيطات PivotTable\n• تحليل وتصفية البيانات"
          },
          {
            id: 2,
            title: "سجل الآن",
            duration: "زر التسجيل",
            type: "registration",
            description: "طور مهاراتك في Excel اليوم"
          }
        ]
      }
    ]
  },
  {
    id: 13,
    title: "Excel للمحترفين",
    description: "أتقن المهارات الاحترافية في Excel وتعلم البرمجة بلغة VBA. دورة متقدمة للمحترفين.",
    level: "advanced",
    category: "microsoft-mastery",
    image: "/images/excell.png",
    sections: [
      {
        id: 1,
        title: "محتوى الدورة",
        lessons: [
          {
            id: 1,
            title: "نظرة عامة على الدورة",
            duration: "محتوى الدورة",
            type: "project",
            description: "• برمجة VBA والماكرو\n• النمذجة المالية المتقدمة\n• أتمتة المهام والتقارير"
          },
          {
            id: 2,
            title: "سجل الآن",
            duration: "زر التسجيل",
            type: "registration",
            description: "طور مهاراتك في Excel اليوم"
          }
        ]
      }
    ]
  },
  
  // Programming Courses
  {
    id: 20,
    title: "Python للمبتدئين",
    description: "تعلم أساسيات برمجة Python من الصفر. دورة شاملة تغطي المفاهيم الأساسية والتطبيقات العملية.",
    level: "beginner",
    category: "programming",
    image: "/images/Python.jpg",
    sections: [
      {
        id: 1,
        title: "محتوى الدورة",
        lessons: [
          {
            id: 1,
            title: "مقدمة في Python",
            duration: "محتوى الدورة",
            type: "project",
            description: "• أساسيات Python\n• المتغيرات والعمليات\n• الهياكل البرمجية الأساسية"
          },
          {
            id: 2,
            title: "سجل الآن",
            duration: "زر التسجيل",
            type: "registration"
          }
        ]
      }
    ]
  },
  // Web Development Courses
  {
    id: 30,
    title: "تطوير الويب الأساسي",
    description: "تعلم أساسيات تطوير مواقع الويب باستخدام HTML و CSS و JavaScript.",
    level: "beginner",
    category: "web-development",
    image: "/images/Web.png",
    sections: [
      {
        id: 1,
        title: "محتوى الدورة",
        lessons: [
          {
            id: 1,
            title: "HTML و CSS",
            duration: "محتوى الدورة",
            type: "project",
            description: "• هيكل الصفحة\n• التنسيق والتصميم\n• التجاوب مع الشاشات المختلفة"
          },
          {
            id: 2,
            title: "سجل الآن",
            duration: "زر التسجيل",
            type: "registration"
          }
        ]
      }
    ]
  },
  // Design Courses
  {
    id: 40,
    title: "تصميم جرافيك احترافي",
    description: "تعلم أساسيات التصميم الجرافيكي باستخدام Adobe Photoshop و Illustrator.",
    level: "beginner",
    category: "design",
    image: "/images/Design.png",
    sections: [
      {
        id: 1,
        title: "محتوى الدورة",
        lessons: [
          {
            id: 1,
            title: "أساسيات التصميم",
            duration: "محتوى الدورة",
            type: "project",
            description: "• مبادئ التصميم\n• العمل مع الطبقات\n• تصميم الشعارات والهويات"
          },
          {
            id: 2,
            title: "سجل الآن",
            duration: "زر التسجيل",
            type: "registration"
          }
        ]
      }
    ]
  },
  // Business Courses
  {
    id: 50,
    title: "إدارة المشاريع الاحترافية",
    description: "تعلم أساسيات إدارة المشاريع وتطبيق المنهجيات الحديثة في إدارة الأعمال.",
    level: "intermediate",
    category: "business",
    image: "/images/pmi.png",
    sections: [
      {
        id: 1,
        title: "محتوى الدورة",
        lessons: [
          {
            id: 1,
            title: "أساسيات إدارة المشاريع",
            duration: "محتوى الدورة",
            type: "project",
            description: "• تخطيط المشاريع\n• إدارة الموارد\n• تتبع التقدم وإعداد التقارير"
          },
          {
            id: 2,
            title: "سجل الآن",
            duration: "زر التسجيل",
            type: "registration"
          }
        ]
      }
    ]
  },
  // AI Courses
  {
    id: 60,
    title: "مقدمة في الذكاء الاصطناعي",
    description: "تعلم أساسيات الذكاء الاصطناعي وتطبيقاته في حل المشكلات المعقدة.",
    level: "intermediate",
    category: "ai",
    image: "/images/cyper.png",
    sections: [
      {
        id: 1,
        title: "محتوى الدورة",
        lessons: [
          {
            id: 1,
            title: "أساسيات الذكاء الاصطناعي",
            duration: "محتوى الدورة",
            type: "project",
            description: "• مفاهيم الذكاء الاصطناعي\n• خوارزميات التعلم الآلي\n• تطبيقات عملية"
          },
          {
            id: 2,
            title: "سجل الآن",
            duration: "زر التسجيل",
            type: "registration"
          }
        ]
      }
    ]
  },
  // Marketing Courses
  {
    id: 70,
    title: "التسويق الرقمي الشامل",
    description: "تعلم استراتيجيات التسويق الرقمي وإدارة الحملات الإعلانية عبر الإنترنت.",
    level: "beginner",
    category: "marketing",
    image: "/images/Marketing.png",
    sections: [
      {
        id: 1,
        title: "محتوى الدورة",
        lessons: [
          {
            id: 1,
            title: "أساسيات التسويق الرقمي",
            duration: "محتوى الدورة",
            type: "project",
            description: "• استراتيجيات التسويق\n• إدارة وسائل التواصل\n• تحليل البيانات والأداء"
          },
          {
            id: 2,
            title: "سجل الآن",
            duration: "زر التسجيل",
            type: "registration"
          }
        ]
      }
    ]
  },
  // Languages Courses
  {
    id: 80,
    title: "اللغة الإنجليزية للأعمال",
    description: "تعلم اللغة الإنجليزية المتخصصة في مجال الأعمال والتواصل المهني.",
    level: "intermediate",
    category: "languages",
    image: "/images/Languages.png",
    sections: [
      {
        id: 1,
        title: "محتوى الدورة",
        lessons: [
          {
            id: 1,
            title: "مهارات التواصل المهني",
            duration: "محتوى الدورة",
            type: "project",
            description: "• المراسلات التجارية\n• المحادثات المهنية\n• كتابة التقارير"
          },
          {
            id: 2,
            title: "سجل الآن",
            duration: "زر التسجيل",
            type: "registration"
          }
        ]
      }
    ]
  },
  // Photography Courses
  {
    id: 90,
    title: "التصوير الاحترافي",
    description: "تعلم أساسيات التصوير الفوتوغرافي وتقنيات التحرير الرقمي.",
    level: "beginner",
    category: "photography",
    image: "/images/Photography.png",
    sections: [
      {
        id: 1,
        title: "محتوى الدورة",
        lessons: [
          {
            id: 1,
            title: "أساسيات التصوير",
            duration: "محتوى الدورة",
            type: "project",
            description: "• مبادئ التصوير\n• الإضاءة والتكوين\n• معالجة الصور"
          },
          {
            id: 2,
            title: "سجل الآن",
            duration: "زر التسجيل",
            type: "registration"
          }
        ]
      }
    ]
  }
];

// Helper function to get actual course count by category
export function getCoursesCountByCategory(categoryId: string): number {
  return courses.filter(course => course.category === categoryId).length;
}

// Helper function to get courses by category
export function getCoursesByCategory(categoryId: string): Course[] {
  return courses.filter(course => course.category === categoryId);
} 