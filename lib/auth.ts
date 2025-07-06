import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsersCollection, User } from './mongodb';
import { NextRequest } from 'next/server';

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

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
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

// User creation
export const createUser = async (userData: {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  education?: string;
  city?: string;
  country?: string;
}): Promise<User> => {
  const collection = await getUsersCollection();
  
  // Check if user already exists
  const existingUser = await collection.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('المستخدم مسجل بالفعل');
  }
  
  // Hash password
  const hashedPassword = await hashPassword(userData.password);
  
  // Create user object
  const user: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: userData.email,
    password: hashedPassword,
    fullName: userData.fullName,
    phone: userData.phone,
    education: userData.education,
    city: userData.city,
    country: userData.country,
    role: 'user',
    status: 'active',
    createdAt: new Date().toISOString(),
    emailVerified: false,
    profileComplete: !!(userData.phone && userData.education && userData.city && userData.country),
    metadata: {
      loginCount: 0,
    },
  };
  
  // Insert user
  const result = await collection.insertOne(user);
  if (!result.insertedId) {
    throw new Error('فشل في إنشاء المستخدم');
  }
  
  return user;
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
  const isValidPassword = await verifyPassword(password, user.password);
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
    const userId = request.cookies.get('user_id')?.value;
    if (!userId) {
      return null;
    }

    const collection = await getUsersCollection();
    const user = await collection.findOne({ id: userId });
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

// Get all users (for admin)
export const getAllUsers = async (filters?: {
  role?: 'user' | 'admin';
  status?: 'active' | 'suspended';
  search?: string;
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
  
  const users = await collection.find(query).sort({ createdAt: -1 }).toArray();
  return users;
};

// Check if user is admin
export const isAdmin = (user: User): boolean => {
  return user.role === 'admin';
};

// Update user in MongoDB
export const updateUser = async (userId: string, updates: Partial<User>): Promise<User | null> => {
  try {
    const collection = await getUsersCollection();
    
    // Update MongoDB
    const result = await collection.findOneAndUpdate(
      { id: userId },
      { $set: { ...updates, updatedAt: new Date().toISOString() } },
      { returnDocument: 'after' }
    );

    if (!result) {
      throw new Error('User not found');
    }

    return result;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Generate user ID
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}; 