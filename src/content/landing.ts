import {
  Bot,
  BrainCircuit,
  Cable,
  Code2,
  DollarSign,
  Globe2,
  Layers3,
  LifeBuoy,
  Megaphone,
  Palette,
  PhoneCall,
  Search,
  ShieldCheck,
  TrendingUp,
  Workflow,
  BarChart3,
  Boxes,
  Brain,
  Clapperboard,
  ClipboardList,
  Eye,
  Headset,
  LayoutDashboard,
  LayoutTemplate,
  LineChart,
  Mail,
  MessageSquare,
  MousePointerClick,
  Plug,
  RefreshCw,
  Rocket,
  ScanEye,
  Target,
  UserCheck,
} from "lucide-react";

export const BRAND = {
  name: "Ethixweb",
  tagline: "We run the tech. You run the business.",
  subtext:
    "We manage your digital operation, from AI booking agents and CRM integrations to websites, SEO and ads.",
  description:
    "Tired of being account #200 at a big agency? Work with a senior team that knows your business by name.",
  badge: "Premium digital operations team",
  coordinates: "47.3809° N, 122.2348° W", // Kent, WA USA
  legal: "Ethixweb USA LLC | Registered in Wyoming, United States",
  email: "info@ethixweb.com",
  hours: "Mon-Fri · 9:00 AM - 5:00 PM",
  location: "Kent, Washington, USA",
  bookingUrl: "https://calendly.com/ethixweb-agency/30min?month=2026-06",
  trustpilotUrl: "https://www.trustpilot.com/review/ethixweb.com",
};

export const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "The Build", href: "#the-build" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Network", href: "#network" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export const HERO_BADGES = [
  { label: "More booked jobs", icon: PhoneCall },
  { label: "More conversions", icon: TrendingUp },
  { label: "UI/UX Systems", icon: Layers3 },
  { label: "Revenue tracked", icon: DollarSign },
  { label: "Design that converts", icon: Palette },
];

export const MARQUEE_STACK = [
  "AI agents",
  "CRM",
  "Websites",
  "SEO",
  "Ads",
  "Analytics",
  "Automations",
  "Support",
];

// 8-step build sequence modeled after the reference's signature "From a line to a button"
export const BUILD_STEPS = [
  {
    step: "01",
    title: "A line.",
    subtitle: "Architecture & Requirements",
    desc: "Every project starts with guides. Where data and users flow is measured, not guessed.",
    detail: "Scope mapping, systems audit, conversion targets, and technical boundaries.",
  },
  {
    step: "02",
    title: "A grid.",
    subtitle: "Component Systems & Layout",
    desc: "Columns, spacing, hierarchy. The scaffolding everything snaps to across all devices.",
    detail: "Responsive rhythm, touch targets >= 44px, baseline alignment.",
  },
  {
    step: "03",
    title: "A layout.",
    subtitle: "Conversion Paths",
    desc: "Lines become surfaces: navigation, clear value props, proof, and one primary action.",
    detail: "Clear typography, instant comprehension, zero visual clutter.",
  },
  {
    step: "04",
    title: "An AI engine.",
    subtitle: "Autonomous Agents",
    desc: "Voice and chat agents that answer, qualify, route, and book leads 24/7.",
    detail: "Sub-second response, human handoff, CRM calendar sync.",
  },
  {
    step: "05",
    title: "A pipeline.",
    subtitle: "Integrations & CRM",
    desc: "HubSpot, GoHighLevel, phone lines, calendars, and ads wired into one engine.",
    detail: "Closed-loop attribution, revenue tracking, automated follow-ups.",
  },
  {
    step: "06",
    title: "Crafted in code.",
    subtitle: "No Site Builders",
    desc: "What we design, we engineer by hand. Clean, readable React & TypeScript.",
    detail: "No plugin bloat, no vulnerable dependencies, full code ownership.",
  },
  {
    step: "07",
    title: "Online & Fast.",
    subtitle: "Production Deployment",
    desc: "Sub-second load times, 100/100 Lighthouse score, and search engine authority.",
    detail: "Global CDN delivery, automated backups, 99.99% uptime monitoring.",
  },
  {
    step: "08",
    title: "Your turn.",
    subtitle: "Dedicated Partner",
    desc: "Everything you have seen run by one senior accountable team. Let's build yours.",
    detail: "Fast fixes, regular updates, dedicated Slack channel.",
  },
];

// Stance / Statement Section (from ethixweb-site-main about.tsx & index.tsx)
export const STANCE = {
  statement:
    "Built for businesses tired of big agency theater. We bring software, automation, and marketing operations into one disciplined delivery system.",
  subtext:
    "When you work with Ethixweb, you work directly with senior engineers and strategists. No ticket queues, no juniors learning on your budget.",
};

