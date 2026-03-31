# Design System Strategy: The Living Ledger

## 1. Overview & Creative North Star
The design system for Vera is built upon the "Creative North Star" of **The Editorial Archivist**. 

We are moving away from the "SaaS dashboard" trope—flat, cold, and transactional—and toward a digital experience that feels like a high-end sustainability audit or a prestigious environmental journal. The aesthetic is one of **Calm Authority**. We achieve this through intentional asymmetry, extreme white space, and a typographic hierarchy that favors the elegance of a serif typeface. 

## 2. Colors
Our palette is a curated botanical study. We avoid synthetic colors (blues, purples) in favor of deep chlorophyll tones and organic neutrals.

*   **Primary Forest (#1A3D22):** Used for primary actions and authoritative headers. It is the "ink" of the system.
*   **Secondary Grove (#2E6B40) & Accent Fern (#5AAF72):** Used for success states and progress indicators (Fern), or secondary navigational elements (Grove).
*   **Surface Linen (#F7F3EC) & Light Mist (#EAF5ED):** The foundational canvases. 

### The "No-Line" Rule
Standard UI relies on 1px borders to separate content. In this system, **1px solid borders for sectioning are prohibited.** Boundaries must be defined through background color shifts.

## 3. Typography
*   **Display & Headlines (Instrument Serif):** These should be large, airy, and evocative. Use the *Italic* weight for key emphasis.
*   **Body & UI (DM Sans):** Used for all functional data.
    *   **Weight 300:** For large body copy and descriptions.
    *   **Weight 400:** For standard UI labels.
    *   **Weight 500:** For buttons and active states.

## 4. Components
*   **Buttons:** Pill-shaped (9999px radius). Primary: Forest, Text: White.
*   **Cards:** 14px radius. Use `surface-container-low` backgrounds. No divider lines.
*   **Progress Bars:** Fern (#5AAF72) fill.
*   **Input Fields:** Ghost-style inputs. Bottom-border only.

## 5. Do’s and Don’ts
**Do:**
*   Use **intentional asymmetry**.
*   Use **white space as a tool**.
*   Use **Instrument Serif Italics** for quote-style data insights.

**Don’t:**
*   **No Blue or Purple**.
*   **No Sharp Corners**.
*   **No Dark Mode**.
