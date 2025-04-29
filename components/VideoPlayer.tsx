"use client";

import { useEffect, useState } from "react";
import YouTube from "react-youtube";

interface VideoPlayerProps {
  videoId: string;
  lessonId: number;
  courseId: number;
  onComplete: () => void;
}

const VideoPlayer = ({
  videoId,
  lessonId,
  courseId,
  onComplete,
}: VideoPlayerProps) => {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Load completion status from localStorage
    const completedLessons = JSON.parse(
      localStorage.getItem(`course_${courseId}_progress`) || "[]"
    );
    setIsCompleted(completedLessons.includes(lessonId));
  }, [courseId, lessonId]);

  const handleVideoEnd = () => {
    // Save completion status to localStorage
    const completedLessons = JSON.parse(
      localStorage.getItem(`course_${courseId}_progress`) || "[]"
    );
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem(
        `course_${courseId}_progress`,
        JSON.stringify(completedLessons)
      );
      setIsCompleted(true);
      onComplete();
    }
  };

  return (
    <div className="aspect-video w-full bg-primary-dark rounded-xl overflow-hidden">
      <YouTube
        videoId={videoId}
        className="w-full h-full"
        opts={{
          height: "100%",
          width: "100%",
          playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
            hl: "ar",
          },
        }}
        onEnd={handleVideoEnd}
      />
    </div>
  );
};

export default VideoPlayer;
