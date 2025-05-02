"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";
import CourseSearch from "@/components/CourseSearch";
import {
  BookOpenIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const levels = [
  { id: "all", label: "جميع المستويات" },
  { id: "beginner", label: "مبتدئ" },
  { id: "intermediate", label: "متوسط" },
  { id: "advanced", label: "متقدم" },
];

const courses = [
  {
    id: 1,
    title: "أساسيات سطر الأوامر",
    description: "تعلم المهارات الأساسية للتعامل مع سطر الأوامر وأتمتة المهام.",
    duration: "44 دقيقة",
    level: "beginner",
    students: 128,
    lessons: 11,
    instructor: "أحمد محمد",
    category: "programming",
  },
  {
    id: 2,
    title: "تعلم Node.js",
    description: "ابدأ رحلتك في تطوير تطبيقات الويب باستخدام Node.js.",
    duration: "3 ساعات",
    level: "intermediate",
    students: 256,
    lessons: 24,
    instructor: "سارة أحمد",
    category: "web-development",
  },
  {
    id: 3,
    title: "React.js للمبتدئين",
    description: "تعلم أساسيات React.js وبناء تطبيقات الويب التفاعلية.",
    duration: "5 ساعات",
    level: "beginner",
    students: 512,
    lessons: 32,
    instructor: "محمد علي",
    category: "web-development",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCategories, setShowCategories] = useState(true);

  // Filter courses based on the current view
  const filteredCourses = courses.filter((course) => {
    // When showing categories, only show featured courses
    if (showCategories) {
      return false; // Don't show any courses when showing categories
    }

    // When searching, apply all filters
    const matchesSearch = searchQuery
      ? course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;

    return matchesSearch && matchesLevel && matchesCategory;
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowCategories(false);
    }
  };

  const handleClear = () => {
    setShowCategories(true);
    setSelectedLevel("all");
    setSelectedCategory("all");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">استكشف الدورات</h1>
        <p className="text-text-muted">
          اختر من بين مجموعة متنوعة من الدورات عالية الجودة
        </p>
      </div>

      <CourseSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => {
          setSelectedCategory(category);
          setShowCategories(false);
        }}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      {showCategories ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={item}
                className="group bg-primary-dark rounded-xl p-6 hover:ring-2 hover:ring-accent transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="mb-4">
                    <span className="inline-block text-sm bg-accent/10 text-accent px-3 py-1 rounded-full mb-3">
                      {
                        categories.find((cat) => cat.id === course.category)
                          ?.title
                      }
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
                      {levels.find((l) => l.id === course.level)?.label}
                    </span>
                    <span className="text-sm text-text-muted">
                      المدرب: {course.instructor}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-text-muted text-lg">
                لم يتم العثور على دورات تطابق بحثك
              </p>
              <button
                onClick={handleClear}
                className="mt-4 text-accent hover:text-accent/80 transition-colors"
              >
                العودة إلى التصنيفات
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
