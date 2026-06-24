import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const QUESTION_LABELS = {
  admin_time: "Hours per week lost to repetitive admin",
  repeat_questions: "Frequency of answering the same customer questions",
  internal_processes: "How internal processes are handled",
  moving_info: "How often information is manually moved between tools",
  bottlenecks: "How often things stall due to manual work or human dependency",
  motivation: "Impact of removing 20–40% of manual workload",
  ai_use: "Current AI tool usage",
  data_foundation: "Where business information lives",
  strategy: "AI strategy for the business",
  measurement: "Tracking time/cost of repeat tasks",
  governance: "Rules for AI use in the team",
  situation: "Current business situation",
  outcome: "Goal for the next 90 days",
  obstacle: "What's stopping you or hasn't worked",
  solution: "Preferred solution type",
  anything_else: "Additional context",
};

const QUESTION_ORDER = [
  'admin_time', 'repeat_questions', 'internal_processes', 'moving_info', 'bottlenecks',
  'motivation', 'ai_use', 'data_foundation', 'strategy', 'measurement', 'governance',
  'situation', 'outcome', 'obstacle', 'solution', 'anything_else',
];

function parseAnswers(answers) {
  const parsed = {};
  for (const a of answers) {
    const colonIdx = a.indexOf(': ');
    if (colonIdx !== -1) {
      const id = a.slice(0, colonIdx);
      const val = a.slice(colonIdx + 2);
      parsed[id] = val;
    }
  }
  return parsed;
}

function buildActionPlan(opportunityScore, readinessScore) {
  let tier, tierLabel, tierBadge, tierIntro;

  if (opportunityScore >= 60 && readinessScore < 50) {
    tier = 'urgent';
    tierLabel = 'High ROI Zone';
    tierBadge = 'Act Now';
    tierIntro = "Your business is losing meaningful time and revenue to manual processes. The bottlenecks you're experiencing are exactly what AI systems are built to solve — and the ROI on fixing them tends to be immediate and significant.";
  } else if (opportunityScore >= 60) {
    tier = 'ready';
    tierLabel = 'AI Ready';
    tierBadge = 'High Opportunity';
    tierIntro = "You're at the ideal stage for AI implementation. Your business has clear, high-value automation opportunities that could save significant time and money. Starting now means a faster return with less disruption.";
  } else {
    tier = 'starter';
    tierLabel = 'AI Optimiser';
    tierBadge = 'Strong Foundation';
    tierIntro = "Your business is already more efficient than most. While you have solid processes in place, there are targeted AI enhancements that could give you a meaningful competitive edge — without disrupting what's already working.";
  }

  const painAdvice = {
    title: 'Time Automation Opportunities',
    items: [
      'Build automated follow-up sequences to reclaim hours lost to manual outreach',
      'Implement AI task routing to eliminate coordination bottlenecks between team members',
      'Create smart document templates with auto-fill for repetitive client paperwork',
      'Set up automated reporting so key insights arrive in your inbox without manual effort',
    ],
  };

  const quickWins = {
    starter: [
      'Audit your remaining manual tasks — even 2 hrs/week of automation adds 100+ hrs/year back to your business',
      'Explore AI meeting summaries and transcription to eliminate note-taking overhead',
      'Test AI-assisted content generation for marketing or client reporting to cut production time',
    ],
    ready: [
      'Start with your highest-frequency manual task and automate it first — this delivers the fastest ROI',
      'Implement CRM automation for lead follow-up (typically saves 5–8 hrs/week on its own)',
      'Set up automated onboarding sequences for new clients to eliminate repetitive setup work',
    ],
    urgent: [
      'Prioritise automating customer query responses — this is your fastest, most visible time-saver',
      'Map your top 3 data entry workflows this week and identify where automation can plug in immediately',
      'Connect your existing tools with a no-code platform (Zapier/Make) for quick wins while you build deeper systems',
    ],
  };

  return {
    opportunityScore,
    readinessScore,
    tier,
    tierLabel,
    tierBadge,
    tierIntro,
    painAdvice,
    quickWins: quickWins[tier],
  };
}

