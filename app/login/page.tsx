"use client";

import { useEffect } from "react";
import netlifyIdentity, { User } from "netlify-identity-widget";
import { handleAuthentication, ExtendedUser } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { isAdmin } = useAuth();

  useEffect(() => {
    // Initialize Netlify Identity
    netlifyIdentity.init();

    // Check if user is already logged in
    const user = netlifyIdentity.currentUser();
    if (user) {
      const userRole = handleAuthentication(user as ExtendedUser);
      console.log("Login page - User already logged in:", {
        userRole,
        isAdmin: userRole === "admin",
      });
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      return;
    }

    // Handle login
    netlifyIdentity.on("login", (user: User) => {
      const userRole = handleAuthentication(user as ExtendedUser);
      console.log("Login page - User logged in:", {
        userRole,
        isAdmin: userRole === "admin",
      });
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      netlifyIdentity.close(); // Close the modal after successful login
    });

    // Handle logout
    netlifyIdentity.on("logout", () => {
      console.log("Login page - User logged out");
      handleAuthentication(null);
      router.push("/");
      netlifyIdentity.close(); // Close the modal after logout
    });

    // Only open the login modal if user is not logged in
    if (!netlifyIdentity.currentUser()) {
      netlifyIdentity.open("login");
    }

    // Cleanup
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, [router, isAdmin]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1f2e] to-[#1a1f2e]/95">
      <div className="p-8 bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/5 shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          تسجيل الدخول
        </h1>
        <p className="text-[#8b95a5] text-center mb-6">يرجى تسجيل الدخول</p>
        <button
          onClick={() => netlifyIdentity.open("login")}
          className="w-full py-3.5 bg-accent hover:bg-accent-light text-black rounded-xl transition-all duration-300 text-sm font-medium"
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
}
