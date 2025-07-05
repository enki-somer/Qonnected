"use client";

import { useState, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
  { name: "الرئيسية", href: "/", icon: HomeIcon },
  { name: "الاختبارات", href: "/certifications", icon: FolderIcon },
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
  const { user, login, logout, openAuthModal } = useAuth();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const isCoursesActive = pathname.startsWith("/courses");

  // Handle scroll to hide/show mobile menu button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <div className="flex flex-col h-[calc(100vh-2rem)] p-3 sm:p-4 gap-2 sm:gap-3 overflow-y-auto sidebar-scroll">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src="/Qlogo.png"
              alt="QonnectED Logo"
              width={48}
              height={48}
              className="object-contain w-full h-full"
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
      <div className="border-b border-primary-light/20 pb-2">
        {user ? (
          <div className="flex items-center justify-between py-3 px-2 border-b border-primary-light/20">
            <div className="flex items-center gap-2 min-w-0 group">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary-light transition-all">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z"
                    className="stroke-accent stroke-2"
                    fill="none"
                  />
                  <path
                    d="M12 6.5C15.0376 6.5 17.5 8.96243 17.5 12C17.5 15.0376 15.0376 17.5 12 17.5C8.96243 17.5 6.5 15.0376 6.5 12C6.5 8.96243 8.96243 6.5 12 6.5Z"
                    className="fill-accent"
                  />
                  <circle cx="15.5" cy="15.5" r="2" className="fill-white" />
                </svg>
              </div>
              <Link
                href="/settings"
                className="truncate text-text-muted group-hover:text-text transition-colors text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {user.fullName || user.email}
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => {
                openAuthModal("login");
                setIsMobileMenuOpen(false);
              }}
              className="group relative w-full overflow-hidden rounded-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-dark via-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"></div>
              <div className="relative bg-primary-light backdrop-blur-sm border border-accent/20 rounded-xl p-4 transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-glow">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-accent text-lg font-medium transition-all duration-300 group-hover:text-accent-light">
                    مرحباً بك
                  </span>
                  <span className="text-text-muted text-sm transition-all duration-300 group-hover:text-text">
                    سجل الدخول
                  </span>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav>
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
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}

          {/* Course Submenu */}
          <CourseSubmenu
            isActive={isCoursesActive}
            onClose={() => setIsMobileMenuOpen(false)}
          />

          {/* Settings - Only show when user is logged in */}
          {user && (
            <li>
              <Link
                href="/settings"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  pathname === "/settings"
                    ? "bg-accent text-primary font-medium"
                    : "text-text-muted hover:text-text hover:bg-primary/50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Cog6ToothIcon className="w-5 h-5" />
                <span>الإعدادات</span>
              </Link>
            </li>
          )}

          {/* Logout Button */}
          {user && (
            <li>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
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

      {/* Academy Title */}
      <div className="flex justify-center pt-4 pb-2">
        <div className="w-48 h-auto group">
          <div className="relative overflow-hidden">
            {/* Signature Animation Container */}
            {/* Animated underline effect */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent via-accent-light to-accent opacity-0 animate-signature-underline"></div>
          </div>
        </div>
      </div>

      {/* Footer with Social Links */}
      <div className="mt-auto pt-3 border-t border-primary-light/20">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-text-muted px-3">
            تواصل معنا
          </h3>
          <div className="flex items-center justify-between px-3 relative">
            {socialLinks.map((social, index) => (
              <div key={social.name} className="relative">
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="group relative p-2 rounded-lg hover:bg-accent/10 transition-all duration-300 transform hover:scale-125 block z-10 bg-primary"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {/* Glowing ring effect */}
                  <div className="absolute inset-0 rounded-lg bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  <social.icon className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-500 group-hover:rotate-[360deg] relative z-10" />
                  {/* Floating particles */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute -top-1 -right-1 w-1 h-1 bg-accent rounded-full animate-float-1"></div>
                    <div className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-accent-light rounded-full animate-float-2"></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            type="button"
            className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-primary-dark/80 backdrop-blur-sm text-white hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent shadow-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-primary-dark/90 backdrop-blur-md z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - Always visible */}
      <aside className="hidden lg:block fixed inset-y-0 right-0 z-40 w-64 bg-primary border-l border-primary-light/20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar - Slides in/out */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobileMenuOpen ? "0%" : "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="lg:hidden fixed inset-y-0 right-0 z-40 w-[85%] sm:w-72 bg-primary border-l border-primary-light/20"
      >
        <SidebarContent />
      </motion.aside>

      {/* WhatsApp Widget - Always visible */}
      <WhatsAppWidget />
    </>
  );
}
