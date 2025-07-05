import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getUserById, generateToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Get current token from cookies
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح لك بالوصول' },
        { status: 401 }
      );
    }

    // Verify token and get user ID
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'رمز التحقق غير صالح' },
        { status: 401 }
      );
    }

    // Get fresh user data from database
    const user = await getUserById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'المستخدم غير موجود' },
        { status: 404 }
      );
    }

    // Generate new token with fresh data
    const newToken = generateToken(user);

    // Create response with fresh user data
    const response = NextResponse.json({
      success: true,
      message: 'تم تحديث بيانات المستخدم بنجاح',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        status: user.status,
        profileComplete: user.profileComplete,
        phone: user.phone,
        education: user.education,
        city: user.city,
        country: user.country,
      },
    });

    // Set fresh auth cookie
    response.cookies.set('auth_token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Set fresh user info cookies
    response.cookies.set('user_id', user.id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    response.cookies.set('user_email', user.email, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    response.cookies.set('user_name', user.fullName, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    response.cookies.set('user_role', user.role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Refresh error:', error);
    
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء تحديث البيانات' },
      { status: 500 }
    );
  }
} 