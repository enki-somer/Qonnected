"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import CourseCard from "@/components/CourseCard";
import CourseSearch from "@/components/CourseSearch";
import { getCoursesByCategory } from "@/data/courses";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const levels = [
  { id: "all", label: "جميع المستويات" },
  { id: "beginner", label: "مبتدئ" },
  { id: "intermediate", label: "متوسط" },
  { id: "advanced", label: "متقدم" },
];

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.categoryId as string;
  const category = categories.find((cat) => cat.id === categoryId);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const courses = getCoursesByCategory(categoryId);
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-6"
      >
        <ArrowRightIcon className="w-5 h-5" />
        <span>العودة</span>
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
        <p className="text-text-muted">{category.description}</p>
      </div>

      <CourseSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        showFilters={true}
        placeholder={`ابحث في دورات ${category.title}...`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CourseCard
              course={course}
              // onDetailsClick={() => router.push(`/courses/${course.id}`)}
              //onRegisterClick={() => router.push(`/courses/${course.id}`)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
