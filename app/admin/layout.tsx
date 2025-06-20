"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CreditCard, Users, Menu, X } from "lucide-react";
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
  const { isAdmin, authReady } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (authReady && !isAdmin) {
      console.log("Admin layout - Not admin, redirecting to home");
      router.push("/");
    }
  }, [authReady, isAdmin, router]);

  // Show nothing while checking auth
  if (!authReady || !isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#1a1f2e]">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <button
          className="fixed top-4 left-4 z-50 p-2.5 bg-[#ffffff0d] rounded-lg hover:bg-[#ffffff1a] transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="fixed inset-y-0 right-0 w-72 bg-[#1a1f2e] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-16 items-center justify-start border-b border-[#ffffff1a] pb-4">
                <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
              </div>
              <nav className="mt-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
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
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:right-0 lg:z-40 lg:border-l lg:border-[#ffffff1a] bg-[#1a1f2e]">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6">
          <div className="flex h-16 shrink-0 items-center justify-start border-b border-[#ffffff1a]">
            <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
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
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <main className="h-full">
          <div className="mx-auto px-4 sm:px-6 lg:px-16 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
