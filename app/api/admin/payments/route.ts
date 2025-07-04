import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPaymentsCollection, Payment, PaymentHistory } from '@/lib/mongodb';
import { WithId, Filter } from 'mongodb';

type PaymentDocument = WithId<Payment>;

// Helper to check if user is admin
async function isAdmin(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;
  const userRole = cookieStore.get('user_role')?.value;

  console.log('Admin check - Cookies:', {
    token: !!token,
    userRole,
    allCookies: cookieStore.getAll()
  });

  return userRole === 'admin';
}

// GET /api/admin/payments
export async function GET(request: Request) {
  console.log('Admin payments - Request received');

  const adminCheckResult = await isAdmin(request);
  console.log('Admin payments - Auth check result:', adminCheckResult);

  if (!adminCheckResult) {
    console.error('Admin payments - Unauthorized access attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();

    console.log('Admin payments - Query params:', { status, search });

    const collection = await getPaymentsCollection();
    
    // Build the query
    const query: Filter<Payment> = {};
    
    if (status && status !== 'all') {
      query.status = status as Payment['status'];
    }

    if (search) {
      query.$or = [
        { userName: { $regex: search, $options: 'i' } },
        { userEmail: { $regex: search, $options: 'i' } },
        { id: { $regex: search, $options: 'i' } }
      ];
    }

    console.log('Admin payments - MongoDB query:', JSON.stringify(query, null, 2));

    // Get payments from MongoDB
    const payments = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    console.log('Admin payments - Results:', {
      count: payments.length,
      paymentIds: payments.map(p => p.id)
    });

    return NextResponse.json({ payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

// POST /api/admin/payments/:id/action
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!await isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action, feedback } = await request.json();
    const paymentId = params.id;

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    // Get admin user info from cookies
    const cookieStore = cookies();
    const adminEmail = cookieStore.get('user_email')?.value || 'Admin';

    const collection = await getPaymentsCollection();
    
    // Get the current payment
    const payment = await collection.findOne({ id: paymentId });
    
    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    const newStatus = action === 'approve' ? 'approved' as const : 'rejected' as const;
    const timestamp = new Date().toISOString();

    const historyEntry: PaymentHistory = {
      status: newStatus,
      timestamp,
      reviewedBy: adminEmail,
      feedback
    };

    // Update the payment
    const result = await collection.findOneAndUpdate(
      { id: paymentId },
      {
        $set: {
          status: newStatus,
          updatedAt: timestamp,
          reviewedBy: adminEmail,
          feedback
        },
        $push: {
          history: historyEntry
        }
      },
      { returnDocument: 'after' }
    );

    if (!result) {
      throw new Error('Failed to update payment');
    }

    // Here you would:
    // 1. If approved:
    //    - Grant access to the certification
    //    - Send confirmation email to user
    // 2. If rejected:
    //    - Send notification to user with feedback

    return NextResponse.json({ payment: result });
  } catch (error) {
    console.error('Error processing payment action:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 