import { stripeConfig } from './config';
import { logger } from '@/lib/utils/logger';

interface CheckoutSessionParams {
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
  courseId?: string;
  courseName?: string;
}

interface CheckoutSessionResponse {
  sessionId: string;
  url?: string;
  error?: string;
}

/**
 * Creates a Stripe checkout session
 * Returns session ID and checkout URL for redirect
 */
export const createCheckoutSession = async (
  params: CheckoutSessionParams
): Promise<CheckoutSessionResponse> => {
  try {
    const { userId, userEmail, successUrl, cancelUrl, courseId = 'history-for-homeschoolers', courseName = 'History for Homeschoolers' } = params;

    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        userEmail,
        priceId: stripeConfig.priceId,
        successUrl,
        cancelUrl,
        courseId,
        courseName,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checkout session');
    }

    const data = await response.json();
    return { sessionId: data.sessionId, url: data.url };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error('Error creating checkout session', error);
    return {
      sessionId: '',
      error: errorMessage,
    };
  }
};

/**
 * Redirects to Stripe Checkout using the session URL
 */
export const redirectToCheckout = async (checkoutUrl: string): Promise<void> => {
  if (!checkoutUrl) {
    throw new Error('Checkout URL is required');
  }

  // Redirect to Stripe checkout
  window.location.href = checkoutUrl;
};

/**
 * Handle complete checkout flow: create session and redirect
 */
export const handleCheckout = async (params: CheckoutSessionParams): Promise<void> => {
  const { url, error } = await createCheckoutSession(params);

  if (error || !url) {
    throw new Error(error || 'Failed to create checkout session');
  }

  await redirectToCheckout(url);
};
