import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ArrowDown } from "lucide-react";
import { triggerProjectTransition } from "./PageCurtain";

interface PhaseInfo {
  num: string;
  total: string;
  title: string;
  desc: string;
}

const PHASES: PhaseInfo[] = [
  {
    num: "01",
    total: "08",
    title: "A line.",
    desc: "Every build starts with technical guides. Architecture and requirements measured, not guessed.",
  },
  {
    num: "02",
    total: "08",
    title: "A grid.",
    desc: "Columns, gaps, responsive rhythm. Scaffolding engineered for sub-second performance.",
  },
  {
    num: "03",
    total: "08",
    title: "A layout.",
    desc: "Conversion surfaces: clear positioning, proof points, and focused client action.",
  },
  {
    num: "05",
    total: "08",
    title: "A brand.",
    desc: "Sharp typography, purposeful contrast, and distinct identity built to earn immediate client trust.",
  },
  {
    num: "06",
    total: "08",
    title: "A line of code.",
    desc: "What we design, we engineer. By hand in clean React & TypeScript — no page builders.",
  },
  {
    num: "07",
    total: "08",
    title: "Online.",
    desc: "Sub-second LCP, 100/100 Lighthouse performance, and search engine visibility.",
  },
  {
    num: "08",
    total: "08",
    title: "Your turn.",
    desc: "Everything you see is run by one dedicated senior team. Let's build your operation.",
  },
];

