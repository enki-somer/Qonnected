import { useState, useEffect } from 'react';
import netlifyIdentity, { User } from 'netlify-identity-widget';
import { handleAuthentication, ExtendedUser } from '@/utils/auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Netlify Identity
    netlifyIdentity.init();

    // Check initial authentication state
    const currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      handleAuthentication(currentUser as ExtendedUser);
      setIsAuthenticated(true);
      setUser(currentUser as ExtendedUser);
    }
    setIsLoading(false);

    // Handle login events
    const handleLogin = (user: User) => {
      handleAuthentication(user as ExtendedUser);
      setIsAuthenticated(true);
      setUser(user as ExtendedUser);
      netlifyIdentity.close();
    };

    // Handle logout events
    const handleLogout = () => {
      handleAuthentication(null);
      setIsAuthenticated(false);
      setUser(null);
      netlifyIdentity.close();
    };

    netlifyIdentity.on('login', handleLogin);
    netlifyIdentity.on('logout', handleLogout);

    return () => {
      netlifyIdentity.off('login', handleLogin);
      netlifyIdentity.off('logout', handleLogout);
    };
  }, []);

  const login = () => {
    netlifyIdentity.open('login');
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout
  };
}; 