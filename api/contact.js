/**
 * Vercel Serverless Function - Contact Form Handler
 * Sends emails using Nodemailer
 * 
 * Required Environment Variables (set in Vercel Dashboard):
 * - SMTP_HOST: Your SMTP server (e.g., smtp.gmail.com)
 * - SMTP_PORT: SMTP port (e.g., 587)
 * - SMTP_USER: Your email address
 * - SMTP_PASS: Your email password or app-specific password
 * - CONTACT_EMAIL: Email address to receive contact form submissions
 */

import nodemailer from 'nodemailer';

// CORS headers for the response
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize input to prevent injection
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, 5000); // Limit length
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).set(corsHeaders).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        errors: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          subject: !subject ? 'Subject is required' : null,
          message: !message ? 'Message is required' : null,
        }
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
        errors: { email: 'Please enter a valid email address' }
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
    };

    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP configuration missing');
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please contact the site administrator.',
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email to site owner
    const ownerMailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: sanitizedData.email,
      subject: `New Contact: ${sanitizedData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <tr>
              <td style="padding: 40px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                  📬 New Contact Form Submission
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding: 15px; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 20px;">
                      <p style="margin: 0 0 5px 0; font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 1px;">From</p>
                      <p style="margin: 0; font-size: 16px; color: #212529; font-weight: 500;">${sanitizedData.name}</p>
                      <p style="margin: 5px 0 0 0; font-size: 14px; color: #495057;">
                        <a href="mailto:${sanitizedData.email}" style="color: #667eea; text-decoration: none;">${sanitizedData.email}</a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 0;">
                      <p style="margin: 0 0 5px 0; font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
                      <p style="margin: 0; font-size: 18px; color: #212529; font-weight: 600;">${sanitizedData.subject}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;">
                      <p style="margin: 0 0 10px 0; font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                      <p style="margin: 0; font-size: 15px; color: #212529; line-height: 1.6; white-space: pre-wrap;">${sanitizedData.message}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 30px; background-color: #f8f9fa; border-top: 1px solid #e9ecef;">
                <p style="margin: 0; font-size: 12px; color: #6c757d; text-align: center;">
                  This message was sent from your portfolio contact form.<br>
                  Reply directly to this email to respond to ${sanitizedData.name}.
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

From: ${sanitizedData.name}
Email: ${sanitizedData.email}
Subject: ${sanitizedData.subject}

Message:
${sanitizedData.message}

---
This message was sent from your portfolio contact form.
      `.trim(),
    };

    // Auto-reply to sender
    const senderMailOptions = {
      from: `"Khurram" <${process.env.SMTP_USER}>`,
      to: sanitizedData.email,
      subject: `Thanks for reaching out! - Re: ${sanitizedData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Your Message</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <tr>
              <td style="padding: 40px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                  ✨ Thank You for Reaching Out!
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <p style="margin: 0 0 20px 0; font-size: 16px; color: #212529; line-height: 1.6;">
                  Hi ${sanitizedData.name},
                </p>
                <p style="margin: 0 0 20px 0; font-size: 16px; color: #212529; line-height: 1.6;">
                  Thank you for getting in touch! I've received your message and will get back to you as soon as possible, usually within 24-48 hours.
                </p>
                <p style="margin: 0 0 20px 0; font-size: 16px; color: #212529; line-height: 1.6;">
                  Here's a copy of your message:
                </p>
                <div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;">
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #6c757d;"><strong>Subject:</strong> ${sanitizedData.subject}</p>
                  <p style="margin: 0; font-size: 14px; color: #495057; white-space: pre-wrap;">${sanitizedData.message}</p>
                </div>
                <p style="margin: 30px 0 0 0; font-size: 16px; color: #212529; line-height: 1.6;">
                  Best regards,<br>
                  <strong>Khurram</strong><br>
                  Full Stack Developer
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 30px; background-color: #f8f9fa; border-top: 1px solid #e9ecef;">
                <p style="margin: 0; font-size: 12px; color: #6c757d; text-align: center;">
                  This is an automated confirmation email. Please do not reply directly to this message.
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `
Hi ${sanitizedData.name},

Thank you for getting in touch! I've received your message and will get back to you as soon as possible, usually within 24-48 hours.

Here's a copy of your message:

Subject: ${sanitizedData.subject}

${sanitizedData.message}

Best regards,
Khurram
Full Stack Developer

---
This is an automated confirmation email. Please do not reply directly to this message.
      `.trim(),
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(senderMailOptions),
    ]);

    console.log('Emails sent successfully');

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