// Principles Grid (verbatim from Operating Model & Core Values in ethixweb-site-main)
export const PRINCIPLES = [
  {
    title: "Senior team only.",
    desc: "You talk directly to the people doing the work. No account managers, no layers, no handoffs, no juniors learning on your budget.",
  },
  {
    title: "Revenue obsessed.",
    desc: "We measure success in booked jobs and revenue, not impressions, clicks, vanity metrics, or design awards.",
  },
  {
    title: "Growth connected.",
    desc: "SEO, ads, analytics, forms, calls, and CRM data aligned around revenue so every lead is tracked to the dollar.",
  },
  {
    title: "Move fast, ship clean.",
    desc: "Lean process, weekly iteration. Typical launch in 2-4 weeks with clean code, secure defaults, and ongoing support.",
  },
];

// Featured Core Services
export const CORE_SERVICES = [
  {
    icon: Bot,
    title: "AI Receptionists",
    desc: "Voice and chat agents that answer, qualify, route, and book leads while your team stays focused.",
    badge: "24/7 Live",
  },
  {
    icon: BrainCircuit,
    title: "AI Automation",
    desc: "Workflow automation, internal copilots, data syncs, and operational systems built for real teams.",
    badge: "Custom Logic",
  },
  {
    icon: Globe2,
    title: "Websites",
    desc: "Fast, premium websites with sharp positioning, conversion paths, analytics, and SEO foundations.",
    badge: "Sub-second LCP",
  },
  {
    icon: Code2,
    title: "Web Applications",
    desc: "Custom portals, dashboards, booking flows, and software tools engineered for daily operations.",
    badge: "Full-Stack",
  },
  {
    icon: Cable,
    title: "CRM Integrations",
    desc: "HubSpot, GoHighLevel, Zapier, forms, calls, calendars, and pipelines connected into one system.",
    badge: "Real-time Sync",
  },
  {
    icon: Search,
    title: "SEO",
    desc: "Technical SEO, local SEO, content systems, and measurement that compound into durable demand.",
    badge: "Rankings & Maps",
  },
  {
    icon: LifeBuoy,
    title: "Maintenance & Support",
    desc: "Fast fixes, uptime care, site updates, reporting, and a responsive team when something needs attention.",
    badge: "< 1h Response",
  },
  {
    icon: Workflow,
    title: "Digital Operations",
    desc: "A senior tech team for your digital stack, from strategy through launch, support, and optimization.",
    badge: "All-in-one",
  },
];

// Full Service Catalog (22 items in 6 categories from original services-catalog.ts)
export const SERVICE_CATALOG = [
  {
    icon: Globe2,
    title: "Website",
    teaser: "Redesigns, headless builds, landing pages, and ongoing maintenance.",
    items: [
      {
        icon: LayoutTemplate,
        title: "Website Redesign",
        desc: "A modern site built around how your business sells.",
      },
      {
        icon: Boxes,
        title: "Headless Architecture",
        desc: "Faster, more flexible foundation for future growth.",
      },
      {
        icon: MousePointerClick,
        title: "Landing Pages",
        desc: "Purpose-built pages that convert campaign traffic.",
      },
      {
        icon: ShieldCheck,
        title: "Maintenance & Security",
        desc: "Updates, monitoring, and patching after launch.",
      },
    ],
  },
  {
    icon: Bot,
    title: "AI",
    teaser: "Chatbots and AI receptionists that qualify and route leads around the clock.",
    items: [
      {
        icon: MessageSquare,
        title: "Knowledge Chatbot",
        desc: "Fast answers from a fixed script or FAQ library.",
      },
      {
        icon: Brain,
        title: "LLM Chatbot",
        desc: "Reasons over your real knowledge base, in your voice.",
      },
      {
        icon: PhoneCall,
        title: "AI Receptionist / CSR",
        desc: "Handles inquiries and requests around the clock.",
      },
      {
        icon: UserCheck,
        title: "Human Handoff",
        desc: "A real person steps in when it actually matters.",
      },
    ],
  },
  {
    icon: Rocket,
    title: "Growth",
    teaser: "SEO, Google & Meta ads, social, and email working as one engine.",
    items: [
      {
        icon: Search,
        title: "SEO",
        desc: "Technical fixes, content, and authority over time.",
      },
      {
        icon: Megaphone,
        title: "Google Ads + LSA",
        desc: "Campaigns built, tracked, and optimized weekly.",
      },
      {
        icon: Target,
        title: "Meta Ads",
        desc: "Facebook and Instagram, targeted and retargeted.",
      },
      {
        icon: Clapperboard,
        title: "Social + Reels",
        desc: "Strategy, content calendar, and creative production.",
      },
      {
        icon: Mail,
        title: "Email Marketing",
        desc: "Campaigns, automation, and segmentation that convert.",
      },
      {
        icon: Workflow,
        title: "CRM Integration",
        desc: "Leads flow straight into the system you already use.",
      },
    ],
  },
  {
    icon: BarChart3,
    title: "Data",
    teaser: "Live dashboards, analytics, and monthly reporting for every channel.",
    items: [
      {
        icon: LayoutDashboard,
        title: "Dashboard",
        desc: "Every channel's performance in one live view.",
      },
      {
        icon: LineChart,
        title: "Analytics",
        desc: "Website, ads, and lead tracking, fully connected.",
      },
      {
        icon: ClipboardList,
        title: "Monthly Reporting",
        desc: "What happened, why, and what to do next.",
      },
    ],
  },
  {
    icon: Eye,
    title: "Accessibility",
    teaser: "Improvements and testing reviewed against recognized standards.",
    items: [
      {
        icon: Eye,
        title: "Accessibility Improvements",
        desc: "Contrast, navigation, and structure that includes everyone.",
      },
      {
        icon: ScanEye,
        title: "Accessibility Testing",
        desc: "Reviewed against recognized accessibility standards.",
      },
    ],
  },
  {
    icon: LifeBuoy,
    title: "Support",
    teaser: "A real team on technical support, content, and API maintenance.",
    items: [
      {
        icon: Headset,
        title: "Technical Support",
        desc: "A real team, reachable when something breaks.",
      },
      {
        icon: RefreshCw,
        title: "AI + Content Updates",
        desc: "Your chatbot's knowledge, kept current every month.",
      },
      {
        icon: Plug,
        title: "API Maintenance",
        desc: "Every integration monitored and kept in sync.",
      },
    ],
  },
];

