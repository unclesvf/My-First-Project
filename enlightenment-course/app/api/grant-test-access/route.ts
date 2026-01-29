import { NextRequest, NextResponse } from 'next/server';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { logger } from '@/lib/utils/logger';

/**
 * Development-only endpoint to grant test access
 * POST /api/grant-test-access
 * Body: { email: string }
 */
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development' },
      { status: 403 }
    );
  }

  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Update the user's course access to 'purchased'
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'courseAccess.status': 'purchased',
      'courseAccess.purchasedAt': Timestamp.now(),
    });

    return NextResponse.json({
      success: true,
      message: 'Test access granted successfully',
    });
  } catch (error) {
    logger.error('Error granting test access', error);
    return NextResponse.json(
      { error: 'Failed to grant access' },
      { status: 500 }
    );
  }
}
