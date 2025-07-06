import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPaymentsCollection, Payment, PaymentHistory } from '@/lib/mongodb';
import { uploadPaymentProof } from '@/lib/cloudinary';
import { sendAdminNotificationEmail } from '@/lib/email';

// Type guard for itemType
function isValidItemType(type: string): type is 'certification' | 'course' {
  return type === 'certification' || type === 'course';
}

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
    const proofBase64 = formData.get('proofBase64') as string;
    const paymentId = formData.get('paymentId') as string;
    const itemName = formData.get('itemName') as string;
    const rawItemType = formData.get('itemType') as string;
    const amount = Number(formData.get('amount'));
    const itemId = formData.get('itemId') as string;

    console.log('Payment submission - Form data:', {
      paymentId,
      itemName,
      itemType: rawItemType,
      itemId,
      amount,
      hasProof: !!proofBase64,
      rawAmount: formData.get('amount')
    });

    // Validate required fields
    if (!proofBase64) {
      return NextResponse.json(
        { error: 'Payment proof image is required' },
        { status: 400 }
      );
    }

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    if (!itemName) {
      return NextResponse.json(
        { error: 'Item name is required' },
        { status: 400 }
      );
    }

    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      );
    }

    // Validate itemType
    if (!isValidItemType(rawItemType)) {
      console.error('Payment submission - Invalid item type:', rawItemType);
      return NextResponse.json(
        { error: 'Invalid item type. Must be either "certification" or "course"' },
        { status: 400 }
      );
    }
    const itemType = rawItemType;

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

    // Upload image to Cloudinary
    let cloudinaryUrl;
    try {
      cloudinaryUrl = await uploadPaymentProof(proofBase64, paymentId);
      console.log('Payment submission - Image uploaded:', cloudinaryUrl);
    } catch (uploadError) {
      console.error('Payment submission - Image upload failed:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload payment proof' },
        { status: 500 }
      );
    }

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
      itemId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      proofImage: cloudinaryUrl,
      history: [historyEntry]
    };

    console.log('Payment submission - Attempting to save payment:', {
      paymentId,
      userId,
      userName,
      amount,
      imageUrl: cloudinaryUrl
    });

    const result = await collection.insertOne(payment);

    console.log('Payment submission - Save result:', {
      success: !!result.insertedId,
      insertedId: result.insertedId
    });

    // Send notification email to admin
    try {
      await sendAdminNotificationEmail(
        userName,
        paymentId,
        {
          userEmail,
          amount,
          itemName,
          itemType,
          itemId
        }
      );
      console.log('Admin notification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send admin notification email:', emailError);
      // Don't throw here - we still want to return success response
    }

    return NextResponse.json({ success: true, payment });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { error: 'Failed to create payment. Please try again.' },
      { status: 500 }
    );
  }
}