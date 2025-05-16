"use client";

import { createContext, useContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

interface User {
  email: string;
  user_metadata: {
    full_name?: string;
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
    // Initialize Netlify Identity
    netlifyIdentity.init();

    // Event listener for when auth state changes
    netlifyIdentity.on("login", (user) => {
      setUser(user as User);
      netlifyIdentity.close();
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
    });

    netlifyIdentity.on("init", () => {
      setUser(netlifyIdentity.currentUser() as User | null);
      setAuthReady(true);
    });

    // Cleanup
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  const login = () => {
    netlifyIdentity.open("login");
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const context = { user, login, logout, authReady };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
