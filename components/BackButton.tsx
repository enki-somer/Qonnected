"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className = "" }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`md:hidden fixed top-4 left-4 z-40 p-2.5 rounded-xl bg-primary-light/20 backdrop-blur-[12px] hover:bg-primary-light/30 border border-primary-light/10 transition-all duration-300 ${className}`}
      aria-label="رجوع"
    >
      <ChevronRight className="w-6 h-6 text-text-muted hover:text-text transition-colors" />
    </button>
  );
};

export default BackButton;
