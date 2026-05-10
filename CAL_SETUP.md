# Cal.com Email Automation — Setup Guide

Automates confirmation and owner-notification emails whenever a **45-Min Assessment** or **Free 15-Min Discovery Call** is booked on your cal.com.

---

## Architecture Overview

```
Cal.com booking
       │
       ▼ POST (webhook)
/.netlify/functions/cal-webhook
       │
       ├─ Verify HMAC-SHA256 signature
       ├─ Detect event type (assessment | discovery)
       ├─ Build personalised email from template
       │
       ├─ Resend → confirmation email → invitee
       └─ Resend → notification email  → hello@ai-my-business.com.au
```

**Key files:**

| File | Purpose |
|---|---|
| `netlify/functions/cal-webhook.mjs` | Main handler — signature verification, routing, email dispatch |
| `netlify/email-templates/_helpers.mjs` | Shared utilities and brand constants |
| `netlify/email-templates/assessment.mjs` | **EDIT THIS** — 45-Min Assessment confirmation email |
| `netlify/email-templates/discovery.mjs` | **EDIT THIS** — Discovery Call confirmation email |
| `netlify/email-templates/owner-notification.mjs` | **EDIT THIS** — Owner notification email |

---

## Step 1 — Resend (email provider)

1. Sign up at **[resend.com](https://resend.com)** (free tier: 3,000 emails/month)
2. Go to **Domains** → Add domain → enter `ai-my-business.com.au`
3. Add the DNS records Resend gives you to your domain registrar (3 records: SPF, DKIM, DMARC)
4. Wait for domain verification (usually < 10 minutes)
5. Go to **API Keys** → Create API key → copy it

---

## Step 2 — Netlify environment variables

In your Netlify dashboard: **Site configuration → Environment variables → Add variable**

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | The API key from Resend (starts with `re_`) |
| `CAL_WEBHOOK_SECRET` | From cal.com — see Step 3 below |

> **Remove the old variable** `CALENDLY_WEBHOOK_SIGNING_KEY` once confirmed working.

---

## Step 3 — Cal.com webhook

1. Log in to cal.com → **Settings → Developer → Webhooks**
2. Click **New Webhook**
3. Set the **Subscriber URL** to:
   ```
   https://[your-netlify-site].netlify.app/.netlify/functions/cal-webhook
   ```
   Replace `[your-netlify-site]` with your actual Netlify domain (or custom domain).
4. Under **Triggers**, tick:
   - `BOOKING_CREATED`
   *(You can also tick `BOOKING_CANCELLED` if you want to handle cancellations later)*
5. Enable **Secret** — cal.com will generate a secret key
6. Copy the secret → paste into the `CAL_WEBHOOK_SECRET` env var in Netlify
7. Click **Save**

---

## Step 4 — Deploy

Push to GitHub — Netlify will automatically build and deploy the function.

```bash
git add .
git commit -m "Migrate from Calendly to cal.com"
git push origin main
```

---

## Step 5 — Test

**Option A: Test via a real booking**
1. Open your cal.com booking page in incognito
2. Book a test slot using a real email address you can check
3. You should receive the confirmation email; hello@ai-my-business.com.au should receive the notification

**Option B: Test with curl**
```bash
curl -X POST https://[your-netlify-site].netlify.app/.netlify/functions/cal-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "triggerEvent": "BOOKING_CREATED",
    "payload": {
      "uid": "test-uid-123",
      "type": "45min",
      "title": "45min between AI My Business and Test User",
      "startTime": "2026-05-15T02:00:00.000Z",
      "endTime": "2026-05-15T02:45:00.000Z",
      "attendees": [
        { "name": "Test User", "email": "your-test@email.com", "timeZone": "Australia/Sydney" }
      ],
      "location": "https://zoom.us/j/123456",
      "responses": {
        "notes": { "label": "What is your main challenge?", "value": "Too much manual work" }
      }
    }
  }'
```

> **Note:** The curl test skips signature verification (no `X-Cal-Signature-256` header).
> If `CAL_WEBHOOK_SECRET` is set in your env, the function will reject unsigned requests.
> Comment out that env var temporarily if you want to test without a real cal.com signature.

---

## Cal.com payload → email mapping

| Cal.com field | Maps to |
|---|---|
| `payload.attendees[0].name` | Invitee name |
| `payload.attendees[0].email` | Invitee email |
| `payload.attendees[0].timeZone` | Timezone |
| `payload.type` | Event type slug (`45min` / `15min`) |
| `payload.startTime` / `endTime` | Booking times |
| `payload.location` | Meeting link (Zoom URL, Google Meet, etc.) |
| `payload.responses` | Pre-booking Q&A answers |
| `payload.cancelUrl` | Cancel link (falls back to `cal.com/booking/{uid}?cancel=true`) |
| `payload.rescheduleUrl` | Reschedule link (falls back to `cal.com/reschedule/{uid}`) |

---

## Customising email content

All email content is in `netlify/email-templates/`. Open the relevant file and look for `/* EDIT */` markers.

**To change:**
- **Subject lines** — edit the `subject` constant near the top of each template file
- **Body copy** — edit the text between the `/* EDIT */` markers
- **Brand colours** — edit the `BRAND` object in `netlify/email-templates/_helpers.mjs`

---

## Adding more event types

To handle additional cal.com event types, open `netlify/functions/cal-webhook.mjs` and update `detectEventType()`:

```js
function detectEventType(eventName) {
  const lower = eventName.toLowerCase();
  if (lower.includes('45min') || lower.includes('assessment')) return 'assessment';
  if (lower.includes('15min') || lower.includes('discovery'))  return 'discovery';
  if (lower.includes('strategy'))                              return 'strategy'; // ← add new type
  return null;
}
```

Then create a new template file `netlify/email-templates/strategy.mjs` (copy `discovery.mjs` as a starting point) and wire it up in the handler's template selection block.

---

## Troubleshooting

| Symptom | Check |
|---|---|
| Emails not sending | Resend API key set in Netlify env? Domain verified in Resend? |
| `401 Invalid signature` | `CAL_WEBHOOK_SECRET` matches what cal.com shows in webhook settings |
| `200 Event ignored` | Check the trigger event — must be `BOOKING_CREATED` |
| `200 Unknown event type` | Check the event type slug — must contain `45min` or `15min` |
| Emails going to spam | Ensure SPF/DKIM/DMARC DNS records are all verified in Resend |
| Function not found (404) | Confirm `netlify.toml` has `[functions] directory = "netlify/functions"` |

**View function logs:**
Netlify dashboard → Functions → `cal-webhook` → Logs
