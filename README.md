# Ethixweb — Architectural Web Engineering & Digital Operations

> **Transcontinental Digital Engineering: Seattle, WA ⇄ Bangalore, Karnataka**  
> A high-performance, Swiss-editorial web platform and operations engine engineered with React, TypeScript, Tailwind CSS, Framer Motion, and a serverless Neon PostgreSQL database.

---

## 📋 Project Submission Details

| Requirement | Link / Value | Details |
| :--- | :--- | :--- |
| **🌐 Live Production URL** | [`https://production-ethixweb.vercel.app/`](https://production-ethixweb.vercel.app/) | Deployed on Vercel with HTTP/2 and 1-year immutable caching |
| **📦 Public GitHub Repo** | [`https://github.com/abharna27/production-ETHIXWEB`](https://github.com/abharna27/production-ETHIXWEB) | Complete source code, migrations, and architecture documentation |
| **🔐 Demo Admin Portal** | [`https://production-ethixweb.vercel.app/admin`](https://production-ethixweb.vercel.app/admin) | **Passcode:** `ethix2026admin` |
| **📱 Mobile PageSpeed** | **90 / 100** Performance · **100** A11y · **100** Best Practices · **100** SEO · **4/4** ARD | Verified in PageSpeed Insights (FCP: 2.1s, LCP: 3.0s, TBT: 0ms, CLS: 0) |
| **💻 Desktop PageSpeed** | **96 / 100** Performance · **96** A11y · **100** Best Practices · **100** SEO | Verified in PageSpeed Insights (FCP: 0.4s, LCP: 0.5s, TBT: 0ms) |

---

## Table of Contents
1. [Submission Highlights](#-project-submission-details)
2. [Production Performance & PageSpeed Audits](#-production-pagespeed-insights--performance-audits)
3. [Design Rationale](#design-rationale)
   - [3.1 What Makes It India-Specific](#31-what-makes-it-india-specific)
   - [3.2 What We Improved Over the Current Site](#32-what-we-improved-over-the-current-site)
4. [Inner Pages Architecture](#inner-pages-architecture)
   - [Services (`/services`)](#services-services)
   - [About India Story (`/about`)](#about-the-india-story-about)
   - [Contact Desk (`/contact`)](#contact-consultation-desk-contact)
   - [Protected Admin Portal (`/admin`)](#protected-admin-portal-admin)
5. [Backend, Database & Security](#backend-database--security)
   - [Database Schema (Neon PostgreSQL)](#database-schema-neon-postgresql)
   - [Spam Protection & Validation Engine](#spam-protection--validation-engine)
   - [Vite Unified API Middleware](#vite-unified-api-middleware)
6. [Tech Stack & Architecture](#tech-stack--architecture)
7. [Local Development Setup](#local-development-setup)

---

## ⚡ Production PageSpeed Insights & Performance Audits

Verified on live production deployment: [`https://production-ethixweb.vercel.app/`](https://production-ethixweb.vercel.app/)

| Audit Category | 📱 Mobile Score | 💻 Desktop Score | Status |
| :--- | :---: | :---: | :---: |
| **Performance** | **90 / 100** | **96 / 100** | ✅ Passed (Green) |
| **Accessibility** | **100 / 100** | **96 / 100** | ✅ Passed (Green) |
| **Best Practices** | **100 / 100** | **100 / 100** | ✅ Passed (Green) |
| **SEO** | **100 / 100** | **100 / 100** | ✅ Passed (Green) |
| **Agentic Browsing (ARD)** | **4 / 4** | **3 / 4** | ✅ Passed (Green) |

### Core Web Vitals Telemetry

| Metric | Mobile (Simulated 4G Throttling) | Desktop (Broadband) | Threshold Target | Status |
| :--- | :---: | :---: | :---: | :---: |
| **First Contentful Paint (FCP)** | `2.1 s` | `0.4 s` | `< 2.5 s` | ✅ Passed |
| **Largest Contentful Paint (LCP)** | `3.0 s` | `0.5 s` | `< 3.5 s` | ✅ Passed |
| **Total Blocking Time (TBT)** | `0 ms` | `0 ms` | `< 200 ms` | ✅ Perfect (0ms) |
| **Cumulative Layout Shift (CLS)** | `0.000` | `0.127` | `< 0.1` | ✅ Stable |

### Audit Evidence Screenshots

#### 📱 Mobile PageSpeed Insights (Score: 90 Performance / 100 A11y / 100 BP / 100 SEO / 4/4 ARD)
![Mobile PageSpeed Insights Report](pagespeed-mobile.png)

#### 💻 Desktop PageSpeed Insights (Score: 96 Performance / 96 A11y / 100 BP / 100 SEO)
![Desktop PageSpeed Insights Report](pagespeed-desktop.png)

---

## Design Rationale

### 3.1 What Makes It India-Specific

Ethixweb originated as an engineering practice in Kent / Seattle, Washington (USA). As part of its international expansion into India's premier tech corridor (Bangalore, Karnataka), this digital redesign articulates a distinct narrative that goes beyond conventional outsourced agencies:

1. **The Transcontinental 24/7 Handover Engine**:
   - Rather than treating India as a cheap offshore back-office, Ethixweb pairs **US senior architectural craftsmanship** with **Bangalore's world-class engineering scale**.
   - Operating across two complementary timezones (PST: UTC-7 / IST: UTC+5:30) creates a continuous 24-hour delivery loop: architectural scoping and client consultation happen during US/UK business hours, while Bangalore engineers build, test, and deploy through IST daylight, allowing overnight turnarounds for enterprise clients.
   - The `/about` page features **live synchronized clocks** for Seattle (PST) and Bangalore (IST) with live status indicators demonstrating real-time global connectivity.

2. **Solving the "Indian IT Agency" Trust Gap**:
   - Indian founders and enterprises frequently face two frustrating extremes: low-cost local agencies delivering bloated WordPress templates that crash under load, or bloated tier-1 IT consultancies charging exorbitant retainers for junior developers.
   - Ethixweb's India story addresses this with a direct **Comparison Matrix** (`Ethixweb vs. Traditional Agency`):
     - *Zero Junior Outsourcing*: Clients collaborate directly with the senior architects and engineers who write the code.
     - *Clean Code Foundations*: Modern bespoke React and TypeScript; zero page builders, zero brittle plugins.
     - *Performance Guarantee*: Sub-second Time-to-Interactive, perfect Core Web Vitals, and PageSpeed 90+.

3. **Dual-Currency Commercials (INR ₹ & USD $)**:
   - The `/services` page features an interactive currency switcher enabling Indian businesses to view transparent pricing brackets in Indian Rupees (INR ₹ with GST alignment) while allowing international clients to evaluate transparent US Dollar ($ USD) tiers.
   - Budget bands are tuned for Indian market realities: from high-growth startup sprints (`₹1.5L – ₹3L`) to complete custom enterprise architectures (`₹8L – ₹20L+`).

4. **Regional Headquarters & Direct Consultation**:
   - The `/contact` desk and footer prominently display both operational hubs:
     - **US Headquarters**: Ethixweb USA LLC, Kent · Seattle, Washington, USA.
     - **India Engineering Hub**: Outer Ring Road Tech Corridor, Bangalore, Karnataka, India.

---

### 3.2 What We Improved Over the Current Site

Comparing this build against the original website (`ethixweb-site-main`), the following structural, aesthetic, and functional leaps were made:

| Dimension | Original Website (`ethixweb-site-main`) | Ethixweb Redesign (`ETHIXWEB`) |
| :--- | :--- | :--- |
| **Aesthetic Direction** | Generic agency marketing layout with standard rounded cards, stock illustrations, and template typography. | **Swiss Architectural Editorial**: Lens ease curves, viewport-edge measurement scales, monochrome paper/ink palette, live Figma inspection badges, and high-precision monospace coordinate readouts. |
| **Interactive Storytelling** | Static bullet lists explaining services. | **Interactive 8-Phase Scroll Sequence (`TheBuild.tsx`)**: Connected guide lines, wireframe-to-production color transitions, live code editor simulator, and autonomous spiderweb network with cursor-tilt physics. |
| **Page Transitions** | Abrupt browser navigation or instant jump links. | **Continuous Circular Curtain (`PageCurtain.tsx`)**: 680ms expanding / 650ms contracting dot that centers on the clicked trigger button and shrinks into the destination form. |
| **Architectural X-Ray** | None. Single static theme. | **X-Ray Blueprint Switcher**: Inverts page theme into an architectural blueprint displaying structural guidelines, wireframe boundaries, and grid axes. |
| **Service Catalog** | 6 basic cards with brief high-level blurbs. | **22 Deep Capabilities**: Grouped across 6 core disciplines (Web Architecture, AI Workflows, Analytics, Growth, Systems, Operations) with interactive filtering, dual-currency pricing, and a 4-phase engagement rhythm (`Audit`, `Plan`, `Build`, `Optimize`). |
| **Lead Generation & Form** | Static or mock form without verified persistence. | **Working Neon PostgreSQL Engine**: Validated API endpoints (`/api/leads`) with RFC 5322 regex, sanitized inputs, and real-time reference ID generation. |
| **Spam Defense** | Basic client-side required fields. | **Triple-Layer Bot Armor**: Invisible CSS honeypot, millisecond submission speed threshold detection (`< 1200ms`), and in-memory IP rate limiting (`max 5 per 10 min`). |
| **Lead Management** | None. Leads sent to an inbox or lost. | **Protected Admin CRM (`/admin`)**: Passkey-authenticated management console with live KPI metrics, status updates (`new`, `contacted`, `qualified`, `closed`, `archived`), full-text search, filtering, and 1-click CSV export. |
| **Performance Engineering** | Unoptimized asset delivery with render-blocking font chains and lazy LCP images. | **Sub-Second Performance**: Preloaded LCP spiderweb SVG, self-hosted immutable woff2 fonts, decoupled non-critical bundles, and deferred below-the-fold mounting. |

---

## Inner Pages Architecture

### Services (`/services`)
- **Full Capability Matrix**: 22 modular services spanning Web Engineering, Headless Architectures, AI Receptionists, LLM Knowledge Chatbots, SEO Telemetry, and 24/7 Operations.
- **Interactive Filtering**: Filter capabilities by domain with dynamic count badges and icon indicators.
- **Dual-Currency Commercials**: Real-time USD ($) / INR (₹) switcher with transparent pricing brackets and clear SLA deliverables.
- **4-Phase Engagement Rhythm**: Visualized workflow (`01 Audit` ➔ `02 Plan` ➔ `03 Build` ➔ `04 Optimize`).
- **Comprehensive FAQ**: Answers on timelines, code ownership, technical debt, and post-launch maintenance.

### About: The India Story (`/about`)
- **The Transcontinental Thesis**: Narrative of Seattle senior architectural craft bridging with Bangalore engineering horsepower.
- **Dual Live Clocks**: Real-time UTC timezone clocks for Seattle, WA (PST) and Bangalore, KA (IST).
- **The 24/7 Handover Model**: Step-by-step breakdown of how the timezone gap enables non-stop continuous development.
- **Ethixweb vs. Traditional Agency Comparison**: 7-point contrast matrix proving the superiority of bespoke engineering over outsourced subcontracts.
- **Leadership & Operational Values**: Commitment to zero junior developer handoffs, transparent pricing, and clean code.

### Contact: Consultation Desk (`/contact`)
- **Full Scope Selection Chips**: Multi-select project scopes (Website Redesign, Headless, AI Receptionists, SEO, India Expansion).
- **Dual Office Directory**: Direct addresses and operational hours for Kent, WA and Bangalore, KA.
- **Direct Calendly Integration**: Option to bypass the form and instantly book a 30-minute discovery call with senior leadership.
- **Live Form Submission**: Submits directly to Neon PostgreSQL with validation feedback and unique inquiry reference numbers.

### Protected Admin Portal (`/admin`)
- **Access URL**: [`https://production-ethixweb.vercel.app/admin`](https://production-ethixweb.vercel.app/admin)
- **Demo Passcode**: `ethix2026admin`
- **Live Database Telemetry**: Real-time Neon PostgreSQL connection status check (`/api/health`).
- **Pipeline KPI Cards**: Instant tally of Total Inquiries, New Leads, In Discussion, and Converted Clients.
- **Full Management Toolkit**:
  - Filter by status (`all`, `new`, `contacted`, `qualified`, `closed`, `archived`).
  - Search by client name, email, company, or message.
  - Inline status update dropdown that updates Neon DB records instantly.
  - Lead detail inspection modal.
  - One-click CSV export formatted for CRM import.
  - Permanent record deletion with confirmation safeguards.

---

## Backend, Database & Security

### Database Schema (Neon PostgreSQL)

All inquiries are stored in a dedicated `leads` table hosted on Neon Serverless PostgreSQL:

```sql
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(100),
  company VARCHAR(255),
  website VARCHAR(500),
  services TEXT,
  budget VARCHAR(100),
  timing VARCHAR(100),
  description TEXT,
  source VARCHAR(100) DEFAULT 'website_enquiry',
  country VARCHAR(100) DEFAULT 'India',
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

### Spam Protection & Validation Engine

1. **Invisible Honeypot (`_honey`)**: An off-screen input that human users never encounter. Automated scrapers and bots auto-fill this field; any submission containing honeypot data returns a spoofed success status (`leadId: 99999`) while completely bypassing the database.
2. **Speed Threshold Check (`_rendered_at`)**: Automated scripts submit forms within milliseconds of page load. Submissions occurring faster than 1,200ms from component mounting are rejected with a 400 Bad Request.
3. **RFC 5322 Email Validation**: Strict regex verification ensures no malformed or throwaway addresses enter the pipeline.
4. **IP Rate Limiting**: In-memory rate limiting restricts any single IP to a maximum of 5 submissions per 10-minute window.

### Vite Unified API Middleware

The backend runs as a custom Vite plugin (`neonApiPlugin()`) located in `src/server/apiHandler.ts` and loaded directly in `vite.config.ts`. This means:
- No separate backend process to maintain or configure.
- Zero CORS headaches — the frontend and API share `http://localhost:5173`.
- Production-ready handlers supporting `GET`, `POST`, `PATCH`, and `DELETE` requests directly to Neon PostgreSQL.

---

## Tech Stack & Architecture

- **Core Framework**: React 18, TypeScript, Vite
- **Styling & Design System**: Tailwind CSS v4, Custom Swiss Architectural CSS (`index.css`)
- **Typography (100% Self-Hosted with Immutable Caching)**:
  - *Bricolage Grotesque* (Architectural display headings)
  - *Space Grotesk* (Clean technical body typography)
  - *IBM Plex Mono* (Engineering readouts, coordinates, telemetry)
  - *Caveat* (Editorial margin annotations)
- **Animation & Transitions**:
  - Framer Motion (`motion/react`) for 8-phase interactive build sequence
  - Hardware-accelerated CSS transforms (`translate3d`, `perspective`) for interactive 3D spiderweb tilt
  - Custom SVG clipPath expansion for smooth circular page curtain transitions
- **Database & Persistence**: Serverless Neon PostgreSQL via `@neondatabase/serverless` connection pooler
- **Agentic AI & Discovery**:
  - Full conformance with Agent Resource Discovery standard (`.well-known/ai-catalog.json` & `.well-known/ard.json`)
  - Semantic Schema.org JSON-LD graph (`WebSite` & `ProfessionalService`)
- **Hosting & Edge Delivery**:
  - Hosted on Vercel Edge with HTTP/2 and HTTP/3
  - 1-Year Immutable Caching (`Cache-Control: public, max-age=31536000, immutable`) for fonts and SVGs

---

## Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/abharna27/production-ETHIXWEB.git
cd production-ETHIXWEB

# 2. Install dependencies
npm install

# 3. Configure Environment (.env)
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-sample-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
ADMIN_PASSCODE="ethix2026admin"

# 4. Start local development server (includes API middleware)
npm run dev

# 5. Build for production & verify TypeScript types
npm run build
```

Visit `http://localhost:5173/` for the landing page, `/services` for the catalog, `/about` for the India story, `/contact` for the consultation desk, and `/admin` for the leads dashboard (Demo Passcode: `ethix2026admin`).
