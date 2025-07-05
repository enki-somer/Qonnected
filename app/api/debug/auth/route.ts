import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get all cookies
    const authToken = request.cookies.get('auth_token')?.value;
    const userRole = request.cookies.get('user_role')?.value;
    const userId = request.cookies.get('user_id')?.value;
    const userEmail = request.cookies.get('user_email')?.value;
    const userName = request.cookies.get('user_name')?.value;

    // Get current user from database
    const currentUser = await getCurrentUser(request);

    return NextResponse.json({
      success: true,
      cookies: {
        auth_token: authToken ? 'present' : 'missing',
        user_role: userRole,
        user_id: userId,
        user_email: userEmail,
        user_name: userName,
      },
      currentUser: currentUser ? {
        id: currentUser.id,
        email: currentUser.email,
        fullName: currentUser.fullName,
        role: currentUser.role,
        status: currentUser.status,
      } : null,
      isAdmin: currentUser?.role === 'admin',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Debug auth error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 