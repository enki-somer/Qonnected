"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import {
  X,
  Star,
  Target,
  Zap,
  Award,
  FileText,
  Printer,
  Info,
  Clock,
  DollarSign,
  Monitor,
  Globe,
  RefreshCw,
} from "lucide-react";

// Get the logo path based on certification ID
const getCertificationLogo = (id: string): string => {
  switch (id) {
    case "mos-word":
      return "/images/MS.png";
    case "mos-excel":
      return "/images/EXCEL.png";
    case "adobe-photoshop":
      return "/images/Photoshop.png";
    case "adobe-illustrator":
      return "/images/Ai.png";

    case "swift-level1":
      return "/images/swift.png";
    default:
      return "";
  }
};

// Get certification description based on certification name
const getCertificationDescription = (name: string): string => {
  if (name.includes("Microsoft Word")) {
    return "شهادة Microsoft Office Specialist (MOS) تُعد من أقوى الشهادات العالمية في مجال المهارات المكتبية، حيث تثبت قدرتك على استخدام برنامج Microsoft Word بفعالية وكفاءة في تنسيق النصوص، إنشاء المستندات، وإدارة الجداول والقوالب.\nتُمنح هذه الشهادة من شركة Microsoft، وهي معترف بها دوليًا ومطلوبة في سوق العمل، وتُعزز فرص التوظيف وتفتح لك أبوابًا مهنية جديدة.";
  } else if (name.includes("Microsoft Excel")) {
    return "شهادة Microsoft Office Specialist (MOS) في Excel تُعد من أهم الشهادات المهنية في مجال تحليل البيانات والجداول الإلكترونية، حيث تثبت إتقانك لاستخدام Excel في إنشاء الجداول المعقدة، تحليل البيانات، وإنشاء التقارير المالية.\nتُمنح هذه الشهادة من شركة Microsoft، وهي معترف بها عالمياً ومطلوبة بشدة في القطاعات المالية والمحاسبية، وتفتح أمامك فرص وظيفية متميزة.";
  } else if (name.includes("PowerPoint")) {
    return "شهادة Microsoft Office Specialist (MOS) في PowerPoint تُعد من الشهادات الأساسية في مجال العروض التقديمية المهنية، حيث تثبت قدرتك على إنشاء عروض تقديمية احترافية وجذابة باستخدام التأثيرات والانتقالات المتقدمة.\nتُمنح هذه الشهادة من شركة Microsoft، وهي معترف بها دوليًا ومطلوبة في بيئات العمل المختلفة، وتعزز مهاراتك في التواصل والعرض المهني.";
  } else if (name.includes("Outlook")) {
    return "شهادة Microsoft Office Specialist (MOS) في Outlook تُعد من الشهادات المهمة في مجال إدارة الاتصالات والتنظيم المكتبي، حيث تثبت إتقانك لإدارة البريد الإلكتروني، التقويم، والمهام بكفاءة عالية.\nتُمنح هذه الشهادة من شركة Microsoft، وهي معترف بها دوليًا وتساعد في تحسين الإنتاجية والتنظيم في بيئة العمل المهنية.";
  } else if (name.includes("Photoshop")) {
    return "شهادة Adobe Certified Expert (ACE) في Photoshop تُعد من أقوى الشهادات في مجال التصميم الجرافيكي وتحرير الصور، حيث تثبت إتقانك لاستخدام أدوات Photoshop المتقدمة في التصميم والتعديل الاحترافي.\nتُمنح هذه الشهادة من شركة Adobe، وهي معترف بها عالمياً في صناعة التصميم والإعلان، وتفتح أمامك فرص عمل متميزة في مجال الإبداع البصري.";
  } else if (name.includes("Illustrator")) {
    return "شهادة Adobe Certified Expert (ACE) في Illustrator تُعد من الشهادات الأساسية في مجال التصميم المتجهي والرسوم الرقمية، حيث تثبت قدرتك على إنشاء تصاميم احترافية للشعارات والهويات البصرية.\nتُمنح هذه الشهادة من شركة Adobe، وهي معترف بها دوليًا في وكالات الإعلان وشركات التصميم، وتؤهلك للعمل كمصمم جرافيك محترف.";
  } else if (name.includes("AutoCAD")) {
    return "شهادة Autodesk Certified User في AutoCAD تُعد من أهم الشهادات في مجال التصميم الهندسي والرسم التقني، حيث تثبت إتقانك لاستخدام AutoCAD في إنشاء المخططات الهندسية والرسوم التقنية.\nتُمنح هذه الشهادة من شركة Autodesk، وهي معترف بها عالمياً في المجالات الهندسية والمعمارية، وتفتح أمامك فرص عمل في شركات الهندسة والإنشاءات.";
  } else if (name.includes("IC3")) {
    return "شهادة IC3 (Internet and Computing Core Certification) تُعد من الشهادات الأساسية في مجال المهارات الرقمية، حيث تثبت إتقانك لاستخدام الحاسوب والإنترنت والتطبيقات المكتبية الأساسية.\nتُمنح هذه الشهادة من Certiport، وهي معترف بها دوليًا وتُعتبر نقطة انطلاق مهمة لتطوير المهارات التقنية وتحسين فرص التوظيف.";
  } else if (name.includes("Python")) {
    return "شهادة Python Programming تُعد من أهم الشهادات في مجال البرمجة الحديثة، حيث تثبت إتقانك للغة Python في تطوير التطبيقات، تحليل البيانات، والذكاء الاصطناعي.\nPython هي واحدة من أكثر لغات البرمجة طلباً في سوق العمل، وهذه الشهادة معترف بها دوليًا وتفتح أمامك فرص وظيفية متميزة في مجال التكنولوجيا.";
  } else if (name.includes("Java")) {
    return "شهادة Java Programming تُعد من الشهادات الأساسية في مجال البرمجة المتقدمة، حيث تثبت إتقانك للغة Java في تطوير التطبيقات المعقدة والأنظمة الكبيرة.\nJava هي من أكثر لغات البرمجة استخداماً في الشركات الكبرى، وهذه الشهادة معترف بها عالمياً وتؤهلك للعمل في مشاريع تطوير البرمجيات المتقدمة.";
  } else {
    return `شهادة ${name} تُعد من الشهادات المعتمدة دولياً في مجال التخصص، حيث تثبت إتقانك للمهارات والمعرفة المطلوبة في هذا المجال.\nهذه الشهادة معترف بها عالمياً وتساعد في تطوير مسارك المهني وتحسين فرص التوظيف في السوق المحلي والدولي.`;
  }
};

