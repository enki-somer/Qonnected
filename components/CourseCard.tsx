"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PaymentFlow from "./PaymentFlow";
import { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  onEnroll?: () => void;
}

export default function CourseCard({ course, onEnroll }: CourseCardProps) {
  const router = useRouter();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [isPaymentFlowOpen, setIsPaymentFlowOpen] = useState(false);

  const handleRegisterClick = () => {
    if (onEnroll) {
      onEnroll();
      return;
    }

    if (!isAuthenticated) {
      // Open authentication modal instead of redirecting
      openAuthModal("login");
      return;
    }
    setIsPaymentFlowOpen(true);
  };

  // Get the points from the first lesson's description
  const points = course.sections[0].lessons[0].description?.split("\n") || [];

  return (
    <>
      <motion.div
        className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.08] rounded-2xl p-6 hover:from-white/[0.08] hover:to-white/[0.12] transition-all duration-500 cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Course Logo */}
        <motion.div
          className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Image
            src={course.image || "/images/default-category.png"}
            alt={course.title}
            width={48}
            height={48}
            className="object-contain"
          />
        </motion.div>

        {/* Level Badge */}
        <motion.div
          className="absolute top-6 left-6 bg-white/[0.05] px-3 py-1 rounded-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-sm text-white">
            {course.level === "beginner" && "مبتدئ"}
            {course.level === "intermediate" && "متوسط"}
            {course.level === "advanced" && "متقدم"}
          </span>
        </motion.div>

        {/* Course Name */}
        <motion.h3
          className="text-xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {course.title}
        </motion.h3>

        {/* Course Description */}
        <motion.p
          className="text-sm text-[#8b95a5] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {course.description}
        </motion.p>

        {/* Course Points */}
        <motion.div
          className="space-y-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {points.map((point, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#8b95a5]">{point.trim()}</span>
            </div>
          ))}
        </motion.div>

        {/* Price and Register Button */}
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
                IQD 150,000
              </span>
            </div>
          </motion.div>

          {/* Register Button */}
          <motion.button
            onClick={handleRegisterClick}
            className="w-full py-3.5 bg-accent hover:bg-accent-light text-black rounded-xl transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>سجل الآن</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Payment Flow */}
      <PaymentFlow
        isOpen={isPaymentFlowOpen}
        onClose={() => setIsPaymentFlowOpen(false)}
        item={{
          id: course.id.toString(),
          name: course.title,
          price: "150,000",
          type: "course",
        }}
      />
    </>
  );
}
