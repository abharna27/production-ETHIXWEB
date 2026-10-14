import { useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  ExternalLink,
} from "lucide-react";
import { BRAND } from "../content/landing";

const SCOPES = [
  "Website Redesign",
  "Headless Architecture",
  "AI Receptionist / CSR",
  "Knowledge & LLM Chatbots",
  "SEO & Local Ranking",
  "Google & Meta Ads",
  "Data & Telemetry Dashboard",
  "24/7 Operations Support",
  "India Expansion Setup",
];

const BUDGET_OPTIONS_INR = [
  "₹1.5L to ₹3L",
  "₹3L to ₹8L",
  "₹8L to ₹20L",
  "₹20L+",
  "Flexible / Scope Dependent",
];

const TIMING_OPTIONS = [
  "As soon as possible",
  "Next 1-2 months",
  "This quarter",
  "Flexible",
];

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "Website Redesign",
  ]);
  const [budget, setBudget] = useState("₹3L to ₹8L");
  const [timing, setTiming] = useState("As soon as possible");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("India");

  // Anti-spam & Submission State
  const [honeypot, setHoneypot] = useState("");
  const [renderedAt] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleScope = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope)
        ? prev.filter((s) => s !== scope)
        : [...prev, scope]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          website,
          services: selectedScopes,
          budget,
          timing,
          description,
          country,
          source: "contact_page_form",
          _honey: honeypot,
          _rendered_at: renderedAt,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      setLeadId(data.lead?.id || null);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-32">
      {/* Editorial Header */}
      <section className="shell frame relative pt-8 pb-16 md:pb-24 border-b border-line">
        <div className="measure text-steel flex items-center gap-2 mb-4">
          <span className="text-accent font-bold font-mono text-xs">03</span>
          <span className="h-px w-6 bg-line" />
          <span className="font-mono text-xs uppercase tracking-widest">
            CONTACT &amp; DIRECT CONSULTATION DESK
          </span>
          <span className="h-px w-6 bg-line" />
          <span className="font-mono text-[11px] text-steel/60">
            KENT, WA ⇄ BANGALORE
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="display-1 text-ink">
              Let&apos;s build your
              <br />
              digital operation<span className="text-accent">.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="lead text-ink-2 text-base md:text-lg leading-relaxed">
              Share three or four details. We will study your site, analyze where your pipeline loses leads, and reply with an architectural proposal within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Location Info */}
      <section className="shell frame relative py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column: Interactive Enquiry Form */}
          <div className="lg:col-span-7 space-y-12">
            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* Step 01: Contact Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-line">
                  <span className="font-mono text-sm text-accent font-bold">01</span>
                  <h2 className="font-display text-xl font-bold text-ink">About you &amp; your business</h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-steel mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Mehta"
                      className="w-full rounded-xl border border-line bg-paper-2/40 px-4 py-3.5 text-ink placeholder:text-steel/50 focus:border-accent focus:bg-paper focus:outline-hidden transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-steel mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vikram@company.in"
                      className="w-full rounded-xl border border-line bg-paper-2/40 px-4 py-3.5 text-ink placeholder:text-steel/50 focus:border-accent focus:bg-paper focus:outline-hidden transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-steel mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-line bg-paper-2/40 px-4 py-3.5 text-ink placeholder:text-steel/50 focus:border-accent focus:bg-paper focus:outline-hidden transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-steel mb-2">
                      Company / Brand Name
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Mehta Enterprises"
                      className="w-full rounded-xl border border-line bg-paper-2/40 px-4 py-3.5 text-ink placeholder:text-steel/50 focus:border-accent focus:bg-paper focus:outline-hidden transition-all text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-steel mb-2">
                      Current Website (if active)
                    </label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourcompany.com"
                      className="w-full rounded-xl border border-line bg-paper-2/40 px-4 py-3.5 text-ink placeholder:text-steel/50 focus:border-accent focus:bg-paper focus:outline-hidden transition-all text-sm"
                    />
                    <span className="block mt-1 text-xs text-steel">
                      We will inspect its speed, SEO, and lead leakage points before our discovery call.
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 02: Scope of Engagement */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-line">
                  <span className="font-mono text-sm text-accent font-bold">02</span>
                  <h2 className="font-display text-xl font-bold text-ink">Scope &amp; Objectives</h2>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-3">
                    Where do you need support?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SCOPES.map((scope) => {
                      const isSelected = selectedScopes.includes(scope);
                      return (
                        <button
                          key={scope}
                          type="button"
                          onClick={() => toggleScope(scope)}
                          className={`rounded-full border px-4 py-2 text-xs font-mono transition-all cursor-pointer ${
                            isSelected
                              ? "border-accent bg-accent text-white font-semibold shadow-xs"
                              : "border-line bg-paper-2/60 text-ink/80 hover:border-line hover:text-ink"
                          }`}
                        >
                          {isSelected && <span className="mr-1">✓</span>}
                          {scope}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Selection */}
                <div>
                  <label className="block text-sm font-semibold text-ink mb-3">
                    Estimated Budget Bracket
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS_INR.map((b) => {
                      const isSelected = budget === b;
                      return (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={`rounded-full border px-4 py-2 text-xs font-mono transition-all cursor-pointer ${
                            isSelected
                              ? "border-accent bg-accent text-white font-semibold shadow-xs"
                              : "border-line bg-paper-2/60 text-ink/80 hover:border-line hover:text-ink"
                          }`}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Timing Selection */}
                <div>
                  <label className="block text-sm font-semibold text-ink mb-3">
                    Desired Timeline
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TIMING_OPTIONS.map((t) => {
                      const isSelected = timing === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTiming(t)}
                          className={`rounded-full border px-4 py-2 text-xs font-mono transition-all cursor-pointer ${
                            isSelected
                              ? "border-accent bg-accent text-white font-semibold shadow-xs"
                              : "border-line bg-paper-2/60 text-ink/80 hover:border-line hover:text-ink"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Country Selection */}
                <div>
                  <label className="block text-sm font-semibold text-ink mb-3">
                    Your Operating Location / Country
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["India", "United States", "United Kingdom", "Other"].map((c) => {
                      const isSelected = country === c;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCountry(c)}
                          className={`rounded-full border px-4 py-2 text-xs font-mono transition-all cursor-pointer ${
                            isSelected
                              ? "border-accent bg-accent text-white font-semibold shadow-xs"
                              : "border-line bg-paper-2/60 text-ink/80 hover:border-line hover:text-ink"
                          }`}
                        >
                          {isSelected && <span className="mr-1">✓</span>}
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your current bottlenecks, target customers, and what concrete business outcome you want to achieve."
                    className="w-full rounded-xl border border-line bg-paper-2/40 p-4 text-ink placeholder:text-steel/50 focus:border-accent focus:bg-paper focus:outline-hidden transition-all text-sm resize-y"
                  />
                </div>
              </div>

              {/* Honeypot anti-spam field */}
              <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                <label htmlFor="company_fax">Leave blank</label>
                <input
                  id="company_fax"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Error display */}
              {errorMessage && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-mono text-red-600 dark:text-red-400">
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-4 border-t border-line space-y-4">
                <p className="text-xs text-steel leading-relaxed">
                  Every enquiry is confidential. We never sell your data or place you on cold call lists.
                </p>

                {submitted ? (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-ink flex items-start gap-4">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display font-bold text-base text-ink">
                          Enquiry received &amp; registered in database.
                        </h3>
                        {leadId && (
                          <span className="font-mono text-[11px] bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                            Lead Reference #{leadId}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-ink-2 mt-1">
                        Our senior engineering team will study your stack and reply within one business day.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setName("");
                          setEmail("");
                          setPhone("");
                          setDescription("");
                        }}
                        className="mt-3 text-xs font-mono font-semibold text-accent hover:underline cursor-pointer"
                      >
                        ← Submit another inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-5">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary h-14 !px-8 text-sm font-bold tracking-wide uppercase rounded-full bg-ink text-paper group shadow-lg hover:scale-[1.01] transition-transform"
                    >
                      <span>{submitting ? "Saving to database..." : "Submit enquiry"}</span>
                      <span className="btn-dot !bg-accent !text-white group-hover:rotate-45 transition-transform duration-300">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </button>

                    <div className="flex items-center gap-2 text-xs font-mono text-steel">
                      <Clock className="h-4 w-4 text-accent" />
                      <span>Guaranteed reply in &lt; 24h</span>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Dual Office Locations & Fast Lane Calendar */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            
            {/* Instant Fast-Lane Calendar Card */}
            <div className="rounded-2xl border border-accent/40 bg-accent/[0.04] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" />
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold">
                  FAST-LANE DISCOVERY
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-ink">
                Prefer an immediate conversation?
              </h3>
              <p className="text-xs text-ink-2 leading-relaxed">
                Skip the questionnaire and book a direct 30-minute video session with our senior engineers and solutions architects.
              </p>
              <a
                href={BRAND.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full justify-center h-11 text-xs font-bold tracking-wider uppercase"
              >
                <span>Open Calendly Schedule</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </a>
            </div>

            {/* US Headquarters Desk */}
            <div className="rounded-2xl border border-line bg-paper-2/40 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-steel uppercase">US OPERATIONS HEADQUARTERS</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h4 className="font-display font-bold text-base text-ink">
                Ethixweb USA LLC
              </h4>
              <p className="text-xs text-steel font-mono">
                Kent · Seattle, Washington, United States
                <br />
                Registered in Wyoming, USA
              </p>
              <div className="pt-2 text-xs font-mono text-ink space-y-1">
                <p>Email: <a href="mailto:info@ethixweb.com" className="text-accent hover:underline">info@ethixweb.com</a></p>
                <p>Hours: Mon–Fri · 9:00 AM – 5:00 PM PST</p>
              </div>
            </div>

            {/* India Operations & Delivery Hub Desk */}
            <div className="rounded-2xl border border-line bg-paper-2/40 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-steel uppercase">INDIA DELIVERY &amp; TECH HUB</span>
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              </div>
              <h4 className="font-display font-bold text-base text-ink">
                Ethixweb India Engineering Center
              </h4>
              <p className="text-xs text-steel font-mono">
                Bangalore Technology Corridor, Karnataka, India
              </p>
              <div className="pt-2 text-xs font-mono text-ink space-y-1">
                <p>Email: <a href="mailto:india@ethixweb.com" className="text-accent hover:underline">india@ethixweb.com</a></p>
                <p>Hours: 24/7 Transcontinental Engineering Desk</p>
              </div>
            </div>

            {/* Trustpilot Review Metric */}
            <div className="rounded-2xl border border-line bg-paper p-5 flex items-center justify-between">
              <div>
                <span className="font-display font-extrabold text-xl text-ink">4.0 / 5.0</span>
                <span className="text-xs text-steel font-mono block">Trustpilot Score</span>
              </div>
              <a
                href={BRAND.trustpilotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-accent hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Read verified reviews</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
