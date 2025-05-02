"use client";

import { useParams } from "next/navigation";
import CourseContent from "@/components/CourseContent";
import { courses } from "@/data/courses";
import { notFound } from "next/navigation";

export default function CoursePage() {
  const params = useParams();
  const courseId = Number(params.courseId);

  // Find course by ID instead of using array index
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-text-muted">{course.description}</p>
      </div>
      <CourseContent sections={course.sections} courseId={courseId} />
    </div>
  );
}
