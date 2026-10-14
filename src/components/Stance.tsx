import { useState } from "react";
import { PRINCIPLES, STANCE } from "../content/landing";

export function Stance() {
  const [activeWordIdx, setActiveWordIdx] = useState<number | null>(null);
  const words = STANCE.statement.split(" ");

  return (
    <section className="shell frame relative py-24 md:py-40">
      {/* Editorial Scrub Statement */}
      <div className="relative max-w-5xl">
        <div className="measure text-accent mb-4 flex items-center gap-2">
          <span>03</span>
          <span className="h-px w-6 bg-line" />
          <span>STANCE &amp; PHILOSOPHY</span>
        </div>

        <h2 className="display-2 max-w-[28ch] text-ink leading-[1.08]">
          {words.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              onMouseEnter={() => setActiveWordIdx(idx)}
              onMouseLeave={() => setActiveWordIdx(null)}
              className={`inline-block mr-[0.25em] transition-colors duration-200 cursor-default ${
                activeWordIdx === idx ? "text-accent" : "text-ink"
              }`}
            >
              {word}
            </span>
          ))}
        </h2>

        <p className="lead mt-6 max-w-xl text-ink-2">
          {STANCE.subtext}
        </p>
      </div>

      {/* 4-Column Principles Grid with Top Hairline Rule & 20px Air */}
      <div className="mt-20 md:mt-28 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {PRINCIPLES.map((principle, idx) => (
          <div key={principle.title} className="rule pt-5 relative group">
            <span className="measure text-steel/60 font-mono block mb-2">
              0{idx + 1}
            </span>
            <h3 className="display-4 text-ink group-hover:text-accent transition-colors">
              {principle.title}
            </h3>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-2">
              {principle.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
