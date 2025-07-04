const EmailService = require('../services/emailService');
const { sanitizeInput } = require('../utils/sanitizer');

class ContactController {
  static async submitContactForm(req, res) {
    try {
      const { firstName, lastName, email, phone, address, message } = req.body;

      // Sanitize inputs
      const sanitizedData = {
        firstName: sanitizeInput(firstName),
        lastName: sanitizeInput(lastName),
        email: sanitizeInput(email),
        phone: sanitizeInput(phone),
        address: sanitizeInput(address),
        message: sanitizeInput(message)
      };

      // Send email
      await EmailService.sendContactEmail(sanitizedData, req.ip);

      // Log successful submission
      console.log(`Contact form submitted successfully by ${sanitizedData.email} from IP ${req.ip}`);

      res.status(200).json({
        success: true,
        message: 'Message sent successfully!'
      });

    } catch (error) {
      console.error('Error sending contact email:', error);
      
      // Don't expose internal errors to client
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    }
  }
}

module.exports = ContactController;