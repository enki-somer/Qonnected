"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
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
import { AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const majorId = searchParams.get("major");
    if (majorId) {
      const major = majors.find((m) => m.id === majorId);
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
      }
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

  const handleCourseAction = (course: any) => {
    if (!isAuthenticated) {
      login();
      return;
    }
    router.push(`/courses/${course.id}`);
  };

  const handleMajorSelect = (majorId: string) => {
    setShowMajorSelection(false);
    router.push(`/pathway?major=${majorId}`);
  };

  const handleReturnToCards = () => {
    // Clear any existing state
    setShowMajorSelection(false);
    setSelectedMajor(null);
    // Use replace instead of push to prevent back button from returning to the pathway page
    router.replace("/");
  };

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
  };

  if (!selectedMajor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">لم يتم العثور على المسار</h1>
          <div className="space-y-4">
            <button
              onClick={() => setShowMajorSelection(true)}
              className="text-accent hover:text-accent/80 block"
            >
              اختر تخصصك
            </button>
            <button
              onClick={handleReturnToCards}
              className="text-slate-400 hover:text-slate-300 block"
            >
              العودة إلى الاختيارات الرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary">
        {/* Navigation Bar */}
        <div className="container mx-auto px-4 pt-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMajorSelection(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-white transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
              <span>تغيير التخصص</span>
            </button>
            <button
              onClick={handleReturnToCards}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-colors duration-200"
            >
              <ArrowRight className="w-5 h-5" />
              <span>العودة إلى الاختيارات الرئيسية</span>
            </button>
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
              <div className="flex items-center justify-center gap-4">
                <Link
                  href={`/courses/category/${selectedMajor.courseCategory}`}
                  className="bg-accent hover:bg-accent/90 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  تصفح جميع الدورات
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link
                  href={`/certifications?category=${selectedMajor.certCategory}`}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  تصفح جميع الشهادات
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Courses Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-accent" />
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    الدورات الموصى بها
                  </h2>
                  <p className="text-slate-400">ابدأ تعلم مهارات جديدة</p>
                </div>
              </div>
              <Link
                href={`/courses/category/${selectedMajor.courseCategory}`}
                className="text-accent hover:text-accent/80 font-medium flex items-center gap-2"
              >
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedMajor.courses.slice(0, 3).map((course: any) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={!isAuthenticated ? login : undefined}
                />
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-accent" />
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    الشهادات المعتمدة
                  </h2>
                  <p className="text-slate-400">عزز سيرتك الذاتية</p>
                </div>
              </div>
              <Link
                href={`/certifications?category=${selectedMajor.certCategory}`}
                className="text-accent hover:text-accent/80 font-medium flex items-center gap-2"
              >
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relevantCertifications.slice(0, 3).map((cert: any) => (
                <CertificationCard
                  key={cert.id}
                  certification={cert}
                  onDetailsClick={() => handleCertificationDetails(cert)}
                  onPreTestClick={() => handlePreTest(cert)}
                  onBookClick={() => handleBookNow(cert)}
                />
              ))}
            </div>
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
    </>
  );
}

export default function PathwayPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PathwayContent />
    </Suspense>
  );
}
