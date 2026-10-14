import { useState, useEffect } from "react";
import { GLOBAL_NODES, KEY_METRICS } from "../content/landing";

function useTimezoneClock(tz: string) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const formatTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
        setTime(formatted);
      } catch {
        setTime("--:--:--");
      }
    };

    formatTime();
    const interval = setInterval(formatTime, 1000);
    return () => clearInterval(interval);
  }, [tz]);

  return time;
}

function ClockCard({ node }: { node: (typeof GLOBAL_NODES)[number] }) {
  const time = useTimezoneClock(node.tz);

  return (
    <div className="rounded-2xl border border-line bg-paper p-5 transition-all hover:border-accent hover:shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-display font-semibold text-base text-ink">{node.city}</span>
        </div>
        <span className="rounded-full bg-paper-2 px-2 py-0.5 text-[10px] font-mono text-steel uppercase">
          {node.status}
        </span>
      </div>

      <p className="mt-3 text-xs text-ink-2 font-mono">{node.label}</p>

      <div className="mt-4 pt-3 border-t border-line flex items-baseline justify-between">
        <span className="text-[11px] font-mono text-steel">LOCAL TIME</span>
        <span className="font-mono text-sm md:text-base font-bold text-ink tabular-nums">
          {time}
        </span>
      </div>
    </div>
  );
}

export function GlobalNetwork() {
  return (
    <section id="network" className="shell frame relative py-20 md:py-36 border-t border-line">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
        <div>
          <div className="measure text-steel flex items-center gap-2 mb-2">
            <span className="text-accent font-bold">06</span>
            <span className="h-px w-6 bg-line" />
            <span>GLOBAL NETWORK</span>
          </div>
          <h2 className="display-2 text-ink max-w-[20ch]">
            Built for fast-moving teams across time zones.
          </h2>
          <p className="lead mt-4 max-w-xl text-ink-2">
            Seattle, Utah, New York, Canada, the United Kingdom, and India stay connected through one responsive digital operations layer.
          </p>
        </div>

        {/* Live Status Ticker Pill */}
        <div className="flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-mono text-emerald-800 dark:text-emerald-400 font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>ALL SYSTEMS OPERATIONAL · AVG RESPONSE &lt; 1H</span>
        </div>
      </div>

      {/* Clocks Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {GLOBAL_NODES.map((node) => (
          <ClockCard key={node.city} node={node} />
        ))}
      </div>

      {/* 4-Item Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KEY_METRICS.map((metric, idx) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-line bg-paper-2/40 p-6 text-center transition-all hover:border-accent hover:bg-paper"
          >
            <span className="measure text-steel block mb-2">0{idx + 1} // METRIC</span>
            <div className="font-display text-3xl md:text-5xl font-extrabold text-ink tracking-tight tabular-nums">
              {metric.value}
            </div>
            <div className="mt-2 text-xs uppercase tracking-wider font-mono text-ink font-semibold">
              {metric.label}
            </div>
            <p className="mt-1 text-xs text-steel">
              {metric.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
