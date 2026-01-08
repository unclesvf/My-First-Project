# Security Fixes Implementation Guide

## Critical Issues Fixed

### ✅ 1. Error Boundary Added
**File:** `app/error.tsx`
- Created comprehensive error boundary
- Graceful error handling with user-friendly UI
- Development mode shows error details
- Production mode hides sensitive information

### ✅ 2. Secure Logging Implemented
**File:** `lib/utils/logger.ts`
- Environment-aware logging utility
- Development: Full error details logged
- Production: Only sanitized error codes logged
- Prevents information disclosure

**Updated:** `lib/firebase/auth.ts`
- Replaced all `console.error` with `logger.error`
- Sensitive authentication errors no longer exposed

### ✅ 3. Firestore Security Rules Created
**File:** `firestore.rules`
- Comprehensive role-based access control (RBAC)
- User profiles protected (users can only read/write their own)
- Teacher-student relationships enforced
- Quiz attempts are immutable (can't be tampered with)
- Progress tracking restricted to owners and their teachers
- Assignments can only be created by teachers

**Deploy Rules:**
```bash
firebase deploy --only firestore:rules
```

---

## Critical Issues Requiring Manual Action

### 🚨 1. Exposed Firebase Credentials

**Current Status:** `.env.local` contains real Firebase credentials

**Action Required:**
1. **Do NOT commit `.env.local` to git**
   ```bash
   # Verify it's in .gitignore
   grep ".env*.local" .gitignore
   ```

2. **Regenerate Firebase credentials:**
   - Go to Firebase Console: https://console.firebase.google.com/
   - Select project: `history-for-homeschoolers`
   - Navigate to Project Settings → General
   - Under "Your apps" → Web app
   - Click "Reset" on API keys if compromised
   - Update `.env.local` with new credentials

3. **Create example file for developers:**
   ```bash
   cp .env.local .env.local.example
   # Edit .env.local.example and replace values with placeholders
   ```

**Example `.env.local.example`:**
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 🚨 2. Massive Data File (730KB)

**Current Issue:** `data/lessons.ts` is 730KB and loaded on every page

**Recommended Solutions:**

**Option A: Split into per-lesson files** (Easiest)
```bash
# Create script to split lessons
mkdir data/lessons
# Create lesson-1.ts, lesson-2.ts, etc.
```

Then use dynamic imports:
```typescript
// In app/lesson/[id]/page.tsx
const lessonModule = await import(`@/data/lessons/${id}.ts`);
const lesson = lessonModule.default;
```

**Option B: Move to Firestore** (Best for scalability)
- Upload lessons to Firestore
- Fetch only needed lesson at runtime
- Reduces initial bundle size
- Enables dynamic content updates

**Option C: Convert to JSON in public folder**
```bash
# Create export script
node scripts/lessons-to-json.js
# Moves data to public/data/lessons.json
# Fetch at runtime with fetch()
```

---

## High Priority Fixes Needed

### 3. Input Validation

**Add to `lib/firebase/auth.ts`:**

```typescript
// Email validation
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password strength validation
function validatePassword(password: string): boolean {
  return password.length >= 8 &&
         /[A-Z]/.test(password) &&
         /[a-z]/.test(password) &&
         /[0-9]/.test(password);
}

// Update signUpWithEmail function:
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  // Validate inputs
  if (!validateEmail(email)) {
    throw new Error('Please enter a valid email address');
  }

  if (!validatePassword(password)) {
    throw new Error(
      'Password must be at least 8 characters with uppercase, lowercase, and number'
    );
  }

  if (displayName.trim().length < 2) {
    throw new Error('Please enter your full name');
  }

  // ... rest of function
}
```

### 4. XSS Protection

**Install DOMPurify:**
```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

**Create sanitization utility:**
```typescript
// lib/utils/sanitize.ts
import DOMPurify from 'dompurify';

export function sanitizeHtml(dirty: string): string {
  if (typeof window === 'undefined') return dirty; // Server-side
  return DOMPurify.sanitize(dirty);
}

export function sanitizeText(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
```

### 5. Security Headers

**Update `next.config.ts`:**
```typescript
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/history",
  images: { unoptimized: true },

  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.firebase.com *.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' *.firebase.com *.googleapis.com *.firebaseio.com;"
          }
        ]
      }
    ];
  },
};
```

**Note:** `output: "export"` may not support `headers()`. For static export, add headers in web server config (Apache `.htaccess` or Nginx config).

---

## Medium Priority Fixes

### 6. Accessibility (ARIA Labels)

**Add to all interactive components:**

**Example - FlashcardDeck.tsx:**
```typescript
<motion.div
  className="relative h-full w-full cursor-pointer"
  onClick={() => setIsFlipped(!isFlipped)}
  role="button"
  tabIndex={0}
  aria-label={`Flashcard ${currentIndex + 1} of ${cards.length}. ${
    isFlipped ? 'Showing definition' : 'Showing term'
  }. Press space to flip.`}
  onKeyDown={(e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  }}
