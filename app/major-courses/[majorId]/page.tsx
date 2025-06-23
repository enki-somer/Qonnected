"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { courses, getCoursesByCategory } from "@/data/courses";
import { majors } from "@/data/majors";
import CourseCard from "@/components/CourseCard";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MajorCoursesPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();
  const [selectedMajor, setSelectedMajor] = useState<any>(null);
  const [majorCourses, setMajorCourses] = useState<any[]>([]);

  useEffect(() => {
    console.log("Params received:", params);
    console.log("Looking for major with ID:", params.majorId);
    console.log(
      "Available majors:",
      majors.map((m) => ({
        id: m.id,
        title: m.title,
        courseCategory: m.courseCategory,
      }))
    );

    if (params.majorId) {
      const major = majors.find((m) => m.id === params.majorId);
      console.log("Found major:", major);

      if (major) {
        setSelectedMajor(major);
        console.log("Major's course category:", major.courseCategory);

        // Get courses using the same method as defined in the major
        const relevantCourses = getCoursesByCategory(
          major.id === "data-analysis"
            ? "microsoft-mastery"
            : major.courseCategory
        );
        console.log("Filtered relevant courses:", relevantCourses);
        setMajorCourses(relevantCourses);
      } else {
        console.error("Major not found for ID:", params.majorId);
      }
    }
  }, [params.majorId]);

  const handleCourseClick = (courseId: number) => {
    console.log("Course clicked:", courseId);
    if (!isAuthenticated) {
      console.log("User not authenticated, redirecting to login");
      login();
      return;
    }
    console.log("Navigating to course:", `/courses/${courseId.toString()}`);
    router.push(`/courses/${courseId.toString()}`);
  };

  if (!selectedMajor) {
    console.log("No major selected, showing error state");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">لم يتم العثور على التخصص</h1>
          <button
            onClick={() => router.back()}
            className="text-accent hover:text-accent/80"
          >
            العودة للخلف
          </button>
        </div>
      </div>
    );
  }

  console.log("Rendering major courses page for:", selectedMajor.title);
  console.log("Number of courses to display:", majorCourses.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-primary-dark/95 to-primary-dark/75 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-white transition-colors duration-200"
            >
              <ArrowRight className="w-5 h-5" />
              <span>العودة للخلف</span>
            </button>
            <Link
              href="/"
              className="transform hover:scale-105 transition-transform duration-200"
            >
              <Image
                src="/images/qonnected-logo.png"
                alt="Qonnected Logo"
                width={120}
                height={35}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Content with padding for fixed header */}
      <div className="pt-20">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#4CAF50]/15 text-[#4CAF50] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              الدورات المتاحة
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              دورات {selectedMajor.title}
            </h1>
            <p className="text-xl text-slate-300">
              اكتشف الدورات التدريبية المتخصصة في مجال دراستك
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {majorCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={() => handleCourseClick(course.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
