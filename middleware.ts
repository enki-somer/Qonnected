import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Check if the request is for admin routes (both frontend and API)
  if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/api/admin')) {
    try {
      // Get the token from the cookies
      const token = request.cookies.get('auth_token')
      
      // If no token, redirect to login for frontend routes or return 401 for API routes
      if (!token) {
        if (request.nextUrl.pathname.startsWith('/api/')) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Get the user role from the token
      // You should implement proper token verification here
      // This is just a basic example
      const userRole = request.cookies.get('user_role')?.value

      if (userRole !== 'admin') {
        if (request.nextUrl.pathname.startsWith('/api/')) {
          return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
        }
        return NextResponse.redirect(new URL('/', request.url))
      }
      
      return NextResponse.next()
    } catch (error) {
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