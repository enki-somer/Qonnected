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

    // Check if user is already logged in
    const user = netlifyIdentity.currentUser();
    if (user) {
      const userRole = handleAuthentication(user);
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      return;
    }

    // Handle login
    netlifyIdentity.on("login", (user) => {
      const userRole = handleAuthentication(user);
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      netlifyIdentity.close(); // Close the modal after successful login
    });

    // Handle logout
    netlifyIdentity.on("logout", () => {
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
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <p className="text-gray-600 text-center">
          Please login using Netlify Identity
        </p>
        <button
          onClick={() => netlifyIdentity.open("login")}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
}
