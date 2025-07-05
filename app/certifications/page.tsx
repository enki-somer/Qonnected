"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Certification } from "@/types/certifications";
import { certificationCategories } from "@/data/certifications";
import { useAuth } from "@/context/AuthContext";
import CertificationCard from "@/components/CertificationCard";
import CertificationModal from "@/components/CertificationModal";
import PaymentFlow from "@/components/PaymentFlow";
import BackButton from "@/components/BackButton";

// Arabic to English search mapping
const arabicToEnglishMap: Record<string, string[]> = {
  // Programming Languages
  بايثون: ["python"],
  جافا: ["java"],
  جافاسكريبت: ["javascript", "js"],
  "سي شارب": ["c#", "csharp"],
  "سي بلس بلس": ["c++", "cpp"],
  "إتش تي إم إل": ["html", "html5"],
  "سي إس إس": ["css", "css3"],
  سويفت: ["swift"],
  كوتلن: ["kotlin"],
  "في بي ايه": ["vba"],

  // Microsoft Products
  مايكروسوفت: ["microsoft"],
  إكسل: ["excel"],
  وورد: ["word"],
  بوربوينت: ["powerpoint", "pp"],
  أوتلوك: ["outlook"],
  أوفيس: ["office"],
  ويندوز: ["windows"],
  اكسس: ["access"],

  // Adobe Products
  أدوبي: ["adobe"],
  فوتوشوب: ["photoshop"],
  إليستريتور: ["illustrator"],
  إنديزاين: ["indesign"],
  "دريم ويفر": ["dreamweaver"],
  "أفتر إفكت": ["after effects"],
  بريمير: ["premiere"],

  // Autodesk Products
  أوتوديسك: ["autodesk"],
  أوتوكاد: ["autocad", "cad"],
  ريفيت: ["revit"],
  مايا: ["maya"],
  فيوجن: ["fusion", "fusion360"],
  إنفنتور: ["inventor"],
  "ثري دي ماكس": ["3dsmax", "3ds max"],

  // Networking & IT
  سيسكو: ["cisco"],
  شبكات: ["network", "networking"],
  "أمن سيبراني": ["cybersecurity", "cyber security"],
  حاسوب: ["computer", "pc"],
  "تقنية معلومات": ["it", "information technology"],
  "قواعد بيانات": ["database", "databases"],
  سحابة: ["cloud", "cloud computing"],

  // Design & Creative
  تصميم: ["design"],
  جرافيك: ["graphic"],
  تصوير: ["photography"],
  فيديو: ["video"],
  صوت: ["audio"],
  رسم: ["drawing"],
  فن: ["art"],

  // Business & Management
  أعمال: ["business"],
  إدارة: ["management"],
  مشروع: ["project"],
  محاسبة: ["accounting"],
  تسويق: ["marketing"],
  مبيعات: ["sales"],
  "موارد بشرية": ["hr", "human resources"],
  ريادة: ["entrepreneurship"],

  // General Terms
  برمجة: ["programming", "development", "coding"],
  تطوير: ["development"],
  ويب: ["web"],
  تطبيق: ["application", "app"],
  موقع: ["website", "site"],
  انترنت: ["internet", "web"],
  "ذكاء اصطناعي": ["ai", "artificial intelligence", "machine learning"],
  بيانات: ["data"],
  تحليل: ["analysis", "analytics"],
  أمان: ["security"],
  شهادة: ["certification", "certificate"],
  دورة: ["course"],
  تدريب: ["training"],
  مهارة: ["skill"],
  احترافي: ["professional"],
  متقدم: ["advanced"],
  مبتدئ: ["beginner"],
  متوسط: ["intermediate"],

  // Certification Providers
  مايكروسوft: ["microsoft"],
  أبل: ["apple"],
  جوجل: ["google"],
  امازون: ["amazon", "aws"],
  اوراكل: ["oracle"],
  "آي بي إم": ["ibm"],

  // Specific Certifications
  كومبتيا: ["comptia"],
  "سيسكو سي سي إن ايه": ["ccna"],
  "سيسكو سي سي إن بي": ["ccnp"],
  "بي إم آي": ["pmi"],
  "آي سي ثري": ["ic3"],
  "إم سي إس إيه": ["mcsa"],
  "إم سي إس إي": ["mcse"],
};

// Function to get English search terms from Arabic input
const getSearchTerms = (query: string): string[] => {
  const lowerQuery = query.toLowerCase().trim();
  const searchTerms = [lowerQuery]; // Always include original query

  // Check for exact Arabic matches
  Object.entries(arabicToEnglishMap).forEach(([arabic, englishTerms]) => {
    if (lowerQuery.includes(arabic)) {
      searchTerms.push(...englishTerms);
    }
  });

  // Check for partial Arabic matches (for compound searches)
  Object.entries(arabicToEnglishMap).forEach(([arabic, englishTerms]) => {
    if (arabic.includes(lowerQuery) || lowerQuery.includes(arabic)) {
      searchTerms.push(...englishTerms);
    }
  });

  return Array.from(new Set(searchTerms)); // Remove duplicates
};

