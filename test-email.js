require('dotenv').config({ path: '.env.test' });
const EmailService = require('./src/services/emailService');

async function testEmail() {
  console.log('🚀 Starting Email Configuration Test');
  console.log('=======================================');
  
  // Check environment variables
  console.log('📧 Environment Check:');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '[SET]' : '[NOT SET]');
  console.log('OWNER_EMAIL:', process.env.OWNER_EMAIL);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('');

  // Test data
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '1234567890',
    address: 'Test Address, Test City',
    message: 'This is a test message to verify AFC Restaurant email functionality is working correctly.'
  };

  try {
    console.log('📤 Attempting to send test email...');
    const result = await EmailService.sendContactEmail(testData, '127.0.0.1');
    
    console.log('');
    console.log('✅ EMAIL TEST SUCCESSFUL!');
    console.log('Message ID:', result.messageId);
    console.log('📧 Check your email:', process.env.OWNER_EMAIL);
    console.log('');
    console.log('🎉 Email configuration is working properly!');
    
  } catch (error) {
    console.log('');
    console.log('❌ EMAIL TEST FAILED!');
    console.log('Error:', error.message);
    console.log('');
    
    // Provide specific troubleshooting advice
    if (error.message.includes('authentication')) {
      console.log('🔧 TROUBLESHOOTING: Authentication Error');
      console.log('- Check if 2FA is enabled on Gmail account');
      console.log('- Verify the app password is correct');
      console.log('- Make sure EMAIL_PASS matches exactly');
    } else if (error.message.includes('timeout')) {
      console.log('🔧 TROUBLESHOOTING: Timeout Error');
      console.log('- Check internet connection');
      console.log('- Gmail servers might be slow');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('network')) {
      console.log('🔧 TROUBLESHOOTING: Network Error');
      console.log('- Check internet connection');
      console.log('- Firewall might be blocking SMTP');
    }
    
    console.log('');
    console.log('Full error details:', error);
  }
  
  process.exit(0);
}

// Run the test
testEmail();
