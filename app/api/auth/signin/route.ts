import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/mongodb';
import { comparePasswords, generateToken } from '@/lib/auth';
import { Collection } from 'mongodb';
import clientPromise from '@/lib/mongodb';

interface PendingVerification {
  email: string;
  hashedPassword: string;
  fullName: string;
  verificationCode: string;
  verificationExpires: Date;
}

async function getPendingVerificationsCollection(): Promise<Collection<PendingVerification>> {
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

    // Check for pending verification first
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
          error: 'يرجى إكمال عملية التحقق من البريد الإلكتروني أولاً',
          pendingVerification: {
            email: pendingVerification.email,
            fullName: pendingVerification.fullName,
          }
        }, { status: 403 });
      }
    }

    // Get user from main collection
    const collection = await getUsersCollection();
    const user = await collection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      // Update failed login attempts
      await collection.updateOne(
        { email },
        {
          $inc: { 'metadata.failedLoginAttempts': 1 },
          $set: {
            'metadata.lastFailedLogin': new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        }
      );

      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        { error: 'يرجى تفعيل حسابك من خلال البريد الإلكتروني أولاً' },
        { status: 403 }
      );
    }

    // Check if account is active
    if (user.status !== 'active') {
      return NextResponse.json(
        { error: 'هذا الحساب معلق. يرجى التواصل مع الدعم الفني' },
        { status: 403 }
      );
    }

    // Generate JWT token
    const token = generateToken(user);

    // Update login metadata
    await collection.updateOne(
      { email },
      {
        $inc: { 'metadata.loginCount': 1 },
        $set: {
          'metadata.failedLoginAttempts': 0,
          'metadata.lastFailedLogin': null,
          lastLogin: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      }
    );

    // Create response with auth token
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
      }
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
    console.error('Login error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تسجيل الدخول' },
      { status: 500 }
    );
  }
} 