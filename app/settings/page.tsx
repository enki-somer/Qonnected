"use client";

import { useState } from "react";
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
            {/* Placeholder for settings content */}
            <div className="bg-primary/50 rounded-lg p-4 text-text-muted text-center">
              محتوى الإعدادات قيد التطوير
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
