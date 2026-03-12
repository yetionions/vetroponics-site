/**
 * Cloudflare Pages Function
 * POST /api/create-checkout-session
 *
 * Body: { copper, azure_blue, scarlet_red, leaf_green, silver_ash }
 *       All values are integers >= 0. Total must equal exactly 5.
 *
 * Creates a Stripe Checkout Session for the Custom Caps 5-Pack with
 * metadata containing the individual color quantities.
 * Returns: { url } — the Stripe-hosted Checkout URL.
 *
 * Environment variables required (set in Cloudflare Pages dashboard):
 *   STRIPE_SECRET_KEY  — your Stripe secret key (sk_live_… or sk_test_…)
 */

const PRICE_ID    = 'price_1TA1iK0Bp5FXtpozxKMw6UaL'; // Caps – Custom Mix
const CAP_TOTAL   = 5;
const SUCCESS_URL = 'https://vetroponics-site.pages.dev/';
const CANCEL_URL  = 'https://vetroponics-site.pages.dev/';

const COLOR_KEYS = ['copper', 'azure_blue', 'scarlet_red', 'leaf_green', 'silver_ash'];

const COLOR_LABELS = {
    copper:      'Copper',
    azure_blue:  'Azure Blue',
    scarlet_red: 'Scarlet Red',
    leaf_green:  'Leaf Green',
    silver_ash:  'Silver Ash',
};

export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch {
        return jsonError('Invalid JSON body.', 400);
    }

    // Validate and parse quantities
    const quantities = {};
    for (const key of COLOR_KEYS) {
        const val = Number(body[key]);
        if (!Number.isInteger(val) || val < 0 || val > CAP_TOTAL) {
            return jsonError(`Invalid quantity for "${key}". Must be an integer 0–${CAP_TOTAL}.`, 400);
        }
        quantities[key] = val;
    }

    const total = COLOR_KEYS.reduce((sum, k) => sum + quantities[k], 0);
    if (total !== CAP_TOTAL) {
        return jsonError(`Total cap quantity must equal ${CAP_TOTAL}. Got ${total}.`, 400);
    }

    // Build human-readable summary (only colors with qty > 0)
    const summary = COLOR_KEYS
        .filter(k => quantities[k] > 0)
        .map(k => `${COLOR_LABELS[k]} x${quantities[k]}`)
        .join(', ');

    // Build Stripe Checkout Session params
    const params = new URLSearchParams({
        mode:                               'payment',
        'line_items[0][price]':             PRICE_ID,
        'line_items[0][quantity]':          '1',
        success_url:                         SUCCESS_URL,
        cancel_url:                          CANCEL_URL,
        'metadata[cap_copper]':             String(quantities.copper),
        'metadata[cap_azure_blue]':         String(quantities.azure_blue),
        'metadata[cap_scarlet_red]':        String(quantities.scarlet_red),
        'metadata[cap_leaf_green]':         String(quantities.leaf_green),
        'metadata[cap_silver_ash]':         String(quantities.silver_ash),
        'metadata[cap_selection_summary]':  summary,
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

export async function onRequestGet() {
    return jsonError('Method not allowed.', 405);
}

function jsonError(message, status) {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}

// Human-readable display names for each color key
const COLOR_LABELS = {
    copper:     'Copper',
    azure_blue: 'Azure Blue',
    scarlet_red:'Scarlet Red',
    leaf_green: 'Leaf Green',
    silver_ash: 'Silver Ash',
};

/**
 * Build a readable color summary from the flat colors array.
 * Example output:
 *   Copper ×2
 *   Azure Blue ×1
 *   Leaf Green ×1
 *   Silver Ash ×1
 */
function buildColorSummary(colors) {
    const counts = {};
    for (const c of colors) {
        counts[c] = (counts[c] || 0) + 1;
    }
    return Object.entries(counts)
        .map(([key, qty]) => `${COLOR_LABELS[key] || key} ×${qty}`)
        .join('\n');
}

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

    // Build per-cap metadata: cap1, cap2, … cap5
    const metadata = {};
    colors.forEach((c, i) => { metadata[`cap${i + 1}`] = c; });

    // Build human-readable color summary and store as metadata
    const colorSummary = buildColorSummary(colors);
    metadata.selected_colors = colorSummary;

    // Text displayed on the Stripe Checkout page near the pay button
    const checkoutMessage = `Selected Colors:\n${colorSummary}`;

    // Build Stripe Checkout Session via REST API
    // URLSearchParams + fetch works natively in the Workers runtime (no npm needed).
    const params = new URLSearchParams({
        'payment_method_types[0]':      'card',
        'line_items[0][price]':         PRICE_ID,
        'line_items[0][quantity]':      '1',
        'mode':                         'payment',
        'success_url':                  SUCCESS_URL,
        'cancel_url':                   CANCEL_URL,
        // Show the color summary on the Stripe hosted checkout page
        'custom_text[submit][message]': checkoutMessage,
    });

    // Append all metadata entries (cap1…cap5 + selected_colors)
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

