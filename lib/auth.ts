import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsersCollection, User } from './mongodb';
import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { sendVerificationEmail } from './email';

// Re-export getUsersCollection for convenience
export { getUsersCollection };

// JWT secret - should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Password hashing
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Password verification
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// JWT token handling
export const generateToken = (user: User): string => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    fullName: user.fullName,
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// User validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('يجب أن تحتوي كلمة المرور على رقم واحد على الأقل');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Generate email verification token
export const generateVerificationToken = (email: any) => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate verification code
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create user with verification code
export const createUser = async (userData: {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  education?: string;
  city?: string;
  country?: string;
}) => {
  const collection = await getUsersCollection();
  
  // Check if user already exists
  const existingUser = await collection.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('البريد الإلكتروني مستخدم بالفعل');
  }
  
  // Hash password
  const hashedPassword = await hashPassword(userData.password);
  
  // Generate verification code
  const verificationCode = generateVerificationCode();
  const verificationExpires = new Date();
  verificationExpires.setMinutes(verificationExpires.getMinutes() + 10); // 10 minutes expiry
  
  // Create user document
  const user = {
    id: generateUserId(),
    email: userData.email,
    password: hashedPassword,
    fullName: userData.fullName,
    phone: userData.phone,
    education: userData.education,
    city: userData.city,
    country: userData.country,
    role: 'user' as const,
    status: 'pending' as const,
    emailVerified: false,
    verificationCode,
    verificationExpires,
    profileComplete: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: {
      loginCount: 0,
      lastFailedLogin: null,
      failedLoginAttempts: 0,
    },
  };
  
  // Insert user
  const result = await collection.insertOne(user);
  if (!result.insertedId) {
    throw new Error('فشل في إنشاء المستخدم');
  }

  // Send verification code email
  await sendVerificationEmail(user.fullName, user.email, verificationCode);
  
  return { ...user, id: result.insertedId.toString() };
};

// Verify code
export const verifyCode = async (email: string, code: string) => {
  const collection = await getUsersCollection();
  
  // Find user with code
  const user = await collection.findOne({ 
    email,
    verificationCode: code,
    verificationExpires: { $gt: new Date() } 
  });
  
  if (!user) {
    return { 
      success: false, 
      error: 'رمز التحقق غير صحيح أو منتهي الصلاحية' 
    };
  }
  
  // Update user
  const result = await collection.updateOne(
    { _id: user._id },
    {
      $set: {
        emailVerified: true,
        status: 'active',
        verificationCode: null,
        verificationExpires: null,
        updatedAt: new Date().toISOString(),
      }
    }
  );
  
  if (result.modifiedCount !== 1) {
    return { 
      success: false, 
      error: 'فشل في تحديث حالة التحقق' 
    };
  }
  
  return { 
    success: true, 
    user: { ...user, id: user._id.toString() } 
  };
};

// Regenerate verification code
export const regenerateVerificationCode = async (email: string) => {
  const collection = await getUsersCollection();
  
  // Find user
  const user = await collection.findOne({ email });
  if (!user) {
    throw new Error('المستخدم غير موجود');
  }
  
  if (user.emailVerified) {
    throw new Error('البريد الإلكتروني مؤكد بالفعل');
  }
  
  // Generate new code
  const verificationCode = generateVerificationCode();
  const verificationExpires = new Date();
  verificationExpires.setMinutes(verificationExpires.getMinutes() + 10);
  
  // Update user
  await collection.updateOne(
    { _id: user._id },
    {
      $set: {
        verificationCode,
        verificationExpires,
        updatedAt: new Date().toISOString(),
      }
    }
  );
  
  // Send new verification code
  await sendVerificationEmail(user.fullName, user.email, verificationCode);
  
  return { success: true };
};

// User authentication
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  const collection = await getUsersCollection();
  
  // Find user
  const user = await collection.findOne({ email });
  if (!user) {
    return null;
  }
  
  // Verify password
  const isValidPassword = await comparePasswords(password, user.password);
  if (!isValidPassword) {
    return null;
  }
  
  // Update last login
  await collection.updateOne(
    { _id: user._id },
    {
      $set: {
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      $inc: {
        'metadata.loginCount': 1,
      },
    }
  );
  
  return user;
};

// Get current user from request
export const getCurrentUser = async (request: NextRequest): Promise<User | null> => {
  try {
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return null;
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return null;
    }
    
    const collection = await getUsersCollection();
    const user = await collection.findOne({ id: decoded.userId });
    
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Get user by ID
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const collection = await getUsersCollection();
    const user = await collection.findOne({ id: userId });
    
    return user;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
};

// Update user
export const updateUser = async (userId: string, updates: Partial<User>): Promise<User | null> => {
  const collection = await getUsersCollection();
  
  const result = await collection.findOneAndUpdate(
    { id: userId },
    {
      $set: {
        ...updates,
        updatedAt: new Date().toISOString(),
      },
    },
    { returnDocument: 'after' }
  );
  
  return result || null;
};

// Get all users (for admin)
export const getAllUsers = async (filters?: {
  role?: 'user' | 'admin';
  status?: 'active' | 'suspended';
  search?: string;
  skip?: number;
  limit?: number;
}): Promise<User[]> => {
  const collection = await getUsersCollection();
  
  const query: any = {};
  
  if (filters?.role) {
    query.role = filters.role;
  }
  
  if (filters?.status) {
    query.status = filters.status;
  }
  
  if (filters?.search) {
    query.$or = [
      { fullName: { $regex: filters.search, $options: 'i' } },
      { email: { $regex: filters.search, $options: 'i' } },
    ];
  }
  
  let cursor = collection.find(query).sort({ createdAt: -1 });
  
  // Apply pagination if provided
  if (filters?.skip !== undefined) {
    cursor = cursor.skip(filters.skip);
  }
  
  if (filters?.limit !== undefined) {
    cursor = cursor.limit(filters.limit);
  }
  
  const users = await cursor.toArray();
  return users;
};

// Check if user is admin
export const isAdmin = (user: User): boolean => {
  return user.role === 'admin';
};

// Generate user ID
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const collection = await getUsersCollection();
    const user = await collection.findOne({ email });
    return user;
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
}; 