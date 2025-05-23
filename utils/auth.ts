import { User } from 'netlify-identity-widget'
import Cookies from 'js-cookie'

export const handleAuthentication = (user: User | null) => {
  if (user) {
    // Set the auth token
    Cookies.set('auth_token', user.token?.access_token || '', {
      expires: 1, // 1 day
      path: '/'
    })

    // Set the user role
    const userRole = user.app_metadata?.roles?.includes('admin') ? 'admin' : 'user'
    Cookies.set('user_role', userRole, {
      expires: 1, // 1 day
      path: '/'
    })

    return userRole
  } else {
    // Clear cookies on logout
    Cookies.remove('auth_token')
    Cookies.remove('user_role')
    return null
  }
} 