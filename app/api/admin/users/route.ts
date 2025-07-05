import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, getAllUsers, updateUser, isAdmin } from '@/lib/auth';

// GET /api/admin/users
export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const currentUser = await getCurrentUser(request);
    if (!currentUser || !isAdmin(currentUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Build filters
    const filters: any = {};
    if (role && role !== 'all') {
      filters.role = role as 'user' | 'admin';
    }
    if (status && status !== 'all') {
      filters.status = status as 'active' | 'suspended';
    }
    if (search) {
      filters.search = search;
    }

    // Fetch users
    const users = await getAllUsers(filters);
    
    // Transform users to match the expected format
    const transformedUsers = users.map(user => ({
      id: user.id,
      name: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      joinDate: user.createdAt,
      lastLogin: user.lastLogin || user.createdAt,
      phone: user.phone,
      education: user.education,
      city: user.city,
      country: user.country,
      profileComplete: user.profileComplete,
      emailVerified: user.emailVerified,
    }));

    console.log(`Fetched ${transformedUsers.length} users from MongoDB`);
    return NextResponse.json({ users: transformedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/admin/users - For bulk operations (if needed)
export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const currentUser = await getCurrentUser(request);
    if (!currentUser || !isAdmin(currentUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, userIds } = body;

    if (!action || !Array.isArray(userIds)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    console.log('Processing bulk user action:', { action, userIds });

    // Handle bulk actions
    const results = [];
    for (const userId of userIds) {
      try {
        let updates: Partial<any> = {};
        
        switch (action) {
          case 'activate':
            updates.status = 'active';
            break;
          case 'suspend':
            updates.status = 'suspended';
            break;
          case 'make-admin':
            updates.role = 'admin';
            break;
          case 'remove-admin':
            updates.role = 'user';
            break;
          default:
            throw new Error(`Unknown action: ${action}`);
        }

        const updatedUser = await updateUser(userId, updates);
        results.push({ userId, success: true, user: updatedUser });
      } catch (error) {
        console.error(`Error updating user ${userId}:`, error);
        results.push({ userId, success: false, error: error instanceof Error ? error.message : 'Unknown error' });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error in bulk user update:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 