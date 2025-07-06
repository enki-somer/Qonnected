import Cookies from 'js-cookie'

export const handleAuthentication = (user: any) => {
  if (user) {
    // Set all necessary user data
    Cookies.set('user_role', user.role || 'user', {
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
    
    Cookies.set('user_name', user.fullName || user.email, {
      expires: 1,
      path: '/'
    })

    // Log authentication details for debugging
    console.log('User authenticated:', {
      id: user.id,
      email: user.email,
      name: user.fullName,
      role: user.role
    })

    return user.role
  } else {
    // Clear all cookies on logout
    Cookies.remove('user_role')
    Cookies.remove('user_id')
    Cookies.remove('user_email')
    Cookies.remove('user_name')
    return null
  }
} 