// Get specific certification type for conditional content
const getCertificationType = (name: string, id: string): string => {
  const lowerName = name.toLowerCase();
  const lowerId = id.toLowerCase();

  if (
    lowerName.includes("quickbooks") ||
    lowerId.includes("qb") ||
    lowerName.includes("كويك بوكس")
  ) {
    return "qb";
  } else if (
    lowerName.includes("pmi") ||
    lowerName.includes("project management ready")
  ) {
    return "pmi";
  } else if (
    lowerName.includes("esb") ||
    lowerName.includes("entrepreneurship") ||
    lowerName.includes("small business")
  ) {
    return "esb";
  } else if (lowerName.includes("autocad") || lowerId.includes("autocad")) {
    return "autocad";
  } else if (
    lowerName.includes("3d max") ||
    lowerName.includes("3ds max") ||
    lowerId.includes("3dmax")
  ) {
    return "3dmax";
  } else if (lowerName.includes("revit") || lowerId.includes("revit")) {
    return "revit";
  } else if (lowerName.includes("swift") || lowerId.includes("swift")) {
    return "swift";
  } else if (
    (lowerName.includes("ic3") && lowerName.includes("gs6")) ||
    (lowerName.includes("ic3") && lowerName.includes("global standard 6")) ||
    (lowerId.includes("ic3") && !lowerId.includes("spark"))
  ) {
    return "ic3-gs6";
  } else if (
    (lowerName.includes("ic3") && lowerName.includes("gs5")) ||
    (lowerName.includes("ic3") && lowerName.includes("global standard 5")) ||
    lowerId.includes("ic3-spark")
  ) {
    return "ic3-gs5";
  } else if (
    lowerName.includes("microsoft certified fundamentals") ||
    lowerName.includes("microsoft fundamentals") ||
    (lowerName.includes("microsoft") && lowerName.includes("fundamentals"))
  ) {
    return "microsoft-fundamentals";
  } else if (
    lowerName.includes("python") ||
    lowerName.includes("java") ||
    lowerName.includes("javascript") ||
    lowerName.includes("programming") ||
    lowerName.includes("software") ||
    lowerName.includes("development") ||
    lowerName.includes("coding") ||
    lowerName.includes("برمجة") ||
    lowerName.includes("تطوير") ||
    lowerId.includes("python") ||
    lowerId.includes("java") ||
    lowerId.includes("js")
  ) {
    return "programming";
  }
  return "default";
};

