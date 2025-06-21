import { useState } from "react";
import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { GlobeAltIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";

interface CourseSubmenuProps {
  isActive: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

const courseTypes = [
  {
    id: "online",
    title: "الدورات عبر الإنترنت",
    description: "دورات تدريبية متاحة للدراسة عبر الإنترنت",
    icon: GlobeAltIcon,
    href: "/courses",
    available: true,
  },
  {
    id: "offline",
    title: "الدورات الحضورية",
    description: "قريباً - دورات تدريبية في مراكزنا التعليمية",
    icon: BuildingOfficeIcon,
    href: "#",
    available: false,
  },
];

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
          {courseTypes.map((type) => (
            <Link
              key={type.id}
              href={type.href}
              onClick={(e) => {
                if (!type.available) {
                  e.preventDefault();
                } else {
                  onClose();
                }
              }}
              className={`flex items-center gap-3 px-4 py-2 hover:bg-primary/50 transition-colors group rounded-lg mr-2 ${
                !type.available ? "cursor-not-allowed opacity-60" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <type.icon className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white group-hover:text-accent transition-colors">
                  {type.title}
                </div>
                {/* <div className="text-xs text-text-muted">
                  {type.description}
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
