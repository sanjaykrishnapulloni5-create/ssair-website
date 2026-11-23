"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const LOG_MESSAGES = [
  "INITIALIZING KINEMATIC DRIVE MATRIX...",
  "SRI SARASWATHI AI & ROBOTICS // CORE ONLINE...",
  "SYNCING SISTER COMPANY: SSAIR DEFENSE R&D...",
  "CALIBRATING 6-DOF PARALLEL MANIPULATOR...",
  "SOVEREIGN AUTONOMY PROTOCOLS [ACTIVE]...",
];

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Check if loading screen already shown in this session
    const hasLoaded = sessionStorage.getItem("ssair_booted");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Fast, smooth counter simulation (~1.2s total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("ssair_booted", "true");
          }, 350);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 10;
        const next = Math.min(prev + increment, 100);
        setLogIndex(Math.min(Math.floor((next / 100) * LOG_MESSAGES.length), LOG_MESSAGES.length - 1));
        return next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="ssair-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden ${
            isDark ? "bg-[#030712] text-white" : "bg-white text-slate-900"
          }`}
        >
          {/* Subtle cyber background grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Central Reactor / Radar Gyroscope */}
          <div className="relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 mb-8">
            {/* Outer spinning dashed ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30 animate-[spin_10s_linear_infinite]" />
            {/* Middle counter-spinning ring */}
            <div className="absolute inset-2 rounded-full border border-blue-500/30 animate-[spin_6s_linear_infinite_reverse]" />
            {/* Inner pulsing glow circle */}
            <div className="absolute inset-6 rounded-full bg-cyan-500/10 blur-md animate-pulse" />
            {/* High-tech hexagonal core */}
            <div className="relative flex flex-col items-center justify-center z-10 font-mono">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                {progress}%
              </span>
              <span className="text-[10px] tracking-widest text-cyan-400/80 uppercase font-semibold mt-1">
                ONLINE
              </span>
            </div>
          </div>

          {/* Company Branding */}
          <div className="text-center px-4 max-w-lg space-y-2 z-10">
            <h2 className="text-xl sm:text-2xl font-black tracking-wider uppercase font-mono bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Sri Srinivasa AI Robotics
            </h2>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Sister Enterprise to Sri Saraswathi AI & Robotics</span>
            </div>

            {/* Progress Bar */}
            <div className="w-64 sm:w-80 h-1.5 bg-zinc-800/80 rounded-full mx-auto mt-6 overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Dynamic Telemetry Log */}
            <div className="h-6 mt-4">
              <p className="text-[11px] font-mono text-cyan-400/90 tracking-wider">
                {LOG_MESSAGES[logIndex]}
              </p>
            </div>
          </div>

          {/* Corner Technical Crosshairs */}
          <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-cyan-500/40 pointer-events-none" />
          <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-cyan-500/40 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-cyan-500/40 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-cyan-500/40 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
