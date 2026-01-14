# History for Homeschoolers - Complete Setup Instructions

**Project:** History Lesson Creator with Firebase Auth + Stripe Payments
**Date:** January 2026
**Estimated Time:** 2-3 hours total

---

## ⚠️ CRITICAL: Prerequisites

Before starting, ensure you have:
- [ ] Google/Gmail account (for Firebase)
- [ ] Credit/debit card (for Stripe - no charges in test mode)
- [ ] Access to your domain/hosting
- [ ] Computer with internet connection

---

## 📋 PART 1: Create Environment Configuration File (5 minutes)

### Step 1.1: Create .env.local File

1. Open your project folder:
   ```
   C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator
   ```

2. Create a new file named `.env.local` (note the dot at the beginning)

3. Copy and paste this template into the file:

```
# ============================================
# FIREBASE CONFIGURATION
# ============================================
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# ============================================
# STRIPE CONFIGURATION
# ============================================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# ============================================
# COURSE CONFIGURATION
# ============================================
NEXT_PUBLIC_COURSE_PRICE=1999
NEXT_PUBLIC_FREE_LESSONS_COUNT=8
NEXT_PUBLIC_TRIAL_DAYS=7
```

4. Save the file (you'll fill in the actual values in the next steps)

---

## 🔥 PART 2: Set Up Firebase (15-20 minutes)

### Step 2.1: Create Firebase Project

1. Go to: **https://console.firebase.google.com/**

2. Click **"Add project"** or **"Create a project"**

3. Enter project name: **"History for Homeschoolers"**

4. Click **Continue**

5. **Disable Google Analytics** (optional, you can enable later)

6. Click **Create project**

7. Wait for project creation (30-60 seconds)

8. Click **Continue** when ready

---

### Step 2.2: Register Your Web App

1. On the Firebase Console home page, click the **Web icon** `</>`

2. Enter app nickname: **"History Lesson Web App"**

3. **Check** the box "Also set up Firebase Hosting"

4. Click **Register app**

5. **COPY the Firebase configuration** (you'll need this)
   - Look for the code that looks like:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123:web:abc123"
   };
   ```

6. **Copy each value** to your `.env.local` file:
   - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `storageBucket` → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`

7. Click **Continue to console**

---

### Step 2.3: Enable Authentication

1. In the Firebase Console, click **"Build"** in the left sidebar

2. Click **"Authentication"**

3. Click **"Get started"**

4. Click on **"Sign-in method"** tab

5. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle **Enable** switch to ON
   - Click **Save**

6. Enable **Google Sign-In**:
   - Click on "Google"
   - Toggle **Enable** switch to ON
   - Enter support email: **your email address**
   - Click **Save**

---

### Step 2.4: Create Firestore Database

1. In the Firebase Console, click **"Firestore Database"** (under Build)

2. Click **"Create database"**

3. Select **"Start in production mode"**

4. Click **Next**

5. Choose location: **us-central** (or closest to you)

6. Click **Enable**

7. Wait for database creation (30 seconds)

---

### Step 2.5: Configure Firestore Security Rules

1. In Firestore Database, click the **"Rules"** tab

2. **Delete all existing text** and paste this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated() && isOwner(userId);
      allow create: if isAuthenticated() && isOwner(userId);
      allow update: if isAuthenticated() && isOwner(userId);

      // Quiz attempts subcollection
      match /quizAttempts/{attemptId} {
        allow read: if isAuthenticated() && isOwner(userId);
        allow create: if isAuthenticated() && isOwner(userId);
      }

      // Lesson progress subcollection
      match /lessonProgress/{lessonId} {
        allow read: if isAuthenticated() && isOwner(userId);
        allow write: if isAuthenticated() && isOwner(userId);
      }
    }

    // Purchases collection
    match /purchases/{purchaseId} {
      allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated();
    }
  }
}
```

3. Click **Publish**

---

### Step 2.6: Add Authorized Domain

1. Go to **Authentication** → **Settings** tab

2. Scroll to **"Authorized domains"**

3. Click **"Add domain"**

4. Add your production domain (e.g., `auntsvaluefarm.com`)

5. For testing, `localhost` should already be there

---

## 💳 PART 3: Set Up Stripe (20-30 minutes)

### Step 3.1: Create Stripe Account

1. Go to: **https://stripe.com**

2. Click **"Start now"** or **"Sign up"**

3. Enter your email address

4. Create a strong password

5. Enter your country: **United States**

6. Click **"Create account"**

7. **Verify your email** (check inbox for confirmation email)

---

### Step 3.2: Get API Keys (Test Mode)

1. In Stripe Dashboard, click **"Developers"** in top right

2. Click **"API keys"** in the left sidebar

3. Make sure you're in **"Test mode"** (toggle in top right)

4. **Copy the Publishable key** (starts with `pk_test_`)
   - Paste into `.env.local` as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

5. Click **"Reveal test key"** for Secret key

6. **Copy the Secret key** (starts with `sk_test_`)
   - Paste into `.env.local` as `STRIPE_SECRET_KEY`

---

### Step 3.3: Create Product and Price

1. In Stripe Dashboard, click **"Products"** in left sidebar

2. Click **"+ Add product"**

3. Fill in product details:
   - **Name:** American History Course (7th Grade)
   - **Description:** Complete American History course with 51 lessons, interactive flashcards, and comprehensive quizzes. Lifetime access.
   - **Pricing model:** One time
   - **Price:** $19.99
   - **Currency:** USD

4. Click **"Add product"**

5. **COPY THE PRICE ID** (starts with `price_`)
   - You'll need this for your code
   - It appears under the $19.99 price

---

### Step 3.4: Set Up Webhook

**⚠️ IMPORTANT:** You need your website URL for this step. If you haven't deployed yet, you can skip this and come back after deployment.

1. In Stripe Dashboard, click **"Developers"** → **"Webhooks"**

2. Click **"+ Add endpoint"**

3. Enter endpoint URL:
   ```
   https://your-domain.com/api/stripe/webhooks
   ```
   Replace `your-domain.com` with your actual domain

4. Click **"Select events"**

5. Search for and select: **`checkout.session.completed`**

6. Click **"Add events"**

7. Click **"Add endpoint"**

8. **COPY THE SIGNING SECRET** (starts with `whsec_`)
   - Click "Reveal" next to "Signing secret"
   - Paste into `.env.local` as `STRIPE_WEBHOOK_SECRET`

---

### Step 3.5: Configure Stripe Product in Code

1. Open this file:
   ```
   components/payment/PurchaseCourseButton.tsx
   ```

2. Find this line (around line 20):
   ```typescript
   const priceId = 'price_1234567890';
   ```

3. Replace `'price_1234567890'` with your actual Price ID from Step 3.3

4. Save the file

---

## 🧪 PART 4: Test Locally (30 minutes)

### Step 4.1: Install Dependencies (if not done)

1. Open Command Prompt or Terminal

2. Navigate to project:
   ```
   cd C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator
   ```

3. Install packages:
   ```
   npm install
   ```

4. Wait for installation to complete (2-3 minutes)

---

### Step 4.2: Start Development Server

1. In the same terminal, run:
   ```
   npm run dev
   ```

2. Wait for server to start (30 seconds)

3. You should see:
   ```
   ✓ Ready on http://localhost:3000
   ```

4. Open browser and go to: **http://localhost:3000**

---

### Step 4.3: Test Authentication Flow

**Test Email/Password Signup:**
1. Click "Sign In" button in navigation
2. Click "Sign Up" tab
3. Enter test details:
   - Display Name: Test User
   - Email: test@example.com
   - Password: testpass123
4. Click "Sign Up"
5. Verify you're logged in (name appears in top right)

**Test Google Sign-In:**
1. Sign out (click your name → Sign Out)
2. Click "Sign In" button
3. Click "Sign in with Google"
4. Select your Google account
5. Verify login successful

---

### Step 4.4: Test Free Lessons

1. Go to home page
2. Click on "Lesson 1"
3. Verify lesson loads without paywall
4. Try lessons 2-8 (all should work)

---

### Step 4.5: Test Trial System

1. Make sure you're logged in
2. Click on "Lesson 9"
3. You should see a modal: "Start 7-Day Free Trial"
4. Click "Start Free Trial"
5. Trial should start, modal closes
6. Verify you can now access Lesson 9
7. Check if trial banner appears at top

---

### Step 4.6: Test Purchase Flow

**⚠️ Use Stripe Test Cards - No Real Charges**

1. Click on "Lesson 10" (or any lesson 9+)
2. If trial expired, you'll see purchase modal
3. Click "Purchase Course - $19.99"
4. Stripe Checkout should open
5. Use test card details:
   - **Card number:** 4242 4242 4242 4242
   - **Expiry:** 12/34 (any future date)
   - **CVC:** 123
   - **ZIP:** 12345
   - **Name:** Test User
6. Click "Pay"
7. Should redirect to success page
8. Verify all lessons now accessible

---

### Step 4.7: Test Quiz and Progress

1. Go to any lesson (e.g., Lesson 1)
2. Navigate to "Quiz" tab
3. Complete the quiz
4. Click "Dashboard" in navigation
5. Verify quiz appears in history
6. Check progress statistics

---

### Step 4.8: Verify Firestore Data

1. Go to Firebase Console
2. Click "Firestore Database"
3. You should see collections:
   - **users** (with your user document)
   - Inside your user: **quizAttempts** subcollection
   - Inside your user: **lessonProgress** subcollection
4. If you completed a purchase:
   - **purchases** collection should exist

---

## 🚀 PART 5: Build and Deploy (15-20 minutes)

### Step 5.1: Build Production Version

1. Stop development server (Ctrl+C in terminal)

2. Build the project:
   ```
   npm run build
   ```

3. Wait for build to complete (2-5 minutes)

4. Verify no errors in output

5. Expected output:
   ```
   ✓ Compiled successfully
   ✓ Collecting page data
   ✓ Generating static pages
   ```

---

### Step 5.2: Deploy to Hosting

**Option A: Using your existing A2Hosting (via SCP)**

1. If you have `deploy-scp.sh` script:
   ```
   bash deploy-scp.sh
   ```

2. Enter your SSH password when prompted

3. Wait for upload to complete

**Option B: Manual Upload via FTP**

1. Open FTP client (FileZilla, WinSCP, etc.)
2. Connect to your A2Hosting account
3. Navigate to your web root (usually `public_html`)
4. Upload contents of `out` folder
5. Wait for upload to complete

**Option C: Deploy to Vercel (Alternative)**

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Deploy:
   ```
   vercel
   ```

3. Follow prompts to connect to Vercel account
4. Copy the deployment URL

---

### Step 5.3: Update Stripe Webhook URL

1. Go to Stripe Dashboard → Developers → Webhooks

2. Click on your webhook endpoint

3. Click "..." menu → "Update details"

4. Update endpoint URL to your production URL:
   ```
   https://your-actual-domain.com/api/stripe/webhooks
   ```

5. Click "Update endpoint"

---

### Step 5.4: Test Production Site

1. Go to your production URL in browser

2. Test the same flows as Step 4:
   - [ ] Sign up with email
   - [ ] Sign in with Google
   - [ ] Access free lessons (1-8)
   - [ ] Start trial (lesson 9+)
   - [ ] Complete a quiz
   - [ ] Check dashboard
   - [ ] Test purchase with Stripe test card

---

## 🎯 PART 6: Go Live with Real Payments (10 minutes)

**⚠️ Only do this when ready to accept real payments**

### Step 6.1: Activate Stripe Account

1. In Stripe Dashboard, click "Activate your account"

2. Fill in business information:
   - Business type (Individual or Company)
   - Legal business name
   - Tax ID (EIN or SSN)
   - Bank account for payouts
   - Business address

3. Submit for review

4. Wait for approval (usually instant, sometimes 24 hours)

---

### Step 6.2: Switch to Live Keys

1. In Stripe Dashboard, toggle from "Test mode" to "Live mode"

2. Go to Developers → API keys

3. Copy LIVE keys:
   - Publishable key (starts with `pk_live_`)
   - Secret key (starts with `sk_live_`)

4. Update `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
   STRIPE_SECRET_KEY=sk_live_your_live_key
   ```

---

### Step 6.3: Update Webhook for Live Mode

1. In Stripe Dashboard (Live mode), go to Developers → Webhooks

2. Create new webhook endpoint (same URL as test)

3. Select `checkout.session.completed` event

4. Copy the LIVE webhook secret

5. Update `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret
   ```

---

### Step 6.4: Rebuild and Redeploy

1. Rebuild project:
   ```
   npm run build
   ```

2. Redeploy using your chosen method (Step 5.2)

3. Test with a REAL card (small amount like $0.50)

4. Verify payment appears in Stripe Dashboard

5. Refund test payment if desired

---

## ✅ FINAL CHECKLIST

### Configuration Complete:
- [ ] `.env.local` file created with all keys
- [ ] Firebase project created and configured
- [ ] Firestore security rules deployed
- [ ] Authentication enabled (Email + Google)
- [ ] Stripe account created
- [ ] Stripe product created ($19.99)
- [ ] Stripe webhook configured
- [ ] Price ID added to code

### Testing Complete:
- [ ] Local development server runs without errors
- [ ] Signup with email works
- [ ] Google sign-in works
- [ ] Free lessons (1-8) accessible
- [ ] Trial system works (lesson 9+)
- [ ] Purchase flow completes successfully
- [ ] Quiz saves to dashboard
- [ ] Progress tracking works

### Deployment Complete:
- [ ] Production build successful (no errors)
- [ ] Files deployed to hosting
- [ ] Production site loads
- [ ] All features work on production
- [ ] Webhook receiving events

### Optional (when ready for real payments):
- [ ] Stripe account activated
- [ ] Live API keys configured
- [ ] Live webhook configured
- [ ] Test purchase with real card
- [ ] Ready to accept payments

---

## 📞 TROUBLESHOOTING

### "Firebase not initialized"
**Solution:** Check that all Firebase env vars are in `.env.local` and restart dev server

### "Stripe publishable key not found"
**Solution:** Ensure `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is in `.env.local`

### "Webhook signature verification failed"
**Solution:** Verify `STRIPE_WEBHOOK_SECRET` matches the webhook secret in Stripe Dashboard

### Build errors
**Solution:** Run `npm install` to ensure all dependencies are installed

### "Permission denied" in Firestore
**Solution:** Check that security rules are deployed correctly (Step 2.5)

### Google Sign-In not working
**Solution:** Add your domain to Firebase Authorized Domains (Step 2.6)

---

## 🎉 CONGRATULATIONS!

You now have a fully functional learning platform with:
- ✅ User authentication
- ✅ Payment processing
- ✅ Trial system
- ✅ Progress tracking
- ✅ Student dashboard

**Estimated Revenue Potential:**
- 100 students × $19.99 = $1,999/month
- 500 students × $19.99 = $9,995/month
- 1,000 students × $19.99 = $19,990/month

**Next Steps:**
1. Market your course
2. Monitor Firebase/Stripe dashboards
3. Respond to customer questions
4. Add more courses

---

**Support:** If you encounter issues, check the troubleshooting section or review the comprehensive documentation files in your project folder.

**Last Updated:** January 2026
