"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import CelebrationScene from "./CelebrationScene";
import {
  CheckCircle,
  AlertCircle,
  Smartphone,
  CreditCard,
  ArrowRight,
  Copy,
  X,
  PartyPopper,
  Upload,
  Clock,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import Image from "next/image";

interface PaymentFlowProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    name: string;
    price: string;
    type: "certification" | "course";
  };
}

const PAYMENT_METHODS = [
  {
    id: "zain-cash",
    name: "Zain Cash",
    icon: "/images/zain-cash-logo.png",
    qrCode: "/images/zain-cash-qr.png", // You'll need to add these images
    instructions: [
      "افتح تطبيق Zain Cash",
      "امسح رمز QR",
      "أدخل المبلغ المطلوب",
      "أكد عملية الدفع",
      "انتظر رسالة التأكيد",
    ],
  },
  {
    id: "qi-card",
    name: "Qi Card",
    icon: "/images/qi-card-logo.png",
    qrCode: "/images/qi-card-qr.png", // You'll need to add these images
    instructions: [
      "افتح تطبيق Qi Card",
      "امسح رمز QR",
      "أدخل المبلغ المطلوب",
      "أكد عملية الدفع",
      "انتظر رسالة التأكيد",
    ],
  },
];

type PaymentStatus =
  | "selecting"
  | "qr_code"
  | "uploading"
  | "submitting"
  | "pending"
  | "error";

const compressImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1024;
        const MAX_HEIGHT = 1024;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to base64 with reduced quality
        const base64 = canvas.toDataURL("image/jpeg", 0.7);
        resolve(base64);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

