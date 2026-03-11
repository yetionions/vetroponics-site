PROJECT MAP

This is a single-product ecommerce landing page.

MAIN FILES

index.html
Main webpage layout.

Contains sections:
- navigation bar (with theme toggle button)
- product hero
- product gallery
- why you need section
- product description / features
- what's included
- how it works
- about
- shipping
- FAQ
- final CTA section
- footer (with decorative leaf image overlay)
- promo popup (bottom-right corner, scroll-triggered)
- animation layer (decorative, non-interactive)


style.css
Controls site styling including:

- layout spacing
- dark theme CSS variables (default)
- light theme overrides via body.light-theme class
- colors and gradients
- typography
- buttons
- product cards
- gallery styling
- theme toggle button
- promo popup styling
- footer decorative leaf image layering
- responsive behavior


script.js
Handles front-end interactivity such as:

- product variant switching (dropdown updates hero title, price, description, gallery)
- gallery thumbnail behavior
- Buy Now button → opens Etsy listing in new tab
- mobile hamburger menu toggle
- header shadow on scroll
- theme toggle (dark/light) with localStorage persistence
- scroll-triggered promo popup with sessionStorage dismissal
- image zoom modal


IMAGES FOLDER

Contains product images used across the page.

Key images include:

trellis_product_image_with_vines.png  ← CURRENT hero/mainImage for all trellis variants
trellis_product_image1.jpg  ← no longer used as hero image
product_review1.jpg
product_logo_image.png

cap_product_image2.jpg
cap_product_image3.jpg
cap_product_image4.jpg
cap_product_image5.jpg
cap_product_image6.jpg
cap_product_image7.jpg

image11.jpg through image77.jpg (gallery thumbnails)


ROOT-LEVEL ASSETS

tiny_plant_icon.png  — used as price icon in hero and sticky bar
leaves_footer_image.png  — decorative footer bottom image


AI FOLDER

ai/project_map.md
ai/project_context.md
ai/design_rules.md
ai/components.md
ai/current_state.md
ai/product_data.md
ai/ai_rules.md
ai/assistant_instructions.md
ai/prompts.md


PRODUCTS

Trellis Single
Price: $29.99

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