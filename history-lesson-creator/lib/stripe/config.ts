import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

/**
 * Get or initialize the Stripe instance
 * Uses the publishable key from environment variables
 */
export const getStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable');
      return null;
    }

    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
};

/**
 * Stripe configuration constants
 */
export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || '',
  coursePrice: parseInt(process.env.NEXT_PUBLIC_COURSE_PRICE || '1999', 10), // in cents
};

/**
 * Validate Stripe configuration
 */
export const isStripeConfigured = (): boolean => {
  return Boolean(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID &&
    process.env.NEXT_PUBLIC_COURSE_PRICE
  );
};
