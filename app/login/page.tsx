"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { openAuthModal } = useAuth();

  useEffect(() => {
    // Since we now use a modal system, redirect to home and open modal
    router.push("/");
    openAuthModal("login");
  }, [router, openAuthModal]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark to-primary">
      <div className="flex items-center gap-3 text-white">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-accent"></div>
        <span>جاري إعادة التوجيه...</span>
      </div>
    </div>
  );
}
