import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, generateToken, validateEmail } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'صيغة البريد الإلكتروني غير صحيحة' },
        { status: 400 }
      );
    }

    // Authenticate user
    const user = await authenticateUser(email.toLowerCase().trim(), password);
    
    if (!user) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // Check if user is suspended
    if (user.status === 'suspended') {
      return NextResponse.json(
        { error: 'تم إيقاف حسابك. يرجى التواصل مع الدعم الفني' },
        { status: 403 }
      );
    }

    // Generate JWT token
    const token = generateToken(user);

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
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

    // Set auth cookie
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Set user info cookies (for compatibility with existing code)
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
    console.error('Signin error:', error);
    
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تسجيل الدخول' },
      { status: 500 }
    );
  }
} 