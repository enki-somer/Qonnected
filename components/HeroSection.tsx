"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import dynamic from "next/dynamic";
import { Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import VisionSection from "./VisionSection";

// Dynamically import MobileHeroSection to avoid SSR issues
const MobileHeroSection = dynamic(
  () => import("./mobileView/MobileHeroSection"),
  {
    ssr: false,
  }
);

export default function HeroSection() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileHeroSection />;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark to-primary p-3 sm:p-6 md:p-8 lg:p-12">
      <div className="absolute inset-0 bg-grid-white/5" />
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-12">
        {/* Main Content - Right Side */}
        <div className="flex-1 text-center lg:text-right">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-accent mb-3 sm:mb-6 bg-accent/10 px-2 sm:px-3 py-1 rounded-full animate-float">
            <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 animate-pulse" />
            <span className="text-[10px] sm:text-sm font-medium">
              منصة تعليمية متكاملة مع شهادات معتمدة دولياً
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
            <span className="inline-block animate-slideFromRight">
              طور مستقبلك المهني
            </span>
            <span className="text-accent block mt-1 sm:mt-2 animate-slideFromLeft">
              بشهادات معتمدة عالمياً
            </span>
          </h1>

          {/* Description */}
          <p className="text-text-muted text-xs sm:text-base mb-4 sm:mb-8 max-w-2xl mx-auto lg:mr-0 animate-fadeIn">
            نقدم لك مجموعة متنوعة من الشهادات المعتمدة دولياً في مجالات
            التكنولوجيا واللغات والإدارة. ابدأ رحلتك نحو النجاح المهني اليوم.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4">
            <Link
              href="/certifications"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-primary px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <BookOpen className="w-4 h-4" />
              استكشف الاختبارات
            </Link>
            <Link
              href="/courses"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-medium transition-colors text-sm sm:text-base"
            >
              <span>عرض الدورات</span>
            </Link>
          </div>
        </div>

        {/* Vision Section - Left Side */}
        <div className="w-full lg:w-1/2 mt-6 sm:mt-0">
          <VisionSection />
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-primary-dark rounded-full blur-3xl animate-pulse-delay" />
    </div>
  );
}
