const nodemailer = require('nodemailer');

// Utility function to sanitize HTML (basic XSS prevention)
const sanitizeHtml = (text) => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

// Email validation regex
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) && email.length <= 254;
};

exports.sendEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide all required fields: name, email, and message.' 
    });
  }

  // Validate field types and lengths
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name must be between 2 and 100 characters.' 
    });
  }

  if (typeof email !== 'string' || !isValidEmail(email.trim())) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide a valid email address.' 
    });
  }

  if (typeof message !== 'string' || message.trim().length < 5 || message.length > 5000) {
    return res.status(400).json({ 
      success: false, 
      message: 'Message must be between 5 and 5000 characters.' 
    });
  }

  if (subject && (typeof subject !== 'string' || subject.length > 200)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Subject must not exceed 200 characters.' 
    });
  }

  try {
    // Verify environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration error: Missing EMAIL_USER or EMAIL_PASS');
      return res.status(500).json({ 
        success: false, 
        message: 'Email service is not properly configured.' 
      });
    }

    // Create Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Sanitize inputs to prevent XSS
    const sanitizedName = sanitizeHtml(name.trim());
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedSubject = sanitizeHtml(subject ? subject.trim() : `New Portfolio Message from ${sanitizedName}`);
    const sanitizedMessage = sanitizeHtml(message.trim());

    // Email Options
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: sanitizedEmail,
      to: process.env.EMAIL_USER,
      subject: sanitizedSubject,
      text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9fafb;">
          <h2 style="color: #7c3aed; margin-top: 0;">New Portfolio Message</h2>
          <div style="background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #7c3aed;">
            <p><strong>Name:</strong> <span style="color: #1f2937;">${sanitizedName}</span></p>
            <p><strong>Email:</strong> <span style="color: #1f2937;"><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></span></p>
            <p><strong>Subject:</strong> <span style="color: #1f2937;">${sanitizedSubject}</span></p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 15px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #374151; margin: 0;">${sanitizedMessage}</p>
          </div>
          <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
            <p>This message was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! I will get back to you soon.' 
    });
  } catch (error) {
    console.error('Email Send Error:', error.message);
    
    // Return appropriate error message based on error type
    if (error.message.includes('Invalid login')) {
      return res.status(500).json({ 
        success: false, 
        message: 'Email service authentication failed. Please contact the administrator.' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
};
