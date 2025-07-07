import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, getAllUsers, updateUser, isAdmin } from '@/lib/auth';
import { getPaymentsCollection } from '@/lib/mongodb';

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
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const exportAll = searchParams.get('export') === 'true';

    // Build filters (only search, no role/status filters needed)
    const filters: any = {};
    if (search) {
      filters.search = search;
    }

    // For export, get all users without pagination
    let users;
    let totalUsers = 0;
    
    if (exportAll) {
      users = await getAllUsers(filters);
      totalUsers = users.length;
    } else {
      // Get paginated users
      const skip = (page - 1) * limit;
      users = await getAllUsers({ ...filters, skip, limit });
      
      // Get total count for pagination
      const allUsers = await getAllUsers(filters);
      totalUsers = allUsers.length;
    }
    
    // Get payments collection to count payments and calculate spend per user
    const paymentsCollection = await getPaymentsCollection();
    
    // Transform users and add payment counts + total spend
    const transformedUsers = await Promise.all(
      users.map(async (user) => {
        // Count payments and calculate total spend for this user
        const paymentStats = await paymentsCollection.aggregate([
          { $match: { userId: user.id } },
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
              totalAmount: { $sum: "$amount" }
            }
          }
        ]).toArray();

        // Calculate payment statistics
        const totalPayments = paymentStats.reduce((sum, item) => sum + item.count, 0);
        const pendingPayments = paymentStats.find(item => item._id === 'pending')?.count || 0;
        const approvedPayments = paymentStats.find(item => item._id === 'approved')?.count || 0;
        const rejectedPayments = paymentStats.find(item => item._id === 'rejected')?.count || 0;
        
        // Calculate total spend (only approved payments)
        const totalSpend = paymentStats.find(item => item._id === 'approved')?.totalAmount || 0;

        return {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone || null,
          education: user.education || null,
          city: user.city || null,
          country: user.country || null,
          createdAt: user.createdAt,
          lastLoginAt: user.lastLogin || null,
          emailVerified: user.emailVerified,
          profileComplete: user.profileComplete,
          paymentStats: {
            total: totalPayments,
            pending: pendingPayments,
            approved: approvedPayments,
            rejected: rejectedPayments,
            totalSpend: totalSpend // Only approved payments
          }
        };
      })
    );

    const response = {
      users: transformedUsers,
      pagination: exportAll ? null : {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers: totalUsers,
        hasNext: page * limit < totalUsers,
        hasPrev: page > 1
      }
    };

    console.log(`Fetched ${transformedUsers.length} users from MongoDB with payment data and total spend${exportAll ? ' (export mode)' : ` (page ${page})`}`);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching users with payment data:', error);
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

    // Handle bulk actions (keeping minimal functionality)
    const results = [];
    for (const userId of userIds) {
      try {
        let updates: Partial<any> = {};
        
        switch (action) {
          case 'update-profile':
            // Only allow profile updates, no role/status changes
            updates = body.updates || {};
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