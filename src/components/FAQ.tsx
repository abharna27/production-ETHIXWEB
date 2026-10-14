import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQ_ITEMS } from "../content/landing";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="shell frame relative py-20 md:py-36 border-t border-line">
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Left Header */}
        <div className="lg:col-span-5">
          <div className="measure text-steel flex items-center gap-2 mb-2">
            <span className="text-accent font-bold">09</span>
            <span className="h-px w-6 bg-line" />
            <span>COMMON QUESTIONS</span>
          </div>
          <h2 className="display-2 text-ink">
            Frequently asked questions.
          </h2>
          <p className="lead mt-4 text-ink-2 max-w-md">
            Direct answers about how we operate, integrate with your stack, and deliver results.
          </p>
        </div>

        {/* Right Accordion List */}
        <div className="lg:col-span-7 divide-y divide-line border-y border-line">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.q} className="py-6 transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-start justify-between gap-6 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`font-display text-lg md:text-xl font-medium transition-colors ${
                    isOpen ? "text-accent" : "text-ink group-hover:text-accent"
                  }`}>
                    {item.q}
                  </span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-paper-2 transition-transform duration-300 ${
                    isOpen ? "rotate-45 border-accent text-accent" : "text-steel"
                  }`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-12 animate-in fade-in slide-in-from-top-2 duration-300">
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
  );
}
