import { createHmac, timingSafeEqual } from 'crypto';
import { Resend } from 'resend';
import { buildAssessmentEmail } from '../email-templates/assessment.mjs';
import { buildDiscoveryEmail } from '../email-templates/discovery.mjs';
import { buildOwnerNotification } from '../email-templates/owner-notification.mjs';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL  = `AI My Business <hello@ai-my-business.com.au>`;
const OWNER_EMAIL = 'hello@ai-my-business.com.au';

// ─────────────────────────────────────────────────────────────────────────────
// Signature verification
// Calendly signs webhooks with HMAC-SHA256.
// Header format: "t=TIMESTAMP,v1=SIGNATURE"
// Message signed: "<timestamp>.<rawBody>"
// ─────────────────────────────────────────────────────────────────────────────

function verifySignature(rawBody, signatureHeader, signingKey) {
  if (!signatureHeader || !signingKey) return !signingKey; // skip if no key configured

  try {
    const parts = {};
    for (const part of signatureHeader.split(',')) {
      const idx = part.indexOf('=');
      if (idx !== -1) parts[part.slice(0, idx)] = part.slice(idx + 1);
    }

    const { t, v1 } = parts;
    if (!t || !v1) return false;

    const expected = createHmac('sha256', signingKey)
      .update(`${t}.${rawBody}`, 'utf8')
      .digest('hex');

    const expectedBuf = Buffer.from(expected, 'hex');
    const receivedBuf = Buffer.from(v1, 'hex');

    if (expectedBuf.length !== receivedBuf.length) return false;
    return timingSafeEqual(expectedBuf, receivedBuf);
  } catch (err) {
    console.error('Signature verification error:', err.message);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Extract normalised booking data from the Calendly payload
// ─────────────────────────────────────────────────────────────────────────────

function extractBooking(payload) {
  const event = payload.scheduled_event || {};
  return {
    name:               payload.name || 'Guest',
    email:              payload.email || '',
    timezone:           payload.timezone || 'Australia/Sydney',
    eventName:          event.name || payload.event_type?.name || '',
    startTime:          event.start_time || '',
    endTime:            event.end_time || '',
    location:           event.location || null,
    cancelUrl:          payload.cancel_url || '',
    rescheduleUrl:      payload.reschedule_url || '',
    questionsAndAnswers: payload.questions_and_answers || [],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Detect which meeting type was booked
// Add extra name variants here if you rename events in Calendly.
// ─────────────────────────────────────────────────────────────────────────────

function detectEventType(eventName) {
  const lower = eventName.toLowerCase();
  if (lower.includes('assessment')) return 'assessment';
  if (lower.includes('discovery'))  return 'discovery';
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main handler
// ─────────────────────────────────────────────────────────────────────────────

export const handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const rawBody        = event.body || '';
  const signatureHeader = event.headers['calendly-webhook-signature'] || '';
  const signingKey     = process.env.CALENDLY_WEBHOOK_SIGNING_KEY || '';

  if (!verifySignature(rawBody, signatureHeader, signingKey)) {
    console.error('Calendly webhook: invalid signature');
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid signature' }) };
  }

  // Parse body
  let webhookPayload;
  try {
    webhookPayload = JSON.parse(rawBody);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { event: webhookEvent, payload } = webhookPayload;

  // Only act on new bookings (ignore cancellations, reschedules etc.)
  if (webhookEvent !== 'invitee.created') {
    console.log(`Calendly webhook: ignoring event type "${webhookEvent}"`);
    return { statusCode: 200, headers, body: JSON.stringify({ message: `Event "${webhookEvent}" ignored` }) };
  }

  const booking   = extractBooking(payload);
  const eventType = detectEventType(booking.eventName);

  if (!eventType) {
    console.warn(`Calendly webhook: unknown event name "${booking.eventName}" — no email sent`);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: `Unknown event type: "${booking.eventName}"` }),
    };
  }

  // Build email content
  const confirmationEmail = eventType === 'assessment'
    ? buildAssessmentEmail(booking)
    : buildDiscoveryEmail(booking);

  const notificationEmail = buildOwnerNotification(booking, eventType);

  // Send both emails concurrently
  const [confirmResult, notifyResult] = await Promise.allSettled([
    resend.emails.send({
      from:    FROM_EMAIL,
      to:      booking.email,
      subject: confirmationEmail.subject,
      html:    confirmationEmail.html,
    }),
    resend.emails.send({
      from:    FROM_EMAIL,
      to:      OWNER_EMAIL,
      subject: notificationEmail.subject,
      html:    notificationEmail.html,
    }),
  ]);

  // Collect any send errors
  const errors = [];

  if (confirmResult.status === 'rejected') {
    errors.push(`Confirmation send failed: ${confirmResult.reason}`);
  } else if (confirmResult.value?.error) {
    errors.push(`Confirmation API error: ${confirmResult.value.error.message}`);
  }

  if (notifyResult.status === 'rejected') {
    errors.push(`Notification send failed: ${notifyResult.reason}`);
  } else if (notifyResult.value?.error) {
    errors.push(`Notification API error: ${notifyResult.value.error.message}`);
  }

  if (errors.length) {
    console.error('Email errors:', errors);
    return { statusCode: 500, headers, body: JSON.stringify({ errors }) };
  }

  console.log(`Emails sent — type: ${eventType}, invitee: ${booking.email}`);
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ success: true, eventType, invitee: booking.email }),
  };
};
