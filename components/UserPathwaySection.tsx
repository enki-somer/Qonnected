"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import Link from "next/link";
import { courses, getCoursesByCategory } from "@/data/courses";
import { certificationCategories } from "@/data/certifications";

// User types
const userTypes = [
  {
    id: "student",
    title: "طالب / خريج",
    description: "أدرس حالياً في الجامعة أو المعهد",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "graduate",
    title: "تطوير مهارات",
    description: "أبحث عن فرص تطوير مهاراتي",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "trainer",
    title: "اعمل معنا ",
    description: "مدرب محترف في المجال",
    color: "from-purple-500/20 to-pink-500/20",
  },
];

// Majors
const majors = [
  {
    id: "information-tech",
    title: "تكنولوجيا المعلومات",
    courses: getCoursesByCategory("information-tech"),
    certifications: ["ccna", "ccst", "ic3"],
  },
  {
    id: "data-analysis",
    title: "تحليل البيانات",
    courses: getCoursesByCategory("data-analysis"),
    certifications: ["mos-excel", "pmi-beginner"],
  },
  {
    id: "computer-science",
    title: "علوم الحاسوب",
    courses: getCoursesByCategory("computer-science"),
    certifications: ["swift-level1", "java-cert"],
  },
  {
    id: "management",
    title: "الإدارة",
    courses: getCoursesByCategory("management"),
    certifications: ["pmi-beginner", "esb-certification"],
  },
  {
    id: "civil-engineering",
    title: "الهندسة المدنية",
    courses: getCoursesByCategory("civil-engineering"),
    certifications: ["autocad", "revit"],
  },
  {
    id: "architecture",
    title: "الهندسة المعمارية",
    courses: getCoursesByCategory("architecture"),
    certifications: ["autocad", "revit", "3ds-max"],
  },
  {
    id: "mechanical-engineering",
    title: "الهندسة الميكانيكية",
    courses: getCoursesByCategory("mechanical-engineering"),
    certifications: ["autocad", "inventor", "fusion-360"],
  },
  {
    id: "accounting",
    title: "المحاسبة",
    courses: getCoursesByCategory("accounting"),
    certifications: ["quickbooks", "mos-excel"],
  },
  {
    id: "languages",
    title: "اللغات",
    courses: getCoursesByCategory("languages"),
    certifications: ["csb-business"],
  },
];

export default function UserPathwaySection() {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [showMajorSelection, setShowMajorSelection] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleUserTypeSelect = (userTypeId: string) => {
    setSelectedUserType(userTypeId);
    setShowMajorSelection(true);
  };

  const handleMajorSelect = (majorId: string) => {
    setSelectedMajor(majorId);
    setShowMajorSelection(false);
    setShowResults(true);
  };

  const resetSelection = () => {
    setSelectedUserType(null);
    setSelectedMajor(null);
    setShowMajorSelection(false);
    setShowResults(false);
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

  const selectedMajorData = majors.find((m) => m.id === selectedMajor);
  const selectedUserTypeData = userTypes.find((t) => t.id === selectedUserType);
  const relevantCertifications = selectedMajor
    ? getRelevantCertifications(selectedMajor)
    : [];

  // Results view
  if (showResults && selectedMajorData && selectedUserTypeData) {
    return (
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
              بناءً على اختيارك كـ {selectedUserTypeData.title} في مجال{" "}
              {selectedMajorData.title}، إليك أفضل الدورات والشهادات المناسبة لك
            </p>
            <button
              onClick={resetSelection}
              className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
            >
              تغيير الاختيار
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Courses Section */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    الدورات المتاحة
                  </h3>
                  <p className="text-slate-400">ابدأ تعلم مهارات جديدة</p>
                </div>
              </div>

              {selectedMajorData.courses.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {selectedMajorData.courses
                    .slice(0, 3)
                    .map((course: any, idx: number) => (
                      <Link
                        key={idx}
                        href={`/courses/${course.id}`}
                        className="block bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-2 group-hover:text-accent transition-colors">
                              {course.title}
                            </h4>
                            <p className="text-slate-400 text-sm mb-3">
                              {course.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {course.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {course.lessons} درس
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {course.students || 0} طالب
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-sm">4.8</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent transition-colors" />
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📚</div>
                  <p className="text-slate-400 mb-4">
                    لا توجد دورات متخصصة حالياً في هذا المجال
                  </p>
                </div>
              )}

              <Link
                href={`/courses${selectedMajorData.courses.length > 0 ? `?category=${selectedMajor}` : ""}`}
                className="w-full bg-accent hover:bg-accent/90 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                {selectedMajorData.courses.length > 0
                  ? "استكشف جميع الدورات"
                  : "تصفح جميع الدورات"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Certifications Section */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-accent" />
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    الشهادات المعتمدة
                  </h3>
                  <p className="text-slate-400">عزز سيرتك الذاتية</p>
                </div>
              </div>

              {relevantCertifications.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {relevantCertifications
                    .slice(0, 3)
                    .map((cert: any, idx: number) => (
                      <Link
                        key={idx}
                        href={`/certifications?category=${cert.categoryId}&cert=${cert.id}`}
                        className="block bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-2 group-hover:text-accent transition-colors">
                              {cert.name}
                            </h4>
                            <p className="text-slate-400 text-sm mb-3">
                              {cert.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {cert.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                {cert.level}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="text-accent font-bold">
                              {cert.price}
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent transition-colors" />
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🏆</div>
                  <p className="text-slate-400 mb-4">
                    لا توجد شهادات متخصصة حالياً في هذا المجال
                  </p>
                </div>
              )}

              <Link
                href="/certifications"
                className="w-full bg-slate-700 hover:bg-slate-600 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                {relevantCertifications.length > 0
                  ? "استكشف جميع الشهادات"
                  : "تصفح جميع الشهادات"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            ما هو وضعك الحالي؟
          </h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            اختر الوصف الذي يناسبك لنقترح عليك أفضل المسارات التعليمية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {userTypes.map((type, index) => {
            return (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleUserTypeSelect(type.id)}
                className="group relative overflow-hidden rounded-2xl p-8 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-accent/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 text-center"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors">
                    {type.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed">
                    {type.description}
                  </p>

                  <div className="mt-6 flex items-center justify-center text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">اختر هذا الخيار</span>
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </div>
                </div>
              </motion.button>
            );
          })}
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
                    <p className="text-xs text-slate-400 mt-2">
                      {major.courses.length} دورة متاحة
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