export function TheBuild() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [displayPercent, setDisplayPercent] = useState("001%");

  // Measure card position on screen matching the 877x548 architectural blueprint in Image 1, 2, 3
  const [cardBox, setCardBox] = useState(() => {
    if (typeof window !== "undefined") {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const targetW = 877;
      const targetH = 548;
      const w = Math.min(targetW, Math.round(vw * 0.72));
      const h = Math.round(w * (targetH / targetW));
      const l = Math.round((vw - w) / 2);
      // On 836px height screen, top is 92px exactly matching blueprint (x 297 · y 92)
      const t = Math.max(80, Math.min(100, Math.round(vh * 0.11)));
      return {
        left: l,
        top: t,
        width: w,
        height: h,
        right: l + w,
        bottom: t + h,
        vw,
        vh,
      };
    }
    return {
      left: 297,
      top: 92,
      width: 877,
      height: 548,
      right: 1174,
      bottom: 640,
      vw: 1470,
      vh: 836,
    };
  });

  useEffect(() => {
    const updateCardBox = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const targetW = 877;
      const targetH = 548;
      const w = Math.min(targetW, Math.round(vw * 0.72));
      const h = Math.round(w * (targetH / targetW));
      const l = Math.round((vw - w) / 2);
      const t = Math.max(80, Math.min(100, Math.round(vh * 0.11)));
      setCardBox({
        left: l,
        top: t,
        width: w,
        height: h,
        right: l + w,
        bottom: t + h,
        vw,
        vh,
      });
    };

    updateCardBox();
    window.addEventListener("resize", updateCardBox);
    return () => window.removeEventListener("resize", updateCardBox);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track progress and phase changes matching the exact references:
  // Phase 1 (001%-008%): 01 A line
  // Phase 2 (009%-020%): 02 A grid (hits 013%)
  // Phase 3 (021%-044%): 03 A layout (hits 026%, 039%)
  // Phase 4 (045%-056%): 05 A colour (hits 051% - typography appears)
  // Phase 5 (057%-068%): 05 A colour (hits 062% - swatches, expanding lines, filled button)
  // Phase 6 (069%-081%): 06 A line of code (hits 076% - code window & curved connecting line)
  // Phase 7 (082%-089%): 08 Your turn (hits 087% - live browser chrome)
  // Phase 8 (090%-100%): 08 Your turn (hits 094%-100% - backdrop collapses, button centers)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.15) {
      setPhaseIndex(0); // 01 A line (001% - 008%)
      const t = latest / 0.15;
      const val = Math.max(1, Math.round(1 + t * 7));
      setDisplayPercent(`${String(val).padStart(3, "0")}%`);
    } else if (latest < 0.28) {
      setPhaseIndex(1); // 02 A grid (009% - 026%, hits 013% and 026%)
      const t = (latest - 0.15) / (0.28 - 0.15);
      const val = Math.round(9 + t * 17);
      setDisplayPercent(`${String(val).padStart(3, "0")}%`);
    } else if (latest < 0.41) {
      setPhaseIndex(2); // 03 A layout (027% - 041%, hits 039% and 041%)
      const t = (latest - 0.28) / (0.41 - 0.28);
      const val = Math.round(27 + t * 14);
      setDisplayPercent(`${String(val).padStart(3, "0")}%`);
    } else if (latest < 0.53) {
      setPhaseIndex(3); // 05 A colour (part 1: typography, 042% - 053%, hits 051%)
      const t = (latest - 0.41) / (0.53 - 0.41);
      const val = Math.round(42 + t * 11);
      setDisplayPercent(`${String(val).padStart(3, "0")}%`);
    } else if (latest < 0.67) {
      setPhaseIndex(3); // 05 A colour (part 2: colors & swatches, 054% - 067%, hits 059%)
      const t = (latest - 0.53) / (0.67 - 0.53);
      const val = Math.round(54 + t * 13);
      setDisplayPercent(`${String(val).padStart(3, "0")}%`);
    } else if (latest < 0.81) {
      setPhaseIndex(4); // 06 A line of code (068% - 081%, hits 080%)
      const t = (latest - 0.67) / (0.81 - 0.67);
      const val = Math.round(68 + t * 13);
      setDisplayPercent(`${String(val).padStart(3, "0")}%`);
    } else if (latest < 0.87) {
      setPhaseIndex(5); // 07 Online (082% - 087%, hits 085% matching Image 1)
      const t = (latest - 0.81) / (0.87 - 0.81);
      const val = Math.round(82 + t * 5);
      setDisplayPercent(`${String(val).padStart(3, "0")}%`);
    } else {
      setPhaseIndex(6); // 08 Your turn (088% - 100%, hits 100% matching Image 5)
      const t = Math.min(1, Math.max(0, (latest - 0.87) / (1.00 - 0.87)));
      const val = Math.round(88 + t * 12);
      setDisplayPercent(`${String(val).padStart(3, "0")}%`);
    }
  });

  // --- Scroll-driven motion values tailored to all 8 Phases ---

  // Phase 1: Outer & Inner Guide Lines (Expanded scroll duration for a smooth, slow appearance)
  const outerLinesPath = useTransform(scrollYProgress, [0.01, 0.09], [0, 1]);
  const outerLinesOpacity = useTransform(scrollYProgress, [0.01, 0.04, 0.16, 0.20], [0, 1, 1, 0]);
  const coordsOpacity = useTransform(scrollYProgress, [0.03, 0.07, 0.16, 0.20], [0, 1, 1, 0]);
  const innerLinesPath = useTransform(scrollYProgress, [0.04, 0.14], [0, 1]);
  // Inner lines remain visible through Phase 1 AND Phase 2! Fades out as Phase 3 begins:
  const innerLinesOpacity = useTransform(scrollYProgress, [0.04, 0.07, 0.28, 0.32], [0, 1, 1, 0]);

  // Phase 2: Browser Window Frame & 12 Pink Grid Columns & Dashed Centerline (0.15 - 0.28)
  const browserFramePath = useTransform(scrollYProgress, [0.15, 0.22], [0, 1]);
  const browserFrameOpacity = useTransform(scrollYProgress, [0.15, 0.18], [0, 1]); // Stays visible
  const dashedCenterPath = useTransform(scrollYProgress, [0.16, 0.23, 0.28, 0.32], [0, 1, 1, 0]);
  const topDimensionOpacity = useTransform(scrollYProgress, [0.16, 0.21, 0.28, 0.32], [0, 1, 1, 0]);
  const columnsScaleY = useTransform(scrollYProgress, [0.17, 0.25], [0, 1]);
  const columnsOpacity = useTransform(scrollYProgress, [0.17, 0.21, 0.28, 0.32], [0, 1, 1, 0]);

  // Phase 3: Wireframe Placeholder Layout Shapes (0.28 - 0.41)
  const wireframeShapesScale = useTransform(scrollYProgress, [0.28, 0.35], [0.85, 1]);
  const wireframeBarsScaleX = useTransform(scrollYProgress, [0.29, 0.36], [0, 1]);
  // Shapes fade SIMULTANEOUSLY with typography appearing in Phase 4 (0.41 to 0.49)
  const wireframeShapesOpacity = useTransform(scrollYProgress, [0.28, 0.33, 0.41, 0.49], [0, 1, 1, 0]);
  // Button outlines and image wireframe X remain until filled in Phase 5
  const wireframeButtonsOpacity = useTransform(scrollYProgress, [0.29, 0.34, 0.58, 0.63], [0, 1, 1, 0]);
  const wireframeImageOpacity = useTransform(scrollYProgress, [0.29, 0.34, 0.58, 0.63], [0, 1, 1, 0]);
  const imageXLinesPath = useTransform(scrollYProgress, [0.30, 0.37], [0, 1]);

  // Red Dimensions (439, 52, 362) — visible across wireframe, typography & swatches, fades out in Phase 7
  const dimensionsOpacity = useTransform(scrollYProgress, [0.29, 0.35, 0.81, 0.85], [0, 1, 1, 0]);

  // Phase 4: Typography Left-to-Right Reveal (SIMULTANEOUS with wireframe shapes fading!)
  const typoSweepClipW = useTransform(scrollYProgress, [0.41, 0.50], [0, 920]);
  const typographyOpacity = useTransform(scrollYProgress, [0.41, 0.43], [0, 1]);

  // Phase 5: Colors — SEQUENTIAL sub-steps (matching Image 2 -> Image 3 -> Image 4)
  // Step A: 3 color dots + labels appear FIRST (no lines yet)
  const colorDotsOpacity = useTransform(scrollYProgress, [0.53, 0.56, 0.64, 0.67], [0, 1, 1, 0]);
  // Step B: Leader lines expand FROM dots INTO card
  const leaderLinesOpacity = useTransform(scrollYProgress, [0.56, 0.58, 0.64, 0.67], [0, 1, 1, 0]);
  const swatch1LinePath = useTransform(scrollYProgress, [0.56, 0.61], [0, 1]);
  const swatch2LinePath = useTransform(scrollYProgress, [0.57, 0.62], [0, 1]);
  const swatch3LinePath = useTransform(scrollYProgress, [0.58, 0.63], [0, 1]);
  // Step C: Primary button fills from LEFT to RIGHT (clip width grows 0 -> 170)
  const buttonFillClipW = useTransform(scrollYProgress, [0.58, 0.64], [0, 170]);
  // Step D: Hero image reveals from BOTTOM to TOP (height grows 0 -> 362, y moves 450 -> 88)
  const heroImageClipH = useTransform(scrollYProgress, [0.58, 0.65], [0, 362]);
  const heroImageClipY = useTransform(scrollYProgress, [0.58, 0.65], [450, 88]);
  // Step E: Secondary "See the work" button fade in
  const secondaryBtnOpacity = useTransform(scrollYProgress, [0.59, 0.63], [0, 1]);

  // Phase 6: Code Window & Curved Connector Line
  const codeWindowOpacity = useTransform(scrollYProgress, [0.67, 0.71, 0.78, 0.81], [0, 1, 1, 0]);
  const codeWindowScale = useTransform(scrollYProgress, [0.67, 0.71], [0.92, 1.0]);
  const codeConnectorLinePath = useTransform(scrollYProgress, [0.70, 0.76], [0, 1]);
  const codeConnectorOpacity = useTransform(scrollYProgress, [0.69, 0.72, 0.78, 0.81], [0, 1, 1, 0]);

  // Phase 7: Live Browser Chrome (0.81 - 0.86, hits 085% as in Image 1)
  const liveBrowserChromeOpacity = useTransform(scrollYProgress, [0.81, 0.84], [0, 1]);

  // Phase 8: Finale Sequence (0.86 - 1.00)
  // Step 1: Individual staggered glide of each layout element behind the button (0.86 - 0.93)
  // 1. Secondary button "See the work" (x: 200, y: 302) glides left directly into primary button (x: 25, y: 302)
  const secBtnFinaleX = useTransform(scrollYProgress, [0.860, 0.880], [0, -175]);
  const secBtnFinaleScale = useTransform(scrollYProgress, [0.860, 0.880], [1, 0.5]);
  const secBtnFinaleOpacity = useTransform(scrollYProgress, [0.860, 0.876, 0.880], [1, 0.7, 0]);
  const secBtnFinaleFilter = useTransform(scrollYProgress, [0.860, 0.878], ["blur(0px)", "blur(6px)"]);

  // 2. Hero Photograph (x: 490, y: 88) glides down-left behind button (105, 328)
  const heroFinaleX = useTransform(scrollYProgress, [0.866, 0.892], [0, -566]);
  const heroFinaleY = useTransform(scrollYProgress, [0.866, 0.892], [0, 59]);
  const heroFinaleScale = useTransform(scrollYProgress, [0.866, 0.892], [1, 0.15]);
  const heroFinaleOpacity = useTransform(scrollYProgress, [0.866, 0.888, 0.892], [1, 0.5, 0]);
  const heroFinaleFilter = useTransform(scrollYProgress, [0.866, 0.890], ["blur(0px)", "blur(10px)"]);

  // 3. Paragraph text (y: 254) slides down behind button (y: 302)
  const paraFinaleY = useTransform(scrollYProgress, [0.872, 0.898], [0, 60]);
  const paraFinaleScale = useTransform(scrollYProgress, [0.872, 0.898], [1, 0.4]);
  const paraFinaleOpacity = useTransform(scrollYProgress, [0.872, 0.894, 0.898], [1, 0.5, 0]);
  const paraFinaleFilter = useTransform(scrollYProgress, [0.872, 0.896], ["blur(0px)", "blur(6px)"]);

  // 4. Headline text "Take a closer look." (y: 142) glides down behind button
  const headlineFinaleY = useTransform(scrollYProgress, [0.878, 0.906], [0, 155]);
  const headlineFinaleScale = useTransform(scrollYProgress, [0.878, 0.906], [1, 0.3]);
  const headlineFinaleOpacity = useTransform(scrollYProgress, [0.878, 0.902, 0.906], [1, 0.5, 0]);
  const headlineFinaleFilter = useTransform(scrollYProgress, [0.878, 0.904], ["blur(0px)", "blur(8px)"]);

  // 5. Nav Pills (x: ~753, y: 52) glide down-left behind button
  const navPillsFinaleX = useTransform(scrollYProgress, [0.885, 0.912], [0, -648]);
  const navPillsFinaleY = useTransform(scrollYProgress, [0.885, 0.912], [0, 265]);
  const navPillsFinaleScale = useTransform(scrollYProgress, [0.885, 0.912], [1, 0.2]);
  const navPillsFinaleOpacity = useTransform(scrollYProgress, [0.885, 0.908, 0.912], [1, 0.5, 0]);
  const navPillsFinaleFilter = useTransform(scrollYProgress, [0.885, 0.910], ["blur(0px)", "blur(8px)"]);

  // 6. Live browser chrome URL bar & performance badges (x: ~589, y: 8) glide down-left behind button
  const chromeFinaleX = useTransform(scrollYProgress, [0.892, 0.918], [0, -484]);
  const chromeFinaleY = useTransform(scrollYProgress, [0.892, 0.918], [0, 309]);
  const chromeFinaleScale = useTransform(scrollYProgress, [0.892, 0.918], [1, 0.2]);
  const chromeFinaleOpacity = useTransform(scrollYProgress, [0.892, 0.914, 0.918], [1, 0.5, 0]);
  const chromeFinaleFilter = useTransform(scrollYProgress, [0.892, 0.916], ["blur(0px)", "blur(8px)"]);

  // 7. Brand logo "ethixweb." (y: 70) glides down behind button
  const logoFinaleY = useTransform(scrollYProgress, [0.898, 0.924], [0, 232]);
  const logoFinaleScale = useTransform(scrollYProgress, [0.898, 0.924], [1, 0.3]);
  const logoFinaleOpacity = useTransform(scrollYProgress, [0.898, 0.920, 0.924], [1, 0.5, 0]);
  const logoFinaleFilter = useTransform(scrollYProgress, [0.898, 0.922], ["blur(0px)", "blur(6px)"]);

  // 8. Browser header divider line & traffic dots (y: 38) glide down behind button
  const headerLineFinaleY = useTransform(scrollYProgress, [0.904, 0.928], [0, 270]);
  const headerLineFinaleOpacity = useTransform(scrollYProgress, [0.904, 0.925, 0.928], [1, 0.4, 0]);
  const headerLineFinaleFilter = useTransform(scrollYProgress, [0.904, 0.926], ["blur(0px)", "blur(6px)"]);

  // Clean vacuum fade cutoff for any residual card background elements
  const elementsVacuumOpacity = useTransform(scrollYProgress, [0.924, 0.928], [1, 0]);

  // Step 2: Layout boundary morphing:
  // - Image 1 -> Image 2 (0.86 - 0.925): Full card (877x548, rx 10) contracts to concentric pill (176x68, rx 34) hugging the button
  // - Image 2 -> Image 3 (0.925 - 0.950): Boundary EXPANDS to give more space from button (194x60, rx 18)
  // - Image 3 -> Image 4 (0.950 - 1.000): Boundary remains stable at 194x60, rx 18, meeting the crossroads lines
  const boundaryX = useTransform(scrollYProgress, [0.86, 0.925, 0.95, 0.97], [0, 17, 8, 8]);
  const boundaryY = useTransform(scrollYProgress, [0.86, 0.925, 0.95, 0.97], [0, 294, 298, 298]);
  const boundaryW = useTransform(scrollYProgress, [0.86, 0.925, 0.95, 0.97], [877, 176, 194, 194]);
  const boundaryH = useTransform(scrollYProgress, [0.86, 0.925, 0.95, 0.97], [548, 68, 60, 60]);
  const boundaryRx = useTransform(scrollYProgress, [0.86, 0.925, 0.95, 0.97], [10, 34, 18, 18]);

  // Step 3: Button movement: stays near place during vacuum (0.86-0.925), then glides to center (0.935-0.965)
  const buttonFinaleX = useTransform(scrollYProgress, [0.86, 0.925, 0.935, 0.965], [0, 8, 8, 333.5]);
  const buttonFinaleY = useTransform(scrollYProgress, [0.86, 0.925, 0.935, 0.965], [0, 2, 2, -54]);
  const buttonFinaleScale = 1;
  const finaleGlowOpacity = useTransform(scrollYProgress, [0.96, 1.00], [0, 0.45]);

  // Step 4: Architectural drafting frame 4 corner brackets & dimension label (Image 3 & 4)
  const draftingFrameOpacity = useTransform(scrollYProgress, [0.935, 0.95], [0, 1]);

  // Step 5: Crossroads guide lines (Image 3 partial entry -> Image 4 full crossroad)
  const crossroadOpacity = useTransform(scrollYProgress, [0.935, 0.948], [0, 1]);
  const crossroadH1Path = useTransform(scrollYProgress, [0.935, 0.952, 0.975], [0, 0.45, 1]);
  const crossroadH2Path = useTransform(scrollYProgress, [0.935, 0.952, 0.975], [0, 0.45, 1]);
  const crossroadV1Path = useTransform(scrollYProgress, [0.952, 0.980], [0, 1]);
  const crossroadV2Path = useTransform(scrollYProgress, [0.952, 0.980], [0, 1]);

  // Step 6: Annotation "Go on, click me." & curved arrow (0.975 - 1.00, Image 4)
  const annotationScale = useTransform(scrollYProgress, [0.975, 1.00], [0.3, 1]);
  const annotationOpacity = useTransform(scrollYProgress, [0.975, 0.992], [0, 1]);

  // Skip down to next section
  const handleSkip = () => {
    if (containerRef.current) {
      const target = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  const handleStartProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerProjectTransition(e.currentTarget as SVGElement);
  };

  const currentPhase = PHASES[phaseIndex];

  return (
    <section
      id="the-build"
      ref={containerRef}
      className="relative h-[1120vh] bg-paper select-none"
    >
      {/* Pinned Viewport Container */}
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center z-10">
        
        {/* Subtle Architectural Dot Grid Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="arch-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="0.75" className="fill-ink" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-dots)" />
        </svg>

        {/* Full-Screen Architectural Guide Lines Layer (Starts from 0, 100vw, and 0 top) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-15"
          viewBox={`0 0 ${cardBox.vw} ${cardBox.vh}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient definition for vertical lines fading toward the bottom */}
          <defs>
            <linearGradient
              id="fullscreen-vertical-fade"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="0"
              y2={cardBox.vh}
            >
              <stop offset="0%" stopColor="#ff3e3e" stopOpacity="1" />
              <stop
                offset={`${Math.min(95, Math.max(10, Math.round((cardBox.bottom / cardBox.vh) * 100)))}%`}
                stopColor="#ff3e3e"
                stopOpacity="1"
              />
              <stop
                offset={`${Math.min(99, Math.max(20, Math.round(((cardBox.bottom + (cardBox.vh - cardBox.bottom) * 0.45) / cardBox.vh) * 100)))}%`}
                stopColor="#ff3e3e"
                stopOpacity="0.35"
              />
              <stop offset="100%" stopColor="#ff3e3e" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ========================================================= */}
          {/* RED GUIDE LINES: OUTER (Phase 1) & INNER (Phase 1 & 2)     */}
          {/* ========================================================= */}
          <g>
            {/* --- OUTER BOUNDARY LINES (Phase 1 only, retracts as Phase 2 frame appears) --- */}
            {/* Top boundary line: shoots from left 0 -> vw */}
            <motion.line
              x1="0"
              y1={cardBox.top}
              x2={cardBox.vw}
              y2={cardBox.top}
              stroke="#ff3e3e"
              strokeWidth="0.85"
              style={{ pathLength: outerLinesPath, opacity: outerLinesOpacity }}
            />
            {/* Left window boundary: shoots from top 0 -> vh */}
            <motion.line
              x1={cardBox.left}
              y1="0"
              x2={cardBox.left}
              y2={cardBox.vh}
              stroke="url(#fullscreen-vertical-fade)"
              strokeWidth="0.85"
              style={{ pathLength: outerLinesPath, opacity: outerLinesOpacity }}
            />
            {/* Right window boundary: shoots from top 0 -> vh */}
            <motion.line
              x1={cardBox.right}
              y1="0"
              x2={cardBox.right}
              y2={cardBox.vh}
              stroke="url(#fullscreen-vertical-fade)"
              strokeWidth="0.85"
              style={{ pathLength: outerLinesPath, opacity: outerLinesOpacity }}
            />

            {/* --- INNER GUIDE LINES (Phase 1 & Phase 2, retracts before Phase 3 layout) --- */}
            {/* Header divider line: shoots from right vw -> 0 */}
            <motion.line
              x1={cardBox.vw}
              y1={cardBox.top + (38 / 548) * cardBox.height}
              x2="0"
              y2={cardBox.top + (38 / 548) * cardBox.height}
              stroke="#ff3e3e"
              strokeWidth="0.85"
              style={{ pathLength: innerLinesPath, opacity: innerLinesOpacity }}
            />
            {/* Headline top alignment line: shoots from left 0 -> vw */}
            <motion.line
              x1="0"
              y1={cardBox.top + (88 / 548) * cardBox.height}
              x2={cardBox.vw}
              y2={cardBox.top + (88 / 548) * cardBox.height}
              stroke="#ff3e3e"
              strokeWidth="0.85"
              style={{ pathLength: innerLinesPath, opacity: innerLinesOpacity }}
            />
            {/* Middle buttons/image alignment line: shoots from right vw -> 0 */}
            <motion.line
              x1={cardBox.vw}
              y1={cardBox.top + (302 / 548) * cardBox.height}
              x2="0"
              y2={cardBox.top + (302 / 548) * cardBox.height}
              stroke="#ff3e3e"
              strokeWidth="0.85"
              style={{ pathLength: innerLinesPath, opacity: innerLinesOpacity }}
            />
            {/* Bottom window boundary: shoots from right vw -> 0 */}
            <motion.line
              x1={cardBox.vw}
              y1={cardBox.bottom}
              x2="0"
              y2={cardBox.bottom}
              stroke="#ff3e3e"
              strokeWidth="0.85"
              style={{ pathLength: innerLinesPath, opacity: innerLinesOpacity }}
            />
            {/* Column divider line (along left edge of hero image box, 490/877): shoots from top 0 -> vh */}
            <motion.line
              x1={cardBox.left + (490 / 877) * cardBox.width}
              y1="0"
              x2={cardBox.left + (490 / 877) * cardBox.width}
              y2={cardBox.vh}
              stroke="url(#fullscreen-vertical-fade)"
              strokeWidth="0.85"
              style={{ pathLength: innerLinesPath, opacity: innerLinesOpacity }}
            />

            {/* --- PHASE 2: DASHED VERTICAL CENTERLINE (Visible only in Phase 2) --- */}
            <motion.line
              x1={cardBox.left + cardBox.width * 0.5}
              y1="0"
              x2={cardBox.left + cardBox.width * 0.5}
              y2={cardBox.vh}
              stroke="url(#fullscreen-vertical-fade)"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              style={{ pathLength: dashedCenterPath, opacity: dashedCenterPath }}
            />
          </g>

          {/* Phase 8 Finale: Crossroads Lines forming full crossroad at the button boundary (Image 4) */}
          {(() => {
            const centerScreenX = cardBox.left + cardBox.width * 0.5;
            const centerScreenY = cardBox.top + cardBox.height * 0.5;
            const frameScreenW = (194 / 877) * cardBox.width;
            const frameScreenH = (60 / 548) * cardBox.height;
            const frameTop = centerScreenY - frameScreenH * 0.5;
            const frameBottom = centerScreenY + frameScreenH * 0.5;
            const frameLeft = centerScreenX - frameScreenW * 0.5;
            const frameRight = centerScreenX + frameScreenW * 0.5;

            return (
              <motion.g style={{ opacity: crossroadOpacity }}>
                {/* 1. Horizontal line from left touching button top edge */}
                <motion.line
                  x1="0"
                  y1={frameTop}
                  x2={cardBox.vw}
                  y2={frameTop}
                  stroke="#ff3e3e"
                  strokeWidth="0.85"
                  style={{ pathLength: crossroadH1Path }}
                />
                {/* 2. Horizontal line from right touching button bottom edge */}
                <motion.line
                  x1={cardBox.vw}
                  y1={frameBottom}
                  x2="0"
                  y2={frameBottom}
                  stroke="#ff3e3e"
                  strokeWidth="0.85"
                  style={{ pathLength: crossroadH2Path }}
                />
                {/* 3. Vertical line from top touching button left edge */}
                <motion.line
                  x1={frameLeft}
                  y1="0"
                  x2={frameLeft}
                  y2={cardBox.vh}
                  stroke="url(#fullscreen-vertical-fade)"
                  strokeWidth="0.85"
                  style={{ pathLength: crossroadV1Path }}
                />
                {/* 4. Vertical line from top touching button right edge */}
                <motion.line
                  x1={frameRight}
                  y1="0"
                  x2={frameRight}
                  y2={cardBox.vh}
                  stroke="url(#fullscreen-vertical-fade)"
                  strokeWidth="0.85"
                  style={{ pathLength: crossroadV2Path }}
                />
              </motion.g>
            );
          })()}

          {/* Coordinate Crosshairs at Key Intersections (Phase 1 only) */}
          <motion.g style={{ opacity: coordsOpacity }}>
            {/* Top-Left */}
            <text x={cardBox.left + 8} y={cardBox.top - 8} className="fill-ink/50 font-mono text-[9px]">
              {`x ${Math.round(cardBox.left)} · y ${Math.round(cardBox.top)}`}
            </text>
            <path
              d={`M ${cardBox.left - 6} ${cardBox.top} L ${cardBox.left + 6} ${cardBox.top} M ${cardBox.left} ${cardBox.top - 6} L ${cardBox.left} ${cardBox.top + 6}`}
              stroke="currentColor"
              strokeWidth="0.75"
              className="text-ink/60"
            />

            {/* Top-Right */}
            <text x={cardBox.right - 72} y={cardBox.top - 8} className="fill-ink/50 font-mono text-[9px]">
              {`x ${Math.round(cardBox.right)} · y ${Math.round(cardBox.top)}`}
            </text>
            <path
              d={`M ${cardBox.right - 6} ${cardBox.top} L ${cardBox.right + 6} ${cardBox.top} M ${cardBox.right} ${cardBox.top - 6} L ${cardBox.right} ${cardBox.top + 6}`}
              stroke="currentColor"
              strokeWidth="0.75"
              className="text-ink/60"
            />

            {/* Bottom-Left */}
            <text x={cardBox.left + 8} y={cardBox.bottom + 18} className="fill-ink/50 font-mono text-[9px]">
              {`x ${Math.round(cardBox.left)} · y ${Math.round(cardBox.bottom)}`}
            </text>
            <path
              d={`M ${cardBox.left - 6} ${cardBox.bottom} L ${cardBox.left + 6} ${cardBox.bottom} M ${cardBox.left} ${cardBox.bottom - 6} L ${cardBox.left} ${cardBox.bottom + 6}`}
              stroke="currentColor"
              strokeWidth="0.75"
              className="text-ink/60"
            />

            {/* Bottom-Right */}
            <text x={cardBox.right - 72} y={cardBox.bottom + 18} className="fill-ink/50 font-mono text-[9px]">
              {`x ${Math.round(cardBox.right)} · y ${Math.round(cardBox.bottom)}`}
            </text>
            <path
              d={`M ${cardBox.right - 6} ${cardBox.bottom} L ${cardBox.right + 6} ${cardBox.bottom} M ${cardBox.right} ${cardBox.bottom - 6} L ${cardBox.right} ${cardBox.bottom + 6}`}
              stroke="currentColor"
              strokeWidth="0.75"
              className="text-ink/60"
            />
          </motion.g>
        </svg>

        {/* --- Top-Left: Subtitle & Descriptor (Above y = 92 line, zero overlap) --- */}
        <div className="absolute left-8 sm:left-12 lg:left-14 top-7 sm:top-8 font-mono text-[13px] sm:text-[13.5px] z-30 pointer-events-none">
          <span className="block text-steel font-medium">The build</span>
          <span className="block text-ink/80 mt-0.5 whitespace-nowrap">From a line to a button.</span>
        </div>

        {/* --- Top-Right: Build Progress Counter (Above y = 92 line, zero overlap) --- */}
        <div className="absolute right-8 sm:right-12 lg:right-14 top-7 sm:top-8 text-right font-mono z-30 pointer-events-none">
          <span className="block text-[13px] sm:text-[13.5px] text-steel font-medium">Build progress</span>
          <span className="block text-[54px] sm:text-[64px] font-light text-ink/20 font-mono tracking-tight tabular-nums mt-0.5 leading-none">
            {displayPercent}
          </span>
        </div>

        {/* --- Center Architectural Stage: Exactly 877px x 548px (Matching Image 1, 2, 3, 4, 5) --- */}
        <div
          ref={cardRef}
          className="absolute z-20"
          style={{
            top: cardBox.top,
            left: cardBox.left,
            width: cardBox.width,
            height: cardBox.height,
          }}
        >
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 877 548"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Rounded Clip Path for Hero Image (static) */}
              <clipPath id="hero-img-clip">
                <rect x="490" y="88" width="362" height="362" rx="14" />
              </clipPath>

              {/* Animated clipPath for left-to-right TYPOGRAPHY reveal */}
              <clipPath id="typo-sweep-clip">
                <motion.rect x="-20" y="-10" height="420" width={typoSweepClipW} />
              </clipPath>

              {/* Animated clipPath for button fill LEFT-TO-RIGHT */}
              <clipPath id="btn-fill-clip">
                <motion.rect x="25" y="302" height="52" rx="26" width={buttonFillClipW} />
              </clipPath>

              {/* Animated clipPath for hero image BOTTOM-TO-TOP reveal */}
              <clipPath id="hero-reveal-clip">
                <motion.rect
                  x="490"
                  width="362"
                  rx="14"
                  y={heroImageClipY}
                  height={heroImageClipH}
                />
              </clipPath>

              {/* Code window shadow filter */}
              <filter id="code-shadow" x="-20%" y="-20%" width="150%" height="150%">
                <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="#000000" floodOpacity="0.32" />
              </filter>

              {/* Button centered glow aura filter */}
              <filter id="btn-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="16" result="blur" />
              </filter>
            </defs>

            {/* ========================================================= */}
            {/* MORPHING LAYOUT BOUNDARY (Images 1 -> 2 -> 3 -> 4 -> 5)   */}
            {/* Starts as full 877x548 card, shrinks into concentric pill */}
            {/* around the button, then glides to center as drafting frame*/}
            {/* ========================================================= */}
            <motion.g
              style={{
                x: buttonFinaleX,
                y: buttonFinaleY,
                transformOrigin: "105px 328px",
              }}
            >
              {/* Outer boundary rect: morphs from full browser card 877x548 to concentric pill 176x68 rx=34, then drafting frame 190x52 rx=4 */}
              <motion.rect
                x={boundaryX}
                y={boundaryY}
                width={boundaryW}
                height={boundaryH}
                rx={boundaryRx}
                stroke="currentColor"
                strokeWidth="1"
                className="text-ink/40 dark:text-ink/50 fill-paper/90 dark:fill-surface/90"
                style={{
                  pathLength: browserFramePath,
                  opacity: browserFrameOpacity,
                }}
              />

              {/* 4 Red Corner Drafting Brackets & Dimension Label (Image 3 & 4) */}
              <motion.g style={{ opacity: draftingFrameOpacity }}>
                {/* 4 Corner tick squares for 194x60 boundary (x: 8, y: 298 to x: 202, y: 358) */}
                <rect x="5.5" y="295.5" width="5" height="5" fill="#ff7a7a" />
                <rect x="199.5" y="295.5" width="5" height="5" fill="#ff7a7a" />
                <rect x="5.5" y="355.5" width="5" height="5" fill="#ff7a7a" />
                <rect x="199.5" y="355.5" width="5" height="5" fill="#ff7a7a" />

                {/* Dimension Label: Button · 190 × 52 */}
                <text
                  x="105"
                  y="374"
                  textAnchor="middle"
                  fill="#ff7a7a"
                  className="font-mono text-[9.5px] font-medium tracking-wide pointer-events-none select-none"
                >
                  Button · 190 × 52
                </text>
              </motion.g>
            </motion.g>

            {/* ========================================================= */}
            {/* INNER ELEMENTS (VACUUM GROUP): Staggered glide behind      */}
            {/* the button one-by-one in Phase 8 (Images 1, 2, 3)         */}
            {/* ========================================================= */}
            <motion.g
              style={{
                opacity: elementsVacuumOpacity,
              }}
            >
              {/* Phase 2: 12 Translucent Columns (expand top-to-bottom) */}
              <motion.g
                style={{
                  scaleY: columnsScaleY,
                  opacity: columnsOpacity,
                  transformOrigin: "438.5px 38px",
                }}
              >
                {Array.from({ length: 12 }).map((_, i) => {
                  const colW = 57;
                  const gap = 13;
                  const startX = 25 + i * (colW + gap);
                  return (
                    <rect
                      key={`grid-col-${i}`}
                      x={startX}
                      y="38"
                      width={colW}
                      height="510"
                      fill="#ff3e3e"
                      fillOpacity="0.045"
                    />
                  );
                })}
              </motion.g>

              {/* Top Dimension: 877 x 548 (Matching Image 1) */}
              <motion.g style={{ opacity: topDimensionOpacity }}>
                <line x1="0" y1="-14" x2="877" y2="-14" stroke="#ff3e3e" strokeWidth="0.75" />
                <line x1="0" y1="-19" x2="0" y2="-9" stroke="#ff3e3e" strokeWidth="0.75" />
                <line x1="877" y1="-19" x2="877" y2="-9" stroke="#ff3e3e" strokeWidth="0.75" />
                <text x="438.5" y="-18" textAnchor="middle" className="fill-accent font-mono text-[9px] font-medium">
                  877 x 548
                </text>
              </motion.g>

              {/* Browser Header Divider & Traffic Light Dots (glide down behind button) */}
              <motion.g
                style={{
                  y: headerLineFinaleY,
                  opacity: headerLineFinaleOpacity,
                  filter: headerLineFinaleFilter,
                  transformOrigin: "438.5px 38px",
                }}
              >
                <motion.g style={{ opacity: browserFrameOpacity }}>
                  <line
                    x1="0"
                    y1="38"
                    x2="877"
                    y2="38"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    className="text-ink/25 dark:text-ink/35"
                  />
                  <circle cx="20" cy="19" r="3" className="fill-ink/35" />
                  <circle cx="31" cy="19" r="3" className="fill-ink/35" />
                  <circle cx="42" cy="19" r="3" className="fill-ink/35" />
                </motion.g>
              </motion.g>

              {/* ========================================================= */}
              {/* PHASE 7: LIVE BROWSER CHROME (glide down-left behind btn) */}
              {/* ========================================================= */}
              <motion.g
                style={{
                  x: chromeFinaleX,
                  y: chromeFinaleY,
                  scale: chromeFinaleScale,
                  opacity: chromeFinaleOpacity,
                  filter: chromeFinaleFilter,
                  transformOrigin: "589px 19px",
                }}
              >
                <motion.g style={{ opacity: liveBrowserChromeOpacity }}>
                  {/* Center URL Address Bar Pill */}
                  <rect
                    x="368"
                    y="8"
                    width="142"
                    height="22"
                    rx="11"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    className="text-ink/30 fill-ink/[0.03]"
                  />
                  <circle cx="384" cy="19" r="2.5" fill="#ff3e3e" />
                  <text
                    x="440"
                    y="22.5"
                    textAnchor="middle"
                    className="fill-ink/75 font-mono text-[10px]"
                  >
                    ethixweb.com
                  </text>

                  {/* Right Performance Badges: 0.4 s · 100 / 100 · AA */}
                  <g>
                    {/* Badge 1: 0.4 s */}
                    <rect x="668" y="8" width="40" height="22" rx="11" fill="#121214" />
                    <text x="688" y="22.5" textAnchor="middle" fill="#ffffff" className="font-mono text-[9px] font-medium">
                      0.4 s
                    </text>

                    {/* Badge 2: 100 / 100 */}
                    <rect x="714" y="8" width="56" height="22" rx="11" fill="#121214" />
                    <text x="742" y="22.5" textAnchor="middle" fill="#ffffff" className="font-mono text-[9px] font-medium">
                      100 / 100
                    </text>

                    {/* Badge 3: AA */}
                    <rect x="776" y="8" width="34" height="22" rx="11" fill="#121214" />
                    <text x="793" y="22.5" textAnchor="middle" fill="#ffffff" className="font-mono text-[9px] font-medium">
                      AA
                    </text>
                  </g>
                </motion.g>
              </motion.g>

              {/* ========================================================= */}
              {/* PHASE 3: WIREFRAME PLACEHOLDER SURFACES (Fades in Phase 4) */}
              {/* ========================================================= */}
              <motion.g
                style={{
                  scale: wireframeShapesScale,
                  opacity: wireframeShapesOpacity,
                  transformOrigin: "25px 88px",
                }}
              >
                {/* Brand Logo Placeholder Pill */}
                <rect
                  x="25"
                  y="52"
                  width="70"
                  height="22"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="0.85"
                  className="text-ink/60"
                />

                {/* Right Three Nav Pills */}
                <rect x="654" y="52" width="58" height="22" rx="11" stroke="currentColor" strokeWidth="0.85" className="text-ink/60" />
                <rect x="722" y="52" width="58" height="22" rx="11" stroke="currentColor" strokeWidth="0.85" className="text-ink/60" />
                <rect x="790" y="52" width="62" height="22" rx="11" stroke="currentColor" strokeWidth="0.85" className="text-ink/60" />

                {/* Headline Outline Box (w 439) & Inside Grey Bars */}
                <rect
                  x="25"
                  y="88"
                  width="439"
                  height="116"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="0.85"
                  className="text-ink/60"
                />
                <motion.rect
                  x="37"
                  y="100"
                  width="142"
                  height="34"
                  rx="3"
                  className="fill-ink/15 dark:fill-ink/25"
                  style={{ scaleX: wireframeBarsScaleX, transformOrigin: "37px 100px" }}
                />
                <motion.rect
                  x="37"
                  y="148"
                  width="246"
                  height="34"
                  rx="3"
                  className="fill-ink/15 dark:fill-ink/25"
                  style={{ scaleX: wireframeBarsScaleX, transformOrigin: "37px 148px" }}
                />

                {/* Paragraph Placeholder Box & Lines */}
                <rect
                  x="25"
                  y="236"
                  width="260"
                  height="50"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="0.85"
                  className="text-ink/60"
                />
                <rect x="35" y="246" width="235" height="8" rx="2" className="fill-ink/15 dark:fill-ink/25" />
                <rect x="35" y="258" width="200" height="8" rx="2" className="fill-ink/15 dark:fill-ink/25" />
                <rect x="35" y="270" width="150" height="8" rx="2" className="fill-ink/15 dark:fill-ink/25" />
              </motion.g>

              {/* Wireframe Button Outlines (visible in Phase 3 & 4 until filled in Phase 5) */}
              <motion.g style={{ opacity: wireframeButtonsOpacity }}>
                {/* Left Button Wireframe Pill */}
                <rect
                  x="25"
                  y="302"
                  width="160"
                  height="52"
                  rx="26"
                  stroke="currentColor"
                  strokeWidth="0.85"
                  className="text-ink/70"
                />
                <rect x="45" y="321" width="80" height="14" rx="3" className="fill-ink/15 dark:fill-ink/25" />
                <circle cx="155" cy="328" r="3.5" fill="#ff3e3e" />

                {/* Right Button Wireframe Pill */}
                <rect
                  x="200"
                  y="302"
                  width="150"
                  height="52"
                  rx="26"
                  stroke="currentColor"
                  strokeWidth="0.85"
                  className="text-ink/50"
                />
              </motion.g>

              {/* Wireframe Hero Image Box with Diagonal X (Fades in Phase 5) */}
              <motion.g style={{ opacity: wireframeImageOpacity }}>
                <rect
                  x="490"
                  y="88"
                  width="362"
                  height="362"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="0.85"
                  className="text-ink/60"
                />
                <motion.line
                  x1="490"
                  y1="88"
                  x2="852"
                  y2="450"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  className="text-ink/50"
                  style={{ pathLength: imageXLinesPath }}
                />
                <motion.line
                  x1="490"
                  y1="450"
                  x2="852"
                  y2="88"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  className="text-ink/50"
                  style={{ pathLength: imageXLinesPath }}
                />
              </motion.g>

              {/* ========================================================= */}
              {/* PHASE 4: LEFT-TO-RIGHT TYPOGRAPHY REVEAL (Image 1 ~051%)  */}
              {/* Shapes fade SIMULTANEOUSLY as text sweeps in L→R          */}
              {/* ========================================================= */}
              <motion.g
                style={{ opacity: typographyOpacity }}
                clipPath="url(#typo-sweep-clip)"
              >
                {/* Brand Logo Text (glides down behind button) */}
                <motion.g
                  style={{
                    y: logoFinaleY,
                    scale: logoFinaleScale,
                    opacity: logoFinaleOpacity,
                    filter: logoFinaleFilter,
                    transformOrigin: "25px 70px",
                  }}
                >
                  <text x="25" y="70" className="font-display font-bold text-[22px] tracking-tight fill-ink">
                    ethixweb<tspan fill="#ff3e3e">.</tspan>
                  </text>
                </motion.g>

                {/* Nav Pills with Text (glides down-left behind button) */}
                <motion.g
                  style={{
                    x: navPillsFinaleX,
                    y: navPillsFinaleY,
                    scale: navPillsFinaleScale,
                    opacity: navPillsFinaleOpacity,
                    filter: navPillsFinaleFilter,
                    transformOrigin: "753px 63px",
                  }}
                >
                  <rect x="654" y="52" width="58" height="22" rx="11" stroke="currentColor" strokeWidth="0.75" className="text-ink/30 fill-ink/[0.02]" />
                  <text x="683" y="66.5" textAnchor="middle" className="font-sans text-[11px] font-medium fill-ink/80">
                    Work
                  </text>

                  <rect x="722" y="52" width="58" height="22" rx="11" stroke="currentColor" strokeWidth="0.75" className="text-ink/30 fill-ink/[0.02]" />
                  <text x="751" y="66.5" textAnchor="middle" className="font-sans text-[11px] font-medium fill-ink/80">
                    Services
                  </text>

                  <rect x="790" y="52" width="62" height="22" rx="11" stroke="currentColor" strokeWidth="0.75" className="text-ink/30 fill-ink/[0.02]" />
                  <text x="821" y="66.5" textAnchor="middle" className="font-sans text-[11px] font-medium fill-ink/80">
                    About
                  </text>
                </motion.g>

                {/* Bold Headline: "Take a closer look." (glides down behind button) */}
                <motion.g
                  style={{
                    y: headlineFinaleY,
                    scale: headlineFinaleScale,
                    opacity: headlineFinaleOpacity,
                    filter: headlineFinaleFilter,
                    transformOrigin: "25px 169px",
                  }}
                >
                  <text x="25" y="142" className="font-display font-extrabold text-[44px] tracking-tight leading-[0.9] fill-ink">
                    We run the tech.
                  </text>
                  <text x="25" y="194" className="font-display font-extrabold text-[44px] tracking-tight leading-[0.9] fill-ink">
                    You run the business.
                  </text>
                </motion.g>

                {/* Paragraph Description (slides down behind button) */}
                <motion.g
                  style={{
                    y: paraFinaleY,
                    scale: paraFinaleScale,
                    opacity: paraFinaleOpacity,
                    filter: paraFinaleFilter,
                    transformOrigin: "25px 263px",
                  }}
                >
                  <text x="25" y="254" className="font-sans text-[13px] fill-steel font-normal leading-relaxed">
                    Senior digital operations team from Kent, WA.
                  </text>
                  <text x="25" y="272" className="font-sans text-[13px] fill-steel font-normal leading-relaxed">
                    AI agents, CRM integrations, websites, SEO and ads.
                  </text>
                </motion.g>
              </motion.g>

              {/* ========================================================= */}
              {/* RED DIMENSIONS: 439 (headline), 52 (btn), 362 (image)     */}
              {/* ========================================================= */}
              <motion.g style={{ opacity: dimensionsOpacity }}>
                {/* 439 Width Dimension */}
                <line x1="25" y1="218" x2="464" y2="218" stroke="#ff3e3e" strokeWidth="0.75" />
                <line x1="25" y1="214" x2="25" y2="222" stroke="#ff3e3e" strokeWidth="0.75" />
                <line x1="464" y1="214" x2="464" y2="222" stroke="#ff3e3e" strokeWidth="0.75" />
                <text x="244.5" y="216" textAnchor="middle" className="fill-accent font-mono text-[9px] font-medium">
                  439
                </text>

                {/* 52 Height Dimension */}
                <line x1="12" y1="302" x2="12" y2="354" stroke="#ff3e3e" strokeWidth="0.75" />
                <line x1="8" y1="302" x2="16" y2="302" stroke="#ff3e3e" strokeWidth="0.75" />
                <line x1="8" y1="354" x2="16" y2="354" stroke="#ff3e3e" strokeWidth="0.75" />
                <text x="4" y="331" textAnchor="end" className="fill-accent font-mono text-[9px] font-medium">
                  52
                </text>

                {/* 362 Height Dimension */}
                <line x1="866" y1="88" x2="866" y2="450" stroke="#ff3e3e" strokeWidth="0.75" />
                <line x1="862" y1="88" x2="870" y2="88" stroke="#ff3e3e" strokeWidth="0.75" />
                <line x1="862" y1="450" x2="870" y2="450" stroke="#ff3e3e" strokeWidth="0.75" />
                <text x="876" y="273" textAnchor="start" className="fill-accent font-mono text-[9px] font-medium">
                  362
                </text>
              </motion.g>

              {/* ========================================================= */}
              {/* PHASE 5: HERO IMAGE (glides down-left behind button)      */}
              {/* ========================================================= */}
              <motion.g
                style={{
                  x: heroFinaleX,
                  y: heroFinaleY,
                  scale: heroFinaleScale,
                  opacity: heroFinaleOpacity,
                  filter: heroFinaleFilter,
                  transformOrigin: "671px 269px",
                }}
              >
                <g clipPath="url(#hero-reveal-clip)">
                  <image
                    href="/images/lens_red_dot.webp"
                    x="490"
                    y="88"
                    width="362"
                    height="362"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#hero-img-clip)"
                  />
                </g>
              </motion.g>

              {/* Secondary Filled Button: "See the work" (slides left into button) */}
              <motion.g
                style={{
                  x: secBtnFinaleX,
                  scale: secBtnFinaleScale,
                  opacity: secBtnFinaleOpacity,
                  filter: secBtnFinaleFilter,
                  transformOrigin: "275px 328px",
                }}
              >
                <motion.g style={{ opacity: secondaryBtnOpacity }}>
                  <rect
                    x="200"
                    y="302"
                    width="150"
                    height="52"
                    rx="26"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    className="text-ink/15 fill-ink/[0.04] dark:fill-white/10"
                  />
                  <text x="218" y="333" className="font-sans font-medium text-[13px] fill-ink/80">
                    See the work
                  </text>
                  <circle cx="324" cy="328" r="14" className="fill-ink/10 dark:fill-white/15" />
                </motion.g>
              </motion.g>
            </motion.g>

            {/* ========================================================= */}
            {/* PHASE 5: COLOR SWATCHES — DOTS APPEAR FIRST, THEN LINES   */}
            {/* ========================================================= */}

            {/* Step A: 3 color dots + labels appear FIRST (no lines yet) */}
            <motion.g style={{ opacity: colorDotsOpacity }}>
              {/* Swatch 1: Ink #121214 */}
              <text x="-96" y="137" textAnchor="end" className="font-sans text-[11px] font-medium fill-ink/80">
                Ink
              </text>
              <text x="-96" y="149" textAnchor="end" className="font-mono text-[9px] fill-steel">
                #121214
              </text>
              <circle cx="-80" cy="141" r="7" fill="#121214" stroke="#ffffff" strokeWidth="0.75" />

              {/* Swatch 2: Paper #f4f4f2 */}
              <text x="-96" y="247" textAnchor="end" className="font-sans text-[11px] font-medium fill-ink/80">
                Paper
              </text>
              <text x="-96" y="259" textAnchor="end" className="font-mono text-[9px] fill-steel">
                #f4f4f2
              </text>
              <circle cx="-80" cy="251" r="7" fill="#f4f4f2" stroke="currentColor" strokeWidth="0.75" className="text-ink/20" />

              {/* Swatch 3: Dot #ff3e3e */}
              <text x="-96" y="324" textAnchor="end" className="font-sans text-[11px] font-medium fill-ink/80">
                Dot
              </text>
              <text x="-96" y="336" textAnchor="end" className="font-mono text-[9px] fill-steel">
                #ff3e3e
              </text>
              <circle cx="-80" cy="328" r="7" fill="#ff3e3e" stroke="#ffffff" strokeWidth="0.75" />
            </motion.g>

            {/* Step B: Leader lines expand FROM dots INTO card */}
            <motion.g style={{ opacity: leaderLinesOpacity }}>
              {/* Ink line → headline */}
              <motion.path
                d="M -70 141 H 15"
                stroke="#ff3e3e"
                strokeWidth="0.85"
                fill="none"
                style={{ pathLength: swatch1LinePath }}
              />
              {/* Paper line → background */}
              <motion.path
                d="M -70 251 H 15"
                stroke="#ff3e3e"
                strokeWidth="0.85"
                fill="none"
                style={{ pathLength: swatch2LinePath }}
              />
              {/* Dot line → button 52 dimension */}
              <motion.path
                d="M -70 328 H 15"
                stroke="#ff3e3e"
                strokeWidth="0.85"
                fill="none"
                style={{ pathLength: swatch3LinePath }}
              />
            </motion.g>

            {/* ========================================================= */}
            {/* PHASE 6: FLOATING CODE WINDOW `BUTTON.TSX` (Image 3 ~076%)*/}
            {/* ========================================================= */}
            <motion.g
              style={{
                opacity: codeWindowOpacity,
                scale: codeWindowScale,
                transformOrigin: "630px 185px",
              }}
            >
              {/* Window Container */}
              <g filter="url(#code-shadow)">
                <rect
                  x="450"
                  y="70"
                  width="360"
                  height="230"
                  rx="10"
                  fill="#121214"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                />
              </g>

              {/* Window Header */}
              <circle cx="468" cy="88" r="3" fill="#ff3e3e" />
              <text x="478" y="91" fill="rgba(255, 255, 255, 0.6)" className="font-mono text-[9px] font-semibold tracking-wider">
                BUTTON.TSX
              </text>
              <line x1="450" y1="102" x2="810" y2="102" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.75" />

              {/* Syntax Highlighted Code Lines */}
              {/* Line 1: <Button href="/en/start-project"> */}
              <text x="468" y="122" fill="#52525b" className="font-mono text-[10px]">1</text>
              <text x="488" y="122" className="font-mono text-[10.5px]">
                <tspan fill="#ff5c5c">&lt;Button</tspan>
                <tspan fill="#a1a1aa"> href=</tspan>
                <tspan fill="#34d399">"/contact"</tspan>
                <tspan fill="#ff5c5c">&gt;</tspan>
              </text>

              {/* Line 2: Start a project */}
              <text x="468" y="138" fill="#52525b" className="font-mono text-[10px]">2</text>
              <text x="502" y="138" fill="#ffffff" className="font-mono text-[10.5px] font-medium">
                Start a project
              </text>

              {/* Line 3: </Button> */}
              <text x="468" y="154" fill="#52525b" className="font-mono text-[10px]">3</text>
              <text x="488" y="154" fill="#ff5c5c" className="font-mono text-[10.5px]">
                &lt;/Button&gt;
              </text>

              {/* Line 4 */}
              <text x="468" y="170" fill="#52525b" className="font-mono text-[10px]">4</text>

              {/* Line 5: .btn { */}
              <text x="468" y="186" fill="#52525b" className="font-mono text-[10px]">5</text>
              <text x="488" y="186" fill="#fbbf24" className="font-mono text-[10.5px]">
                .btn <tspan fill="#ffffff">{`{`}</tspan>
              </text>

              {/* Line 6: height: 52px; */}
              <text x="468" y="202" fill="#52525b" className="font-mono text-[10px]">6</text>
              <text x="502" y="202" className="font-mono text-[10.5px]">
                <tspan fill="#a1a1aa">height: </tspan>
                <tspan fill="#60a5fa">52px</tspan>
                <tspan fill="#a1a1aa">;</tspan>
              </text>

              {/* Line 7: border-radius: 999px; */}
              <text x="468" y="218" fill="#52525b" className="font-mono text-[10px]">7</text>
              <text x="502" y="218" className="font-mono text-[10.5px]">
                <tspan fill="#a1a1aa">border-radius: </tspan>
                <tspan fill="#60a5fa">999px</tspan>
                <tspan fill="#a1a1aa">;</tspan>
              </text>

              {/* Line 8: } */}
              <text x="468" y="234" fill="#52525b" className="font-mono text-[10px]">8</text>
              <text x="488" y="234" fill="#ffffff" className="font-mono text-[10.5px]">
                {`}`}
              </text>

              {/* Line 9: .btn-dot { background: #ff3e3e } */}
              <text x="468" y="250" fill="#52525b" className="font-mono text-[10px]">9</text>
              <text x="488" y="250" className="font-mono text-[10.5px]">
                <tspan fill="#fbbf24">.btn-dot </tspan>
                <tspan fill="#ffffff">{`{ `}</tspan>
                <tspan fill="#a1a1aa">background: </tspan>
                <tspan fill="#ff5c5c">#ff3e3e </tspan>
                <tspan fill="#ffffff">{`}`}</tspan>
              </text>
            </motion.g>

            {/* Phase 6: Animated Curved Connecting Line from Code to Button */}
            <motion.g style={{ opacity: codeConnectorOpacity }}>
              {/* Connector line Bezier path curving from line 1 of Code Window to Start a project Button */}
              <motion.path
                d="M 450 122 C 375 140, 270 230, 185 328"
                stroke="#ff3e3e"
                strokeWidth="1.2"
                fill="none"
                style={{ pathLength: codeConnectorLinePath }}
              />
              {/* Small terminal node circle on the button right edge */}
              <circle cx="185" cy="328" r="3.5" fill="#paper" stroke="#ff3e3e" strokeWidth="1.2" />
            </motion.g>

            {/* ========================================================= */}
            {/* HERO PRIMARY BUTTON: "Start a project ↗"                   */}
            {/* Moves to the exact center of screen in Phase 8 Finale     */}
            {/* ========================================================= */}
            <motion.g
              style={{
                x: buttonFinaleX,
                y: buttonFinaleY,
                scale: buttonFinaleScale,
                transformOrigin: "105px 328px",
              }}
              className="cursor-pointer pointer-events-auto"
              onClick={handleStartProject}
            >
              {/* Pulsing glow aura when centered in finale */}
              <motion.rect
                x="15"
                y="292"
                width="180"
                height="72"
                rx="36"
                fill="#ff3e3e"
                filter="url(#btn-glow)"
                style={{ opacity: finaleGlowOpacity }}
              />

              {/* Filled button content reveals from left-to-right via clipPath */}
              <g clipPath="url(#btn-fill-clip)">
                {/* Button Shadow and Body */}
                <rect
                  x="25"
                  y="302"
                  width="160"
                  height="52"
                  rx="26"
                  fill="#121214"
                  className="transition-transform duration-300 hover:scale-[1.02]"
                />

                {/* Button Text */}
                <text
                  x="44"
                  y="333"
                  className="font-sans font-medium text-[13px] fill-white pointer-events-none select-none tracking-tight"
                >
                  Start a project
                </text>

                {/* Red Dot with White Arrow */}
                <circle cx="155" cy="328" r="14" fill="#ff3e3e" className="pointer-events-none" />
                <path
                  d="M 151 332 L 159 324 M 159 324 H 153 M 159 324 V 330"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pointer-events-none"
                />
              </g>

              {/* Phase 8 Finale: "Go on, click me." & Playful Curved Arrow (Image 5) */}
              <motion.g
                style={{
                  scale: annotationScale,
                  opacity: annotationOpacity,
                  transformOrigin: "205px 275px",
                }}
              >
                {/* Handwritten Cursive Text */}
                <text
                  x="202"
                  y="262"
                  fill="#ff3e3e"
                  style={{ fontFamily: "'Caveat', cursive" }}
                  className="text-[23px] font-bold select-none pointer-events-none"
                >
                  Let's build yours.
                </text>

                {/* Playful Curved Arrow pointing at button's red arrow circle */}
                <path
                  d="M 212 274 C 210 294, 196 312, 173 322"
                  stroke="#ff3e3e"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 180 315 L 172 322 L 182 326"
                  stroke="#ff3e3e"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.g>
            </motion.g>
          </svg>
        </div>

        {/* --- Bottom-Left: Phase Stepper, Title, and Descriptor --- */}
        <div
          className="absolute left-8 sm:left-12 lg:left-14 max-w-sm sm:max-w-lg z-30 pointer-events-none"
          style={{ top: Math.min(cardBox.vh - 150, cardBox.bottom + 18) }}
        >
          <div className="flex items-center gap-3 font-mono text-[13px] sm:text-[13.5px] mb-1">
            <span className="text-accent font-semibold">{currentPhase.num}</span>
            <span className="w-6 h-px bg-line" />
            <span className="text-steel">{currentPhase.total}</span>
          </div>
          <h3 className="font-display text-[26px] sm:text-[32px] font-bold tracking-tight text-ink mb-1">
            {currentPhase.title}
          </h3>
          <p className="font-sans text-[13px] sm:text-[14.5px] text-steel leading-relaxed">
            {currentPhase.desc}
          </p>
        </div>

        {/* --- Bottom-Right: ONLY Skip Button --- */}
        <div
          className="absolute right-8 sm:right-12 lg:right-14 z-30"
          style={{ top: Math.min(cardBox.vh - 54, cardBox.bottom + 22) }}
        >
          <button
            type="button"
            onClick={handleSkip}
            className="group flex items-center gap-2 font-mono text-[13.5px] text-steel hover:text-ink transition-colors cursor-pointer"
          >
            <span>Skip the build</span>
            <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
