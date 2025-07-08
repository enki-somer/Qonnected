import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();
    
    if (!email || !code) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني ورمز التحقق مطلوبان' },
        { status: 400 }
      );
    }

    const collection = await getUsersCollection();
    
    // Find user with reset code
    const user = await collection.findOne({ 
      email,
      resetCode: code,
      resetCodeExpires: { $gt: new Date() } 
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'رمز التحقق غير صحيح أو منتهي الصلاحية' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'تم التحقق من الرمز بنجاح'
    });
  } catch (error) {
    console.error('Verify reset code error:', error);
    
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