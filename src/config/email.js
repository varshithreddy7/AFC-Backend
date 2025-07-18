const nodemailer = require('nodemailer');

// Create email transporter with optimized connection pooling
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: true,
  maxConnections: 3,
  maxMessages: 50,
  rateDelta: 1000,
  rateLimit: 10,
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 15000,
  debug: process.env.NODE_ENV === 'development',
  logger: process.env.NODE_ENV === 'development'
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
    process.exit(1); // Exit if email configuration is wrong
  } else {
    console.log('Email transporter ready');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  transporter.close();
});

process.on('SIGINT', () => {
  transporter.close();
});

module.exports = {
  transporter
};