# AFC Restaurant Backend - Deployment Guide

## 🚀 Production Deployment on Render

### 1. Environment Variables Setup

In your Render dashboard, set these environment variables:

```
NODE_ENV=production
PORT=3005

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=afcindiaofficial@gmail.com
EMAIL_PASS=gxbc ujxg epwa bgrt
OWNER_EMAIL=afcindiaofficial@gmail.com

FRONTEND_URL=https://www.afcofficial.in,https://afcofficial.in
```

### 2. Gmail Setup Requirements

**Important:** The EMAIL_USER account must have:
- ✅ Two-factor authentication (2FA) enabled
- ✅ App password generated (not regular Gmail password)
- ✅ "Less secure app access" is NOT needed with app passwords

### 3. Contact Form Flow

1. **User submits contact form** → Frontend sends data to backend
2. **Backend processes data** → Sanitizes and validates input  
3. **Email notification sent** → FROM afcindiaofficial@gmail.com TO afcindiaofficial@gmail.com
4. **AFC team receives notification** → With all user contact details
5. **Manual follow-up** → AFC team contacts user directly for franchise info

### 4. Test Endpoints (Remove in Production)

After deployment, you can test using:
- `GET /api/test-email/check-env` - Verify environment variables
- `POST /api/test-email/send-test` - Send test email

**🔒 Security Note:** Remove test email routes before production deployment.

### 5. Debugging

If emails aren't being received:
1. Check Render logs for detailed error messages
2. Verify Gmail app password is correct
3. Ensure 2FA is enabled on Gmail account
4. Check CORS settings for frontend domain

## ✅ Deployment Checklist

- [ ] Environment variables set in Render
- [ ] Gmail 2FA enabled
- [ ] App password generated and correct
- [ ] Frontend URL added to CORS whitelist
- [ ] Test email functionality works
- [ ] Remove test routes (optional for security)

## 📧 Expected Behavior

When working correctly:
- Users fill contact form on website
- AFC receives professional branded email with user details
- Email includes name, phone, email, address, and message
- AFC team can reply directly to inquiries