export default function CertificationsPage() {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showPayment, setShowPayment] = useState(false);

  // Handle URL parameters for direct certification access
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    const certParam = urlParams.get("cert");

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    if (certParam && categoryParam) {
      // Find the specific certification
      const category = certificationCategories.find(
        (cat) => cat.id === categoryParam
      );
      const certification = category?.exams.find(
        (exam) => exam.id === certParam
      );

      if (certification) {
        setSelectedCertification(certification);
        setIsModalOpen(true);
      }
    }
  }, []);

  const handleBookClick = (exam: Certification) => {
    if (!isAuthenticated) {
      // Store the exam for after login
      sessionStorage.setItem("pendingBooking", JSON.stringify(exam));
      openAuthModal("login");
      return;
    }
    setSelectedCertification(exam);
    setShowPayment(true);
  };

  // Check for pending actions after login
  useEffect(() => {
    if (isAuthenticated) {
      const pendingBooking = sessionStorage.getItem("pendingBooking");
      const pendingPreTest = sessionStorage.getItem("pendingPreTest");

      if (pendingBooking) {
        const exam = JSON.parse(pendingBooking);
        setSelectedCertification(exam);
        setShowPayment(true);
        sessionStorage.removeItem("pendingBooking");
      }
    }
  }, [isAuthenticated]);

  // Filter certifications based on search query and selected category
  const getFilteredCategories = () => {
    return certificationCategories
      .map((category) => {
        const filteredExams = category.exams.filter((exam) => {
          if (searchQuery === "") return true;

          // Get all possible search terms (Arabic + English)
          const searchTerms = getSearchTerms(searchQuery);

          // Check if any search term matches the exam
          return searchTerms.some(
            (term) =>
              exam.name.toLowerCase().includes(term) ||
              exam.description.toLowerCase().includes(term) ||
              exam.id.toLowerCase().includes(term)
          );
        });

        return {
          ...category,
          exams: filteredExams,
        };
      })
      .filter((category) => {
        // Only show categories that have exams after filtering
        if (category.exams.length === 0) return false;

        // If a specific category is selected, only show that category
        if (selectedCategory) {
          return category.id === selectedCategory;
        }

        return true;
      });
  };

  const filteredCategories = getFilteredCategories();
  const totalCertifications = filteredCategories.reduce(
    (sum, cat) => sum + cat.exams.length,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          الشهادات المهنية والاختبارات
        </h1>
        <p className="text-text-muted mb-4">
          اكتشف مجموعة واسعة من الشهادات المهنية والاختبارات المعتمدة دولياً
        </p>
        <div className="text-sm text-accent">
          {totalCertifications} شهادة متاحة
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="ابحث عن شهادة... (مثال: بايثون، مايكروسوفت، فوتوشوب)"
            className="w-full pl-4 pr-10 py-3 rounded-lg bg-primary-dark border border-primary-light/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {searchQuery && (
          <div className="mt-2 text-xs text-text-muted">
            البحث عن: {searchQuery}
            {getSearchTerms(searchQuery).length > 1 && (
              <span className="text-accent">
                {" "}
                (يشمل: {getSearchTerms(searchQuery).slice(1).join("، ")})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Category Filters - Always Visible */}
      <div className="mb-8 p-6 bg-primary-dark/50 rounded-lg border border-primary-light/10">
        <h3 className="text-lg font-semibold mb-4">تصفية حسب الفئة</h3>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              selectedCategory === null
                ? "bg-accent text-black border-accent"
                : "bg-transparent text-text-muted border-primary-light/20 hover:border-accent/50"
            }`}
          >
            جميع الفئات
          </button>

          {certificationCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                selectedCategory === category.id
                  ? "bg-accent text-black border-accent"
                  : "bg-transparent text-text-muted border-primary-light/20 hover:border-accent/50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Certifications by Category */}
      <div className="space-y-12">
        {filteredCategories.map((category) => (
          <div key={category.id} className="space-y-6">
            {/* Category Header */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {category.name}
                </h2>
                <p className="text-text-muted text-sm">
                  {category.description}
                </p>
                <div className="text-xs text-accent mt-1">
                  {category.exams.length} شهادة
                </div>
              </div>
              <div className="w-1 h-16 bg-gradient-to-b from-accent to-primary rounded-full"></div>
            </div>

            {/* Certifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.exams.map((exam) => (
                <CertificationCard
                  key={exam.id}
                  certification={exam}
                  onDetailsClick={() => {
                    setSelectedCertification(exam);
                    setIsModalOpen(true);
                  }}
                  onBookClick={() => handleBookClick(exam)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">لا توجد نتائج</h3>
          <p className="text-text-muted mb-4">
            حاول تغيير مصطلحات البحث أو إزالة المرشحات
          </p>
          <div className="text-sm text-text-muted">
            <p className="mb-2">أمثلة للبحث:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["بايثون", "مايكروسوفت", "فوتوشوب", "جافا", "إكسل", "تصميم"].map(
                (example) => (
                  <button
                    key={example}
                    onClick={() => setSearchQuery(example)}
                    className="px-3 py-1 bg-primary-dark rounded-full text-xs hover:bg-accent/20 transition-colors"
                  >
                    {example}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {selectedCertification && (
        <CertificationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCertification(null);
          }}
          onBook={() => {
            setIsModalOpen(false);
            handleBookClick(selectedCertification);
          }}
          certification={selectedCertification}
        />
      )}

      {/* Payment Flow Modal */}
      {selectedCertification && isAuthenticated && (
        <PaymentFlow
          isOpen={showPayment}
          onClose={() => {
            setShowPayment(false);
            setSelectedCertification(null);
          }}
          item={{
            name: selectedCertification.name,
            price: selectedCertification.price,
            type: "certification",
          }}
        />
      )}
    </div>
  );
}
