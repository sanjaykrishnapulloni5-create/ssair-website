"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 select-none">
          {isDark ? "Dark Mode" : "Light Mode"}
        </span>
      )}

      {/* Modern High-Precision Sliding Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={!isDark}
        onClick={toggleTheme}
        aria-label={`Current theme is ${isDark ? "Dark" : "Light"}. Click to toggle.`}
        title={isDark ? "Currently Dark Mode. Click to turn on Light Mode." : "Currently Light Mode. Click to turn back to Dark Mode."}
        className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
          isDark
            ? "bg-slate-900 border border-slate-700/80 shadow-inner"
            : "bg-sky-100 border border-sky-300 shadow-inner"
        }`}
      >
        {/* Track Ambient Glow / Accent icons behind thumb */}
        <span className="absolute left-1.5 flex items-center justify-center pointer-events-none opacity-40">
          <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </span>
        <span className="absolute right-1.5 flex items-center justify-center pointer-events-none opacity-40">
          <svg className="w-3.5 h-3.5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>

        {/* Sliding Thumb */}
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          animate={{ x: isDark ? 0 : 26 }}
          className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full transition-shadow duration-200 ${
            isDark
              ? "bg-slate-800 text-cyan-400 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.35)]"
              : "bg-white text-amber-500 border border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.35)]"
          }`}
        >
          {isDark ? (
            /* Crescent Moon Icon in Dark Mode */
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          ) : (
            /* Radiant Sun Icon in Light Mode */
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          )}
        </motion.span>
      </button>
    </div>
  );
}
