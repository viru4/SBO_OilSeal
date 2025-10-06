# Notification Services Setup Guide

Your admin panel has email, SMS, and WhatsApp reply functionality, but the services need to be configured. Here's how to set them up:

## 📧 Email Configuration (SMTP)

### Option 1: Gmail SMTP (Recommended for testing)

Add these to your `backend/.env` file:

```env
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

**To get Gmail App Password:**
1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings → Security → App passwords
3. Generate an app password for "Mail"
4. Use this password (not your regular Gmail password)

### Option 2: Other SMTP Providers

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
SMTP_FROM=your-email@outlook.com
```

**Yahoo:**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@yahoo.com
```

## 📱 SMS Configuration (Twilio)

1. **Sign up for Twilio**: Go to [twilio.com](https://twilio.com)
2. **Get your credentials** from Twilio Console:
   - Account SID
   - Auth Token
   - Phone Number (for sending SMS)

Add to your `backend/.env`:

```env
# Twilio SMS Configuration
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM_NUMBER=+1234567890
```

## 💬 WhatsApp Configuration (Twilio)

Twilio also provides WhatsApp Business API. Add to your `backend/.env`:

```env
# Twilio WhatsApp Configuration (uses same SID/Token as SMS)
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

## 🚀 Quick Setup for Testing

### Email Only (Easiest)
Add this to your `backend/.env` for Gmail:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=your-email@gmail.com
```

### Complete Example .env
```env
# Supabase Configuration
SUPABASE_URL=https://evvgftbewmjomxyscphr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key

Note: the backend also accepts the legacy `SUPABASE_SERVICE_ROLE` environment variable for backward compatibility.

# Admin Configuration
ADMIN_TOKEN=0373e9319620e77bc5ac0a480e331a91aac0eac247ffc1dca3f1f0783f74aa1f

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=your-email@gmail.com

# SMS Configuration (Twilio) - Optional
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_FROM_NUMBER=+1234567890

# WhatsApp Configuration (Twilio) - Optional
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# Server Configuration
PING_MESSAGE=ping
PORT=8080
```

## 🔧 Testing Your Setup

1. **Update your .env file** with the configurations above
2. **Restart your server**: `npm run dev`
3. **Test in admin panel**:
   - Go to `/admin`
   - Select a contact
   - Try sending a reply via email
   - Check if the email is sent

## 💡 Pro Tips

- **Start with email only** - it's the easiest to set up
- **Use Gmail App Passwords** for better security
- **Twilio has a free tier** for SMS testing
- **WhatsApp requires Twilio Business account** for production

## 🛠️ Troubleshooting

### Email Issues
- Check your Gmail App Password is correct
- Ensure 2FA is enabled on Gmail
- Try a different SMTP provider

### SMS Issues
- Verify Twilio credentials
- Check phone number format (+1234567890)
- Ensure you have Twilio credits

### WhatsApp Issues
- Requires Twilio Business account
- Phone numbers must be verified
- Limited to approved numbers initially
