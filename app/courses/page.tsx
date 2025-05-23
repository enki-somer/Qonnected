"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";
import CourseSearch from "@/components/CourseSearch";
import { courses } from "@/data/courses";
import {
  BookOpenIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

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
  const [showCategories, setShowCategories] = useState(true);

  // Filter categories based on search query
  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter courses based on search query only when in courses view
  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery("");
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
        onSearchChange={handleSearch}
        onClear={handleClear}
        showFilters={!showCategories}
        placeholder={
          showCategories ? "ابحث عن التصنيفات..." : "ابحث عن الدورات..."
        }
      />

      {showCategories ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <motion.div key={category.id} variants={item}>
                <CategoryCard
                  category={category}
                  onClick={() => setShowCategories(false)}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-text-muted">
              لم يتم العثور على تصنيفات تطابق بحثك
            </div>
          )}
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
                      {course.level === "beginner" && "مبتدئ"}
                      {course.level === "intermediate" && "متوسط"}
                      {course.level === "advanced" && "متقدم"}
                    </span>
                    <span className="text-sm text-text-muted">
                      المدرب: {course.instructor}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-text-muted">
              لم يتم العثور على دورات تطابق بحثك
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
