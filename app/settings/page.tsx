"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import {
  BellIcon,
  GlobeAltIcon,
  UserIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const settingsSections = [
  {
    id: "profile",
    title: "الملف الشخصي",
    icon: UserIcon,
  },
  {
    id: "notifications",
    title: "الإشعارات",
    icon: BellIcon,
  },
  {
    id: "language",
    title: "اللغة والمنطقة",
    icon: GlobeAltIcon,
  },
  {
    id: "privacy",
    title: "الخصوصية والأمان",
    icon: ShieldCheckIcon,
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const { user, authReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authReady && !user) {
      router.push("/");
    }
  }, [authReady, user, router]);

  if (!authReady || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-lg text-text-muted">جاري التحميل...</p>
        </div>
      </div>
    );
  }

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
              قم بتعديل إعدادات{" "}
              {settingsSections
                .find((s) => s.id === activeSection)
                ?.title.toLowerCase()}
            </p>
          </div>

          <div className="space-y-6">
            {activeSection === "profile" && (
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
                      className="w-full bg-primary rounded-lg px-4 py-2 text-text border border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      defaultValue={user.user_metadata.full_name || ""}
                      className="w-full bg-primary rounded-lg px-4 py-2 text-text border border-gray-700"
                    />
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
