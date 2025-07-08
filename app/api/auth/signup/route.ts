import { NextRequest, NextResponse } from 'next/server';
import { generateVerificationCode, hashPassword } from '@/lib/auth';
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
    const { email, password, fullName, phone, education, city, country } = await request.json();

    // Validate required fields
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني وكلمة المرور والاسم الكامل مطلوبة' },
        { status: 400 }
      );
    }

    // Check if email already exists in users collection
    const usersCollection = await getUsersCollection();
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني مستخدم بالفعل' },
        { status: 400 }
      );
    }

    // Check if there's a pending verification for this email
    const pendingVerifications = await getPendingVerificationsCollection();
    const existingPending = await pendingVerifications.findOne({ 
      email,
      verificationExpires: { $gt: new Date() }
    });

    // If there's an existing pending verification that hasn't expired, return the error
    if (existingPending) {
      return NextResponse.json(
        { error: 'لديك طلب تسجيل معلق. يرجى إدخال رمز التحقق المرسل أو انتظار انتهاء صلاحيته' },
        { status: 400 }
      );
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationExpires = new Date();
    verificationExpires.setMinutes(verificationExpires.getMinutes() + 10); // 10 minutes expiry

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Store verification data
    const pendingVerification: PendingVerification = {
      email,
      hashedPassword,
      fullName,
      phone,
      education,
      city,
      country,
      verificationCode,
      verificationExpires,
      createdAt: new Date().toISOString(),
    };

    // Remove any expired pending verifications for this email
    await pendingVerifications.deleteMany({
      email,
      verificationExpires: { $lte: new Date() }
    });

    // Insert new pending verification
    await pendingVerifications.insertOne(pendingVerification);

    // Send verification email
    await sendVerificationEmail(fullName, email, verificationCode, 'signup');

    return NextResponse.json({
      success: true,
      message: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني',
      user: {
        email,
        fullName,
      }
    });
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