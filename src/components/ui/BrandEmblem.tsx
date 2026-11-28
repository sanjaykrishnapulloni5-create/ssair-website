import React from "react";
import Image from "next/image";

interface BrandEmblemProps {
  /** Pixel/Tailwind size class for the circular emblem. */
  className?: string;
  /** Show the green live-status indicator dot on the bottom-right corner. */
  showStatusDot?: boolean;
}

/**
 * Renders the circular Sri Srinivasa AI Robotics (SSAIR) corporate emblem.
 */
export function BrandEmblem({
  className = "w-10 h-10",
  showStatusDot = false,
}: BrandEmblemProps) {
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center rounded-full ${className}`}>
      <Image
        src="/images/ssair-logo.png"
        alt="Sri Srinivasa AI Robotics (SSAIR) emblem"
        width={512}
        height={512}
        className="w-full h-full object-contain rounded-full drop-shadow-sm"
      />
      {showStatusDot && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#050811]" />
      )}
    </span>
  );
}
