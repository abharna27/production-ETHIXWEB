# Design Notes: Reference Analysis (`https://metic.studio/en`)

Extracted via direct DOM inspection, computed style analysis, and stylesheet bundle inspection of `https://metic.studio/en`.

---

## 1. Color Palette & Theming

The aesthetic is an editorial "paper and ink" construct with a singular vibrant signal accent, avoiding noisy multi-color gradients in favor of high-contrast textural typography and precise architectural lines.

### Light Mode (Default)
- **`--paper` (Primary Background)**: `#f4f4f2` — warm raw stone / newsprint tone
- **`--paper-2` (Secondary Surface)**: `#e9e9e6` — subtle elevated container surface, card backs, and input fills
- **`--ink` (Primary Typography & Solids)**: `#121214` — deep obsidian ink for primary headlines, solid CTA fills, and active strokes
- **`--ink-2` (Secondary Typography)**: `#4a4a50` — muted editorial body copy and explanatory paragraphs
- **`--steel` (Technical Annotations)**: `#62626a` — coordinates, timestamps, tickers, tags, and measurement labels
- **`--line` (Hairline Dividers & Grids)**: `rgba(18, 18, 20, 0.12)` (`#1212141f`) — 1px architectural boundary lines
- **`--accent` (Signature Action Accent)**: `#ff3e3e` — high-visibility vermilion red used for active dots, focus outlines, button badges, and hover crosshairs
- **`--accent-deep` (Deeper Accent)**: `#c62828` — used for active links and hover emphasis
- **Selection**: `background: #ff3e3e; color: #ffffff;`

### Dark Mode (`[data-theme="dark"]`)
- **`--paper`**: `#0f0f11` — deep obsidian canvas
- **`--paper-2`**: `#18181b` — elevated dark surface
- **`--ink`**: `#f1f1ee` — warm stark white type
- **`--ink-2`**: `#b6b6b1` — muted gray type
- **`--steel`**: `#87878f` — cool slate annotations
- **`--line`**: `rgba(241, 241, 238, 0.14)` (`#f1f1ee24`)
- **`--accent`**: `#ff4a4a`
- **`--accent-deep`**: `#ff7b7b`

---

## 2. Typography System

All typefaces are freely accessible via Google Fonts:

1. **Display Face (`--font-display`)**: `Bricolage Grotesque, system-ui, sans-serif`
   - Variable font featuring optical sizing (`opsz` 12–96), tight tracking (`-0.03em` to `-0.045em`), and assertive modernist geometric curves.
2. **Body Face (`--font-sans`)**: `Space Grotesk, system-ui, sans-serif`
   - Monospace-influenced proportional sans-serif for UI, buttons, and navigation.
3. **Mono / Measure Face (`--font-mono`)**: `IBM Plex Mono, ui-monospace, monospace`
   - Tabular figures (`font-variant-numeric: tabular-nums`) for live timestamps, coordinates, steps `01 / 08`, metric counters, and status badges.
4. **Handwritten Annotation Face (`--font-hand`)**: `Caveat, cursive`
   - Applied for playful yet precise editorial side-notes, arrows, and secret margin callouts (e.g. *"30 characters. No more."*, *"Pick me up"*).

### Type Scale Hierarchy
- **`.display-1`**: `clamp(2.75rem, 7.2vw, 6.75rem)` | `font-weight: 500` | `line-height: 0.96` | `letter-spacing: -0.035em`
- **`.display-2`**: `clamp(2.125rem, 4.6vw, 4rem)` | `font-weight: 500` | `line-height: 1.02` | `letter-spacing: -0.03em`
- **`.display-3`**: `clamp(1.5rem, 2.4vw, 2.125rem)` | `font-weight: 500` | `line-height: 1.12` | `letter-spacing: -0.02em`
- **`.display-4`**: `clamp(1.25rem, 1.6vw, 1.5rem)` | `font-weight: 500` | `line-height: 1.2` | `letter-spacing: -0.015em`
- **`.lead`**: `clamp(1.125rem, 1.05rem + 0.5vw, 1.375rem)` | `line-height: 1.5` | `color: var(--ink-2)` | max measure `~30ch`
- **`.measure` / `.label`**: `0.75rem` (12px) | `letter-spacing: 0.02em - 0.06em` | uppercase / tabular-nums

---

## 3. Layout & Spacing Rhythm

