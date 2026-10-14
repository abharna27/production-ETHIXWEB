# ETHIXWEB Project — Comprehensive Antigravity Handover Context

> **Target Audience**: Antigravity AI Agent & Engineering Team on a new device.  
> **Repository Root**: `/Users/akshat12/Documents/abharnaethixweb`  
> **Active Application Directory**: `/Users/akshat12/Documents/abharnaethixweb/ETHIXWEB`  
> **Source Reference Directory**: `/Users/akshat12/Documents/abharnaethixweb/ethixweb-source` (Read-only real company data)  
> **Dev Server**: `npm run dev` in `ETHIXWEB` (usually `http://localhost:5173` or `http://localhost:5174`)

---

## 1. Executive Summary & Project Origin

This project is a high-end, editorial agency redesign for **Ethixweb** (`ethixweb.com` — digital operations, web architecture, automation, and AI systems).

The design language is inspired by the award-winning architectural aesthetic of **Metic** (`metic.com`) and the user's reference portfolio (`akshatg-portfolio`). The core visual philosophy is **"Anti-Slop Modern Architectural Web"**:
- Precise technical guidelines, rulers, tick marks, and coordinate systems.
- High-contrast typography combining editorial display headers and technical monospaced labels.
- Dual-mode architecture: clean, paper-textured **Light Mode** and high-tech blueprint **Dark / X-Ray Mode**.
- Interactive tactile feedback: Figma-style inspector bounding boxes with dimension badges on hover, subtle audio clicks, and magnetic pulls.
- Liquid, continuous circular clip-path transitions for the menu and primary actions.

---

## 2. Workspace & File Structure

```
/Users/akshat12/Documents/abharnaethixweb/
├── ETHIXWEB/                      <-- ACTIVE APPLICATION (React 18 + Vite + Tailwind + Framer Motion)
│   ├── src/
│   │   ├── App.tsx                <-- Root orchestrator: theme state, section spy, mounts PageCurtain
│   │   ├── index.css              <-- Global design tokens (--paper, --ink, --accent, --line, button styles)
│   │   ├── content/
│   │   │   └── landing.ts         <-- Real company content inventory (services, stats, testimonials, claims)
│   │   └── components/
│   │       ├── PageCurtain.tsx    <-- Expanding/shrinking circular dot transition for "Start a project"
│   │       ├── Navbar.tsx         <-- Floating pill navbar, audio toggle, X-ray mode, circular hamburger menu
│   │       ├── Hero.tsx           <-- Editorial hero with dynamic copy & inspector target wrappers
│   │       ├── ArchitecturalWeb.tsx<-- Interactive operational spiderweb network with mouse tilt
│   │       ├── TheBuild.tsx       <-- 8-Phase scroll-driven design-to-code build sequence (Metic clone)
│   │       ├── Rulers.tsx         <-- Viewport-edge measurement rulers with draggable scroll indicator dot
│   │       ├── InspectorTarget.tsx<-- Figma-style dimension badges and corner anchors on hover
│   │       ├── CTA.tsx            <-- Details fill-up form (#cta) with scope chips & booking card
│   │       ├── Services.tsx       <-- Core service capabilities breakdown
│   │       ├── SelectedWork.tsx   <-- Case studies hub
│   │       ├── GlobalNetwork.tsx  <-- Global operations distribution
│   │       ├── Proof.tsx          <-- Real client testimonials & metric counters
│   │       ├── FAQ.tsx            <-- Accordion FAQ
│   │       ├── Footer.tsx         <-- Architectural footer
│   │       ├── Stance.tsx         <-- Value proposition statement
│   │       └── SystemShift.tsx    <-- Comparison matrix (old agency vs Ethixweb)
│   └── package.json
├── ethixweb-source/               <-- Original company content & code reference (READ-ONLY)
├── AGENTS.md                      <-- Automatically loaded by Antigravity on startup
└── PROJECT_CONTEXT_HANDOVER.md    <-- This document
```

*(Note: If you encounter an older folder `collegejobTasks/ethixWeb`, that was an early prototype. All production work is located in `ETHIXWEB`.)*

---

## 3. Key Components & Implementation Details

### A. The "Start a project" Expanding Dot Transition ([`PageCurtain.tsx`](file:///Users/akshat12/Documents/abharnaethixweb/ETHIXWEB/src/components/PageCurtain.tsx))
- **Requirement**: When clicking any "Start a project" trigger, a black dot (light mode) or white dot (dark mode) expands outward from behind the button to consume the entire screen. While fully covered, the page instantly scrolls to the details fill-up form (`#cta`), and the dot smoothly shrinks down into the center of the form card, revealing the page in one continuous motion.
- **Timing**:
  - Phase 1 (Expanding): `680ms` with `cubic-bezier(0.22, 1, 0.36, 1)`.
  - Phase 2 (Shrinking): `650ms` with `cubic-bezier(0.22, 1, 0.36, 1)`.
  - Total duration: `~1.33s` (tuned 40% slower per user request for deliberate elegance).
