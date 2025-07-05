const { transporter } = require('../config/email');

class EmailService {
  static async sendContactEmail(sanitizedData, clientIP) {
    const mailOptions = {
      from: {
        name: 'Restaurant Contact Form',
        address: process.env.EMAIL_USER
      },
      to: process.env.OWNER_EMAIL,
      replyTo: {
        name: sanitizedData.firstName + ' ' + sanitizedData.lastName,
        address: sanitizedData.email
      },
      subject: `New Contact Form Message from ${sanitizedData.firstName} ${sanitizedData.lastName}`,
      html: this.generateEmailHTML(sanitizedData, clientIP),
      text: this.generateEmailText(sanitizedData, clientIP)
    };

    // Send email with timeout
    const emailPromise = transporter.sendMail(mailOptions);
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Email timeout')), 10000)
    );

    return Promise.race([emailPromise, timeout]);
  }

  static generateEmailHTML(data, clientIP) {
    return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #fff9e6; padding: 0;">
      <!-- Header with crispy fried chicken theme -->
      <div style="background-color: #000; padding: 25px 30px; border-radius: 10px 10px 0 0; text-align: center; border-bottom: 5px solid #ffd700;">
        <h1 style="color: #ffd700; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 1px;">
          <span style="color: #fff;">ABSOLUTELY</span> FRIED CHICKEN
        </h1>
        <p style="color: #ffd700; margin: 10px 0 0; font-size: 18px; font-weight: 300;">New Customer Message</p>
      </div>
      
      <!-- Main content area -->
      <div style="background-color: white; padding: 30px; border-left: 1px solid #eee; border-right: 1px solid #eee;">
        <!-- Appetizing message preview -->
        <div style="background-color: #fff9e6; border: 2px dashed #ffd700; padding: 20px; margin-bottom: 25px; position: relative;">
          <div style="position: absolute; top: -12px; left: 20px; background: #000; padding: 0 10px;">
            <span style="color: #ffd700; font-size: 14px; font-weight: bold;">MESSAGE SNEAK PEEK</span>
          </div>
          <p style="font-style: italic; color: #333; margin: 0; font-size: 16px; line-height: 1.6;">
            "${data.message.substring(0, 100)}${data.message.length > 100 ? '...' : ''}"
          </p>
        </div>
        
        <!-- Sender info in a chicken bucket style card -->
        <div style="background-color: #f8f8f8; border-radius: 8px; padding: 25px; margin-bottom: 25px; border: 2px solid #ffd700; box-shadow: 0 3px 5px rgba(0,0,0,0.1);">
          <h3 style="color: #000; margin-top: 0; margin-bottom: 20px; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">
            <span style="border-bottom: 3px solid #ffd700; padding-bottom: 5px;">Customer Details</span>
          </h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <p style="margin: 0 0 5px; font-size: 13px; color: #666; font-weight: bold; text-transform: uppercase;">First Name</p>
              <p style="margin: 0; font-size: 16px; color: #000; font-weight: 500;">${data.firstName}</p>
            </div>
            <div>
              <p style="margin: 0 0 5px; font-size: 13px; color: #666; font-weight: bold; text-transform: uppercase;">Last Name</p>
              <p style="margin: 0; font-size: 16px; color: #000; font-weight: 500;">${data.lastName}</p>
            </div>
            <div>
              <p style="margin: 0 0 5px; font-size: 13px; color: #666; font-weight: bold; text-transform: uppercase;">Email</p>
              <p style="margin: 0; font-size: 16px; color: #000; font-weight: 500;">${data.email}</p>
            </div>
            <div>
              <p style="margin: 0 0 5px; font-size: 13px; color: #666; font-weight: bold; text-transform: uppercase;">Phone</p>
              <p style="margin: 0; font-size: 16px; color: #000; font-weight: 500;">${data.phone}</p>
            </div>
            <div>
              <p style="margin: 0 0 5px; font-size: 13px; color: #666; font-weight: bold; text-transform: uppercase;">Address</p>
              <p style="margin: 0; font-size: 16px; color: #000; font-weight: 500;">${data.address}</p>
            </div>
            <div>
              <p style="margin: 0 0 5px; font-size: 13px; color: #666; font-weight: bold; text-transform: uppercase;">Received</p>
              <p style="margin: 0; font-size: 16px; color: #000; font-weight: 500;">${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <!-- Full message section with chicken wing divider -->
        <div>
          <div style="text-align: center; margin: 25px 0; position: relative;">
            <span style="background: white; padding: 0 20px; position: relative; z-index: 1; color: #ffd700; font-size: 18px;">✧ Full Message ✧</span>
            <div style="height: 1px; background: linear-gradient(to right, transparent, #ffd700, transparent); position: absolute; top: 50%; left: 0; right: 0; z-index: 0;"></div>
          </div>
          
          <div style="background-color: white; padding: 25px; border-radius: 5px; border: 1px solid #eee; line-height: 1.7; color: #333; font-size: 15px;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
      
      <!-- Footer with restaurant branding -->
      <div style="background-color: #000; color: #fff; padding: 25px 30px; border-radius: 0 0 10px 10px; font-size: 12px; border-top: 5px solid #ffd700;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p style="margin: 0 0 5px; color: #ffd700;">Technical Details:</p>
            <p style="margin: 0; color: #aaa;">IP: ${clientIP} | ${new Date().toString()}</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 18px; color: #ffd700; font-weight: bold;">
              ABSOLUTELY<span style="color: #fff;">FRIEDCHICKEN</span>
            </p>
            <p style="margin: 5px 0 0; color: #aaa;">Crispy. Juicy. Absolutely Delicious.</p>
          </div>
        </div>
      </div>
    </div>
  `;
  }

  static generateEmailText(data, clientIP) {
    return `
✧ ABSOLUTELY FRIED CHICKEN - CUSTOMER MESSAGE ✧

===============================================

FIRST NAME: ${data.firstName}
LAST NAME: ${data.lastName}
EMAIL: ${data.email}
PHONE: ${data.phone}
ADDRESS: ${data.address}
DATE: ${new Date().toLocaleString()}
IP ADDRESS: ${clientIP}

MESSAGE:
--------
${data.message}

===============================================
CRISPY • JUICY • ABSOLUTELY DELICIOUS

This message was sent via the contact form on Absolutely Fried Chicken's website.
Please respond to the customer within 24 hours.
`;
  }
}

module.exports = EmailService;