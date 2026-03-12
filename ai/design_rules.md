# DESIGN RULES — VetROponics Systems
Last updated: 2026-03-11

---

## THEME

Default on first visit: **Light Mode** (`body.light-theme` applied unless `localStorage` key `"theme"` is `"dark"`).
Dark mode available via theme toggle button in the navbar.
Light mode available via `body.light-theme` class on `<body>`.

---

## COLORS — CSS VARIABLES (`:root`)

| Token | Value | Usage |
|---|---|---|
| `--bg-body` | `#111d16` → `#0b1710` gradient | Page background (vertical gradient on `body` only) |
| `--bg-section` | `#1a2e22` | Section backgrounds |
| `--bg-card` | `#253d2d` | Cards, containers |
| `--bg-nav` | `#0e1a12` | Navbar |
| `--accent-primary` | `#72b876` | Primary accent (buttons, highlights) |
| `--accent-glow` | `#9dd49c` | Glow effects |
| `--text-primary` | `#d4f0d8` | Main readable text |
| `--text-muted` | `#b4cfb8` | Secondary text |
| `--border` | `#2e4a35` | Subtle borders |
| `--shadow` | dark green tone | Box shadows |

## COLORS — Light Theme (`body.light-theme`)

| Token | Value |
|---|---|
| Background | `#f0f7ee` |
| Sections | `#e4f0e0` |
| Cards | `#ffffff` |
| Nav | `#ffffff` |
| Text primary | `#1a2e1e` |
| Text muted | `#3a5c42` |
| Accent | `#2e6b3a` |

## COLORS — Footer (hardcoded, intentionally NOT using CSS variables)

Footer is isolated from global theme changes by design — use hardcoded colors only.

| Element | Color |
|---|---|
| Footer background | `#e8e2d0` (warm khaki) |
| Footer headings | `#a8e6b0` |
| Footer body text / list items | `#c8e8cc` |
| Footer links | `#b0ddb8` (hover: `#7FD99C` + green glow) |
| Footer copyright | `#a8c8ae` |

Footer decorative leaf: `leaves_footer_image.png` via `footer::after` pseudo-element. `z-index: 1`, `pointer-events: none`. Footer content container is `z-index: 2`.

---

## TYPOGRAPHY

- Font: **Poppins** (Google Fonts) — weights 300, 400, 600, 700
- Icons: **Font Awesome 6**
- Hierarchy: h1 (product title) > h2 (section titles) > h3 (card titles) > p (body)

---

## LAYOUT

- Container max-width: ~1200px, centered with `margin: 0 auto`
- Sections use consistent vertical padding
- Cards and containers use `border-radius` (rounded corners)
- Soft `box-shadow` on cards

---

## GRADIENTS

**Rule:** vertical `linear-gradient(180deg, ...)` exists ONLY on `body` background.
Cards, sections, and containers must NOT have diagonal gradients.
If any card/section has a `::before` or `::after` gradient overlay: set `background: none`.

---

## ANIMATIONS

- Promo popup: `slide-up + fade-in` CSS animation via `.promo-popup--visible` class
- Interactive elements: green glow on focus/hover (`box-shadow` with accent color)
- No heavy animations on product content — keep performance clean

---

## UI CONSISTENCY REQUIREMENTS

- All interactive elements (buttons, dropdowns, inputs) use CSS variables — never hardcoded colors
- Buy Now button: `.add-to-cart` class; disabled state uses `opacity: 0.45`, `cursor: not-allowed`
- All dropdowns (`#product-selector`, `#cap-color-selector`) styled identically — same padding, border-radius, border, background, glow focus ring
- Color swatch images use `.color-circle` class (circular display)
- Custom qty cards use `.custom-qty-card` class with `.has-qty` highlight state
- Light theme overrides live at the **END** of `style.css` — do not insert overrides elsewhere
- Do NOT hardcode colors on general page elements — use CSS variables (footer is the only exception)