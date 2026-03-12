# PRODUCT DATA — VetROponics Systems
Last updated: 2026-03-11

---

## BRAND

**Name:** VetROponics Systems  
**Type:** Veteran-owned small business (founded by a Gulf War disabled veteran)  
**Made in:** USA (3D printed)  
**Tagline:** Veteran-owned hydroponic accessories  
**Disclaimer:** Not affiliated with or endorsed by Gardyn Inc. Independent accessory designed to fit the Gardyn Home system.

---

## PRODUCTS

### VARIANT 1 — Trellis Kit – Single
**Price:** $29.99  
**`products` key:** `single`  
**Hero image:** `images/singleset_trellis_product_image.png`  
**Gallery:** `image11.jpg` – `image77.jpg`  
**Stripe URL:** `https://buy.stripe.com/eVq3cngNe5cz4isbftcIE06`  
**Etsy URL:** `https://www.etsy.com/listing/4397538500/...` (trellis single listing)  
**hasColorSelector:** `false`

**Description:** Single decorative trellis panel designed for the Gardyn Home hydroponic system.

**Included:**
- 12 trellis panels
- Top clips ×1
- Panel clips ×1
- Bottom brackets ×1
- Hook and loop mounting sections

**Compatible with:** Gardyn Home only  
**NOT compatible with:** Gardyn 2.0, Gardyn 3.0

---

### VARIANT 2 — Trellis Kit – 2 Pack
**Price:** $49.99  
**`products` key:** `2pack`  
**Hero image:** `images/setof_two_trellis_product_image.png`  
**Gallery:** `image11.jpg` – `image77.jpg`  
**Stripe URL:** `https://buy.stripe.com/cNi7sD2WofRdg1a97lcIE07`  
**Etsy URL:** trellis 2-pack listing  
**hasColorSelector:** `false`

**Description:** Two trellis panels for supporting larger plants.

**Included:**
- 24 trellis panels
- Top clips ×2
- Panel clips ×2
- Bottom brackets ×2
- Hook and loop mounting sections

**Compatible with:** Gardyn Home only  
**NOT compatible with:** Gardyn 2.0, Gardyn 3.0

---

### VARIANT 3 — Gardyn Compatible Caps – 5 Pack
**Price:** $18.49  
**`products` key:** `caps`  
**Hero image (default):** `images/cap_product_main_image.png`  
**Hero image (color selected):** `images/cap_color_image_<color>.png`  
**Gallery:** `cap_product_image2.jpg` – `cap_product_image7.jpg`  
**Etsy URL:** `https://www.etsy.com/listing/4419864362/...` (caps listing — used as fallback)  
**hasColorSelector:** `true`

**Description:** Decorative 3D printed Gardyn compatible caps with epoxy leaf design.

**Included:** 5 decorative Gardyn compatible caps (customer's choice of color/mix)

**Compatible with:** Gardyn Home only  
**NOT compatible with:** Gardyn 2.0, Gardyn 3.0

#### Available Cap Colors

| Key (script.js) | Display Name | Stripe metadata key | Image |
|---|---|---|---|
| `copper` | Copper | `copper` | `cap_color_image_copper.png` |
| `azure` | Azure Blue | `azure_blue` | `cap_color_image_azure_blue.png` |
| `scarlet` | Scarlet Red | `scarlet_red` | `cap_color_image_scarlet_red.png` |
| `leaf` | Leaf Green | `leaf_green` | `cap_color_image_light_green.png` |
| `silver` | Silver Ash | `silver_ash` | `cap_color_image_silver_ash.png` |
| `custom` | Custom (mix) | — | `cap_color_image_custom.png` |

#### Checkout method per color selection
- **Specific color (non-custom):** `window.open(capLinks[color] || product.etsyUrl, '_blank')`  
  `capLinks` object in `script.js` has all values empty → falls back to main caps Etsy listing  
  *Fill in `capLinks` when per-color Stripe or Etsy listings are ready.*
- **Custom mix:** POST `/api/create-checkout-session` → Stripe Checkout  
  Stripe Price ID: `price_1T9vwK09XmoK39lfYim6yGw5` (note lowercase `l`)

---

## PRODUCT FEATURES (all products)
- Food-safe 3D printed material
- Lightweight and durable
- Reusable design
- Simple installation (no tools required)
- Designed and printed in the USA
- Veteran-owned small business

---

## SHIPPING
- Ships from: Texas, USA
- Production time: 3–5 business days (made to order)
- Packaging: carefully packed to prevent damage

---

## AI USAGE RULES
1. Always reference this file for product names, prices, and descriptions.
2. Do not invent product details or compatibility claims.
3. If pricing or descriptions change, update this file AND the `products` object in `script.js`.
4. `capLinks` is intentionally empty — do not add placeholder URLs; only add real working URLs.



VARIANT 2

Name
Trellis Kit – 2 Pack

Price
$49.99

Description
Two full vertical trellis kits for the Gardyn Home system.

Perfect for supporting multiple climbing plants or expanding coverage across the tower.


Images

trellis_product_image1.jpg
product_review1.jpg


Included Parts

24 trellis panels  
top clips  
panel clips  
bottom brackets  
hook and loop bracket mounts


Compatible With

Gardyn Home


Not Compatible With

Gardyn 2.0  
Gardyn 3.0



VARIANT 3

Name
Gardyn Compatible Caps – 5 Pack

Price
$18.49

Description
Protective caps designed to fit the Gardyn Home system.

Helps keep unused plant ports clean while maintaining a finished look.


Images

cap_product_image2.jpg
cap_product_image3.jpg
cap_product_image4.jpg
cap_product_image5.jpg
cap_product_image6.jpg
cap_product_image7.jpg


Compatible With

Gardyn Home


Not Compatible With

Gardyn 2.0  
Gardyn 3.0



PRODUCT FEATURES

Food-safe 3D printed material  
Lightweight and durable  
Reusable design  
Simple installation  
Designed and printed in the USA  
Veteran-owned small business



SHIPPING INFORMATION

Ships from Texas, USA

Production Time
3–5 business days

Packaging
Items are packed carefully to prevent warping or damage during shipping.



BUSINESS INFORMATION

Business Name
VetROponics Systems

Business Type
Veteran-owned small business

Products are custom designed and 3D printed.


DISCLAIMER

This product is not affiliated with or endorsed by Gardyn Inc.

It is an independently designed accessory made to fit the Gardyn Home system.



AI USAGE RULES

When product information is needed for the website:

1. Always reference this file first.
2. Do not invent product details.
3. Ensure website product displays match this data.
4. Update this file if product options, pricing, or descriptions change.


FUTURE PRODUCTS GO BELOW THIS LINE