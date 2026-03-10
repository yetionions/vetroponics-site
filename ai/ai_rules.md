AI DEVELOPMENT RULES

These rules define how the AI should interact with this project.

The goal is to maintain a stable, clean ecommerce landing page without unnecessary rewrites or structural changes.


GENERAL BEHAVIOR

Always read the AI context files before making changes.

ai/project_map.md  
ai/project_context.md  
ai/design_rules.md  
ai/components.md  
ai/current_state.md  

These files contain the summarized project structure and must be used as the primary reference before editing code.


CODE MODIFICATION RULES

Do NOT rewrite entire files unless explicitly requested.

Do NOT rebuild the site layout.

Do NOT remove existing sections unless instructed.

Only modify the smallest amount of code necessary to accomplish the requested change.

Prefer updating CSS styling rather than altering HTML structure whenever possible.

Keep JavaScript simple and minimal.


FILE STRUCTURE RULES

Current project files:

index.html
style.css
script.js
images/
ai/

Do not create unnecessary files.

Do not reorganize the project structure unless specifically instructed.


DESIGN RULES

The design direction is a modern plant-themed ecommerce style.

Visual goals:

dark warm backgrounds  
plant-green accent colors  
soft shadows  
subtle gradients  
rounded UI elements  
premium product presentation  

Changes should maintain a clean professional storefront aesthetic.


PRODUCT SYSTEM RULES

The website sells physical accessories for the Gardyn Home hydroponic system.

Products currently include:

Trellis Kit – Single  
Trellis Kit – 2 Pack  
Gardyn Compatible Caps – 5 Pack  

The product variant system should update:

product images  
price  
product description  


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