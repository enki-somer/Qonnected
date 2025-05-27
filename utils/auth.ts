import { User } from 'netlify-identity-widget'
import Cookies from 'js-cookie'

interface ExtendedUserMetadata {
  full_name?: string;
  roles?: string[];
  avatar_url?: string;
}

export interface ExtendedUser extends Omit<User, 'app_metadata' | 'user_metadata'> {
  app_metadata?: {
    provider?: string;
    roles?: string[];
  };
  user_metadata?: ExtendedUserMetadata;
}

export const handleAuthentication = (user: ExtendedUser | null) => {
  if (user) {
    // Set the auth token
    Cookies.set('auth_token', user.token?.access_token || '', {
      expires: 1, // 1 day
      path: '/'
    })

    // Get user role from Netlify Identity metadata
    let userRole = 'user'
    
    // Check both app_metadata and user_metadata for roles
    const appMetadataRoles = user.app_metadata?.roles || []
    const userMetadataRoles = user.user_metadata?.roles || []
    
    if (appMetadataRoles.includes('admin') || userMetadataRoles.includes('admin')) {
      userRole = 'admin'
    }

    // Set all necessary user data
    Cookies.set('user_role', userRole, {
      expires: 1,
      path: '/'
    })
    
    Cookies.set('user_id', user.id, {
      expires: 1,
      path: '/'
    })
    
    Cookies.set('user_email', user.email, {
      expires: 1,
      path: '/'
    })
    
    Cookies.set('user_name', user.user_metadata?.full_name || user.email, {
      expires: 1,
      path: '/'
    })

    // Log authentication details for debugging
    console.log('User authenticated:', {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name,
      role: userRole,
      app_metadata: user.app_metadata,
      user_metadata: user.user_metadata
    })

    return userRole
  } else {
    // Clear all cookies on logout
    Cookies.remove('auth_token')
    Cookies.remove('user_role')
    Cookies.remove('user_id')
    Cookies.remove('user_email')
    Cookies.remove('user_name')
    return null
  }
} 