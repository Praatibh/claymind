# Email Delivery Setup Guide

## 📧 How Email Delivery Works

### Local Development (Current Setup) ✅

**Inbucket Email Server**
- **Status:** Enabled and configured
- **URL:** http://127.0.0.1:54324
- **How it works:** ALL emails are caught and stored locally, regardless of email address

**Configuration:**
```toml
[inbucket]
enabled = true
port = 54324

[auth.email]
enable_confirmations = true
```

✅ **Any email address will work!**
- test@example.com → Inbucket
- user@gmail.com → Inbucket
- anything@anywhere.com → Inbucket

### Testing Email Delivery (Local)

1. **Start Supabase:**
   ```bash
   cd claymind
   supabase start
   ```

2. **Signup with ANY email:**
   - Go to http://localhost:5173/signup
   - Use: `testuser@example.com` (or any email)
   - Submit the form

3. **Check Inbucket:**
   - Open: http://127.0.0.1:54324
   - Click on the email address in the inbox
   - Click the verification link

4. **Verify it works:**
   - Should redirect to onboarding
   - Email verified successfully!

---

## 🚀 Production Setup (Real Email Delivery)

For production, you need to configure an SMTP server to send real emails.

### Option 1: SendGrid (Recommended)

**1. Get SendGrid API Key:**
- Sign up at https://sendgrid.com
- Create an API key
- Copy the key

**2. Update config.toml for production:**

```toml
[auth.email.smtp]
enabled = true
host = "smtp.sendgrid.net"
port = 587
user = "apikey"
pass = "env(SENDGRID_API_KEY)"
admin_email = "noreply@claymind.com"
sender_name = "ClayMind"
```

**3. Set environment variable:**

```bash
# .env.production
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

**4. Verify sender email:**
- In SendGrid dashboard, verify your sender email
- Use a domain email (e.g., noreply@claymind.com)

### Option 2: Gmail SMTP

**1. Enable 2FA and create App Password:**
- Go to Google Account settings
- Enable 2-Factor Authentication
- Generate App Password for "Mail"

**2. Update config.toml:**

```toml
[auth.email.smtp]
enabled = true
host = "smtp.gmail.com"
port = 587
user = "your-email@gmail.com"
pass = "env(GMAIL_APP_PASSWORD)"
admin_email = "your-email@gmail.com"
sender_name = "ClayMind"
```

**3. Set environment variable:**

```bash
# .env.production
GMAIL_APP_PASSWORD=your_16_char_app_password
```

⚠️ **Note:** Gmail has sending limits (500 emails/day)

### Option 3: Amazon SES

**For high volume:**

```toml
[auth.email.smtp]
enabled = true
host = "email-smtp.us-east-1.amazonaws.com"
port = 587
user = "env(AWS_SES_USERNAME)"
pass = "env(AWS_SES_PASSWORD)"
admin_email = "noreply@claymind.com"
sender_name = "ClayMind"
```

### Option 4: Supabase Cloud (Easiest)

If hosting on Supabase Cloud, email delivery is **automatic**:
- No SMTP configuration needed
- Built-in email service
- Rate limits apply
- Configure in Supabase Dashboard → Authentication → Email Templates

---

## 📝 Email Templates

### Customize Verification Email

Create: `claymind/supabase/templates/confirmation.html`

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .button {
      background: #9333ea;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 8px;
      display: inline-block;
    }
    .footer { margin-top: 30px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to ClayMind! 🎨</h1>

    <p>Hi there!</p>

    <p>Thanks for joining ClayMind! Before you start your AI learning adventure,
    we need to verify your email address.</p>

    <p>Click the button below to confirm your email:</p>

    <a href="{{ .ConfirmationURL }}" class="button">
      Verify Email Address
    </a>

    <p>Or copy and paste this link into your browser:</p>
    <p>{{ .ConfirmationURL }}</p>

    <p>This link will expire in 24 hours.</p>

    <div class="footer">
      <p>If you didn't create an account, you can safely ignore this email.</p>
      <p>Happy learning!<br>The ClayMind Team</p>
    </div>
  </div>
</body>
</html>
```

### Enable Custom Template

Update `config.toml`:

