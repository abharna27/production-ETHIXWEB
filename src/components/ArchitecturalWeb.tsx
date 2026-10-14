import { useState, useRef, useMemo, type MouseEvent } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { DollarSign, Layers3, Palette, PhoneCall, TrendingUp } from "lucide-react";
import spiderwebLight from "../assets/spiderweb-light.svg";
import spiderwebDark from "../assets/spiderweb.svg";
import emblemImg from "../assets/emblem-transparent-sm.webp";
import { InspectorTarget } from "./InspectorTarget";

// Coordinate space matching authentic Ethixweb source (viewBox 1234 x 772)
const VB_W = 1234;
const VB_H = 772;
const HUB = { x: 682, y: 353 };
const EY = 0.64; // Vertical perspective ellipse compression

// 12 authentic spoke tip angles and radii
const SPOKES = [
  { angle: -160, r: 640 },
  { angle: -127, r: 600 },
  { angle: -95, r: 560 },
  { angle: -70, r: 545 },
  { angle: -49, r: 590 },
  { angle: -20, r: 630 },
  { angle: 19, r: 610 },
  { angle: 50, r: 575 },
  { angle: 85, r: 545 },
  { angle: 118, r: 520 },
  { angle: 145, r: 545 },
  { angle: 162, r: 525 },
];

const RING_FRACTIONS = [0.24, 0.42, 0.62, 0.85];

function spokePoint(spoke: { angle: number; r: number }, f: number) {
  const a = (spoke.angle * Math.PI) / 180;
  return {
    x: HUB.x + Math.cos(a) * spoke.r * f,
    y: HUB.y + Math.sin(a) * spoke.r * f * EY,
  };
}

// 5 authentic badges registered to specific spoke nodes
const BADGES = [
  {
    id: "jobs",
    label: "More booked jobs",
    icon: PhoneCall,
    x: 470,
    y: 92,
    spoke: 1,
    attach: 0.85,
  },
  {
    id: "conversions",
    label: "More conversions",
    icon: TrendingUp,
    x: 955,
    y: 88,
    spoke: 4,
    attach: 0.85,
  },
  {
    id: "uiux",
    label: "UI/UX Systems",
    icon: Layers3,
    x: 350,
    y: 440,
    spoke: 11,
    attach: 0.45,
  },
  {
    id: "revenue",
    label: "Revenue tracked",
    icon: DollarSign,
    x: 990,
    y: 450,
    spoke: 6,
    attach: 0.65,
  },
  {
    id: "design",
    label: "Design that converts",
    icon: Palette,
    x: 520,
    y: 690,
    spoke: 9,
    attach: 0.85,
  },
] as const;

