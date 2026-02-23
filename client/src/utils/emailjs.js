import emailjs from '@emailjs/browser';

// EmailJS Configuration (for client-side email)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Backend API URL for Nodemailer (optional - for more reliable email delivery)
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || '';

export const initEmailJS = () => {
  if (PUBLIC_KEY) {
    emailjs.init(PUBLIC_KEY);
  }
};

/**
 * Send confirmation email using EmailJS (client-side)
 * For production, consider using a backend with Nodemailer
 * @param {Object} templateParams - Email template parameters
 */
export const sendConfirmationEmail = async (templateParams) => {
  try {
    // Try backend API first (Nodemailer) if configured
    if (BACKEND_API_URL) {
      try {
        const response = await fetch(`${BACKEND_API_URL}/api/send-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(templateParams)
        });
        if (response.ok) {
          return { success: true, source: 'nodemailer' };
        }
      } catch (backendError) {
        console.log('Backend email failed, falling back to EmailJS');
      }
    }

    // Fallback to EmailJS
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn('Email service not configured');
      return { success: false, error: 'Email service not configured' };
    }
    
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );
    
    return { success: true, source: 'emailjs', response };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send emails to multiple recipients (all team members)
 * @param {Array} recipients - Array of recipient objects with email and name
 * @param {Object} eventData - Common event data
 */
export const sendBulkEmails = async (recipients, eventData) => {
  const results = [];
  
  for (const recipient of recipients) {
    const templateParams = generateEmailTemplate({
      ...eventData,
      participantName: recipient.name,
      email: recipient.email
    });
    
    const result = await sendConfirmationEmail(templateParams);
    results.push({
      recipient: recipient.email,
      ...result
    });
  }
  
  return results;
};

/**
 * Generate professional email template parameters
 * @param {Object} data - Registration data
 */
export const generateEmailTemplate = (data) => {
  const eventsList = Array.isArray(data.events) 
    ? data.events.join(', ') 
    : data.events || 'Technovate 2026';
  
  const teamMembersList = data.teamMembers 
    ? `Team Members: ${data.teamMembers}` 
    : '';

  return {
    to_name: data.participantName,
    to_email: data.email,
    event_name: eventsList,
    pass_type: data.passType || 'N/A',
    amount: data.amount || '0',
    registration_id: data.registrationId,
    college: data.college || 'N/A',
    date: 'March 15, 2026',
    venue: 'Government College of Technology, Coimbatore',
    team_members: teamMembersList,
    reply_to: 'technovate@gct.ac.in',
    subject: `Technovate 2026 - Registration Confirmed (${data.registrationId})`,
    
    // HTML content for rich emails (if supported)
    html_content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0ea5e9, #06b6d4); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Technovate 2026</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Registration Confirmed!</p>
        </div>
        <div style="padding: 30px; background: #f8fafc;">
          <p style="font-size: 16px; color: #334155;">Dear ${data.participantName},</p>
          <p style="font-size: 16px; color: #334155;">Your registration for Technovate 2026 has been confirmed!</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Registration ID:</strong> ${data.registrationId}</p>
            <p><strong>Events:</strong> ${eventsList}</p>
            <p><strong>Pass Type:</strong> ${data.passType || 'N/A'}</p>
            <p><strong>Amount Paid:</strong> ₹${data.amount || '0'}</p>
            <p><strong>Date:</strong> March 15, 2026</p>
            <p><strong>Venue:</strong> Government College of Technology, Coimbatore</p>
          </div>
          
          ${teamMembersList ? `<p style="color: #64748b;">${teamMembersList}</p>` : ''}
          
          <p style="color: #64748b; font-size: 14px;">Please save this email for your records. We look forward to seeing you at the event!</p>
        </div>
      </div>
    `
  };
};

/**
 * Instructions for setting up Nodemailer backend:
 * 
 * 1. Create a simple Node.js/Express server
 * 2. Install nodemailer: npm install nodemailer
 * 3. Create endpoint: POST /api/send-email
 * 4. Configure SMTP (Gmail, SendGrid, etc.)
 * 
 * Example backend code:
 * 
 * const nodemailer = require('nodemailer');
 * 
 * const transporter = nodemailer.createTransporter({
 *   service: 'gmail',
 *   auth: {
 *     user: 'your-email@gmail.com',
 *     pass: 'your-app-password'
 *   }
 * });
 * 
 * app.post('/api/send-email', async (req, res) => {
 *   const { to_email, subject, html_content } = req.body;
 *   await transporter.sendMail({
 *     from: 'technovate@gct.ac.in',
 *     to: to_email,
 *     subject,
 *     html: html_content
 *   });
 *   res.json({ success: true });
 * });
 */