- **Shell Padding (`--shell`)**: `clamp(1.25rem, 5vw, 5rem)` responsive gutter.
- **Max Container Frame (`.frame`)**: `1440px` centered (`margin-inline: auto`).
- **Section Spacing**: `py-24 md:py-40` (`6rem` to `10rem` vertical rhythm) creates expansive, museum-grade negative space.
- **Header Height (`--nav-h`)**: `4.5rem` (desktop), `4rem` (mobile).
- **Border Radius**:
  - Media panels & browser frames: `12px` (`--radius-media`)
  - Form fields: `8px` (`--radius-field`)
  - Floating pills & buttons: `999px` (fully rounded pill capsules)
- **Dividers & Rules**: Single `1px solid var(--line)` without decorative shadows or fuzzy gradients.

---

## 4. Components Breakdown

### Floating Pill Navigation (`.nav-pill`)
- Sits pinned at `top: 0`, spanning across the shell.
- **Left Capsule**: Wordmark logo (`Ethixweb` with vermilion period `.`) + live sound / pulse indicator.
- **Center Capsule (Desktop)**: Section title / step monitor + progress indicator (`--accent` progress bar).
- **Right Capsule**: Theme toggle + interactive mode toggle + "Start a project" button + menu trigger.
- **Scroll Behavior**: Transparent at top; morphs seamlessly on scroll into frosted glass with `backdrop-filter: blur(16px)`, `background: rgba(var(--paper), 0.85)`, and a delicate `1px solid var(--line)`.

### Buttons (`.btn`)
- **Dimensions**: `height: 3.25rem` (52px), `padding: 0 0.5rem 0 1.5rem`, `border-radius: 999px`.
- **Arrow Dot (`.btn-dot`)**: Distinctive circular disc (`2.25rem` / 36px) nested at the right edge.
  - Contains an `ArrowUpRight` icon.
  - On hover, the dot slides `translate(2px, -2px)` while the arrow rotates 45° to point directly forward.
- **Primary Button (`.btn-primary`)**: Solid `var(--ink)` background with white text, red `--accent` dot with white arrow. Hover triggers a subtle radial cursor-following glow (`.btn-glow`).
- **Secondary Button (`.btn-secondary`)**: `1px solid var(--line)` border, `var(--ink)` text, `var(--paper-2)` dot.

### Interactive "Build" Stage (Signature Hero Sequence)
- 8-phase interactive blueprint sequence:
  1. `01 / 08`: A line (requirements & guides)
  2. `02 / 08`: A stack (architecture & frameworks)
  3. `03 / 08`: A layout (conversion hierarchy & typography)
  4. `04 / 08`: An AI engine (voice & chatbot automation)
  5. `05 / 08`: A pipeline (CRM, SEO & ads data sync)
  6. `06 / 08`: Clean code (crafted React & TypeScript without bloat)
  7. `07 / 08`: Online (performance, sub-second speed & security)
  8. `08 / 08`: Your operation (accountable team deployment)
- Includes live percentage ticker (`000%` -> `100%`) and interactive skip control.

### Scrub / Stance Text
- Massive display text where each word scrubs/highlights from soft `var(--steel)` to stark `var(--ink)` as the user interacts or scrolls into view.

### Principles Grid
- 4-column layout separated by crisp top hairline rules (`.rule`), with `20px` breathing room before headers.

### Service Catalog Showcase
- Clean tabular rows with category badges, interactive expandable items, and capability lists.

### Selected Work / Case Studies Showcase
- Framed inside high-fidelity simulated browser chrome (`.frame-browser`) with dot controls, live URL pill, and impact metric tags (e.g. `+140% Qualified Inquiries`, `<1s LCP`).

### Global Network & Live Operations Hub
- 24/7 global coverage clocks (Seattle, Utah, New York, Canada, UK, India) with pulsing status lights and live response time tickers.

### Interactive Problem-to-Solution Shift (SystemShift)
- Interactive toggle showing common client operational hurdles vs Ethixweb connected solutions.

### Footer
- High-density modernist footer with legal registration (Ethixweb USA LLC, Wyoming), verified contact channels, calendar booking CTA, and policy links.

---

## 5. Motion, Easing & Micro-Interactions

- **Signature Easing Curve (`--ease-lens`)**: `cubic-bezier(0.23, 1, 0.32, 1)` (quintic ease-out). Delivers an instantaneous responsive launch followed by a frictionless, natural decrescendo.
- **Word Reveal (`hero-focus`)**: Blur clears from `14px` to `0px` with a subtle vertical settling of `0.24em`.
- **Stagger Delays**: Child items stagger at `60ms - 90ms` offsets.
- **Corner Marks on Hover (`.link`, `.chip`)**: On hover, microscopic L-shaped corner tick marks (`7px x 7px`) appear at the opposing corners of the element, evocative of draftsman crop marks.
- **Respects `prefers-reduced-motion`**: Disables auto-rotation, infinite loops, and heavy transforms, retaining clean opacity transitions.
