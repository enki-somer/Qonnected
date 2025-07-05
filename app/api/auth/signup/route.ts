import { NextRequest, NextResponse } from 'next/server';
import { createUser, validateEmail, validatePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, phone, education, city, country } = body;

    // Validate required fields
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني وكلمة المرور والاسم الكامل مطلوبة' },
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

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: 'كلمة المرور غير قوية بما يكفي', details: passwordValidation.errors },
        { status: 400 }
      );
    }

    // Create user
    const user = await createUser({
      email: email.toLowerCase().trim(),
      password,
      fullName: fullName.trim(),
      phone: phone?.trim(),
      education: education?.trim(),
      city: city?.trim(),
      country: country?.trim(),
    });

    // Generate JWT token
    const token = generateToken(user);

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        status: user.status,
        profileComplete: user.profileComplete,
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
    console.error('Signup error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء الحساب' },
      { status: 500 }
    );
  }
} 