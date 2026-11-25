"use client";

import React, { useRef, useState, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

/**
 * Interactive holographic card with smooth cursor-tracking spotlight aura.
 * Note: Uses crisp high-contrast surface without backdrop-blur for 120fps Safari performance.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(6, 182, 212, 0.14)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1224] transition-[border-color,box-shadow] duration-200 hover:border-sky-400/70 dark:hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 ${className}`.trim()}
    >
      {/* Dynamic cursor spotlight (non-blocking top layer) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-20 transition-opacity duration-200"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(460px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />
      {/* Top specular highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-cyan-400/45 to-transparent opacity-70"
      />
      {children}
    </div>
  );
}

export default SpotlightCard;
