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
    id: "computer-science",
    title: "علوم الحاسوب",
    description:
      "تخصص يركز على أساسيات علوم الحاسوب، البرمجة، وتطوير البرمجيات. يشمل المسار دورات في لغات البرمجة المختلفة وشهادات احترافية معتمدة في مجال تطوير البرمجيات.",
    courseCategory: "programming",
    certCategory: "development-programming",
    courses: getCoursesByCategory("programming"),
    certifications: [
      "python",
      "java",
      "software-development",
      "swift-development",
      "javascript",
    ],
  },
  {
    id: "information-tech",
    title: "تكنولوجيا المعلومات",
    description:
      "مسار شامل في تكنولوجيا المعلومات يغطي الشبكات، أمن المعلومات، وإدارة الأنظمة. يتضمن شهادات عالمية معترف بها في مجال تقنية المعلومات.",
    courseCategory: "web-development",
    certCategory: "development-programming",
    courses: getCoursesByCategory("web-development"),
    certifications: ["ccna", "ccst", "ic3", "html-css", "html5"],
  },
  {
    id: "data-analysis",
    title: "تحليل البيانات",
    description:
      "تخصص يركز على تحليل البيانات واستخراج المعلومات القيمة منها. يشمل دورات في الإحصاء، تحليل البيانات، وأدوات التحليل المتقدمة.",
    courseCategory: "microsoft-mastery",
    certCategory: "development-programming",
    courses: getCoursesByCategory("microsoft-mastery"),
    certifications: ["mos-excel", "data-analysis", "python"],
  },
  {
    id: "management",
    title: "الإدارة",
    description:
      "مسار متكامل في الإدارة يغطي إدارة الأعمال، المشاريع، والموارد البشرية. يتضمن شهادات احترافية في الإدارة وبرامج Microsoft Office.",
    courseCategory: "business",
    certCategory: "development-programming",
    courses: getCoursesByCategory("business"),
    certifications: [
      "pmi-beginner",
      "esb-certification",
      "mos-excel",
      "mos-word",
      "mos-powerpoint",
    ],
  },
  {
    id: "civil-engineering",
    title: "الهندسة المدنية",
    description:
      "تخصص في الهندسة المدنية يشمل التصميم الإنشائي، إدارة المشاريع، والتصميم بمساعدة الحاسوب. يتضمن شهادات معتمدة في برامج التصميم الهندسي.",
    courseCategory: "design",
    certCategory: "development-programming",
    courses: getCoursesByCategory("design"),
    certifications: ["autocad", "revit", "civil-3d"],
  },
  {
    id: "architecture",
    title: "الهندسة المعمارية",
    description:
      "مسار متخصص في التصميم المعماري والتصور البصري. يشمل دورات في برامج التصميم المعماري والنمذجة ثلاثية الأبعاد.",
    courseCategory: "design",
    certCategory: "development-programming",
    courses: getCoursesByCategory("design"),
    certifications: ["autocad", "revit", "3ds-max", "sketchup"],
  },
  {
    id: "mechanical-engineering",
    title: "الهندسة الميكانيكية",
    description:
      "تخصص في الهندسة الميكانيكية يغطي التصميم الميكانيكي، النمذجة، والتصنيع. يتضمن شهادات احترافية في برامج التصميم الميكانيكي.",
    courseCategory: "design",
    certCategory: "development-programming",
    courses: getCoursesByCategory("design"),
    certifications: ["autocad", "inventor", "fusion-360", "solidworks"],
  },
  {
    id: "accounting",
    title: "المحاسبة",
    description:
      "مسار شامل في المحاسبة والمالية يغطي المحاسبة العامة، التحليل المالي، وبرامج المحاسبة. يشمل شهادات معتمدة في المحاسبة وبرامج المحاسبة.",
    courseCategory: "business",
    certCategory: "development-programming",
    courses: getCoursesByCategory("business"),
    certifications: [
      "quickbooks",
      "mos-excel",
      "accounting-principles",
      "financial-analysis",
    ],
  },
  {
    id: "languages",
    title: "اللغات",
    description:
      "برنامج متكامل لتعلم اللغات يركز على مهارات التواصل والكتابة المهنية. يتضمن شهادات معتمدة في اللغة الإنجليزية للأعمال والكتابة التقنية.",
    courseCategory: "languages",
    certCategory: "development-programming",
    courses: getCoursesByCategory("languages"),
    certifications: [
      "csb-business",
      "english-proficiency",
      "technical-writing",
    ],
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
              {selectedMajorData.description}
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
                    الشهادات المعتمدة
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
                استكشف الشهادات المتخصصة
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
                    {/* <p className="text-xs text-slate-400 mt-2">
                      {major.courses.length} دورة متاحة
                    </p> */}
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
