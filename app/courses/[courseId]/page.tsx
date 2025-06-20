"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import CourseContent from "@/components/CourseContent";
import { courses } from "@/data/courses";
import { notFound } from "next/navigation";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function CoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = Number(params.courseId);

  // Find course by ID instead of using array index
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-6"
      >
        <ArrowRightIcon className="w-5 h-5" />
        <span>العودة</span>
      </button>

      <div className="relative bg-gradient-to-br from-[#1a1f2e]/90 to-[#1a1f2e]/95 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden mb-8">
        {/* Animated Background Effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/5 to-accent/10 opacity-50" />
          <div className="absolute -inset-[500px] bg-primary/5 rotate-[-35deg] transform-gpu" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Course Badge */}
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="absolute -left-12 top-6"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-sm font-medium px-12 py-1.5 transform rotate-[-45deg] whitespace-nowrap shadow-lg">
              {course.level === "beginner" && "مبتدئ"}
              {course.level === "intermediate" && "متوسط"}
              {course.level === "advanced" && "متقدم"}
            </div>
          </motion.div>

          {/* Logo and Title */}
          <div className="flex items-center gap-8 mb-8">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
              <Image
                src={course.image || "/images/default-category.png"}
                alt={course.title}
                fill
                className="object-contain p-4"
                sizes="128px"
                priority
                onError={(e: any) => {
                  e.currentTarget.src = "/images/default-category.png";
                }}
              />
            </div>
            <div>
              <motion.h1
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {course.title}
              </motion.h1>
              <p className="text-text-muted text-lg">{course.description}</p>
            </div>
          </div>
        </div>
      </div>

      <CourseContent sections={course.sections} courseId={courseId} />
    </div>
  );
}
