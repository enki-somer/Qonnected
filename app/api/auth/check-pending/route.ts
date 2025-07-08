import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { comparePasswords } from '@/lib/auth';

interface PendingVerification {
  email: string;
  hashedPassword: string;
  fullName: string;
  verificationCode: string;
  verificationExpires: Date;
}

async function getPendingVerificationsCollection() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'qonnected');
  return db.collection<PendingVerification>('pendingVerifications');
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    // Check for pending verification
    const pendingVerifications = await getPendingVerificationsCollection();
    const pendingVerification = await pendingVerifications.findOne({
      email,
      verificationExpires: { $gt: new Date() }
    });

    if (pendingVerification) {
      // Check if the password matches the pending verification
      const isPasswordValid = await comparePasswords(password, pendingVerification.hashedPassword);
      
      if (isPasswordValid) {
        return NextResponse.json({
          hasPendingVerification: true,
          email: pendingVerification.email,
          fullName: pendingVerification.fullName,
        });
      }
    }

    // No pending verification found or password doesn't match
    return NextResponse.json({ hasPendingVerification: false });
  } catch (error) {
    console.error('Check pending verification error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء التحقق من وجود عملية تسجيل معلقة' },
      { status: 500 }
    );
  }
} 