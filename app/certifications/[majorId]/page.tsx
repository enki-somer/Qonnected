"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { certificationCategories } from "@/data/certifications";
import { majors } from "@/data/majors";
import CertificationCard from "@/components/CertificationCard";
import CertificationModal from "@/components/CertificationModal";
import PaymentFlow from "@/components/PaymentFlow";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Award } from "lucide-react";
import PreTestModal from "@/components/PreTestModal";
import Link from "next/link";
import Image from "next/image";

export default function MajorCertificationsPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [selectedMajor, setSelectedMajor] = useState<any>(null);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [selectedCertification, setSelectedCertification] = useState<any>(null);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [showPreTestModal, setShowPreTestModal] = useState(false);

  useEffect(() => {
    if (params.majorId) {
      const major = majors.find((m) => m.id === params.majorId);
      if (major) {
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
        setCertifications(certs);
      }
    }
  }, [params.majorId]);

  const handleCertificationDetails = (certification: any) => {
    setSelectedCertification(certification);
    setShowCertificationModal(true);
  };

  const handlePreTest = (certification: any) => {
    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }
    setSelectedCertification(certification);
    setShowPreTestModal(true);
  };

  const handleBookNow = (certification: any) => {
    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }
    setSelectedCertification(certification);
    setShowPaymentFlow(true);
  };

  const handleClosePaymentFlow = () => {
    setShowPaymentFlow(false);
    setSelectedCertification(null);
  };

  if (!selectedMajor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">لم يتم العثور على التخصص</h1>
          <button
            onClick={() => router.back()}
            className="text-accent hover:text-accent/80"
          >
            العودة للخلف
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-primary-dark/95 to-primary-dark/75 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-white transition-colors duration-200"
            >
              <ArrowRight className="w-5 h-5" />
              <span>العودة للخلف</span>
            </button>
            <Link
              href="/"
              className="transform hover:scale-105 transition-transform duration-200"
            >
              <Image
                src="/Qlogo.png"
                alt="QonnectED Logo"
                width={120}
                height={35}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Content with padding for fixed header */}
      <div className="pt-20">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#FFD700]/15 text-[#FFD700] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              الشهادات المتاحة
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              شهادات {selectedMajor.title}
            </h1>
            <p className="text-xl text-slate-300">
              اكتشف الاختبارات المعتمدة المتاحة في مجال تخصصك
            </p>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {certifications.map((certification) => (
              <CertificationCard
                key={certification.id}
                certification={certification}
                onDetailsClick={() => handleCertificationDetails(certification)}
                onBookClick={() => handleBookNow(certification)}
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
      </div>
    </div>
  );
}
