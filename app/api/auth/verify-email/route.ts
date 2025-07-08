import { NextRequest, NextResponse } from 'next/server';
import { verifyCode, regenerateVerificationCode, generateToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { User } from '@/lib/mongodb';
import { getUsersCollection } from '@/lib/mongodb';
import clientPromise from '@/lib/mongodb';
import { Collection } from 'mongodb';

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

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'رمز التحقق مطلوب' },
        { status: 400 }
      );
    }
    
    await verifyEmail(token);
    
    // Redirect to login page with success message
    return NextResponse.redirect(
      new URL(`/login?verified=true`, request.url)
    );
  } catch (error) {
    console.error('Email verification error:', error);
    
    // Redirect to error page
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent((error as Error).message)}`, request.url)
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني ورمز التحقق مطلوبان' },
        { status: 400 }
      );
    }

    // Get pending verification
    const pendingVerifications = await getPendingVerificationsCollection();
    const pendingVerification = await pendingVerifications.findOne({
      email,
      verificationCode: code,
      verificationExpires: { $gt: new Date() }
    });

    if (!pendingVerification) {
      return NextResponse.json(
        { error: 'رمز التحقق غير صحيح أو منتهي الصلاحية' },
        { status: 400 }
      );
    }

    // Check if email already exists (double-check in case of race condition)
    const usersCollection = await getUsersCollection();
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني مستخدم بالفعل' },
        { status: 400 }
      );
    }

    // Create the verified user
    const now = new Date().toISOString();
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: pendingVerification.email,
      password: pendingVerification.hashedPassword,
      fullName: pendingVerification.fullName,
      phone: pendingVerification.phone,
      education: pendingVerification.education,
      city: pendingVerification.city,
      country: pendingVerification.country,
      role: 'user' as const,
      status: 'active' as const,
      emailVerified: true,
      profileComplete: true,
      createdAt: now,
      updatedAt: now,
      metadata: {
        loginCount: 0,
        lastFailedLogin: null,
        failedLoginAttempts: 0,
      }
    };

    // Insert the new user
    await usersCollection.insertOne(newUser);

    // Delete the pending verification
    await pendingVerifications.deleteOne({ _id: pendingVerification._id });

    return NextResponse.json({
      success: true,
      message: 'تم تفعيل الحساب بنجاح'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تفعيل الحساب' },
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
    console.error('Resend verification error:', error);
    
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

function verifyEmail(token: string) {
    throw new Error('Function not implemented.');
}
