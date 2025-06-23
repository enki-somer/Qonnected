import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  Star,
  Award,
  Rocket,
  CheckCircle,
  Sparkles,
  PartyPopper,
  Clock,
} from "lucide-react";

interface CelebrationSceneProps {
  majorTitle: string;
  onComplete: () => void;
}

export default function CelebrationScene({
  majorTitle,
  onComplete,
}: CelebrationSceneProps) {
  const [showSecondPhase, setShowSecondPhase] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const launchConfetti = () => {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 999,
        disableForReducedMotion: true,
      };

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
          scalar: 1.2,
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ["#FFD700", "#FFA500"],
      });

      fire(0.2, {
        spread: 60,
        colors: ["#4CAF50", "#64B5F6"],
      });

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        colors: ["#FF6B6B", "#FFA500"],
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        colors: ["#FFD700", "#4CAF50"],
      });
    };

    const timer1 = setTimeout(() => {
      launchConfetti();
    }, 300);

    const timer2 = setTimeout(() => {
      setShowSecondPhase(true);
    }, 1800);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black/95 to-primary-dark/95 backdrop-blur-xl"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),rgba(255,165,0,0.1))]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.2),transparent_70%)]"
        />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-center mb-12"
        >
          <div className="relative">
            <PartyPopper className="w-28 h-28 text-accent" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-accent/20 rounded-full blur-2xl"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative"
        >
          <h2 className="text-10xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent mb-4 flex items-center justify-center gap-2 whitespace-nowrap text-center w-full">
            <span className="block w-full">تم تقديم الطلب بنجاح!</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block absolute -left-4"
            >
              🎉
            </motion.span>
          </h2>
          <Sparkles className="absolute -right-8 top-0 w-6 h-6 text-accent-light" />
          <Sparkles className="absolute -left-8 bottom-0 w-6 h-6 text-accent-light" />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-2xl text-accent/90 mb-4 font-medium"
        >
          تم تقديم طلب التسجيل في
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="relative inline-block"
        >
          <h3 className="text-4xl font-bold text-white mb-8 px-12 py-4 rounded-2xl bg-accent/10 border border-accent/20">
            {majorTitle}
          </h3>
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-accent/5 rounded-2xl blur-xl"
          />
        </motion.div>

        <AnimatePresence>
          {showSecondPhase && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              {[
                {
                  icon: CheckCircle,
                  text: "تم استلام الطلب",
                  color: "from-yellow-500/20 to-orange-500/20",
                },
                {
                  icon: Clock,
                  text: "قيد المراجعة",
                  color: "from-green-500/20 to-emerald-500/20",
                },
                {
                  icon: PartyPopper,
                  text: "سيتم إعلامك قريباً",
                  color: "from-blue-500/20 to-cyan-500/20",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  <div
                    className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:border-accent/30`}
                  >
                    <item.icon className="w-10 h-10 text-white/80 mb-4 mx-auto transition-colors duration-300 group-hover:text-accent" />
                    <p className="text-sm text-white/80 font-medium transition-colors duration-300 group-hover:text-white">
                      {item.text}
                    </p>
                  </div>
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-accent/5 rounded-2xl blur-lg"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
