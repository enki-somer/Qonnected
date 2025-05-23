"use client";

import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { Certification } from "@/types/certifications";
import { certificationCategories } from "@/data/certifications";
import CategoryCard from "@/components/CategoryCard";
import CertificationCard from "@/components/CertificationCard";
import CertificationModal from "@/components/CertificationModal";
import PaymentFlow from "@/components/PaymentFlow";

export default function CertificationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleBookClick = (exam: Certification) => {
    setSelectedCertification(exam);
    setShowPayment(true);
  };

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
          {/* Back Button */}
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-6 flex items-center gap-2 text-[#8b95a5] hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
            <span>العودة إلى الفئات</span>
          </button>

          {/* Selected Category Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">
              {
                certificationCategories.find(
                  (cat) => cat.id === selectedCategory
                )?.name
              }
            </h2>
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

      {/* Payment Flow Modal */}
      {selectedCertification && (
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
