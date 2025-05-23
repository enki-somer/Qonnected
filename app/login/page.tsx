"use client";

import { useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";
import { handleAuthentication } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Initialize Netlify Identity
    netlifyIdentity.init();

    // Handle login
    netlifyIdentity.on("login", (user) => {
      const userRole = handleAuthentication(user);
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    });

    // Handle logout
    netlifyIdentity.on("logout", () => {
      handleAuthentication(null);
      router.push("/");
    });

    // Open the login modal
    netlifyIdentity.open("login");

    // Cleanup
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <p className="text-gray-600 text-center">
          Please login using Netlify Identity
        </p>
      </div>
    </div>
  );
}