>
```

**Navigation buttons:**
```typescript
<button
  onClick={goToPrevious}
  disabled={currentIndex === 0}
  aria-label="Previous flashcard"
  className="..."
>
```

### 7. Loading States

**Update AuthContext to expose loading:**
```typescript
// In AuthContext.tsx
return (
  <AuthContext.Provider value={{ ...value, loading }}>
    {children}
  </AuthContext.Provider>
);
```

**Use in layout:**
```typescript
// In app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthLoadingWrapper>
            {children}
          </AuthLoadingWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}

function AuthLoadingWrapper({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSkeleton />;
  }

  return <>{children}</>;
}
```

---

## Testing Checklist

### Security Testing
- [ ] Verify `.env.local` is in `.gitignore` and not committed
- [ ] Deploy Firestore security rules: `firebase deploy --only firestore:rules`
- [ ] Test authentication with invalid emails/passwords
- [ ] Attempt to access other users' data (should be denied)
- [ ] Try to modify quiz attempts after creation (should fail)
- [ ] Test role escalation (student trying to become teacher)

### Functionality Testing
- [ ] Error boundary catches errors and shows friendly UI
- [ ] Logger works in development mode (shows full errors)
- [ ] Logger works in production mode (sanitizes errors)
- [ ] All pages load without console errors
- [ ] Authentication flows work correctly
- [ ] Data operations respect security rules

### Accessibility Testing
- [ ] Tab through entire app (keyboard navigation)
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Verify all buttons have labels
- [ ] Check color contrast ratios (WCAG AA)

---

## Deployment Steps

1. **Update environment variables:**
   ```bash
   # Ensure .env.local is NOT in git
   git status | grep .env.local  # Should show nothing
   ```

2. **Deploy Firestore rules:**
   ```bash
   firebase deploy --only firestore:rules
   ```

3. **Build and test locally:**
   ```bash
   npm run build
   npm run start
   ```

4. **Deploy to production:**
   ```bash
   # Your existing deployment script
   bash deploy-scp.sh
   ```

5. **Verify production:**
   - Test authentication
   - Verify error boundary works
   - Check browser console for no errors
   - Test data access permissions

---

## Ongoing Maintenance

### Regular Security Audits
```bash
# Check for vulnerable dependencies
npm audit

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

### Monitor Firebase Usage
- Check Firebase Console for unusual activity
- Monitor Firestore read/write quotas
- Review authentication logs for suspicious logins

### Error Monitoring
- Consider adding error tracking service (Sentry, DataDog)
- Monitor production errors in Firebase Crashlytics
- Review user-reported issues regularly

---

## Questions or Issues?

If you encounter any issues implementing these fixes, refer to:
- Firebase Documentation: https://firebase.google.com/docs
- Next.js Security: https://nextjs.org/docs/advanced-features/security-headers
- OWASP Top 10: https://owasp.org/www-project-top-ten/