function buildAnswersHtml(parsedAnswers, forOwner = false) {
  const borderColor = forOwner ? '#1e293b' : 'transparent';
  return QUESTION_ORDER
    .filter(id => parsedAnswers[id] && parsedAnswers[id].trim())
    .map(id => `
      <tr>
        <td style="padding:8px 0;color:#94a3b8;font-size:13px;vertical-align:top;padding-right:16px;${forOwner ? `border-bottom:1px solid ${borderColor};` : ''}">${QUESTION_LABELS[id] || id}</td>
        <td style="padding:8px 0;color:#e2e8f0;font-size:13px;font-weight:600;vertical-align:top;${forOwner ? `border-bottom:1px solid ${borderColor};` : ''}">${parsedAnswers[id]}</td>
      </tr>`)
    .join('');
}

function buildOwnerNotificationHtml(name, email, parsedAnswers, plan) {
  const answersHtml = buildAnswersHtml(parsedAnswers, true);
  const quickWinsHtml = plan.quickWins.map(w =>
    `<li style="margin-bottom:8px;color:#cbd5e1;font-size:13px;line-height:1.6;">${w}</li>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="padding-bottom:24px;text-align:center;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#3b82f6;">AI My Business</p>
    <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;line-height:1.2;">New Quiz Submission</h1>
    <p style="margin:10px 0 0;color:#64748b;font-size:14px;">${name} just completed the AI Readiness Quiz</p>
  </td></tr>

  <!-- Submitter + Score Card -->
  <tr><td style="padding-bottom:20px;">
    <table width="100%" cellpadding="24" cellspacing="0" style="background:#0f172a;border:1px solid #334155;border-radius:16px;">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <p style="margin:0 0 2px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">Name</p>
            <p style="margin:0 0 12px;font-size:16px;font-weight:700;color:#ffffff;">${name}</p>
            <p style="margin:0 0 2px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">Email</p>
            <p style="margin:0;font-size:14px;color:#3b82f6;"><a href="mailto:${email}" style="color:#3b82f6;text-decoration:none;">${email}</a></p>
          </td>
          <td style="text-align:right;vertical-align:top;">
            <span style="display:inline-block;padding:4px 12px;background:#1d4ed8;border-radius:99px;font-size:11px;font-weight:700;color:#93c5fd;letter-spacing:0.1em;text-transform:uppercase;">${plan.tierBadge}</span>
            <div style="margin-top:10px;">
              <div style="font-size:22px;font-weight:800;color:#3b82f6;">${plan.opportunityScore}%</div>
              <div style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">Opportunity</div>
            </div>
            <div style="margin-top:6px;">
              <div style="font-size:22px;font-weight:800;color:#818cf8;">${plan.readinessScore}%</div>
              <div style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">Readiness</div>
            </div>
            <div style="margin-top:6px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">${plan.tierLabel}</div>
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0;color:#94a3b8;font-size:13px;line-height:1.6;">${plan.tierIntro}</p>
      <p style="margin:16px 0 0;">
        <a href="mailto:${email}" style="display:inline-block;padding:10px 22px;background:#1d4ed8;color:#ffffff;font-weight:700;font-size:13px;text-decoration:none;border-radius:8px;">Reply to ${name.split(' ')[0]}</a>
      </p>
    </td></tr>
    </table>
  </td></tr>

  <!-- Action Plan -->
  <tr><td style="padding-bottom:20px;">
    <table width="100%" cellpadding="24" cellspacing="0" style="background:#0f172a;border:1px solid #1e3a5f;border-radius:16px;">
    <tr><td>
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.15em;">Their Action Plan</p>
      <h3 style="margin:0 0 4px;font-size:16px;font-weight:700;color:#ffffff;">${plan.painAdvice.title}</h3>
      <p style="margin:0 0 14px;color:#64748b;font-size:12px;">Quick wins for this tier:</p>
      <ul style="margin:0;padding-left:20px;">${quickWinsHtml}</ul>
    </td></tr>
    </table>
  </td></tr>

  <!-- Quiz Answers -->
  <tr><td style="padding-bottom:20px;">
    <table width="100%" cellpadding="24" cellspacing="0" style="background:#0f172a;border:1px solid #1e293b;border-radius:16px;">
    <tr><td>
      <h3 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#ffffff;">Their Responses</h3>
      <table width="100%" cellpadding="0" cellspacing="0">${answersHtml}</table>
    </td></tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="text-align:center;padding-top:8px;">
    <p style="margin:0;color:#334155;font-size:12px;">AI My Business · Quiz submission notification</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildHtml(name, parsedAnswers, plan) {
  const answersHtml = buildAnswersHtml(parsedAnswers, false);
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

  <!-- Score Cards -->
  <tr><td style="padding-bottom:20px;">
    <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td width="48%" style="padding-right:8px;">
        <table width="100%" cellpadding="20" cellspacing="0" style="background:#0f172a;border:1px solid #334155;border-radius:16px;">
        <tr><td>
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.15em;">Automation Opportunity</p>
          <p style="margin:0;font-size:36px;font-weight:800;color:#3b82f6;">${plan.opportunityScore}%</p>
          <p style="margin:4px 0 0;font-size:12px;color:#475569;">How much manual work could be automated</p>
        </td></tr>
        </table>
      </td>
      <td width="48%" style="padding-left:8px;">
        <table width="100%" cellpadding="20" cellspacing="0" style="background:#0f172a;border:1px solid #334155;border-radius:16px;">
        <tr><td>
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.15em;">AI Readiness</p>
          <p style="margin:0;font-size:36px;font-weight:800;color:#818cf8;">${plan.readinessScore}%</p>
          <p style="margin:4px 0 0;font-size:12px;color:#475569;">How set up you are to adopt AI now</p>
        </td></tr>
        </table>
      </td>
    </tr>
    </table>
  </td></tr>

  <!-- Tier Card -->
  <tr><td style="padding-bottom:20px;">
    <table width="100%" cellpadding="24" cellspacing="0" style="background:#0f172a;border:1px solid #334155;border-radius:16px;">
    <tr><td>
      <span style="display:inline-block;padding:4px 12px;background:#1d4ed8;border-radius:99px;font-size:11px;font-weight:700;color:#93c5fd;letter-spacing:0.1em;text-transform:uppercase;">${plan.tierBadge}</span>
      <h2 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#ffffff;">${plan.tierLabel}</h2>
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
      <p style="margin:0 0 20px;color:#bfdbfe;font-size:14px;line-height:1.7;">Book a free 30-minute Discovery Call and we'll map out exactly what to automate — and in what order — for your specific business.</p>
      <a href="https://ai-my-business.com.au" style="display:inline-block;padding:14px 32px;background:#ffffff;color:#1d4ed8;font-weight:700;font-size:15px;text-decoration:none;border-radius:99px;">Book My Free Chat →</a>
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
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { name, email, answers, opportunityScore, readinessScore } = JSON.parse(event.body || '{}');

    if (!name || !email || !Array.isArray(answers)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const parsedAnswers = parseAnswers(answers);
    const plan = buildActionPlan(
      typeof opportunityScore === 'number' ? opportunityScore : 0,
      typeof readinessScore === 'number' ? readinessScore : 0
    );

    const html = buildHtml(name, parsedAnswers, plan);
    const ownerHtml = buildOwnerNotificationHtml(name, email, parsedAnswers, plan);

    const [userResult, ownerResult] = await Promise.all([
      resend.emails.send({
        from: 'AI My Business <hello@ai-my-business.com.au>',
        to: email,
        subject: `Your AI Action Plan — ${plan.tierLabel}`,
        html,
      }),
      resend.emails.send({
        from: 'AI My Business <hello@ai-my-business.com.au>',
        to: 'hello@ai-my-business.com.au',
        subject: `Quiz Lead: ${name} — ${plan.tierLabel} (Opp: ${plan.opportunityScore}%, Ready: ${plan.readinessScore}%)`,
        html: ownerHtml,
      }),
    ]);

    if (userResult.error) {
      console.error('Resend error (user):', userResult.error);
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to send email' }) };
    }
    if (ownerResult.error) {
      console.error('Resend error (owner notification):', ownerResult.error);
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true, tier: plan.tierLabel }) };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
