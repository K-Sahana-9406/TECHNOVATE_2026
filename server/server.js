const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Google Apps Script URL
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

// ============================================
// ROUTE 1: Submit Registration to Google Sheets via Apps Script
// ============================================
app.post('/api/submit-to-sheets', async (req, res) => {
  try {
    const { registrationId, eventNames, participants, passType, amount, transactionId } = req.body;

    // Validate required fields
    if (!registrationId || !participants || !Array.isArray(participants)) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: registrationId, participants',
      });
    }

    console.log('Submitting to Google Sheets via Apps Script:', { registrationId, eventNames, passType });

    const timestamp = new Date().toISOString();
    const results = [];

    // Submit each participant as a separate row
    for (let i = 0; i < participants.length; i++) {
      const participant = participants[i];
      
      const data = {
        timestamp: timestamp,
        registrationId: registrationId,
        eventNames: eventNames || 'N/A',
        memberName: participant.name || '',
        memberEmail: participant.email || '',
        memberPhone: participant.phone || '',
        college: participant.college || '',
        year: participant.year || '',
        passType: passType || 'N/A',
        amount: i === 0 ? (amount || '0') : '',
        isPrimary: i === 0 ? 'Yes' : 'No',
        transactionId: i === 0 ? (transactionId || '') : ''
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      results.push(result);
    }

    console.log('Data submitted to Google Sheet:', results);

    res.status(200).json({
      success: true,
      message: 'Registration data saved successfully',
      registrationId,
    });
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save registration data',
      error: error.message,
    });
  }
});

// ============================================
// ROUTE 2: Send Bulk Emails
// ============================================
app.post('/api/send-bulk-emails', async (req, res) => {
  try {
    const { recipients, registration_id, event_name, pass_type, amount, college, team_members_list } = req.body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Recipients array is required'
      });
    }

    const emailResults = [];

    for (const recipient of recipients) {
      const plainTextContent = `Subject: Registration Confirmed – Technovate 2026 | Government College of Technology

Dear ${recipient.name},

Greetings from the Department of Information Technology!

We are delighted to inform you that your registration for Technovate 2026 has been successfully confirmed.

Here are your event details:

Event Name: ${event_name}
Pass: ${pass_type}
Date: March 13, 2026
Venue: Government College of Technology, Coimbatore
Reporting Time: 9:00 AM
Registration ID: ${registration_id}

Event Pass Details:
• Your pass grants access to all events under Technovate 2026.
• Please carry a valid College ID card.
• Show this email at the registration desk for verification.

Important Instructions:
• Participants must report on time.
• Bring necessary materials (if required for your event).
• Lunch (Non-Veg) and refreshments will be provided.

For updates and announcements, join our official channels:
WhatsApp: https://chat.whatsapp.com/your-group-link
Instagram: https://instagram.com/ita_gct

If you have any queries, feel free to contact us.

We look forward to your enthusiastic participation and wish you the very best!

Let's innovate. Let's compete. Let's win.

Warm Regards,
Team Technovate 2026
Department of Information Technology
Government College of Technology
Coimbatore`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient.email,
        subject: 'Registration Confirmed – Technovate 2026 | Government College of Technology',
        text: plainTextContent
      };

      const info = await transporter.sendMail(mailOptions);
      emailResults.push({
        recipient: recipient.email,
        success: true,
        messageId: info.messageId
      });
    }

    res.status(200).json({
      success: true,
      message: `Emails sent successfully to ${recipients.length} recipient(s)`,
      results: emailResults
    });

  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send emails',
      error: error.message
    });
  }
});

// ============================================
// ROUTE 3: Health Check
// ============================================
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`Server running on port ${PORT}`);
  console.log(`=================================`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Google Apps Script: ${process.env.GOOGLE_SCRIPT_URL ? '✓ Set' : '✗ Missing'}`);
  console.log(`Email Service: ${process.env.EMAIL_USER ? '✓ Set' : '✗ Missing'}`);
  console.log(`=================================`);
});
