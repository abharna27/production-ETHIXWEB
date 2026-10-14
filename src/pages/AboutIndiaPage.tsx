import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Cpu,
  Globe2,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";

function useTimezone(tz: string) {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const update = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date());
        setTime(formatted);
      } catch {
        setTime("--:--:--");
      }
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [tz]);
  return time;
}

const COMPARISON_ROWS = [
  {
    feature: "Who actually builds your system",
    ethix: "The senior engineers & architects on your kickoff call",
    others: "Junior developers hidden behind an account manager",
  },
  {
    feature: "Code architecture & foundation",
    ethix: "Clean, bespoke React & TypeScript — zero page builders",
    others: "Bloated WordPress themes & fragile third-party plugins",
  },
  {
    feature: "Performance & load speed",
    ethix: "Sub-second LCP guarantee with 100/100 Lighthouse score",
    others: "3-6s heavy loads with script lag & visual layout shifts",
  },
  {
    feature: "Pricing & commercial transparency",
    ethix: "Fixed scope builds & flat monthly ops in INR (₹) or USD ($)",
    others: "Open-ended retainers, surprise invoices & ad-spend cuts",
  },
  {
    feature: "What gets measured & reported",
    ethix: "Calls, booked jobs, CRM pipeline & real revenue tracked",
    others: "Vanity impressions, clicks & superficial dashboards",
  },
  {
    feature: "Communication & response time",
    ethix: "< 1 hour support response with direct engineer Slack channel",
    others: "Ticket queues, autoresponders & multi-day email relays",
  },
];

const TENETS = [
  {
    icon: Target,
    title: "Revenue obsessed.",
    desc: "We measure success in booked jobs and revenue, not impressions, clicks, vanity metrics, or design awards.",
  },
  {
    icon: Users,
    title: "Senior team only.",
    desc: "You talk directly to the people doing the work. No account managers, no handoffs, no juniors learning on your budget.",
  },
  {
    icon: Zap,
    title: "Move fast, ship clean.",
    desc: "Lean process, weekly iteration. Typical launch in 2–4 weeks with clean code, secure defaults, and ongoing support.",
  },
  {
    icon: ShieldCheck,
    title: "Zero lock-in.",
    desc: "You own 100% of your code, assets, domains, and CRM data from day one. Full independence with zero proprietary lock-in.",
  },
];

