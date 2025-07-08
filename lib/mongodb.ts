import { MongoClient, MongoClientOptions, Collection } from 'mongodb';
import { ObjectId } from 'mongodb';

// Payment interface
interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  itemName: string;
  itemType: 'certification' | 'course';
  itemId: string;  // ID of the course or certification
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  proofImage: string;
  updatedAt?: string;
  reviewedBy?: string;
  feedback?: string;
  history?: PaymentHistory[];
}

interface PaymentHistory {
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
  reviewedBy?: string;
  feedback?: string;
}

// User interface for MongoDB authentication
interface User {
  _id?: ObjectId;
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  education?: string;
  city?: string;
  country?: string;
  role: 'user' | 'admin';
  status: 'pending' | 'active' | 'suspended';
  emailVerified: boolean;
  verificationToken?: string | null;
  verificationExpires?: Date | null;
  profileComplete: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  metadata: {
    loginCount: number;
    lastFailedLogin?: string | null;
    failedLoginAttempts: number;
  };
}

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please add your Mongo URI to .env.local'
  );
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 5,
  retryWrites: true,
};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .catch(error => {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .catch(error => {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    });
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

export async function getPaymentsCollection(): Promise<Collection<Payment>> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'qonnected');
    return db.collection<Payment>('payments');
  } catch (error) {
    console.error('Failed to get payments collection:', error);
    throw error;
  }
}

export async function getUsersCollection(): Promise<Collection<User>> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'qonnected');
    return db.collection<User>('users');
  } catch (error) {
    console.error('Failed to get users collection:', error);
    throw error;
  }
}

// Helper function to check database connection
export async function checkDatabaseConnection() {
  try {
    const client = await clientPromise;
    await client.db().command({ ping: 1 });
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}

// Export types
export type { Payment, PaymentHistory, User }; 