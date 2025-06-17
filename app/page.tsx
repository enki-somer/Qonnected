import HeroSection from "@/components/HeroSection";
import FeaturedCourses from "@/components/FeaturedCourses";
import UserPathwaySection from "@/components/UserPathwaySection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-12">
        <HeroSection />
        <UserPathwaySection />
        <FeaturedCourses />
      </div>
    </div>
  );
}
