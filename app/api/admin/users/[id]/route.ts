import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, updateUser, isAdmin, getUsersCollection } from '@/lib/auth';

// GET /api/admin/users/[id] - Get specific user
export async function GET(
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
    const collection = await getUsersCollection();
    const user = await collection.findOne({ id: userId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return user info (excluding password)
    const userInfo = {
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
    };

    return NextResponse.json({ user: userInfo });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id] - Update user
export async function PUT(
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
    const { role, status, fullName, phone, education, city, country } = body;

    // Build updates object
    const updates: any = {};
    if (role !== undefined) updates.role = role;
    if (status !== undefined) updates.status = status;
    if (fullName !== undefined) updates.fullName = fullName;
    if (phone !== undefined) updates.phone = phone;
    if (education !== undefined) updates.education = education;
    if (city !== undefined) updates.city = city;
    if (country !== undefined) updates.country = country;

    // Update profile completeness
    if (phone !== undefined || education !== undefined || city !== undefined || country !== undefined) {
      updates.profileComplete = !!(
        (phone || updates.phone) &&
        (education || updates.education) &&
        (city || updates.city) &&
        (country || updates.country)
      );
    }

    console.log('Updating user:', { userId, updates });

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
      phone: updatedUser.phone,
      education: updatedUser.education,
      city: updatedUser.city,
      country: updatedUser.country,
      profileComplete: updatedUser.profileComplete,
      emailVerified: updatedUser.emailVerified,
    };

    return NextResponse.json({ user: userInfo });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete user (if needed)
export async function DELETE(
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
    const collection = await getUsersCollection();
    
    // Don't allow deleting themselves
    if (userId === currentUser.id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    const result = await collection.deleteOne({ id: userId });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User deleted:', userId);
    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
} 