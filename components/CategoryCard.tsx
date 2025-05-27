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
          return "/images/csb-logo.png"; // English for Business uses Microsoft logo
        case "mos":
          return "/images/Microsoft.png"; // Microsoft Office Specialist
        case "acp":
          return "/images/Adobe.png"; // Adobe Certified Professional
        case "acu":
          return "/images/Autodesk.png"; // Autodesk Certified User
        case "esb":
          return "/images/ESB_logo-1.png"; // Entrepreneurship certification
        case "pmi":
          return "/images/pmi.png"; // PMI certification

        default:
          return "/images/default-certification.png";
      }
    } else {
      // For course categories, use the existing getCategoryLogo function
      return getCategoryLogo(category.id);
    }
  };

  const logoPath = getLogoPath(category);

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
          {/* Logo Section - Full Width */}
          <div className="relative w-full bg-gradient-to-br from-white/5 to-white/[0.02] pt-12 pb-8 px-8 flex items-center justify-center">
            <div className="relative w-full max-w-[180px] aspect-[3/2]">
              <Image
                src={logoPath}
                alt={`${isCertificationCategory(category) ? category.name : category.title} logo`}
                fill
                className="object-contain"
                sizes="180px"
                priority
                onError={(e: any) => {
                  e.target.src = "/images/default-category.png";
                }}
              />
            </div>
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
