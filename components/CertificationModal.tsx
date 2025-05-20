"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { X, Clock, Award, BookOpen, Users, CheckCircle } from "lucide-react";

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
      totalQuestions: number;
      passingScore: string;
      timeLimit: string;
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
          <div className="fixed inset-0 bg-black/80" />
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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-[#1a1f2e] p-6 text-right align-middle shadow-xl transition-all">
                <div className="flex items-start justify-between mb-6">
                  <button
                    type="button"
                    className="rounded-lg bg-[#ffffff0d] p-2 text-[#8b95a5] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#1a1f2e]"
                    onClick={onClose}
                    aria-label="إغلاق"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  {logoPath && (
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={logoPath}
                        alt={`${certification.name} logo`}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold text-white mb-2"
                    >
                      {certification.name}
                    </Dialog.Title>
                    <p className="text-[#8b95a5]">
                      {certification.description}
                    </p>
                  </div>
                </div>

                {/* Rest of the modal content */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4 bg-[#ffffff0d] p-3 sm:p-4 rounded-xl">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-[#ffd700]" />
                    <div>
                      <p className="text-[#8b95a5] text-xs sm:text-sm">
                        مدة الشهادة
                      </p>
                      <p className="text-white text-sm sm:text-base font-semibold">
                        {certification.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-[#ffffff0d] p-3 sm:p-4 rounded-xl">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-[#ffd700]" />
                    <div>
                      <p className="text-[#8b95a5] text-xs sm:text-sm">
                        المستوى
                      </p>
                      <p className="text-white text-sm sm:text-base font-semibold">
                        {certification.level}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                    المتطلبات المسبقة
                  </h3>
                  <ul className="space-y-2">
                    {certification.prerequisites.map((prerequisite, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-[#8b95a5] text-sm sm:text-base"
                      >
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#ffd700] flex-shrink-0" />
                        {prerequisite}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learning Outcomes */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                    مخرجات التعلم
                  </h3>
                  <ul className="space-y-2">
                    {certification.learningOutcomes.map((outcome, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-[#8b95a5] text-sm sm:text-base"
                      >
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#ffd700] flex-shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exam Details */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                    تفاصيل الاختبار
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-[#ffffff0d] p-3 sm:p-4 rounded-xl">
                      <p className="text-[#8b95a5] text-xs sm:text-sm mb-1">
                        نوع الاختبار
                      </p>
                      <p className="text-white text-sm sm:text-base">
                        {certification.examDetails.format}
                      </p>
                    </div>
                    <div className="bg-[#ffffff0d] p-3 sm:p-4 rounded-xl">
                      <p className="text-[#8b95a5] text-xs sm:text-sm mb-1">
                        عدد الأسئلة
                      </p>
                      <p className="text-white text-sm sm:text-base">
                        {certification.examDetails.totalQuestions} سؤال
                      </p>
                    </div>
                    <div className="bg-[#ffffff0d] p-3 sm:p-4 rounded-xl">
                      <p className="text-[#8b95a5] text-xs sm:text-sm mb-1">
                        درجة النجاح
                      </p>
                      <p className="text-white text-sm sm:text-base">
                        {certification.examDetails.passingScore}
                      </p>
                    </div>
                    <div className="bg-[#ffffff0d] p-3 sm:p-4 rounded-xl">
                      <p className="text-[#8b95a5] text-xs sm:text-sm mb-1">
                        مدة الاختبار
                      </p>
                      <p className="text-white text-sm sm:text-base">
                        {certification.examDetails.timeLimit}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                    مميزات الشهادة
                  </h3>
                  <ul className="space-y-2">
                    {certification.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-[#8b95a5] text-sm sm:text-base"
                      >
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#ffd700] flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex-1 bg-[#ffffff0d] hover:bg-[#ffffff15] text-white font-medium py-2.5 rounded-xl transition-all duration-300"
                    onClick={onClose}
                  >
                    إغلاق
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-[#ffd700] hover:bg-[#ffd700]/90 text-[#1a1f2e] font-bold py-2.5 rounded-xl transition-all duration-300"
                    onClick={onBook}
                  >
                    احجز الآن
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
