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
 * Generate plain text email template
 * @param {Object} data - Registration data
 */
export const generateEmailTemplate = (data) => {
  const eventsList = Array.isArray(data.events) 
    ? data.events.join(', ') 
    : data.events || 'Technovate 2026';
  
  const teamMembersList = data.teamMembers 
    ? `Team Members: ${data.teamMembers}` 
    : '';

  const plainTextContent = `Subject: Registration Confirmed – Technovate 2026 | Government College of Technology

Dear ${data.participantName},


Greetings from the Department of Information Technology!


We are delighted to inform you that your registration for Technovate 2026 has been successfully confirmed.


Here are your event details:


Event Name: ${eventsList}

Pass: ${data.passType || 'N/A'}

Date: March 13, 2026

Venue: Government College of Technology, Coimbatore

Reporting Time: 9:00 AM

Registration ID: ${data.registrationId}


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

  return {
    to_name: data.participantName,
    to_email: data.email,
    event_name: eventsList,
    pass_type: data.passType || 'N/A',
    amount: data.amount || '0',
    registration_id: data.registrationId,
    college: data.college || 'N/A',
    date: 'March 13, 2026',
    venue: 'Government College of Technology, Coimbatore',
    team_members: teamMembersList,
    reply_to: 'technovate@gct.ac.in',
    subject: `Registration Confirmed – Technovate 2026 | Government College of Technology`,
    message: plainTextContent,
    text_content: plainTextContent
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
