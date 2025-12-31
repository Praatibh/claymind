# 📧 SMTP Setup Guide - Step by Step

## Complete Guide to Send Real Emails in Production

This guide will help you set up SMTP so your ClayMind app can send **real verification emails** to any email address.

---

## 🎯 What We're Going to Do

1. Create a free SendGrid account
2. Get an API key
3. Configure Supabase to use SendGrid
4. Test email delivery
5. Deploy to production

**Time Required:** 15-20 minutes

---

## Option 1: SendGrid (Recommended - Easiest)

### Why SendGrid?
- ✅ **Free tier:** 100 emails/day forever
- ✅ **Easy setup:** Just API key, no complex config
- ✅ **Reliable:** Industry standard
- ✅ **Good deliverability:** Emails don't go to spam
- ✅ **Email templates:** Built-in editor
- ✅ **Analytics:** Track opens, clicks, bounces

---

## 📝 Step 1: Create SendGrid Account

### 1.1 Sign Up

**Go to:** https://signup.sendgrid.com/

Fill in:
```
Email: your-email@gmail.com
Password: [Create a strong password]
Company Name: ClayMind (or your company name)
Website: claymind.com (or your domain)
```

**Click:** "Create Account"

### 1.2 Verify Your Email

1. Check your inbox for SendGrid verification email
2. Click "Verify Email Address"
3. You'll be redirected to SendGrid dashboard

### 1.3 Complete Onboarding

