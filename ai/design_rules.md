Brand color: deep forest green
Accent color: light green glow
Style: premium dark plant-themed ecommerce
Focus: product conversion


DESIGN RULES

Theme style:
dark plant-themed modern product landing page (default)
light theme available via body.light-theme toggle

Color direction (dark theme — default):

background: deep dark forest green (#111d16 → #0b1710 gradient)
sections: slightly lighter dark green (#1a2e22)
cards/containers: medium dark green (#253d2d)
nav: darkest green tone (#0e1a12)
accent: bright green (#72b876), glow green (#9dd49c)
text: light mint green (#d4f0d8), muted green (#b4cfb8)
border: subtle dark green (#2e4a35)

Color direction (light theme — body.light-theme):

background: soft sage (#f0f7ee)
sections: pale green (#e4f0e0)
cards: white (#ffffff)
nav: white
text: near-black dark green (#1a2e1e), muted green (#3a5c42)
accent: deep forest green (#2e6b3a)

Footer:
Background is warm khaki (#e8e2d0) with leaves_footer_image.png overlaid via ::after pseudo-element.
Footer text uses explicit hardcoded colors (not CSS variables) so it is independent from global theme changes.
Footer headings: #a8e6b0
Footer body text / list items: #c8e8cc
Footer links: #b0ddb8 (hover: #7FD99C with green glow)
Footer copyright: #a8c8ae

UI rules:

high contrast and excellent readability
minimal, elegant, product-focused
rounded corners
soft shadows
premium feel
strong typography hierarchy
plant-themed glow effects on interactive elements

CSS variable system:

All theme colors are defined as CSS custom properties in :root.
Light theme overrides are applied via body.light-theme selector block at the end of style.css.
Do not hardcode colors on general page elements — use CSS variables.
Footer colors ARE hardcoded as an intentional exception to isolate them from global theme changes.

Gradient rule:

The vertical page gradient exists only on the body background.
Cards, sections, and containers must NOT contain diagonal gradients.
Gradient overlays (::before, ::after) on cards and sections should be set to background: none.