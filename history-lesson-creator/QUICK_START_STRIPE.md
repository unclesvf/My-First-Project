# Stripe Integration - Quick Start Guide

## 1. Setup Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_KEY_HERE
NEXT_PUBLIC_STRIPE_PRICE_ID=price_YOUR_PRICE_ID
```

Get values from: https://dashboard.stripe.com/test/apikeys

## 2. Create API Route

Create `/app/api/stripe/create-checkout-session/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import * as admin from 'firebase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userEmail, priceId, successUrl, cancelUrl, courseId, courseName } = body;

    // Validate required fields
    if (!userId || !userEmail || !priceId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      customer_email: userEmail,
      metadata: {
        userId,
        courseId: courseId || 'history-for-homeschoolers',
        courseName: courseName || 'History for Homeschoolers',
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
```

## 3. Add Purchase Button to Page

```typescript
import { PurchaseCourseButton } from '@/components/payment/PurchaseCourseButton';

export default function LessonPage() {
  return (
    <div>
      <h1>Lesson Title</h1>

      <PurchaseCourseButton
        course={{
          id: 'history-for-homeschoolers',
          name: 'History for Homeschoolers',
        }}
        onSuccess={() => window.location.reload()}
        onError={(error) => console.error(error)}
      />
    </div>
  );
}
```

## 4. Check Lesson Access

```typescript
import { checkLessonAccess } from '@/lib/utils/accessControl';
import { useAuth } from '@/lib/hooks/useAuth';

export function LessonContent({ lessonNumber }: { lessonNumber: number }) {
  const { userProfile } = useAuth();
  const access = checkLessonAccess(lessonNumber, userProfile);

  if (!access.allowed) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">{access.reason}</p>
        <PurchaseCourseButton
          course={{ id: 'history-for-homeschoolers', name: 'Course' }}
        />
      </div>
    );
  }

  return <div>{/* lesson content */}</div>;
}
```

## 5. Start Trial (Optional)

```typescript
import { startTrial } from '@/lib/firebase/trial';
import { useAuth } from '@/lib/hooks/useAuth';

export function TrialButton() {
  const { user } = useAuth();

  const handleStartTrial = async () => {
    if (!user) return;
    try {
      const success = await startTrial(user.uid);
      if (success) {
        alert('Trial started! 7 days of access granted.');
        window.location.reload();
      }
    } catch (error) {
      alert('Failed to start trial');
    }
  };

  return (
    <button
      onClick={handleStartTrial}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
      Start Free Trial
    </button>
  );
}
```

## 6. Display Access Status

```typescript
import { getAccessStatusMessage } from '@/lib/utils/accessControl';
import { useAuth } from '@/lib/hooks/useAuth';

export function AccessStatus() {
  const { userProfile } = useAuth();
  const message = getAccessStatusMessage(userProfile);

  return (
    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="text-blue-900 text-sm">{message}</p>
    </div>
  );
}
```

## Testing with Stripe Test Cards

Use these cards to test in development:

| Card Number | Exp | CVC | Result |
|-------------|-----|-----|--------|
| 4242 4242 4242 4242 | 12/25 | 123 | Success |
| 4000 0000 0000 0002 | 12/25 | 123 | Declined |
| 4000 0025 0000 3155 | 12/25 | 123 | Requires auth |

Reference: https://stripe.com/docs/testing

## File Structure

```
lib/
  stripe/
    config.ts          - Stripe initialization
    checkout.ts        - Checkout functions
  firebase/
    trial.ts          - Trial management
  utils/
    accessControl.ts  - Access control logic
components/
  payment/
    PurchaseCourseButton.tsx - Purchase button component
```

## Common Tasks

### Get User's Access Status
```typescript
const access = checkLessonAccess(9, userProfile);
// {
//   allowed: true/false,
//   reason: "Error message if denied"
// }
```

### Check if Trial is Active
```typescript
const trialStatus = await getTrialStatus(userId);
console.log(trialStatus.isActive);      // boolean
console.log(trialStatus.daysRemaining); // number
```

### Get User-Friendly Message
```typescript
const message = getAccessStatusMessage(userProfile);
// "You have a free trial with 3 days remaining"
// "You have full access to all lessons"
// "You have access to the first 8 free lessons"
```

### Check if Lesson is Free
```typescript
const isFree = isLessonFree(5);  // true (lessons 1-8)
const isPaid = isLessonFree(10); // false (lesson 9+)
```

## Troubleshooting

### "Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
- Add key to `.env.local`
- Restart dev server: `npm run dev`
- Check key starts with `pk_test_` or `pk_live_`

### Checkout not working
- Verify API route is created
- Check `/api/stripe/create-checkout-session` exists
- Look for errors in browser console
- Verify Stripe key is valid

### Trial not working
- Check Firebase database has courseAccess field
- Verify `NEXT_PUBLIC_TRIAL_DAYS` env var is set
- Look for errors in browser console

### Access always denied
- Check lesson number (should be 1-indexed)
- Verify `NEXT_PUBLIC_FREE_LESSONS_COUNT` is set
- Check userProfile.courseAccess status
- Look at trial/purchase dates

## Related Files

- **lib/contexts/AuthContext.tsx** - User authentication context
- **lib/firebase/config.ts** - Firebase initialization
- **lib/hooks/useAuth.ts** - Auth hook
- **components/auth/AuthModal.tsx** - Authentication modal

## Further Reading

- STRIPE_INTEGRATION_GUIDE.md - Comprehensive guide
- PHASE_2_IMPLEMENTATION_SUMMARY.md - Implementation details
- https://stripe.com/docs/checkout/payment-integration - Stripe docs
- https://firebase.google.com/docs - Firebase docs

---

**Quick Questions?** Check the comprehensive guides above.
