import { NextRequest, NextResponse } from 'next/server';
import { verifyCode, regenerateVerificationCode } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();
    
    if (!email || !code) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني ورمز التحقق مطلوبان' },
        { status: 400 }
      );
    }
    
    const result = await verifyCode(email, code);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'تم تأكيد الحساب بنجاح',
        user: result.user
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'رمز التحقق غير صحيح' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Verification code error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'حدث خطأ أثناء التحقق من الرمز' },
      { status: 500 }
    );
  }
}

// Endpoint for resending verification code
export async function PUT(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني مطلوب' },
        { status: 400 }
      );
    }
    
    const result = await regenerateVerificationCode(email);
    
    return NextResponse.json({
      success: true,
      message: 'تم إعادة إرسال رمز التحقق بنجاح'
    });
  } catch (error) {
    console.error('Resend verification code error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إعادة إرسال رمز التحقق' },
      { status: 500 }
    );
  }
} 