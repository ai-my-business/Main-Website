import Stripe from 'stripe';

export const handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Payment not configured' }) };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const siteUrl = process.env.URL || 'https://ai-my-business.com.au';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'aud',
          product_data: {
            name: 'AI Business Audit',
            description: 'Tailored AI roadmap session — identify your top automation opportunities and win back 5–10 hours a week.',
          },
          unit_amount: 30000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${siteUrl}/?paid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/`,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error('Stripe error:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create payment session' }),
    };
  }
};
