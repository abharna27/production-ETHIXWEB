import { useEffect, useRef } from "react";

export type TransitionSource =
  | HTMLElement
  | SVGElement
  | MouseEvent
  | React.MouseEvent
  | { x: number; y: number }
  | null
  | undefined;

// Global trigger function so any button or handler can call it directly
let globalTriggerTransition: ((source?: TransitionSource) => Promise<void>) | null = null;

export function triggerProjectTransition(source?: TransitionSource) {
  if (globalTriggerTransition) {
    return globalTriggerTransition(source);
  } else {
    const cta = document.getElementById("cta");
    if (cta) cta.scrollIntoView({ behavior: "smooth" });
    return Promise.resolve();
  }
}

export function PageCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const runTransition = async (source?: TransitionSource) => {
      if (isRunningRef.current || !curtainRef.current) return;
      isRunningRef.current = true;

      const el = curtainRef.current;

      // 1. Determine origin coordinates (center of the trigger button)
      let originX = Math.round(window.innerWidth / 2);
      let originY = Math.round(window.innerHeight / 2);

      if (source) {
        if ("getBoundingClientRect" in source && typeof source.getBoundingClientRect === "function") {
          const rect = source.getBoundingClientRect();
          originX = Math.round(rect.left + rect.width / 2);
          originY = Math.round(rect.top + rect.height / 2);
        } else if ("clientX" in source && typeof source.clientX === "number") {
          const target = (source.currentTarget || source.target) as Element | null;
          if (target && typeof target.getBoundingClientRect === "function") {
            const rect = target.getBoundingClientRect();
            originX = Math.round(rect.left + rect.width / 2);
            originY = Math.round(rect.top + rect.height / 2);
          } else {
            originX = Math.round(source.clientX);
            originY = Math.round(source.clientY);
          }
        } else if ("x" in source && "y" in source && typeof source.x === "number") {
          originX = Math.round(source.x);
          originY = Math.round(source.y);
        }
      }

      // Max radius to fully cover screen from (originX, originY)
      const maxRadius1 = Math.ceil(
        Math.hypot(
          Math.max(originX, window.innerWidth - originX),
          Math.max(originY, window.innerHeight - originY)
        ) * 1.15
      );

      // 2. Determine dot color based on theme: black in light mode, white in dark mode
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark" ||
        document.documentElement.classList.contains("dark") ||
        document.documentElement.classList.contains("xray");
      const dotColor = isDark ? "#f4f4f2" : "#0b0b0e";

      // Optional sound click effect (matching navbar click)
      try {
        const audio = new Audio("/click-sound-effects-copyright-free_NBeVl5YB.mp3");
        audio.volume = 0.12;
        audio.play().catch(() => {});
      } catch {}

      // Prepare curtain styling
      el.style.backgroundColor = dotColor;
      el.style.display = "block";
      el.style.pointerEvents = "auto";
      el.style.clipPath = `circle(0px at ${originX}px ${originY}px)`;

      // Phase 1: Expanding dot takes over the whole page (0.68s - slowed by 40%)
      const anim1 = el.animate(
        [
          { clipPath: `circle(0px at ${originX}px ${originY}px)` },
          { clipPath: `circle(${maxRadius1}px at ${originX}px ${originY}px)` },
        ],
        {
          duration: 680,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        }
      );

      await anim1.finished.catch(() => {});

      // Instant jump scroll to the details fill up form (#cta) while screen is 100% covered
      const cta = document.getElementById("cta");
      const ctaCard = (document.querySelector("#cta > div") || cta) as HTMLElement | null;
      if (ctaCard) {
        if (ctaCard.getBoundingClientRect().height > window.innerHeight - 80) {
          ctaCard.scrollIntoView({ behavior: "instant", block: "start" });
        } else {
          ctaCard.scrollIntoView({ behavior: "instant", block: "center" });
        }
      }

      // Calculate destination coordinates: center of the CTA form
      let destX = Math.round(window.innerWidth / 2);
      let destY = Math.round(window.innerHeight / 2);
      if (ctaCard) {
        const rect = ctaCard.getBoundingClientRect();
        destX = Math.round(rect.left + rect.width / 2);
        destY = Math.round(
          Math.max(
            80,
            Math.min(
              window.innerHeight - 80,
              rect.top + Math.min(rect.height * 0.45, window.innerHeight * 0.5)
            )
          )
        );
      }

      const maxRadius2 = Math.ceil(
        Math.hypot(
          Math.max(destX, window.innerWidth - destX),
          Math.max(destY, window.innerHeight - destY)
        ) * 1.15
      );

      // Phase 2: Dot shrinks down into the form, smoothly revealing the page (0.65s - slowed by 40%)
      const anim2 = el.animate(
        [
          { clipPath: `circle(${maxRadius2}px at ${destX}px ${destY}px)` },
          { clipPath: `circle(0px at ${destX}px ${destY}px)` },
        ],
        {
          duration: 650,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        }
      );

      await anim2.finished.catch(() => {});

      // Cleanup
      el.style.display = "none";
      el.style.pointerEvents = "none";
      isRunningRef.current = false;
    };

    globalTriggerTransition = runTransition;

    // Global click interceptor: intercept any link to #cta or button labeled "Start a project"
    const handleGlobalClick = (e: MouseEvent) => {
      // Don't intercept if already running
      if (isRunningRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const target = (e.target as Element | null)?.closest?.(
        'a[href="#cta"], button[data-start-project], [data-cta-link]'
      );

      if (target) {
        e.preventDefault();
        e.stopPropagation();
        runTransition(target as HTMLElement);
      }
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });

    return () => {
      globalTriggerTransition = null;
      window.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return (
    <div
      ref={curtainRef}
      id="project-transition-curtain"
      aria-hidden="true"
      className="fixed inset-0 z-[99999] pointer-events-none select-none"
      style={{ display: "none" }}
    />
  );
}
