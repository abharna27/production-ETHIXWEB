import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Telescope,
  Map,
  Hammer,
  TrendingUp,
  Plus,
} from "lucide-react";
import { SERVICE_CATALOG, FAQ_ITEMS, BRAND } from "../content/landing";
import { InspectorTarget } from "../components/InspectorTarget";

const ENGAGEMENT_STEPS = [
  {
    icon: Telescope,
    num: "01",
    title: "Audit",
    desc: "We tear down your current site, ads, and tracking, and show you exactly where leads leak.",
    sla: "Days 1–3",
  },
  {
    icon: Map,
    num: "02",
    title: "Plan",
    desc: "A prioritized roadmap with expected impact per item — you approve what we build, and why.",
    sla: "Days 4–7",
  },
  {
    icon: Hammer,
    num: "03",
    title: "Build",
    desc: "Senior hands ship the site, campaigns, and integrations in weeks, not quarters.",
    sla: "Weeks 2–4",
  },
  {
    icon: TrendingUp,
    num: "04",
    title: "Optimize",
    desc: "Weekly iteration on real data: calls, bookings, and revenue — not vanity dashboards.",
    sla: "Continuous",
  },
];

const PRICING_TIERS = [
  {
    title: "Fixed Scope Build",
    badge: "One-Time Delivery",
    desc: "A ground-up redesign, web application, or custom AI agent integration built bespoke with zero page builders.",
    priceUsd: "From $3,500",
    priceInr: "From ₹2,40,000",
    features: [
      "Bespoke React + TypeScript code",
      "Sub-second load time guarantee (100 Lighthouse)",
      "CRM & lead pipeline integration",
      "WCAG 2.1 AA accessibility compliance",
      "2-4 weeks typical launch time",
      "Full code ownership & zero lock-in",
    ],
    cta: "Start a build",
  },
  {
    title: "Dedicated Operations",
    badge: "Most Popular",
    desc: "A senior technology team managing your stack, AI agents, SEO, Google/Meta ads, and daily updates.",
    priceUsd: "From $1,200 / mo",
    priceInr: "From ₹75,000 / mo",
    popular: true,
    features: [
      "AI receptionist & knowledge base updates",
      "SEO compounding & content publishing",
      "Google Ads + Meta Ads weekly optimization",
      "< 1 hour response time SLA",
      "Live telemetry dashboard & reporting",
      "Dedicated Slack channel with senior team",
    ],
    cta: "Retain our team",
  },
  {
    title: "Enterprise & Scale",
    badge: "Custom Architecture",
    desc: "Multi-location booking systems, complex custom workflows, high-volume automated dispatch, and compliance.",
    priceUsd: "Custom Scope",
    priceInr: "Custom Scope",
    features: [
      "Multi-tenant application architecture",
      "High-availability 99.99% uptime guarantee",
      "Dual US & India 24/7 engineering coverage",
      "Custom LLM fine-tuning on internal data",
      "Dedicated senior solutions architect",
      "Priority on-call emergency escalation",
    ],
    cta: "Consult an architect",
  },
];

