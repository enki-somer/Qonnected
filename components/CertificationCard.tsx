"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Clock,
  Award,
  ChevronRight,
  CheckCircle,
  Users,
  BookOpen,
} from "lucide-react";
import { Certification } from "@/types/certifications";

// Get the logo path based on certification ID
const getCertificationLogo = (id: string): string => {
  switch (id) {
    case "mos-word":
      return "/images/microsoft-360.png";
    case "mos-excel":
      return "/images/microsoft-360.png";
    case "adobe-photoshop":
      return "/images/photoshop.png";
    case "adobe-illustrator":
      return "/images/adobe.png";
    case "autocad":
      return "/images/autocad.png";
    case "swift-level1":
      return "/images/swift.png";
    default:
      return "/images/default-certification.png"; // Provide a default image
  }
};

const formatPrice = (price: string) => {
  // Remove any non-digits
  const numericPrice = price.replace(/\D/g, "");
  // Convert to number and format with commas
  return `${parseInt(numericPrice).toLocaleString()}\u00A0د.ع`;
};

interface CertificationCardProps {
  certification: Certification;
  onDetailsClick: () => void;
  onBookClick: () => void;
}

export default function CertificationCard({
  certification,
  onDetailsClick,
  onBookClick,
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

        {/* Certification Badge - Desktop */}
        <div className="absolute -left-12 top-6 hidden sm:block">
          <div className="bg-emerald-500 text-white text-sm font-medium px-12 py-1.5 transform rotate-[-45deg] whitespace-nowrap shadow-sm">
            شهادة معتمدة
          </div>
        </div>

        {/* Certification Badge - Mobile */}
        <div className="absolute -left-12 top-6 sm:hidden">
          <div className="bg-emerald-500 text-white text-xs font-medium px-12 py-1.5 transform rotate-[-45deg] whitespace-nowrap shadow-sm">
            شهادة معتمدة
          </div>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden p-4">
          <div className="flex items-center gap-4">
            {logoPath && (
              <div className="relative w-14 h-14 flex-shrink-0 p-2 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
                <Image
                  src={logoPath}
                  alt={`${certification.name} logo`}
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                {certification.name}
              </h3>
              <div className="flex items-baseline gap-2 text-right">
                <span className="text-xs text-text-muted/70 line-through decoration-1">
                  {originalPrice}
                </span>
                <span className="text-sm font-bold text-accent">
                  {discountedPrice}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBookClick();
              }}
              type="button"
              className="flex-1 py-2 bg-accent hover:bg-accent-dark text-primary rounded-xl transition-all duration-300 text-sm font-medium"
            >
              احجز الآن
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDetailsClick();
              }}
              type="button"
              className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all duration-300 text-sm font-medium flex items-center justify-center group-hover:bg-accent/10"
            >
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block relative z-10 p-6">
          {/* Existing desktop content */}
          {/* Header */}
          <div className="flex items-start gap-6 mb-6">
            {logoPath && (
              <div className="relative w-20 h-20 flex-shrink-0 p-2 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
                <Image
                  src={logoPath}
                  alt={`${certification.name} logo`}
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                />
              </div>
            )}
            <div className="flex-1 min-w-0 pt-2">
              <h3 className="text-2xl font-bold text-white mb-3">
                {certification.name}
              </h3>
              <p className="text-text-muted text-sm">
                {certification.description}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
              <Clock className="w-5 h-5 text-accent" />
              <div>
                <span className="block text-xs text-text-muted mb-1">
                  المدة
                </span>
                <span className="block text-sm text-white font-medium">
                  {certification.duration}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
              <Award className="w-5 h-5 text-accent" />
              <div>
                <span className="block text-xs text-text-muted mb-1">
                  المستوى
                </span>
                <span className="block text-sm text-white font-medium">
                  {certification.level}
                </span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
              <Users className="w-5 h-5 text-accent" />
              <div>
                <span className="block text-xs text-text-muted mb-1">
                  المتطلبات
                </span>
                <span className="block text-sm text-white">
                  {certification.prerequisites.length} متطلبات
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
              <BookOpen className="w-5 h-5 text-accent" />
              <div>
                <span className="block text-xs text-text-muted mb-1">
                  المخرجات
                </span>
                <span className="block text-sm text-white">
                  {certification.learningOutcomes.length} مخرجات
                </span>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-white">
                المميزات الرئيسية
              </span>
            </div>
            <ul className="space-y-2">
              {certification.benefits.slice(0, 2).map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-text-muted group-hover:text-text transition-colors duration-300"
                >
                  <span className="text-accent mt-1">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white/5 rounded-xl p-3 group-hover:bg-white/10 transition-colors duration-300">
              <div className="flex items-baseline gap-2 justify-end whitespace-nowrap">
                <span className="text-sm text-text-muted/70 line-through decoration-1">
                  {originalPrice}
                </span>
                <span className="text-lg font-bold text-accent">
                  {discountedPrice}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDetailsClick();
                }}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2 group-hover:bg-accent/10"
              >
                <span>التفاصيل</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onBookClick();
                }}
                className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-primary rounded-xl transition-all duration-300 text-sm font-medium"
              >
                احجز الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
