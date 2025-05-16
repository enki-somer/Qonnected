"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import {
  BellIcon,
  GlobeAltIcon,
  UserIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const settingsSections = [
  {
    id: "profile",
    title: "الملف الشخصي",
    icon: UserIcon,
    description: "تحديث معلوماتك الشخصية وإعدادات حسابك",
  },
  {
    id: "notifications",
    title: "الإشعارات",
    icon: BellIcon,
    description: "تخصيص إعدادات الإشعارات والتنبيهات",
  },
  {
    id: "language",
    title: "اللغة والمنطقة",
    icon: GlobeAltIcon,
    description: "تغيير لغة التطبيق وإعدادات المنطقة",
  },
  {
    id: "privacy",
    title: "الخصوصية والأمان",
    icon: ShieldCheckIcon,
    description: "إدارة إعدادات الخصوصية وأمان حسابك",
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const { user, authReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Add a small delay to prevent flash of loading state
    const timer = setTimeout(() => {
      if (authReady) {
        setIsLoading(false);
        if (!user) {
          router.push("/");
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [authReady, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <ArrowPathIcon className="animate-spin h-12 w-12 text-accent mx-auto mb-4" />
          <p className="text-lg text-text-muted">جاري تحميل الإعدادات...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">الإعدادات</h1>
        <p className="text-text-muted text-xl">تخصيص إعدادات حسابك وتفضيلاتك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="md:col-span-1">
          <nav className="space-y-2 sticky top-8">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-accent text-primary-dark shadow-lg"
                    : "text-text-muted hover:bg-primary-light hover:text-text"
                }`}
              >
                <section.icon className="w-5 h-5 flex-shrink-0" />
                <div className="text-right">
                  <div className="font-medium">{section.title}</div>
                  <div className="text-xs opacity-75">
                    {section.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3">
          <div className="bg-primary-light rounded-xl p-6 shadow-lg">
            {activeSection === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">الملف الشخصي</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full bg-primary rounded-lg px-4 py-2 text-text border border-primary-light focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        defaultValue={user.user_metadata?.full_name || ""}
                        className="w-full bg-primary rounded-lg px-4 py-2 text-text border border-primary-light focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                      />
                    </div>
                    <div className="pt-4">
                      <button className="bg-accent text-primary-dark px-6 py-2 rounded-lg hover:bg-accent-light transition-colors duration-200">
                        حفظ التغييرات
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Add other section content here */}
          </div>
        </div>
      </div>
    </div>
  );
}
