"use client";

import {
  BookOpenIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const courses = [
  {
    id: 1,
    title: "أساسيات سطر الأوامر",
    description: "تعلم المهارات الأساسية للتعامل مع سطر الأوامر وأتمتة المهام.",
    duration: "44 دقيقة",
    level: "مبتدئ",
    students: 128,
    lessons: 11,
    instructor: "أحمد محمد",
    category: "برمجة",
  },
  {
    id: 2,
    title: "تعلم Node.js",
    description: "ابدأ رحلتك في تطوير تطبيقات الويب باستخدام Node.js.",
    duration: "3 ساعات",
    level: "متوسط",
    students: 256,
    lessons: 24,
    instructor: "سارة أحمد",
    category: "تطوير تطبيقات الويب",
  },
  {
    id: 3,
    title: "React.js للمبتدئين",
    description: "تعلم أساسيات React.js وبناء تطبيقات الويب التفاعلية.",
    duration: "5 ساعات",
    level: "مبتدئ",
    students: 512,
    lessons: 32,
    instructor: "محمد علي",
    category: "تطوير تطبيقات الويب",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function CoursesPage() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <AcademicCapIcon className="w-8 h-8 text-accent" />
          <h1 className="text-4xl font-bold">الدورات التدريبية</h1>
        </div>
        <p className="text-text-muted text-xl">
          اكتشف مجموعة متنوعة من الدورات التدريبية في مجال البرمجة والتطوير
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {courses.map((course) => (
          <motion.div
            key={course.id}
            variants={item}
            className="group bg-primary-dark rounded-xl p-6 hover:ring-2 hover:ring-accent transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative">
              <div className="mb-4">
                <span className="inline-block text-sm bg-accent/10 text-accent px-3 py-1 rounded-full mb-3">
                  {course.category}
                </span>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {course.title}
                </h3>
                <p className="text-text-muted">{course.description}</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpenIcon className="w-4 h-4" />
                  <span>{course.lessons} درس</span>
                </div>
                <div className="flex items-center gap-1">
                  <UserGroupIcon className="w-4 h-4" />
                  <span>{course.students} طالب</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm bg-primary/50 text-text-muted px-3 py-1 rounded-full">
                  {course.level}
                </span>
                <span className="text-sm text-text-muted">
                  المدرب: {course.instructor}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
