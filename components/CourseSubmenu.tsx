import { useState } from "react";
import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { categories } from "@/data/categories";
import {
  CodeBracketIcon,
  GlobeAltIcon,
  PaintBrushIcon,
  BriefcaseIcon,
  CpuChipIcon,
  CameraIcon,
  ShoppingBagIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  code: CodeBracketIcon,
  globe: GlobeAltIcon,
  palette: PaintBrushIcon,
  briefcase: BriefcaseIcon,
  chip: CpuChipIcon,
  camera: CameraIcon,
  shopping: ShoppingBagIcon,
  language: LanguageIcon,
};

interface CourseSubmenuProps {
  isActive: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export default function CourseSubmenu({
  isActive,
  onClose,
  isMobile,
}: CourseSubmenuProps) {
  const [isExpanded, setIsExpanded] = useState(isActive);

  const handleMainClick = (e: React.MouseEvent) => {
    if (isMobile) {
      // For mobile, prevent navigation if already on courses page
      if (isActive) {
        e.preventDefault();
      }
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Link
        href="/courses"
        onClick={handleMainClick}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
          isActive
            ? "bg-accent text-primary font-medium"
            : "text-text-muted hover:text-text hover:bg-primary/50"
        }`}
      >
        <BookOpenIcon className="w-5 h-5" />
        <span>الدورات</span>
      </Link>

      {/* Submenu Tree */}
      {isExpanded && (
        <div className="mr-4 mt-1 border-r-2 border-white/10">
          {categories.map((category) => {
            const Icon =
              iconMap[category.icon as keyof typeof iconMap] || GlobeAltIcon;
            return (
              <Link
                key={category.id}
                href={`/courses/category/${category.id}`}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-2 hover:bg-primary/50 transition-colors group rounded-lg mr-2"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <Icon className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white group-hover:text-accent transition-colors">
                    {category.title}
                  </div>
                  <div className="text-xs text-text-muted">
                    {category.courseCount} دورة
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
