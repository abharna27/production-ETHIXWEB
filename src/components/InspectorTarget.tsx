import { useState, useRef, type ReactNode, type MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

interface InspectorTargetProps {
  children: ReactNode;
  tag?: string; // e.g. "Heading", "Button", "Paragraph", "Tag", "Component"
  className?: string;
  magnetic?: boolean;
  magneticFactor?: number;
}

export function InspectorTarget({
  children,
  tag = "Element",
  className = "",
  magnetic = true,
  magneticFactor = 0.16,
}: InspectorTargetProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dims, setDims] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDims({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    }
    setIsHovered(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    if (magnetic) {
      // Subtle tactile pull within element bounds
      const rawDx = (e.clientX - centerX) * magneticFactor;
      const rawDy = (e.clientY - centerY) * magneticFactor;
      const maxDistance = 14;
      const x = Math.max(-maxDistance, Math.min(maxDistance, rawDx));
      const y = Math.max(-maxDistance, Math.min(maxDistance, rawDy));
      setOffset({ x, y });
    }

    // Keep dimensions updated if responsive
    setDims({
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Fix back to place
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 24,
        mass: 0.5,
      }}
      className={`relative ${
        className.includes("block") || className.includes("flex") ? "" : "inline-block"
      } ${className}`}
    >
      {children}

      {/* Figma-style Inspector Overlay on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute -inset-[2px] z-40 border border-[#ff3e3e]"
            aria-hidden="true"
          >
            {/* 4 Square Corner Anchor Points */}
            <span className="absolute -top-[3px] -left-[3px] h-[5px] w-[5px] bg-[#ff3e3e]" />
            <span className="absolute -top-[3px] -right-[3px] h-[5px] w-[5px] bg-[#ff3e3e]" />
            <span className="absolute -bottom-[3px] -left-[3px] h-[5px] w-[5px] bg-[#ff3e3e]" />
            <span className="absolute -bottom-[3px] -right-[3px] h-[5px] w-[5px] bg-[#ff3e3e]" />

            {/* Red Figma Dimensions Pill Badge (outside above top-left) */}
            <div
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontVariationSettings: "normal",
                letterSpacing: "0.05em",
                fontSize: "10px",
                lineHeight: "1",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
              className="absolute -top-[23px] left-0 flex items-center gap-1.5 whitespace-nowrap rounded-[2px] bg-[#ff3e3e] px-2 py-1 text-white shadow-xs z-50 pointer-events-none select-none"
            >
              <span>{tag}</span>
              <span className="opacity-90">
                {dims.width}×{dims.height}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
