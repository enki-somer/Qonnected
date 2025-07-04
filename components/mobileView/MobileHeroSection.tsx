import { Sparkles, BookOpen, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MobileHeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-dark to-primary p-4">
      <div className="absolute inset-0 bg-grid-white/5" />

      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex justify-center mb-6"
      >
        <div className="flex items-center gap-2">
          <div className="relative w-12 h-12">
            <Image
              src="/Qlogo.png"
              alt="QonnectED Logo"
              width={48}
              height={48}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex items-center flex-row-reverse">
            <span className="text-2xl font-bold text-accent">Q</span>
            <span className="text-2xl font-bold text-text">onnect</span>
            <span className="text-2xl font-bold text-accent">ED</span>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-1.5 text-accent mb-4 bg-accent/10 px-3 py-1 rounded-full">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span className="text-[10px] font-medium">
              منصة تعليمية متكاملة مع شهادات معتمدة دولياً
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-4"
        >
          <h1 className="text-2xl font-bold leading-tight">
            <span className="inline-block">طور مستقبلك المهني</span>
            <span className="text-accent block mt-1">
              بشهادات معتمدة عالمياً
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-text-muted text-sm text-center mb-6 px-4"
        >
          نقدم لك مجموعة متنوعة من الشهادات المعتمدة دولياً في مجالات
          التكنولوجيا واللغات والإدارة. ابدأ رحلتك نحو النجاح المهني اليوم.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col gap-3 px-4"
        >
          <Link
            href="/courses"
            className="w-full bg-accent hover:bg-accent/90 text-primary px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>استكشف الدورات</span>
          </Link>
          <Link
            href="/certifications"
            className="w-full bg-gradient-to-r from-accent via-accent/90 to-accent/80 hover:from-accent/90 hover:via-accent/80 hover:to-accent/70 text-primary px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl"
          >
            <Award className="w-4 h-4" />
            <span>عرض الاختبارات</span>
          </Link>
        </motion.div>

        {/* Vision Cards - Simplified for Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 px-4"
        >
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "شهادات معتمدة دولياً",
                description: "من Microsoft و Apple إلى شهادات الامن السيبراني",
                icon: "🏆",
              },
              {
                title: "تعلم عملي وتطبيقي",
                description: "تطبيق مباشر للمعرفة من خلال مشاريع واقعية",
                icon: "💻",
              },
              {
                title: "مجتمع تعليمي متكامل",
                description: "بيئة تفاعلية تجمع المتعلمين والخبراء",
                icon: "👥",
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                className="bg-primary-light/10 backdrop-blur-sm rounded-xl p-4 border border-primary-light/20"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{card.icon}</span>
                  <div>
                    <h3 className="font-medium text-sm mb-1">{card.title}</h3>
                    <p className="text-text-muted text-xs">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-primary-dark rounded-full blur-3xl animate-pulse-delay" />
    </div>
  );
}
