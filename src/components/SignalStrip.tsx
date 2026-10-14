import { MARQUEE_STACK } from "../content/landing";

export function SignalStrip() {
  const repeated = [...MARQUEE_STACK, ...MARQUEE_STACK, ...MARQUEE_STACK, ...MARQUEE_STACK];

  return (
    <div className="relative overflow-hidden border-y border-line py-5 bg-paper-2/40 select-none">
      <div className="flex w-max gap-12 whitespace-nowrap animate-[marquee_28s_linear_infinite]">
        {repeated.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="flex items-center gap-12 text-xs md:text-sm font-mono uppercase tracking-[0.28em] text-steel font-medium hover:text-ink transition-colors"
          >
            <span>{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
