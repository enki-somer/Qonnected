import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'تم تسجيل الخروج بنجاح',
    });

    // Clear all auth cookies
    const cookieOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 0,
      path: '/',
    };

    response.cookies.set('auth_token', '', {
      ...cookieOptions,
      httpOnly: true,
    });

    response.cookies.set('user_id', '', cookieOptions);
    response.cookies.set('user_email', '', cookieOptions);
    response.cookies.set('user_name', '', cookieOptions);
    response.cookies.set('user_role', '', cookieOptions);

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تسجيل الخروج' },
      { status: 500 }
    );
  }
} 