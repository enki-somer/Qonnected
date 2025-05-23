import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// This would be your database interaction
const mockDb = {
  payments: [
    {
      id: 'PAY-123456',
      userId: 'user-1',
      certificationId: 'cert-1',
      amount: 99,
      status: 'pending',
      createdAt: new Date(),
      proofImage: '/path/to/proof.jpg',
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

// GET /api/admin/payments
export async function GET(request: Request) {
  // Check if user is admin
  if (!await isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get query parameters
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search')?.toLowerCase();

  // Filter payments based on query parameters
  let payments = mockDb.payments;
  
  if (status && status !== 'all') {
    payments = payments.filter(p => p.status === status);
  }

  if (search) {
    payments = payments.filter(p => 
      p.id.toLowerCase().includes(search) ||
      p.userId.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ payments });
}

// POST /api/admin/payments/:id/action
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
    const paymentId = params.id;

    // Validate action
    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    // Find payment
    const payment = mockDb.payments.find(p => p.id === paymentId);
    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Update payment status
    payment.status = action === 'approve' ? 'approved' : 'rejected';

    // Here you would:
    // 1. Update the payment status in your database
    // 2. If approved:
    //    - Grant access to the certification
    //    - Send confirmation email to user
    // 3. If rejected:
    //    - Send notification to user with reason
    
    return NextResponse.json({ payment });
  } catch (error) {
    console.error('Error processing payment action:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 