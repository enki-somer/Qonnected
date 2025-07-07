"use client";

import "./globals.css";
import { Noto_Kufi_Arabic } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import Head from "next/head";

// Optimize font loading
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"], // Preload only essential weights
  display: "swap",
  preload: true,
  fallback: ["Arial"],
  adjustFontFallback: true,
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPathwayRoute = pathname?.startsWith("/pathway");
  const isAdminRoute = pathname?.startsWith("/admin");
  const { isAuthModalOpen, closeAuthModal, authModalMode } = useAuth();

  return (
    <>
      {isPathwayRoute || isAdminRoute ? (
        children
      ) : (
        <div className="min-h-screen">
          <Sidebar />
          <main className="mr-0 lg:mr-64 overflow-auto">{children}</main>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authModalMode}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={notoKufiArabic.className}
      suppressHydrationWarning
    >
      <head>
        <title>Qonnected Academy</title>
        <meta
          name="description"
          content="منصة QonnectED للتعليم والحصول على الشهادات المهنية المعتمدة"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-primary text-text dark" suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
