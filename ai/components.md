# COMPONENT MAP — VetROponics Systems
Last updated: 2026-03-11

---

## NAVBAR (`<header>`)
Fixed/sticky. Collapses to hamburger on mobile.

Contents:
- Logo image: `images/product_logo_image.png` (hanging effect, `bottom: -10px`)
- Nav anchor links: Home, Gallery, Why You Need, Features, Included, How It Works, About, Shipping, FAQ
- Theme toggle button: `id="theme-toggle"`, class `theme-toggle` — toggles `body.light-theme`
- Hamburger: class `.hamburger` (3 `<span>` bars) — toggles `.nav-links.active` on mobile

Scroll behavior: adds `.scrolled` class to `<header>` when `window.scrollY > 100`.

---

## PRODUCT HERO (`id="hero"`)
Primary conversion section. Critical — do not restructure.

### Hero Image
`.hero-image img` — Updates dynamically on product/color change.
- Trellis Single: `images/singleset_trellis_product_image.png`  
  *(Note: hero starts with `trellis_product_image_with_vines.png` on page load before a product is selected)*
- Trellis 2-Pack: `images/setof_two_trellis_product_image.png`
- Caps default: `images/cap_product_main_image.png`
- Caps with color selected: `images/cap_color_image_<color>.png`

### Price Display
`.price` — starts with `visibility: hidden` on page load (no price until selection).
`.price-text` span holds the value. Flanked by `tiny_plant_icon.png` leaf icons.
Becomes visible when a real product is selected; hides again if placeholder re-selected.

### Product Selector
`id="product-selector"` — `<select>` dropdown.
Options: disabled placeholder, Trellis Single, Trellis 2-Pack, Caps 5-Pack.
On change: updates hero title, price, description, hero image, gallery, "What's Included" list.
Shows/hides `#color-selector` based on `product.hasColorSelector`.

### Color Selector (`id="color-selector"`, hidden by default)
Only visible when Caps product is selected.

Contains `id="cap-color-selector"` `<select>`:  
Options: Select Color, Copper, Azure Blue, Scarlet Red, Leaf Green, Silver Ash, Custom.

**3-state UI logic (managed by JS):**

| Dropdown value | Visible panel |
|---|---|
| `""` (Select Color) | `#color-options-preview` — static 6-swatch grid |
| specific color (e.g. `copper`) | `#cap-preview-grid` — 5 identical cap previews rendered by JS |
| `custom` | `#custom-color-picker` — quantity picker |

#### Panel A: Static 6-swatch grid (`id="color-options-preview"`, class `color-options`)
6 `.color-option` divs, each with `.color-circle` image + `.color-label` text.
Non-clickable, visual display only. Colors: Copper, Azure Blue, Scarlet Red, Leaf Green, Silver Ash, Custom.

#### Panel B: 5-cap preview (`id="cap-preview-grid"`)
Populated dynamically by `renderPreviewCaps(color)`.
Shows 5 identical `.color-option` cards for the selected specific color.

#### Panel C: Custom color picker (`id="custom-color-picker"`)
Shown only when "Custom" selected.
- Heading: `<p class="custom-picker-heading">Pick 5 Colors</p>`
- Grid: class `custom-color-picker-grid`
  - 5 × `.custom-qty-card[data-color="<key>"]` — each with product image, color name, `[-] qty [+]` controls
  - Color keys: `copper`, `azure`, `scarlet`, `leaf`, `silver`
  - Qty spans: `id="qty-copper"` through `id="qty-silver"`
  - Buttons: `.qty-minus[data-color]`, `.qty-plus[data-color]`
- Counter: `id="custom-color-counter"` — shows "N / 5 selected"
- `.has-qty` class added to card when qty > 0
- `CAP_TOTAL = 5` constant enforces total limit

### Buy Now Button
Class `.add-to-cart` (first instance, not `.cta-shop-btn`).
- Trellis: `window.open(product.etsyUrl, '_blank')`
- Caps + specific color: `window.open(capLinks[color] || product.etsyUrl, '_blank')`
- Caps + custom: `async` — POSTs to `/api/create-checkout-session`, redirects to Stripe URL
- Disabled (`opacity: 0.45`, `cursor: not-allowed`) when Custom is active and total ≠ 5

---

## PRODUCT GALLERY (`id="gallery"`)
`.gallery-modern` container:
- Main image: `.main-image-modern > img#main-image` — clickable (opens zoom modal)
- Thumbnails: `.thumbnail-row` — horizontal scroll row of `<img>` tags, `.active` class on selected
- `loadGallery(images, altPrefix)` JS function replaces thumbnail row content on product change
- Default gallery (page load): mixed trellis + caps images

