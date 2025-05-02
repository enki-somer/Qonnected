import { getCoursesCountByCategory } from "./courses";

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  courseCount: number;
}

export const categories: Category[] = [
  {
    id: "programming",
    title: "برمجة",
    description: "تعلم لغات البرمجة وتطوير البرمجيات",
    icon: "code",
    gradient: "from-blue-500/20 to-cyan-500/20",
    courseCount: getCoursesCountByCategory("programming")
  },
  {
    id: "web-development",
    title: "تطوير تطبيقات الويب",
    description: "تطوير تطبيقات الويب الحديثة والتفاعلية",
    icon: "globe",
    gradient: "from-purple-500/20 to-pink-500/20",
    courseCount: getCoursesCountByCategory("web-development")
  },
  {
    id: "design",
    title: "تصميم",
    description: "تصميم واجهات المستخدم والجرافيك",
    icon: "palette",
    gradient: "from-orange-500/20 to-red-500/20",
    courseCount: getCoursesCountByCategory("design")
  },
  {
    id: "business",
    title: "إدارة أعمال",
    description: "إدارة المشاريع والأعمال التجارية",
    icon: "briefcase",
    gradient: "from-green-500/20 to-emerald-500/20",
    courseCount: getCoursesCountByCategory("business")
  },
  {
    id: "ai",
    title: "ذكاء اصطناعي",
    description: "الذكاء الاصطناعي وتعلم الآلة",
    icon: "chip",
    gradient: "from-yellow-500/20 to-orange-500/20",
    courseCount: getCoursesCountByCategory("ai")
  },
  {
    id: "marketing",
    title: "تسويق",
    description: "التسويق الرقمي وإدارة وسائل التواصل الاجتماعي",
    icon: "shopping",
    gradient: "from-green-500/20 to-emerald-500/20",
    courseCount: getCoursesCountByCategory("marketing")
  },
  {
    id: "languages",
    title: "لغات",
    description: "تعلم اللغات الأجنبية للأعمال والتواصل",
    icon: "language",
    gradient: "from-yellow-500/20 to-orange-500/20",
    courseCount: getCoursesCountByCategory("languages")
  },
  {
    id: "photography",
    title: "تصوير",
    description: "التصوير الفوتوغرافي والتحرير الرقمي",
    icon: "camera",
    gradient: "from-indigo-500/20 to-purple-500/20",
    courseCount: getCoursesCountByCategory("photography")
  }
]; 