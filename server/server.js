const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

// ============================================
// SERVER - Handles email sending via Gmail
// Registration data goes to Google Apps Script
// ============================================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Initialize Gmail Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ============================================
// ROUTE: Send Confirmation Emails
// ============================================
app.post('/api/send-emails', async (req, res) => {
  try {
    const { recipients, registrationId, eventNames, passType, amount, college } = req.body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ success: false, message: 'No recipients provided' });
    }

    const results = [];

    for (const recipient of recipients) {
      const subject = 'Registration Confirmed – Technovate 2026 | Government College of Technology';
      
      const body = `Dear ${recipient.name || 'Participant'},

Greetings from the Department of Information Technology!

We are delighted to inform you that your registration for Technovate 2026 has been successfully confirmed.

Here are your event details:

Event Name: ${eventNames || 'N/A'}
Pass: ${passType || 'N/A'}
Date: March 13, 2026
Venue: Government College of Technology, Coimbatore
Reporting Time: 9:00 AM
Registration ID: ${registrationId || 'N/A'}

Event Pass Details:
• Your pass grants access to all events under Technovate 2026.
• Please carry a valid College ID card.
• Show this email at the registration desk for verification.

Important Instructions:
• Participants must report on time.
• Bring necessary materials (if required for your event).
• Lunch (Non-Veg) and refreshments will be provided.

For updates and announcements, join our official community:
WhatsApp: https://chat.whatsapp.com/LmL2KjAfJIAIgoEaK2Fjnp

If you have any queries, feel free to contact us.
Mobile: +91 9025490023
Email: technovate26@gmail.com
We look forward to your enthusiastic participation and wish you the very best!

Let's innovate. Let's compete. Let's win.

Warm Regards,
Team Technovate 2026
Department of Information Technology
Government College of Technology
Coimbatore`;

      const mailOptions = {
        from: `"Technovate 2026" <${process.env.EMAIL_USER}>`,
        to: recipient.email,
        subject: subject,
        text: body
      };

      const info = await transporter.sendMail(mailOptions);
      results.push({ email: recipient.email, success: true, messageId: info.messageId });
    }

    res.status(200).json({ success: true, results });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    email: process.env.EMAIL_USER ? '✓ Configured' : '✗ Missing',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`Server running on port ${PORT}`);
  console.log(`=================================`);
  console.log(`Email Service: ${process.env.EMAIL_USER || 'Not configured'}`);
  console.log(`=================================`);
});
