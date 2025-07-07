"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "لوحة التحكم", href: "/admin", icon: LayoutDashboard },
  { name: "المدفوعات", href: "/admin/payments", icon: CreditCard },
  { name: "المستخدمين", href: "/admin/users", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin, authReady, user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (authReady && !isAdmin) {
      console.log("Admin layout - Not admin, redirecting to home");
      router.push("/");
    }
  }, [authReady, isAdmin, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // Show nothing while checking auth
  if (!authReady || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1a1f2e] flex" style={{ marginRight: 0 }}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-[#1a1f2e] border-l border-[#ffffff1a] transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Mobile header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-[#ffffff1a]">
            <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg bg-[#ffffff0d] hover:bg-[#ffffff1a] transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Mobile navigation */}
          <nav className="flex-1 px-6 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-[#ffd700] text-black font-medium"
                        : "text-white hover:bg-[#ffffff0d]"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="text-base">{item.name}</span>
                    <item.icon
                      className={`w-5 h-5 ${
                        pathname === item.href ? "text-black" : "text-[#8b95a5]"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile user info and logout */}
          <div className="border-t border-[#ffffff1a] p-6">
            <div className="mb-4">
              <p className="text-sm text-[#8b95a5]">مسجل دخول كـ</p>
              <p className="text-white font-medium truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل خروج</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:right-0 lg:z-40 lg:border-l lg:border-[#ffffff1a] bg-[#1a1f2e]">
        <div className="flex grow flex-col overflow-y-auto">
          {/* Desktop header */}
          <div className="flex h-16 shrink-0 items-center justify-start border-b border-[#ffffff1a] px-6">
            <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
          </div>

          {/* Desktop navigation */}
          <nav className="flex-1 px-6 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-[#ffd700] text-black font-medium"
                        : "text-white hover:bg-[#ffffff0d]"
                    }`}
                  >
                    <span className="text-base">{item.name}</span>
                    <item.icon
                      className={`w-5 h-5 transition-colors ${
                        pathname === item.href
                          ? "text-black"
                          : "text-[#8b95a5] group-hover:text-white"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop user info and logout */}
          <div className="border-t border-[#ffffff1a] p-6">
            <div className="mb-4">
              <p className="text-sm text-[#8b95a5]">مسجل دخول كـ</p>
              <p className="text-white font-medium truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل خروج</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-30 p-2.5 bg-[#ffffff0d] rounded-lg hover:bg-[#ffffff1a] transition-colors lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Main content */}
      <div className="flex-1 lg:mr-72">
        <main className="min-h-screen">
          <div className="px-4 sm:px-6 lg:px-8 py-6 pt-16 lg:pt-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
