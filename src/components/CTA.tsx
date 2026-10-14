import { useState, useId } from "react";
import { ArrowUpRight, Check, Clock, Sparkles } from "lucide-react";
import { BRAND } from "../content/landing";

// Ethixweb 22-service categorized capabilities tailored for the brief selector
const SCOPE_OPTIONS = [
  "Website Redesign",
  "Headless Architecture",
  "AI Receptionist / CSR",
  "Knowledge & LLM Chatbots",
  "SEO & Local Ranking",
  "Google & Meta Ads",
  "Data & Telemetry Dashboard",
  "24/7 Operations Support",
  "Not sure yet",
];

const BUDGET_OPTIONS = [
  "Up to $3,000",
  "$3,000 to $8,000",
  "$8,000 to $20,000",
  "Over $20,000",
  "Open / Flexible",
];

const TIMING_OPTIONS = [
  "As soon as possible",
  "In the next three months",
  "This year",
  "Flexible",
];

export function CTA() {
  const formId = useId();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "Website Redesign",
  ]);
  const [existingWebsite, setExistingWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("$3,000 to $8,000");
  const [timing, setTiming] = useState("In the next three months");

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [renderedAt] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState("");

  // Toggle scope chip selection
  const toggleScope = (scope: string) => {
    if (scope === "Not sure yet") {
      setSelectedScopes(["Not sure yet"]);
      return;
    }
    setSelectedScopes((prev) => {
      const filtered = prev.filter((s) => s !== "Not sure yet");
      return filtered.includes(scope)
        ? filtered.filter((s) => s !== scope)
        : [...filtered, scope];
    });
  };

  // Word count in description
  const wordCount = description.trim()
    ? description.trim().split(/\s+/).length
    : 0;

  // Live Draft Completion Percentage
  let progress = 0;
  if (name.trim()) progress += 15;
  if (email.trim()) progress += 15;
  if (phone.trim()) progress += 15;
  if (company.trim()) progress += 10;
  if (selectedScopes.length > 0) progress += 15;
  if (existingWebsite.trim()) progress += 10;
  if (description.trim().length > 10) progress += 10;
  if (budget) progress += 5;
  if (timing) progress += 5;
  const progressPercent = Math.min(100, progress);

  // Dynamic Wireframe URL Display
  const displayUrl = existingWebsite.trim()
    ? existingWebsite.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : company.trim()
    ? `${company.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`
    : "your-company.com";

  // Dynamic Wireframe Headline
  const wireframeTitle =
    selectedScopes.length > 0 && selectedScopes[0] !== "Not sure yet"
      ? selectedScopes[0]
      : "Your presence";

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
          website: existingWebsite,
          services: selectedScopes,
          budget,
          timing,
          description,
          country: "India / Global",
          source: "landing_cta_form",
          _honey: honeypot,
          _rendered_at: renderedAt,
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      let data: any = {};
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error(
          res.status >= 500
            ? "The server is currently initializing or updating. Please try again in a few moments."
            : `Server returned status ${res.status}`
        );
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      setSubmittedLeadId(data.lead?.id || null);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="cta" className="shell frame relative py-20 md:py-36 border-t border-line bg-paper text-ink transition-colors scroll-mt-20">
      {/* Header Row */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end mb-16 md:mb-24">
        <div className="lg:col-span-7">
          <div className="measure text-steel flex items-center gap-2 mb-3">
            <span className="text-accent font-bold font-mono text-xs">10</span>
            <span className="h-px w-6 bg-line" />
            <span className="font-mono text-xs uppercase tracking-widest">START A PROJECT</span>
          </div>
          <h2 className="display-1 text-ink font-display tracking-tight text-4xl sm:text-6xl md:text-7xl font-bold leading-[0.96]">
            Tell us about
            <br />
            your project<span className="text-accent">.</span>
          </h2>
        </div>

        <div className="lg:col-span-5 lg:pb-3">
          <p className="lead text-ink-2 max-w-md text-base sm:text-lg leading-relaxed">
            A few answers are enough. You get an honest assessment of how your website sells, where it loses people, and a fixed-price architectural quote.
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Form Sections */}
        <div className="lg:col-span-7 space-y-14">
          <form id={formId} action="/api/leads" method="POST" onSubmit={handleSubmit} aria-label="Project Brief Enquiry Form" className="space-y-14">
            {/* 01 About you */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-line">
                <span className="font-mono text-sm text-accent font-bold">01</span>
                <h3 className="font-display text-xl font-bold text-ink">About you</h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${formId}-name`} className="block text-xs font-mono uppercase tracking-wider text-steel mb-2">
                    Name *
                  </label>
                  <input
                    id={`${formId}-name`}
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full rounded-xl border border-line bg-paper-2/40 px-4 py-3.5 text-ink placeholder:text-steel/50 focus:border-accent focus:bg-paper focus:outline-hidden transition-all text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label htmlFor={`${formId}-email`} className="block text-xs font-mono uppercase tracking-wider text-steel mb-2">
                    Email *
                  </label>
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-line bg-paper-2/40 px-4 py-3.5 text-ink placeholder:text-steel/50 focus:border-accent focus:bg-paper focus:outline-hidden transition-all text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label htmlFor={`${formId}-company`} className="block text-xs font-mono uppercase tracking-wider text-steel mb-2">
                    Company
                  </label>
                  <input
                    id={`${formId}-company`}
                    name="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Inc."
                    className="w-full rounded-xl border border-line bg-paper-2/40 px-4 py-3.5 text-ink placeholder:text-steel/50 focus:border-accent focus:bg-paper focus:outline-hidden transition-all text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label htmlFor={`${formId}-phone`} className="block text-xs font-mono uppercase tracking-wider text-steel mb-2">
                    Phone *
                  </label>
                  <input
                    id={`${formId}-phone`}
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-line bg-paper-2/40 px-4 py-3.5 text-ink placeholder:text-steel/50 focus:border-accent focus:bg-paper focus:outline-hidden transition-all text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* 02 The project */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-line">
                <span className="font-mono text-sm text-accent font-bold">02</span>
                <h3 className="font-display text-xl font-bold text-ink">The project</h3>
              </div>

              {/* What is it about? */}
              <div>
                <label id={`${formId}-scope-label`} className="block text-sm font-semibold text-ink mb-3">
                  What is it about?
                </label>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-labelledby={`${formId}-scope-label`}
                >
                  {SCOPE_OPTIONS.map((scope) => {
                    const isSelected = selectedScopes.includes(scope);
                    return (
                      <button
                        key={scope}
                        type="button"
                        role="checkbox"
                        aria-checked={isSelected}
                        aria-label={`Select scope: ${scope}`}
                        onClick={() => toggleScope(scope)}
                        className={`rounded-full border px-4 py-2 text-xs font-mono transition-all cursor-pointer select-none ${
                          isSelected
                            ? "border-accent bg-accent text-white font-semibold shadow-xs"
                            : "border-line bg-paper-2/60 text-ink/80 hover:border-line hover:text-ink hover:bg-paper-2"
                        }`}
                      >
                        {isSelected && <span className="inline-block mr-1">✓</span>}
                        <span>{scope}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Existing website */}
              <div>
                <label htmlFor={`${formId}-website`} className="block text-sm font-semibold text-ink mb-2">
                  Existing website
                </label>
                <input
                  id={`${formId}-website`}
                  name="website"
                  type="text"
                  value={existingWebsite}
                  onChange={(e) => setExistingWebsite(e.target.value)}
                  placeholder="www.yourcompany.com"
                  className="w-full rounded-xl border border-line bg-paper-2/40 px-4 py-3.5 text-ink placeholder:text-steel/50 focus:border-accent focus:bg-paper focus:outline-hidden transition-all text-sm sm:text-base"
                />
                <span className="block mt-1.5 text-xs text-steel">
                  If there is already something we should look at before our call.
                </span>
              </div>

              {/* Tell me about it */}
              <div>
                <label htmlFor={`${formId}-description`} className="block text-sm font-semibold text-ink mb-2">
                  Tell us about it *
                </label>
                <textarea
                  id={`${formId}-description`}
                  name="description"
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about your business, your goals, and where you need help (e.g. redesign, AI booking agents, SEO, or ads)."
                  className="w-full rounded-xl border border-line bg-paper-2/40 p-4 text-ink placeholder:text-steel/50 focus:border-accent focus:bg-paper focus:outline-hidden transition-all text-sm sm:text-base resize-y"
                />
                <span className="block mt-1.5 text-xs text-steel">
                  Tell us where your website or pipeline is losing leads, and what outcome you want to achieve.
                </span>
              </div>

              {/* Budget Chips */}
              <div>
                <label id={`${formId}-budget-label`} className="block text-sm font-semibold text-ink mb-3">
                  Budget
                </label>
                <div
                  className="flex flex-wrap gap-2"
                  role="radiogroup"
                  aria-labelledby={`${formId}-budget-label`}
                >
                  {BUDGET_OPTIONS.map((opt) => {
                    const isSelected = budget === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={`Select budget: ${opt}`}
                        onClick={() => setBudget(opt)}
                        className={`rounded-full border px-4 py-2 text-xs font-mono transition-all cursor-pointer select-none ${
                          isSelected
                            ? "border-accent bg-accent text-white font-semibold shadow-xs"
                            : "border-line bg-paper-2/60 text-ink/80 hover:border-line hover:text-ink hover:bg-paper-2"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timing Chips */}
              <div>
                <label id={`${formId}-timing-label`} className="block text-sm font-semibold text-ink mb-3">
                  Timing
                </label>
                <div
                  className="flex flex-wrap gap-2"
                  role="radiogroup"
                  aria-labelledby={`${formId}-timing-label`}
                >
                  {TIMING_OPTIONS.map((opt) => {
                    const isSelected = timing === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={`Select timing: ${opt}`}
                        onClick={() => setTiming(opt)}
                        className={`rounded-full border px-4 py-2 text-xs font-mono transition-all cursor-pointer select-none ${
                          isSelected
                            ? "border-accent bg-accent text-white font-semibold shadow-xs"
                            : "border-line bg-paper-2/60 text-ink/80 hover:border-line hover:text-ink hover:bg-paper-2"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Honeypot anti-spam hidden field */}
            <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
              <label htmlFor="cta_company_fax">Do not fill this</label>
              <input
                id="cta_company_fax"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* Error Message Display */}
            {errorMessage && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-mono text-red-600 dark:text-red-400">
                <span>Error: {errorMessage}</span>
              </div>
            )}

            {/* Submission Row */}
            <div className="pt-4 border-t border-line space-y-4">
              <p className="text-xs text-steel leading-relaxed">
                We only use your details to answer your enquiry and prepare your technical roadmap. More in our privacy terms.
              </p>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-ink flex items-start gap-4">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-display font-bold text-base text-ink">
                        Enquiry saved to operations database.
                      </h4>
                      {submittedLeadId && (
                        <span className="font-mono text-[11px] bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                          Lead Reference #{submittedLeadId}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-ink-2 mt-1">
                      Our senior team will review your stack for {displayUrl} and reply with your technical and commercial proposal within one business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setEmail("");
                        setPhone("");
                        setCompany("");
                        setDescription("");
                      }}
                      className="mt-3 text-xs font-mono font-semibold text-accent hover:underline cursor-pointer"
                    >
                      ← Submit another project inquiry
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
                    <span>{submitting ? "Saving to database..." : "Send the brief"}</span>
                    <span className="btn-dot !bg-accent !text-white group-hover:rotate-45 transition-transform duration-300">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>

                  <div className="flex items-center gap-2 text-xs font-mono text-steel">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>Reply within one business day.</span>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Sticky Interactive "The Draft" Wireframe */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="rounded-2xl border border-line bg-paper-2/50 p-6 backdrop-blur-md shadow-xs space-y-5">
            {/* The Draft Top Header */}
            <div className="flex items-start justify-between pb-4 border-b border-line">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-steel block">
                  The draft
                </span>
                <span className="text-xs text-ink-2 mt-0.5 block">
                  Draws along while you write.
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] uppercase tracking-wider text-steel block">
                  Draft
                </span>
                <span className="font-mono text-3xl font-bold text-steel">
                  {String(progressPercent).padStart(3, "0")}%
                </span>
              </div>
            </div>

            {/* Wireframe Browser Window */}
            <div className="rounded-xl border border-line bg-paper p-4 shadow-2xs space-y-4">
              {/* Browser Window Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-line/60">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-steel/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-steel/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-steel/30" />
                </div>
                {/* Dynamic URL Pill */}
                <span className="rounded-full border border-line bg-paper-2 px-3 py-0.5 text-[11px] font-mono text-steel truncate max-w-[180px] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  <span>{displayUrl}</span>
                </span>
                <span className="w-8" />
              </div>

              {/* Wireframe Page Content */}
              <div className="space-y-4 pt-1">
                {/* Wireframe Header Row */}
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-sm text-ink tracking-tight flex items-center">
                    {BRAND.name.toLowerCase()}
                    <span className="h-1.5 w-1.5 rounded-full bg-accent ml-0.5" />
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1 w-5 rounded-full bg-line" />
                    <span className="h-1 w-5 rounded-full bg-line" />
                    <span className="h-1 w-5 rounded-full bg-line" />
                  </div>
                </div>

                {/* Wireframe Hero Grid */}
                <div className="grid grid-cols-12 gap-3 pt-2 items-center">
                  {/* Left Column: Heading, description lines, CTA */}
                  <div className="col-span-7 space-y-2.5">
                    <h4 className="font-display font-bold text-base text-ink leading-tight line-clamp-2">
                      {wireframeTitle}
                    </h4>
                    <div className="space-y-1">
                      <div
                        className="h-1.5 rounded-full bg-line transition-all duration-300"
                        style={{ width: `${Math.max(45, Math.min(100, wordCount * 5))}%` }}
                      />
                      <div
                        className="h-1.5 rounded-full bg-line transition-all duration-300"
                        style={{ width: `${Math.max(30, Math.min(85, wordCount * 4))}%` }}
                      />
                    </div>
                    {/* Wireframe Button with Red Dot */}
                    <div className="rounded-full border border-ink/80 bg-ink/5 px-3 py-1 text-[10px] font-mono font-medium text-ink flex items-center gap-2 w-fit mt-1">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      <span>Explore</span>
                    </div>
                  </div>

                  {/* Right Column: Architectural Box with X Wireframe */}
                  <div className="col-span-5 aspect-4/3 rounded-lg border border-line bg-paper-2/40 relative overflow-hidden flex items-center justify-center">
                    <svg
                      className="absolute inset-0 h-full w-full stroke-line/70"
                      viewBox="0 0 100 75"
                      preserveAspectRatio="none"
                    >
                      <line x1="0" y1="0" x2="100" y2="75" strokeWidth="1" />
                      <line x1="100" y1="0" x2="0" y2="75" strokeWidth="1" />
                    </svg>
                    <Sparkles className="h-3.5 w-3.5 text-accent relative z-10 opacity-70" />
                  </div>
                </div>
              </div>
            </div>

            {/* Wireframe Telemetry Gauges Below Browser Frame */}
            <div className="space-y-3 pt-2 text-xs font-mono">
              {/* Budget Metric */}
              <div>
                <div className="flex items-center justify-between text-steel mb-1">
                  <span>Budget</span>
                  <span className="text-ink font-semibold">{budget}</span>
                </div>
                <div className="grid grid-cols-5 gap-1 h-1.5">
                  {BUDGET_OPTIONS.map((opt, i) => (
                    <span
                      key={opt}
                      className={`rounded-full transition-colors ${
                        BUDGET_OPTIONS.indexOf(budget) >= i
                          ? "bg-accent"
                          : "bg-line"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Timing Metric */}
              <div>
                <div className="flex items-center justify-between text-steel mb-1">
                  <span>Timing</span>
                  <span className="text-ink font-semibold">{timing}</span>
                </div>
                <div className="grid grid-cols-4 gap-1 h-1.5">
                  {TIMING_OPTIONS.map((opt, i) => (
                    <span
                      key={opt}
                      className={`rounded-full transition-colors ${
                        TIMING_OPTIONS.indexOf(timing) >= i
                          ? "bg-accent"
                          : "bg-line"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Word Count */}
              <div className="flex items-center justify-between text-steel pt-2 border-t border-line">
                <span>Your words</span>
                <span className="font-mono text-ink font-bold">{wordCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