export function ArchitecturalWeb() {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Perspective Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(mouseX, { stiffness: 180, damping: 22 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 14);
    mouseY.set(y * -14);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredBadge(null);
  };

  // 1. Spoke linear paths
  const spokeLines = useMemo(() => {
    return SPOKES.map((s) => {
      const tip = spokePoint(s, 1);
      return `M${HUB.x},${HUB.y} L${tip.x.toFixed(1)},${tip.y.toFixed(1)}`;
    });
  }, []);

  // 2. Sagging catenary curved web arcs threaded through every spoke
  const ringArcs = useMemo(() => {
    return RING_FRACTIONS.map((f) => {
      const pts = SPOKES.map((s) => spokePoint(s, f));
      let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
      for (let i = 1; i <= pts.length; i++) {
        const p = pts[i % pts.length];
        const prev = pts[i - 1];
        const mid = { x: (p.x + prev.x) / 2, y: (p.y + prev.y) / 2 };
        const ctrl = {
          x: mid.x + (HUB.x - mid.x) * 0.14,
          y: mid.y + (HUB.y - mid.y) * 0.14,
        };
        d += ` Q${ctrl.x.toFixed(1)},${ctrl.y.toFixed(1)} ${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      }
      return d;
    });
  }, []);

  // 3. Web nodes at spoke & ring intersections
  const nodes = useMemo(() => {
    return SPOKES.flatMap((s, si) =>
      RING_FRACTIONS.map((f, ri) => {
        const pt = spokePoint(s, f);
        return { id: `node-${si}-${ri}`, x: pt.x, y: pt.y, spoke: si, ring: ri };
      })
    );
  }, []);

  // 4. Badge geometry with leader line to attachment node
  const badgeConnectors = useMemo(() => {
    return BADGES.map((b) => {
      const node = spokePoint(SPOKES[b.spoke], b.attach);
      return {
        ...b,
        node,
        line: `M${node.x.toFixed(1)},${node.y.toFixed(1)} L${b.x},${b.y}`,
      };
    });
  }, []);

  return (
    <InspectorTarget tag="Spiderweb" magneticFactor={0.06} className="w-full">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        className="relative rounded-2xl border border-[#dcdad3] dark:border-line bg-white/70 dark:bg-paper-2/20 p-5 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-xl backdrop-blur-xs select-none overflow-hidden"
      >
        {/* Drafting Card Header */}
        <div className="flex items-center justify-between border-b border-line pb-3.5 text-xs font-mono text-steel">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-semibold text-ink">FIG. 01</span>
            <span className="text-line">/</span>
            <span className="tracking-widest uppercase text-[10px] text-ink font-medium">
              AUTONOMOUS SPIDERWEB
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-steel font-semibold">
            SYSTEMS HUB
          </span>
        </div>

        {/* Spiderweb Canvas Stage (Aspect Ratio matching 1234 x 772) */}
        <div className="relative my-3 aspect-[1234/772] w-full flex items-center justify-center overflow-visible">
          {/* Layer 1: Authentic Hand-Drawn Spiderweb Artwork from Ethixweb */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            {/* Light Mode Artwork */}
            <img
              src={spiderwebLight}
              alt=""
              aria-hidden="true"
              draggable={false}
              width={1234}
              height={772}
              loading="lazy"
              decoding="async"
              className="dark:hidden h-full w-full object-contain select-none opacity-90 transition-opacity duration-300"
              style={{
                filter: "drop-shadow(0 0 2px rgba(192,36,42,0.22)) drop-shadow(0 0 10px rgba(192,36,42,0.08))",
              }}
            />
            {/* Dark / X-ray Mode Artwork */}
            <img
              src={spiderwebDark}
              alt=""
              aria-hidden="true"
              draggable={false}
              width={1234}
              height={772}
              loading="lazy"
              decoding="async"
              className="hidden dark:block h-full w-full object-contain select-none opacity-90 transition-opacity duration-300"
              style={{
                filter: "drop-shadow(0 0 4px rgba(255,62,62,0.30)) drop-shadow(0 0 20px rgba(255,62,62,0.15))",
              }}
            />
          </div>

          {/* Layer 2: Precision SVG Architectural Overlay & Leader Lines */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Leader lines from web nodes to badges */}
            {badgeConnectors.map((b) => {
              const isHovered = hoveredBadge === b.id;
              return (
                <g key={`connector-${b.id}`}>
                  <path
                    d={b.line}
                    stroke="currentColor"
                    strokeWidth={isHovered ? "2.0" : "1.0"}
                    strokeDasharray={isHovered ? "none" : "3 3"}
                    className={`transition-colors duration-200 ${
                      isHovered ? "text-accent" : "text-ink/20 dark:text-ink/30"
                    }`}
                  />
                  {/* Node attachment point */}
                  <circle
                    cx={b.node.x}
                    cy={b.node.y}
                    r={isHovered ? 4.5 : 3.0}
                    className={`transition-all duration-200 ${
                      isHovered ? "fill-accent stroke-white stroke-1" : "fill-accent/70"
                    }`}
                  />
                </g>
              );
            })}

            {/* Subtle Drafting Spokes */}
            {spokeLines.map((d, i) => (
              <path
                key={`spoke-${i}`}
                d={d}
                stroke="currentColor"
                strokeWidth="0.6"
                className="text-ink/15 dark:text-ink/20"
              />
            ))}

            {/* Subtle Drafting Concentric Catenary Rings */}
            {ringArcs.map((d, i) => (
              <path
                key={`ring-${i}`}
                d={d}
                stroke="currentColor"
                strokeWidth={i === 2 ? "1.0" : "0.6"}
                className={i === 2 ? "text-accent/35" : "text-ink/15 dark:text-ink/20"}
              />
            ))}

            {/* Web Strand Junction Nodes */}
            {nodes.map((node) => {
              const isAccent = node.ring === 2;
              return (
                <circle
                  key={node.id}
                  cx={node.x}
                  cy={node.y}
                  r={isAccent ? 2.2 : 1.5}
                  className={isAccent ? "fill-accent opacity-75" : "fill-ink/30 dark:fill-ink/40"}
                />
              );
            })}

            {/* Central Hub Decorative Technical Gauge */}
            <circle
              cx={HUB.x}
              cy={HUB.y}
              r="68"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeDasharray="4 4"
              className="text-accent/40 animate-spin-slow origin-[682px_353px]"
            />
            <circle
              cx={HUB.x}
              cy={HUB.y}
              r="94"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-ink/15 dark:text-ink/25"
            />
          </svg>

          {/* Layer 3: Central Crimson Glass Jewel Emblem with Perspective Tilt */}
          <div
            className="absolute z-20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(HUB.x / VB_W) * 100}%`,
              top: `${(HUB.y / VB_H) * 100}%`,
            }}
          >
            {/* Ambient Crimson Core Backlight */}
            <div className="absolute h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-accent/25 blur-xl animate-pulse" />

            {/* Rotating 3D Glass Emblem */}
            <div className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-accent/70 bg-white/95 dark:bg-[#18181b]/95 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110">
              <img
                src={emblemImg}
                alt="Ethixweb Hub Emblem"
                width={48}
                height={48}
                loading="eager"
                decoding="async"
                className="h-9 w-9 sm:h-11 sm:w-11 object-contain drop-shadow-[0_4px_14px_rgba(255,62,62,0.45)]"
              />
            </div>
          </div>

          {/* Layer 4: Interactive Floating Value Badges */}
          {BADGES.map((b) => {
            const isHovered = hoveredBadge === b.id;
            const Icon = b.icon;

            return (
              <div
                key={b.id}
                style={{
                  left: `${(b.x / VB_W) * 100}%`,
                  top: `${(b.y / VB_H) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => setHoveredBadge(b.id)}
                onMouseLeave={() => setHoveredBadge(null)}
                className={`absolute z-30 transition-all duration-200 cursor-pointer ${
                  isHovered ? "scale-108 z-40" : "hover:scale-104"
                }`}
              >
                <div
                  className={`flex items-center gap-1.5 sm:gap-2 rounded-full border px-3 py-1.5 sm:px-3.5 sm:py-1.5 text-xs font-semibold shadow-xs transition-all backdrop-blur-md ${
                    isHovered
                      ? "border-accent bg-white dark:bg-[#18181b] text-accent shadow-md"
                      : "border-[#dcdad3] dark:border-line bg-white/95 dark:bg-[#18181b]/95 text-ink dark:text-[#f1f1ee] shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-none"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span className="tracking-tight whitespace-nowrap">{b.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Telemetry Footer */}
        <div className="flex items-center justify-between border-t border-line pt-3 text-[11px] font-mono text-steel">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>48 NODES SYNCHRONIZED</span>
          </div>
          <span className="text-steel/70 hidden sm:inline">
            MOVE CURSOR TO TILT
          </span>
          <span className="text-accent font-medium">100% OPERATIONAL</span>
        </div>
      </motion.div>
    </InspectorTarget>
  );
}
