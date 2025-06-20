import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPaymentsCollection, Payment, PaymentHistory } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('user_id')?.value;
    const userEmail = cookieStore.get('user_email')?.value;
    const userName = cookieStore.get('user_name')?.value;

    console.log('Payment submission - User data from cookies:', {
      userId,
      userEmail,
      userName,
      allCookies: cookieStore.getAll()
    });

    if (!userId || !userEmail || !userName) {
      console.error('Payment submission - Authentication error:', {
        userId,
        userEmail,
        userName
      });
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const proof = formData.get('proof') as File;
    const paymentId = formData.get('paymentId') as string;
    const itemName = formData.get('itemName') as string;
    const itemType = formData.get('itemType') as string;
    const amount = Number(formData.get('amount'));

    console.log('Payment submission - Form data:', {
      paymentId,
      itemName,
      itemType,
      amount,
      hasProof: !!proof,
      rawAmount: formData.get('amount')
    });

    if (!proof || !paymentId || !itemName || !itemType) {
      console.error('Payment submission - Missing fields:', {
        hasProof: !!proof,
        paymentId,
        itemName,
        itemType
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (isNaN(amount) || amount <= 0) {
      console.error('Payment submission - Invalid amount:', {
        amount,
        rawAmount: formData.get('amount')
      });
      return NextResponse.json(
        { error: 'Invalid payment amount' },
        { status: 400 }
      );
    }

    // Convert the proof file to base64
    const bytes = await proof.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const proofImage = `data:${proof.type};base64,${base64}`;

    const collection = await getPaymentsCollection();

    const historyEntry: PaymentHistory = {
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    const payment: Payment = {
      id: paymentId,
      userId,
      userName,
      userEmail,
      amount,
      itemName,
      itemType,
      status: 'pending',
      createdAt: new Date().toISOString(),
      proofImage,
      history: [historyEntry]
    };

    console.log('Payment submission - Attempting to save payment:', {
      paymentId,
      userId,
      userName,
      amount
    });

    const result = await collection.insertOne(payment);

    console.log('Payment submission - Save result:', {
      success: !!result.insertedId,
      insertedId: result.insertedId
    });

    return NextResponse.json({ success: true, payment });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
} 