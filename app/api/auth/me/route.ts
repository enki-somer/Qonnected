import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'غير مسجل الدخول' },
        { status: 401 }
      );
    }

    // Return user info (excluding sensitive data)
    return NextResponse.json({
      success: true,
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
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء جلب بيانات المستخدم' },
      { status: 500 }
    );
  }
} 