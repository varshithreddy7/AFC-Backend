# AFC Restaurant Backend API

Production-ready Node.js backend API for Absolutely Fried Chicken restaurant website.

## Features

- 🍗 Contact form submission with email notifications
- 🔒 Production-ready security (Helmet, CORS, Rate limiting)
- 📧 Gmail SMTP integration with retry mechanism
- 🛡️ Input sanitization and validation
- 🚀 Optimized for production deployment

## Quick Deployment (Render)

### 1. Environment Variables Setup

**Important:** Set these in your Render dashboard (NOT in code):

```env
NODE_ENV=production
PORT=3005

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=afcindiaofficial@gmail.com
EMAIL_PASS=<app-password-from-gmail>
OWNER_EMAIL=afcindiaofficial@gmail.com

# Frontend URLs
FRONTEND_URL=https://www.afcofficial.in,https://afcofficial.in
```

### 2. Gmail Setup Requirements

The `EMAIL_USER` account must have:
- ✅ Two-factor authentication (2FA) enabled
- ✅ App password generated (16-character password from Gmail)
- ✅ App password used in `EMAIL_PASS` (not regular password)

### 3. How to Generate Gmail App Password

1. Go to your Gmail account settings
2. Security → 2-Step Verification → App passwords  
3. Select "Mail" and generate password
4. Copy the 16-character password to `EMAIL_PASS`

### 4. Deploy to Render

1. Connect your GitHub repository
2. Set environment variables in Render dashboard
3. Deploy and test using the endpoints below

## API Endpoints

### Health Check
```
GET /api/health
```

### Contact Form
```
POST /api/contact/submit
```

Payload:
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "phone": "1234567890",
  "address": "123 Main St",
  "message": "Interested in franchise opportunities"
}
```

### Test Endpoints (For Debugging)
```
GET /api/test-email/check-env    - Check environment setup
POST /api/test-email/send-test   - Send test email
```

## Contact Form Flow

1. **User fills form** → Frontend sends data to backend
2. **Backend processes** → Sanitizes and validates input
3. **Email sent** → FROM afcindiaofficial@gmail.com TO afcindiaofficial@gmail.com  
4. **AFC receives notification** → Professional email with user details
5. **Manual follow-up** → AFC team contacts user for franchise info

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing protection  
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Sanitization**: XSS protection
- **Validation**: Email and input validation

## Development

For local development:
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your values
# Start development server
npm run dev
```

## Production Optimizations

- Reduced logging in production
- Optimized CORS origins
- Connection pooling for email
- Graceful shutdown handling
- Error handling without exposing internals

## Troubleshooting

If emails aren't working:
1. Check Render logs for detailed errors
2. Verify Gmail app password is correct
3. Ensure 2FA is enabled on Gmail
4. Test using `/api/test-email/send-test` endpoint

## File Structure

```
src/
├── config/          # Email and CORS configuration
├── controllers/     # Request handlers
├── middleware/      # Security and logging
├── routes/          # API routes
├── services/        # Email service
└── utils/           # Sanitization utilities
```
