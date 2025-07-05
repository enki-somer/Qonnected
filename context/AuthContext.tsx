"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "admin";
  status: "active" | "suspended";
  profileComplete: boolean;
  phone?: string;
  education?: string;
  city?: string;
  country?: string;
  createdAt: string;
  lastLogin?: string;
  emailVerified: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    education?: string;
    city?: string;
    country?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  authReady: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  // Modal state
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: "login" | "signup") => void;
  closeAuthModal: () => void;
  authModalMode: "login" | "signup";
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false }),
  logout: async () => {},
  authReady: false,
  isAdmin: false,
  isAuthenticated: false,
  refreshUser: async () => {},
  // Modal state defaults
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  authModalMode: "login",
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup">(
    "login"
  );
  const router = useRouter();

  // Check if user is authenticated
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  // Modal functions
  const openAuthModal = (mode: "login" | "signup" = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Fetch current user from API
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else {
        // Any non-200 response means user is not authenticated
        setUser(null);
        // Only log unexpected errors (not 401)
        if (response.status !== 401) {
          console.error(
            "Unexpected response from /api/auth/me:",
            response.status
          );
        }
      }
    } catch (error) {
      // Only log actual errors, not expected auth failures
      if (
        error instanceof Error &&
        !error.message.includes("DYNAMIC_SERVER_USAGE")
      ) {
        console.error("Error fetching current user:", error);
      }
      setUser(null);
    }
  };

  // Refresh user data from database (useful when user data changes)
  const refreshUserData = async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
        }
      } else if (response.status === 401) {
        // 401 is expected when user is not logged in - don't log as error
        setUser(null);
      } else {
        // Log other HTTP errors
        console.error(
          "Unexpected response from /api/auth/refresh:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  // Initialize authentication on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        await fetchCurrentUser();
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setAuthReady(true);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || "فشل في تسجيل الدخول" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "حدث خطأ أثناء تسجيل الدخول" };
    }
  };

  // Signup function
  const signup = async (userData: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    education?: string;
    city?: string;
    country?: string;
  }) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || "فشل في إنشاء الحساب" };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: "حدث خطأ أثناء إنشاء الحساب" };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Clear user state even if API call fails
      setUser(null);
      router.push("/");
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    await refreshUserData();
  };

  const contextValue = {
    user,
    login,
    signup,
    logout,
    authReady,
    isAdmin,
    isAuthenticated,
    refreshUser,
    // Modal state
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    authModalMode,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