// Get specific certification exam information
const getSpecificCertificationInfo = (type: string) => {
  switch (type) {
    case "qb":
      return {
        description:
          "توفر Intuit بالتعاون مع Certiport شهادات معتمدة تساعد المتقدّمين على تطوير مهارات قوية قابلة للتطبيق في سوق العمل، في مجالات المحاسبة وريادة الأعمال والتفكير التصميمي.",
        retakePrice: "120 ألف دينار",
        additionalInfo: [],
      };
    case "pmi":
      return {
        description:
          "شهادة PMI Project Management Ready هي مدخل مثالي لتعلُّم مفاهيم إدارة المشاريع والتعرف على أدواتها ومجالات استخدامها في مسارات وظيفية متعددة.\nتُقدَّم الشهادة من معهد إدارة المشاريع العالمي (PMI)، وهو الجهة الرائدة عالمياً في هذا المجال، وتُعد هذه الشهادة خيارًا ممتازًا للراغبين في البدء بمسار مهني احترافي في إدارة المشاريع.",
        retakePrice: "85 ألف دينار",
        additionalInfo: [],
      };
    case "esb":
      return {
        description:
          "شهادة ريادة الأعمال وإدارة المشاريع الصغيرة (Entrepreneurship & Small Business – ESB) تهدف إلى قياس وفهم المفاهيم الأساسية في مجال ريادة الأعمال، وتُعد مثالية للراغبين في بدء مشروعهم الخاص أو العمل في بيئة أعمال ناشئة",
        retakePrice: "85 ألف دينار",
        additionalInfo: [
          "مفاهيم ريادة الأعمال الأساسية",
          "تقييم الفرص التجارية",
          "التخطيط لتأسيس وتشغيل المشروع",
          "التسويق والمبيعات",
          "التمويل الأولي ورأس المال الاستثماري",
          "الإدارة المالية للمشاريع الصغيرة",
        ],
      };
    case "autocad":
      return {
        description:
          "شهادة AutoCAD المعتمدة تُثبت مهارتك في استخدام برنامج AutoCAD لإعداد الرسومات الهندسية بدقة واحترافية.\nمناسبة للمهندسين والطلاب والفنيين، وهي شهادة معترف بها دوليًا من شركة Autodesk وتُعزز فرصك في سوق العمل.",
        retakePrice: "85 ألف دينار",
        additionalInfo: [],
      };
    case "3dmax":
      return {
        description: null, // Will use the default description
        retakePrice: "85 ألف دينار",
        additionalInfo: [],
      };
    case "revit":
      return {
        description: null, // Will use the default description
        retakePrice: "85 ألف دينار",
        additionalInfo: [],
      };
    case "swift":
      return {
        description:
          "شهادة App Development with Swift هي شهادة معتمدة تُظهر كفاءتك في تطوير تطبيقات iOS باستخدام لغة Swift وأدوات مثل Xcode. عند اجتياز الاختبار، يحصل المتقدِّم على شارة رقمية رسمية يمكن استخدامها في السيرة الذاتية أو البريد الإلكتروني أو منصات التوظيف.",
        retakePrice: "100 ألف دينار",
        additionalInfo: [],
      };
    case "ic3-gs6":
      return {
        description:
          "شهادة IC3 Digital Literacy بنسختها الأحدث Global Standard 6 (GS6) تهدف إلى تأهيلك بأساسيات المهارات الرقمية المطلوبة في التعليم والعمل. وهي الشهادة المثالية لكل من يريد بناء قاعدة تقنية قوية في عالم رقمي متسارع",
        retakePrice: "95 ألف دينار",
        additionalInfo: [
          "أساسيات التكنولوجيا (Technology Basics)",
          "المواطنة الرقمية (Digital Citizenship)",
          "إدارة المعلومات (Information Management)",
          "إنشاء المحتوى (Content Creation)",
          "التواصل الرقمي (Communication)",
          "التعاون الإلكتروني (Collaboration)",
          "الأمن والسلامة الرقمية (Safety and Security)",
        ],
      };
    case "ic3-gs5":
      return {
        description:
          "شهادة IC3 Digital Literacy – Global Standard 5 (GS5) تهدف إلى تزويدك بأساسيات مهارات الحاسوب والتقنية التي يحتاجها أي مستخدم في بيئة العمل أو التعليم. تُعد هذه الشهادة خيارًا مثاليًا لمن يرغب في إثبات كفاءته في التعامل مع الحاسوب، التطبيقات الأساسية، والإنترنت.",
        retakePrice: "95 ألف دينار",
        additionalInfo: [
          "💻 Computing Fundamentals – أساسيات الحاسوب ونظام التشغيل",
          "📊 Key Applications – برامج الإنتاجية مثل Microsoft Word وExcel وPowerPoint",
          "🌐 Living Online – استخدام الإنترنت والبريد الإلكتروني بأمان وكفاءة",
        ],
      };
    case "microsoft-fundamentals":
      return {
        description:
          "شهادة Microsoft Certified Fundamentals هي الخطوة الأولى لفهم مفاهيم الحوسبة السحابية (Cloud Computing)، الذكاء الاصطناعي (AI)، وتحليل البيانات (Data Science).\nتم تصميم هذه الشهادة للطلاب والمبتدئين الذين يرغبون في استكشاف مجالات التقنية المتقدمة، وتُعد مدخلًا مثاليًا للبدء في مسار مهني ناجح في تكنولوجيا المعلومات.",
        retakePrice: "80 ألف دينار",
        additionalInfo: [
          "فهم بنية الحوسبة السحابية ومفاهيم Microsoft Azure",
          "التعرف على الذكاء الاصطناعي وكيفية استخدامه",
          "فهم أساسيات تحليل البيانات وعلوم البيانات",
          "بناء أساس قوي للانتقال إلى شهادات احترافية مثل Microsoft Azure Associate أو Expert",
        ],
      };
    case "programming":
      return {
        description: null, // Will use the default description
        retakePrice: "90 ألف دينار",
        additionalInfo: [],
      };
    default:
      return null;
  }
};

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
  certification: {
    id: string;
    name: string;
    description: string;
    price: string;
    duration: string;
    level: string;
    prerequisites: string[];
    learningOutcomes: string[];
    examDetails: {
      format: string;
    };
    benefits: string[];
  };
}

