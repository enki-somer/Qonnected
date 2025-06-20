"use client";

import { createContext, useContext, useEffect, useState } from "react";
import netlifyIdentity, { User, Token } from "netlify-identity-widget";
import { handleAuthentication } from "@/utils/auth";
import type { ExtendedUser } from "@/utils/auth";

interface AuthUser extends Omit<ExtendedUser, "token"> {
  email: string;
  id: string;
  user_metadata: {
    full_name?: string;
    phone?: string;
    education?: string;
    city?: string;
    country?: string;
    roles?: string[];
  };
  app_metadata?: {
    roles?: string[];
  };
  token?: Token;
}

interface AuthContextType {
  user: AuthUser | null;
  login: () => void;
  logout: () => void;
  authReady: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
  isAdmin: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Initialize Netlify Identity
        if (!netlifyIdentity.currentUser()) {
          netlifyIdentity.init();
        }

        // Event listener for when auth state changes
        netlifyIdentity.on("login", (user) => {
          if (mounted) {
            const authUser = user as unknown as AuthUser;
            setUser(authUser);
            const userRole = handleAuthentication(
              authUser as unknown as ExtendedUser
            );
            setIsAdmin(userRole === "admin");
            netlifyIdentity.close();
          }
        });

        netlifyIdentity.on("logout", () => {
          if (mounted) {
            setUser(null);
            setIsAdmin(false);
            handleAuthentication(null);
          }
        });

        netlifyIdentity.on("init", () => {
          if (mounted) {
            const currentUser =
              netlifyIdentity.currentUser() as unknown as AuthUser | null;
            if (currentUser) {
              setUser(currentUser);
              const userRole = handleAuthentication(
                currentUser as unknown as ExtendedUser
              );
              setIsAdmin(userRole === "admin");
            }
            setAuthReady(true);
          }
        });

        // Check if user is already logged in
        const currentUser =
          netlifyIdentity.currentUser() as unknown as AuthUser | null;
        if (currentUser && mounted) {
          setUser(currentUser);
          const userRole = handleAuthentication(
            currentUser as unknown as ExtendedUser
          );
          setIsAdmin(userRole === "admin");
          setAuthReady(true);
        } else {
          setAuthReady(true);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setAuthReady(true); // Set ready even on error to prevent infinite loading
        }
      }
    };

    initializeAuth();

    // Cleanup
    return () => {
      mounted = false;
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
      netlifyIdentity.off("init");
    };
  }, []);

  const login = () => {
    netlifyIdentity.open("login");
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const contextValue = {
    user,
    login,
    logout,
    authReady,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
