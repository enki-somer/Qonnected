"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import CourseSearch from "@/components/CourseSearch";
import { getCoursesByCategory } from "@/data/courses";
import {
  BookOpenIcon,
  ClockIcon,
  UserGroupIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

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
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="group bg-primary-dark rounded-xl p-6 hover:ring-2 hover:ring-accent transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative">
              <div className="mb-4">
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
          </Link>
        ))}
      </div>
    </div>
  );
}