- **Trigger Points**:
  1. Top Navbar header link (`Navbar.tsx`).
  2. Full-screen Hamburger menu drawer links (`Navbar.tsx`).
  3. Hero primary button (`Hero.tsx`).
  4. The Build Phase 8 centered SVG button (`TheBuild.tsx`).
  5. Global capture listener intercepts any link pointing to `href="#cta"`.

### B. The 8-Phase Scroll Section ([`TheBuild.tsx`](file:///Users/akshat12/Documents/abharnaethixweb/ETHIXWEB/src/components/TheBuild.tsx))
The centerpiece interactive sequence recreating Metic's design-to-code build:
- **Phase 1 (Guides)**: Architectural guide lines expand from screen boundaries (far left, right, and top).
- **Phase 2 (Grid & Crosshairs)**: Grid lines and coordinate markers lock into position.
- **Phase 3 (Wireframes)**: Component layout boundaries expand into place.
- **Phase 4 (Text Reveal)**: Smooth left-to-right text reveal while geometric wireframe shapes fade out.
- **Phase 5 (Color & Imagery)**: 3 color indicator dots appear; brand colors fill into components from left to right; UI preview image emerges from bottom to top.
- **Phase 6 (Code Window)**: Interactive code editor displays button source `<Button href="/en/start-project">` with a curved Bezier line connecting the code directly to the button.
- **Phase 7 (Vacuum / Collapse)**: Surrounding elements blur, shrink, and get vacuumed behind the button. The layout boundary smoothly expands outward to align with the crossroad guide lines.
- **Phase 8 (Finale)**: The button glides to the exact screen center at the crossroad intersection of top, bottom, left, and right lines. A pulsing red glow aura appears, a *"Go on, click me"* prompt pops up, and clicking the button triggers the circular `PageCurtain` transition to `#cta`.
- **Scroll Pacing**: All scroll transforms are tuned 40% slower to allow users to comfortably appreciate each phase.

### C. Floating Navbar & Circular Hamburger Menu ([`Navbar.tsx`](file:///Users/akshat12/Documents/abharnaethixweb/ETHIXWEB/src/components/Navbar.tsx))
- **Adaptive Header**: Transparent at page top; compresses into floating pill capsule upon scrolling down. Automatically hides on downward scroll and reveals on upward scroll.
- **Audio Pulse**: Plays subtle synthesized tactile audio on button clicks (`click-sound-effects-copyright-free_NBeVl5YB.mp3`).
- **X-Ray Toggle**: Toggles architectural blueprint mode (`data-theme="dark"` / `.xray`).
- **Circular Clip-Path Menu**:
  - Clicking the black hamburger dot expands `clipPath: circle(...)` from the button's exact coordinates.
  - Black background in light mode (`#0b0b0e`); white background in dark mode (`#f6f6f4`).
  - Contains massive typography links, dynamic hover preview cards, sound toggle, theme switch, and direct CTA.

### D. Viewport Measurement Rulers ([`Rulers.tsx`](file:///Users/akshat12/Documents/abharnaethixweb/ETHIXWEB/src/components/Rulers.tsx))
- Fixed rulers on the absolute left and right edges touching the screen boundaries.
- Live pixel tick marks and coordinate markers.
- Custom draggable scroll indicator dot on the right ruler replacing standard browser scrollbars.

### E. Details Fill-Up Form ([`CTA.tsx`](file:///Users/akshat12/Documents/abharnaethixweb/ETHIXWEB/src/components/CTA.tsx))
- Anchored at `#cta`.
- Interactive multi-select scope chips (Website Redesign, AI Voice Receptionist, CRM Pipeline Sync, SEO & Local Ranking, Google & Meta Ads, 24/7 Operations Support).
- Pre-filled mailto generation and 30-minute fast-lane consultation booking card.

---

## 4. Design System Tokens & Typography

- **Light Mode (Default)**:
  - `--paper`: `#f4f4f2`
  - `--paper-2`: `#ecece9`
  - `--ink`: `#0b0b0e`
  - `--ink-2`: `#27272a`
  - `--line`: `rgba(0, 0, 0, 0.08)`
  - `--accent`: `#ff3e3e` (high-voltage architectural red/orange)
- **Dark Mode (`[data-theme="dark"]` / `.xray`)**:
  - `--paper`: `#0f0f11`
  - `--paper-2`: `#18181b`
  - `--ink`: `#f4f4f2`
  - `--ink-2`: `#d4d4d8`
  - `--line`: `rgba(255, 255, 255, 0.08)`
  - `--accent`: `#ff3e3e`
- **Fonts**:
  - Headings: `var(--font-display)` (editorial grotesk variable)
  - Data / Coordinates / Labels: `var(--font-mono)` (JetBrains Mono / SF Mono tabular)

---

## 5. Instructions for Resuming on a New Device

When you open this repository on your new device with Antigravity:

1. **Verify Directory**:
   Ensure you open `/path/to/abharnaethixweb` in Antigravity.
2. **Install Dependencies & Start Dev Server**:
   ```bash
   cd ETHIXWEB
   npm install
   npm run dev
   ```
3. **Prompt for the New Antigravity Agent**:
   Copy and paste the prompt in the next section into your chat with Antigravity. Antigravity will read this handover document and immediately have 100% full context.