SendGrid will ask:
- **What do you want to do?** → "Integrate using our Web API or SMTP Relay"
- **What language?** → "I'm not using a specific language" (we're using Supabase)
- **Skip the rest** → Click "Skip" or close the wizard

---

## 🔑 Step 2: Create API Key

### 2.1 Navigate to API Keys

**Dashboard → Settings (left sidebar) → API Keys**

Or direct link: https://app.sendgrid.com/settings/api_keys

### 2.2 Create New API Key

1. **Click:** "Create API Key" (blue button, top right)

2. **Fill in details:**
   ```
   API Key Name: ClayMind Production
   API Key Permissions: Full Access (recommended for simplicity)
   ```

3. **Click:** "Create & View"

### 2.3 Copy API Key

⚠️ **IMPORTANT:** This is shown only once!

```
Example API key (yours will be different):
SG.xxxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

**Copy it now** and save it temporarily in a text file.

---

## ✉️ Step 3: Verify Sender Identity

SendGrid requires you to verify the email address you'll send from.

### 3.1 Navigate to Sender Authentication

**Dashboard → Settings → Sender Authentication**

Or: https://app.sendgrid.com/settings/sender_auth

### 3.2 Option A: Single Sender Verification (Easiest)

**Best for:** Testing, small projects, personal domains

1. **Click:** "Verify a Single Sender"

2. **Fill in form:**
   ```
   From Name: ClayMind
   From Email Address: noreply@yourdomain.com
   Reply To: support@yourdomain.com (can be same as From)
   Company Address: Your address
   City: Your city
   Country: Your country
   ```

   ⚠️ **Important:** Use an email you have access to!

   Options:
   - **If you have a domain:** `noreply@claymind.com`
   - **If you don't have a domain:** Use your Gmail for testing: `your-email@gmail.com`

3. **Click:** "Create"

4. **Verify Email:**
   - Check inbox of the email you entered
   - Click "Verify Single Sender"
   - ✅ Status changes to "Verified"

### 3.3 Option B: Domain Authentication (Production - Better)

**Best for:** Custom domain, better deliverability

**Skip this if you don't have a custom domain yet.**

1. **Click:** "Authenticate Your Domain"
2. **Select DNS host:** (Cloudflare, GoDaddy, etc.)
3. **Add DNS records** (SendGrid will show you exactly what to add)
4. **Wait for verification** (can take 24-48 hours)

---

## ⚙️ Step 4: Configure Supabase

Now let's configure your ClayMind app to use SendGrid!

### 4.1 Update config.toml

**File:** `claymind/supabase/config.toml`

**Find this section** (around line 213):

```toml
# Use a production-ready SMTP server
# [auth.email.smtp]
# enabled = true
# host = "smtp.sendgrid.net"
# port = 587
# user = "apikey"
# pass = "env(SENDGRID_API_KEY)"
# admin_email = "admin@email.com"
# sender_name = "Admin"
```

**Replace with this** (remove the # to uncomment):

```toml
# Use a production-ready SMTP server
[auth.email.smtp]
enabled = true
host = "smtp.sendgrid.net"
port = 587
user = "apikey"
pass = "env(SENDGRID_API_KEY)"
admin_email = "noreply@yourdomain.com"  # ← Change to YOUR verified email
sender_name = "ClayMind"
```

⚠️ **Replace:**
- `noreply@yourdomain.com` → Your verified email from Step 3

### 4.2 Create Environment File

**Create file:** `claymind/.env.local`

```bash
# SendGrid API Key
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

⚠️ **Replace** the API key with YOUR actual key from Step 2.3

### 4.3 Add to .gitignore

**Make sure `.env.local` is in your `.gitignore`:**

```bash
# Check if .gitignore exists
cat claymind/.gitignore | grep .env

# If not there, add it:
echo ".env.local" >> claymind/.gitignore
echo ".env.production" >> claymind/.gitignore
```

⚠️ **NEVER commit your API key to git!**

---

## 🔄 Step 5: Restart Supabase

For the changes to take effect:

```bash
cd claymind

# Stop Supabase
supabase stop

# Start Supabase with new config
supabase start
```

This will reload the SMTP configuration.

---

## 🧪 Step 6: Test Email Delivery

### 6.1 Test with Supabase CLI

**Option A: Using your app**

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Go to signup:**
   ```
   http://localhost:5173/signup
   ```

3. **Sign up with a REAL email:**
   ```
   Email: your-real-email@gmail.com
   Password: Test123!@#
   ```

4. **Check your REAL inbox:**
   - ✅ You should receive an email within 30 seconds
   - ✅ From: ClayMind <noreply@yourdomain.com>
   - ✅ Subject: "Confirm your signup"

5. **Click verification link:**
   - Should redirect to onboarding
   - ✅ Email verification working!

### 6.2 Troubleshooting Test

If email didn't arrive:

**Check SendGrid Activity:**
1. Go to: https://app.sendgrid.com/email_activity
2. Look for your email
3. Status should be "Delivered"

**If status is "Processed" or "Dropped":**
- Sender email not verified → Go back to Step 3
- API key wrong → Check `.env.local`
- Email in spam → Check spam folder

**If status is "Bounced":**
- Email address doesn't exist
- Try a different email

---

## 📊 Step 7: Monitor Email Activity

### 7.1 SendGrid Dashboard

**Email Activity:** https://app.sendgrid.com/email_activity

You can see:
- ✅ Emails sent
- 📧 Delivery status
- 📬 Opens (if tracking enabled)
- 🔗 Clicks (if tracking enabled)
- ⚠️ Bounces
- 🚫 Spam reports

### 7.2 View Email Stats

**Statistics → Overview:** https://app.sendgrid.com/statistics

- Daily/weekly/monthly email stats
- Delivery rate
- Open rate
- Click rate

---

## 🚀 Step 8: Production Deployment

### 8.1 For Supabase Cloud

If you're deploying to Supabase Cloud:

1. **Go to:** https://app.supabase.com
2. **Your Project → Settings → API**
3. **Copy your production URL and keys**

4. **Go to:** Authentication → Email Templates
5. **Enable email confirmations**
6. **Configure SMTP settings** (same as config.toml)

### 8.2 For Custom Hosting

**Update production environment:**

```bash
# .env.production
SENDGRID_API_KEY=your_production_api_key_here
```

**Deploy your config.toml with SMTP settings**

---

## 🎨 Step 9: Customize Email Template (Optional)

### 9.1 Create Custom HTML Template

**Create:** `claymind/supabase/templates/confirmation.html`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 40px 30px;
    }
    .button {
      display: inline-block;
      background: #9333ea;
      color: white;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
    }
    .button:hover {
      background: #7c3aed;
    }
    .footer {
      background: #f9fafb;
      padding: 20px 30px;
      text-align: center;
      font-size: 12px;
      color: #666;
      border-top: 1px solid #e5e7eb;
    }
    .link-box {
      background: #f3f4f6;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎨 Welcome to ClayMind!</h1>
    </div>

    <div class="content">
      <h2>Hi there! 👋</h2>

      <p>Thanks for joining ClayMind! We're excited to have you start your AI learning journey.</p>

      <p>Before we get started, we need to verify your email address. This helps us keep your account secure and ensure you receive important updates.</p>

      <p style="text-align: center;">
        <a href="{{ .ConfirmationURL }}" class="button">
          ✅ Verify Email Address
        </a>
      </p>

      <p>Or copy and paste this link into your browser:</p>

      <div class="link-box">
        <code>{{ .ConfirmationURL }}</code>
      </div>

      <p><strong>⏰ This link will expire in 24 hours.</strong></p>

      <p>If you didn't create an account with ClayMind, you can safely ignore this email.</p>
    </div>

    <div class="footer">
      <p>Happy learning! 🚀<br>
      <strong>The ClayMind Team</strong></p>

      <p style="margin-top: 20px;">
        Questions? Contact us at support@claymind.com
      </p>
    </div>
  </div>
</body>
</html>
```

### 9.2 Enable Custom Template

**Add to `config.toml`:**

```toml
# Customize confirmation email template
[auth.email.template.confirmation]
subject = "🎨 Verify your ClayMind account"
content_path = "./supabase/templates/confirmation.html"
```

### 9.3 Restart Supabase

```bash
supabase db reset
```

Now your emails will use your custom template! 🎨

---

## 🔒 Security Best Practices

### 1. Protect Your API Key

```bash
# ❌ NEVER DO THIS:
SENDGRID_API_KEY=SG.xxx  # committed to git

# ✅ DO THIS:
# Use .env.local (in .gitignore)
# Use environment variables in production
```

### 2. Use Environment Variables in Production

**For Vercel:**
```bash
vercel env add SENDGRID_API_KEY
```

**For Railway:**
```bash
railway variables add SENDGIND_API_KEY=your_key
```

**For Heroku:**
```bash
heroku config:set SENDGRID_API_KEY=your_key
```

### 3. Rotate API Keys Regularly

Every 3-6 months:
1. Create new API key in SendGrid
2. Update environment variables
3. Delete old API key

### 4. Use Different Keys for Dev/Prod

```bash
# Development
SENDGRID_API_KEY=SG.dev_key_xxx

# Production
SENDGRID_API_KEY=SG.prod_key_xxx
```

---

## 🐛 Troubleshooting

### Problem: "API key not found" error

**Solution:**
```bash
# Check .env.local exists
ls -la claymind/.env.local

# Check it has the key
cat claymind/.env.local

# Restart Supabase
cd claymind
supabase stop && supabase start
```

### Problem: Emails going to spam

**Solutions:**
1. **Verify sender domain** (Step 3.3)
2. **Add SPF record:**
   ```
   TXT @ "v=spf1 include:sendgrid.net ~all"
   ```
3. **Enable DKIM** in SendGrid dashboard
4. **Don't use spammy words** in subject/content

### Problem: "Sender not verified"

**Solution:**
Go to SendGrid → Settings → Sender Authentication
Make sure your sender email has a green checkmark

### Problem: "Connection refused" or "SMTP error"

**Solutions:**
```bash
# Check firewall allows port 587
telnet smtp.sendgrid.net 587

# Try port 465 (SSL) instead:
[auth.email.smtp]
port = 465
```

### Problem: Emails not sending in production

**Checklist:**
- [ ] Environment variable set in hosting platform
- [ ] Config.toml deployed with SMTP enabled
- [ ] Sender email verified in SendGrid
- [ ] API key has "Mail Send" permissions
- [ ] Check SendGrid activity feed for errors

---

## 📈 SendGrid Free Tier Limits

| Feature | Free Tier |
|---------|-----------|
| Emails/day | 100 |
| Emails/month | ~3,000 |
| Email validation | 100 emails |
| Templates | Unlimited |
| API keys | Unlimited |
| Email activity | 7 days history |

**If you need more:**
- Essentials: $19.95/mo (50,000 emails)
- Pro: $89.95/mo (100,000 emails)

---

## 🎯 Quick Reference

### SendGrid SMTP Settings

```toml
host = "smtp.sendgrid.net"
port = 587
user = "apikey"  # ← literally the word "apikey"
pass = "env(SENDGRID_API_KEY)"  # ← your actual API key
```

### Test Email Command

```bash
# Quick test via curl (replace with your details)
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header "Authorization: Bearer YOUR_API_KEY" \
  --header 'Content-Type: application/json' \
  --data '{
    "personalizations": [{"to": [{"email": "test@example.com"}]}],
    "from": {"email": "noreply@yourdomain.com"},
    "subject": "Test Email",
    "content": [{"type": "text/plain", "value": "Hello!"}]
  }'
