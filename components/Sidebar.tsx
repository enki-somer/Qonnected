"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BookOpenIcon,
  FolderIcon,
  UsersIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import WhiteBackIcon from "./icons/WhiteBackIcon";

const navigationItems = [
  { name: "الرئيسية", href: "/", icon: HomeIcon },
  { name: "الدورات", href: "/courses", icon: BookOpenIcon },
  { name: "المشاريع", href: "/projects", icon: FolderIcon },
  { name: "المجموعات", href: "/teams", icon: UsersIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-primary-dark p-2 rounded-lg hover:bg-primary/80 transition-colors"
      >
        {isMobileMenuOpen ? (
          <WhiteBackIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-accent" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-primary-dark/80 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 right-0 z-40
          w-64 bg-primary-dark p-6 flex flex-col gap-6
          transform transition-transform duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex items-center gap-2">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-accent"
          >
            {/* Outer dark blue circle */}
            <circle cx="20" cy="20" r="20" fill="#1a1b2e" />
            {/* Yellow circle */}
            <circle cx="20" cy="20" r="16" fill="#FFD700" />
            {/* Inner dark blue circle */}
            <circle cx="20" cy="20" r="12" fill="#1a1b2e" />
            {/* Q tail - yellow rectangle */}
            <rect
              x="26"
              y="22"
              width="8"
              height="4"
              fill="#FFD700"
              transform="rotate(45 26 22)"
            />
          </svg>
          <div className="flex items-center flex-row-reverse">
            <span className="text-2xl font-bold" style={{ color: "#FFD700" }}>
              Q
            </span>
            <span className="text-2xl font-bold text-white">onnect</span>
            <span className="text-2xl font-bold" style={{ color: "#FFD700" }}>
              ED
            </span>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-accent text-primary font-medium"
                        : "text-text-muted hover:text-text hover:bg-primary/50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto">
          <Link
            href="/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-text-muted hover:text-text hover:bg-primary/50 transition-colors"
          >
            <Cog6ToothIcon className="w-5 h-5" />
            <span>الإعدادات</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
