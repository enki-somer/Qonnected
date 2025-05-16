"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import WhatsAppWidget from "./WhatsAppWidget";
import CourseSubmenu from "./CourseSubmenu";

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

  const isCoursesActive = pathname.startsWith("/courses");

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-primary-dark p-2 rounded-lg hover:bg-primary/80 transition-colors"
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="w-6 h-6 text-accent" />
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
          transform transition-transform duration-300 ease-in-out overflow-y-auto
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
              <span
                className="text-2xl font-bold group-hover:text-accent transition-colors"
                style={{ color: "#FFD700" }}
              >
                Q
              </span>
              <span className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors">
                onnect
              </span>
              <span
                className="text-2xl font-bold group-hover:text-accent transition-colors"
                style={{ color: "#FFD700" }}
              >
                ED
              </span>
            </div>
          </Link>
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