export function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const categories = ["All", ...SERVICE_CATALOG.map((c) => c.title)];

  const filteredCategories =
    selectedCategory === "All"
      ? SERVICE_CATALOG
      : SERVICE_CATALOG.filter((c) => c.title === selectedCategory);

  return (
    <div className="pt-24 pb-32">
      {/* Editorial Header */}
      <section className="shell frame relative pt-8 pb-16 md:pb-24 border-b border-line">
        <div className="measure text-steel flex items-center gap-2 mb-4">
          <span className="text-accent font-bold font-mono text-xs">01</span>
          <span className="h-px w-6 bg-line" />
          <span className="font-mono text-xs uppercase tracking-widest">
            SERVICES &amp; CAPABILITIES CATALOG
          </span>
          <span className="h-px w-6 bg-line" />
          <span className="font-mono text-[11px] text-steel/60">
            {BRAND.coordinates} ⇄ BANGALORE
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="display-1 text-ink">
              Everything your business
              <br />
              needs online<span className="text-accent">.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="lead text-ink-2 text-base md:text-lg leading-relaxed">
              22 services across website, AI, growth, data, accessibility, and support — run by one accountable senior team instead of five disconnected vendors.
            </p>
          </div>
        </div>

        {/* Currency Switcher & Quick Meta Bar */}
        <div className="mt-12 pt-6 border-t border-line/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-steel uppercase tracking-wider">
              PRICING CURRENCY:
            </span>
            <div className="flex items-center rounded-full border border-line bg-paper-2 p-1">
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`rounded-full px-3 py-1 text-xs font-mono font-medium transition-all cursor-pointer ${
                  currency === "INR"
                    ? "bg-accent text-white shadow-xs"
                    : "text-steel hover:text-ink"
                }`}
              >
                ₹ INR (India)
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`rounded-full px-3 py-1 text-xs font-mono font-medium transition-all cursor-pointer ${
                  currency === "USD"
                    ? "bg-ink text-paper shadow-xs"
                    : "text-steel hover:text-ink"
                }`}
              >
                $ USD (Global)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-steel">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Zero page builders</span>
            </span>
            <span>·</span>
            <span>Hand-crafted React &amp; TypeScript</span>
            <span>·</span>
            <span>24/7 Global SLA</span>
          </div>
        </div>
      </section>

      {/* Category Filter Nav */}
      <section className="shell frame relative py-8 border-b border-line bg-paper sticky top-[var(--nav-h)] z-20 backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full border px-4 py-2 text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "border-accent bg-accent text-white font-semibold shadow-xs"
                    : "border-line bg-paper-2/60 text-ink/75 hover:border-ink hover:text-ink"
                }`}
              >
                {cat}
                {cat === "All" && ` (22)`}
              </button>
            );
          })}
        </div>
      </section>

      {/* Full 22 Services Detailed Catalog */}
      <section className="shell frame relative py-16 md:py-24">
        <div className="space-y-20">
          {filteredCategories.map((category, catIdx) => (
            <div key={category.title} className="space-y-8">
              {/* Pillar Header */}
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-line">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-accent font-bold bg-paper-2 px-2.5 py-1 rounded-full border border-line">
                    0{catIdx + 1} // PILLAR
                  </span>
                  <h2 className="display-2 text-ink text-2xl md:text-3xl font-bold">
                    {category.title}
                  </h2>
                </div>
                <p className="text-xs md:text-sm text-steel font-mono max-w-md">
                  {category.teaser}
                </p>
              </div>

              {/* Pillar Subservices Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <InspectorTarget key={item.title} tag={item.title} magnetic={false} className="h-full">
                    <div className="rounded-2xl border border-line bg-paper-2/40 p-6 md:p-8 h-full flex flex-col justify-between hover:border-accent hover:bg-paper transition-all group">
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                            <item.icon className="h-5 w-5" />
                          </div>
                          <span className="font-mono text-[10px] uppercase text-steel bg-paper px-2 py-0.5 rounded border border-line">
                            Production Ready
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-lg md:text-xl text-ink group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm text-ink-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs font-mono">
                        <span className="text-steel flex items-center gap-1">
                          <Clock className="h-3 w-3 text-accent" />
                          <span>1–3 wks</span>
                        </span>

                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-1 font-semibold text-ink group-hover:text-accent transition-colors"
                        >
                          <span>Inquire</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </InspectorTarget>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Rhythm (The 4-Step Operating Process from services.tsx) */}
      <section className="shell frame relative py-20 md:py-32 border-t border-line bg-paper-2/30">
        <div className="max-w-2xl mb-16">
          <div className="measure text-steel flex items-center gap-2 mb-3">
            <span className="text-accent font-bold font-mono text-xs">02</span>
            <span className="h-px w-6 bg-line" />
            <span className="font-mono text-xs uppercase tracking-widest">
              OPERATING MODEL &amp; RHYTHM
            </span>
          </div>
          <h2 className="display-2 text-ink">
            A clear process.
            <br />
            Zero guesswork<span className="text-accent">.</span>
          </h2>
          <p className="lead text-ink-2 mt-4 text-base md:text-lg">
            From the initial audit to launch day, you always know what is shipping, why it was prioritized, and what impact it moved.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ENGAGEMENT_STEPS.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-line bg-paper p-8 flex flex-col justify-between hover:border-accent transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-extrabold text-3xl text-accent">
                    {step.num}
                  </span>
                  <span className="font-mono text-[11px] text-steel bg-paper-2 px-2.5 py-1 rounded-full border border-line">
                    {step.sla}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-ink-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line text-[11px] font-mono text-steel flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                <span>Zero black boxes</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transparent Pricing Cards (USD / INR Toggleable) */}
      <section className="shell frame relative py-20 md:py-32 border-t border-line">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div>
            <div className="measure text-steel flex items-center gap-2 mb-3">
              <span className="text-accent font-bold font-mono text-xs">03</span>
              <span className="h-px w-6 bg-line" />
              <span className="font-mono text-xs uppercase tracking-widest">
                TRANSPARENT COMMERCIAL TERMS
              </span>
            </div>
            <h2 className="display-2 text-ink">
              Fixed scope builds.
              <br />
              Flat monthly management<span className="text-accent">.</span>
            </h2>
            <p className="lead text-ink-2 mt-4 max-w-xl">
              No percentage-of-ad-spend games. No surprise invoices. Every engagement starts with a written scope you approve.
            </p>
          </div>

          {/* Currency Pill */}
          <div className="flex items-center gap-2 rounded-full border border-line bg-paper p-1.5 shadow-xs">
            <span className="text-xs font-mono text-steel pl-2">Displaying:</span>
            <button
              type="button"
              onClick={() => setCurrency("INR")}
              className={`rounded-full px-3 py-1 text-xs font-mono font-medium transition-all cursor-pointer ${
                currency === "INR"
                  ? "bg-accent text-white shadow-xs"
                  : "text-steel hover:text-ink"
              }`}
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`rounded-full px-3 py-1 text-xs font-mono font-medium transition-all cursor-pointer ${
                currency === "USD"
                  ? "bg-ink text-paper shadow-xs"
                  : "text-steel hover:text-ink"
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.title}
              className={`rounded-2xl border p-8 flex flex-col justify-between transition-all ${
                tier.popular
                  ? "border-accent bg-paper shadow-lg relative"
                  : "border-line bg-paper-2/40 hover:border-ink hover:bg-paper"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-8 rounded-full bg-accent text-white px-3 py-0.5 text-[11px] font-mono font-bold tracking-wider uppercase">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-xl text-ink">
                    {tier.title}
                  </h3>
                  {!tier.popular && (
                    <span className="text-[10px] font-mono uppercase text-steel">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <div className="font-display text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-2">
                  {currency === "INR" ? tier.priceInr : tier.priceUsd}
                </div>

                <p className="text-xs md:text-sm text-ink-2 leading-relaxed mb-6">
                  {tier.desc}
                </p>

                <ul className="space-y-3 pt-6 border-t border-line text-xs font-mono text-ink">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-line">
                <Link
                  to="/contact"
                  className={`btn w-full justify-center h-12 text-xs font-bold tracking-wider uppercase ${
                    tier.popular ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  <span>{tier.cta}</span>
                  <span className="btn-dot">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services FAQ Accordion */}
      <section className="shell frame relative py-20 md:py-28 border-t border-line">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="measure text-steel flex items-center gap-2 mb-3">
              <span className="text-accent font-bold font-mono text-xs">04</span>
              <span className="h-px w-6 bg-line" />
              <span className="font-mono text-xs uppercase tracking-widest">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>
            <h2 className="display-2 text-ink">
              Direct answers.
              <br />
              No corporate speak.
            </h2>
            <p className="lead text-ink-2 mt-4 text-base">
              Clear commitments on how we work, deliverables, and SLAs.
            </p>
          </div>

          <div className="lg:col-span-7 divide-y divide-line border-y border-line">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={item.q} className="py-6 transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="flex w-full items-start justify-between gap-6 text-left cursor-pointer group"
                  >
                    <span
                      className={`font-display text-lg md:text-xl font-medium transition-colors ${
                        isOpen ? "text-accent" : "text-ink group-hover:text-accent"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-paper-2 transition-transform duration-300 ${
                        isOpen ? "rotate-45 border-accent text-accent" : "text-steel"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-4 pr-12">
                      <p className="text-base text-ink-2 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="shell frame relative pt-12 pb-8">
        <div className="rounded-3xl border border-line bg-paper-2 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="display-2 text-ink text-2xl md:text-4xl font-bold">
              Ready to revamp your digital operation?
            </h3>
            <p className="text-ink-2 mt-2 text-sm md:text-base max-w-xl">
              Get an honest assessment of your current website, ads, and conversion pipeline before spending a single dollar.
            </p>
          </div>

          <Link
            to="/contact"
            className="btn btn-primary h-14 !px-8 text-sm font-bold tracking-wide uppercase shrink-0"
          >
            <span>Start your project</span>
            <span className="btn-dot">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
