"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { courses, Course } from "@/data/courses";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CourseContent from "@/components/CourseContent";

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (params.courseId) {
      const selectedCourse = courses.find(
        (c) => c.id === parseInt(params.courseId as string)
      );
      if (selectedCourse) {
        setCourse(selectedCourse);
      }
    }
  }, [params.courseId]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">لم يتم العثور على الدورة</h1>
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
                src="/Qlogo.png"
                alt="QonnectED Logo"
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
        {/* Course Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6">
              {course.image && (
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  {course.title}
                </h1>
                <p className="text-xl text-slate-300">{course.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <CourseContent course={course} />
          </div>
        </div>
      </div>
    </div>
  );
}
