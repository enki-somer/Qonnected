"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, CheckCircle, BookOpen } from "lucide-react";
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

const formatPrice = (price: string) => {
  const numericPrice = price.replace(/\D/g, "");
  return `${parseInt(numericPrice).toLocaleString()}\u00A0د.ع`;
};

interface CertificationCardProps {
  certification: Certification;
  onDetailsClick: () => void;
  onBookClick: () => void;
  onPreTestClick: () => void;
}

export default function CertificationCard({
  certification,
  onDetailsClick,
  onBookClick,
  onPreTestClick,
}: CertificationCardProps) {
  const logoPath = getCertificationLogo(certification.id);
  const originalPrice = formatPrice(certification.price);
  const discountedPrice = formatPrice(
    (parseInt(certification.price.replace(/\D/g, "")) * 0.8).toString()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="relative group"
    >
      <div className="relative h-full bg-[#1a1f2e] rounded-2xl border border-primary-light/10 hover:border-accent/30 transition-all duration-300 overflow-hidden">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/50 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Certification Badge */}
        <div className="absolute -left-12 top-6 z-10">
          <div className="bg-emerald-500 text-white text-sm font-medium px-12 py-1.5 transform rotate-[-45deg] whitespace-nowrap shadow-sm">
            شهادة معتمدة
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo Section */}
          <div className="relative w-full bg-gradient-to-br from-white/5 to-white/[0.02] pt-12 pb-8 px-8 flex items-center justify-center">
            <div className="relative w-full max-w-[180px] aspect-[3/2]">
              <Image
                src={logoPath}
                alt={`${certification.name} logo`}
                fill
                className="object-contain"
                sizes="180px"
                priority
                onError={(e: any) => {
                  e.currentTarget.src = "/images/default-certification.png";
                }}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Title */}
            <h3 className="text-xl font-bold text-white text-center mb-6">
              {certification.name}
            </h3>

            {/* Benefits */}
            <div className="flex-1">
              <div className="space-y-2 mb-6">
                {certification.benefits.slice(0, 2).map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors duration-300"
                  >
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-muted group-hover:text-text transition-colors duration-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price and Actions */}
            <div className="space-y-3">
              {/* Price */}
              <div className="bg-white/5 rounded-xl p-4 group-hover:bg-white/10 transition-colors duration-300">
                <div className="flex items-baseline gap-2 justify-center">
                  <span className="text-sm text-text-muted/70 line-through decoration-1">
                    {originalPrice}
                  </span>
                  <span className="text-xl font-bold text-accent">
                    {discountedPrice}
                  </span>
                </div>
              </div>

              {/* Pre-test Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onPreTestClick();
                }}
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>اختبار تجريبي</span>
              </button>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onBookClick();
                  }}
                  className="flex-1 py-3 bg-accent hover:bg-accent-dark text-primary rounded-xl transition-all duration-300 text-sm font-medium"
                >
                  احجز الآن
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDetailsClick();
                  }}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all duration-300 text-sm font-medium flex items-center justify-center group-hover:bg-accent/10"
                >
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