```toml
[auth.email.template.confirmation]
subject = "Verify your email for ClayMind"
content_path = "./supabase/templates/confirmation.html"
```

---

## 🧪 Testing Email Delivery

### Local Development Test Script

Create: `test-email.sh`

```bash
#!/bin/bash

echo "🧪 Testing Email Delivery..."
echo ""

# Check if Supabase is running
echo "1. Checking Supabase status..."
cd claymind
supabase status

echo ""
echo "2. Inbucket available at: http://127.0.0.1:54324"
echo ""
echo "3. Test steps:"
echo "   - Go to http://localhost:5173/signup"
echo "   - Signup with: test@example.com"
echo "   - Check Inbucket: http://127.0.0.1:54324"
echo "   - Click verification link in email"
echo ""
echo "✅ If email appears in Inbucket, delivery is working!"
```

### Production Test Checklist

```bash
# 1. Verify SMTP credentials
# 2. Test with real email address
# 3. Check spam folder
# 4. Verify sender domain (SPF/DKIM/DMARC)
# 5. Monitor Supabase logs for errors
```

---

## 🔍 Troubleshooting

### Problem: No emails in Inbucket

**Solution:**
```bash
# Restart Supabase
cd claymind
supabase db reset

# Check Inbucket is running
curl http://127.0.0.1:54324
```

### Problem: Emails going to spam (Production)

**Solution:**
1. Set up SPF record:
   ```
   TXT @ "v=spf1 include:sendgrid.net ~all"
   ```

2. Set up DKIM (via SendGrid dashboard)

3. Set up DMARC:
   ```
   TXT _dmarc "v=DMARC1; p=none; rua=mailto:admin@claymind.com"
   ```

### Problem: SMTP authentication failed

**Solution:**
- Verify credentials are correct
- Check environment variables are loaded
- Ensure firewall allows port 587
- Try port 465 (SSL) if 587 fails

### Problem: Rate limited

**Solution:**
- SendGrid: Upgrade plan
- Gmail: Switch to professional SMTP
- SES: Request limit increase

---

## 📊 Email Delivery Monitoring

### Check Email Logs (Supabase)

```bash
# View auth logs
supabase functions logs auth

# Check for email errors
grep "email" logs/auth.log
```

### Monitor Delivery Rates

Track in your analytics:
- Signup → Email sent rate (should be 100%)
- Email sent → Email opened rate (typically 20-40%)
- Email opened → Link clicked rate (typically 50-80%)
- Link clicked → Verification completed (should be 95%+)

---

## 🎯 Best Practices

### 1. **Use a dedicated email domain**
   - noreply@claymind.com
   - Not personal Gmail

### 2. **Set up email authentication**
   - SPF, DKIM, DMARC
   - Reduces spam classification

### 3. **Monitor delivery rates**
   - Track bounces
   - Remove invalid addresses
   - Monitor spam reports

### 4. **Use rate limiting**
   - Already configured in config.toml
   - Prevents abuse

### 5. **Test regularly**
   - Weekly test signups
   - Check spam folders
   - Verify links work

---

## ✅ Current Status

**Local Development:**
- ✅ Inbucket enabled (port 54324)
- ✅ Email confirmations enabled
- ✅ ANY email address works
- ✅ All emails caught locally

**Production (To Do):**
- ⚠️ SMTP not configured yet
- ⚠️ Need to set up SendGrid/SES/Gmail
- ⚠️ Need to verify sender domain
- ⚠️ Need to configure email templates

---

## 🚀 Quick Start

**For Local Dev (Now):**
```bash
# 1. Start Supabase
cd claymind
supabase start

# 2. Check Inbucket is running
open http://127.0.0.1:54324

# 3. Test signup
open http://localhost:5173/signup

# 4. Check inbox in Inbucket
```

**For Production (Later):**
```bash
# 1. Choose SMTP provider (SendGrid recommended)
# 2. Get API key
# 3. Update config.toml
# 4. Set environment variables
# 5. Deploy
# 6. Test with real email
```

---

## 📞 Support

If emails still not working:
1. Check Supabase logs: `supabase functions logs`
2. Verify Inbucket is running: http://127.0.0.1:54324
3. Check browser console for errors
4. Verify email verification is enabled in config.toml
5. Try `supabase db reset` to reload config
