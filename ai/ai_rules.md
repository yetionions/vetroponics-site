# AI DEVELOPMENT RULES — VetROponics Systems
Last updated: 2026-03-11

---

## MANDATORY FIRST STEP

Before making any changes, read all 7 AI context files:
```
ai/project_map.md
ai/project_context.md
ai/design_rules.md
ai/components.md
ai/current_state.md
ai/product_data.md
ai/ai_rules.md
```
These are the source of truth. Do not guess at project structure.

---

## CODE MODIFICATION RULES

- Do NOT rewrite entire files unless explicitly requested.
- Do NOT rebuild or restructure HTML sections.
- Do NOT remove existing sections from the page.
- Make the smallest possible change to accomplish the task.
- Prefer CSS changes over HTML structural changes when possible.
- Keep JavaScript minimal — no frameworks, no build tools.

---

## CRITICAL COMPONENTS — DO NOT BREAK

These are fully implemented and functional. Never remove or interfere with them:

| Component | Details |
|---|---|
| Theme toggle | `#theme-toggle`, `body.light-theme` CSS block |
| Promo popup | `#promo-popup`, sessionStorage dismissal, scroll trigger |
| Product selector | `#product-selector`, dynamic hero/gallery/included updates |
| Cap color selector | `#cap-color-selector`, 3-state panel logic |
| Custom qty picker | `#custom-color-picker`, `customQty` object, `CAP_TOTAL` |
| Buy Now button | `.add-to-cart` (hero), disabled state, async Stripe path |
| Stripe function | `functions/api/create-checkout-session.js`, do not change Price ID without intent |
| Footer leaf graphic | `footer::after` pseudo-element — do not alter z-index or positioning |
| CSS variable system | `:root` block in `style.css` |
| Mobile hamburger menu | `.hamburger`, `.nav-links.active` |
| Image zoom modal | `#imageModal`, `#modalImage` |
| Scroll event listener | Handles header shadow + promo trigger — do not replace |

---

## CSS RULES

- Use CSS variables from `:root` for all colors on general page elements.
- Do NOT hardcode colors on generic elements — exception: footer (intentional).
- Footer text colors are hardcoded by design — do not convert them to CSS variables.
- Light theme override block lives at the **END** of `style.css` — add light overrides there only.
- Do NOT add diagonal gradients to cards, sections, or containers.
- Vertical page gradient belongs **only** on `body` background.

---

## FILE STRUCTURE RULES

```
index.html          ← single HTML file, all sections inline
style.css           ← all styling
script.js           ← all frontend logic
tiny_plant_icon.png ← root-level asset
leaves_footer_image.png ← root-level asset
favicon.png         ← root-level asset
images/             ← all product and gallery images
functions/api/create-checkout-session.js  ← Cloudflare Pages Function
server.js           ← local dev only
package.json        ← local dev only
.env.example        ← env var documentation
ai/                 ← AI context files only
```

- Do not create new files unless explicitly required.
- Do not reorganize the folder structure.
- Never put `STRIPE_SECRET_KEY` in frontend code or commit `.env` to git.

---

## DEPLOYMENT RULES

- Site is deployed on **Cloudflare Pages** from a GitHub repo.
- Pushing to GitHub triggers an automatic Cloudflare Pages deployment.
- `STRIPE_SECRET_KEY` must be set via the Cloudflare Pages dashboard (Settings → Environment Variables).
- Do NOT add npm packages to the Cloudflare Function — it uses Workers-native `fetch`, no node_modules.
- `server.js` and `package.json` are local development utilities only.

---

## STRIPE RULES

- The Cloudflare Function is the only place that calls Stripe.
- Price ID: `price_1T9vwK09XmoK39lfYim6yGw5` — contains lowercase `l`, not capital `I` (common typo risk).
- Never expose `STRIPE_SECRET_KEY` in `index.html` or `script.js`.
- Custom caps checkout flow: frontend POSTs `{ colors: [...] }` → function validates → creates session → returns `{ url }` → frontend redirects.

---

## PRODUCT DATA RULES

- Always check `ai/product_data.md` before modifying product names, prices, or descriptions.
- `capLinks` in `script.js` is intentionally empty — do not add placeholder URLs.
- If adding per-color purchase links, fill in `capLinks` with real working Stripe or Etsy URLs.
- If product pricing changes, update BOTH `script.js` (`products` object) AND `ai/product_data.md`.

---

## DESIGN RULES (summary)

- Dark forest-green theme is default — maintain this aesthetic.
- All new UI elements must use CSS variables (not hardcoded colors).
- Match existing component styles — buttons, dropdowns, cards should look consistent.
- Light theme overrides go at the END of `style.css`.
- No diagonal gradients anywhere except body background.
- See `ai/design_rules.md` for full color reference.

Visual goals:

deep dark green backgrounds
lighter green cards and containers
bright light-green text
green accent glow effects
warm khaki footer with leaf overlay
rounded UI elements
premium product presentation

Changes should maintain this dark-green plant storefront aesthetic.
When in light mode (body.light-theme), the same green plant branding is kept but with lighter backgrounds.


PRODUCT SYSTEM RULES

The website sells physical accessories for the Gardyn Home hydroponic system.

Products currently include:

Trellis Kit – Single
Trellis Kit – 2 Pack
Gardyn Compatible Caps – 5 Pack

The product variant dropdown updates:

product title
product price
product description
product images (hero + gallery)
Buy Now button Etsy URL


PERFORMANCE RULES

Keep the website lightweight.

Avoid heavy frameworks.

Prefer:

HTML
CSS
Vanilla JavaScript

Do not introduce React, Vue, Angular, or large libraries unless explicitly requested.


CONTEXT MAINTENANCE

When significant changes occur, update the AI context files.

ai/project_map.md → update if page sections or file structure changes

ai/project_context.md → update if the project description changes

ai/design_rules.md → update if the visual style changes

ai/components.md → update if new UI components are created or changed

ai/current_state.md → append updates to the RECENT CHANGES section


SAFE EDITING PRACTICE

Before modifying code:

1. Identify the specific section that needs editing.
2. Modify only that section.
3. Avoid unrelated changes.
When significant changes occur, update the AI context files.

ai/project_map.md → update if page sections or file structure changes

ai/project_context.md → update if the project description changes

ai/design_rules.md → update if the visual style changes

ai/components.md → update if new UI components are created

ai/current_state.md → append updates to the RECENT CHANGES section


SAFE EDITING PRACTICE

Before modifying code:

1. Identify the specific section that needs editing.
2. Modify only that section.
3. Avoid unrelated changes.
4. Preserve formatting and structure.


GOAL OF THE PROJECT

Create a professional ecommerce landing page for selling hydroponic system accessories that can later be adapted to platforms like Shopify.


PRIORITY ORDER

1. Maintain site stability
2. Follow design rules
3. Keep code simple
4. Improve visual quality
5. Maintain compatibility with existing structure