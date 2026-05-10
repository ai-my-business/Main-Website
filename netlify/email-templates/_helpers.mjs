// ─────────────────────────────────────────────────────────────────────────────
// Shared email utilities
// Edit BRAND_* constants to update colours / name across all templates.
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = {
  name: 'AI My Business',
  email: 'hello@ai-my-business.com.au',
  website: 'https://ai-my-business.com.au',
  accentColor: '#3b82f6',       // Blue — used for buttons and highlights
  accentColorDark: '#1d4ed8',   // Darker blue — used for button backgrounds
  bgPage: '#09090b',            // Page background
  bgCard: '#0f172a',            // Card / section background
  bgCardAlt: '#1e293b',         // Alternate card background
  borderColor: '#334155',       // Card border
  textPrimary: '#ffffff',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
};

// ─────────────────────────────────────────────────────────────────────────────
// Date / time formatting
// ─────────────────────────────────────────────────────────────────────────────

export function formatDate(isoString, timezone = 'Australia/Sydney') {
  if (!isoString) return 'To be confirmed';
  try {
    return new Intl.DateTimeFormat('en-AU', {
      timeZone: timezone,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

export function formatTime(isoString, timezone = 'Australia/Sydney') {
  if (!isoString) return 'To be confirmed';
  try {
    return new Intl.DateTimeFormat('en-AU', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Location formatting — handles Zoom, Google Meet, phone, custom
// ─────────────────────────────────────────────────────────────────────────────

export function formatLocation(location) {
  if (!location) return 'Details will be sent separately';
  if (typeof location === 'string') return location;

  switch (location.type) {
    case 'zoom':
    case 'google_conference':
    case 'microsoft_teams_conference':
    case 'webex_conference':
      return location.join_url
        ? `<a href="${location.join_url}" style="color:${BRAND.accentColor};word-break:break-all;">${location.join_url}</a>`
        : 'Video link will be provided';
    case 'outbound_call':
    case 'inbound_call':
      return location.phone_number
        ? `Phone call — ${location.phone_number}`
        : 'Phone call — number will be provided';
    case 'custom':
      return location.location || 'Details will be provided';
    default:
      return location.join_url || location.location || 'Details will be provided';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Base HTML email wrapper — all templates use this shell
// ─────────────────────────────────────────────────────────────────────────────

export function emailShell({ previewText = '', body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>${BRAND.name}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background:${BRAND.bgPage};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;">
  <!-- Preview text (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${BRAND.bgPage};">${previewText}&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌</div>

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${BRAND.bgPage};padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">

        <!-- Logo / Brand -->
        <tr><td style="padding-bottom:28px;text-align:center;">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:${BRAND.accentColor};">${BRAND.name}</p>
        </td></tr>

        ${body}

        <!-- Footer -->
        <tr><td style="padding-top:32px;text-align:center;border-top:1px solid #1e293b;">
          <p style="margin:0 0 4px;color:${BRAND.textMuted};font-size:12px;">${BRAND.name} · <a href="mailto:${BRAND.email}" style="color:${BRAND.textMuted};text-decoration:none;">${BRAND.email}</a></p>
          <p style="margin:0;color:#334155;font-size:11px;">
            <a href="${BRAND.website}" style="color:#334155;text-decoration:none;">${BRAND.website}</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Reusable card block
export function card({ borderColor = BRAND.borderColor, body }) {
  return `
  <tr><td style="padding-bottom:16px;">
    <table width="100%" cellpadding="24" cellspacing="0" role="presentation"
      style="background:${BRAND.bgCard};border:1px solid ${borderColor};border-radius:16px;">
      <tr><td>${body}</td></tr>
    </table>
  </td></tr>`;
}

// Booking details row (label + value)
export function detailRow(label, value) {
  return `
  <tr>
    <td style="padding:8px 0;color:${BRAND.textMuted};font-size:13px;vertical-align:top;width:38%;padding-right:12px;">${label}</td>
    <td style="padding:8px 0;color:${BRAND.textPrimary};font-size:13px;font-weight:600;vertical-align:top;">${value}</td>
  </tr>`;
}

// CTA button
export function ctaButton({ href, text }) {
  return `<a href="${href}" style="display:inline-block;padding:14px 28px;background:${BRAND.accentColorDark};color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;border-radius:99px;">${text} →</a>`;
}

// Small secondary link
export function secondaryLink({ href, text }) {
  return `<a href="${href}" style="color:${BRAND.textSecondary};font-size:13px;text-decoration:underline;">${text}</a>`;
}