export default function CertificationModal({
  isOpen,
  onClose,
  onBook,
  certification,
}: CertificationModalProps) {
  const logoPath = getCertificationLogo(certification.id);
  const certificationType = getCertificationType(
    certification.name,
    certification.id
  );
  const specificInfo = getSpecificCertificationInfo(certificationType);

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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-4xl max-h-[90vh] transform overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1f2e] via-[#1e2332] to-[#1a1f2e] text-right align-middle shadow-2xl transition-all border border-white/10 flex flex-col">
                {/* Fixed Header Section */}
                <div className="relative overflow-hidden flex-shrink-0">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10" />
                  <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-5" />

                  <div className="relative p-6 pb-4">
                    {/* Close Button */}
                    <button
                      type="button"
                      className="absolute left-4 top-4 rounded-full bg-white/10 backdrop-blur-md p-2 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#1a1f2e]"
                      onClick={onClose}
                      aria-label="إغلاق"
                    >
                      <X className="h-5 w-5" />
                    </button>

                    {/* Title Section */}
                    <div className="flex items-start gap-4 mb-4">
                      {logoPath && (
                        <div className="relative">
                          <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md p-2 border border-white/20">
                            <div className="relative w-full h-full">
                              <Image
                                src={logoPath}
                                alt={`${certification.name} logo`}
                                fill
                                sizes="64px"
                                className="object-contain"
                              />
                            </div>
                          </div>
                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-xl bg-accent/20 blur-lg -z-10" />
                        </div>
                      )}

                      <div className="flex-1">
                        <Dialog.Title
                          as="h2"
                          className="text-2xl font-bold text-white mb-2 leading-tight"
                        >
                          {certification.name}
                        </Dialog.Title>

                        {/* Test Details below title */}
                        <div className="flex items-center justify-center gap-3 mb-3">
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                            <Zap className="h-4 w-4 text-accent" />
                            <span className="text-sm text-white/90">
                              مستوى {certification.level}
                            </span>
                          </div>
                        </div>

                        <p className="text-white/80 text-sm leading-relaxed">
                          {certification.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scrollable Content Sections */}
                <div
                  className="flex-1 overflow-y-auto px-6 py-4 space-y-6"
                  data-modal-content
                >
                  {/* About the Certificate Section */}
                  <div className="bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-2xl p-6 border border-blue-500/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <Info className="h-5 w-5 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        📋 عن الشهادة
                      </h3>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <p className="text-white/90 leading-relaxed text-base whitespace-pre-line">
                        {specificInfo?.description ||
                          getCertificationDescription(certification.name)}
                      </p>

                      {/* Additional Topics/Information */}
                      {specificInfo?.additionalInfo &&
                        specificInfo.additionalInfo.length > 0 && (
                          <div className="mt-6">
                            <h5 className="text-white font-semibold mb-3">
                              {certificationType === "esb" &&
                                "تشمل المواضيع الرئيسية في الشهادة:"}
                              {certificationType === "ic3-gs6" &&
                                "🧠 تغطي الشهادة المجالات التالية:"}
                              {certificationType === "ic3-gs5" &&
                                "🧠 تغطي الشهادة المجالات التالية:"}
                              {certificationType === "microsoft-fundamentals" &&
                                "📚 الشهادة مناسبة لمن يرغب في:"}
                            </h5>
                            <div className="space-y-2">
                              {specificInfo.additionalInfo.map(
                                (topic, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-3"
                                  >
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-white/80 leading-relaxed">
                                      {topic}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* About the Exam Section */}
                  <div className="bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-2xl p-6 border border-orange-500/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-orange-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        📝 عن الاختبار
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {/* Exam Details Grid */}

                      {/* Exam Information */}
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                          <Award className="h-5 w-5 text-orange-400" />
                          🎓 معلومات حول الاختبار:
                        </h4>
                        <div className="space-y-3 text-white/80 leading-relaxed">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                            <p>
                              يتم إرسال الرمز الخاص بالاختبار إلكترونيًا
                              (Voucher) عبر البريد الإلكتروني، وهي غير قابلة
                              للاسترداد.
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                            <p>صالحة لمدة سنة واحدة من تاريخ الشراء.</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                            <p>يُرجى السماح بيومين كحد أقصى لمعالجة الطلب.</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <RefreshCw className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                            <p>
                              عند عدم النجاح يعاد الاختبار بقيمة{" "}
                              {specificInfo?.retakePrice || "65 ألف دينار"}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <Globe className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                            <p>يوجد اختبار عربي وإنجليزي</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <Monitor className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                            <p>
                              يتم الاختبار عن طريق الحاسوب وليس عن طريق الموبايل
                              أو التاب
                            </p>
                          </div>
                        </div>

                        {/* Microsoft Fundamentals Additional Exam Info */}
                        {certificationType === "microsoft-fundamentals" && (
                          <div className="bg-white/5 rounded-xl p-6 border border-white/10 mt-4">
                            <div className="space-y-3 text-white/80 leading-relaxed">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                                <p>
                                  يتم تأمين الاختبار من قبل المنصة في حال وجود
                                  أي خلل يعيق الاختبار مثلاً انقطاع الإنترنت أو
                                  الكهرباء أو أي ظرف آخر حيث تستطيع تكملة
                                  الاختبار
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Achievements Section */}
                  <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-2xl p-6 border border-accent/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Target className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        🎯 إنجازاتك بعد الحصول على الشهادة
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {certification.learningOutcomes.map((outcome, index) => (
                        <div
                          key={index}
                          className="group flex items-start gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/10 hover:border-accent/30"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-accent-light flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Star className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-white/90 group-hover:text-white transition-colors duration-300 leading-relaxed">
                            {outcome}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Services Section */}
                  <div className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl p-6 border border-purple-500/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-purple-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        ✨ خدمات إضافية مميزة
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="group flex items-start gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/10 hover:border-purple-400/30">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Printer className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1 group-hover:text-purple-200 transition-colors duration-300">
                            طباعة الشهادة الرسمية
                          </h4>
                          <p className="text-white/70 text-sm leading-relaxed">
                            احصل على نسخة مطبوعة عالية الجودة من شهادتك مع ختم
                            رسمي وتوقيع معتمد
                          </p>
                        </div>
                      </div>

                      <div className="group flex items-start gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/10 hover:border-purple-400/30">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FileText className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1 group-hover:text-purple-200 transition-colors duration-300">
                            نسخة رقمية معتمدة
                          </h4>
                          <p className="text-white/70 text-sm leading-relaxed">
                            احصل على ملف PDF رقمي قابل للتحقق مع رمز QR للمصادقة
                            الفورية
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fixed Footer with Action Button */}
                <div className="flex-shrink-0 border-t border-white/10 bg-white/5 backdrop-blur-md p-4">
                  <button
                    type="button"
                    className="w-full bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
                    onClick={onBook}
                  >
                    <Award className="h-5 w-5" />
                    <span>احجز الآن - {certification.price} IQD</span>
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
