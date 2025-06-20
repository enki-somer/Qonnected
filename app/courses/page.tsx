"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";
import CourseCard from "@/components/CourseCard";
import CourseSearch from "@/components/CourseSearch";
import { courses } from "@/data/courses";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
              <motion.div key={course.id} variants={item}>
                <CourseCard
                  course={course}
                  // onDetailsClick={() => router.push(`/courses/${course.id}`)}
                  // onRegisterClick={() => router.push(`/courses/${course.id}`)}
                />
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
