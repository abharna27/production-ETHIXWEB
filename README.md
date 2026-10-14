# Ethixweb — Architectural Web Engineering & Digital Operations

> **Transcontinental Digital Engineering: Seattle, WA ⇄ Bangalore, Karnataka**  
> A high-performance, Swiss-editorial web platform and operations engine engineered with React, TypeScript, Tailwind CSS, Framer Motion, and a serverless Neon PostgreSQL database.

---

## Table of Contents
1. [Design Rationale](#design-rationale)
   - [1.1 What Makes It India-Specific](#11-what-makes-it-india-specific)
   - [1.2 What We Improved Over the Current Site](#12-what-we-improved-over-the-current-site)
2. [Inner Pages Architecture](#inner-pages-architecture)
   - [Services (`/services`)](#services-services)
   - [About India Story (`/about`)](#about-the-india-story-about)
   - [Contact Desk (`/contact`)](#contact-consultation-desk-contact)
   - [Protected Admin Portal (`/admin`)](#protected-admin-portal-admin)
3. [Backend, Database & Security](#backend-database--security)
   - [Database Schema (Neon PostgreSQL)](#database-schema-neon-postgresql)
   - [Spam Protection & Validation Engine](#spam-protection--validation-engine)
   - [Vite Unified API Middleware](#vite-unified-api-middleware)
4. [Tech Stack & Getting Started](#tech-stack--getting-started)

---

## Design Rationale

### 1.1 What Makes It India-Specific

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
     - *Performance Guarantee*: Sub-800ms Time-to-Interactive, perfect Core Web Vitals, and PageSpeed 98+.

3. **Dual-Currency Commercials (INR ₹ & USD $)**:
   - The `/services` page features an interactive currency switcher enabling Indian businesses to view transparent pricing brackets in Indian Rupees (INR ₹ with GST alignment) while allowing international clients to evaluate transparent US Dollar ($ USD) tiers.
   - Budget bands are tuned for Indian market realities: from high-growth startup sprints (`₹1.5L – ₹3L`) to complete custom enterprise architectures (`₹8L – ₹20L+`).

4. **Regional Headquarters & Direct Consultation**:
   - The `/contact` desk and footer prominently display both operational hubs:
     - **US Headquarters**: Ethixweb USA LLC, Kent · Seattle, Washington, USA.
     - **India Engineering Hub**: Outer Ring Road Tech Corridor, Bangalore, Karnataka, India.

---

### 1.2 What We Improved Over the Current Site

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
- **Passkey Authentication**: Secure passcode barrier (default: `ethix2026admin`) with session token verification.
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

## Tech Stack & Getting Started

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS Architecture (`index.css`)
- **Animation**: Framer Motion (`motion/react`)
- **Database**: Serverless Neon PostgreSQL (`@neondatabase/serverless`)
- **Icons**: Lucide React
- **Routing**: React Router DOM v7

### Local Setup

```bash
# 1. Install dependencies
cd ETHIXWEB
npm install

# 2. Configure Environment (.env)
DATABASE_URL="postgresql://neondb_owner:npg_w4OqA2aYJMGt@ep-floral-mountain-azofd4u2-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
ADMIN_PASSCODE="ethix2026admin"

# 3. Start development server
npm run dev

# 4. Verify TypeScript compilation
npx tsc -b
```

Visit `http://localhost:5173/` for the landing page, `/services` for the catalog, `/about` for the India story, `/contact` for the enquiry desk, and `/admin` for the leads dashboard (Passcode: `ethix2026admin`).
