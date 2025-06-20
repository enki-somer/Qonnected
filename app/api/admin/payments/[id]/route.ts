import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPaymentsCollection, Payment, PaymentHistory } from '@/lib/mongodb';
import { sendPaymentApprovedEmail, sendPaymentRejectedEmail } from '@/lib/email';

// Helper to check if user is admin
async function isAdmin(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;
  const userRole = cookieStore.get('user_role')?.value;

  return userRole === 'admin';
}

// POST /api/admin/payments/:id/action
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('Payment action request received:', {
    paymentId: params.id,
    hasAuthToken: !!cookies().get('auth_token')?.value,
    userRole: cookies().get('user_role')?.value
  });

  if (!await isAdmin(request)) {
    console.log('Unauthorized access attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action, feedback } = await request.json();
    console.log('Processing payment action:', { action, hasFeedback: !!feedback });

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
      console.log('Payment not found:', paymentId);
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    console.log('Found payment:', {
      id: payment.id,
      userEmail: payment.userEmail,
      amount: payment.amount,
      status: payment.status
    });

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
      console.error('Failed to update payment in database');
      throw new Error('Failed to update payment');
    }

    console.log('Payment updated successfully:', {
      id: result.id,
      newStatus,
      timestamp
    });

    // Send email notification based on action
    console.log('Attempting to send email notification');
    try {
      if (action === 'approve') {
        const emailResult = await sendPaymentApprovedEmail({
          userName: payment.userEmail,
          recipientName: payment.userName,
          paymentId: payment.id,
          amount: payment.amount,
          itemName: payment.itemName,
          itemType: payment.itemType,
          feedback
        });
        console.log('Approval email result:', emailResult);
      } else {
        const emailResult = await sendPaymentRejectedEmail({
          userName: payment.userEmail,
          recipientName: payment.userName,
          paymentId: payment.id,
          amount: payment.amount,
          itemName: payment.itemName,
          itemType: payment.itemType,
          feedback
        });
        console.log('Rejection email result:', emailResult);
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't throw here - we still want to return the updated payment
    }

    return NextResponse.json({ payment: result });
  } catch (error) {
    console.error('Error processing payment action:', {
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 