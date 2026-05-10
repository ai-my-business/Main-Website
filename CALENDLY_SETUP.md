# Calendly Email Automation — Setup Guide

Automates confirmation and owner-notification emails whenever a **45-Min Assessment** or **Free 15-Min Discovery Call** is booked on your Calendly.

---

## Architecture Overview

```
Calendly booking
       │
       ▼ POST (webhook)
/.netlify/functions/calendly-webhook
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
| `netlify/functions/calendly-webhook.mjs` | Main handler — signature verification, routing, email dispatch |
| `netlify/email-templates/_helpers.mjs` | Shared utilities and brand constants |
| `netlify/email-templates/assessment.mjs` | **EDIT THIS** — 45-Min Assessment confirmation email |
| `netlify/email-templates/discovery.mjs` | **EDIT THIS** — Discovery Call confirmation email |
| `netlify/email-templates/owner-notification.mjs` | **EDIT THIS** — Owner notification email |

---

## Step 1 — Resend (email provider)

1. Sign up at **[resend.com](https://resend.com)** (free tier: 3,000 emails/month)
2. Go to **Domains** → Add domain → enter `ai-my-business.com.au`
3. Add the DNS records Resend gives you to your domain registrar (usually 3 records: SPF, DKIM, DMARC)
4. Wait for domain verification (usually < 10 minutes)
5. Go to **API Keys** → Create API key → copy it

---

## Step 2 — Netlify environment variables

In your Netlify dashboard: **Site configuration → Environment variables → Add variable**

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | The API key from Resend (starts with `re_`) |
| `CALENDLY_WEBHOOK_SIGNING_KEY` | From Calendly — see Step 3 below |

---

## Step 3 — Calendly webhook

1. Log in to Calendly → **Integrations → Webhooks**  
   *(or go to: calendly.com/integrations/webhooks)*
2. Click **New Webhook**
3. Set the **Webhook URL** to:
   ```
   https://[your-netlify-site].netlify.app/.netlify/functions/calendly-webhook
   ```
   Replace `[your-netlify-site]` with your actual Netlify domain (or custom domain).
4. Select **Organization** scope
5. Under **Events**, tick:  
   - `invitee.created`  
   *(You can also tick `invitee.canceled` if you want to handle cancellations later)*
6. Click **Create Webhook**
7. Copy the **Signing Key** shown after creation → paste into the `CALENDLY_WEBHOOK_SIGNING_KEY` env var in Netlify

---

## Step 4 — Deploy

Push to GitHub — Netlify will automatically build and deploy the function.

```bash
git add .
git commit -m "Add Calendly webhook email automation"
git push origin main
```

---

## Step 5 — Test

**Option A: Test via a real booking**
1. Open your Calendly booking page in incognito
2. Book a test slot using a real email address you can check
3. You should receive the confirmation email; hello@ai-my-business.com.au should receive the notification

**Option B: Test with curl**
```bash
curl -X POST https://[your-netlify-site].netlify.app/.netlify/functions/calendly-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event": "invitee.created",
    "payload": {
      "name": "Test User",
      "email": "your-test@email.com",
      "timezone": "Australia/Sydney",
      "cancel_url": "https://calendly.com/cancellations/test",
      "reschedule_url": "https://calendly.com/reschedulings/test",
      "questions_and_answers": [
        { "position": 0, "question": "What is your main challenge?", "answer": "Too much manual work" }
      ],
      "scheduled_event": {
        "name": "45 Min Assessment",
        "start_time": "2026-05-15T02:00:00.000000Z",
        "end_time": "2026-05-15T02:45:00.000000Z",
        "location": { "type": "zoom", "join_url": "https://zoom.us/j/123456" }
      }
    }
  }'
```

> **Note:** The curl test skips signature verification (no `Calendly-Webhook-Signature` header).
> If `CALENDLY_WEBHOOK_SIGNING_KEY` is set in your env, the function will reject unsigned requests.
> Comment out that env var temporarily if you want to test without a real Calendly signature.

---

## Customising email content

All email content is in `netlify/email-templates/`. Open the relevant file and look for `/* EDIT */` markers — those are the sections intended for you to customise.

**To change:**
- **Subject lines** — edit the `subject` constant near the top of each template file
- **Body copy** — edit the text between the `/* EDIT */` markers
- **Brand colours** — edit the `BRAND` object in `netlify/email-templates/_helpers.mjs`
- **Agenda/prep items** — edit the `<ul>` lists inside each template

After editing, commit and push — Netlify redeploys automatically.

---

## Adding more event types

To handle additional Calendly event types, open `netlify/functions/calendly-webhook.mjs` and update `detectEventType()`:

```js
function detectEventType(eventName) {
  const lower = eventName.toLowerCase();
  if (lower.includes('assessment')) return 'assessment';
  if (lower.includes('discovery'))  return 'discovery';
  if (lower.includes('strategy'))   return 'strategy';  // ← add new type
  return null;
}
```

Then create a new template file `netlify/email-templates/strategy.mjs` (copy `discovery.mjs` as a starting point) and wire it up in the handler's template selection block.

---

## Troubleshooting

| Symptom | Check |
|---|---|
| Emails not sending | Resend API key set in Netlify env? Domain verified in Resend? |
| `401 Invalid signature` | `CALENDLY_WEBHOOK_SIGNING_KEY` matches what Calendly shows |
| `200 Event ignored` | Check the event type name in Calendly matches "assessment" or "discovery" |
| Emails going to spam | Ensure SPF/DKIM/DMARC DNS records are all verified in Resend |
| Function not found (404) | Confirm `netlify.toml` has `[functions] directory = "netlify/functions"` |

**View function logs:**  
Netlify dashboard → Functions → `calendly-webhook` → Logs
