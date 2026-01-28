import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { logger } from '@/lib/utils/logger';

/**
 * POST /api/stripe/create-checkout-session
 * Creates a Stripe checkout session for course purchase
 *
 * Request body:
 * {
 *   userId: string;
 *   priceId: string;
 *   successUrl: string;
 *   cancelUrl: string;
 *   courseId?: string;
 *   courseName?: string;
 * }
 */
export async function POST(request: NextRequest) {
  // Verify required environment variables
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    logger.error('Missing STRIPE_SECRET_KEY environment variable');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const {
      userId,
      priceId,
      successUrl,
      cancelUrl,
      courseId = 'age-of-enlightenment',
      courseName = 'Age of Enlightenment - Ideas That Shaped America',
    } = body;

    // Validate required fields
    if (!userId || !priceId || !successUrl || !cancelUrl) {
      return NextResponse.json(
        {
          error: 'Missing required fields: userId, priceId, successUrl, cancelUrl',
        },
        { status: 400 }
      );
    }

    // Validate URLs
    try {
      new URL(successUrl);
      new URL(cancelUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid successUrl or cancelUrl format' },
        { status: 400 }
      );
    }

    // Initialize Stripe with server-side secret key
    const stripe = new Stripe(stripeSecretKey);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId,
      metadata: {
        userId,
        courseId,
        courseName,
      },
    });

    // Return session ID and URL for client-side redirect
    return NextResponse.json(
      { sessionId: session.id, url: session.url },
      { status: 200 }
    );
  } catch (error) {
    // Handle Stripe-specific errors
    if (error instanceof Stripe.errors.StripeError) {
      logger.error('Stripe error', { type: error.type, code: error.code });
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: 400 }
      );
    }

    // Handle general errors
    logger.error('Checkout session creation failed', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
