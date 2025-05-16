"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
  HomeIcon,
  BookOpenIcon,
  FolderIcon,
  UsersIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import WhatsAppWidget from "./WhatsAppWidget";
import CourseSubmenu from "./CourseSubmenu";
import { useRouter } from "next/navigation";

const navigationItems = [
  { name: "الرئيسية", href: "/", icon: HomeIcon },
  { name: "الشهادات", href: "/certifications", icon: FolderIcon },
  { name: "المجموعات", href: "/teams", icon: UsersIcon },
];

const socialLinks = [
  {
    name: "Facebook",
    icon: FaFacebook,
    url: "https://facebook.com/qonnected",
    ariaLabel: "تابعنا على فيسبوك",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://instagram.com/qonnected",
    ariaLabel: "تابعنا على انستغرام",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://linkedin.com/company/qonnected",
    ariaLabel: "تابعنا على لينكد إن",
  },
  {
    name: "Email",
    icon: MdOutlineEmail,
    url: "mailto:info@qonnected.com",
    ariaLabel: "راسلنا عبر البريد الإلكتروني",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const router = useRouter();

  const isCoursesActive = pathname.startsWith("/courses");

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md text-white hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
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
          w-64 bg-primary p-6 flex flex-col gap-6
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          border-l border-primary-light/20
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
          >
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/white_back.svg"
                alt="QonnectED Logo"
                width={48}
                height={48}
                className="object-contain w-full h-full"
                style={{ filter: "brightness(1)" }}
              />
            </div>
            <div className="flex items-center flex-row-reverse">
              <span className="text-2xl font-bold text-accent">Q</span>
              <span className="text-2xl font-bold text-text group-hover:text-text/90 transition-colors">
                onnect
              </span>
              <span className="text-2xl font-bold text-accent">ED</span>
            </div>
          </Link>
        </div>

        {/* User Profile Section */}
        <div className="border-b border-primary-light/20 pb-4">
          {user ? (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative p-4 rounded-xl border border-primary-light/10 hover:border-accent/20 transition-all duration-300">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent via-accent-light to-accent flex items-center justify-center text-primary-dark text-2xl font-bold">
                      {user.user_metadata?.full_name?.[0]?.toUpperCase() ||
                        user.email[0].toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-primary-dark text-xs">✓</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-text">
                      {user.user_metadata?.full_name || "مستخدم QonnectED"}
                    </div>
                    <div className="text-sm text-text-muted">{user.email}</div>
                  </div>
                  <div className="w-full flex gap-2 mt-2">
                    <button
                      onClick={() => router.push("/settings")}
                      className="flex-1 py-1.5 px-3 text-sm bg-primary-light rounded-lg hover:bg-primary-light/80 transition-colors text-text-muted hover:text-text"
                    >
                      الإعدادات
                    </button>
                    <button
                      onClick={logout}
                      className="flex-1 py-1.5 px-3 text-sm border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <button
                onClick={login}
                className="group relative w-full overflow-hidden rounded-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-dark via-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"></div>
                <div className="relative bg-primary-light backdrop-blur-sm border border-accent/20 rounded-xl p-4 transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-glow">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-accent text-lg font-medium transition-all duration-300 group-hover:text-accent-light">
                      مرحباً بك
                    </span>
                    <span className="text-text-muted text-sm transition-all duration-300 group-hover:text-text">
                      سجل دخول للمتابعة
                    </span>
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {/* Home Link */}
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

            {/* Courses Menu */}
            <li className="space-y-1">
              <CourseSubmenu
                isActive={isCoursesActive}
                onClose={() => setIsMobileMenuOpen(false)}
                isMobile={true}
              />
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-auto space-y-6">
          {/* Social Links */}
          <div className="mt-6 px-4">
            <h3 className="text-sm font-medium text-text-muted mb-3 text-right">
              تواصل معنا
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="group flex items-center justify-center p-2 rounded-lg bg-primary/20 hover:bg-accent/20 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors duration-300" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Settings */}
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

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </>
  );
}
