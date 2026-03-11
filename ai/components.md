COMPONENT MAP

This file lists the major UI components used in the website so the AI does not need to scan the full HTML structure repeatedly.


NAVBAR
Top navigation bar. Fixed/sticky, collapses to hamburger on mobile.

Contains:
- VetROponics logo (hanging effect, bottom: -10px)
- navigation anchor links
- theme toggle button (#theme-toggle, class: .theme-toggle)
- hamburger menu button (.hamburger)

Links include:
Home, Gallery, Why You Need, Features, Included, How It Works, About, Shipping, FAQ


PRODUCT HERO SECTION
Main product section at the top of the page. id="hero"

Contains:
- main product image (.hero-image)
  Current image: images/trellis_product_image_with_vines.png
  max-width: 720px (CSS)
  Updates dynamically when variant is selected (trellis variants use trellis_product_image_with_vines.png; caps use cap_product_image2.jpg)
- product title (h1, updates dynamically)
- product price (.price)
  Starts HIDDEN (visibility: hidden) on page load — no price shown until a product is selected
  Price text is in .price-text span; icons are tiny_plant_icon.png on each side
  Becomes visible when a real product option is selected; hides again if placeholder re-selected
- product description (p, updates dynamically)
- product option selector (#product-selector)
  - first option is a disabled placeholder: "Choose Product Option"
  - real options: Trellis Single, Trellis 2 Pack, Gardyn Compatible Caps 5 Pack
- Buy Now button (.add-to-cart) — opens Etsy listing in new tab

This is the most important conversion section of the page.


PRODUCT GALLERY
Image gallery. id="gallery"

Uses .gallery-modern container with:
- main image (.main-image-modern > img#main-image)
- horizontal scrollable thumbnail row (.thumbnail-row)
- clicking thumbnail updates main image and sets .active class
- clicking main image opens zoom modal

Gallery images update when product variant is changed via dropdown.


IMAGE ZOOM MODAL
Overlay modal for enlarged image view. id="imageModal"

Contains:
- enlarged image (#modalImage)
- close button (.close)
- clicking outside modal also closes it


PRODUCT VARIANT SYSTEM (IMPLEMENTED)

Products:
  Trellis – Single  ($29.99)  etsyUrl: trellis listing
  Trellis – 2 Pack  ($49.99)  etsyUrl: 2-pack listing
  Gardyn Compatible Caps – 5 Pack  ($18.49)  etsyUrl: caps listing

Dropdown change event updates:
- hero title
- hero price
- hero description
- hero product image
- gallery main image
- gallery thumbnails


FEATURES SECTION
id="features"
Explains the main benefits of the product.


WHAT'S INCLUDED SECTION
id="included"
List of components included in the product.


HOW IT WORKS SECTION
id="how-works"
Step-by-step cards (.step) with numbered circles (.step-number).


ABOUT SECTION
id="about"
Information about VetROponics Systems — veteran-owned small business.


SHIPPING SECTION
id="shipping"
Logistics and fulfillment information.


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


PROMO POPUP
id="promo-popup", class="promo-popup"
Fixed position, bottom-right corner of screen.
Shows after user scrolls 35% down the page.
Closes via #promo-popup-close button (X).
Dismissal stored in sessionStorage key "promo_dismissed" — does not reappear after close or page refresh within same session.
Content: discount code AMERICA for 10% off + "Thanks for supporting small creators."
Animation: fade-in + slide-up via CSS transition on .promo-popup--visible class.
Mobile: stretches to full width minus margins on screens ≤ 480px.


ANIMATION LAYER
id="animation-layer"
Fixed full-screen overlay, pointer-events: none, z-index: 0.
Reserved for future decorative animations (floating leaves etc.).
- high quality
- customer focused


SHIPPING SECTION
Information about shipping.

Key details:
- ships from Texas
- 3–5 business days
- packed carefully


FAQ SECTION
Common customer questions.

Example questions:
- Is this compatible with Gardyn 2.0 or 3.0?
- How easy is installation?
- What material is it made from?
- Do you offer a return policy?


FOOTER
Bottom section of the site.

Contains:
- business name
- copyright
- navigation links


DESIGN SYSTEM NOTES

The site is transitioning to a darker plant-themed ecommerce style.

Design characteristics:

- dark warm backgrounds
- plant green accent colors
- soft shadows
- subtle gradients
- rounded cards
- modern ecommerce product presentation
- premium feel


IMPORTANT RULES

Do not rebuild the page layout.

Only improve styling or functionality inside the existing structure.

All changes should stay compatible with the current HTML, CSS, and JavaScript files.