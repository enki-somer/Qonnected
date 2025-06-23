"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Course } from "@/data/courses";

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: "video" | "quiz" | "project" | "registration";
  description?: string;
}

export interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface CourseContentProps {
  course: Course;
}

const CourseContent = ({ course }: CourseContentProps) => {
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="bg-primary-dark rounded-xl overflow-hidden">
        {course.sections.map((section) => (
          <div
            key={section.id}
            className="border-b border-white/10 last:border-0"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
              <h3 className="font-medium text-lg">{section.title}</h3>
              {expandedSections.includes(section.id) ? (
                <ChevronUp className="w-5 h-5 text-text-muted" />
              ) : (
                <ChevronDown className="w-5 h-5 text-text-muted" />
              )}
            </button>

            {expandedSections.includes(section.id) && (
              <div className="border-t border-white/10">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-6 hover:bg-white/5 transition-colors"
                  >
                    {lesson.type === "registration" ? (
                      <div className="text-center mt-8 mb-4">
                        <button
                          className="relative overflow-hidden bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-black py-5 px-10 rounded-xl transition-all duration-300 text-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 w-full md:w-auto min-w-[240px] group"
                          onClick={() => console.log("Registration clicked")}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {lesson.title}
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </span>
                          <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                        </button>
                        <p className="text-text-muted mt-4 text-base">
                          {lesson.description}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="font-medium text-xl mb-4">
                          {lesson.title}
                        </h4>
                        <div className="text-text-muted whitespace-pre-line text-lg leading-relaxed">
                          {lesson.description}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
