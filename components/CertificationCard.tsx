"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, CheckCircle, BookOpen } from "lucide-react";
import { Certification } from "@/types/certifications";
import PaymentFlow from "./PaymentFlow";

// Get the logo path based on certification ID
const getCertificationLogo = (id: string): string => {
  switch (id) {
    // Engineering & Architecture
    case "autocad":
      return "/images/Autocad.png";
    case "revit":
    case "inventor":
      return "/images/Autodesk.png";
    case "fusion360":
      return "/images/Fusion.png";
    case "3dsmax":
      return "/images/3dmax.png";
    case "maya":
      return "/images/maya.png";

    // Creative Design
    case "photoshop":
      return "/images/Photoshop.png";
    case "illustrator":
    case "indesign":
    case "dreamweaver":
      return "/images/Adobe.png";

    // Development & Programming
    case "python":
      return "/images/python.jpg";
    case "java":
      return "/images/java.png";
    case "software-development":
      return "/images/Code.png";
    case "swift-development":
      return "/images/swift.png";
    case "html-css":
      return "/images/css.png";
    case "html5":
      return "/images/html5.png";
    case "javascript":
      return "/images/js.png";

    // Business & Office
    case "microsoft-word":
      return "/images/word.png";
    case "microsoft-excel":
      return "/images/excell.jpg";
    case "microsoft-powerpoint":
      return "/images/pp.png";
    case "microsoft-outlook":
      return "/images/outlock.png";
    case "quickbooks":
      return "/images/qb.png";
    case "pmi":
      return "/images/pmi.png";
    case "esb":
      return "/images/ESB_Logo-1.png";
    case "business-english":
      return "/images/Languages.png";

    // IT & Computer Science
    case "ic3":
      return "/images/ic3.png";
    case "ic3-spark":
      return "/images/spark.png";
    case "microsoft-fundamentals":
      return "/images/Microsoft.png";
    case "computational-thinking":
      return "/images/Code.png";
    case "cybersecurity":
    case "network-security":
      return "/images/cyper.png";
    case "networking":
      return "/images/network.png";
    case "cisco-cyber-ops":
      return "/images/ccna.png";
    case "cisco-professional":
      return "/images/CISCO.png";
    case "ccst":
      return "/images/ccst.jpeg";

    // Emerging Tech
    case "it-english":
      return "/images/Languages.png";
    case "artificial-intelligence":
      return "/images/Ai.png";
    case "cloud-computing":
    case "data-analysis":
      return "/images/online-analytical.png";
    case "databases":
      return "/images/Code.png";
    case "device-configuration":
      return "/images/online-analytical.png";

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
  onPreTestClick: () => void;
  onBookClick: () => void;
}

export default function CertificationCard({
  certification,
  onDetailsClick,
  onPreTestClick,
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
        scale: 1.01,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="relative group"
    >
      <div className="relative h-full bg-gradient-to-br from-[#1a1f2e]/90 to-[#1a1f2e]/95 backdrop-blur-xl rounded-2xl border border-white/5 hover:border-accent/20 transition-all duration-500 overflow-hidden">
        {/* Animated Background Effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-[500px] bg-primary/5 rotate-[-35deg] transform-gpu group-hover:translate-x-[200px] transition-transform duration-1000 ease-out" />
        </div>

        {/* Certification Badge */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="absolute -left-12 top-6 z-10"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-sm font-medium px-12 py-1.5 transform rotate-[-45deg] whitespace-nowrap shadow-lg">
            شهادة معتمدة
          </div>
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo Section */}
          <div className="relative w-full pt-12 pb-8 px-8">
            <div className="relative w-full max-w-[180px] aspect-[3/2] mx-auto transform group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
              <Image
                src={logoPath}
                alt={`${certification.name} logo`}
                fill
                className="object-contain p-4"
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
            <motion.h3
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90 text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {certification.name}
            </motion.h3>

            {/* Benefits */}
            <div className="flex-1">
              <div className="space-y-3 mb-6">
                {certification.benefits.slice(0, 2).map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-white/[0.03] hover:bg-white/[0.08] rounded-xl group-hover:translate-x-1 transition-all duration-300"
                  >
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-muted group-hover:text-white transition-colors duration-300">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Price and Actions */}
            <div className="space-y-4">
              {/* Price */}
              <motion.div
                className="bg-gradient-to-r from-white/[0.03] to-white/[0.05] rounded-xl p-4 group-hover:from-white/[0.05] group-hover:to-white/[0.08] transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                    IQD {certification.price}
                  </span>
                </div>
              </motion.div>

              {/* Pre-test Button */}
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onPreTestClick();
                }}
                className="w-full py-3.5 bg-white/[0.03] hover:bg-white/[0.08] text-white rounded-xl transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 group/btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BookOpen className="w-4 h-4 group-hover/btn:text-accent transition-colors duration-300" />
                <span>اختبار تجريبي</span>
              </motion.button>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onBookClick();
                  }}
                  className="flex-1 py-3.5 bg-accent hover:bg-accent-light text-white rounded-xl transition-all duration-300 text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  احجز الآن
                </motion.button>
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDetailsClick();
                  }}
                  className="px-4 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] text-white rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
