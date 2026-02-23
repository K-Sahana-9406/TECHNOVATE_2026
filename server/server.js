const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: __dirname + '/.env' });
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Google Sheets Web App URL
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server ready to send messages');
  }
});

/**
 * POST /api/send-email
 * Send email to a single recipient
 */
app.post('/api/send-email', async (req, res) => {
  try {
    const { 
      to_email, 
      to_name, 
      subject, 
      registration_id, 
      event_name, 
      pass_type, 
      amount, 
      college,
      team_members,
      html_content 
    } = req.body;

    const mailOptions = {
      from: `"Technovate 2026 - GCT Coimbatore" <${process.env.EMAIL_USER}>`,
      to: to_email,
      subject: subject || `Technovate 2026 - Registration Confirmed (${registration_id})`,
      html: html_content || `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0f172a, #1e3a5f); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">TECHNOVATE 2026</h1>
            <p style="color: #06b6d4; margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Intercollege IT Fest</p>
            <div style="margin-top: 20px; padding: 10px 20px; background: rgba(6, 182, 212, 0.2); border-radius: 20px; display: inline-block;">
              <span style="color: #06b6d4; font-size: 12px; font-weight: 600;">REGISTRATION CONFIRMED</span>
            </div>
          </div>
          
          <!-- Body -->
          <div style="padding: 40px 30px; background: #ffffff;">
            <p style="font-size: 16px; color: #334155; margin: 0 0 20px 0;">Dear <strong>${to_name}</strong>,</p>
            <p style="font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 25px 0;">
              We are pleased to confirm your successful registration for <strong>Technovate 2026</strong>, the premier Intercollege IT Festival hosted by the Information Technology Department at Government College of Technology, Coimbatore.
            </p>
            
            <!-- Registration Details Box -->
            <div style="background: #f8fafc; border-left: 4px solid #06b6d4; padding: 25px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #0f172a; margin: 0 0 20px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Registration Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 40%;">Registration ID</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600; font-family: monospace;">${registration_id}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Events Registered</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${event_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Pass Type</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${pass_type || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Amount Paid</td>
                  <td style="padding: 8px 0; color: #059669; font-size: 14px; font-weight: 700;">₹${amount || '0'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Institution</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${college || 'N/A'}</td>
                </tr>
              </table>
            </div>
            
            <!-- Event Details Box -->
            <div style="background: #f8fafc; border-left: 4px solid #8b5cf6; padding: 25px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #0f172a; margin: 0 0 20px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Event Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 40%;">Date</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">March 15, 2026</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Venue</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">Government College of Technology, Coimbatore</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Address</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">Thadagam Road, Coimbatore - 641013</td>
                </tr>
              </table>
            </div>
            
            ${team_members ? `<div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 8px;"><p style="color: #92400e; font-size: 14px; margin: 0;"><strong>Team Information:</strong> ${team_members}</p></div>` : ''}
            
            <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin: 25px 0;">
              Please retain this email as official confirmation of your registration. Kindly present your Registration ID at the registration desk upon arrival at the venue.
            </p>
            
            <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin: 0;">
              We look forward to your participation and wish you the very best in your chosen events.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #0f172a; padding: 30px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">Contact Information</p>
            <p style="color: #cbd5e1; font-size: 13px; margin: 5px 0;">General Secretary: +91 98765 43210</p>
            <p style="color: #cbd5e1; font-size: 13px; margin: 5px 0;">Email: technovate@gct.ac.in</p>
            <p style="color: #475569; font-size: 11px; margin: 20px 0 0 0;">
              © 2026 Technovate - Government College of Technology, Coimbatore. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    
    res.json({ 
      success: true, 
      messageId: info.messageId,
      recipient: to_email 
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

/**
 * POST /api/send-bulk-emails
 * Send emails to all team members
 */
app.post('/api/send-bulk-emails', async (req, res) => {
  try {
    const { 
      recipients, // Array of { name, email }
      registration_id, 
      event_name, 
      pass_type, 
      amount, 
      college,
      team_members_list
    } = req.body;

    const results = [];
    const teamMembersString = team_members_list ? `Team Members: ${team_members_list}` : '';

    // Send email to each recipient
    for (const recipient of recipients) {
      try {
        const mailOptions = {
          from: `"Technovate 2026 - GCT Coimbatore" <${process.env.EMAIL_USER}>`,
          to: recipient.email,
          subject: `Technovate 2026 - Registration Confirmed (${registration_id})`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #0f172a, #1e3a5f); padding: 40px 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">TECHNOVATE 2026</h1>
                <p style="color: #06b6d4; margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Intercollege IT Fest</p>
                <div style="margin-top: 20px; padding: 10px 20px; background: rgba(6, 182, 212, 0.2); border-radius: 20px; display: inline-block;">
                  <span style="color: #06b6d4; font-size: 12px; font-weight: 600;">REGISTRATION CONFIRMED</span>
                </div>
              </div>
              
              <!-- Body -->
              <div style="padding: 40px 30px; background: #ffffff;">
                <p style="font-size: 16px; color: #334155; margin: 0 0 20px 0;">Dear <strong>${recipient.name}</strong>,</p>
                <p style="font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 25px 0;">
                  We are pleased to confirm your successful registration for <strong>Technovate 2026</strong>, the premier Intercollege IT Festival hosted by the Information Technology Department at Government College of Technology, Coimbatore.
                </p>
                
                <!-- Registration Details Box -->
                <div style="background: #f8fafc; border-left: 4px solid #06b6d4; padding: 25px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                  <h3 style="color: #0f172a; margin: 0 0 20px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Registration Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 40%;">Registration ID</td>
                      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600; font-family: monospace;">${registration_id}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Events Registered</td>
                      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${event_name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Pass Type</td>
                      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${pass_type || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Amount Paid</td>
                      <td style="padding: 8px 0; color: #059669; font-size: 14px; font-weight: 700;">₹${amount || '0'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Institution</td>
                      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${college || 'N/A'}</td>
                    </tr>
                  </table>
                </div>
                
                <!-- Event Details Box -->
                <div style="background: #f8fafc; border-left: 4px solid #8b5cf6; padding: 25px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                  <h3 style="color: #0f172a; margin: 0 0 20px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Event Information</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 40%;">Date</td>
                      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">March 15, 2026</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Venue</td>
                      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">Government College of Technology, Coimbatore</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Address</td>
                      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">Thadagam Road, Coimbatore - 641013</td>
                    </tr>
                  </table>
                </div>
                
                ${teamMembersString ? `<div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 8px;"><p style="color: #92400e; font-size: 14px; margin: 0;"><strong>Team Information:</strong> ${teamMembersString}</p></div>` : ''}
                
                <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin: 25px 0;">
                  Please retain this email as official confirmation of your registration. Kindly present your Registration ID at the registration desk upon arrival at the venue.
                </p>
                
                <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin: 0;">
                  We look forward to your participation and wish you the very best in your chosen events.
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background: #0f172a; padding: 30px; text-align: center;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">Contact Information</p>
                <p style="color: #cbd5e1; font-size: 13px; margin: 5px 0;">General Secretary: +91 98765 43210</p>
                <p style="color: #cbd5e1; font-size: 13px; margin: 5px 0;">Email: technovate@gct.ac.in</p>
                <p style="color: #475569; font-size: 11px; margin: 20px 0 0 0;">
                  © 2026 Technovate - Government College of Technology, Coimbatore. All rights reserved.
                </p>
              </div>
            </div>
          `
        };

        const info = await transporter.sendMail(mailOptions);
        results.push({ 
          success: true, 
          recipient: recipient.email,
          messageId: info.messageId 
        });
      } catch (error) {
        results.push({ 
          success: false, 
          recipient: recipient.email,
          error: error.message 
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    
    res.json({
      success: true,
      total: recipients.length,
      sent: successCount,
      failed: recipients.length - successCount,
      results
    });
  } catch (error) {
    console.error('Bulk email error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

/**
 * POST /api/submit-to-sheets
 * Submit registration data to Google Sheets (each member as separate row)
 */
app.post('/api/submit-to-sheets', async (req, res) => {
  try {
    const { 
      registrationId,
      eventNames,
      participants, // Array of all participants
      passType,
      amount,
      transactionId
    } = req.body;

    console.log('Received transactionId:', transactionId);
    console.log('Request body:', req.body);

    if (!GOOGLE_SCRIPT_URL) {
      return res.status(500).json({
        success: false,
        error: 'Google Script URL not configured'
      });
    }

    const results = [];
    const timestamp = new Date().toISOString();

    // Submit each participant as separate row
    for (let i = 0; i < participants.length; i++) {
      const participant = participants[i];
      
      const rowData = {
        timestamp: timestamp,
        registrationId: registrationId,
        eventNames: eventNames,
        memberName: participant.name,
        memberEmail: participant.email,
        memberPhone: participant.phone,
        college: participant.college,
        year: participant.year,
        passType: passType,
        amount: amount,
        transactionId: transactionId || 'N/A',
        isPrimary: i === 0 ? 'Yes' : 'No'
      };

      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rowData)
        });

        const result = await response.json();
        results.push({
          success: true,
          participant: participant.name,
          result
        });
      } catch (error) {
        results.push({
          success: false,
          participant: participant.name,
          error: error.message
        });
      }
    }

    const successCount = results.filter(r => r.success).length;

    res.json({
      success: true,
      total: participants.length,
      appended: successCount,
      failed: participants.length - successCount,
      results
    });
  } catch (error) {
    console.error('Sheets submission error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/send-verification-pending
 * Send verification pending email to all team members
 */
app.post('/api/send-verification-pending', async (req, res) => {
  try {
    const { 
      recipients, // Array of { name, email }
      registration_id, 
      event_name, 
      pass_type, 
      amount, 
      college,
      team_members_list,
      transaction_id
    } = req.body;

    const results = [];
    const teamMembersString = team_members_list ? `Team Members: ${team_members_list}` : '';

    // Send email to each recipient
    for (const recipient of recipients) {
      try {
        const mailOptions = {
          from: `"Technovate 2026 - GCT Coimbatore" <${process.env.EMAIL_USER}>`,
          to: recipient.email,
          subject: `Technovate 2026 - Payment Verification Pending (${registration_id})`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #0f172a, #1e3a5f); padding: 40px 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">TECHNOVATE 2026</h1>
                <p style="color: #f59e0b; margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Payment Verification Pending</p>
              </div>
              
              <!-- Body -->
              <div style="padding: 40px 30px; background: #ffffff;">
                <p style="font-size: 16px; color: #334155; margin: 0 0 20px 0;">Dear <strong>${recipient.name}</strong>,</p>
                <p style="font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 25px 0;">
                  Thank you for registering for <strong>Technovate 2026</strong>. Your payment details have been received and are currently under verification.
                </p>
                
                <!-- Registration Details Box -->
                <div style="background: #f8fafc; border-left: 4px solid #f59e0b; padding: 25px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                  <h3 style="color: #0f172a; margin: 0 0 20px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Registration Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 40%;">Registration ID</td>
                      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600; font-family: monospace;">${registration_id}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Transaction ID</td>
                      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600; font-family: monospace;">${transaction_id}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Events Registered</td>
                      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${event_name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Pass Type</td>
                      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${pass_type || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Amount</td>
                      <td style="padding: 8px 0; color: #059669; font-size: 14px; font-weight: 700;">₹${amount || '0'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Institution</td>
                      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${college || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Status</td>
                      <td style="padding: 8px 0; color: #f59e0b; font-size: 14px; font-weight: 700;">PENDING VERIFICATION</td>
                    </tr>
                  </table>
                </div>
                
                <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; margin: 25px 0; border-radius: 8px;">
                  <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.6;">
                    <strong>What happens next?</strong><br>
                    Our team will verify your payment within 24 hours by matching the Transaction ID with our bank records. You will receive a confirmation email once your registration is approved.
                  </p>
                </div>
                
                ${teamMembersString ? `<div style="background: #f1f5f9; border: 1px solid #cbd5e1; padding: 15px; margin: 20px 0; border-radius: 8px;"><p style="color: #475569; font-size: 14px; margin: 0;"><strong>Team Information:</strong> ${teamMembersString}</p></div>` : ''}
                
                <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin: 25px 0;">
                  Please retain this email and save your Registration ID and Transaction ID for future reference.
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background: #0f172a; padding: 30px; text-align: center;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">Contact Information</p>
                <p style="color: #cbd5e1; font-size: 13px; margin: 5px 0;">General Secretary: +91 98765 43210</p>
                <p style="color: #cbd5e1; font-size: 13px; margin: 5px 0;">Email: technovate@gct.ac.in</p>
                <p style="color: #475569; font-size: 11px; margin: 20px 0 0 0;">
                  © 2026 Technovate - Government College of Technology, Coimbatore. All rights reserved.
                </p>
              </div>
            </div>
          `
        };

        const info = await transporter.sendMail(mailOptions);
        results.push({ 
          success: true, 
          recipient: recipient.email,
          messageId: info.messageId 
        });
      } catch (error) {
        results.push({ 
          success: false, 
          recipient: recipient.email,
          error: error.message 
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    
    res.json({
      success: true,
      total: recipients.length,
      sent: successCount,
      failed: recipients.length - successCount,
      results
    });
  } catch (error) {
    console.error('Verification pending email error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    emailConfigured: !!process.env.EMAIL_USER,
    sheetsConfigured: !!GOOGLE_SCRIPT_URL
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Email configured: ${!!process.env.EMAIL_USER}`);
  console.log(`Google Sheets configured: ${!!GOOGLE_SCRIPT_URL}`);
});
