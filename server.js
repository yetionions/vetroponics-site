require('dotenv').config();

const express = require('express');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Serve all static website files (index.html, style.css, script.js, images/, etc.)
app.use(express.static(path.join(__dirname)));

// ---------------------------------------------------------------------------
// POST /api/create-checkout-session
//
// Body: { colors: ['copper', 'azure', 'leaf', 'leaf', 'scarlet'] }
//
// Creates a Stripe Checkout Session for the Custom Caps 5-Pack.
// Attaches selected colors as metadata (color1…color5) on the session.
// Returns: { url } — the hosted Stripe Checkout URL to redirect the customer.
// ---------------------------------------------------------------------------

const VALID_COLORS = ['copper', 'azure', 'scarlet', 'leaf', 'silver'];

app.post('/api/create-checkout-session', async (req, res) => {
    const { colors } = req.body;

    // Validate: must be exactly 5 colors
    if (!Array.isArray(colors) || colors.length !== 5) {
        return res.status(400).json({ error: 'Exactly 5 colors are required.' });
    }

    // Validate: each color must be one of the allowed options
    for (const c of colors) {
        if (!VALID_COLORS.includes(c)) {
            return res.status(400).json({ error: `Invalid color value: "${c}".` });
        }
    }

    // Build metadata: color1=copper, color2=azure, etc.
    const metadata = {};
    colors.forEach((c, i) => {
        metadata[`color${i + 1}`] = c;
    });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price:    process.env.STRIPE_PRICE_ID_CUSTOM,
                    quantity: 1
                }
            ],
            mode: 'payment',
            metadata,
            success_url: `${process.env.SITE_URL || `http://localhost:${PORT}`}/success.html`,
            cancel_url:  `${process.env.SITE_URL || `http://localhost:${PORT}`}/#hero`
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error('Stripe error:', err.message);
        res.status(500).json({ error: 'Could not create checkout session.' });
    }
});

app.listen(PORT, () => {
    console.log(`VetROponics server running → http://localhost:${PORT}`);
});
