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

const navigationItems = [
  { name: "الرئيسية", href: "/", icon: HomeIcon },
  { name: "الشهادات", href: "/certifications", icon: FolderIcon },
];

const socialLinks = [
  {
    name: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/profile.php?id=61576599287384",
    ariaLabel: "تابعنا على فيسبوك",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://instagram.com/qonnected.academy",
    ariaLabel: "تابعنا على انستغرام",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://linkedin.com/company/qonnected-academy",
    ariaLabel: "تابعنا على لينكد إن",
  },
  {
    name: "Email",
    icon: MdOutlineEmail,
    url: "mailto:info@qonnectedacademy.com",
    ariaLabel: "راسلنا عبر البريد الإلكتروني",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, login, logout } = useAuth();

  const isCoursesActive = pathname.startsWith("/courses");

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-primary-dark/80 backdrop-blur-sm text-white hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
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
          className="lg:hidden fixed inset-0 bg-primary-dark/90 backdrop-blur-md z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 right-0 z-40
          w-[85%] sm:w-72 lg:w-64 bg-primary p-4 sm:p-6 flex flex-col gap-4 sm:gap-6
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
            <div className="flex items-center justify-between py-3 px-2 border-b border-primary-light/20">
              <div className="flex items-center gap-2 min-w-0 group">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary-light transition-all">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    {/* Outer ring */}
                    <path
                      d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z"
                      className="stroke-accent stroke-2"
                      fill="none"
                    />
                    {/* Q shape */}
                    <path
                      d="M12 6.5C15.0376 6.5 17.5 8.96243 17.5 12C17.5 15.0376 15.0376 17.5 12 17.5C8.96243 17.5 6.5 15.0376 6.5 12C6.5 8.96243 8.96243 6.5 12 6.5Z"
                      className="fill-accent"
                    />
                    {/* Q tail */}
                    <circle cx="15.5" cy="15.5" r="2" className="fill-white" />
                  </svg>
                </div>
                <Link
                  href="/settings"
                  className="truncate text-text-muted group-hover:text-text transition-colors text-sm"
                >
                  {user.user_metadata.full_name || user.email}
                </Link>
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
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-accent text-primary font-medium"
                      : "text-text-muted hover:text-text hover:bg-primary/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}

            {/* Courses Submenu */}
            <li>
              <CourseSubmenu
                isActive={isCoursesActive}
                onClose={() => setIsMobileMenuOpen(false)}
                isMobile={isMobileMenuOpen}
              />
            </li>

            {/* Settings */}
            <li>
              <Link
                href="/settings"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  pathname === "/settings"
                    ? "bg-accent text-primary font-medium"
                    : "text-text-muted hover:text-text hover:bg-primary/50"
                }`}
              >
                <Cog6ToothIcon className="w-5 h-5" />
                <span>الإعدادات</span>
              </Link>
            </li>

            {/* Logout Button */}
            {user && (
              <li>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-red-500 hover:text-red-400 hover:bg-primary/50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>تسجيل الخروج</span>
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Footer with Social Links */}
        <div className="mt-4 pt-4 border-t border-primary-light/20">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-text-muted px-4">
              تواصل معنا
            </h3>
            <div className="flex items-center justify-between px-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="group p-2 rounded-lg hover:bg-accent/10 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors duration-300" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </>
  );
}
