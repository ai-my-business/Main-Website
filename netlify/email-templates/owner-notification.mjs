// ─────────────────────────────────────────────────────────────────────────────
// Owner notification email — sent to hello@ai-my-business.com.au on every booking
//
// CUSTOMISE THIS FILE to change what information you receive in your notifications.
// ─────────────────────────────────────────────────────────────────────────────

import {
  emailShell, card, detailRow,
  formatDate, formatTime, formatLocation, BRAND,
} from './_helpers.mjs';

const EVENT_LABELS = {
  assessment: { label: '45 Min AI Assessment', badgeColor: BRAND.accentColor, badgeBg: '#1e3a5f' },
  discovery:  { label: 'Free 15 Min Discovery Call', badgeColor: '#4ade80', badgeBg: '#14532d' },
};

export function buildOwnerNotification(booking, eventType) {
  const meta = EVENT_LABELS[eventType] || { label: booking.eventName, badgeColor: '#94a3b8', badgeBg: '#1e293b' };
  const date = formatDate(booking.startTime, booking.timezone);
  const time = formatTime(booking.startTime, booking.timezone);
  const location = formatLocation(booking.location);
  const firstName = booking.name.split(' ')[0];

  /* ── EDIT: subject line ── */
  const subject = `New Booking: ${meta.label} — ${booking.name}`;

  const qaSection = booking.questionsAndAnswers?.length
    ? `
      <h3 style="margin:0 0 12px;font-size:14px;font-weight:700;color:${BRAND.textPrimary};">Their Answers</h3>
      ${booking.questionsAndAnswers
        .sort((a, b) => a.position - b.position)
        .map(qa => `
          <p style="margin:0 0 4px;color:${BRAND.textMuted};font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">${qa.question}</p>
          <p style="margin:0 0 14px;color:${BRAND.textSecondary};font-size:13px;line-height:1.6;">${qa.answer || '(no answer)'}</p>
        `).join('')}
    `
    : `<p style="margin:0;color:${BRAND.textMuted};font-size:13px;">No pre-call questions answered.</p>`;

  const body = `

    <!-- Badge + headline -->
    <tr><td style="padding-bottom:20px;text-align:center;">
      <span style="display:inline-block;padding:5px 14px;background:${meta.badgeBg};border:1px solid ${meta.badgeColor}33;border-radius:99px;font-size:11px;font-weight:700;color:${meta.badgeColor};letter-spacing:0.1em;text-transform:uppercase;">${meta.label}</span>
      <h1 style="margin:12px 0 4px;font-size:24px;font-weight:800;color:${BRAND.textPrimary};">New Booking</h1>
      <p style="margin:0;color:${BRAND.textSecondary};font-size:15px;">${booking.name} just booked a call with you.</p>
    </td></tr>

    <!-- Booking details -->
    ${card({ body: `
      <h3 style="margin:0 0 16px;font-size:14px;font-weight:700;color:${BRAND.textPrimary};">Booking Details</h3>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        ${detailRow('Date', date)}
        ${detailRow('Time', time)}
        ${detailRow('Duration', eventType === 'assessment' ? '45 minutes' : '15 minutes')}
        ${detailRow('Location', location)}
        ${detailRow('Their Timezone', booking.timezone || 'Unknown')}
      </table>
    ` })}

    <!-- Invitee details -->
    ${card({ borderColor: BRAND.accentColor + '33', body: `
      <h3 style="margin:0 0 16px;font-size:14px;font-weight:700;color:${BRAND.textPrimary};">Invitee Details</h3>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        ${detailRow('Name', booking.name)}
        ${detailRow('Email', `<a href="mailto:${booking.email}" style="color:${BRAND.accentColor};text-decoration:none;">${booking.email}</a>`)}
      </table>
      <p style="margin:16px 0 0;">
        <a href="mailto:${booking.email}" style="display:inline-block;padding:10px 20px;background:${BRAND.accentColorDark};color:#ffffff;font-weight:700;font-size:13px;text-decoration:none;border-radius:8px;">Email ${firstName}</a>
      </p>
    ` })}

    <!-- Questions & Answers -->
    ${card({ body: qaSection })}

    <!-- Manage links -->
    <tr><td style="padding-bottom:16px;text-align:center;">
      <p style="margin:0 0 10px;color:${BRAND.textMuted};font-size:12px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Quick Actions</p>
      <table cellpadding="0" cellspacing="0" role="presentation" align="center">
        <tr>
          <td style="padding-right:20px;">
            <a href="${booking.rescheduleUrl}" style="color:${BRAND.textSecondary};font-size:13px;text-decoration:underline;">Reschedule on their behalf</a>
          </td>
          <td>
            <a href="${booking.cancelUrl}" style="color:${BRAND.textSecondary};font-size:13px;text-decoration:underline;">Cancel booking</a>
          </td>
        </tr>
      </table>
    </td></tr>

  `;

  return {
    subject,
    html: emailShell({ previewText: `${booking.name} booked a ${meta.label} — ${date} at ${time}`, body }),
  };
}
