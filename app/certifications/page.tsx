"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const certificationCategories = [
  {
    id: "language",
    name: "اختبارات اللغة",
    exams: [
      {
        id: "toefl",
        name: "TOEFL",
        description: "اختبار اللغة الإنجليزية كلغة أجنبية",
        level: "متقدم",
        duration: "3 ساعات",
        sections: ["القراءة", "الاستماع", "التحدث", "الكتابة"],
        price: "$250",
        nextDate: "2024-05-15",
      },
      {
        id: "ielts",
        name: "IELTS",
        description: "نظام اختبار اللغة الإنجليزية الدولي",
        level: "متقدم",
        duration: "2:45 ساعات",
        sections: ["القراءة", "الاستماع", "التحدث", "الكتابة"],
        price: "$240",
        nextDate: "2024-05-20",
      },
    ],
  },
  {
    id: "tech",
    name: "الشهادات التقنية",
    exams: [
      {
        id: "comptia",
        name: "CompTIA Security+",
        description: "شهادة أمن المعلومات الأساسية",
        level: "متوسط",
        duration: "90 دقيقة",
        sections: ["أمن الشبكات", "التهديدات والثغرات", "التشفير"],
        price: "$370",
        nextDate: "2024-05-10",
      },
      {
        id: "cissp",
        name: "CISSP",
        description: "أخصائي أمن نظم المعلومات المعتمد",
        level: "خبير",
        duration: "6 ساعات",
        sections: ["إدارة المخاطر", "أمن الشبكات", "تطوير البرمجيات الآمنة"],
        price: "$699",
        nextDate: "2024-06-01",
      },
    ],
  },
];

export default function CertificationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCertifications = certificationCategories.flatMap((category) =>
    category.exams.filter(
      (exam) =>
        (selectedCategory === "all" || category.id === selectedCategory) &&
        (exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exam.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          الشهادات المهنية والاختبارات
        </h1>
        <p className="text-text-muted">
          اكتشف مجموعة واسعة من الشهادات المهنية والاختبارات المعتمدة دولياً
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="ابحث عن شهادة..."
            className="w-full pl-4 pr-10 py-2 rounded-lg bg-primary-dark border border-primary-light/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 rounded-lg bg-primary-dark border border-primary-light/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">جميع الفئات</option>
          {certificationCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertifications.map((exam) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary-dark rounded-xl p-6 border border-primary-light/10 hover:border-accent transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">{exam.name}</h3>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                {exam.level}
              </span>
            </div>
            <p className="text-text-muted mb-4">{exam.description}</p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-muted">المدة:</span>
                <span>{exam.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">السعر:</span>
                <span>{exam.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">التاريخ القادم:</span>
                <span>{exam.nextDate}</span>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">الأقسام:</h4>
              <div className="flex flex-wrap gap-2">
                {exam.sections.map((section) => (
                  <span
                    key={section}
                    className="px-3 py-1 bg-primary rounded-full text-sm"
                  >
                    {section}
                  </span>
                ))}
              </div>
            </div>
            <button className="w-full mt-6 px-4 py-2 bg-accent hover:bg-accent/90 text-primary font-medium rounded-lg transition-colors">
              سجل الآن
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
