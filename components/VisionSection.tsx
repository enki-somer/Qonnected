"use client";

import { useState, useEffect } from "react";
import { Trophy, Code2, Users, Target, Play } from "lucide-react";

const features = [
  {
    title: "شهادات معتمدة دولياً",
    description: "من Microsoft و Apple إلى شهادات الأمن السيبراني",
    icon: Trophy,
    gradient: "from-yellow-500/20 to-orange-500/20",
    delay: "0",
  },
  {
    title: "تعلم عملي وتطبيقي",
    description: "تطبيق مباشر للمعرفة من خلال مشاريع واقعية",
    icon: Code2,
    gradient: "from-green-500/20 to-emerald-500/20",
    delay: "150",
  },
  {
    title: "مجتمع تعليمي متكامل",
    description: "بيئة تفاعلية تجمع المتعلمين والخبراء",
    icon: Users,
    gradient: "from-blue-500/20 to-purple-500/20",
    delay: "300",
  },
];

export default function VisionSection() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatureIndex((current) => (current + 1) % features.length);
    }, 3000); // Change feature every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full lg:w-[500px] relative perspective-1000">
      <div className="relative transform-gpu transition-all duration-500 hover:rotate-y-12 hover:scale-105">
        {/* Main Vision Card */}
        <div className="relative space-y-4 sm:space-y-8">
          {/* Vision Header */}
          <div className="flex items-center gap-3 sm:gap-4 animate-fadeIn">
            <div className="relative">
              <div className="absolute inset-0 bg-accent rounded-lg sm:rounded-xl blur-md animate-pulse" />
              <div className="relative bg-accent/20 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-accent/30">
                <Target className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-white">
                رؤيتنا للتعليم
              </h3>
              <p className="text-xs sm:text-base text-text-muted">
                نبني مستقبل التعلم الرقمي
              </p>
            </div>
          </div>

          {/* Interactive Vision Cards */}
          {features.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white/5 p-3 sm:p-4 transition-all duration-300 hover:bg-white/10 animate-slideFromLeft"
              style={{ animationDelay: `${item.delay}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div className="relative flex items-start gap-3 sm:gap-4">
                <div className="bg-white/10 p-1.5 sm:p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base text-white font-medium mb-0.5 sm:mb-1 group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-text-muted group-hover:text-white/70 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-full group-hover:translate-x-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
