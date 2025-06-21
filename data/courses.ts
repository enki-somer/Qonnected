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
            description: "انضم إلى مستوى المحترفين اليوم"
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