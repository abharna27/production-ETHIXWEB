import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { SHIFT_ITEMS } from "../content/landing";

export function SystemShift() {
  const [activeMode, setActiveMode] = useState<"before" | "after">("after");

  return (
    <section className="shell frame relative py-20 md:py-36 border-t border-line">
      <div className="rounded-3xl border border-line bg-paper-2/50 p-8 md:p-14 shadow-sm">
        {/* Header & Mode Switch */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <div>
            <div className="measure text-steel flex items-center gap-2 mb-2">
              <span className="text-accent font-bold">08</span>
              <span className="h-px w-6 bg-line" />
              <span>THE SYSTEM SHIFT</span>
            </div>
            <h2 className="display-2 text-ink">
              From operational friction to connected growth.
            </h2>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-2 rounded-full border border-line bg-paper p-1.5 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveMode("before")}
              className={`rounded-full px-5 py-2 text-xs font-mono font-medium transition-all ${
                activeMode === "before"
                  ? "bg-ink text-paper shadow-sm"
                  : "text-steel hover:text-ink"
              }`}
            >
              Before Ethixweb
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("after")}
              className={`rounded-full px-5 py-2 text-xs font-mono font-medium transition-all ${
                activeMode === "after"
                  ? "bg-accent text-white shadow-sm"
                  : "text-steel hover:text-ink"
              }`}
            >
              With Ethixweb Operation
            </button>
          </div>
        </div>

        {/* Shift Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SHIFT_ITEMS.map((item) => (
            <div
              key={item.category}
              className={`rounded-2xl border p-6 transition-all duration-500 flex flex-col justify-between ${
                activeMode === "after"
                  ? "border-accent/40 bg-paper shadow-sm"
                  : "border-line bg-paper/60 opacity-80"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                    activeMode === "after" ? "bg-accent/10 text-accent" : "bg-neutral-200 text-neutral-600"
                  }`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-steel uppercase">
                    {item.category}
                  </span>
                </div>

                <div className="min-h-[72px]">
                  {activeMode === "before" ? (
                    <div className="flex items-start gap-2 text-neutral-600">
                      <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium leading-snug line-through text-neutral-500">
                        {item.before}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 text-ink">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold leading-snug">
                        {item.after}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-line text-[11px] font-mono flex items-center justify-between">
                <span className="text-steel">STATUS</span>
                <span className={activeMode === "after" ? "text-accent font-bold" : "text-neutral-500"}>
                  {activeMode === "after" ? "RESOLVED" : "BLOCKED"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
