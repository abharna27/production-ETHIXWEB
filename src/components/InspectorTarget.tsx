import { useState, useRef, type ReactNode, type MouseEvent } from "react";

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
      const rawDx = (e.clientX - centerX) * magneticFactor;
      const rawDy = (e.clientY - centerY) * magneticFactor;
      const maxDistance = 14;
      const x = Math.max(-maxDistance, Math.min(maxDistance, rawDx));
      const y = Math.max(-maxDistance, Math.min(maxDistance, rawDy));
      setOffset({ x, y });
    }

    setDims({
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isHovered
          ? "transform 0.08s cubic-bezier(0.25, 1, 0.5, 1)"
          : "transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      className={`relative ${
        className.includes("block") || className.includes("flex") ? "" : "inline-block"
      } ${className}`}
    >
      {children}

      {/* Figma-style Inspector Overlay on Hover */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-[2px] z-40 border border-accent animate-in fade-in duration-100"
          aria-hidden="true"
        >
          {/* 4 Square Corner Anchor Points */}
          <span className="absolute -top-[3px] -left-[3px] h-[5px] w-[5px] bg-accent" />
          <span className="absolute -top-[3px] -right-[3px] h-[5px] w-[5px] bg-accent" />
          <span className="absolute -bottom-[3px] -left-[3px] h-[5px] w-[5px] bg-accent" />
          <span className="absolute -bottom-[3px] -right-[3px] h-[5px] w-[5px] bg-accent" />

          {/* Red Figma Dimensions Pill Badge (outside above top-left) */}
          <div
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              letterSpacing: "0.05em",
              fontSize: "10px",
              lineHeight: "1",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
            className="absolute -top-[23px] left-0 flex items-center gap-1.5 whitespace-nowrap rounded-[2px] bg-accent px-2 py-1 text-white shadow-xs z-50 pointer-events-none select-none"
          >
            <span>{tag}</span>
            <span className="opacity-90">
              {dims.width}×{dims.height}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
