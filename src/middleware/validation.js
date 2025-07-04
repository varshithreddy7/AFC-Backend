const validator = require('validator');

// Validation middleware
const validateContactForm = (req, res, next) => {
  const { firstName, lastName, email, phone, address, message } = req.body;

  // Check required fields
  if (!firstName || !lastName || !email || !phone || !address || !message) {
    return res.status(400).json({
      success: false,
      message: 'First name, last name, email, phone, address, and message are required'
    });
  }

  // Validate field lengths
  if (firstName.length > 50) {
    return res.status(400).json({
      success: false,
      message: 'First name must be less than 50 characters'
    });
  }
  if (lastName.length > 50) {
    return res.status(400).json({
      success: false,
      message: 'Last name must be less than 50 characters'
    });
  }
  if (phone.length > 20) {
    return res.status(400).json({
      success: false,
      message: 'Phone number must be less than 20 characters'
    });
  }
  if (address.length > 200) {
    return res.status(400).json({
      success: false,
      message: 'Address must be less than 200 characters'
    });
  }
  if (message.length > 2000) {
    return res.status(400).json({
      success: false,
      message: 'Message must be less than 2000 characters'
    });
  }

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email address'
    });
  }

  // Optionally validate phone number format
  // if (!validator.isMobilePhone(phone, 'any')) {
  //   return res.status(400).json({
  //     success: false,
  //     message: 'Invalid phone number'
  //   });
  // }

  next();
};

module.exports = { validateContactForm };