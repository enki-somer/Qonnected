import { Category } from "./categories";

export interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  lessons: number;
  category: string;
  image?: string;
  instructor?: string;
  students?: number;
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
  type: "video" | "quiz" | "project";
  videoId?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "أساسيات البرمجة بلغة Python",
    description: "تعلم أساسيات البرمجة باستخدام Python، اللغة الأكثر شعبية للمبتدئين.",
    duration: "6 ساعات",
    level: "beginner",
    lessons: 24,
    category: "programming",
    image: "/courses/python-basics.jpg",
    instructor: "أحمد محمد",
    students: 128,
    sections: [
      {
        id: 1,
        title: "مقدمة في Python",
        lessons: [
          {
            id: 1,
            title: "ما هو Python؟",
            duration: "5:25",
            type: "video",
            videoId: "Y8Tko2YC5hA",
            isCompleted: false,
          },
          {
            id: 2,
            title: "تثبيت Python",
            duration: "8:30",
            type: "video",
            videoId: "YYXdXT2l-Gg",
            isCompleted: false,
          },
          {
            id: 3,
            title: "المتغيرات والأنواع",
            duration: "12:15",
            type: "video",
            videoId: "cQT33yu9pY8",
            isCompleted: false,
          },
        ],
      },
      {
        id: 2,
        title: "الهياكل الأساسية",
        lessons: [
          {
            id: 4,
            title: "القوائم والمجموعات",
            duration: "15:20",
            type: "video",
            videoId: "W8KRzm-HUcc",
            isLocked: true,
          },
          {
            id: 5,
            title: "الحلقات التكرارية",
            duration: "18:45",
            type: "video",
            videoId: "6iF8Xb7Z3wQ",
            isLocked: true,
          },
          {
            id: 6,
            title: "اختبار: الهياكل الأساسية",
            duration: "10:00",
            type: "quiz",
            isLocked: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "تصميم واجهات المستخدم UI/UX",
    description: "تعلم أساسيات تصميم واجهات المستخدم وتجربة المستخدم باستخدام Figma.",
    duration: "8 ساعات",
    level: "intermediate",
    lessons: 32,
    category: "design",
    image: "/courses/ui-ux-design.jpg",
    instructor: "سارة أحمد",
    students: 96,
    sections: [
      {
        id: 1,
        title: "مقدمة في UI/UX",
        lessons: [
          {
            id: 1,
            title: "مبادئ التصميم",
            duration: "10:15",
            type: "video",
            videoId: "wX3PKE5TU0k",
            isCompleted: false,
          },
          {
            id: 2,
            title: "تعرف على Figma",
            duration: "15:30",
            type: "video",
            videoId: "FTFaQWZBqQ8",
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "تعلم Node.js",
    description: "ابدأ رحلتك في تطوير تطبيقات الويب باستخدام Node.js.",
    duration: "3 ساعات",
    level: "intermediate",
    lessons: 24,
    category: "web-development",
    instructor: "محمد علي",
    students: 64,
    sections: [],
  },
  {
    id: 4,
    title: "React.js للمبتدئين",
    description: "تعلم أساسيات React.js وبناء تطبيقات الويب التفاعلية.",
    duration: "5 ساعات",
    level: "beginner",
    lessons: 32,
    category: "web-development",
    instructor: "عمر خالد",
    students: 82,
    sections: [],
  },
  {
    id: 5,
    title: "التسويق الرقمي الشامل",
    description: "دورة شاملة في التسويق الرقمي تغطي وسائل التواصل الاجتماعي وتحسين محركات البحث.",
    duration: "10 ساعات",
    level: "beginner",
    lessons: 40,
    category: "marketing",
    image: "/courses/digital-marketing.jpg",
    instructor: "ليلى محمود",
    students: 156,
    sections: [],
  },
  {
    id: 6,
    title: "اللغة الإنجليزية للأعمال",
    description: "تعلم المهارات اللغوية الأساسية للتواصل في بيئة العمل الدولية.",
    duration: "12 ساعة",
    level: "intermediate",
    lessons: 48,
    category: "languages",
    image: "/courses/business-english.jpg",
    instructor: "نور الدين",
    students: 92,
    sections: [],
  },
  {
    id: 7,
    title: "إدارة المشاريع الاحترافية",
    description: "تعلم منهجيات إدارة المشاريع وأدوات التخطيط والتنفيذ.",
    duration: "8 ساعات",
    level: "advanced",
    lessons: 30,
    category: "business",
    image: "/courses/project-management.jpg",
    instructor: "طارق حسن",
    students: 74,
    sections: [],
  },
  {
    id: 8,
    title: "تطوير تطبيقات الويب المتقدمة",
    description: "بناء تطبيقات ويب حديثة باستخدام React و Next.js.",
    duration: "15 ساعة",
    level: "advanced",
    lessons: 60,
    category: "web-development",
    image: "/courses/web-development.jpg",
    instructor: "يوسف عادل",
    students: 108,
    sections: [],
  },
  {
    id: 9,
    title: "التصوير الاحترافي",
    description: "تعلم أساسيات التصوير الفوتوغرافي والتعديل باستخدام Adobe Lightroom.",
    duration: "6 ساعات",
    level: "beginner",
    lessons: 24,
    category: "photography",
    image: "/courses/photography.jpg",
    instructor: "رانيا كمال",
    students: 45,
    sections: [],
  },
  {
    id: 10,
    title: "الذكاء الاصطناعي للمبتدئين",
    description: "مقدمة في الذكاء الاصطناعي وتعلم الآلة باستخدام Python.",
    duration: "10 ساعات",
    level: "intermediate",
    lessons: 36,
    category: "ai",
    image: "/courses/ai-basics.jpg",
    instructor: "كريم فؤاد",
    students: 134,
    sections: [],
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