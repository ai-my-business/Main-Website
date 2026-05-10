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
// Cal.com signs webhooks with HMAC-SHA256.
// Header: "X-Cal-Signature-256: sha256=<hex>"
// Message signed: raw body only (no timestamp prefix)
// ─────────────────────────────────────────────────────────────────────────────

function verifySignature(rawBody, signatureHeader, signingKey) {
  if (!signatureHeader || !signingKey) return !signingKey; // skip if no key configured

  try {
    const expected = 'sha256=' + createHmac('sha256', signingKey)
      .update(rawBody, 'utf8')
      .digest('hex');

    const expectedBuf = Buffer.from(expected, 'utf8');
    const receivedBuf = Buffer.from(signatureHeader, 'utf8');

    if (expectedBuf.length !== receivedBuf.length) return false;
    return timingSafeEqual(expectedBuf, receivedBuf);
  } catch (err) {
    console.error('Signature verification error:', err.message);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Extract normalised booking data from the cal.com payload
// ─────────────────────────────────────────────────────────────────────────────

function extractBooking(payload) {
  const attendee = (payload.attendees || [])[0] || {};
  const uid = payload.uid || '';

  return {
    name:                attendee.name || 'Guest',
    email:               attendee.email || '',
    timezone:            attendee.timeZone || 'Australia/Sydney',
    eventName:           payload.type || payload.title || '',
    startTime:           payload.startTime || '',
    endTime:             payload.endTime || '',
    location:            payload.location || null,
    cancelUrl:           payload.cancelUrl || `https://cal.com/booking/${uid}?cancel=true`,
    rescheduleUrl:       payload.rescheduleUrl || `https://cal.com/reschedule/${uid}`,
    questionsAndAnswers: extractQA(payload.responses),
  };
}

// Convert cal.com responses object → Q&A array shape used by email templates
function extractQA(responses) {
  if (!responses || typeof responses !== 'object') return [];
  return Object.entries(responses)
    .filter(([key]) => !['name', 'email'].includes(key))
    .map(([key, val], index) => ({
      position: index,
      question: (val && val.label) || key,
      answer:   Array.isArray(val?.value) ? val.value.join(', ') : (val?.value || ''),
    }))
    .filter(qa => qa.answer);
}

// ─────────────────────────────────────────────────────────────────────────────
// Detect which meeting type was booked
// Matches cal.com event slugs (45min, 15min) and descriptive fallbacks.
// ─────────────────────────────────────────────────────────────────────────────

function detectEventType(eventName) {
  const lower = eventName.toLowerCase();
  if (lower.includes('45min') || lower.includes('45-min') || lower.includes('assessment')) return 'assessment';
  if (lower.includes('15min') || lower.includes('15-min') || lower.includes('discovery'))  return 'discovery';
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

  const rawBody         = event.body || '';
  const signatureHeader = event.headers['x-cal-signature-256'] || '';
  const signingKey      = process.env.CAL_WEBHOOK_SECRET || '';

  if (!verifySignature(rawBody, signatureHeader, signingKey)) {
    console.error('Cal.com webhook: invalid signature');
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid signature' }) };
  }

  let webhookPayload;
  try {
    webhookPayload = JSON.parse(rawBody);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { triggerEvent, payload } = webhookPayload;

  // Only act on new bookings
  if (triggerEvent !== 'BOOKING_CREATED') {
    console.log(`Cal.com webhook: ignoring trigger "${triggerEvent}"`);
    return { statusCode: 200, headers, body: JSON.stringify({ message: `Trigger "${triggerEvent}" ignored` }) };
  }

  const booking   = extractBooking(payload);
  const eventType = detectEventType(booking.eventName);

  if (!eventType) {
    console.warn(`Cal.com webhook: unknown event name "${booking.eventName}" — no email sent`);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: `Unknown event type: "${booking.eventName}"` }),
    };
  }

  const confirmationEmail = eventType === 'assessment'
    ? buildAssessmentEmail(booking)
    : buildDiscoveryEmail(booking);

  const notificationEmail = buildOwnerNotification(booking, eventType);

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
