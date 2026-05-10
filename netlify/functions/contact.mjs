import { Resend } from 'resend';

const resend     = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = 'hello@ai-my-business.com.au';
const FROM_EMAIL  = 'AI My Business <hello@ai-my-business.com.au>';

export const handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request' }) };
  }

  const name    = body.name?.trim()    || '';
  const email   = body.email?.trim()   || '';
  const message = body.message?.trim() || '';

  if (!name || !email || !message) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'All fields are required' }) };
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#09090b;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">

        <tr><td style="padding-bottom:24px;text-align:center;">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#3b82f6;">AI My Business</p>
        </td></tr>

        <tr><td style="padding-bottom:20px;text-align:center;">
          <span style="display:inline-block;padding:5px 14px;background:#1e3a5f;border:1px solid #3b82f633;border-radius:99px;font-size:11px;font-weight:700;color:#3b82f6;letter-spacing:0.1em;text-transform:uppercase;">New Contact Message</span>
          <h1 style="margin:14px 0 4px;font-size:24px;font-weight:800;color:#ffffff;">Message from ${name}</h1>
          <p style="margin:0;color:#94a3b8;font-size:15px;">Submitted via the contact form on ai-my-business.com.au</p>
        </td></tr>

        <tr><td style="padding-bottom:16px;">
          <table width="100%" cellpadding="24" cellspacing="0" role="presentation"
            style="background:#0f172a;border:1px solid #334155;border-radius:16px;">
            <tr><td>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding:8px 0;color:#64748b;font-size:13px;width:38%;padding-right:12px;vertical-align:top;">Name</td>
                  <td style="padding:8px 0;color:#ffffff;font-size:13px;font-weight:600;vertical-align:top;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#64748b;font-size:13px;padding-right:12px;vertical-align:top;">Email</td>
                  <td style="padding:8px 0;font-size:13px;font-weight:600;vertical-align:top;">
                    <a href="mailto:${email}" style="color:#3b82f6;text-decoration:none;">${email}</a>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding-bottom:16px;">
          <table width="100%" cellpadding="24" cellspacing="0" role="presentation"
            style="background:#0f172a;border:1px solid #334155;border-radius:16px;">
            <tr><td>
              <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#ffffff;">Message</p>
              <p style="margin:0;color:#94a3b8;font-size:14px;line-height:1.8;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding-bottom:16px;text-align:center;">
          <a href="mailto:${email}?subject=Re: Your message to AI My Business"
            style="display:inline-block;padding:14px 28px;background:#1d4ed8;color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;border-radius:99px;">
            Reply to ${name} →
          </a>
        </td></tr>

        <tr><td style="padding-top:32px;text-align:center;border-top:1px solid #1e293b;">
          <p style="margin:0;color:#334155;font-size:11px;">ai-my-business.com.au</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const result = await resend.emails.send({
    from:    FROM_EMAIL,
    to:      OWNER_EMAIL,
    replyTo: email,
    subject: `New Contact Message — ${name}`,
    html,
  });

  if (result.error) {
    console.error('Contact email error:', result.error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to send message. Please try again.' }) };
  }

  return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
};
