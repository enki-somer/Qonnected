"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  X,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  Briefcase,
  UserCheck,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { majors } from "@/data/majors";
import { certificationCategories } from "@/data/certifications";
import CertificationCard from "./CertificationCard";
import CertificationModal from "./CertificationModal";
import PreTestModal from "./PreTestModal";
import PaymentFlow from "./PaymentFlow";

// User types
const userTypes = [
  {
    id: "student",
    title: "طالب / خريج",
    description: "أدرس حالياً في الجامعة أو المعهد",
    color: "from-blue-500/20 to-cyan-500/20",
    available: true,
  },
  {
    id: "graduate",
    title: "تطوير مهارات",
    description: "أبحث عن فرص تطوير مهاراتي",
    color: "from-green-500/20 to-emerald-500/20",
    available: true,
  },
  {
    id: "trainer",
    title: (
      <>
        إنظم الى <span className="text-2xl font-bold text-accent">Q</span>
        onnected
      </>
    ),
    //description: "قريباً - انضم إلينا كمدرب محترف",
    color: "from-purple-500/20 to-pink-500/20",
    available: false,
  },
];

interface UserPathwaySectionProps {
  onMajorSelect?: (majorId: string) => void;
  initialStep?: "user" | "major";
  onClose?: () => void;
  onReturnToCards?: () => void;
}

