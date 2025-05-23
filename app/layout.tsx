import "./globals.css";
import { Noto_Kufi_Arabic } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import { AuthProvider } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "QonnectED",
  description: "منصة تعليمية عربية للمطورين",
  icons: {
    icon: "/white_back.svg",
    shortcut: "/white_back.svg",
    apple: "/white_back.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${notoKufiArabic.className} bg-primary text-text dark`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
