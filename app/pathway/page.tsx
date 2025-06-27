"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
  GraduationCap,
  Star,
  Briefcase,
  ChevronRight,
  Users,
  Clock,
  Lightbulb,
  Trophy,
  Sparkles,
  Target,
  BarChart,
} from "lucide-react";
import { certificationCategories } from "@/data/certifications";
import CourseCard from "@/components/CourseCard";
import CertificationCard from "@/components/CertificationCard";
import CertificationModal from "@/components/CertificationModal";
import PreTestModal from "@/components/PreTestModal";
import PaymentFlow from "@/components/PaymentFlow";
import { majors } from "@/data/majors";
import { useAuth } from "@/hooks/useAuth";
import netlifyIdentity from "netlify-identity-widget";
import UserPathwaySection from "@/components/UserPathwaySection";
import CelebrationScene from "@/components/CelebrationScene";
import { motion, AnimatePresence } from "framer-motion";

function PathwayContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();
  const [selectedMajor, setSelectedMajor] = useState<any>(null);
  const [relevantCertifications, setRelevantCertifications] = useState<any[]>(
    []
  );
  const [selectedCertification, setSelectedCertification] = useState<any>(null);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showPreTestModal, setShowPreTestModal] = useState(false);
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [showMajorSelection, setShowMajorSelection] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pathNotFound, setPathNotFound] = useState(false);

  useEffect(() => {
    const majorId = searchParams.get("major");

    // Reset states on each navigation
    setIsLoading(true);
    setPathNotFound(false);
    setSelectedMajor(null);
    setRelevantCertifications([]);

    if (majorId && majorId.trim() !== "") {
      const major = majors.find((m) => m.id === majorId.trim());
      if (major) {
        setShowCelebration(true);
        setSelectedMajor(major);

        // Get relevant certifications
        const certs: any[] = [];
        major.certifications.forEach((certId) => {
          certificationCategories.forEach((category) => {
            const cert = category.exams.find((exam) => exam.id === certId);
            if (cert) {
              certs.push({
                ...cert,
                categoryId: category.id,
              });
            }
          });
        });
        setRelevantCertifications(certs);
        setIsLoading(false);
      } else {
        // Invalid major ID
        setPathNotFound(true);
        setIsLoading(false);
      }
    } else {
      // No major ID provided
      setPathNotFound(true);
      setIsLoading(false);
    }
  }, [searchParams]);

  const handleCertificationDetails = (certification: any) => {
    setSelectedCertification(certification);
    setShowCertificationModal(true);
  };

  const handlePreTest = (certification: any) => {
    if (!isAuthenticated) {
      login();
      return;
    }
    setSelectedCertification(certification);
    setShowPreTestModal(true);
  };

  const handleBookNow = (certification: any) => {
    if (!isAuthenticated) {
      login();
      return;
    }
    setSelectedCertification(certification);
    setShowPaymentFlow(true);
  };

  const handleClosePaymentFlow = () => {
    setShowPaymentFlow(false);
    setSelectedCertification(null);
  };

  const handleExploreCoursesClick = () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    router.push(`/major-courses/${selectedMajor.id}`);
  };

  const handleMajorSelect = (majorId: string) => {
    setShowMajorSelection(false);
    // Use replace to avoid navigation issues
    router.replace(`/pathway?major=${majorId}`);
  };

  const handleReturnToCards = () => {
    // Clear any existing state
    setShowMajorSelection(false);
    setSelectedMajor(null);
    setPathNotFound(false);
    setIsLoading(false);
    // Use replace instead of push to prevent back button from returning to the pathway page
    router.replace("/");
  };

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-lg text-white">جاري تحميل مسارك التعليمي...</p>
        </div>
      </div>
    );
  }

  // Show path not found error
  if (pathNotFound || !selectedMajor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
            <ArrowRight className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            لم يتم العثور على المسار
          </h1>
          <p className="text-slate-400 mb-8">
            يبدو أن المسار المطلوب غير متاح أو تم حذفه
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setShowMajorSelection(true)}
              className="w-full bg-accent hover:bg-accent/90 text-black font-medium py-3 px-6 rounded-xl transition-colors duration-300"
            >
              اختر تخصصك
            </button>
            <button
              onClick={handleReturnToCards}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300"
            >
              العودة إلى الصفحة الرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary">
      {/* Navigation Bar */}
      <div className="container mx-auto px-4 pt-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowMajorSelection(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-white transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5" />
            <span>تغيير التخصص</span>
          </button>
          <Link
            href="/"
            className="transform hover:scale-105 transition-transform duration-200"
          >
            <Image
              src="/Qlogo.png"
              alt="QonnectED Logo"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-slate-900/50 border-b border-white/10 mt-6">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/15 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green-500/20">
              <CheckCircle className="w-4 h-4" />
              مرحباً بك في مسارك التعليمي
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              مسارك في {selectedMajor.title}
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              {selectedMajor.description}
            </p>
            <div className="inline-flex items-center justify-center gap-2 bg-slate-800/50 px-6 py-3 rounded-xl">
              <Star className="w-5 h-5 text-accent" />
              <span className="text-lg text-slate-200">
                اختر مسارك التعليمي المفضل
              </span>
              <Star className="w-5 h-5 text-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Choices Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Certifications Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full hover:border-[#FFD700]/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-[#FFD700]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    الشهادات المعتمدة
                  </h2>
                  <p className="text-slate-400">عزز مؤهلاتك المهنية</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                    <Trophy className="w-6 h-6 text-[#FFD700] mb-2" />
                    <h3 className="text-white font-medium mb-1">
                      شهادات عالمية
                    </h3>
                    <p className="text-sm text-slate-400">
                      معتمدة من كبرى الشركات
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                    <Target className="w-6 h-6 text-[#FFD700] mb-2" />
                    <h3 className="text-white font-medium mb-1">
                      اختبارات تجريبية
                    </h3>
                    <p className="text-sm text-slate-400">
                      تحضير شامل للاختبار
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                    <BarChart className="w-6 h-6 text-[#FFD700] mb-2" />
                    <h3 className="text-white font-medium mb-1">
                      تقييم المستوى
                    </h3>
                    <p className="text-sm text-slate-400">
                      اختبارات تحديد المستوى
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                    <Sparkles className="w-6 h-6 text-[#FFD700] mb-2" />
                    <h3 className="text-white font-medium mb-1">دعم مستمر</h3>
                    <p className="text-sm text-slate-400">
                      توجيه وإرشاد متواصل
                    </p>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/20 hover:border-[#FFD700]/30 rounded-xl py-4 font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
                onClick={() =>
                  router.push(`/certifications/${selectedMajor.id}`)
                }
              >
                <span>استكشف الشهادات المتاحة</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Courses Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#4CAF50]/20 to-[#2196F3]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full hover:border-[#4CAF50]/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#4CAF50]/10 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-[#4CAF50]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    الدورات التدريبية
                  </h2>
                  <p className="text-slate-400">تعلم مهارات جديدة</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                    <GraduationCap className="w-6 h-6 text-[#4CAF50] mb-2" />
                    <h3 className="text-white font-medium mb-1">
                      مدربون محترفون
                    </h3>
                    <p className="text-sm text-slate-400">خبراء في مجالاتهم</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                    <Lightbulb className="w-6 h-6 text-[#4CAF50] mb-2" />
                    <h3 className="text-white font-medium mb-1">تطبيق عملي</h3>
                    <p className="text-sm text-slate-400">مشاريع واقعية</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                    <Clock className="w-6 h-6 text-[#4CAF50] mb-2" />
                    <h3 className="text-white font-medium mb-1">تعلم مرن</h3>
                    <p className="text-sm text-slate-400">في أي وقت ومكان</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                    <Users className="w-6 h-6 text-[#4CAF50] mb-2" />
                    <h3 className="text-white font-medium mb-1">تعلم تفاعلي</h3>
                    <p className="text-sm text-slate-400">مجتمع نشط للتعلم</p>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-[#4CAF50]/10 hover:bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/20 hover:border-[#4CAF50]/30 rounded-xl py-4 font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
                onClick={handleExploreCoursesClick}
              >
                <span>استكشف الدورات المتاحة</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      {showCertificationModal && selectedCertification && (
        <CertificationModal
          isOpen={showCertificationModal}
          onClose={() => setShowCertificationModal(false)}
          onBook={() => {
            if (!isAuthenticated) {
              setShowCertificationModal(false);
              login();
              return;
            }
            setShowCertificationModal(false);
            handleBookNow(selectedCertification);
          }}
          certification={selectedCertification}
        />
      )}

      {showPreTestModal && selectedCertification && (
        <PreTestModal
          isOpen={showPreTestModal}
          onClose={() => setShowPreTestModal(false)}
          onBook={() => {
            if (!isAuthenticated) {
              setShowPreTestModal(false);
              login();
              return;
            }
            setShowPreTestModal(false);
            handleBookNow(selectedCertification);
          }}
          certification={selectedCertification}
        />
      )}

      {showPaymentFlow && selectedCertification && (
        <PaymentFlow
          isOpen={showPaymentFlow}
          onClose={handleClosePaymentFlow}
          item={{
            name: selectedCertification.name,
            price: selectedCertification.price,
            type: "certification",
          }}
        />
      )}

      {/* Majors Selection Modal */}
      {showMajorSelection && (
        <div className="fixed inset-0 z-50">
          <UserPathwaySection
            onMajorSelect={handleMajorSelect}
            onClose={() => setShowMajorSelection(false)}
            onReturnToCards={handleReturnToCards}
            initialStep="major"
          />
        </div>
      )}
    </div>
  );
}

export default function PathwayPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PathwayContent />
    </Suspense>
  );
}