---

## IMAGE ZOOM MODAL (`id="imageModal"`)
- Click `#main-image` → opens modal, sets `#modalImage` src
- `.close` button or clicking outside modal → closes
- Class `.modal`

---

## STICKY BUY BAR (`id="stickyBuyBar"`, class `sticky-buy-bar`)
Fixed bottom bar. Starts `display:none`.
Contains `#stickyProductName` + `#stickyBuyBtn`.
*(Visibility logic may not be fully wired — check script.js if activating)*

---

## CONTENT SECTIONS

| Section id | Description |
|---|---|
| `#why-need` | Marketing copy about why the trellis is needed |
| `#features` | `<ul>` with Font Awesome icon bullets |
| `#included` | Dynamic `id="included-list"` `<ul>` — updated by JS on product change |
| `#how-works` | 3 `.step` cards with `.step-number` circles |
| `#about` | Company background, veteran-owned story |
| `#shipping` | Ships from Texas, 3–5 business day production |
| `#faq` | 4 `.faq-item` cards (Q&A about compatibility, returns, etc.) |
| `#final-cta` | Darker bg (`#0f2218`), headline + `.cta-shop-btn` Buy Now button |

---

## FOOTER
Three-column `.footer-content` grid:
- Column 1: brand name + tagline
- Column 2: Quick Links (Home, Gallery, Features, About)
- Column 3: Contact (email + "Contact via Etsy")
- `.footer-bottom`: copyright line

Leaf graphic: `footer::after` pseudo-element with `leaves_footer_image.png`. `z-index: 1`, `pointer-events: none`. Content at `z-index: 2`.
Footer uses **hardcoded colors** (not CSS variables) — intentional.

---

## PROMO POPUP (`id="promo-popup"`, class `promo-popup`)
Fixed, bottom-right. Appears at 35% scroll depth.
- `#promo-popup-close` (X button) dismisses it
- `sessionStorage` key `"promo_dismissed"` prevents re-showing in same session
- CSS class `.promo-popup--visible` triggers slide-up + fade-in animation
- Content: "Use code **AMERICA** for **10% off**" + "Thanks for supporting small creators."

---

## ANIMATION LAYER (`id="animation-layer"`)
Fixed full-screen overlay. `pointer-events: none`, `z-index: 0`.
Placeholder for future decorative animations.

---

## SCRIPT.JS DATA OBJECTS (quick reference)

```js
// Product variants
const products = { single, '2pack', caps }
// each has: name, price, description, mainImage, galleryImages, etsyUrl, hasColorSelector, includedItems

// Cap color images
const capColorImages = { copper, azure, scarlet, leaf, silver, custom }

// Cap color purchase links (all empty — falls back to Etsy)
const capLinks = { copper:'', azure:'', scarlet:'', leaf:'', silver:'', custom:'' }

// Human-readable color labels
const colorLabels = { copper:'Copper', azure:'Azure Blue', scarlet:'Scarlet Red', leaf:'Leaf Green', silver:'Silver Ash' }

// Custom picker state
const customQty = { copper:0, azure:0, scarlet:0, leaf:0, silver:0 }
const CAP_TOTAL = 5

// Key→Stripe metadata name mapping (used in Buy Now handler)
const colorKeyMap = { copper:'copper', azure:'azure_blue', scarlet:'scarlet_red', leaf:'leaf_green', silver:'silver_ash' }
```


FAQ SECTION
id="faq"
Common customer questions using .faq-item cards.


FINAL CTA SECTION
id="final-cta", class="final-cta"
Distinct darker background (#0f2218) for visual separation.
Contains headline, description, and Buy Now button.


FOOTER
Three-column grid (.footer-content) with:
- VetROponics Systems brand blurb
- Quick Links
- Contact info

Styling:
- background: khaki #e8e2d0 with leaves_footer_image.png overlaid via footer::after pseudo-element
- footer::after is pointer-events: none, z-index: 1
- footer .container has position: relative; z-index: 2 to stay above the leaf graphic
- Footer text uses hardcoded colors (NOT CSS variables) for isolation
- padding-bottom: 14rem to allow leaf graphic to show at bottom


THEME TOGGLE BUTTON
id="theme-toggle", class="theme-toggle"
Located in nav, right of nav-links, left of hamburger.
Toggles body.light-theme class.
Label: "☀ Light" (dark mode active) / "🌙 Dark" (light mode active)
Persists choice via localStorage key "theme".

