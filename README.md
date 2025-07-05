# QonnectEd - Educational Platform

QonnectEd is a comprehensive Arabic-first educational platform built with Next.js 14, featuring professional certifications, courses, and learning pathways.

## 🚀 Recent Migration: Netlify Identity → MongoDB Authentication

This platform has been successfully migrated from Netlify Identity to MongoDB authentication due to Netlify Identity deprecation. This README documents the complete migration process and setup instructions.

## 📋 Table of Contents

- [Migration Overview](#migration-overview)
- [Technology Stack](#technology-stack)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Authentication System](#authentication-system)
- [Admin Panel Setup](#admin-panel-setup)
- [API Endpoints](#api-endpoints)
- [Migration Changes](#migration-changes)
- [Installation & Setup](#installation--setup)
- [User Roles Management](#user-roles-management)
- [Troubleshooting](#troubleshooting)

## 🔄 Migration Overview

### What Was Migrated

- **From**: Netlify Identity authentication system
- **To**: MongoDB with custom JWT authentication
- **Reason**: Netlify Identity deprecation affecting admin dashboard functionality

### Migration Benefits

- ✅ Full control over user authentication
- ✅ Custom user roles and permissions
- ✅ Scalable MongoDB database
- ✅ Secure JWT token-based authentication
- ✅ Enhanced admin panel functionality
- ✅ Better user management capabilities

## 🛠 Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: Custom JWT + bcryptjs
- **UI Components**: Headless UI, Framer Motion
- **Icons**: Lucide React
- **Deployment**: Netlify

## 🗄️ Database Setup

### MongoDB Collection: `users`

The user collection structure:

```javascript
{
  _id: ObjectId,
  email: string,
  password: string, // bcrypt hashed
  fullName: string,
  phone?: string,
  role: "user" | "admin",
  status: "active" | "inactive" | "pending",
  profileComplete: boolean,
  emailVerified: boolean,
  createdAt: Date,
  updatedAt: Date,
  lastLogin?: Date,
  preferences?: {
    language: string,
    notifications: boolean
  }
}
```

### Required Indexes

```javascript
// Create these indexes in MongoDB
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ status: 1 });
```

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/qonnected?retryWrites=true&w=majority

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Optional: Email service configuration
EMAIL_SERVICE_API_KEY=your-email-service-key
```

### Generate JWT Secret

```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🔑 Authentication System

### User Registration Flow

1. User submits registration form
2. Password is hashed using bcryptjs
3. User is created in MongoDB with role "user"
4. JWT token is generated and set as HTTP-only cookie
5. User is redirected to dashboard

### User Login Flow

1. User submits email/password
2. Password is verified against hashed password
3. JWT token is generated and set as HTTP-only cookie
4. User data is returned (excluding password)

### Token Management

- **Storage**: HTTP-only cookies for security
- **Expiration**: 7 days
- **Refresh**: Automatic on valid requests
- **Logout**: Cookie deletion

## 👑 Admin Panel Setup

### Creating the First Admin User

#### Method 1: Direct Database Insert

```javascript
// Connect to MongoDB and run this script
use qonnected

db.users.insertOne({
  email: "admin@qonnected.com",
  password: "$2b$12$LQv3c1yqBwEHXk.C16mfg.X4qZkBTKxzYXWpgKFVqxf9Y1xGkYJvO", // password: "admin123"
  fullName: "System Administrator",
  role: "admin",
  status: "active",
  profileComplete: true,
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

#### Method 2: API Script

Create a script file `scripts/create-admin.js`:

```javascript
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");

async function createAdmin() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();
    const users = db.collection("users");

    const hashedPassword = await bcrypt.hash("admin123", 12);

    const admin = {
      email: "admin@qonnected.com",
      password: hashedPassword,
      fullName: "System Administrator",
      role: "admin",
      status: "active",
      profileComplete: true,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await users.insertOne(admin);
    console.log("Admin user created:", result.insertedId);
  } finally {
    await client.close();
  }
}

createAdmin().catch(console.error);
```

Run the script:

```bash
node scripts/create-admin.js
```

### Accessing Admin Panel

1. Navigate to `/login`
2. Login with admin credentials
3. Access admin panel at `/admin`

### Admin Panel Features

- **User Management**: `/admin/users`

  - View all users
  - Filter by role and status
  - Update user roles
  - Activate/deactivate users

- **Payments Management**: `/admin/payments`

  - View payment requests
  - Approve/reject payments
  - Track payment status

- **Certifications Management**: `/admin/certifications`
  - Manage certification offerings
  - Update certification details

## 🔌 API Endpoints

### Authentication Endpoints

```typescript
POST /api/auth/signup
Body: { email, password, fullName, phone? }
Response: { success, user, message }

POST /api/auth/signin
Body: { email, password }
Response: { success, user, message }

POST /api/auth/logout
Response: { success, message }

GET /api/auth/me
Response: { success, user }
```

### Admin Endpoints

```typescript
GET /api/admin/users
Query: { role?, status?, page?, limit? }
Response: { success, users, total, pagination }

GET /api/admin/users/[id]
Response: { success, user }

PUT /api/admin/users/[id]
Body: { fullName?, phone?, profileComplete? }
Response: { success, user }

PUT /api/admin/users/[id]/role
Body: { role: "user" | "admin" }
Response: { success, user }

PUT /api/admin/users/[id]/status
Body: { status: "active" | "inactive" | "pending" }
Response: { success, user }

DELETE /api/admin/users/[id]
Response: { success, message }
```

### Payment Endpoints

```typescript
POST /api/payments
Body: FormData with payment proof
Response: { success, payment }

GET /api/admin/payments
Response: { success, payments }

PUT /api/admin/payments/[id]/approve
Response: { success, payment }

PUT /api/admin/payments/[id]/reject
Body: { reason? }
Response: { success, payment }
```

## 📝 Migration Changes

### Files Modified/Created

#### 1. Database & Authentication (`lib/`)

- **Created**: `lib/auth.ts` - Authentication utilities
- **Updated**: `lib/mongodb.ts` - User collection management

#### 2. API Routes (`app/api/`)

- **Created**: `app/api/auth/signup/route.ts`
- **Created**: `app/api/auth/signin/route.ts`
- **Created**: `app/api/auth/logout/route.ts`
- **Created**: `app/api/auth/me/route.ts`
- **Updated**: `app/api/admin/users/route.ts`
- **Created**: `app/api/admin/users/[id]/route.ts`
- **Created**: `app/api/admin/users/[id]/role/route.ts`
- **Created**: `app/api/admin/users/[id]/status/route.ts`

#### 3. Context & Hooks (`context/`)

- **Completely Rewritten**: `context/AuthContext.tsx`

#### 4. Components (`components/`)

- **Updated**: `components/PaymentFlow.tsx` - MongoDB auth integration
- **Updated**: `components/CourseCard.tsx` - MongoDB auth integration
- **Updated**: `components/Sidebar.tsx` - Login redirect updates

#### 5. Pages (`app/`)

- **Updated**: `app/pathway/page.tsx` - Auth context usage
- **Updated**: `app/certifications/page.tsx` - Auth context usage
- **Updated**: `app/major-courses/[majorId]/page.tsx` - Auth context usage

### Key Changes Summary

1. **Authentication Method**:

   - Old: `netlifyIdentity.currentUser()`
   - New: `useAuth()` hook with `isAuthenticated` and `user`

2. **Login Flow**:

   - Old: `netlifyIdentity.open("login")`
   - New: `router.push("/login")`

3. **User Data Structure**:

   - Old: Netlify Identity user metadata
   - New: MongoDB user document with custom fields

4. **Admin Access**:
   - Old: Netlify Identity roles
   - New: MongoDB `role: "admin"` field

## 🚀 Installation & Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd qonnected
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and JWT secret
```

### 4. Database Setup

- Create MongoDB database
- Create required indexes
- Create first admin user (see Admin Panel Setup)

### 5. Run Development Server

```bash
npm run dev
```

### 6. Build for Production

```bash
npm run build
npm start
```

## 👥 User Roles Management

### Role Types

- **user**: Standard user with access to courses and certifications
- **admin**: Full access including admin panel

### Changing User Roles

#### Via Admin Panel

1. Login as admin
2. Go to `/admin/users`
3. Find user and click "Edit"
4. Change role in dropdown
5. Save changes

#### Via API

```bash
curl -X PUT http://localhost:3000/api/admin/users/USER_ID/role \
  -H "Content-Type: application/json" \
  -d '{"role": "admin"}' \
  -b "auth-token=YOUR_JWT_TOKEN"
```

#### Via Database

```javascript
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin", updatedAt: new Date() } }
);
```

### User Status Management

User statuses:

- **active**: Can login and use platform
- **inactive**: Cannot login
- **pending**: Registration pending approval

## 🐛 Troubleshooting

### Common Issues

#### 1. "Cannot connect to MongoDB"

```
Error: MongoServerError: Authentication failed
```

**Solution**: Check MongoDB URI in `.env.local`

#### 2. "JWT token verification failed"

```
Error: JsonWebTokenError: invalid signature
```

**Solution**: Ensure JWT_SECRET is set correctly

#### 3. "Admin panel access denied"

```
Error: 403 Forbidden
```

**Solution**: Check user role is set to "admin" in database

#### 4. "Build errors after migration"

```
Type error: Cannot find module 'netlify-identity-widget'
```

**Solution**: Remove any remaining netlify-identity-widget imports

### Debugging Authentication

Enable auth debugging by adding to your component:

```typescript
const { user, isAuthenticated, loading } = useAuth();
console.log("Auth Debug:", { user, isAuthenticated, loading });
```

### Database Queries for Debugging

```javascript
// Check user roles
db.users.find({ role: "admin" });

// Check user status
db.users.find({ status: { $ne: "active" } });

// Find specific user
db.users.findOne({ email: "user@example.com" });
```

## 📞 Support

For issues related to this migration or platform setup:

1. Check this README for common solutions
2. Review the Troubleshooting section
3. Check MongoDB connection and JWT configuration
4. Verify user roles in database

## 🔄 Migration Checklist

- [x] MongoDB database setup
- [x] User collection with proper schema
- [x] JWT authentication implementation
- [x] API routes for auth and admin
- [x] AuthContext with MongoDB integration
- [x] Updated all components to use new auth
- [x] Admin panel functionality
- [x] User role management
- [x] Payment system integration
- [x] TypeScript compilation without errors
- [x] All UI preserved and functional

## 📜 License

This project is proprietary software for QonnectEd educational platform.

---

**Last Updated**: December 2024  
**Migration Status**: ✅ Complete  
**Platform Status**: �� Production Ready
