"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { certificationCategories } from "@/data/certifications";

// Get the logo path based on certification ID
const getCertificationLogo = (id: string): string => {
  switch (id) {
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
      return "/images/Maya.png";
    case "photoshop":
      return "/images/Photoshop.png";
    case "illustrator":
    case "indesign":
    case "dreamweaver":
      return "/images/Adobe.png";
    case "python":
      return "/images/Python.jpg";
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
    case "microsoft-word":
      return "/images/word.png";
    case "microsoft-excel":
      return "/images/excell.png";
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
    case "cisco-cyber-ops":
    case "ccna":
      return "/images/ccna.png";
    case "cisco-professional":
    case "cisco":
      return "/images/CISCO.png";
    case "ccst":
      return "/images/ccst.png";
    case "it-english":
      return "/images/Languages.png";
    case "artificial-intelligence":
      return "/images/Ai.png";
    case "cloud-computing":
    case "data-analysis":
      return "/images/online-analytical.png";
    case "databases":
      return "/images/Code.png";
    default:
      return "/images/default-certification.png";
  }
};

// Get sample certifications for testing
const getSampleCertifications = () => {
  const sample = [
    { id: "python", name: "Python", description: "برمجة Python الاحترافية" },
    { id: "java", name: "Java", description: "برمجة Java وتطوير التطبيقات" },
    {
      id: "javascript",
      name: "JavaScript",
      description: "لغة البرمجة الأساسية للويب",
    },
    { id: "html5", name: "HTML5", description: "تطوير تطبيقات الويب الحديثة" },
    { id: "photoshop", name: "Photoshop", description: "تصميم وتحرير الصور" },
    {
      id: "autocad",
      name: "AutoCAD",
      description: "التصميم الهندسي والمعماري",
    },
    {
      id: "microsoft-excel",
      name: "Excel",
      description: "تحليل البيانات المتقدم",
    },
    { id: "cisco", name: "CISCO", description: "شبكات الحاسوب المتقدمة" },
  ];

  return {
    firstRow: sample.slice(0, 4),
    secondRow: sample.slice(4, 8),
  };
};

// Marquee Card Component
const MarqueeCard = ({ certification }: { certification: any }) => {
  const logoPath = getCertificationLogo(certification.id);

  return (
    <div className="flex-shrink-0 w-60 h-24 mx-2">
      <div className="relative h-full bg-gradient-to-br from-[#1a1f2e]/90 to-[#2a2f3e]/90 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
        <div className="flex items-center h-full p-3">
          {/* Logo */}
          <div className="relative w-12 h-12 flex-shrink-0 mr-3 bg-white/10 rounded-lg">
            <Image
              src={logoPath}
              alt={certification.name}
              fill
              className="object-contain p-2"
              sizes="48px"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-white text-sm font-semibold truncate">
              {certification.name}
            </h4>
            <p className="text-white/70 text-xs truncate">
              {certification.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MarqueeComponent() {
  const { firstRow, secondRow } = getSampleCertifications();

  return (
    <div className="w-full max-w-6xl mx-auto bg-transparent relative">
      {/* Fade gradients */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-primary to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-primary to-transparent z-10" />

      <div className="space-y-4 py-6">
        {/* First Row - Moving Left */}
        <div className="h-32 flex items-center">
          <Marquee
            speed={50}
            gradient={false}
            pauseOnHover={false}
            direction="left"
            autoFill={true}
          >
            {firstRow.map((cert, index) => (
              <MarqueeCard key={`left-${index}`} certification={cert} />
            ))}
          </Marquee>
        </div>

        {/* Second Row - Moving Right */}
        <div className="h-32 flex items-center">
          <Marquee
            speed={40}
            gradient={false}
            pauseOnHover={false}
            direction="right"
            autoFill={true}
          >
            {secondRow.map((cert, index) => (
              <MarqueeCard key={`right-${index}`} certification={cert} />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
