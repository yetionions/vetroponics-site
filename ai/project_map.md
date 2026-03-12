# PROJECT MAP — VetROponics Systems
Last updated: 2026-03-11

---

## DIRECTORY STRUCTURE

```
mywebsite/
├── index.html                      ← Single-page website entry point
├── style.css                       ← All styling (dark + light theme)
├── script.js                       ← All frontend interactivity
├── package.json                    ← Node.js deps (express, stripe, dotenv) — for local dev only
├── server.js                       ← Express dev server (local only, NOT used on Cloudflare)
├── .env.example                    ← Env var template (STRIPE_SECRET_KEY etc.)
├── tiny_plant_icon.png             ← Leaf icon used in price display
├── leaves_footer_image.png         ← Decorative footer overlay image
├── favicon.png                     ← Site favicon
├── functions/
│   └── api/
│       └── create-checkout-session.js  ← Cloudflare Pages Function (Stripe Checkout)
├── images/
│   ├── product_logo_image.png          ← NavBar logo
│   ├── trellis_product_image_with_vines.png  ← Hero image: Trellis Single
│   ├── singleset_trellis_product_image.png   ← Main image: Trellis Single
│   ├── setof_two_trellis_product_image.png   ← Main image: Trellis 2-Pack
│   ├── cap_product_main_image.png            ← Main image: Caps (default multicolor)
│   ├── cap_color_image_copper.png            ← Cap color swatch: Copper
│   ├── cap_color_image_azure_blue.png        ← Cap color swatch: Azure Blue
│   ├── cap_color_image_scarlet_red.png       ← Cap color swatch: Scarlet Red
│   ├── cap_color_image_light_green.png       ← Cap color swatch: Leaf Green
│   ├── cap_color_image_silver_ash.png        ← Cap color swatch: Silver Ash
│   ├── cap_color_image_custom.png            ← Cap color swatch: Custom (multicolor)
│   ├── cap_product_image2.jpg–7.jpg          ← Gallery thumbnails for Caps
│   ├── image11.jpg–image77.jpg               ← Gallery thumbnails for Trellis
│   ├── trellis_product_image1.jpg            ← Unused legacy image
│   └── product_review1.jpg                  ← Unused legacy image
└── ai/
    ├── project_map.md
    ├── project_context.md
    ├── design_rules.md
    ├── components.md
    ├── current_state.md
    ├── product_data.md
    ├── ai_rules.md
    ├── assistant_instructions.md
    └── prompts.md
```

---

## KEY FILES

### index.html — Entry Point
Single HTML file. All page sections are inline. Loads style.css and script.js.

Page sections (in order):
1. `<header>` — sticky nav with logo, links, theme toggle, hamburger
2. `#hero` — product image, title, price, description, product selector, color selector, Buy Now
3. `#gallery` — main image + horizontal thumbnail row + zoom modal
4. `#why-need` — marketing copy
5. `#features` — feature bullet list
6. `#included` — dynamic "What's Included" list (updated by JS on product change)
7. `#how-works` — 3-step cards
8. `#about` — company info
9. `#shipping` — shipping details
10. `#faq` — 4 FAQ items
11. `#final-cta` — CTA section with shop button
12. `<footer>` — links, contact, copyright
13. `#animation-layer` — decorative, non-interactive
14. `#promo-popup` — scroll-triggered discount popup

### style.css — All Styling
- CSS variables in `:root` (dark theme defaults)
- `body.light-theme` overrides at the END of the file
- No diagonal gradients on cards/sections

### script.js — All Frontend Logic
- Product variant switching
- Cap color dropdown + 3-state UI logic
- Custom color quantity picker
- Stripe Checkout API call (async Buy Now)
- Promo popup + sessionStorage
- Theme toggle + localStorage
- Gallery, modal, scrolling

### functions/api/create-checkout-session.js — Cloudflare Pages Function
- Route: `POST /api/create-checkout-session`
- Creates Stripe Checkout Session for the "Custom" caps option
- Reads `STRIPE_SECRET_KEY` from `env` (Cloudflare Pages dashboard env var)
- Uses Workers-native `fetch` — no npm, no node_modules

---

## DEPLOYMENT

- Deployed on **Cloudflare Pages**
- Live URL: `https://vetroponics-site.pages.dev/`
- Source pushed to **GitHub**, auto-deployed by Cloudflare on push
- `STRIPE_SECRET_KEY` set as **environment variable** in Cloudflare Pages dashboard
- `package.json` / `server.js` are for local development only — ignored by Cloudflare

Trellis 2 Pack
Price: $49.99
Uses same images as single trellis.

Gardyn Compatible Caps 5 Pack
Price: $18.49
Uses cap_product_image images.


DESIGN GOALS

The site currently uses a dark forest-green plant-themed aesthetic.

Theme direction:

- deep dark green backgrounds
- lighter green cards and containers
- soft green text for readability on dark backgrounds
- green accent colors
- plant-themed glow effects
- rounded cards
- premium UI
- light theme available via toggle


IMPORTANT RULES

Do not rebuild the site structure.

Only modify existing files when improving styling or functionality.

Maintain compatibility with the current HTML structure.

Do not break the theme toggle, promo popup, or product variant system.