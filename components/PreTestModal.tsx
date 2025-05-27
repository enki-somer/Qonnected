"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { X, Clock, Award, BookOpen, CheckCircle } from "lucide-react";
import { Certification } from "@/types/certifications";

// Get the logo path based on certification ID
const getCertificationLogo = (id: string): string => {
  switch (id) {
    case "mos-word":
      return "/images/Microsoft.png";
    case "mos-excel":
      return "/images/Microsoft.png";
    case "adobe-photoshop":
      return "/images/Photoshop.png";
    case "adobe-illustrator":
      return "/images/Adobe.png";
    case "autocad":
      return "/images/Autocad.png";
    case "swift-level1":
      return "/images/swift.png";
    default:
      return "/images/default-certification.png";
  }
};

interface PreTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
  certification: Certification;
}

export default function PreTestModal({
  isOpen,
  onClose,
  onBook,
  certification,
}: PreTestModalProps) {
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-[#1a1f2e] p-6 text-right align-middle shadow-xl transition-all">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute left-4 top-4 text-text-muted hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  {/* Logo */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={getCertificationLogo(certification.id)}
                      alt={`${certification.name} logo`}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  {/* Title */}
                  <div className="flex-1">
                    <Dialog.Title className="text-2xl font-bold text-white mb-2">
                      اختبار تجريبي - {certification.name}
                    </Dialog.Title>
                    <p className="text-text-muted">
                      اختبر معرفتك وجاهزيتك للشهادة من خلال اختبار تجريبي مجاني
                    </p>
                  </div>
                </div>

                {/* Pre-test Details */}
                <div className="space-y-6 mb-8">
                  {/* Test Format */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-accent" />
                      تفاصيل الاختبار التجريبي
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-text-muted">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>محاكاة كاملة لنمط أسئلة الاختبار الرسمي</span>
                      </li>
                      <li className="flex items-start gap-2 text-text-muted">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>تقييم فوري لمستواك ونقاط القوة والضعف</span>
                      </li>
                      <li className="flex items-start gap-2 text-text-muted">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>توصيات مخصصة للتحضير للاختبار الرسمي</span>
                      </li>
                    </ul>
                  </div>

                  {/* Time Info */}
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
                    <Clock className="w-5 h-5 text-accent" />
                    <div>
                      <span className="block text-sm text-text-muted mb-1">
                        مدة الاختبار التجريبي
                      </span>
                      <span className="text-white font-medium">
                        {certification.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2.5 rounded-xl transition-all duration-300"
                    onClick={onClose}
                  >
                    إغلاق
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-accent hover:bg-accent-dark text-primary font-bold py-2.5 rounded-xl transition-all duration-300"
                    onClick={onBook}
                  >
                    ابدأ الاختبار التجريبي
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