export default function PaymentFlow({
  isOpen,
  onClose,
  item,
}: PaymentFlowProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("selecting");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [paymentId] = useState(
    `PAY-${Math.random().toString(36).substr(2, 9)}`
  );
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMethodSelect = (methodId: string) => {
    if (!isAuthenticated) {
      // Redirect to login page instead of opening Netlify Identity modal
      router.push(
        "/login?redirect=" + encodeURIComponent(window.location.pathname)
      );
      return;
    }

    setSelectedMethod(methodId);
    setPaymentStatus("qr_code");
  };

  const handleProceedToUpload = () => {
    setPaymentStatus("uploading");
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(paymentId);
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setIsCompressing(true);
        setPaymentProof(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        // Compress and convert to base64
        const base64Data = await compressImage(file);
        setPaymentProof(
          new File([dataURLtoBlob(base64Data)], file.name, {
            type: "image/jpeg",
          })
        );
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handlePaymentSubmit = async () => {
    if (!paymentProof || !item) return;

    try {
      setIsSubmitting(true);
      setPaymentStatus("submitting");

      const formData = new FormData();
      formData.append("proof", paymentProof);
      formData.append("proofBase64", await compressImage(paymentProof));
      formData.append("paymentId", paymentId);
      formData.append("itemName", item.name);
      formData.append("itemType", item.type);
      const numericAmount = Number(item.price.replace(/[^0-9.-]+/g, ""));
      formData.append("amount", numericAmount.toString());

      const response = await fetch("/api/payments", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit payment");
      }

      const data = await response.json();
      if (data.success) {
        setPaymentStatus("pending");
        setShowCelebration(true);
      } else {
        throw new Error(data.error || "Failed to submit payment");
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      setPaymentStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
  };

  const selectedPaymentMethod = PAYMENT_METHODS.find(
    (method) => method.id === selectedMethod
  );

  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case "qr_code":
        return (
          <motion.div
            key="qr_code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            {selectedPaymentMethod && (
              <>
                <div className="mb-6">
                  <div className="w-64 h-64 mx-auto bg-white p-4 rounded-xl">
                    <Image
                      src={selectedPaymentMethod.qrCode}
                      alt={`${selectedPaymentMethod.name} QR Code`}
                      width={210}
                      height={210}
                      className="w-full h-full"
                      priority
                      quality={100}
                    />
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-medium text-white">
                    خطوات الدفع
                  </h3>
                  <ul className="space-y-3">
                    {selectedPaymentMethod.instructions.map(
                      (instruction, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-[#8b95a5] text-sm"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#ffffff0d] flex items-center justify-center flex-shrink-0">
                            <span className="text-[#ffd700] text-xs">
                              {index + 1}
                            </span>
                          </div>
                          {instruction}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="bg-[#ffffff0d] rounded-xl p-4 mb-6">
                  <AlertCircle className="w-6 h-6 text-[#ffd700] mx-auto mb-2" />
                  <p className="text-sm text-[#8b95a5]">
                    بعد إتمام عملية الدفع، قم بتحميل صورة من إيصال الدفع في
                    الخطوة التالية
                  </p>
                </div>

                <button
                  onClick={handleProceedToUpload}
                  className="w-full bg-[#ffd700] hover:bg-[#e6c200] text-black font-medium py-3 rounded-xl transition-all duration-300"
                >
                  تم الدفع - المتابعة لتحميل الإيصال
                </button>
              </>
            )}
          </motion.div>
        );

      case "uploading":
        return (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-4"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />

            {previewUrl ? (
              <div className="space-y-4">
                <div className="relative w-full h-64 rounded-xl overflow-hidden">
                  <Image
                    src={previewUrl}
                    alt="Payment proof"
                    fill
                    className="object-contain"
                  />
                  {isCompressing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-2" />
                        <p className="text-white text-sm">
                          جاري معالجة الصورة...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-[#ffffff0d] hover:bg-[#ffffff15] text-white font-medium py-3 rounded-xl transition-all duration-300"
                  disabled={isCompressing || isSubmitting}
                >
                  اختر صورة أخرى
                </button>
                <button
                  onClick={handlePaymentSubmit}
                  disabled={isCompressing || isSubmitting}
                  className="w-full bg-[#ffd700] hover:bg-[#e6c200] text-black font-medium py-3 rounded-xl transition-all duration-300 relative"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      جاري إرسال الطلب...
                    </span>
                  ) : (
                    "تأكيد وإرسال"
                  )}
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#ffffff1a] rounded-xl p-8 text-center cursor-pointer hover:border-[#ffffff33] transition-colors"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                <Upload className="w-12 h-12 text-[#ffffff4d] mx-auto mb-4" />
                <p className="text-[#8b95a5] mb-2">
                  اضغط هنا لتحميل صورة إيصال الدفع
                </p>
                <p className="text-sm text-[#ffffff4d]">
                  يمكنك تحميل صور بصيغة JPG أو PNG
                </p>
              </div>
            )}
          </motion.div>
        );

      case "pending":
        return (
          <motion.div
            key="pending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 mx-auto bg-[#ffd70020] rounded-full flex items-center justify-center mb-4">
              <Clock className="w-10 h-10 text-[#ffd700]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              في انتظار الموافقة
            </h2>
            <p className="text-[#8b95a5] mb-6">
              تم استلام طلبك بنجاح وهو قيد المراجعة من قبل الإدارة
            </p>
            <div className="space-y-4 text-right bg-[#ffffff0d] p-6 rounded-xl">
              <h3 className="text-white font-medium">ماذا يحدث الآن؟</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-[#8b95a5]">
                  <CheckCircle className="w-5 h-5 text-[#ffd700] flex-shrink-0" />
                  <span>سيتم مراجعة طلبك خلال 24 ساعة</span>
                </li>
                <li className="flex items-center gap-2 text-[#8b95a5]">
                  <CheckCircle className="w-5 h-5 text-[#ffd700] flex-shrink-0" />
                  <span>ستتلقى إشعاراً فور الموافقة على طلبك</span>
                </li>
                <li className="flex items-center gap-2 text-[#8b95a5]">
                  <CheckCircle className="w-5 h-5 text-[#ffd700] flex-shrink-0" />
                  <span>يمكنك متابعة حالة طلبك من صفحة طلباتي</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 p-4 bg-[#ffffff0d] rounded-xl">
              <p className="text-sm text-[#8b95a5] mb-2">رقم الطلب الخاص بك</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#ffd700] font-medium">{paymentId}</span>
                <button
                  onClick={handleCopyId}
                  className="text-[#8b95a5] hover:text-white transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <AnimatePresence>
          {showCelebration && (
            <CelebrationScene
              majorTitle={item.name}
              onComplete={handleCelebrationComplete}
            />
          )}
        </AnimatePresence>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-t-2xl sm:rounded-2xl bg-[#1a1f2e] text-right shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg">
                {/* Close Button */}
                <div className="absolute left-4 top-4 z-10">
                  <button
                    type="button"
                    className="rounded-lg bg-[#ffffff0d] p-2 text-gray-400 hover:text-gray-200 focus:outline-none"
                    onClick={onClose}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Header */}
                <div className="border-b border-primary-light/10 p-6">
                  <Dialog.Title className="text-xl font-bold text-white">
                    {paymentStatus === "selecting" && "اختر طريقة الدفع"}
                    {paymentStatus === "qr_code" && "مسح رمز QR للدفع"}
                    {paymentStatus === "uploading" && "تحميل إثبات الدفع"}
                    {paymentStatus === "pending" && "في انتظار الموافقة"}
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-[#8b95a5]">{item.name}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[#ffd700] text-lg font-bold">
                      {item.price}
                    </span>
                    <div className="flex items-center gap-2 bg-[#ffffff0d] px-3 py-1 rounded-full">
                      <span className="text-white text-sm">رقم الطلب:</span>
                      <span className="text-[#ffd700] text-sm font-medium">
                        {paymentId}
                      </span>
                      <button
                        onClick={handleCopyId}
                        className="text-[#8b95a5] hover:text-white transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {paymentStatus === "selecting" ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="space-y-4">
                          {PAYMENT_METHODS.map((method) => (
                            <button
                              key={method.id}
                              onClick={() => {
                                handleMethodSelect(method.id);
                                setPaymentStatus("qr_code");
                              }}
                              className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#ffffff0d] hover:bg-[#ffffff15] transition-colors group"
                            >
                              <div className="w-12 h-12 rounded-lg bg-white p-2 flex items-center justify-center">
                                <Image
                                  src={method.icon}
                                  alt={method.name}
                                  width={40}
                                  height={40}
                                  className="object-contain"
                                />
                              </div>
                              <div className="flex-1 text-right">
                                <h3 className="text-white font-medium">
                                  {method.name}
                                </h3>
                                <p className="text-sm text-[#8b95a5]">
                                  ادفع باستخدام {method.name}
                                </p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-[#8b95a5] group-hover:text-white transition-colors" />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      renderPaymentStatus()
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="border-t border-primary-light/10 p-6">
                  {(paymentStatus === "qr_code" ||
                    paymentStatus === "uploading") && (
                    <button
                      onClick={() => setPaymentStatus("selecting")}
                      className="w-full bg-[#ffffff0d] hover:bg-[#ffffff15] text-white font-medium py-3 rounded-xl transition-all duration-300"
                    >
                      اختر طريقة دفع أخرى
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
