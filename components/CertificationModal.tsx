"use client";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import {
  X,
  CheckCircle,
  Star,
  Target,
  Zap,
  Award,
  FileText,
  Printer,
} from "lucide-react";

// Get the logo path based on certification ID
const getCertificationLogo = (id: string): string => {
  switch (id) {
    case "mos-word":
      return "/images/Microsoft 360.PNG";
    case "mos-excel":
      return "/images/Microsoft 360.PNG";
    case "adobe-photoshop":
      return "/images/Photoshop.PNG";
    case "adobe-illustrator":
      return "/images/Adobe.PNG";
    case "autocad":
      return "/images/Autocad.PNG";
    case "swift-level1":
      return "/images/swift.png";
    default:
      return "";
  }
};

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
  certification: {
    id: string;
    name: string;
    description: string;
    price: string;
    duration: string;
    level: string;
    prerequisites: string[];
    learningOutcomes: string[];
    examDetails: {
      format: string;
    };
    benefits: string[];
  };
}

export default function CertificationModal({
  isOpen,
  onClose,
  onBook,
  certification,
}: CertificationModalProps) {
  const logoPath = getCertificationLogo(certification.id);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.scrollTop > 200) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    const modalContent = document.querySelector("[data-modal-content]");
    if (modalContent) {
      modalContent.addEventListener("scroll", handleScroll);
      return () => modalContent.removeEventListener("scroll", handleScroll);
    }
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl max-h-[90vh] transform overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1f2e] via-[#1e2332] to-[#1a1f2e] text-right align-middle shadow-2xl transition-all border border-white/10 flex flex-col">
                {/* Fixed Header Section */}
                <div className="relative overflow-hidden flex-shrink-0">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10" />
                  <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-5" />

                  <div className="relative p-6 pb-4">
                    {/* Close Button */}
                    <button
                      type="button"
                      className="absolute left-4 top-4 rounded-full bg-white/10 backdrop-blur-md p-2 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#1a1f2e]"
                      onClick={onClose}
                      aria-label="إغلاق"
                    >
                      <X className="h-5 w-5" />
                    </button>

                    {/* Title Section */}
                    <div className="flex items-start gap-4 mb-4">
                      {logoPath && (
                        <div className="relative">
                          <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md p-2 border border-white/20">
                            <div className="relative w-full h-full">
                              <Image
                                src={logoPath}
                                alt={`${certification.name} logo`}
                                fill
                                sizes="64px"
                                className="object-contain"
                              />
                            </div>
                          </div>
                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-xl bg-accent/20 blur-lg -z-10" />
                        </div>
                      )}

                      <div className="flex-1">
                        <Dialog.Title
                          as="h2"
                          className="text-2xl font-bold text-white mb-2 leading-tight"
                        >
                          {certification.name}
                        </Dialog.Title>

                        {/* Test Details below title */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
                            <Award className="h-3 w-3 text-accent" />
                            <span className="text-xs text-white/90">
                              {(() => {
                                const provider =
                                  certification.name
                                    .toLowerCase()
                                    .includes("microsoft") ||
                                  certification.name
                                    .toLowerCase()
                                    .includes("word") ||
                                  certification.name
                                    .toLowerCase()
                                    .includes("excel") ||
                                  certification.name
                                    .toLowerCase()
                                    .includes("powerpoint") ||
                                  certification.name
                                    .toLowerCase()
                                    .includes("outlook")
                                    ? "Microsoft"
                                    : certification.name
                                          .toLowerCase()
                                          .includes("adobe") ||
                                        certification.name
                                          .toLowerCase()
                                          .includes("photoshop") ||
                                        certification.name
                                          .toLowerCase()
                                          .includes("illustrator") ||
                                        certification.name
                                          .toLowerCase()
                                          .includes("indesign")
                                      ? "Adobe"
                                      : certification.name
                                            .toLowerCase()
                                            .includes("cisco") ||
                                          certification.name
                                            .toLowerCase()
                                            .includes("ccna") ||
                                          certification.name
                                            .toLowerCase()
                                            .includes("ccnp") ||
                                          certification.name
                                            .toLowerCase()
                                            .includes("ccst")
                                        ? "Cisco"
                                        : certification.name
                                              .toLowerCase()
                                              .includes("autocad") ||
                                            certification.name
                                              .toLowerCase()
                                              .includes("revit") ||
                                            certification.name
                                              .toLowerCase()
                                              .includes("inventor") ||
                                            certification.name
                                              .toLowerCase()
                                              .includes("fusion") ||
                                            certification.name
                                              .toLowerCase()
                                              .includes("3ds max") ||
                                            certification.name
                                              .toLowerCase()
                                              .includes("maya")
                                          ? "Autodesk"
                                          : certification.name
                                                .toLowerCase()
                                                .includes("apple") ||
                                              certification.name
                                                .toLowerCase()
                                                .includes("swift")
                                            ? "Apple"
                                            : certification.name
                                                  .toLowerCase()
                                                  .includes("pmi")
                                              ? "PMI"
                                              : certification.name
                                                    .toLowerCase()
                                                    .includes("ic3")
                                                ? "Certiport"
                                                : certification.name
                                                      .toLowerCase()
                                                      .includes("esb")
                                                  ? "ESB"
                                                  : certification.name
                                                        .toLowerCase()
                                                        .includes("quickbooks")
                                                    ? "Intuit"
                                                    : certification.name
                                                          .toLowerCase()
                                                          .includes("toefl")
                                                      ? "ETS TOEFL"
                                                      : null;

                                return provider
                                  ? `اختبار معتمد من ${provider}`
                                  : "اختبار معتمد";
                              })()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
                            <Zap className="h-3 w-3 text-accent" />
                            <span className="text-xs text-white/90">
                              مستوى {certification.level}
                            </span>
                          </div>
                        </div>

                        <p className="text-white/80 text-sm leading-relaxed">
                          {certification.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scrollable Content Sections */}
                <div
                  className="flex-1 overflow-y-auto px-6 py-4 space-y-6"
                  data-modal-content
                >
                  {/* Achievements Section */}
                  <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-2xl p-6 border border-accent/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Target className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        🎯 إنجازاتك بعد الحصول على الشهادة
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {certification.learningOutcomes.map((outcome, index) => (
                        <div
                          key={index}
                          className="group flex items-start gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/10 hover:border-accent/30"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-accent-light flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Star className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-white/90 group-hover:text-white transition-colors duration-300 leading-relaxed">
                            {outcome}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites & Benefits Grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Prerequisites */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          المتطلبات المسبقة
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {certification.prerequisites.map(
                          (prerequisite, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-blue-400/30 transition-colors duration-300"
                            >
                              <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                              <span className="text-white/80 text-sm leading-relaxed">
                                {prerequisite}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                          <Award className="h-4 w-4 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          مميزات الشهادة
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {certification.benefits.map((benefit, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/30 transition-colors duration-300"
                          >
                            <Award className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-1" />
                            <span className="text-white/80 text-sm leading-relaxed">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Services Section */}
                  <div className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl p-6 border border-purple-500/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-purple-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        ✨ خدمات إضافية مميزة
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="group flex items-start gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/10 hover:border-purple-400/30">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Printer className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1 group-hover:text-purple-200 transition-colors duration-300">
                            طباعة الشهادة الرسمية
                          </h4>
                          <p className="text-white/70 text-sm leading-relaxed">
                            احصل على نسخة مطبوعة عالية الجودة من شهادتك مع ختم
                            رسمي وتوقيع معتمد
                          </p>
                        </div>
                      </div>

                      <div className="group flex items-start gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/10 hover:border-purple-400/30">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FileText className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1 group-hover:text-purple-200 transition-colors duration-300">
                            نسخة رقمية معتمدة
                          </h4>
                          <p className="text-white/70 text-sm leading-relaxed">
                            احصل على ملف PDF رقمي قابل للتحقق مع رمز QR للمصادقة
                            الفورية
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fixed Footer with Action Button */}
                <div className="flex-shrink-0 border-t border-white/10 bg-white/5 backdrop-blur-md p-4">
                  <button
                    type="button"
                    className="w-full bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
                    onClick={onBook}
                  >
                    <Award className="h-5 w-5" />
                    <span>احجز الآن - {certification.price} IQD</span>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
