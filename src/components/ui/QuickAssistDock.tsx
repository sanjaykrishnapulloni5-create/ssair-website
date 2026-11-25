"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIModals } from "@/context/UIModalContext";

export function QuickAssistDock() {
  const [open, setOpen] = useState(false);
  const { openStartProject } = useUIModals();
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {open && (
        <div className="w-64 rounded-2xl border border-slate-200 dark:border-cyan-500/30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-2xl p-3 space-y-1.5">
          <div className="px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-wider text-sky-600 dark:text-cyan-400 font-semibold border-b border-slate-100 dark:border-slate-800">
            SSAIR Quick Actions
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openStartProject();
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-sky-50 dark:hover:bg-cyan-950/50 flex items-center justify-between transition-colors cursor-pointer"
          >
            <span>Start a Project / R&amp;D Brief</span>
            <span className="text-sky-600 dark:text-cyan-400">→</span>
          </button>
          <Link
            href="/academy"
            onClick={() => setOpen(false)}
            className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-sky-50 dark:hover:bg-cyan-950/50 flex items-center justify-between transition-colors"
          >
            <span>Workshops &amp; Internships</span>
            <span className="text-emerald-500">→</span>
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-sky-50 dark:hover:bg-cyan-950/50 flex items-center justify-between transition-colors"
          >
            <span>Student &amp; Teaching Portal</span>
            <span className="text-blue-500">→</span>
          </Link>
          <a
            href="tel:+919848126456"
            className="w-full px-3 py-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 flex items-center justify-between transition-colors"
          >
            <span>Call Lab: +91 98481 26456</span>
            <span className="text-[10px] font-mono text-slate-400">IST</span>
          </a>
        </div>
      )}

      {/* Compact Aerospace Assist Orb (minimal footprint to never block content) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Open SSAIR Quick Actions"
        title="Start Project / Quick Actions"
        className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-cyan-500/35 hover:scale-105 transition-all cursor-pointer border border-white/25"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default QuickAssistDock;
