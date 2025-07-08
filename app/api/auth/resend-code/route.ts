import { NextRequest, NextResponse } from 'next/server';
import { generateVerificationCode } from '@/lib/auth';
import { getUsersCollection } from '@/lib/mongodb';
import { sendVerificationEmail } from '@/lib/email';
import { Collection } from 'mongodb';
import clientPromise from '@/lib/mongodb';

interface PendingVerification {
  email: string;
  hashedPassword: string;
  fullName: string;
  phone?: string;
  education?: string;
  city?: string;
  country?: string;
  verificationCode: string;
  verificationExpires: Date;
  createdAt: string;
}

async function getPendingVerificationsCollection(): Promise<Collection<PendingVerification>> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'qonnected');
  return db.collection<PendingVerification>('pendingVerifications');
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني مطلوب' },
        { status: 400 }
      );
    }

    // Check if user already exists in users collection
    const usersCollection = await getUsersCollection();
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'هذا الحساب موجود بالفعل' },
        { status: 400 }
      );
    }

    // Get pending verification
    const pendingVerifications = await getPendingVerificationsCollection();
    const pendingVerification = await pendingVerifications.findOne({ email });

    if (!pendingVerification) {
      return NextResponse.json(
        { error: 'لم يتم العثور على طلب تسجيل معلق' },
        { status: 404 }
      );
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    const verificationExpires = new Date();
    verificationExpires.setMinutes(verificationExpires.getMinutes() + 10); // 10 minutes expiry

    // Update pending verification with new code
    await pendingVerifications.updateOne(
      { email },
      {
        $set: {
          verificationCode,
          verificationExpires,
        }
      }
    );

    // Send new verification email
    await sendVerificationEmail(
      pendingVerification.fullName,
      email,
      verificationCode,
      'signup'
    );

    return NextResponse.json({
      success: true,
      message: 'تم إرسال رمز التحقق الجديد بنجاح'
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