/**
 * Cloudflare Pages Function
 * POST /api/create-checkout-session
 *
 * Body: { items: [{ price: "price_xxx", quantity: 1 }, ...] }
 *
 * Creates a multi-line-item Stripe Checkout Session from the shopping cart.
 * Returns: { url } — the Stripe-hosted Checkout URL for the frontend to redirect to.
 *
 * Environment variables required (set in Cloudflare Pages dashboard):
 *   STRIPE_SECRET_KEY  — your Stripe secret key (sk_live_… or sk_test_…)
 */

const SUCCESS_URL = 'https://vetroponics-site.pages.dev/';
const CANCEL_URL  = 'https://vetroponics-site.pages.dev/';

const VALID_PRICE_IDS = new Set([
    'price_1T9yT90Bp5FXtpozeljRJdWN', // Trellis – Single
    'price_1T9yVq0Bp5FXtpozjdg7vdR6', // Trellis – 2 Pack
    'price_1T9xM20Bp5FXtpoznMsIF2sQ', // Caps – Copper
    'price_1T9xM10Bp5FXtpozg01vPEe9', // Caps – Azure Blue
    'price_1T9xLy0Bp5FXtpozYZE8cznT', // Caps – Scarlet Red
    'price_1T9xM20Bp5FXtpoz2M5yqtkH', // Caps – Leaf Green
    'price_1T9xLy0Bp5FXtpozvI7Teh0L', // Caps – Silver Ash
    'price_1T9xLy0Bp5FXtpozZAHxtJa2', // Caps – Custom Mix
]);

const MAX_CART_ITEMS = 20;
const MAX_QTY        = 10;

export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch {
        return jsonError('Invalid JSON body.', 400);
    }

    const { items } = body;

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
        return jsonError('Cart is empty or invalid.', 400);
    }
    if (items.length > MAX_CART_ITEMS) {
        return jsonError(`Cart cannot exceed ${MAX_CART_ITEMS} line items.`, 400);
    }

    for (const item of items) {
        if (!item.price || !VALID_PRICE_IDS.has(item.price)) {
            return jsonError(`Invalid price ID: "${item.price}".`, 400);
        }
        const qty = Number(item.quantity);
        if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) {
            return jsonError(`Invalid quantity for "${item.price}". Must be 1–${MAX_QTY}.`, 400);
        }
    }

    // Build Stripe Checkout Session params
    const params = new URLSearchParams({
        mode:        'payment',
        success_url:  SUCCESS_URL,
        cancel_url:   CANCEL_URL,
    });

    items.forEach((item, i) => {
        params.append(`line_items[${i}][price]`,    item.price);
        params.append(`line_items[${i}][quantity]`, String(item.quantity));
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


