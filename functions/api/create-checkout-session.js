/**
 * Cloudflare Pages Function
 * POST /api/create-checkout-session
 *
 * Body: { colors: ["copper", "azure_blue", "azure_blue", "leaf_green", "scarlet_red"] }
 *
 * Creates a Stripe Checkout Session for the Custom Caps 5-Pack.
 * Attaches each selected color as metadata (cap1 … cap5).
 * Returns: { url } — the Stripe-hosted Checkout URL for the frontend to redirect to.
 *
 * Environment variables required (set in Cloudflare Pages dashboard):
 *   STRIPE_SECRET_KEY  — your Stripe secret key (sk_live_… or sk_test_…)
 */

const PRICE_ID     = 'price_1T9vwK09XmoK39lfYim6yGw5';
const SUCCESS_URL  = 'https://vetroponics-site.pages.dev/thank-you';
const CANCEL_URL   = 'https://vetroponics-site.pages.dev/';
const VALID_COLORS = ['copper', 'azure_blue', 'scarlet_red', 'leaf_green', 'silver_ash'];
const CAP_COUNT    = 5;

// Only handle POST requests
export async function onRequestPost(context) {
    const { request, env } = context;

    // Parse request body
    let body;
    try {
        body = await request.json();
    } catch {
        return jsonError('Invalid JSON body.', 400);
    }

    const { colors } = body;

    // Validate: must be exactly 5 items
    if (!Array.isArray(colors) || colors.length !== CAP_COUNT) {
        return jsonError(`Exactly ${CAP_COUNT} colors are required.`, 400);
    }

    // Validate: each value must be an allowed color
    for (const c of colors) {
        if (!VALID_COLORS.includes(c)) {
            return jsonError(`Invalid color value: "${c}".`, 400);
        }
    }

    // Build metadata object: cap1, cap2, … cap5
    const metadata = {};
    colors.forEach((c, i) => { metadata[`cap${i + 1}`] = c; });

    // Build Stripe Checkout Session via REST API
    // The Stripe Node library is not needed — fetch works natively in Workers.
    const params = new URLSearchParams({
        'payment_method_types[0]':                             'card',
        'line_items[0][price]':                                PRICE_ID,
        'line_items[0][quantity]':                             '1',
        'mode':                                                'payment',
        'success_url':                                         SUCCESS_URL,
        'cancel_url':                                          CANCEL_URL,
    });

    // Append metadata entries
    Object.entries(metadata).forEach(([key, value]) => {
        params.append(`metadata[${key}]`, value);
    });

    let stripeRes;
    try {
        stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
                'Content-Type':  'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
    } catch (err) {
        console.error('Stripe network error:', err);
        return jsonError('Network error contacting Stripe.', 502);
    }

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
        console.error('Stripe API error:', session?.error?.message);
        return jsonError(session?.error?.message || 'Stripe error.', stripeRes.status);
    }

    return new Response(JSON.stringify({ url: session.url }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

// Only POST is supported on this route
export async function onRequestGet() {
    return jsonError('Method not allowed.', 405);
}

function jsonError(message, status) {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}
