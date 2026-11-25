"use client";

import React from "react";

/**
 * Lightweight, zero-lag aerospace VFX backdrop using pure CSS radial gradients
 * (no expensive blur() filter passes) and GPU-composited vector radar telemetry rings.
 */
export function HeroBackdropVFX() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle Engineering Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-85" />

      {/* Feather-smooth Radial Auras (zero filter blur overhead) */}
      <div
        className="absolute -top-48 right-[-10%] w-[820px] h-[820px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(6, 182, 212, 0.16), rgba(37, 99, 235, 0.06) 55%, transparent 100%)",
        }}
      />
      <div
        className="absolute -bottom-56 -left-32 w-[720px] h-[720px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(59, 130, 246, 0.16), rgba(20, 184, 166, 0.05) 55%, transparent 100%)",
        }}
      />

      {/* Precision Orbital Radar & Kinematics Telemetry Reticle behind Showcase */}
      <div className="hidden lg:flex items-center justify-center absolute top-1/2 right-[3%] xl:right-[6%] -translate-y-1/2 w-[560px] h-[560px] opacity-60 dark:opacity-75">
        <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="ssair-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          {/* Outer Rotating Segmented Telemetry Ring */}
          <g className="origin-center animate-radar">
            <circle
              cx="200"
              cy="200"
              r="186"
              fill="none"
              stroke="url(#ssair-ring-grad)"
              strokeWidth="1.2"
              strokeDasharray="24 14 6 14"
            />
            <circle cx="200" cy="14" r="3" fill="#22d3ee" />
            <circle cx="386" cy="200" r="2.5" fill="#3b82f6" />
          </g>

          {/* Counter-Rotating Mid Kinematic Ring */}
          <g className="origin-center animate-radar-reverse">
            <circle
              cx="200"
              cy="200"
              r="152"
              fill="none"
              stroke="rgba(6, 182, 212, 0.24)"
              strokeWidth="1"
              strokeDasharray="4 10"
            />
            <path
              d="M 200 40 L 200 54 M 200 346 L 200 360 M 40 200 L 54 200 M 346 200 L 360 200"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
          </g>

          {/* Static Precision Crosshair Horizon */}
          <circle
            cx="200"
            cy="200"
            r="116"
            fill="none"
            stroke="rgba(59, 130, 246, 0.16)"
            strokeWidth="1"
          />
          <line
            x1="15"
            y1="200"
            x2="385"
            y2="200"
            stroke="rgba(6, 182, 212, 0.08)"
            strokeWidth="1"
          />
          <line
            x1="200"
            y1="15"
            x2="200"
            y2="385"
            stroke="rgba(6, 182, 212, 0.08)"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}

export default HeroBackdropVFX;
