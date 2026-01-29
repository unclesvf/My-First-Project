import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebase/config';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { createPurchase } from '@/lib/firebase/firestore';
import { logger } from '@/lib/utils/logger';

/**
 * POST /api/stripe/webhooks
 * Handles Stripe webhook events for checkout completion
 *
 * Verifies webhook signature and processes:
 * - checkout.session.completed: Updates user profile with purchase info
 */
export async function POST(request: NextRequest) {
  // Verify required environment variables
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    logger.error('Missing Stripe configuration');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      logger.error('Missing stripe-signature header');
      return NextResponse.json(
        { error: 'Missing webhook signature' },
        { status: 400 }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-12-15.clover',
    });

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (error) {
      logger.error('Webhook signature verification failed', error);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 401 }
      );
    }

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.client_reference_id;
      const stripeCustomerId = session.customer as string;
      const stripePaymentIntentId = session.payment_intent as string;

      // Validate required fields
      if (!userId || !stripePaymentIntentId) {
        logger.error('Invalid checkout session data');
        return NextResponse.json(
          { error: 'Invalid session data' },
          { status: 400 }
        );
      }

      try {
        // Get payment intent details
        const paymentIntent = await stripe.paymentIntents.retrieve(
          stripePaymentIntentId
        );

        const amount = paymentIntent.amount;
        const currency = paymentIntent.currency.toUpperCase();
        const status = paymentIntent.status === 'succeeded' ? 'succeeded' : 'pending';

        // Update user profile with purchase information
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
          courseAccess: {
            status: 'purchased',
            trialStartedAt: null,
            trialEndsAt: null,
            purchasedAt: Timestamp.now(),
            stripePaymentIntentId,
            stripeCustomerId,
          },
        });

        // Create purchase record in Firestore
        await createPurchase({
          userId,
          amount,
          currency,
          stripePaymentIntentId,
          stripeCustomerId: stripeCustomerId || '',
          status: status as 'succeeded' | 'pending' | 'failed',
          purchasedAt: Timestamp.now(),
        });

        logger.info(`Purchase completed for user ${userId}`, { amount, currency });

        return NextResponse.json({ received: true }, { status: 200 });
      } catch (error) {
        logger.error(`Failed to process purchase for user ${userId}`, error);
        // Return 200 to prevent Stripe from retrying
        // Log should be reviewed for manual intervention
        return NextResponse.json({ received: true }, { status: 200 });
      }
    }

    // Return 200 for other event types
    logger.info(`Unhandled webhook event type: ${event.type}`);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    logger.error('Webhook processing error', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
