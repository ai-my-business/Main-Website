import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const QUESTIONS = [
  "How much time does your team spend each week on repetitive administrative tasks?",
  "How often do you or your team manually respond to similar customer or client questions?",
  "How are most of your internal processes currently handled?",
  "How much time is spent each week on data entry, updating systems, or transferring information between tools?",
  "How often do delays or bottlenecks occur due to manual work or human dependency?",
  "What's the number 1 problem/challenge facing you right now?",
  "If you could remove 20–40% of manual workload in your business, what would that mean for you?"
];

// Each array is ordered from lowest to highest AI need
const SCORING_MAPS = [
  ["0–2 hours", "3–5 hours", "6–10 hours", "10+ hours"],
  ["Rarely", "Occasionally", "Frequently", "Daily / Constantly"],
  ["Mostly automated already", "Some automation tools in place", "A mix of manual + basic tools", "Fully manual (no automation)"],
  ["Very little", "A few hours", "Several hours", "A significant portion of the week"],
  ["Rarely", "Sometimes", "Often", "Very frequently"],
  null, // Q6 is pain point identifier, not scored
  ["Minimal impact", "Helpful but not critical", "Significant time and cost savings", "Game-changing growth opportunity"]
];

function buildActionPlan(answers) {
  let score = 0;
  SCORING_MAPS.forEach((map, i) => {
    if (map && answers[i]) {
      const idx = map.indexOf(answers[i]);
      if (idx >= 0) score += idx;
    }
  });

  const painPoint = (answers[5] || 'time').toLowerCase();

  let tier, tierLabel, tierBadge, tierIntro;
  if (score <= 5) {
    tier = 'starter';
    tierLabel = 'AI Optimiser';
    tierBadge = 'Strong Foundation';
    tierIntro = 'Your business is already more efficient than most. While you have solid processes in place, there are targeted AI enhancements that could give you a meaningful competitive edge — without disrupting what\'s already working.';
  } else if (score <= 11) {
    tier = 'ready';
    tierLabel = 'AI Ready';
    tierBadge = 'High Opportunity';
    tierIntro = 'You\'re at the ideal stage for AI implementation. Your business has clear, high-value automation opportunities that could save significant time and money. Starting now means a faster return with less disruption.';
  } else {
    tier = 'urgent';
    tierLabel = 'High ROI Zone';
    tierBadge = 'Act Now';
    tierIntro = 'Your business is losing meaningful time and revenue to manual processes. The bottlenecks you\'re experiencing are exactly what AI systems are built to solve — and the ROI on fixing them tends to be immediate and significant.';
  }

  const painAdvice = {
    money: {
      title: 'Cost Reduction Opportunities',
      items: [
        'Automate invoice processing and overdue payment follow-ups to cut admin overhead',
        'Use AI lead scoring to stop spending time on low-value or unqualified prospects',
        'Eliminate costly data entry errors with automated system-to-system transfers',
        'Deploy an AI chatbot for routine customer queries to reduce support staff hours'
      ]
    },
    time: {
      title: 'Time Automation Opportunities',
      items: [
        'Build automated follow-up sequences to reclaim hours lost to manual outreach',
        'Implement AI task routing to eliminate coordination bottlenecks between team members',
        'Create smart document templates with auto-fill for repetitive client paperwork',
        'Set up automated reporting so key insights arrive in your inbox without manual effort'
      ]
    },
    quality: {
      title: 'Quality & Consistency Opportunities',
      items: [
        'Standardise client communications with AI-assisted response templates',
        'Implement automated QA checks on data entry and system updates',
        'Use AI flags to catch inconsistencies before they become client-facing issues',
        'Build approval workflows that ensure nothing slips through the cracks'
      ]
    }
  };

  const quickWins = {
    starter: [
      'Audit your remaining manual tasks — even 2 hrs/week of automation adds 100+ hrs/year back to your business',
      'Explore AI meeting summaries and transcription to eliminate note-taking overhead',
      'Test AI-assisted content generation for marketing or client reporting to cut production time'
    ],
    ready: [
      'Start with your highest-frequency manual task and automate it first — this delivers the fastest ROI',
      'Implement CRM automation for lead follow-up (typically saves 5–8 hrs/week on its own)',
      'Set up automated onboarding sequences for new clients to eliminate repetitive setup work'
    ],
    urgent: [
      'Prioritise automating customer query responses — this is your fastest, most visible time-saver',
      'Map your top 3 data entry workflows this week and identify where automation can plug in immediately',
      'Connect your existing tools with a no-code platform (Zapier/Make) for quick wins while you build deeper systems'
    ]
  };

  return {
    score,
    maxScore: 18,
    tier,
    tierLabel,
    tierBadge,
    tierIntro,
    painAdvice: painAdvice[painPoint] || painAdvice.time,
    quickWins: quickWins[tier]
  };
}

