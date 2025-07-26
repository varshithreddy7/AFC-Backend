# Email Troubleshooting Guide

## Quick Fixes Applied

### 1. Enhanced Email Configuration
- ✅ Gmail service explicitly configured
- ✅ Increased timeouts (60 seconds)
- ✅ Added debug logging
- ✅ Better error handling with retry mechanism

### 2. Test Endpoints Added
**Environment Check:**
```
GET /api/test-email/check-env
```

**Test Email Send:**
```
POST /api/test-email/send-test
```

### 3. Environment Variables (Your Current Setup)
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PASS="gxbc ujxg epwa bgrt"
EMAIL_PORT=587
EMAIL_USER=afcindiaofficial@gmail.com
FRONTEND_URL=https://www.afcofficial.in,http://localhost:3000
NODE_ENV=production
OWNER_EMAIL=varshithreddy3777@gmail.com
PORT=3005
```

## Testing Steps on Render

### 1. Check Environment Variables
Visit: `https://your-render-url.com/api/test-email/check-env`

Should return all environment variables as "SET"

### 2. Test Email Sending
Send POST request to: `https://your-render-url.com/api/test-email/send-test`

### 3. Check Render Logs
Look for these log messages:
- ✅ "Gmail SMTP transporter verified and ready"
- ✅ "Email sent successfully on attempt X"
- ❌ Any error messages with detailed error codes

### 4. Test Contact Form
Send POST to: `https://your-render-url.com/api/contact/submit`

With payload:
```json
{
  "firstName": "Test",
  "lastName": "User", 
  "email": "test@example.com",
  "phone": "1234567890",
  "address": "Test Address",
  "message": "Test message"
}
```

## Common Issues & Solutions

### Gmail Authentication Errors
- Verify 2FA is enabled on Gmail account
- Regenerate app password if needed
- Check that `EMAIL_PASS` exactly matches app password

### Network/Timeout Errors
- Check Render's outbound network connectivity
- Verify Render allows SMTP connections on port 587

### Environment Variable Issues
- Ensure all env vars are set correctly in Render dashboard
- Restart the service after changing env vars

## Debug Information
The enhanced logging will show:
- Email transporter verification status
- Detailed error messages with codes
- Retry attempts and results
- Full request/response data

Check your Render logs for these detailed messages to identify the exact issue.
