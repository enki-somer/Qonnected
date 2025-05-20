"use client";

import { createContext, useContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

interface User {
  email: string;
  user_metadata: {
    full_name?: string;
    phone?: string;
    education?: string;
    city?: string;
    country?: string;
  };
  token?: {
    access_token: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  authReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

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
            setUser(user as User);
            netlifyIdentity.close();
          }
        });

        netlifyIdentity.on("logout", () => {
          if (mounted) {
            setUser(null);
          }
        });

        netlifyIdentity.on("init", () => {
          if (mounted) {
            const currentUser = netlifyIdentity.currentUser();
            setUser(currentUser as User | null);
            setAuthReady(true);
          }
        });

        // Check if user is already logged in
        const currentUser = netlifyIdentity.currentUser();
        if (currentUser && mounted) {
          setUser(currentUser as User);
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
