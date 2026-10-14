import { useState } from "react";
import { ArrowUpRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { SERVICE_CATALOG } from "../content/landing";
import { InspectorTarget } from "./InspectorTarget";


const SERVICE_IMAGES: Record<string, string> = {
  Website: "/images/services/service-website.jpg",
  AI: "/images/services/service-ai.jpg",
  Growth: "/images/services/service-growth.jpg",
  Data: "/images/services/service-data.jpg",
  Accessibility: "/images/services/service-accessibility.jpg",
  Support: "/images/services/service-support.jpg",
};

export function Services() {
  // Mode toggle: Accordion Fan (Default) vs Full 22 Catalog Grid
  const [showCatalog, setShowCatalog] = useState(false);
  // Default to first card expanded (matching Metic reference screenshot)
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);

  return (
    <section id="services" className="shell frame relative py-20 md:py-36 border-t border-line">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <div className="measure text-steel flex items-center gap-2 mb-2">
            <span className="text-accent font-bold">04</span>
            <span className="h-px w-6 bg-line" />
            <span>CAPABILITIES</span>
          </div>
          <h2 className="display-2 text-ink max-w-[20ch]">
            Everything your business needs online<span className="text-accent">.</span>
          </h2>
          <p className="lead mt-4 max-w-2xl text-ink-2">
            22 services across website, AI, growth, data, accessibility, and support — run by one senior team instead of five disconnected vendors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a href="#cta" className="btn btn-primary">
            <span>Start a project</span>
            <span className="btn-dot">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>

          <button
            type="button"
            onClick={() => setShowCatalog(!showCatalog)}
            className="btn btn-secondary"
          >
            <span>{showCatalog ? "View interactive fan" : "View all 22 capabilities"}</span>
            <span className="btn-dot">
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  showCatalog ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mode A: Bidirectional Expanding / Shrinking Horizontal Accordion Fan (Full-Bleed Vertical Artwork & Seamless Bottom Layout) */}
      {!showCatalog ? (
        <div className="relative">
          <ul
            className="flex flex-col gap-3 md:h-[34rem] md:flex-row"
            role="list"
          >
            {SERVICE_CATALOG.map((cat, idx) => {
              const isExpanded = hoveredIdx === idx;
              const bgImg = SERVICE_IMAGES[cat.title] || "/images/services/service-website.jpg";

              return (
                <li
                  key={cat.title}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`relative overflow-hidden rounded-[1.25rem] border border-line bg-paper-2 transition-[flex,min-height,border-color,box-shadow] duration-700 ease-[var(--ease-lens)] cursor-pointer select-none ${
                    isExpanded
                      ? "md:flex-[3.5] min-h-[26rem] md:min-h-0 border-ink/20 shadow-lg"
                      : "md:flex-1 min-h-[4.5rem] md:min-h-0 hover:border-line"
                  }`}
                >
                  <InspectorTarget tag={cat.title} magnetic={false} className="h-full w-full block">
                    {/* Full-Bleed Vertical Background Artwork: Occupies 100% of vertical card space from top to bottom */}
                    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
                      <img
                        src={bgImg}
                        alt=""
                        aria-hidden="true"
                        className={`h-full w-full object-cover object-center transition-all duration-700 ease-[var(--ease-lens)] ${
                          isExpanded
                            ? "scale-105 opacity-100 filter-none"
                            : "scale-100 opacity-60 dark:opacity-45 grayscale"
                        }`}
                      />
                      {/* Smooth bottom gradient scrim: ensures text at bottom is 100% legible with zero visual clash while entire card remains occupied */}
                      <div
                        className={`absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-paper via-paper/80 via-40% to-transparent transition-opacity duration-500 ${
                          isExpanded ? "opacity-100" : "opacity-75"
                        }`}
                      />
                    </div>

                    {/* Collapsed Vertical Indicator Label (visible only when collapsed on desktop) */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 flex flex-col justify-between p-6 z-[6] hidden md:flex transition-[opacity,transform] ease-[var(--ease-lens)] ${
                        isExpanded
                          ? "translate-y-4 opacity-0 duration-200 pointer-events-none"
                          : "translate-y-0 opacity-100 delay-200 duration-500"
                      }`}
                    >
                      <span className="font-mono text-xs font-bold text-steel bg-paper/85 backdrop-blur-xs w-fit px-2 py-0.5 rounded border border-line/60">
                        0{idx + 1}
                      </span>
                      <span className="display-4 whitespace-nowrap [writing-mode:vertical-rl] rotate-180 text-ink/95 font-display tracking-tight text-xl font-bold drop-shadow-xs">
                        {cat.title}
                      </span>
                    </div>

                    {/* Mobile Accordion Header Button */}
                    <button
                      type="button"
                      onClick={() => setHoveredIdx(idx)}
                      className="absolute inset-x-0 top-0 z-10 flex h-[4.5rem] w-full items-center justify-between px-5 text-left md:hidden"
                      aria-expanded={isExpanded}
                    >
                      <span className="display-4 text-ink flex items-center gap-2">
                        <span className="font-mono text-xs text-accent">0{idx + 1}</span>
                        <span>{cat.title}</span>
                      </span>
                      <span
                        className={`grid h-7 w-7 place-items-center rounded-full bg-paper border border-line text-sm font-bold transition-transform duration-500 ${
                          isExpanded ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>

                    {/* Expanded Content Panel: Anchored directly to top and bottom to eliminate any dead space */}
                    <div
                      className={`relative z-[5] flex h-full flex-col justify-between p-6 md:p-8 transition-all ease-[var(--ease-lens)] ${
                        isExpanded
                          ? "opacity-100 translate-y-0 delay-200 duration-500 pointer-events-auto"
                          : "opacity-0 translate-y-4 duration-200 pointer-events-none"
                      }`}
                    >
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between pt-10 md:pt-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-accent font-bold bg-paper/85 backdrop-blur-xs px-2.5 py-1 rounded-full border border-line shadow-2xs">
                            0{idx + 1} // CAPABILITY
                          </span>
                          <span className="font-mono text-xs text-steel bg-paper/75 backdrop-blur-xs px-2 py-0.5 rounded border border-line/60 hidden sm:inline-block">
                            {cat.items.length} Services
                          </span>
                        </div>
                        <span className="font-mono text-[10px] tracking-wider uppercase text-steel bg-paper/80 backdrop-blur-xs px-2 py-0.5 rounded border border-line/60">
                          PRECISION 0{idx + 1}
                        </span>
                      </div>

                      {/* Bottom Content Dock (Anchored right at bottom border with zero gap below) */}
                      <div className="mt-auto pt-6">
                        <h3 className="display-3 text-ink font-display text-2xl md:text-3xl font-bold tracking-tight">
                          {cat.title}
                        </h3>

                        <p className="mt-2 text-ink-2 max-w-[42ch] text-sm md:text-base leading-relaxed">
                          {cat.teaser}
                        </p>

                        {/* Sub-services Chips */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {cat.items.map((item) => (
                            <span
                              key={item.title}
                              className="rounded-full border border-line bg-paper/80 backdrop-blur-xs px-3 py-1 text-xs font-mono text-ink/80 hover:border-accent/40 hover:text-accent transition-colors"
                            >
                              {item.title}
                            </span>
                          ))}
                        </div>

                        {/* Bottom Action Row */}
                        <div className="mt-6 pt-4 border-t border-line/80 flex flex-wrap items-center justify-between gap-3">
                          <span className="font-mono text-xs text-steel">
                            Engineered bespoke · No templates
                          </span>
                          <a
                            href="#cta"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink group/btn hover:text-accent transition-colors"
                          >
                            <span>Take a closer look</span>
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[var(--ease-lens)] group-hover/btn:rotate-45">
                              <ArrowUpRight className="h-3.5 w-3.5 text-paper" />
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </InspectorTarget>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        /* Mode B: Full 22-Service Catalog Breakdown Grid (Matching Screenshot 5) */
        <div className="rounded-3xl border border-line bg-paper-2/40 p-6 md:p-10 shadow-sm animate-in fade-in duration-300">
          <div className="mb-8">
            <h3 className="display-3 text-ink">
              Everything under one roof<span className="text-accent">.</span>
            </h3>
            <p className="mt-2 text-ink-2 max-w-xl text-base">
              22 services across website, AI, growth, data, accessibility, and support — run by one team instead of five disconnected vendors.
            </p>
          </div>

          {/* 3-Column Category Cards matching Screenshot 5 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CATALOG.map((cat) => (
              <div
                key={cat.title}
                className="rounded-2xl border border-line bg-paper p-6 md:p-7 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-line mb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent font-bold">
                        <cat.icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <h4 className="font-display font-bold text-lg text-ink">
                        {cat.title}
                      </h4>
                    </div>
                    <span className="rounded-full border border-line bg-paper-2 px-2.5 py-0.5 text-xs font-mono text-steel">
                      0{cat.items.length}
                    </span>
                  </div>

                  {/* Service Items List */}
                  <ul className="space-y-4">
                    {cat.items.map((item) => (
                      <li key={item.title} className="group/item">
                        <div className="flex items-start gap-2.5">
                          <item.icon className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <div>
                            <h5 className="font-display font-semibold text-sm text-ink group-hover/item:text-accent transition-colors">
                              {item.title}
                            </h5>
                            <p className="text-xs text-ink-2 mt-0.5 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs font-mono text-steel">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Production Ready
                  </span>
                  <a
                    href="#cta"
                    className="inline-flex items-center gap-1 text-ink hover:text-accent font-semibold transition-colors"
                  >
                    <span>Deploy</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
