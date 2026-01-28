import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { logger } from '@/lib/utils/logger';
import { adminDb } from '@/lib/firebase/admin';
import { Timestamp } from 'firebase-admin/firestore';

/**
 * POST /api/stripe/webhook
 * Handles Stripe webhook events to verify payments and update user access
 *
 * Required environment variables:
 * - STRIPE_SECRET_KEY: Stripe secret key
 * - STRIPE_WEBHOOK_SECRET: Webhook signing secret from Stripe dashboard
 */
export async function POST(request: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey) {
    logger.error('Missing STRIPE_SECRET_KEY environment variable');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  if (!webhookSecret) {
    logger.error('Missing STRIPE_WEBHOOK_SECRET environment variable');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecretKey);

  // Get the raw body for signature verification
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    logger.error('Missing stripe-signature header');
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    logger.error('Webhook signature verification failed', { error: errorMessage });
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logger.warn('Payment failed', {
          paymentIntentId: paymentIntent.id,
          error: paymentIntent.last_payment_error?.message,
        });
        break;
      }

      default:
        logger.info('Unhandled webhook event type', { type: event.type });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    logger.error('Error processing webhook event', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful checkout session
 * Updates user's course access to 'purchased' and creates purchase record
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id;
  const courseId = session.metadata?.courseId || 'age-of-enlightenment';
  const courseName = session.metadata?.courseName || 'Age of Enlightenment - Ideas That Shaped America';

  if (!userId) {
    logger.error('Checkout session missing client_reference_id (userId)', {
      sessionId: session.id,
    });
    return;
  }

  logger.info('Processing checkout session completed', {
    sessionId: session.id,
    userId,
    courseId,
    amountTotal: session.amount_total,
  });

  try {
    // Update user's course access
    const userRef = adminDb.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      logger.error('User not found for checkout session', { userId, sessionId: session.id });
      return;
    }

    const now = Timestamp.now();

    // Update course access to purchased
    await userRef.update({
      'courseAccess.status': 'purchased',
      'courseAccess.purchasedAt': now,
      'courseAccess.stripePaymentIntentId': session.payment_intent,
      'courseAccess.stripeCustomerId': session.customer,
    });

    // Create purchase record
    await adminDb.collection('purchases').add({
      userId,
      courseId,
      courseName,
      amount: session.amount_total || 0,
      currency: session.currency || 'usd',
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent,
      stripeCustomerId: session.customer,
      status: 'succeeded',
      purchasedAt: now,
    });

    logger.info('Successfully processed purchase', {
      userId,
      courseId,
      sessionId: session.id,
    });
  } catch (error) {
    logger.error('Failed to process checkout session', {
      error,
      sessionId: session.id,
      userId,
    });
    throw error;
  }
}

/**
 * Handle successful payment intent (backup handler)
 * This catches payments that might not come through checkout.session.completed
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const userId = paymentIntent.metadata?.userId;

  if (!userId) {
    // Not all payment intents have userId metadata (e.g., one-time payments without context)
    logger.info('Payment intent succeeded without userId metadata', {
      paymentIntentId: paymentIntent.id,
    });
    return;
  }

  logger.info('Payment intent succeeded', {
    paymentIntentId: paymentIntent.id,
    userId,
    amount: paymentIntent.amount,
  });

  // The checkout.session.completed handler should have already processed this
  // This is a fallback in case it didn't
  try {
    const userRef = adminDb.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      logger.error('User not found for payment intent', { userId, paymentIntentId: paymentIntent.id });
      return;
    }

    const userData = userDoc.data();

    // Only update if not already purchased (avoid duplicate processing)
    if (userData?.courseAccess?.status !== 'purchased') {
      await userRef.update({
        'courseAccess.status': 'purchased',
        'courseAccess.purchasedAt': Timestamp.now(),
        'courseAccess.stripePaymentIntentId': paymentIntent.id,
        'courseAccess.stripeCustomerId': paymentIntent.customer,
      });

      logger.info('Updated user access via payment_intent.succeeded fallback', {
        userId,
        paymentIntentId: paymentIntent.id,
      });
    }
  } catch (error) {
    logger.error('Failed to process payment intent', {
      error,
      paymentIntentId: paymentIntent.id,
      userId,
    });
    throw error;
  }
}
