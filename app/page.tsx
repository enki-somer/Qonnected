import HeroSection from "@/components/HeroSection";
//import FeaturedCourses from "@/components/FeaturedCourses";
import UserPathwaySection from "@/components/UserPathwaySection";
import RollingGallery from "@/components/RollingGallery/RollingGallery";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-12">
        <HeroSection />

        {/* Certification Partners Gallery */}
        <div className="mt-8">
          <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6 text-white">
            شركاؤنا في التعليم والشهادات
          </h2>
          <RollingGallery />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-12">
        {/* <FeaturedCourses /> */}

        <UserPathwaySection />
      </div>
    </main>
  );
}
