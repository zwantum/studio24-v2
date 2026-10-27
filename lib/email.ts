import nodemailer from 'nodemailer';

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

    const mailOptions = {
      from: `"Studio24 Atelier Concierge" <${from}>`,
      to,
      subject: `🏛️ New Interior Consultation Request: ${lead.fullName} (${lead.serviceType})`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #09090b; color: #f5f5f7; padding: 32px; border-radius: 8px;">
          <h2 style="color: #A6A182; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 12px; margin-top: 0;">
            Studio24 by Shreya • New Client Consultation
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; width: 180px;">Client Name:</td>
              <td style="padding: 8px 0; color: #ffffff; font-weight: bold;">${lead.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa;">Phone Number:</td>
              <td style="padding: 8px 0; color: #ffffff;">
                <a href="tel:${lead.phone}" style="color: #A6A182; text-decoration: none;">${lead.phone}</a>
                (<a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">WhatsApp</a>)
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa;">Service Type:</td>
              <td style="padding: 8px 0; color: #ffffff;">${lead.serviceType}</td>
            </tr>
            ${lead.propertyConfig ? `
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa;">Property Configuration:</td>
              <td style="padding: 8px 0; color: #ffffff;">${lead.propertyConfig}</td>
            </tr>` : ''}
            ${lead.locationBudget ? `
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa;">Location / Budget:</td>
              <td style="padding: 8px 0; color: #ffffff;">${lead.locationBudget}</td>
            </tr>` : ''}
            ${lead.notes ? `
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; vertical-align: top;">Client Notes:</td>
              <td style="padding: 8px 0; color: #d4d4d8;">${lead.notes}</td>
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