```

### SendGrid Important Links

- Dashboard: https://app.sendgrid.com
- API Keys: https://app.sendgrid.com/settings/api_keys
- Sender Auth: https://app.sendgrid.com/settings/sender_auth
- Email Activity: https://app.sendgrid.com/email_activity
- Templates: https://app.sendgrid.com/dynamic_templates
- Documentation: https://docs.sendgrid.com

---

## ✅ Checklist

Before going to production:

- [ ] SendGrid account created
- [ ] API key generated and saved
- [ ] Sender email verified
- [ ] config.toml updated with SMTP settings
- [ ] .env.local created with API key
- [ ] .env.local added to .gitignore
- [ ] Supabase restarted with new config
- [ ] Test email received successfully
- [ ] Email not in spam folder
- [ ] Custom template configured (optional)
- [ ] Production environment variables set
- [ ] Monitoring set up in SendGrid dashboard

---

## 🎉 You're Done!

Your ClayMind app can now send real emails to any email address!

**Next steps:**
1. Test thoroughly with different email providers (Gmail, Outlook, Yahoo)
2. Monitor SendGrid dashboard for delivery issues
3. Set up domain authentication for better deliverability
4. Customize email templates for branding

**Need help?** Check:
- SendGrid docs: https://docs.sendgrid.com
- Supabase docs: https://supabase.com/docs/guides/auth/auth-smtp
- This guide: Keep it handy for reference!
