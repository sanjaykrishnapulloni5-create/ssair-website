"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ProjectFinderSection from "@/components/home/ProjectFinderSection";
import { useUIModals } from "@/context/UIModalContext";

export default function ProductsExplorerClient() {
  const searchParams = useSearchParams();
  const initialDomain = searchParams.get("domain") || "All";
  const initialTrack = searchParams.get("track") || "All";
  const { openStartProject } = useUIModals();

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 pt-24 pb-20">
      <ProjectFinderSection
        key={`${initialDomain}::${initialTrack}`}
        initialDomain={initialDomain}
        initialTrack={initialTrack}
        title="Our Systems, Products & R&D Blueprints"
        subtitle="Explore deployed defense UAVs, industrial 5-bar robotic arms, AI computer vision suites, and mentored M.Tech / B.Tech / PhD R&D projects."
      />

      {/* Custom R&D Engineering CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
        <div className="rounded-3xl border border-slate-200 dark:border-cyan-500/25 bg-white dark:bg-[#0b1224] p-8 sm:p-12 text-center shadow-xl">
          <span className="text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
            Bespoke Systems &amp; Custom IEEE Ideas
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            Want to Build Your Own Idea or Custom Hardware?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 max-w-xl mx-auto leading-relaxed">
            Our Bengaluru R&amp;D labs engineer custom unmanned systems, mechanical linkages, embedded RTOS boards, and computer vision models tailored to your exact specifications.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => openStartProject()}
              className="px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              Submit Custom Project Brief →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
