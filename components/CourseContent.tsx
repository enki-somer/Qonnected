"use client";

import { useState, useEffect } from "react";
import { Play, CheckCircle, Lock, ChevronDown, ChevronUp } from "lucide-react";
import VideoPlayer from "./VideoPlayer";

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  type: "video" | "quiz" | "project";
  videoId?: string;
}

export interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface CourseContentProps {
  sections: Section[];
  courseId: number;
}

const CourseContent = ({
  sections: initialSections,
  courseId,
}: CourseContentProps) => {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Load completion status from localStorage on mount and when initialSections change
  useEffect(() => {
    const completedLessons = JSON.parse(
      localStorage.getItem(`course_${courseId}_progress`) || "[]"
    );

    const updatedSections = initialSections.map((section) => ({
      ...section,
      lessons: section.lessons.map((lesson) => ({
        ...lesson,
        isCompleted: completedLessons.includes(lesson.id),
      })),
    }));
    setSections(updatedSections);
  }, [courseId, initialSections]);

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (!lesson.isLocked && lesson.type === "video") {
      setActiveLesson(lesson);
    }
  };

  const handleLessonComplete = () => {
    if (activeLesson) {
      // Update sections state with completed lesson
      const updatedSections = sections.map((section) => ({
        ...section,
        lessons: section.lessons.map((lesson) =>
          lesson.id === activeLesson.id
            ? { ...lesson, isCompleted: true }
            : lesson
        ),
      }));
      setSections(updatedSections);

      // Save to localStorage
      const completedLessons = JSON.parse(
        localStorage.getItem(`course_${courseId}_progress`) || "[]"
      );
      if (!completedLessons.includes(activeLesson.id)) {
        localStorage.setItem(
          `course_${courseId}_progress`,
          JSON.stringify([...completedLessons, activeLesson.id])
        );
      }
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {activeLesson && activeLesson.videoId && (
        <div className="mb-6">
          <VideoPlayer
            videoId={activeLesson.videoId}
            lessonId={activeLesson.id}
            courseId={courseId}
            onComplete={handleLessonComplete}
          />
          <h2 className="text-xl font-semibold mt-4">{activeLesson.title}</h2>
        </div>
      )}

      <div className="bg-primary-dark rounded-xl overflow-hidden">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border-b border-white/10 last:border-0"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-accent font-mono text-lg">
                  {String(section.id).padStart(2, "0")}
                </span>
                <h3 className="font-medium text-lg">{section.title}</h3>
              </div>
              {expandedSections.includes(section.id) ? (
                <ChevronUp className="w-5 h-5 text-text-muted" />
              ) : (
                <ChevronDown className="w-5 h-5 text-text-muted" />
              )}
            </button>

            {expandedSections.includes(section.id) && (
              <div className="border-t border-white/10">
                {section.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    className={`w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors ${
                      lesson.isLocked
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    } ${activeLesson?.id === lesson.id ? "bg-white/10" : ""}`}
                    onClick={() => handleLessonClick(lesson)}
                    disabled={lesson.isLocked}
                  >
                    <div className="w-6 h-6 flex-shrink-0">
                      {lesson.isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : lesson.isLocked ? (
                        <Lock className="w-6 h-6 text-text-muted" />
                      ) : (
                        <Play className="w-6 h-6 text-accent" />
                      )}
                    </div>
                    <div className="flex-grow text-right">
                      <h4 className="font-medium mb-1">{lesson.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-text-muted">
                        <span className="flex items-center gap-1">
                          {lesson.type === "video" && "فيديو"}
                          {lesson.type === "quiz" && "اختبار"}
                          {lesson.type === "project" && "مشروع"}
                        </span>
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  </button>
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
