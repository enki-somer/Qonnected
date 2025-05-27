"use client";

import { useState, useEffect } from "react";
import { Search, ChevronRight } from "lucide-react";
import { Certification } from "@/types/certifications";
import { certificationCategories } from "@/data/certifications";
import { useAuth } from "@/hooks/useAuth";
import CategoryCard from "@/components/CategoryCard";
import CertificationCard from "@/components/CertificationCard";
import CertificationModal from "@/components/CertificationModal";
import PaymentFlow from "@/components/PaymentFlow";
import PreTestModal from "@/components/PreTestModal";

export default function CertificationsPage() {
  const { isAuthenticated, login } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreTestModalOpen, setIsPreTestModalOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleBookClick = (exam: Certification) => {
    if (!isAuthenticated) {
      // Store the exam for after login
      sessionStorage.setItem("pendingBooking", JSON.stringify(exam));
      login();
      return;
    }
    setSelectedCertification(exam);
    setShowPayment(true);
  };

  const handlePreTestClick = (exam: Certification) => {
    if (!isAuthenticated) {
      // Store the exam for after login
      sessionStorage.setItem("pendingPreTest", JSON.stringify(exam));
      login();
      return;
    }
    setSelectedCertification(exam);
    setIsPreTestModalOpen(true);
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
      } else if (pendingPreTest) {
        const exam = JSON.parse(pendingPreTest);
        setSelectedCertification(exam);
        setIsPreTestModalOpen(true);
        sessionStorage.removeItem("pendingPreTest");
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          الشهادات المهنية والاختبارات
        </h1>
        <p className="text-text-muted">
          اكتشف مجموعة واسعة من الشهادات المهنية والاختبارات المعتمدة دولياً
        </p>
      </div>

      {/* Search */}
      <div className="relative flex-1 mb-8">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="ابحث عن شهادة..."
          className="w-full pl-4 pr-10 py-2 rounded-lg bg-primary-dark border border-primary-light/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories Grid */}
      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={(id) => setSelectedCategory(id)}
            />
          ))}
        </div>
      ) : (
        <>
          {/* Enhanced Back Navigation */}
          <div className="sticky top-0 z-20 -mx-4 px-4 py-3 mb-6 bg-[#1a1f2e]/80 backdrop-blur-lg border-b border-primary-light/10">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 text-white hover:text-accent transition-colors group"
              >
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                <span className="font-medium">العودة إلى الفئات</span>
              </button>
              <h2 className="text-lg font-bold text-white">
                {
                  certificationCategories.find(
                    (cat) => cat.id === selectedCategory
                  )?.name
                }
              </h2>
            </div>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificationCategories
              .find((cat) => cat.id === selectedCategory)
              ?.exams.filter(
                (exam) =>
                  exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  exam.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
              .map((exam) => (
                <CertificationCard
                  key={exam.id}
                  certification={exam}
                  onDetailsClick={() => {
                    setSelectedCertification(exam);
                    setIsModalOpen(true);
                  }}
                  onBookClick={() => handleBookClick(exam)}
                  onPreTestClick={() => handlePreTestClick(exam)}
                />
              ))}
          </div>
        </>
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

      {/* Pre-test Modal */}
      {selectedCertification && (
        <PreTestModal
          isOpen={isPreTestModalOpen}
          onClose={() => {
            setIsPreTestModalOpen(false);
            setSelectedCertification(null);
          }}
          onBook={() => {
            setIsPreTestModalOpen(false);
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
          certification={{
            name: selectedCertification.name,
            price: selectedCertification.price,
          }}
        />
      )}
    </div>
  );
}
