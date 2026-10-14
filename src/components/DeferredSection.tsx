import { useState, useEffect, useRef, type ReactNode } from "react";

interface DeferredSectionProps {
  children: ReactNode;
  id?: string;
  minHeight?: string | number;
  rootMargin?: string;
}

export function DeferredSection({
  children,
  id,
  minHeight = "320px",
  rootMargin = "800px 0px",
}: DeferredSectionProps) {
  const isHashTarget =
    typeof window !== "undefined" && Boolean(id && window.location.hash === `#${id}`);
  const [shouldRender, setShouldRender] = useState(isHashTarget);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) return;

    // 1. Intersection Observer with generous margin (preloads well before entering viewport)
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setShouldRender(true);
            observer?.disconnect();
          }
        },
        { rootMargin }
      );
      observer.observe(containerRef.current);
    }

    // 2. Hashchange listener (instant mount if anchor link is clicked)
    const handleHash = () => {
      if (id && window.location.hash === `#${id}`) {
        setShouldRender(true);
      }
    };
    window.addEventListener("hashchange", handleHash);

    // 3. User interaction listener (starts background mount on first scroll or touch)
    const handleInteraction = () => {
      setShouldRender(true);
    };
    window.addEventListener("scroll", handleInteraction, { passive: true, once: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true, once: true });

    // 4. Idle fallback: ensure all content mounts after initial critical window (3.5s)
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 3500);

    return () => {
      observer?.disconnect();
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      clearTimeout(timer);
    };
  }, [id, rootMargin, shouldRender]);

  return (
    <div
      ref={containerRef}
      id={shouldRender ? undefined : id}
      style={{ minHeight: shouldRender ? undefined : minHeight }}
      className="w-full"
    >
      {shouldRender ? children : null}
    </div>
  );
}
