// ─────────────────────────────────────────────────────────────────────────────
// Free 15 Min Discovery Call — confirmation email sent to the invitee
//
// CUSTOMISE THIS FILE to change the content for the discovery call email.
// All text between the /* EDIT */ markers is safe to change freely.
// Variables available in the `booking` object:
//   booking.name          — invitee's full name
//   booking.email         — invitee's email
//   booking.eventName     — Calendly event type name
//   booking.startTime     — ISO start time (UTC)
//   booking.endTime       — ISO end time (UTC)
//   booking.timezone      — invitee's timezone
//   booking.location      — meeting location object (Zoom/Meet/phone/custom)
//   booking.cancelUrl     — Calendly cancel link
//   booking.rescheduleUrl — Calendly reschedule link
// ─────────────────────────────────────────────────────────────────────────────

import {
  emailShell, card, detailRow, ctaButton, secondaryLink,
  formatDate, formatTime, formatLocation, BRAND,
} from './_helpers.mjs';

export function buildDiscoveryEmail(booking) {
  const date = formatDate(booking.startTime, booking.timezone);
  const time = formatTime(booking.startTime, booking.timezone);
  const location = formatLocation(booking.location);
  const firstName = booking.name.split(' ')[0];

  /* ── EDIT: subject line ── */
  const subject = `Your Discovery Call is Booked — ${BRAND.name}`;

  /* ── EDIT: preview text (shown in inbox before opening) ── */
  const previewText = `See you soon, ${firstName}! Here's what to expect from your free 15-min call.`;

  const body = `

    <!-- Hero card -->
    ${card({ borderColor: '#166534', body: `
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#4ade80;">Booking Confirmed</p>
      <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:${BRAND.textPrimary};line-height:1.25;">
        Great to meet you, ${firstName}.
      </h1>
      <p style="margin:0;color:${BRAND.textSecondary};font-size:15px;line-height:1.7;">
        Your <strong style="color:${BRAND.textPrimary};">Free 15-Minute Discovery Call</strong> is confirmed.
        This is a relaxed, no-pressure conversation to understand your business and see if we're the right fit
        to help you implement AI systems that actually work.
      </p>
    ` })}

    <!-- Booking details -->
    ${card({ body: `
      <h3 style="margin:0 0 16px;font-size:15px;font-weight:700;color:${BRAND.textPrimary};">Booking Details</h3>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        ${detailRow('Date', date)}
        ${detailRow('Time', time)}
        ${detailRow('Duration', '15 minutes')}
        ${detailRow('Location', location)}
      </table>
    ` })}

    <!-- What we'll cover -->
    ${card({ body: `
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#4ade80;">What We'll Cover</p>
      <h3 style="margin:0 0 16px;font-size:15px;font-weight:700;color:${BRAND.textPrimary};">In just 15 minutes we'll:</h3>
      <ul style="margin:0;padding-left:20px;">
        <li style="margin-bottom:10px;color:${BRAND.textSecondary};font-size:14px;line-height:1.6;">
          Learn about your business and the challenges you're facing right now
        </li>
        <li style="margin-bottom:10px;color:${BRAND.textSecondary};font-size:14px;line-height:1.6;">
          Give you an honest take on where AI could realistically help (and where it can't)
        </li>
        <li style="margin-bottom:0;color:${BRAND.textSecondary};font-size:14px;line-height:1.6;">
          Answer any questions you have about working with us or getting started with AI
        </li>
      </ul>
    ` })}

    <!-- Prep tip -->
    ${card({ borderColor: '#14532d', body: `
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#4ade80;">One Quick Thing</p>
      <p style="margin:0;color:${BRAND.textSecondary};font-size:14px;line-height:1.7;">
        If you have a moment before the call, think about the <strong style="color:${BRAND.textPrimary};">one task in your business
        that eats the most time each week</strong>. That's usually where we start, and it gives us the fastest
        path to showing you real value.
      </p>
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
        style="background:#14532d;border:1px solid #166534;border-radius:16px;padding:28px 24px;text-align:center;">
        <tr><td>
          <h3 style="margin:0 0 8px;font-size:18px;font-weight:800;color:#ffffff;">See you soon!</h3>
          <p style="margin:0 0 18px;color:#bbf7d0;font-size:14px;line-height:1.7;">
            If anything comes up or you have questions beforehand, just reply to this email.
          </p>
          ${ctaButton({ href: `mailto:${BRAND.email}`, text: 'Get in Touch' })}
        </td></tr>
      </table>
    </td></tr>

  `;

  return {
    subject,
    html: emailShell({ previewText, body }),
  };
}
