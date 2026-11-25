"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("ssair_booted");
    if (hasLoaded) {
      const t = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(t);
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("ssair_booted", "true");
          }, 160);
          return 100;
        }
        return prev + 25;
      });
    }, 55);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="ssair-loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050811] text-white px-4 overflow-hidden"
        >
          <div className="absolute w-96 h-96 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />

          <div className="relative mb-6 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-cyan-500/30 animate-radar flex items-center justify-center">
              <span className="absolute -top-1 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            </div>
            <div className="absolute w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/30">
              SS
            </div>
          </div>

          <p className="text-[11px] font-mono tracking-[0.28em] text-cyan-400 uppercase mb-2">
            SSAIR • Systems Online
          </p>
          <h2 className="text-xl font-bold tracking-tight text-white mb-1">
            Sri Srinivasa AI Robotics
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Autonomous Robotics · Defense AI · Deep-Tech R&amp;D
          </p>

          <div className="w-56 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.15 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
