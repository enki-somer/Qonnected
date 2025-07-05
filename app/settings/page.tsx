"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import {
  BellIcon,
  GlobeAltIcon,
  UserIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  AcademicCapIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const settingsSections = [
  {
    id: "profile",
    title: "الملف الشخصي",
    icon: UserIcon,
    description: "تحديث معلوماتك الشخصية وبيانات الاتصال",
  },
  // {
  //   id: "billing",
  //   title: "الفواتير والمدفوعات",
  //   icon: CreditCardIcon,
  //   description: "إدارة طرق الدفع والاشتراكات",
  // },
  {
    id: "notifications",
    title: "الإشعارات",
    icon: BellIcon,
    description: "تخصيص إعدادات الإشعارات والتنبيهات",
  },
  // {
  //   id: "language",
  //   title: "اللغة والمنطقة",
  //   icon: GlobeAltIcon,
  //   description: "تعديل تفضيلات اللغة والمنطقة الزمنية",
  // },
  // {
  //   id: "privacy",
  //   title: "الخصوصية والأمان",
  //   icon: ShieldCheckIcon,
  //   description: "إدارة إعدادات الأمان وخصوصية الحساب",
  // },
];

const languageOptions = [
  { value: "ar", label: "العربية" },
  { value: "en", label: "English" },
];

const timezoneOptions = [
  { value: "Asia/Riyadh", label: "توقيت الرياض (GMT+3)" },
  { value: "Asia/Dubai", label: "توقيت دبي (GMT+4)" },
  { value: "Africa/Cairo", label: "توقيت القاهرة (GMT+2)" },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const { user, authReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (authReady) {
      if (!user) {
        router.replace("/");
      } else {
        // Add a small delay to ensure state is properly synced
        timeoutId = setTimeout(() => {
          setIsLoading(false);
        }, 100);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [authReady, user, router]);

  // Show loading state while checking auth
  if (isLoading || !authReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-lg text-text-muted">جاري التحميل...</p>
          <p className="text-sm text-text-muted mt-2">
            {!authReady ? "التحقق من تسجيل الدخول..." : "تحميل البيانات..."}
          </p>
        </div>
      </div>
    );
  }

  // If we're not loading and have no user, we shouldn't render anything
  if (!user) {
    return null;
  }

  const renderSectionContent = () => {
    const { email, fullName, phone, city, country, education } = user;

    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  defaultValue={fullName || ""}
                  className="w-full bg-primary rounded-lg px-4 py-2 text-text border border-gray-700 focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full bg-primary rounded-lg px-4 py-2 text-text border border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  defaultValue={phone || ""}
                  className="w-full bg-primary rounded-lg px-4 py-2 text-text border border-gray-700 focus:border-accent focus:ring-1 focus:ring-accent"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  المؤهل العلمي
                </label>
                <input
                  type="text"
                  defaultValue={education || ""}
                  className="w-full bg-primary rounded-lg px-4 py-2 text-text border border-gray-700 focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  المدينة
                </label>
                <input
                  type="text"
                  defaultValue={city || ""}
                  className="w-full bg-primary rounded-lg px-4 py-2 text-text border border-gray-700 focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الدولة</label>
                <input
                  type="text"
                  defaultValue={country || ""}
                  className="w-full bg-primary rounded-lg px-4 py-2 text-text border border-gray-700 focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-accent hover:bg-accent-dark text-primary px-6 py-2 rounded-lg transition-colors">
                حفظ التغييرات
              </button>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="bg-primary rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">إعدادات الإشعارات</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">إشعارات البريد الإلكتروني</p>
                    <p className="text-sm text-text-muted">
                      استلام التحديثات عبر البريد الإلكتروني
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">إشعارات الموقع</p>
                    <p className="text-sm text-text-muted">
                      استلام التنبيهات داخل المنصة
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      // case "billing":
      // case "language":
      // case "privacy":
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">الإعدادات</h1>
        <p className="text-text-muted text-xl">تخصيص إعدادات حسابك وتفضيلاتك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <nav>
            <ul className="space-y-2">
              {settingsSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-accent text-primary font-medium"
                        : "text-text-muted hover:text-text hover:bg-primary/50"
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span>{section.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="md:col-span-3 bg-primary-dark rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              {settingsSections.find((s) => s.id === activeSection)?.title}
            </h2>
            <p className="text-text-muted">
              {
                settingsSections.find((s) => s.id === activeSection)
                  ?.description
              }
            </p>
          </div>

          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
}
