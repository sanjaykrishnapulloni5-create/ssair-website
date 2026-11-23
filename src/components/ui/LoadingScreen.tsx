"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Check if loading screen was already shown in this session
    const hasLoaded = sessionStorage.getItem("ssair_booted");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Fast, smooth loading simulation (~0.9s total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("ssair_booted", "true");
          }, 250);
          return 100;
        }
        const increment = Math.floor(Math.random() * 20) + 15;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="ssair-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none px-4 ${
            isDark ? "bg-[#0b0f19] text-white" : "bg-white text-slate-900"
          }`}
        >
          {/* Elegant Minimal Logo & Pulse */}
          <div className="relative flex items-center justify-center w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-cyan-500/30 blur-xl animate-pulse" />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-xl text-white">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Clean Robot Icon */}
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4" />
                <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="3" />
                <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="3" />
              </svg>
            </div>
          </div>

          {/* Simple, Clear Company Name */}
          <div className="text-center space-y-1 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Sri Srinivasa AI Robotics
            </h2>
            <p className="text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 font-medium">
              Sister Company of Sri Saraswathi AI &amp; Robotics
            </p>
          </div>

          {/* Minimal Progress Bar */}
          <div className="w-56 sm:w-64">
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
              <span>Loading experience</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
