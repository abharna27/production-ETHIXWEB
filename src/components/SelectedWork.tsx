import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "../content/landing";
import { InspectorTarget } from "./InspectorTarget";

export function SelectedWork() {
  return (
    <section id="work" className="shell frame relative py-24 md:py-40 border-t border-line">
      {/* Section Header matching Metic's "Selected work." */}
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
        <div>
          <div className="measure text-steel flex items-center gap-2 mb-3">
            <span className="text-accent font-bold">05</span>
            <span className="h-px w-6 bg-line" />
            <span>SELECTED WORK</span>
          </div>
          <h2 className="display-2 text-ink max-w-[16ch]">
            Selected work<span className="text-accent">.</span>
          </h2>
        </div>
        <div>
          <a
            href="#cta"
            className="link inline-flex min-h-11 items-center gap-1.5 font-medium text-ink group"
          >
            <span>All work</span>
            <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Case Studies Stacking Cards (Deliberate Pacing & Slow Bottom-to-Top Overlay Effect) */}
      <div className="relative flex flex-col pb-32">
        {CASE_STUDIES.map((study, idx) => {
          // Progressive sticky offset: each card stops 20px lower than the previous one
          const stickyTop = `calc(var(--nav-h, 4.5rem) + ${idx * 1.25}rem + 0.5rem)`;
          const isLast = idx === CASE_STUDIES.length - 1;

          // Generous scroll travel between cards (65vh on desktop, 40vh on mobile - tuned 15% slower)
          // This keeps each card static and readable for an extended duration before the next card gracefully glides up
          const cardSpacing = isLast ? "mb-16 md:mb-20" : "mb-[40vh] md:mb-[65vh]";

          return (
            <div
              key={study.id}
              className={`sticky origin-top will-change-transform transition-all duration-[800ms] ease-[var(--ease-lens)] ${cardSpacing}`}
              style={{
                top: stickyTop,
                zIndex: idx + 1,
              }}
            >
              <InspectorTarget tag="Project" magnetic={false}>
                <div className="group grid overflow-hidden rounded-[2rem] border border-line bg-paper-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-all duration-[800ms] ease-[var(--ease-lens)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.16)] md:min-h-[32rem] md:grid-cols-12">
                  {/* Left Narrative / Meta */}
                  <div className="relative flex flex-col justify-between gap-8 p-6 md:col-span-5 md:p-10">
                    <div>
                      <p className="measure font-mono text-xs uppercase tracking-wider text-steel">
                        {study.category} &nbsp; {study.year}
                      </p>
                      <h3 className="display-3 mt-4 text-ink font-display">
                        {study.client}
                      </h3>
                      <p className="lead mt-3 max-w-[32ch] text-ink-2 text-base md:text-lg leading-relaxed">
                        {study.headline}
                      </p>
                      <p className="mt-3 text-sm text-ink-2/80 max-w-[34ch] leading-relaxed hidden sm:block">
                        {study.desc}
                      </p>
                    </div>

                    {/* Tags & Action Button */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-line/40">
                      <ul className="flex flex-wrap gap-2">
                        {study.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-line bg-paper/60 px-3 py-1 font-mono text-xs text-steel"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#cta"
                        className="inline-flex items-center gap-2 text-sm font-medium text-ink group/btn"
                      >
                        <span>Case study</span>
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[var(--ease-lens)] group-hover/btn:rotate-45">
                          <ArrowUpRight className="h-3.5 w-3.5 text-paper" />
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Right Image Showcase with Zoom and Metric Badge */}
                  <div className="relative aspect-[4/3] md:aspect-auto md:col-span-7 overflow-hidden bg-paper/40">
                    <img
                      src={study.image}
                      alt={study.client}
                      width={1024}
                      height={768}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-[var(--ease-lens)] group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper-2/40 via-transparent to-transparent opacity-60" />

                    {/* Floating Metric Badge */}
                    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full border border-line bg-ink/90 text-paper px-4 py-2 backdrop-blur-md shadow-lg">
                      <span className="font-display text-sm md:text-base font-bold text-accent">
                        {study.metric}
                      </span>
                      <span className="font-mono text-[10px] md:text-[11px] text-paper/80 border-l border-paper/20 pl-2">
                        {study.metricLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </InspectorTarget>
            </div>
          );
        })}
      </div>
    </section>
  );
}
