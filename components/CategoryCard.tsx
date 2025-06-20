"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Award,
  ChevronRight,
  Languages,
  Cpu,
  Code,
  Palette,
  Globe,
  Briefcase,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { Category as CertificationCategory } from "@/types/certifications";
import { Category as CourseCategory } from "@/data/categories";
import { useRouter } from "next/navigation";

type CategoryCardProps = {
  category: CertificationCategory | CourseCategory;
  onClick: (id: string) => void;
};

// Get the logo path based on category ID (for course categories only)
const getCategoryLogo = (id: string): string => {
  switch (id) {
    case "programming":
      return "/images/Code.png"; // Programming icon
    case "web-development":
      return "/images/Web.png"; // Web development icon
    case "design":
      return "/images/Design.png"; // Design icon
    case "business":
      return "/images/Business.png"; // Business icon
    case "ai":
      return "/images/AI.png"; // AI icon
    case "marketing":
      return "/images/Marketing.png"; // Marketing icon
    case "languages":
      return "/images/Languages.png"; // Languages icon
    case "photography":
      return "/images/Photography.png"; // Photography icon
    default:
      return "/images/default-category.png"; // Fallback image
  }
};

const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case "language":
      return <Languages className="w-4 h-4" />;
    case "tech":
      return <Cpu className="w-4 h-4" />;
    case "microsoft":
      return <Code className="w-4 h-4" />;
    case "adobe":
      return <Palette className="w-4 h-4" />;
    case "csb":
      return <Globe className="w-4 h-4" />;
    case "autodesk":
      return <Briefcase className="w-4 h-4" />;
    case "esb":
      return <Briefcase className="w-4 h-4" />;
    case "apple":
      return <Code className="w-4 h-4" />;
    case "pmi":
      return <GraduationCap className="w-4 h-4" />;
    case "programming":
      return <Code className="w-4 h-4" />;
    case "web-development":
      return <Globe className="w-4 h-4" />;
    case "design":
      return <Palette className="w-4 h-4" />;
    case "business":
      return <Briefcase className="w-4 h-4" />;
    case "ai":
      return <Cpu className="w-4 h-4" />;
    case "marketing":
      return <Globe className="w-4 h-4" />;
    case "languages":
      return <Languages className="w-4 h-4" />;
    case "photography":
      return <Palette className="w-4 h-4" />;
    default:
      return <Award className="w-4 h-4" />;
  }
};

const getCategoryLabel = (categoryId: string) => {
  switch (categoryId) {
    case "language":
      return "لغات";
    case "tech":
      return "تقنية";
    case "microsoft":
      return "مايكروسوفت";
    case "adobe":
      return "تصميم";
    case "csb":
      return "لغات";
    case "autodesk":
      return "هندسة";
    case "esb":
      return "ريادة";
    case "apple":
      return "برمجة";
    case "pmi":
      return "إدارة";
    case "programming":
      return "برمجة";
    case "web-development":
      return "تطوير ويب";
    case "design":
      return "تصميم";
    case "business":
      return "أعمال";
    case "ai":
      return "ذكاء اصطناعي";
    case "marketing":
      return "تسويق";
    case "languages":
      return "لغات";
    case "photography":
      return "تصوير";
    default:
      return "عام";
  }
};

const isCertificationCategory = (
  category: CertificationCategory | CourseCategory
): category is CertificationCategory => {
  return "exams" in category;
};