function buildHtml(name, answers, plan) {
  const answersHtml = QUESTIONS.map((q, i) => `
    <tr>
      <td style="padding:8px 0;color:#94a3b8;font-size:13px;vertical-align:top;padding-right:16px;">${q}</td>
      <td style="padding:8px 0;color:#e2e8f0;font-size:13px;font-weight:600;vertical-align:top;white-space:nowrap;">${answers[i] || '—'}</td>
    </tr>`).join('');

  const quickWinsHtml = plan.quickWins.map(w =>
    `<li style="margin-bottom:10px;color:#cbd5e1;font-size:14px;line-height:1.7;">${w}</li>`
  ).join('');

  const adviceHtml = plan.painAdvice.items.map(item =>
    `<li style="margin-bottom:10px;color:#cbd5e1;font-size:14px;line-height:1.7;">${item}</li>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="padding-bottom:32px;text-align:center;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#3b82f6;">AI My Business</p>
    <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;line-height:1.2;">Your AI Action Plan</h1>
    <p style="margin:10px 0 0;color:#64748b;font-size:14px;">Prepared for ${name}</p>
  </td></tr>

  <!-- Tier Card -->
  <tr><td style="padding-bottom:20px;">
    <table width="100%" cellpadding="24" cellspacing="0" style="background:#0f172a;border:1px solid #334155;border-radius:16px;">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <span style="display:inline-block;padding:4px 12px;background:#1d4ed8;border-radius:99px;font-size:11px;font-weight:700;color:#93c5fd;letter-spacing:0.1em;text-transform:uppercase;">${plan.tierBadge}</span>
            <h2 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#ffffff;">${plan.tierLabel}</h2>
          </td>
          <td style="text-align:right;vertical-align:top;">
            <div style="font-size:30px;font-weight:800;color:#3b82f6;">${plan.score}<span style="font-size:15px;color:#475569;">/${plan.maxScore}</span></div>
            <div style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">AI Readiness Score</div>
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0;color:#94a3b8;font-size:14px;line-height:1.7;">${plan.tierIntro}</p>
    </td></tr>
    </table>
  </td></tr>

  <!-- Quick Wins -->
  <tr><td style="padding-bottom:20px;">
    <table width="100%" cellpadding="24" cellspacing="0" style="background:#0f172a;border:1px solid #1e3a5f;border-radius:16px;">
    <tr><td>
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.15em;">Immediate Actions</p>
      <h3 style="margin:0 0 16px;font-size:17px;font-weight:700;color:#ffffff;">Quick Wins for You</h3>
      <ul style="margin:0;padding-left:20px;">${quickWinsHtml}</ul>
    </td></tr>
    </table>
  </td></tr>

  <!-- Pain Point Advice -->
  <tr><td style="padding-bottom:20px;">
    <table width="100%" cellpadding="24" cellspacing="0" style="background:#0f172a;border:1px solid #2e1065;border-radius:16px;">
    <tr><td>
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#8b5cf6;text-transform:uppercase;letter-spacing:0.15em;">Tailored to Your Challenge</p>
      <h3 style="margin:0 0 16px;font-size:17px;font-weight:700;color:#ffffff;">${plan.painAdvice.title}</h3>
      <ul style="margin:0;padding-left:20px;">${adviceHtml}</ul>
    </td></tr>
    </table>
  </td></tr>

  <!-- Quiz Answers -->
  <tr><td style="padding-bottom:20px;">
    <table width="100%" cellpadding="24" cellspacing="0" style="background:#0f172a;border:1px solid #1e293b;border-radius:16px;">
    <tr><td>
      <h3 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#ffffff;">Your Quiz Responses</h3>
      <table width="100%" cellpadding="0" cellspacing="0">${answersHtml}</table>
    </td></tr>
    </table>
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding-bottom:24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:16px;overflow:hidden;">
    <tr><td style="background:#1d4ed8;padding:32px 28px;text-align:center;">
      <h3 style="margin:0 0 8px;font-size:20px;font-weight:800;color:#ffffff;">Want a Full Custom Roadmap?</h3>
      <p style="margin:0 0 20px;color:#bfdbfe;font-size:14px;line-height:1.7;">Book a free 45-minute AI Assessment and we'll map out exactly what to automate — and in what order — for your specific business.</p>
      <a href="https://ai-my-business.com.au" style="display:inline-block;padding:14px 32px;background:#ffffff;color:#1d4ed8;font-weight:700;font-size:15px;text-decoration:none;border-radius:99px;">Book My Free Assessment →</a>
    </td></tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="text-align:center;padding-top:8px;">
    <p style="margin:0 0 4px;color:#334155;font-size:12px;">AI My Business · hello@ai-my-business.com.au</p>
    <p style="margin:0;color:#334155;font-size:12px;">You received this after completing the AI Readiness Quiz at ai-my-business.com.au</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { name, email, answers } = JSON.parse(event.body || '{}');

    if (!name || !email || !Array.isArray(answers)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const plan = buildActionPlan(answers);
    const html = buildHtml(name, answers, plan);

    const { error } = await resend.emails.send({
      from: 'AI My Business <hello@ai-my-business.com.au>',
      to: email,
      subject: `Your AI Action Plan — ${plan.tierLabel}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to send email' }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true, tier: plan.tierLabel }) };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
