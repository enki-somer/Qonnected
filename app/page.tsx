import HeroSection from "@/components/HeroSection";
//import FeaturedCourses from "@/components/FeaturedCourses";
import UserPathwaySection from "@/components/UserPathwaySection";
import dynamic from "next/dynamic";

// Dynamically import RollingGallery with loading fallback
const RollingGallery = dynamic(
  () => import("@/components/RollingGallery/RollingGallery"),
  {
    loading: () => (
      <div className="relative h-[300px] w-full overflow-hidden bg-gradient-to-b from-primary-dark/50 to-primary/50 rounded-2xl">
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-row gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white/60 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: false, // Disable server-side rendering for this component
  }
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-12">
        <HeroSection />

        {/* Certification Partners Gallery */}
        <div className="mt-8">
          <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent animate-pulse">
            الشهادات المعتمدة
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