export default function UserPathwaySection({
  onMajorSelect,
  initialStep = "user",
  onClose,
  onReturnToCards,
}: UserPathwaySectionProps) {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [showMajorSelection, setShowMajorSelection] = useState(
    initialStep === "major"
  );
  const [showResults, setShowResults] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<any>(null);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showPreTestModal, setShowPreTestModal] = useState(false);
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset state when component mounts
  useEffect(() => {
    if (initialStep === "user") {
      setSelectedUserType(null);
      setSelectedMajor(null);
      setShowMajorSelection(false);
      setShowResults(false);
    }
  }, [initialStep]);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (onClose) {
          onClose();
        } else {
          setShowMajorSelection(false);
          setSelectedUserType(null);
        }
      }
    };

    if (showMajorSelection) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMajorSelection, onClose]);

  const handleUserTypeSelect = (userTypeId: string) => {
    setSelectedUserType(userTypeId);
    setShowMajorSelection(true);
  };

  const handleMajorSelect = (majorId: string) => {
    if (onMajorSelect) {
      onMajorSelect(majorId);
      return;
    }
    // Default behavior - navigate to the pathway page
    router.push(`/pathway?major=${majorId}`);
  };

  const handleCloseMajorSelection = () => {
    if (onClose) {
      onClose();
      return;
    }
    setShowMajorSelection(false);
    setSelectedUserType(null);
  };

  const getRelevantCertifications = (majorId: string) => {
    const major = majors.find((m) => m.id === majorId);
    if (!major) return [];

    const relevantCerts: any[] = [];
    major.certifications.forEach((certId) => {
      certificationCategories.forEach((category) => {
        const cert = category.exams.find((exam) => exam.id === certId);
        if (cert) {
          relevantCerts.push({
            ...cert,
            categoryId: category.id, // Add category ID for proper linking
          });
        }
      });
    });
    return relevantCerts;
  };

  const handleCertificationDetails = (certification: any) => {
    setSelectedCertification(certification);
    setShowCertificationModal(true);
  };

  const handleBookNow = (certification: any) => {
    setSelectedCertification(certification);
    setShowPaymentFlow(true);
  };

  const handleClosePaymentFlow = () => {
    setShowPaymentFlow(false);
    setSelectedCertification(null);
  };

  const selectedMajorData = majors.find((m) => m.id === selectedMajor);
  const selectedUserTypeData = userTypes.find((t) => t.id === selectedUserType);
  const relevantCertifications = selectedMajor
    ? getRelevantCertifications(selectedMajor)
    : [];

  const ChangeSpecializationButton = () => {
    if (isMobile) {
      return (
        <button
          onClick={() => setShowResults(false)}
          className="inline-flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium border border-accent/20 transition-all duration-300 hover:scale-105"
        >
          <RefreshCw className="w-4 h-4" />
          تغيير التخصص
        </button>
      );
    }

    return (
      <button
        onClick={() => setShowResults(false)}
        className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
      >
        تغيير التخصص
      </button>
    );
  };

  // If we're showing the major selection directly, render only that
  if (initialStep === "major") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto relative"
        >
          {/* Navigation Bar */}
          <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-6">
            {/* Return to cards button on the left (Arabic perspective) */}
            {onReturnToCards && (
              <button
                onClick={onReturnToCards}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-black font-medium transition-colors duration-200"
              >
                <ArrowRight className="w-5 h-5" />
                <span>العودة للرئيسية</span>
              </button>
            )}

            {/* Close button on the right (Arabic perspective) */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors duration-200"
            >
              <X className="w-5 h-5" />
              <span>إغلاق</span>
            </button>
          </div>

          {/* Content */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                ما هو تخصصك أو مجال اهتمامك؟
              </h3>
              <p className="text-slate-400">اختر المجال الذي تريد التطور فيه</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {majors.map((major) => (
                <motion.button
                  key={major.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMajorSelect(major.id)}
                  className="p-6 rounded-xl bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-accent/50 transition-all duration-300 text-center group"
                >
                  <h4 className="text-white font-semibold text-sm group-hover:text-accent transition-colors">
                    {major.title}
                  </h4>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Regular view with user type selection
  return (
    <section className="py-20 relative overflow-hidden bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            اختر مسارك التعليمي
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            حدد اختصاصك للحصول على توصيات مخصصة لمسارك التعليمي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {userTypes.map((type) => (
            <motion.button
              key={type.id}
              onClick={() => type.available && handleUserTypeSelect(type.id)}
              className={`relative p-6 rounded-2xl text-right transition-all duration-300 border border-white/10 bg-gradient-to-br ${
                type.color
              } hover:border-accent/50 group ${
                !type.available
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer hover:scale-[1.02]"
              }`}
              whileHover={type.available ? { scale: 1.02 } : {}}
              whileTap={type.available ? { scale: 0.98 } : {}}
            >
              <div className="mb-4">
                {type.id === "student" && (
                  <GraduationCap className="w-8 h-8 text-white/80" />
                )}
                {type.id === "graduate" && (
                  <Star className="w-8 h-8 text-white/80" />
                )}
                {type.id === "trainer" && (
                  <Briefcase className="w-8 h-8 text-white/80" />
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {type.title}
              </h3>
              <p className="text-sm text-white/60">{type.description}</p>
              {!type.available && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl backdrop-blur-sm">
                  {/* <span className="text-white/80 font-medium">قريباً</span>*/}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Major Selection Overlay */}
      <AnimatePresence>
        {showMajorSelection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    ما هو تخصصك أو مجال اهتمامك؟
                  </h3>
                  <p className="text-slate-400">
                    اختر المجال الذي تريد التطور فيه
                  </p>
                </div>
                <button
                  onClick={() => setShowMajorSelection(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {majors.map((major) => (
                  <motion.button
                    key={major.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMajorSelect(major.id)}
                    className="p-6 rounded-xl bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-accent/50 transition-all duration-300 text-center group"
                  >
                    <h4 className="text-white font-semibold text-sm group-hover:text-accent transition-colors">
                      {major.title}
                    </h4>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results view */}
      {showResults && selectedMajorData && selectedUserTypeData && (
        <section className="py-20 relative overflow-hidden bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-500/15 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green-500/20">
                <CheckCircle className="w-4 h-4" />
                تم إنشاء مسارك التعليمي
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                مسارك في {selectedMajorData.title}
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-6">
                {selectedMajorData.description}
              </p>
              <ChangeSpecializationButton />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Courses Section */}
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-8 h-8 text-accent" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      الدورات المتاحة
                    </h3>
                    <p className="text-slate-400">ابدأ تعلم مهارات جديدة</p>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <p className="text-slate-300">
                    اكتشف مجموعة متنوعة من الدورات المصممة خصيصاً لمجال{" "}
                    {selectedMajorData.title}. دوراتنا:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        مصممة وفقاً لأحدث المعايير العالمية
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        تجمع بين النظرية والتطبيق العملي
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        يقدمها خبراء متخصصون في المجال
                      </span>
                    </li>
                  </ul>
                </div>

                <Link
                  href={`/courses/category/${selectedMajorData.courseCategory}`}
                  className="w-full bg-accent hover:bg-accent/90 text-black text-center py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  استكشف الدورات المتخصصة
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Certifications Section */}
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-8 h-8 text-accent" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      اختبارات معتمدة
                    </h3>
                    <p className="text-slate-400">عزز سيرتك الذاتية</p>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <p className="text-slate-300">
                    احصل على شهادات معتمدة عالمياً في مجال{" "}
                    {selectedMajorData.title}. شهاداتنا:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        معترف بها من كبرى الشركات العالمية
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        تزيد من فرصك في سوق العمل
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        تثبت كفاءتك في مجال تخصصك
                      </span>
                    </li>
                  </ul>
                </div>

                <Link
                  href={`/certifications?category=${selectedMajorData.certCategory}`}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  استكشف الاختبارات المتخصصة
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Certification Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relevantCertifications.map((cert: any) => (
                <CertificationCard
                  key={cert.id}
                  certification={cert}
                  onDetailsClick={() => handleCertificationDetails(cert)}
                  onBookClick={() => handleBookNow(cert)}
                />
              ))}
            </div>
          </div>

          {/* Modals */}
          {showCertificationModal && selectedCertification && (
            <CertificationModal
              isOpen={showCertificationModal}
              onClose={() => setShowCertificationModal(false)}
              onBook={() => {
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
                id: selectedCertification.id,
                name: selectedCertification.name,
                price: selectedCertification.price,
                type: "certification",
              }}
            />
          )}
        </section>
      )}
    </section>
  );
}
