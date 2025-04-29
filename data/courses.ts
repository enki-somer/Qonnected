import { Section } from "@/components/CourseContent";

interface Course {
  id: number;
  title: string;
  description: string;
  sections: Section[];
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

interface VideoLesson extends Lesson {
  videoId?: string;
}

export const courses: { [key: number]: Course } = {
  1: {
    id: 1,
    title: "أساسيات البرمجة بلغة Python",
    description: "تعلم أساسيات البرمجة باستخدام Python، اللغة الأكثر شعبية للمبتدئين.",
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
  2: {
    id: 2,
    title: "تصميم واجهات المستخدم UI/UX",
    description: "تعلم أساسيات تصميم واجهات المستخدم وتجربة المستخدم باستخدام Figma.",
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
  3: {
    id: 3,
    title: "تعلم Node.js",
    description: "تعلم كيفية بناء تطبيقات الخادم السريعة والفعالة باستخدام Node.js.",
    sections: [
      {
        id: 1,
        title: "مقدمة في Node.js",
        lessons: [
          {
            id: 1,
            title: "تعرف على Node.js",
            duration: "5:25",
            type: "video",
            videoId: "TlB_eWDSMt4",
            isCompleted: true,
          },
          {
            id: 2,
            title: "Wild Horizons مقدمة",
            duration: "4:30",
            type: "video",
            videoId: "ENrzD9HAZK4",
            isCompleted: true,
          },
          {
            id: 3,
            title: "ملف package.json",
            duration: "6:15",
            type: "video",
            videoId: "P3aKRdUyr0s",
            isCompleted: false,
          },
        ],
      },
      {
        id: 2,
        title: "أساسيات HTTP",
        lessons: [
          {
            id: 4,
            title: "وحدة HTTP",
            duration: "8:45",
            type: "video",
            videoId: "eesqK59rhGA",
            isCompleted: false,
          },
          {
            id: 5,
            title: "إنشاء الخادم",
            duration: "7:20",
            type: "video",
            videoId: "VShtPwEkDD0",
            isCompleted: false,
          },
          {
            id: 6,
            title: "مراجعة",
            duration: "4:10",
            type: "quiz",
            isCompleted: false,
          },
        ],
      },
      {
        id: 3,
        title: "التعامل مع الطلبات",
        lessons: [
          {
            id: 7,
            title: "دورة الطلب/الاستجابة",
            duration: "10:15",
            type: "video",
            videoId: "L72fhGm1tfE",
            isLocked: true,
          },
          {
            id: 8,
            title: "التوجيه وكائن الطلب",
            duration: "12:30",
            type: "video",
            videoId: "2ojkb44XObc",
            isLocked: true,
          },
          {
            id: 9,
            title: "مشروع: إنشاء API بسيط",
            duration: "25:00",
            type: "project",
            isLocked: true,
          },
        ],
      },
    ],
  },
}; 