// Real Case Studies from the original repo (portfolio-data.ts)
export const CASE_STUDIES = [
  {
    id: "all-phase-plumbing",
    client: "All Phase Plumbing",
    year: "2026",
    category: "Local Home Services",
    headline: "From invisible online to fully booked in 90 days.",
    metric: "90 days",
    metricLabel: "Fully Booked",
    desc: "A 35-year-old, family-run Seattle plumbing company taken off generic WordPress onto a custom stack on Google Cloud with on-page SEO and instant mobile dispatch.",
    url: "allphaseplumbing.com",
    tags: ["Web Design", "SEO"],
    image: "/images/case-studies/all-phase-plumbing/hero-1024w.webp",
  },
  {
    id: "garys-pipeline",
    client: "Gary's Pipelining & Drain Cleaning",
    year: "2026",
    category: "Trenchless Sewer Repair",
    headline: "Turning specialist searches into specialist calls.",
    metric: "25+ Pages",
    metricLabel: "Dual Enquiry Paths",
    desc: "A ground-up, 25+ page static rebuild with two dedicated enquiry paths for homeowners and contractor partners, city & service landing pages, and WCAG 2.1 AA accessibility.",
    url: "garyspipeline.com",
    tags: ["Web Design", "SEO"],
    image: "/images/case-studies/garys-pipeline/after-screenshot-1024w.webp",
  },
  {
    id: "preventive-home",
    client: "Preventive Home Solutions",
    year: "2026",
    category: "Local Home Services",
    headline: "From cluttered template to booked inspections.",
    metric: "5.0 ★",
    metricLabel: "Licensed & Insured",
    desc: "A licensed Northern Utah plumbing and HVAC company redesigned around a knight and shield brand, with inspection booking built into the hero and upfront license & review proof.",
    url: "preventivehomesolutions.com",
    tags: ["Web Design"],
    image: "/images/case-studies/preventive-home-solutions/after-screenshot-1024w.webp",
  },
  {
    id: "catching-chrome",
    client: "Catching Chrome",
    year: "2026",
    category: "Outdoor & Recreation",
    headline: "Turning phone-first anglers into booked trips.",
    metric: "40+ yrs",
    metricLabel: "USCG Certified",
    desc: "An Oregon salmon and steelhead guide service mobile-first redesign led by cinematic Pacific Northwest photography, USCG credentials in the hero, and one clear Book Now path.",
    url: "catchingchrome.com",
    tags: ["Web Design"],
    image: "/images/case-studies/catching-chrome/after-screenshot-1024w.webp",
  },
];

