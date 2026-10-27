import nodemailer from 'nodemailer';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendConsultationNotification(lead: {
  fullName: string;
  phone: string;
  serviceType: string;
  propertyConfig?: string;
  locationBudget?: string;
  notes?: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM || user;
  const to = process.env.ADMIN_ALLOWED_EMAILS || 'amandangi950@gmail.com';

  if (!host || !user || !pass) {
    console.log('SMTP not fully configured, skipping email notification');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === 'true' || port === 465,
      auth: {
        user,
        pass,
      },
    });

    const safeName = escapeHtml(lead.fullName.replace(/[\r\n]/g, ''));
    const safeService = escapeHtml(lead.serviceType.replace(/[\r\n]/g, ''));
    const safePhone = escapeHtml(lead.phone.replace(/[\r\n]/g, ''));
    const cleanPhoneDigits = lead.phone.replace(/[^0-9]/g, '');
    const safeConfig = lead.propertyConfig ? escapeHtml(lead.propertyConfig) : '';
    const safeLocation = lead.locationBudget ? escapeHtml(lead.locationBudget) : '';
    const safeNotes = lead.notes ? escapeHtml(lead.notes) : '';

    const mailOptions = {
      from: `"Studio24 Atelier Concierge" <${from}>`,
      to,
      subject: `🏛️ New Interior Consultation Request: ${safeName} (${safeService})`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #09090b; color: #f5f5f7; padding: 32px; border-radius: 8px;">
          <h2 style="color: #A6A182; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 12px; margin-top: 0;">
            Studio24 by Shreya • New Client Consultation
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; width: 180px;">Client Name:</td>
              <td style="padding: 8px 0; color: #ffffff; font-weight: bold;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa;">Phone Number:</td>
              <td style="padding: 8px 0; color: #ffffff;">
                <a href="tel:${safePhone}" style="color: #A6A182; text-decoration: none;">${safePhone}</a>
                (<a href="https://wa.me/${cleanPhoneDigits}" style="color: #25D366; text-decoration: none;">WhatsApp</a>)
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa;">Service Type:</td>
              <td style="padding: 8px 0; color: #ffffff;">${safeService}</td>
            </tr>
            ${safeConfig ? `
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa;">Property Configuration:</td>
              <td style="padding: 8px 0; color: #ffffff;">${safeConfig}</td>
            </tr>` : ''}
            ${safeLocation ? `
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa;">Location / Budget:</td>
              <td style="padding: 8px 0; color: #ffffff;">${safeLocation}</td>
            </tr>` : ''}
            ${safeNotes ? `
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; vertical-align: top;">Client Notes:</td>
              <td style="padding: 8px 0; color: #d4d4d8;">${safeNotes}</td>
            </tr>` : ''}
          </table>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 12px; color: #71717a;">
            Received at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST • Studio24 Admin Portal
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Consultation notification email sent successfully to', to);
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }
}