export function AboutIndiaPage() {
  const seattleTime = useTimezone("America/Los_Angeles");
  const bangaloreTime = useTimezone("Asia/Kolkata");

  return (
    <div className="pt-24 pb-32">
      {/* Editorial Header */}
      <section className="shell frame relative pt-8 pb-16 md:pb-24 border-b border-line">
        <div className="measure text-steel flex items-center gap-2 mb-4">
          <span className="text-accent font-bold font-mono text-xs">02</span>
          <span className="h-px w-6 bg-line" />
          <span className="font-mono text-xs uppercase tracking-widest">
            THE INDIA STORY // US PRECISION &amp; INDIAN SCALE
          </span>
          <span className="h-px w-6 bg-line" />
          <span className="font-mono text-[11px] text-steel/60">
            SEATTLE ⇄ BANGALORE
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="display-1 text-ink">
              Born in the USA.
              <br />
              Engineered for India<span className="text-accent">.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="lead text-ink-2 text-base md:text-lg leading-relaxed">
              Ethixweb brings the senior technical rigor forged on US enterprises to India’s most ambitious businesses — without the bloated agency theater.
            </p>
          </div>
        </div>

        {/* Live Synchronous Clocks Bar */}
        <div className="mt-12 pt-6 border-t border-line/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          {/* Seattle HQ Clock */}
          <div className="rounded-xl border border-line bg-paper-2/60 p-4 flex items-center justify-between">
            <div>
              <span className="text-steel block text-[10px] uppercase">HQ &amp; STRATEGY</span>
              <span className="font-display font-bold text-sm text-ink">Kent / Seattle, WA</span>
            </div>
            <span className="font-bold text-sm md:text-base text-accent tabular-nums">
              {seattleTime}
            </span>
          </div>

          {/* Bangalore Hub Clock */}
          <div className="rounded-xl border border-line bg-paper-2/60 p-4 flex items-center justify-between">
            <div>
              <span className="text-steel block text-[10px] uppercase">DELIVERY &amp; TECH HUB</span>
              <span className="font-display font-bold text-sm text-ink">Bangalore, India</span>
            </div>
            <span className="font-bold text-sm md:text-base text-accent tabular-nums">
              {bangaloreTime}
            </span>
          </div>

          {/* Operational Model */}
          <div className="rounded-xl border border-line bg-paper-2/60 p-4 flex items-center justify-between">
            <div>
              <span className="text-steel block text-[10px] uppercase">GLOBAL COVERAGE</span>
              <span className="font-display font-bold text-sm text-ink">24/7 Transcontinental</span>
            </div>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>LIVE</span>
            </span>
          </div>

          {/* SLA Standard */}
          <div className="rounded-xl border border-line bg-paper-2/60 p-4 flex items-center justify-between">
            <div>
              <span className="text-steel block text-[10px] uppercase">SUPPORT RESPONSE</span>
              <span className="font-display font-bold text-sm text-ink">&lt; 1 Hour Verified</span>
            </div>
            <span className="font-mono text-steel text-xs">Zero Tickets</span>
          </div>
        </div>
      </section>

      {/* Chapter 01: Why India & The Founding Narrative */}
      <section className="shell frame relative py-20 md:py-28 border-b border-line">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider block mb-2">
              01 // CHAPTER
            </span>
            <h2 className="display-2 text-ink text-3xl md:text-5xl font-bold">
              Why we are bringing Ethixweb to India.
            </h2>
            <p className="lead text-ink-2 mt-4 text-base md:text-lg">
              Indian businesses are expanding faster than ever. Yet their digital stacks are held hostage by sluggish offshore factories and fragmented freelance chaos.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6 text-base md:text-lg text-ink-2 leading-relaxed">
            <p>
              We founded Ethixweb in Washington State, USA, with a singular mission: <strong className="text-ink">eliminate the agency theater</strong>. In North America, we proved that home service contractors, high-stakes trade operators, and enterprise brands double their revenue when they replace bloated agency promises with clean React code, automated AI booking agents, and disciplined CRM attribution.
            </p>
            <p>
              Over the last two years, we watched the Indian market experience a historic digital inflection point. Millions of modern Indian consumers and B2B buyers expect instant digital interactions: sub-second websites, zero-friction booking flows, and intelligent 24/7 conversational agents.
            </p>
            <p>
              Yet the typical agency in India still delivers slow, 4-second WordPress templates crammed with security vulnerabilities, passing clients down to junior coordinators who have never written a line of production code.
            </p>
            <div className="rounded-2xl border border-line bg-paper-2/70 p-6 md:p-8 mt-6">
              <h3 className="font-display font-bold text-xl text-ink">
                Our India Commitment:
              </h3>
              <p className="mt-2 text-sm text-ink-2">
                We are bringing the exact same US senior engineering architecture, high-availability infrastructure, and conversion psychology to Indian enterprises, SMEs, and ambitious founders. You get transparent pricing in Indian Rupees (₹), direct access to senior builders, and measurable revenue impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 02: The 24/7 Transcontinental Engine */}
      <section className="shell frame relative py-20 md:py-32 border-b border-line bg-paper-2/20">
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider block mb-2">
            02 // THE OPERATIONAL ADVANTAGE
          </span>
          <h2 className="display-2 text-ink">
            The 24/7 Transcontinental Engine.
          </h2>
          <p className="lead text-ink-2 mt-4 text-base md:text-lg">
            Seattle and Bangalore operating in lockstep. Continuous velocity without downtime.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-line bg-paper p-8 flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-6 font-bold">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink">
                Seattle Architecture &amp; Strategy
              </h3>
              <p className="mt-3 text-sm text-ink-2 leading-relaxed">
                Strategic positioning, conversion psychology, and enterprise systems design crafted directly in the Pacific Northwest technology corridor.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line text-xs font-mono text-steel">
              PST / UTC-8 · Kent, Washington
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-8 flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-6 font-bold">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink">
                Bangalore Engineering Hub
              </h3>
              <p className="mt-3 text-sm text-ink-2 leading-relaxed">
                World-class full-stack engineers crafting clean TypeScript, automated testing, API pipelines, and autonomous AI agents around the clock.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line text-xs font-mono text-steel">
              IST / UTC+5:30 · Karnataka, India
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-8 flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-6 font-bold">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink">
                Continuous Handover Cycle
              </h3>
              <p className="mt-3 text-sm text-ink-2 leading-relaxed">
                While North America rests, India tests and builds. While India rests, the US validates and optimizes. Zero stalled projects.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line text-xs font-mono text-steel">
              24/7 Global SLA · Zero Idle Time
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 03: Direct Comparison Matrix */}
      <section className="shell frame relative py-20 md:py-32 border-b border-line">
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider block mb-2">
            03 // DIRECT COMPARISON
          </span>
          <h2 className="display-2 text-ink">
            Ethixweb vs Traditional Agencies.
          </h2>
          <p className="lead text-ink-2 mt-4 text-base md:text-lg">
            How our senior delivery model contrasts with the outdated agency status quo.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-line text-xs font-mono text-steel uppercase tracking-wider">
                <th className="py-4 pr-6 font-semibold w-1/4">Evaluation Point</th>
                <th className="py-4 px-6 font-semibold text-accent w-2/5">
                  Ethixweb (US + India Model)
                </th>
                <th className="py-4 pl-6 font-semibold text-neutral-500 w-1/3">
                  Typical Offshore / Local Agency
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-sm">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="hover:bg-paper-2/40 transition-colors">
                  <td className="py-5 pr-6 font-display font-bold text-ink">
                    {row.feature}
                  </td>
                  <td className="py-5 px-6 font-medium text-ink bg-accent/5">
                    <span className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>{row.ethix}</span>
                    </span>
                  </td>
                  <td className="py-5 pl-6 text-steel">
                    {row.others}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Chapter 04: Core Values & Guiding Tenets */}
      <section className="shell frame relative py-20 md:py-32 border-b border-line bg-paper-2/30">
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider block mb-2">
            04 // VALUES &amp; STANDARDS
          </span>
          <h2 className="display-2 text-ink">
            What we stand for.
          </h2>
          <p className="lead text-ink-2 mt-4 text-base md:text-lg">
            Core principles that guide every single line of code and customer engagement.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TENETS.map((tenet) => (
            <div
              key={tenet.title}
              className="rounded-2xl border border-line bg-paper p-8 flex flex-col justify-between hover:border-accent transition-all"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-6">
                  <tenet.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-ink">
                  {tenet.title}
                </h3>
                <p className="mt-3 text-sm text-ink-2 leading-relaxed">
                  {tenet.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line text-[11px] font-mono text-steel">
                Zero Compromise
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA to Contact Page */}
      <section className="shell frame relative pt-16 pb-8">
        <div className="rounded-3xl border border-line bg-paper-2 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider block mb-1">
              EXPAND WITH US
            </span>
            <h3 className="display-2 text-ink text-2xl md:text-4xl font-bold">
              Ready to partner with a senior digital operations team?
            </h3>
            <p className="text-ink-2 mt-2 text-sm md:text-base max-w-xl">
              Tell us about your business goals in India or globally. We will study your current setup and reply with an architectural plan within one business day.
            </p>
          </div>

          <Link
            to="/contact"
            className="btn btn-primary h-14 !px-8 text-sm font-bold tracking-wide uppercase shrink-0"
          >
            <span>Talk to senior builders</span>
            <span className="btn-dot">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
