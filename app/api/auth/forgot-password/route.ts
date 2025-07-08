import { NextRequest, NextResponse } from 'next/server';
import { generateVerificationCode, getUserByEmail } from '@/lib/auth';
import { getUsersCollection } from '@/lib/mongodb';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني مطلوب' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'لم يتم العثور على حساب بهذا البريد الإلكتروني' },
        { status: 404 }
      );
    }

    // Generate reset code
    const verificationCode = generateVerificationCode();
    const verificationExpires = new Date();
    verificationExpires.setMinutes(verificationExpires.getMinutes() + 10); // 10 minutes expiry

    // Update user with reset code
    const collection = await getUsersCollection();
    await collection.updateOne(
      { email },
      {
        $set: {
          resetCode: verificationCode,
          resetCodeExpires: verificationExpires,
          updatedAt: new Date().toISOString(),
        }
      }
    );

    // Send reset code email
    await sendVerificationEmail(
      user.fullName,
      email,
      verificationCode,
      'reset' // Add this parameter to email function to use reset template
    );

    return NextResponse.json({
      success: true,
      message: 'تم إرسال رمز التحقق بنجاح'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'حدث خطأ أثناء معالجة طلب استعادة كلمة المرور' },
      { status: 500 }
    );
  }
} 