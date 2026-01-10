import { stripeConfig } from './config';

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
  error?: string;
}

/**
 * Creates a Stripe checkout session
 * Should be called from a server-side API route
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
    return { sessionId: data.sessionId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error creating checkout session:', errorMessage);
    return {
      sessionId: '',
      error: errorMessage,
    };
  }
};

/**
 * Redirects to Stripe Checkout
 * This should be called after getting a session ID from createCheckoutSession
 */
export const redirectToCheckout = async (sessionId: string): Promise<void> => {
  try {
    const { getStripe } = await import('./config');
    const stripe = await getStripe();

    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    const { error } = await (stripe as any).redirectToCheckout({
      sessionId,
    });

    if (error) {
      throw new Error(error.message || 'Failed to redirect to Stripe');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error redirecting to checkout:', errorMessage);
    throw error;
  }
};

/**
 * Handle complete checkout flow: create session and redirect
 */
export const handleCheckout = async (params: CheckoutSessionParams): Promise<void> => {
  const { sessionId, error } = await createCheckoutSession(params);

  if (error || !sessionId) {
    throw new Error(error || 'Failed to create checkout session');
  }

  await redirectToCheckout(sessionId);
};
