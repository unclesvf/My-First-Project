# Stripe Integration Guide - Phase 2

This document covers the Stripe payment integration and lesson access control system for the History for Homeschoolers application.

## Overview

The Stripe integration consists of 5 main components:

1. **Stripe Config** - Client-side Stripe initialization
2. **Checkout Functions** - Session creation and redirect handling
3. **Purchase Button Component** - UI for initiating purchases
4. **Trial Management** - Firebase-based trial system
5. **Access Control** - Lesson access validation logic

## File Structure

```
lib/
  stripe/
    config.ts          # Stripe initialization and configuration
    checkout.ts        # Checkout session and redirect functions
  firebase/
    trial.ts           # Trial management functions
  utils/
    accessControl.ts   # Lesson access control logic
components/
  payment/
    PurchaseCourseButton.tsx  # Purchase button component
```

## Configuration

### Environment Variables

Add these to your `.env.local` file:

```bash
# Stripe Configuration (Test Keys for Development)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Product Configuration
NEXT_PUBLIC_STRIPE_PRICE_ID=price_...

# Course Configuration
NEXT_PUBLIC_COURSE_PRICE=1999        # Price in cents
NEXT_PUBLIC_FREE_LESSONS_COUNT=8     # Number of free lessons
NEXT_PUBLIC_TRIAL_DAYS=7             # Trial duration in days
```

Get these values from:
- Stripe Dashboard: https://dashboard.stripe.com/test/apikeys
- Create a Stripe Price and get the Price ID from there

### Firebase Configuration

The existing `UserProfile` type already includes `courseAccess` field with trial and purchase tracking:

```typescript
interface CourseAccess {
  status: 'free' | 'trial' | 'purchased';
  trialStartedAt: Timestamp | null;
  trialEndsAt: Timestamp | null;
  purchasedAt: Timestamp | null;
  stripePaymentIntentId: string | null;
  stripeCustomerId: string | null;
}
```

## API Routes Required

You'll need to create the following server-side API route (not included in this package):

### `/api/stripe/create-checkout-session` (POST)

This endpoint should:
1. Validate the user is authenticated
2. Verify the price ID and user email
3. Create a Stripe Checkout Session
4. Store metadata (userId, courseId) in the session
5. Return the session ID to the client

**Required Request Body:**
```typescript
{
  userId: string;
  userEmail: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  courseId?: string;
  courseName?: string;
}
```

**Expected Response:**
```typescript
{
  sessionId: string;
}
```

**Example using Stripe Node SDK:**
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: body.priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: body.successUrl + '?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: body.cancelUrl,
    customer_email: body.userEmail,
    metadata: {
      userId: body.userId,
      courseId: body.courseId,
    },
  });

  return Response.json({ sessionId: session.id });
}
```

## Components

### 1. lib/stripe/config.ts

**Purpose:** Initialize and manage the Stripe client-side instance

**Key Exports:**
- `getStripe()` - Get or initialize Stripe instance (Promise-based)
- `stripeConfig` - Configuration constants
- `isStripeConfigured()` - Validate all required env vars are set

**Usage:**
```typescript
import { getStripe, stripeConfig } from '@/lib/stripe/config';

const stripe = await getStripe();
const price = stripeConfig.coursePrice; // 1999 (in cents)
```

### 2. lib/stripe/checkout.ts

**Purpose:** Handle checkout session creation and Stripe redirect

**Key Exports:**
- `createCheckoutSession()` - Creates a checkout session via API
- `redirectToCheckout()` - Redirects to Stripe Checkout
- `handleCheckout()` - Complete flow (create session + redirect)

**Usage:**
```typescript
import { handleCheckout } from '@/lib/stripe/checkout';

await handleCheckout({
  userId: user.uid,
  userEmail: user.email,
  successUrl: 'https://yoursite.com/success',
  cancelUrl: 'https://yoursite.com/cancel',
  courseId: 'history-for-homeschoolers',
  courseName: 'History for Homeschoolers',
});
```

### 3. components/payment/PurchaseCourseButton.tsx

**Purpose:** React button component for initiating purchases

**Props:**
```typescript
interface PurchaseCourseButtonProps {
  course: {
    id: string;
    name: string;
    description?: string;
  };
  className?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}
```

**Features:**
- Checks if user is authenticated (shows AuthModal if not)
- Prevents duplicate purchases
- Shows loading state during checkout
- Handles errors gracefully
- Uses Tailwind CSS styling

**Usage:**
```typescript
<PurchaseCourseButton
  course={{
    id: 'history-for-homeschoolers',
    name: 'History for Homeschoolers',
  }}
  onSuccess={() => router.push('/thank-you')}
  onError={(error) => console.error(error)}
/>
```

### 4. lib/firebase/trial.ts

**Purpose:** Manage trial periods for course access

**Key Exports:**
- `startTrial(userId)` - Initiate a 7-day trial
- `getTrialStatus(userId)` - Get detailed trial information
- `hasTrialExpired(userId)` - Check if trial has expired
- `isTrialActive(userId)` - Check if trial is currently active
- `getTrialStatusFromProfile(userProfile)` - Synchronous helper

**Trial Status Object:**
```typescript
interface TrialStatus {
  isActive: boolean;
  isExpired: boolean;
  startedAt: Date | null;
  endsAt: Date | null;
  daysRemaining: number;
}
```

**Usage:**
```typescript
import { startTrial, getTrialStatus } from '@/lib/firebase/trial';

// Start a trial for a user
await startTrial(userId);

// Check trial status (async)
const status = await getTrialStatus(userId);
console.log(`Trial active: ${status.isActive}`);
console.log(`Days remaining: ${status.daysRemaining}`);

