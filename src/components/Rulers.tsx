import { useEffect, useState, useMemo, useRef, useCallback } from "react";

interface RulersProps {
  activeSection?: string;
}

const TOP_PADDING = 68; // Clearance below floating navbar
const BOTTOM_PADDING = 28;

export function Rulers({ activeSection = "Intro" }: RulersProps) {
  const [windowHeight, setWindowHeight] = useState(900);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const rightRulerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update scroll progress on window scroll (when not dragging)
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Usable travel distance along the ruler track
  const trackHeight = Math.max(100, windowHeight - TOP_PADDING - BOTTOM_PADDING);
  const dotTop = TOP_PADDING + scrollProgress * trackHeight;

  // Convert clientY coordinate to scroll position
  const scrollToClientY = useCallback(
    (clientY: number) => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, (clientY - TOP_PADDING) / trackHeight));
      setScrollProgress(progress);
      window.scrollTo({
        top: progress * scrollHeight,
        behavior: "instant",
      });
    },
    [trackHeight]
  );

  // Drag interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    scrollToClientY(e.clientY);

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!isDraggingRef.current) return;
      scrollToClientY(moveEvent.clientY);
    };

    const onPointerUp = () => {
      setIsDragging(false);
      isDraggingRef.current = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  // Generate tick marks up to windowHeight (every 8px, major label every 64px)
  const ticks = useMemo(() => {
    const list: { y: number; isMajor: boolean; isMid: boolean; label?: number }[] = [];
    const max = Math.max(windowHeight, 1400);
    for (let y = 0; y <= max; y += 8) {
      const isMajor = y % 64 === 0;
      const isMid = !isMajor && y % 32 === 0;
      list.push({
        y,
        isMajor,
        isMid,
        label: isMajor ? y : undefined,
      });
    }
    return list;
  }, [windowHeight]);

  return (
    <>
      {/* Left Vertical Ruler (Static Reference Scale - hidden on mobile for clean breathing room) */}
      <aside
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 bottom-0 z-30 select-none hidden md:block w-10 sm:w-12 overflow-hidden opacity-60 dark:opacity-75 transition-opacity duration-300"
      >
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox={`0 0 48 ${windowHeight}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {ticks.map(({ y, isMajor, isMid, label }) => {
            if (y > windowHeight) return null;
            const tickWidth = isMajor ? 10 : isMid ? 6 : 3;
            return (
              <g key={`left-tick-${y}`}>
                <line
                  x1={0}
                  y1={y}
                  x2={tickWidth}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth={isMajor ? 1 : 0.75}
                  className={isMajor ? "text-ink/40 dark:text-ink/50" : "text-ink/15 dark:text-ink/25"}
                />
                {isMajor && (
                  <text
                    x={tickWidth + 5}
                    y={y + 3}
                    textAnchor="start"
                    className="fill-ink/45 dark:fill-ink/55 font-mono text-[9px] tracking-tighter"
                  >
                    {label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </aside>

      {/* Right Vertical Ruler (Interactive Draggable Scrollbar Track) */}
      <aside
        ref={rightRulerRef}
        role="scrollbar"
        aria-label="Architectural ruler scrollbar"
        aria-controls="overview"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        onPointerDown={handlePointerDown}
        className="fixed right-0 top-0 bottom-0 z-40 select-none w-6 sm:w-10 md:w-12 cursor-pointer transition-opacity duration-300 touch-none"
      >
        {/* Ruler Ticks */}
        <svg
          className="h-full w-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox={`0 0 48 ${windowHeight}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {ticks.map(({ y, isMajor, isMid }) => {
            if (y > windowHeight) return null;
            const tickWidth = isMajor ? 9 : isMid ? 5 : 3;
            return (
              <line
                key={`right-tick-${y}`}
                x1={48 - tickWidth}
                y1={y}
                x2={48}
                y2={y}
                stroke="currentColor"
                strokeWidth={isMajor ? 1 : 0.75}
                className={isMajor ? "text-ink/35 dark:text-ink/45" : "text-ink/15 dark:text-ink/25"}
              />
            );
          })}
        </svg>

        {/* Interactive Draggable Red Dot & Chapter Badge */}
        <div
          className={`absolute right-0 flex items-center justify-end pr-0 cursor-grab active:cursor-grabbing transition-transform duration-75 group ${
            isDragging ? "cursor-grabbing" : ""
          }`}
          style={{
            top: `${dotTop}px`,
            transform: "translateY(-50%)",
          }}
        >
          {/* Active Chapter Label next to red dot */}
          <span
            className={`mr-2 hidden md:inline-flex items-center rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider shadow-xs backdrop-blur-md transition-all ${
              isDragging
                ? "border-accent bg-paper text-accent font-semibold shadow-md"
                : "border-[#dcdad3] dark:border-line bg-white/95 dark:bg-[#18181b]/95 text-ink dark:text-[#f1f1ee] group-hover:border-accent group-hover:text-accent"
            }`}
          >
            {activeSection}
          </span>

          {/* Draggable Red Dot with Generous Hit Box */}
          <div className="relative flex h-7 w-7 items-center justify-center -mr-1.5">
            {/* Ping pulse animation */}
            <span
              className={`absolute inline-flex h-3 w-3 rounded-full bg-accent opacity-60 transition-opacity ${
                isDragging ? "animate-none scale-150 opacity-80" : "animate-ping"
              }`}
            />
            {/* Red Measurement Dot */}
            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(255,62,62,0.9)] transition-transform ${
                isDragging ? "scale-125 ring-2 ring-accent/40" : "group-hover:scale-125"
              }`}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
