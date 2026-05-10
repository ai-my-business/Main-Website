// ─────────────────────────────────────────────────────────────────────────────
// 45 Min AI Assessment — confirmation email sent to the invitee
//
// CUSTOMISE THIS FILE to change the content for the assessment booking email.
// All text between the /* EDIT */ markers is safe to change freely.
// Variables available in the `booking` object:
//   booking.name          — invitee's full name
//   booking.email         — invitee's email
//   booking.eventName     — cal.com event type slug
//   booking.startTime     — ISO start time (UTC)
//   booking.endTime       — ISO end time (UTC)
//   booking.timezone      — invitee's timezone
//   booking.location      — meeting link (Zoom URL, Google Meet, etc.)
//   booking.cancelUrl     — cal.com cancel link
//   booking.rescheduleUrl — cal.com reschedule link
// ─────────────────────────────────────────────────────────────────────────────

import {
  emailShell, card, detailRow, ctaButton, secondaryLink,
  formatDate, formatTime, formatLocation, BRAND,
} from './_helpers.mjs';

export function buildAssessmentEmail(booking) {
  const date = formatDate(booking.startTime, booking.timezone);
  const time = formatTime(booking.startTime, booking.timezone);
  const location = formatLocation(booking.location);
  const firstName = booking.name.split(' ')[0];

  /* ── EDIT: subject line ── */
  const subject = `Your 45-Min AI Assessment is Confirmed — ${BRAND.name}`;

  /* ── EDIT: preview text (shown in inbox before opening) ── */
  const previewText = `You're booked in, ${firstName}. Here's everything you need for your AI Assessment.`;

  const body = `

    <!-- Hero card -->
    ${card({ borderColor: '#1e3a5f', body: `
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${BRAND.accentColor};">Booking Confirmed</p>
      <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:${BRAND.textPrimary};line-height:1.25;">
        You're locked in, ${firstName}.
      </h1>
      <p style="margin:0;color:${BRAND.textSecondary};font-size:15px;line-height:1.7;">
        Your <strong style="color:${BRAND.textPrimary};">45-Minute AI Assessment</strong> is confirmed.
        We'll spend this session mapping your exact business workflows, identifying where AI can save
        you the most time and money, and building a clear action plan — tailored to you.
      </p>
    ` })}

    <!-- Booking details -->
    ${card({ body: `
      <h3 style="margin:0 0 16px;font-size:15px;font-weight:700;color:${BRAND.textPrimary};">Booking Details</h3>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        ${detailRow('Date', date)}
        ${detailRow('Time', time)}
        ${detailRow('Duration', '45 minutes')}
        ${detailRow('Location', location)}
      </table>
    ` })}

    <!-- What to expect -->
    ${card({ body: `
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#8b5cf6;">What to Expect</p>
      <h3 style="margin:0 0 16px;font-size:15px;font-weight:700;color:${BRAND.textPrimary};">We'll cover in your session:</h3>
      <ul style="margin:0;padding-left:20px;">
        <li style="margin-bottom:10px;color:${BRAND.textSecondary};font-size:14px;line-height:1.6;">
          <strong style="color:${BRAND.textPrimary};">Workflow audit</strong> — we'll map your current processes and pinpoint the bottlenecks costing you time
        </li>
        <li style="margin-bottom:10px;color:${BRAND.textSecondary};font-size:14px;line-height:1.6;">
          <strong style="color:${BRAND.textPrimary};">AI opportunity scoring</strong> — rank your automation opportunities by ROI and ease of implementation
        </li>
        <li style="margin-bottom:10px;color:${BRAND.textSecondary};font-size:14px;line-height:1.6;">
          <strong style="color:${BRAND.textPrimary};">Custom action plan</strong> — leave with a clear, prioritised roadmap you can start acting on immediately
        </li>
        <li style="margin-bottom:0;color:${BRAND.textSecondary};font-size:14px;line-height:1.6;">
          <strong style="color:${BRAND.textPrimary};">Q&A</strong> — any questions about tools, timelines, or where to start
        </li>
      </ul>
    ` })}

    <!-- Prep tip -->
    ${card({ borderColor: '#2e1065', body: `
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#8b5cf6;">Before We Meet</p>
      <h3 style="margin:0 0 12px;font-size:15px;font-weight:700;color:${BRAND.textPrimary};">Get the most out of your session</h3>
      <p style="margin:0 0 10px;color:${BRAND.textSecondary};font-size:14px;line-height:1.7;">
        Take 5 minutes to jot down answers to these before we speak:
      </p>
      <ul style="margin:0;padding-left:20px;">
        <li style="margin-bottom:8px;color:${BRAND.textSecondary};font-size:14px;line-height:1.6;">What are the 3 tasks your team does most often that feel repetitive?</li>
        <li style="margin-bottom:8px;color:${BRAND.textSecondary};font-size:14px;line-height:1.6;">Where do delays or errors happen most frequently?</li>
        <li style="margin-bottom:0;color:${BRAND.textSecondary};font-size:14px;line-height:1.6;">What does success look like for your business in the next 12 months?</li>
      </ul>
    ` })}

    <!-- Manage booking -->
    <tr><td style="padding-bottom:16px;text-align:center;">
      <p style="margin:0 0 14px;color:${BRAND.textMuted};font-size:13px;">Need to make a change?</p>
      <table cellpadding="0" cellspacing="0" role="presentation" align="center">
        <tr>
          <td style="padding-right:16px;">${secondaryLink({ href: booking.rescheduleUrl, text: 'Reschedule' })}</td>
          <td>${secondaryLink({ href: booking.cancelUrl, text: 'Cancel' })}</td>
        </tr>
      </table>
    </td></tr>

    <!-- CTA -->
    <tr><td style="padding-bottom:16px;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="background:${BRAND.accentColorDark};border-radius:16px;padding:28px 24px;text-align:center;">
        <tr><td>
          <h3 style="margin:0 0 8px;font-size:18px;font-weight:800;color:#ffffff;">Questions before we meet?</h3>
          <p style="margin:0 0 18px;color:#bfdbfe;font-size:14px;line-height:1.7;">
            Reply to this email or reach out directly — we typically respond within a few hours.
          </p>
          ${ctaButton({ href: `mailto:${BRAND.email}`, text: 'Email Us' })}
        </td></tr>
      </table>
    </td></tr>

  `;

  return {
    subject,
    html: emailShell({ previewText, body }),
  };
}
