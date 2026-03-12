# PROJECT CONTEXT — VetROponics Systems
Last updated: 2026-03-11

---

## OVERVIEW

Single-product ecommerce landing page for **VetROponics Systems** — a veteran-owned small business selling handmade 3D-printed hydroponic accessories.

**Stack:** HTML + CSS + Vanilla JavaScript (no frameworks)
**Deployed:** Cloudflare Pages (`https://vetroponics-site.pages.dev/`)
**Source:** GitHub repository (auto-deploys to Cloudflare on push)
**Payment:** Stripe (Checkout Sessions via Cloudflare Pages Function)

---

## PRODUCTS SOLD

| Product | Price | Checkout Method |
|---|---|---|
| Trellis Kit – Single | $29.99 | Etsy listing (new tab) |
| Trellis Kit – 2 Pack | $49.99 | Etsy listing (new tab) |
| Gardyn Compatible Caps – 5 Pack | $18.49 | Etsy (standard colors) / Stripe Checkout (custom mix) |

---

## ARCHITECTURE

### Frontend (`index.html`, `style.css`, `script.js`)
- Single-page layout. All sections embedded in `index.html`.
- `script.js` handles all interactivity — no framework, no build step.
- `style.css` uses CSS custom properties for theming.

### Backend (`functions/api/create-checkout-session.js`)
- Cloudflare Pages Function — ESM format (`export async function onRequestPost`).
- Handles `POST /api/create-checkout-session` from the frontend.
- Uses Workers-native `fetch` to call Stripe REST API directly (no npm, no node_modules).
- Reads `STRIPE_SECRET_KEY` from `context.env` (set in Cloudflare Pages dashboard).
- Returns `{ url }` (Stripe Checkout URL) for frontend redirect.

### Local Development Only
- `server.js` — Node.js/Express dev server (serves static files + proxies checkout endpoint)
- `package.json` — declares express, stripe, dotenv deps
- `.env.example` — documents required env vars (`STRIPE_SECRET_KEY`, etc.)
- These files are **not used** by Cloudflare Pages in production.

---

## CHECKOUT FLOW

### Trellis (Single / 2-Pack)
```
User selects product → clicks Buy Now → window.open(product.etsyUrl, '_blank')
```

### Caps — Standard Color (not Custom)
```
User selects Caps → selects a color → clicks Buy Now
→ window.open(capLinks[color] || product.etsyUrl, '_blank')
(capLinks values currently empty — falls back to Etsy)
```

### Caps — Custom Mix
```
User selects Caps → selects "Custom" → custom quantity picker appears
→ User picks exactly 5 caps across colors (Copper, Azure Blue, Scarlet Red, Leaf Green, Silver Ash)
→ Buy Now enabled when total = 5
→ POST /api/create-checkout-session { colors: ["copper","azure_blue",...] }
→ Cloudflare Function validates → creates Stripe Checkout Session
→ Returns { url } → window.location.href = url (redirect to Stripe hosted checkout)
→ After payment: Stripe redirects to https://vetroponics-site.pages.dev/
```

### Stripe Configuration
- Custom Mix Price ID: `price_1TA1iK0Bp5FXtpozxKMw6UaL`
- Mode: `payment` (one-time)
- Metadata: `cap_copper`, `cap_azure_blue`, `cap_scarlet_red`, `cap_leaf_green`, `cap_silver_ash`, `cap_selection_summary`
- Body format: `{ copper, azure_blue, scarlet_red, leaf_green, silver_ash }` (integer quantities)
- Success/cancel URL: `https://vetroponics-site.pages.dev/`

---

## THEME SYSTEM

- Default: **dark forest-green** (CSS variables in `:root`)
- Light: `body.light-theme` class triggered by `#theme-toggle` button
- Persisted in `localStorage` key `"theme"`
- Light theme overrides live at the **END** of `style.css`

---

## PROMO POPUP

- Appears after 35% scroll depth
- Content: "Use code AMERICA for 10% off"
- Dismissal stored in `sessionStorage` key `"promo_dismissed"` (does not re-show in same session)

---

## IMPORTANT CONSTRAINTS

- This is NOT a Shopify site — it is a standalone static site on Cloudflare Pages.
- Do not add frameworks, build steps, or package managers to the frontend.
- Do not move `STRIPE_SECRET_KEY` to the browser — it lives only in the Cloudflare Function.
- The `capLinks` object in `script.js` has all empty values — non-custom cap colors fall back to Etsy.