// Get category cover SVG based on category ID
const getCategoryCover = (id: string): string => {
  switch (id) {
    case "development-programming":
      return `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#1a1f2e"/>
        <path d="M60 100L90 70M60 100L90 130M60 100L140 100" stroke="#3b82f6" stroke-width="8" stroke-linecap="round"/>
        <circle cx="100" cy="100" r="70" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4 4"/>
      </svg>`;

    case "creative-design":
      return `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#1a1f2e"/>
        <circle cx="100" cy="100" r="50" stroke="#f43f5e" stroke-width="4"/>
        <path d="M100 50C120 80 120 120 100 150" stroke="#f43f5e" stroke-width="4" stroke-linecap="round"/>
        <path d="M50 100C80 120 120 120 150 100" stroke="#f43f5e" stroke-width="4" stroke-linecap="round"/>
      </svg>`;

    case "engineering-architecture":
      return `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#1a1f2e"/>
        <path d="M50 150L100 50L150 150H50Z" stroke="#10b981" stroke-width="4"/>
        <path d="M75 150L100 100L125 150" stroke="#10b981" stroke-width="4"/>
        <line x1="50" y1="150" x2="150" y2="150" stroke="#10b981" stroke-width="8"/>
      </svg>`;

    case "emerging-tech":
      return `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#1a1f2e"/>
        <circle cx="100" cy="100" r="40" stroke="#192a56" stroke-width="4"/>
        <path d="M60 100C60 120 80 140 100 140" stroke="#8b5cf6" stroke-width="4"/>
        <path d="M100 60C120 60 140 80 140 100" stroke="#8b5cf6" stroke-width="4"/>
        <circle cx="100" cy="100" r="60" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="4 4"/>
      </svg>`;

    case "it-computer-science":
      return `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#1a1f2e"/>
        <rect x="50" y="70" width="100" height="60" rx="4" stroke="#6366f1" stroke-width="4"/>
        <line x1="70" y1="150" x2="130" y2="150" stroke="#6366f1" stroke-width="8" stroke-linecap="round"/>
        <circle cx="100" cy="100" r="10" stroke="#6366f1" stroke-width="4"/>
      </svg>`;

    case "business-office":
      return `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#1a1f2e"/>
        <rect x="60" y="60" width="80" height="100" rx="4" stroke="#ec4899" stroke-width="4"/>
        <path d="M80 90H120M80 110H120M80 130H120" stroke="#ec4899" stroke-width="4" stroke-linecap="round"/>
      </svg>`;

    default:
      return `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#1a1f2e"/>
        <circle cx="100" cy="100" r="50" stroke="#64748b" stroke-width="4"/>
      </svg>`;
  }
};

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  const router = useRouter();

  // Get the logo path based on category type
  const getLogoPath = (
    category: CertificationCategory | CourseCategory
  ): string => {
    if (isCertificationCategory(category)) {
      // Use PNG logos for certification categories
      switch (category.id) {
        case "microsoft":
          return "/images/Microsoft.png";
        case "adobe":
          return "/images/Adobe.png";
        case "autodesk":
          return "/images/Autodesk.png";
        case "apple":
          return "/images/apple-logo.png";
        case "swift":
          return "/images/swift.png";
        case "csb":
          return "/images/csb-logo.png";
        case "mos":
          return "/images/Microsoft.png";
        case "acp":
          return "/images/Adobe.png";
        case "acu":
          return "/images/Autodesk.png";
        case "esb":
          return "/images/ESB_logo-1.png";
        case "pmi":
          return "/images/pmi.png";
        default:
          return "/images/default-certification.png";
      }
    } else {
      // For course categories, use the existing getCategoryLogo function
      return getCategoryLogo(category.id);
    }
  };

  const logoPath = getLogoPath(category);

  // Get the category cover SVG for certification categories
  const coverSvg = getCategoryCover(category.id);

  const handleClick = () => {
    if (isCertificationCategory(category)) {
      onClick(category.id);
    } else {
      router.push(`/courses/category/${category.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      onClick={handleClick}
      className="cursor-pointer group"
    >
      <div className="relative h-full bg-[#1a1f2e] rounded-2xl border border-primary-light/10 hover:border-accent/30 transition-all duration-300 flex flex-col overflow-hidden">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/50 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Cover Section - Full Width */}
          <div className="relative w-full bg-gradient-to-br from-white/5 to-white/[0.02] pt-12 pb-8 px-8">
            {isCertificationCategory(category) ? (
              // SVG cover for certification categories
              <div
                className="relative w-full max-w-[180px] aspect-[1/1] mx-auto"
                dangerouslySetInnerHTML={{ __html: coverSvg }}
              />
            ) : (
              // Image cover for course categories
              <div className="relative w-full max-w-[180px] aspect-[3/2] mx-auto">
                <Image
                  src={logoPath}
                  alt={category.title}
                  fill
                  className="object-contain"
                  sizes="180px"
                  priority
                  onError={(e: any) => {
                    e.target.src = "/images/default-category.png";
                  }}
                />
              </div>
            )}
          </div>

          {/* Flex container for name and button */}
          <div className="px-6 pt-6 pb-6 flex-1 flex flex-col justify-between">
            {/* Category Name and Icon */}
            <div className="flex items-center justify-center gap-3">
              <Award className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-bold text-white text-center">
                {isCertificationCategory(category)
                  ? category.name
                  : category.title}
              </h3>
            </div>

            {/* Action Button */}
            <button className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-accent/20">
              <span className="text-sm">
                {isCertificationCategory(category)
                  ? "عرض الشهادات"
                  : "عرض الدورات"}
              </span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
