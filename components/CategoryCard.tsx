import { Category } from "@/data/categories";
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
import Link from "next/link";

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

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  const Icon = iconMap[category.icon as keyof typeof iconMap] || GlobeAltIcon; // Fallback to GlobeAltIcon if icon not found

  return (
    <Link
      href={`/courses/category/${category.id}`}
      onClick={onClick}
      className="block group bg-primary-dark rounded-xl p-6 hover:ring-2 hover:ring-accent transition-all relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-primary-dark/5 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
          <Icon className="h-6 w-6 text-white" />
        </div>

        <h3 className="mb-2 text-xl font-semibold text-white group-hover:text-accent transition-colors">
          {category.title}
        </h3>

        <p className="mb-4 text-sm text-white/80">{category.description}</p>

        <div className="flex items-center justify-between text-sm text-white/60">
          <span>{category.courseCount} دورة</span>
          <span className="group-hover:translate-x-1 transition-transform">
            ←
          </span>
        </div>
      </div>
    </Link>
  );
}
