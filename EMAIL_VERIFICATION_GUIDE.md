# Email Verification Setup Guide

## Overview

Email verification is **mandatory** for ClayMind before accepting real users, especially since this is a kids platform. This guide walks you through enabling and configuring email verification in Supabase.

## Why Email Verification is Critical

1. **User Safety**: Ensures users are who they claim to be
2. **Platform Protection**: Prevents spam and fake accounts
3. **Legal Compliance**: Required for platforms serving minors
4. **Parent Verification**: Confirms parent email addresses are legitimate

## Current Status

- ✅ AuthService supports email verification
- ✅ RBAC helpers check `isEmailVerified()`
- ✅ Protected routes can require `requireEmailVerified: true`
- ⚠️ Email verification is **not yet enabled** in Supabase

## Step 1: Enable Email Verification in Supabase

### Using Supabase Studio (Local Development)

1. Start Supabase:
   ```bash
   cd claymind
   supabase start
   ```

2. Open Supabase Studio at [http://127.0.0.1:54323](http://127.0.0.1:54323)

3. Navigate to **Authentication** → **Settings**

4. Under **Email Auth Settings**:
   - ✅ Enable "Confirm email"
   - ⚠️ Disable "Enable email confirmations" (don't auto-confirm)
   - Set "Confirmation expiry" to `86400` (24 hours)

5. Click **Save**

### Using Supabase CLI

Edit `supabase/config.toml`:

```toml
[auth.email]
enable_signup = true
double_confirm_changes_enabled = false
enable_confirmations = true  # Set to true
```

Then restart Supabase:
```bash
supabase db reset
```

## Step 2: Customize Email Templates

### Navigate to Email Templates

1. In Supabase Studio: **Authentication** → **Email Templates**
2. Select "Confirm signup" template

### Customize for Kids Platform

```html
<h2>Welcome to ClayMind! 🎨</h2>

<p>Hi {{ .Name }},</p>

<p>Thanks for joining ClayMind! Before you start your AI learning adventure,
we need to verify your email address.</p>

<p>Click the button below to confirm your email:</p>

<a href="{{ .ConfirmationURL }}"
   style="background-color: #9333ea; color: white; padding: 12px 24px;
          text-decoration: none; border-radius: 8px; display: inline-block;">
  Confirm Email
</a>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p>This link will expire in 24 hours.</p>

<p>Happy learning!<br>The ClayMind Team</p>
```

### Parent Email Template

For students under 13, you'll need parent consent. Create a custom email:

```html
<h2>Parent Verification Required</h2>

<p>Hello,</p>

<p>Your child {{ .ChildName }} has created an account on ClayMind.
As a platform for young learners, we require parental consent.</p>

<p>Click below to verify and activate your child's account:</p>

<a href="{{ .VerificationURL }}">Verify Child Account</a>

<p>If you did not authorize this account, please ignore this email.</p>
```

## Step 3: Update Code to Enforce Email Verification

### Protect Critical Routes

In `src/App.tsx` or your route configuration:

```tsx
// Dashboard requires verified email
<Route
  path="/dashboard"
  element={
    <ProtectedRoute options={{ requireEmailVerified: true }}>
      <Dashboard />
    </ProtectedRoute>
  }
/>

// Modules require verified email
<Route
  path="/modules/*"
  element={
    <ProtectedRoute options={{ requireEmailVerified: true }}>
      <Modules />
    </ProtectedRoute>
  }
/>

// Admin panel requires verified email + admin role
<Route
  path="/admin/*"
  element={
    <AdminRoute>
      <AdminPanel />
    </AdminRoute>
  }
/>
```

### Create Email Verification Reminder Page

Create `src/pages/VerifyEmail.tsx`:

```tsx
import { useState } from 'react';
import { authService } from '../lib/services/auth.service';
import { supabase } from '../lib/supabase';

export function VerifyEmail() {
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState('');

  async function handleResend() {
    setResending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        await supabase.auth.resend({
          type: 'signup',
          email: user.email,
        });
        setMessage('Verification email sent! Check your inbox.');
      }
    } catch (error) {
      setMessage('Failed to resend email. Please try again.');
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="text-6xl mb-4">📧</div>
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-gray-600 mb-6">
          We sent a verification link to your email. Please check your inbox
          and click the link to activate your account.
        </p>

        {message && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded">
            {message}
          </div>
        )}

        <button
          onClick={handleResend}
          disabled={resending}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg
                     hover:bg-purple-700 disabled:opacity-50"
        >
          {resending ? 'Sending...' : 'Resend Verification Email'}
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Already verified? <a href="/login" className="text-purple-600">Login here</a>
        </p>
      </div>
    </div>
  );
}
```

### Update Signup Flow

Modify your signup component to redirect to verification page:

```tsx
async function handleSignup(data: SignupData) {
  const result = await authService.signup(data);

  if (result.success) {
    // Redirect to verification page instead of dashboard
    navigate('/verify-email');
  } else {
    setError(result.error);
  }
}
```

## Step 4: Handle Email Verification Callback

Create `src/pages/AuthCallback.tsx`:

```tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Email verified successfully
        navigate('/dashboard');
      } else if (event === 'USER_UPDATED') {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p>Verifying your email...</p>
      </div>
    </div>
  );
}
```

Add this route to your router:

```tsx
<Route path="/auth/callback" element={<AuthCallback />} />
<Route path="/verify-email" element={<VerifyEmail />} />
```

## Step 5: Update ProtectedRoute Logic

The existing [ProtectedRoute.tsx](src/components/auth/ProtectedRoute.tsx:1-161) already supports `requireEmailVerified`:

```tsx
// Example: Require email verification for dashboard
<ProtectedRoute options={{ requireEmailVerified: true }}>
  <Dashboard />
</ProtectedRoute>
```

When email is not verified:
- User is redirected to `/login` (or custom `redirectTo`)
- The redirect includes `state.reason = "Email verification required"`

## Step 6: Production Deployment

### Supabase Cloud Configuration

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication** → **Email Auth**
4. Enable "Confirm email"
5. Configure redirect URLs:
   - Add `https://yourdomain.com/auth/callback`
   - Add `http://localhost:5173/auth/callback` (for dev)

### Environment Variables

Update `.env.production`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

## Testing Email Verification

### Local Testing with Inbucket

Supabase local development uses [Inbucket](http://127.0.0.1:54324) for email testing:

1. Sign up a test user
2. Open [http://127.0.0.1:54324](http://127.0.0.1:54324)
3. Find the verification email
4. Click the confirmation link
5. Verify user is redirected to dashboard

### Manual Testing Checklist

- [ ] Unverified user cannot access dashboard
- [ ] Unverified user sees "Verify Email" page
- [ ] Resend email button works
- [ ] Email contains correct verification link
- [ ] Clicking link verifies email
- [ ] Verified user can access dashboard
- [ ] Admin routes require verified email
- [ ] Teacher routes require verified email

## Security Considerations

1. **Never disable email verification in production**
2. **Set short expiry times** (24 hours max)
3. **Rate limit resend requests** (1 per 60 seconds)
4. **Log verification attempts** for security monitoring
5. **Require re-verification** if email changes

## Database Schema

Email verification status is stored in `profiles` table:

```sql
-- Check verification in profiles table
SELECT
  id,
  email,
  email_verified_at,
  account_status
FROM profiles
WHERE email_verified_at IS NULL;
```

## Troubleshooting

### Email not sending

1. Check Supabase logs: **Logs** → **Auth Logs**
2. Verify SMTP settings in Supabase Studio
3. Check spam folder
4. Confirm email provider allows Supabase emails

### Verification link expired

Users should see:
```
This link has expired. Please request a new verification email.
```

Solution: Use the resend button on `/verify-email` page

### Email verified but still can't access

1. Check `profiles.email_verified_at` is set
2. Verify `account_status = 'active'`
3. Check RBAC permissions
4. Clear browser cache and re-login

## Next Steps

1. ✅ Enable email verification in Supabase Studio
2. ✅ Customize email templates
3. ✅ Create `/verify-email` page
4. ✅ Add `/auth/callback` route
5. ✅ Update signup flow to redirect to verification
6. ✅ Test with Inbucket locally
7. ✅ Configure production redirect URLs
8. ✅ Test end-to-end flow

## Resources

- [Supabase Email Auth Docs](https://supabase.com/docs/guides/auth/auth-email)
- [Email Templates Guide](https://supabase.com/docs/guides/auth/auth-email-templates)
- [React Router Protected Routes](https://reactrouter.com/en/main/start/overview)
- [ClayMind RBAC Guide](src/lib/utils/rbac.ts)

---

**Important**: Email verification is mandatory before production deployment for ClayMind. This is non-negotiable for a kids platform.
