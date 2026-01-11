# Build & Deploy Skill

## Description
Build, validate, and deploy the course application to production. Handles pre-deployment checks, build verification, and deployment to Vercel or other platforms.

## Usage
User can invoke this skill by saying:
- "deploy to production"
- "build and deploy"
- "prepare for deployment"
- "run deployment checks"
- "/deploy"

## Instructions

You are helping deploy an educational course application to production. Follow these steps carefully:

### Pre-Deployment Checklist

Before deploying, verify all requirements:

#### 1. Environment Configuration
- [ ] Firebase production project configured
- [ ] Stripe live keys configured (not test keys!)
- [ ] All environment variables set in deployment platform
- [ ] No secrets in code or .env files committed

#### 2. Code Quality
- [ ] TypeScript compiles without errors
- [ ] No console.log statements (except intentional)
- [ ] No TODO comments in production code
- [ ] Dev bypass flags disabled for production

#### 3. Content Completeness
- [ ] All planned lessons complete
- [ ] All lessons have required content:
  - 4+ chapters
  - 10+ flashcards
  - 8 quiz questions
- [ ] No placeholder content

#### 4. Functionality
- [ ] Authentication works
- [ ] Payment flow works
- [ ] All lesson modes work (Story, Flashcard, Quiz)
- [ ] Progress tracking works
- [ ] Mobile responsive

### Step 1: Run Build Verification

```bash
cd "C:/Users/scott/My-First-Project/My-First-Project/history-lesson-creator"

# Clean previous builds
rm -rf .next

# Run TypeScript check
npx tsc --noEmit

# Run production build
npm run build
```

**Expected output:**
```
  Creating an optimized production build ...
  Compiled successfully
  Collecting page data ...
  Generating static pages ...
  Collecting build traces ...
  Finalizing page optimization ...

Route (app)                                Size     First Load JS
├ ○ /                                      X.XX kB  XXX kB
├ ○ /dashboard                             X.XX kB  XXX kB
├ ○ /lesson/[id]                           X.XX kB  XXX kB
...
```

### Step 2: Check for Dev Bypasses

Search for dev bypass flags and ensure they're properly conditional:

```bash
grep -r "DEV_BYPASS" --include="*.ts" --include="*.tsx" .
```

These files should have bypasses ONLY active in development:
- `lib/hooks/useTrialStatus.ts`
- `lib/utils/accessControl.ts`
- `components/LessonWithAccessControl.tsx`

Verify bypass is conditional:
```typescript
// CORRECT - Only bypasses in development
const DEV_BYPASS = process.env.NODE_ENV === 'development';

// WRONG - Always bypasses
const DEV_BYPASS = true;
```

### Step 3: Environment Variables for Deployment

Required environment variables for production:

```env
# Firebase (Production Project)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Stripe (LIVE Keys - not test!)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Course Configuration
NEXT_PUBLIC_COURSE_PRICE=1999
NEXT_PUBLIC_FREE_LESSONS_COUNT=8
NEXT_PUBLIC_TRIAL_DAYS=7
```

### Step 4: Deploy to Vercel

#### Option A: Vercel CLI

```bash
# Install Vercel CLI if not installed
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (first time - will prompt for project setup)
vercel

# Deploy to production
vercel --prod
```

#### Option B: Git Push (if Vercel connected to repo)

```bash
cd "C:/Users/scott/My-First-Project/My-First-Project"
git add -A
git commit -m "Prepare for production deployment"
git push
```

Vercel will auto-deploy from the main branch.

#### Option C: Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Import project from GitHub
3. Configure environment variables
4. Deploy

### Step 5: Configure Stripe Webhook

After deployment, set up webhook:

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
4. Copy webhook secret to Vercel environment variables

### Step 6: Verify Production Deployment

After deployment, test:

1. **Home page loads**
   - Visit `https://your-domain.vercel.app`
   - Lesson list displays

2. **Authentication works**
   - Sign up new account
   - Login/logout
   - Google sign-in

3. **Free lessons accessible**
   - Lessons 1-8 viewable without payment
   - All modes work (Story, Flashcard, Quiz)

4. **Paywall appears**
   - Lesson 9+ shows paywall for non-paying users
   - Purchase button leads to Stripe checkout

5. **Payment flow**
   - Complete a test purchase (use Stripe test mode first)
   - Verify access granted after purchase
   - Verify webhook received

6. **Mobile experience**
   - Test on mobile device/emulator
   - All modes usable on small screens

### Step 7: Post-Deployment

After successful deployment:

1. **Monitor for errors**
   - Check Vercel logs
   - Check browser console on production
   - Set up error tracking (Sentry, etc.)

2. **Update documentation**
   - Add production URL to SESSION_STATUS.md
   - Document any deployment-specific settings

3. **Set up analytics**
   - Google Analytics
   - Firebase Analytics

4. **Configure custom domain** (optional)
   - Add domain in Vercel settings
   - Update DNS records
   - Update Firebase authorized domains

### Deployment Platforms

#### Vercel (Recommended)
- Best for Next.js
- Free tier available
- Automatic deployments from Git
- Easy environment variable management

#### Netlify
```bash
npm run build
netlify deploy --prod --dir=.next
```

#### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

#### Self-Hosted
```bash
npm run build
npm run start  # Runs on port 3000
```
Use with PM2, Docker, or systemd.

## Rollback Procedure

If issues found in production:

### Vercel Rollback
1. Go to Vercel Dashboard
2. Click on deployment history
3. Click "..." on previous good deployment
4. Select "Promote to Production"

### Git Rollback
```bash
git revert HEAD
git push
```

## Build Configuration

`next.config.ts` for production:
```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,  // For static export, if needed
  },
  // Remove basePath for root deployment
  // Add basePath if deploying to subdirectory
};
```

## Example Interaction

**User:** "Deploy to production"

**Assistant:** I'll help you deploy to production. Let me run through the pre-deployment checks first.

**1. Running build verification...**

```bash
npm run build
```

Build successful.

**2. Checking dev bypasses...**

Found bypasses in 3 files - all properly conditional on `process.env.NODE_ENV === 'development'`. Will be disabled in production.

**3. Environment variables check...**

Required variables:
- Firebase: Configured
- Stripe: Live keys configured
- Course settings: Configured

**4. Ready for deployment!**

How would you like to deploy?
1. Vercel CLI (I'll run the commands)
2. Git push (auto-deploys if connected)
3. Manual via Vercel dashboard

**User:** "Option 1"

**Assistant:** Deploying to Vercel...

```bash
vercel --prod
```

Deployment complete!

**Production URL:** https://history-for-homeschoolers.vercel.app

**Post-deployment tasks:**
1. Configure Stripe webhook for: https://history-for-homeschoolers.vercel.app/api/stripe/webhook
2. Update Firebase authorized domains
3. Test payment flow in production

Would you like me to walk through the Stripe webhook setup?

## Technical Notes

- Next.js 14 App Router requires Node.js 18+
- Vercel automatically handles server components
- Environment variables must be set in deployment platform
- Stripe webhook secret different from API keys
- Firebase needs authorized domain for production URL

## Success Metrics

A successful deployment:
- Build completes without errors
- All pages load correctly
- Authentication works
- Payment flow works
- No console errors
- Mobile responsive
- Performance acceptable (< 3s initial load)
