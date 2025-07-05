import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, updateUser, isAdmin } from '@/lib/auth';

// POST /api/admin/users/[id]/role - Update user role
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is admin
    const currentUser = await getCurrentUser(request);
    if (!currentUser || !isAdmin(currentUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = params.id;
    const body = await request.json();
    const { action } = body;

    // Validate action
    if (!['make-admin', 'remove-admin'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    // Don't allow changing their own role
    if (userId === currentUser.id) {
      return NextResponse.json(
        { error: 'Cannot change your own role' },
        { status: 400 }
      );
    }

    // Update user role
    const updates = {
      role: action === 'make-admin' ? 'admin' as const : 'user' as const,
    };

    console.log('Updating user role:', { userId, action, updates });

    const updatedUser = await updateUser(userId, updates);
    
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return updated user info
    const userInfo = {
      id: updatedUser.id,
      name: updatedUser.fullName,
      email: updatedUser.email,
      role: updatedUser.role,
      status: updatedUser.status,
      joinDate: updatedUser.createdAt,
      lastLogin: updatedUser.lastLogin || updatedUser.createdAt,
    };

    return NextResponse.json({ user: userInfo });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Failed to update user role' },
      { status: 500 }
    );
  }
} 