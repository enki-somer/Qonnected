"use client";

import "./globals.css";
import { Noto_Kufi_Arabic } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import Head from "next/head";

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const navigationRoutes = ["/", "/certifications", "/courses", "/settings"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPathwayRoute = pathname?.startsWith("/pathway");

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <Head>
        <title>QonnectED - منصة التعليم والشهادات المهنية</title>
        <meta
          name="description"
          content="منصة QonnectED للتعليم والحصول على الشهادات المهنية المعتمدة"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body
        className={`${notoKufiArabic.className} bg-primary text-text dark`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            {isPathwayRoute ? (
              children
            ) : (
              <div className="min-h-screen">
                <Sidebar />
                <main className="mr-0 lg:mr-64 overflow-auto">{children}</main>
              </div>
            )}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
