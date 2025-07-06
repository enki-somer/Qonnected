import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Check if the request is for admin routes (both frontend and API)
  if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/api/admin')) {
    try {
      // Get required cookies
      const userRole = request.cookies.get('user_role')?.value
      const userId = request.cookies.get('user_id')?.value
      
      console.log('Middleware - Auth check:', {
        userRole,
        userId,
        path: request.nextUrl.pathname
      })

      // If no user ID, redirect to login
      if (!userId) {
        console.log('Middleware - No user ID')
        if (request.nextUrl.pathname.startsWith('/api/')) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Check if user has admin role
      if (userRole !== 'admin') {
        console.log('Middleware - Not admin:', { userRole })
        if (request.nextUrl.pathname.startsWith('/api/')) {
          return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
        }
        return NextResponse.redirect(new URL('/', request.url))
      }
      
      // User is authenticated and has admin role
      console.log('Middleware - Admin access granted')
      return NextResponse.next()
    } catch (error) {
      console.error('Middleware - Error:', error)
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Allow all other routes
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
} 