// Check from profile (sync)
const status = getTrialStatusFromProfile(userProfile);
```

### 5. lib/utils/accessControl.ts

**Purpose:** Determine lesson access based on user status

**Key Exports:**
- `checkLessonAccess()` - Check if user can access a lesson
- `isLessonFree()` - Check if a lesson is in free tier
- `getFreeLessonsCount()` - Get number of free lessons
- `hasLessonAccessToAny()` - Check if user has premium access
- `getAccessStatusMessage()` - Get user-friendly status message
- `getLessonAction()` - Determine required action (view/start_trial/purchase)

**Access Rules:**
1. Lessons 1-8: Always free for everyone
2. Lessons 9+: Require either:
   - Active trial
   - Purchased access

**Usage:**
```typescript
import { checkLessonAccess, getLessonAction } from '@/lib/utils/accessControl';

// Check access for lesson 10
const result = checkLessonAccess(10, userProfile);
if (!result.allowed) {
  console.log(`Access denied: ${result.reason}`);
}

// Get recommended action
const action = getLessonAction(10, userProfile);
// Returns: 'view' | 'start_trial' | 'purchase'

// Get status message for UI
const message = getAccessStatusMessage(userProfile);
// "You have a free trial with 3 days remaining"
```

## Integration Examples

### Example 1: Add Purchase Button to Lesson Page

```typescript
// app/lesson/[id]/page.tsx
import { PurchaseCourseButton } from '@/components/payment/PurchaseCourseButton';

export default function LessonPage() {
  return (
    <div>
      <h1>Lesson 10: Advanced History</h1>

      <PurchaseCourseButton
        course={{
          id: 'history-for-homeschoolers',
          name: 'History for Homeschoolers Course',
        }}
      />
    </div>
  );
}
```

### Example 2: Check Lesson Access

```typescript
// components/LessonView.tsx
import { checkLessonAccess } from '@/lib/utils/accessControl';
import { useAuth } from '@/lib/hooks/useAuth';

export function LessonView({ lessonNumber }: { lessonNumber: number }) {
  const { userProfile } = useAuth();
  const access = checkLessonAccess(lessonNumber, userProfile);

  if (!access.allowed) {
    return <AccessDeniedMessage reason={access.reason} />;
  }

  return <LessonContent />;
}
```

### Example 3: Start Trial

```typescript
// components/TrialButton.tsx
import { startTrial } from '@/lib/firebase/trial';
import { useAuth } from '@/lib/hooks/useAuth';

export function TrialButton() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleStartTrial = async () => {
    setLoading(true);
    try {
      const success = await startTrial(user!.uid);
      if (success) {
        alert('Trial started! You have 7 days of access.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleStartTrial} disabled={loading}>
      {loading ? 'Starting...' : 'Start Free Trial'}
    </button>
  );
}
```

### Example 4: Display Access Status

```typescript
// components/AccessStatus.tsx
import { getAccessStatusMessage } from '@/lib/utils/accessControl';
import { useAuth } from '@/lib/hooks/useAuth';

export function AccessStatus() {
  const { userProfile } = useAuth();
  const message = getAccessStatusMessage(userProfile);

  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <p>{message}</p>
    </div>
  );
}
```

## Webhook Handling (Optional for Phase 2)

For production, you'll want to handle Stripe webhooks to:
1. Update purchase status when payment succeeds
2. Send confirmation emails
3. Update Firebase with purchase records

You'll need to create `/api/stripe/webhooks` endpoint that:
- Validates webhook signature using `STRIPE_WEBHOOK_SECRET`
- Handles `checkout.session.completed` event
- Updates user's `courseAccess.status` to 'purchased'
- Records purchase timestamp

## Testing Checklist

- [ ] Configure environment variables in `.env.local`
- [ ] Create Stripe test price and product
- [ ] Implement `/api/stripe/create-checkout-session` endpoint
- [ ] Test authentication flow (unauthenticated user -> AuthModal)
- [ ] Test free lessons (lessons 1-8)
- [ ] Test trial flow (start trial, check status)
- [ ] Test purchase flow (checkout redirect)
- [ ] Test access control (lesson 9+ without access)
- [ ] Test error handling (invalid session, network errors)
- [ ] Test trial expiration (manual date adjustment)

## Troubleshooting

### "Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
- Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env.local`
- Restart dev server with `npm run dev`

### Checkout not redirecting
- Verify Stripe is initialized: `isStripeConfigured()`
- Check browser console for errors
- Ensure success/cancel URLs are valid

### Trial not showing
- Check `courseAccess.trialStartedAt` in Firebase
- Verify environment variable `NEXT_PUBLIC_TRIAL_DAYS` is set
- Check that timestamps are Firestore Timestamps, not regular Date objects

### Access always denied
- Verify `courseAccess` object exists in user profile
- Check that lesson number is correct (1-indexed)
- Verify `NEXT_PUBLIC_FREE_LESSONS_COUNT` is set correctly

## Security Considerations

1. **API Routes:** Always validate user authentication on server
2. **Price Validation:** Never trust client-side price - verify in API
3. **Stripe Key:** Keep `STRIPE_SECRET_KEY` server-side only
4. **Webhook Signature:** Validate webhook signature on every request
5. **User ID:** Verify user can only purchase for themselves

## Next Steps

1. Create `/api/stripe/create-checkout-session` endpoint
2. Create `/api/stripe/webhooks` endpoint for payment confirmation
3. Create success/cancel/thank-you pages
4. Integrate trial button in lesson access flow
5. Add email notifications for purchases
6. Set up Stripe dashboard for monitoring

---

**Dependencies:**
- @stripe/stripe-js (^8.6.1)
- stripe (^20.1.2)
- firebase (^12.7.0)
- next (^15.1.6)

**Created:** January 9, 2026
**Phase:** 2 - Payment Integration