// Verified Trustpilot Reviews from original Testimonials.tsx
export const REVIEWS = [
  {
    stars: 5,
    text: "I have been contacted by many people/companies that want to build a website for my business, but I'm always skeptical about it. I decided to give Ethixweb that chance and they have proven themselves! I have been with them 2 years and within that first year my business had doubled. The second year my business had doubled again. My website is easy to follow, has everything on it I asked for, it loads fast and it's easy to maintain. The folks at Ethixweb are very professional, schedule meetings via video when I need something fixed and are on top of it. My computer skills are absolute garbage, so I am very lucky to have Ethixweb a part of my business!",
    author: "Ryan Taylor",
    date: "October 2026",
    verified: true,
  },
  {
    stars: 5,
    text: "I had Ethixweb.com create me a website not only did they do it extremely professional, but they did it extremely fast and it came out fabulous they are very professional and they communicate great. I would highly recommend this company to create your next website. They are exceptional.",
    author: "Clinton Mcculloch",
    date: "October 2026",
    verified: true,
  },
  {
    stars: 5,
    text: "Amar is very thorough and quick to make changes on our website. Over the years that has been my biggest issue with web designers. Small changes can take way too long. Thankfully that is not the case here. Good service! Very happy customer!!",
    author: "Leslie Whitehurst-Manners",
    date: "April 2026",
    verified: true,
  },
  {
    stars: 5,
    text: "Ethixweb did an incredible job on our business website. It is very sharp, modern looking and has all the extra bells and whistles we need. The team was easy to work with, great communication and done in efficient time. They provided all details from start to finish and gave details to us moving forward with our website. I'd highly recommend them!!",
    author: "Kayla Kjl",
    date: "March 2025",
    verified: true,
  },
];

// Live Global Network Nodes & Clocks (globe-data.ts)
export const GLOBAL_NODES = [
  { city: "Seattle", label: "Operations & Active Projects", tz: "America/Los_Angeles", status: "Active" },
  { city: "Utah", label: "Maintenance & Support", tz: "America/Denver", status: "Active" },
  { city: "New York", label: "Strategy & Growth", tz: "America/New_York", status: "Active" },
  { city: "Canada", label: "Dev & Quality Assurance", tz: "America/Toronto", status: "Active" },
  { city: "United Kingdom", label: "Support & Infrastructure", tz: "Europe/London", status: "Active" },
  { city: "India Hub", label: "Engineering & Architecture", tz: "Asia/Kolkata", status: "Core Hub" },
];

export const KEY_METRICS = [
  { value: "50+", label: "Projects Delivered", desc: "Live websites, apps, and automations delivered." },
  { value: "<1h", label: "Avg. Response Time", desc: "Real replies within the hour, always." },
  { value: "US First", label: "Operations Focus", desc: "Proudly based in the United States." },
  { value: "24/7", label: "Global Availability", desc: "Around-the-clock support, every day, everywhere." },
];

// Interactive System Shift items (From ethixweb-site-main SystemShift.tsx)
export const SHIFT_ITEMS = [
  {
    icon: PhoneCall,
    before: "Missed calls",
    after: "Every call answered",
    category: "AI Receptionist",
  },
  {
    icon: Search,
    before: "Invisible on Google",
    after: "Ranking on Google",
    category: "Local SEO",
  },
  {
    icon: Cable,
    before: "Disconnected tools",
    after: "Connected stack",
    category: "CRM Integration",
  },
  {
    icon: Code2,
    before: "Slow, dated site",
    after: "Fast, modern site",
    category: "Web Development",
  },
  {
    icon: Megaphone,
    before: "Wasted ad spend",
    after: "ROI-positive ads",
    category: "Paid Ads",
  },
];

// Authentic Ethixweb FAQs from services.tsx
export const FAQ_ITEMS = [
  {
    q: "Do you only work with home service businesses?",
    a: "It's our specialty, not a limit. Most of our playbooks were sharpened on plumbing, HVAC and electrical contractors - but we also run systems for charter operators, healthcare providers and DTC brands. If your business lives on leads and bookings, the system fits.",
  },
  {
    q: "Can you work with my existing website?",
    a: "Usually, yes. We audit what you have first - if the foundation is solid we improve it instead of rebuilding for the sake of it. If a rebuild genuinely pays for itself, we'll show you the math before touching anything.",
  },
  {
    q: "How do you price projects?",
    a: "Fixed scope, fixed price for builds; a flat monthly rate for ongoing marketing and management. No percentage-of-ad-spend games, and no surprise invoices - every engagement starts with a written scope you approve.",
  },
  {
    q: "How fast can we start?",
    a: "The audit starts within a few business days of a signed scope. Most websites launch in 2-4 weeks; campaigns typically go live in the first two weeks alongside tracking setup.",
  },
  {
    q: "Who actually does the work?",
    a: "The senior team you talk to. No account managers relaying messages, no outsourced production line - the people on your kickoff call are the people building your system.",
  },
];

export const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/ethixweb/" },
  { name: "Instagram", href: "https://www.instagram.com/ethix.web/" },
  { name: "Facebook", href: "https://www.facebook.com/ethixweb" },
];
