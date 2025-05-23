import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// This would be your database interaction
const mockDb = {
  users: [
    {
      id: 'user-1',
      name: 'Ahmed Mohammed',
      email: 'ahmed@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-03-20',
    },
    {
      id: 'user-2',
      name: 'Sara Ahmed',
      email: 'sara@example.com',
      role: 'admin',
      status: 'active',
      joinDate: '2024-02-01',
      lastLogin: '2024-03-21',
    },
    // Add more mock data
  ],
};

// Helper to check if user is admin
async function isAdmin(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token');
  
  // Here you would verify the token and check admin role
  // For now, we'll just check if token exists
  return !!token;
}

// GET /api/admin/users
export async function GET(request: Request) {
  // Check if user is admin
  if (!await isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get query parameters
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  const status = searchParams.get('status');
  const search = searchParams.get('search')?.toLowerCase();

  // Filter users based on query parameters
  let users = mockDb.users;
  
  if (role && role !== 'all') {
    users = users.filter(u => u.role === role);
  }

  if (status && status !== 'all') {
    users = users.filter(u => u.status === status);
  }

  if (search) {
    users = users.filter(u => 
      u.name.toLowerCase().includes(search) ||
      u.email.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ users });
}

// POST /api/admin/users/:id/role
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check if user is admin
  if (!await isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action } = await request.json();
    const userId = params.id;

    // Find user
    const user = mockDb.users.find(u => u.id === userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user based on action type
    if (request.url.endsWith('/role')) {
      // Handle role changes
      if (!['make-admin', 'remove-admin'].includes(action)) {
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
      }
      user.role = action === 'make-admin' ? 'admin' : 'user';
    } else if (request.url.endsWith('/status')) {
      // Handle status changes
      if (!['activate', 'suspend'].includes(action)) {
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
      }
      user.status = action === 'activate' ? 'active' : 'suspended';
    }

    // Here you would:
    // 1. Update the user in your database
    // 2. Update Netlify Identity user metadata
    // 3. Send notification email to user
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error processing user action:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 