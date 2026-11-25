"use client";

import React, { useState, useId } from "react";
import Image from "next/image";
import ModalDialog from "@/components/ui/ModalDialog";
import { useUIModals } from "@/context/UIModalContext";

type BlueprintTab = "abstract" | "architecture" | "specs";

export function BlueprintModal() {
  const { blueprintItem, closeBlueprint, openStartProject } = useUIModals();
  const [activeTab, setActiveTab] = useState<BlueprintTab>("abstract");
  const headingId = useId();

  if (!blueprintItem) {
    return (
      <ModalDialog open={false} onClose={closeBlueprint} labelledBy={headingId}>
        <div />
      </ModalDialog>
    );
  }

  const handleRequestProject = () => {
    const item = blueprintItem;
    closeBlueprint();
    openStartProject({
      title: item.title,
      domain: item.domain,
      track: item.track,
      projectCode: item.code,
    });
  };

  return (
    <ModalDialog
      open={Boolean(blueprintItem)}
      onClose={closeBlueprint}
      labelledBy={headingId}
      maxWidthClass="max-w-4xl"
    >
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#090f1d] text-slate-900 dark:text-slate-100 shadow-2xl">
        {/* Top Holographic Header Banner */}
        <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-900">
          <Image
            src={blueprintItem.imageUrl}
            alt={blueprintItem.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090f1d] via-[#090f1d]/60 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={closeBlueprint}
            aria-label="Close specification modal"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header Metadata Overlay */}
          <div className="absolute bottom-5 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-semibold">
                  {blueprintItem.code}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600/30 border border-blue-400/30 text-blue-200 text-xs font-medium">
                  {blueprintItem.domain}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-medium">
                  {blueprintItem.track}
                </span>
              </div>
              <h1 id={headingId} className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {blueprintItem.title}
              </h1>
            </div>

            <div className="shrink-0 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/15 backdrop-blur-md text-right">
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                {blueprintItem.metricLabel}
              </div>
              <div className="text-lg font-bold text-white">{blueprintItem.metricValue}</div>
            </div>
          </div>
        </div>

        {/* Accessible Tabs (Non-color border indicator + aria-selected) */}
        <div
          role="tablist"
          aria-label="System specification sections"
          className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/70 dark:bg-slate-900/60 overflow-x-auto"
        >
          {(
            [
              { id: "abstract", label: "Overview & Abstract" },
              { id: "architecture", label: "System Block Diagram" },
              { id: "specs", label: "Specs & Outcomes" },
            ] as const
          ).map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`bp-tab-${tab.id}`}
                aria-selected={selected}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selected
                    ? "text-sky-600 dark:text-cyan-400 after:absolute after:inset-x-0 after:bottom-0 after:border-b-2 after:border-sky-600 dark:after:border-cyan-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 max-h-[55dvh] overflow-y-auto space-y-6">
          {activeTab === "abstract" && (
            <div role="tabpanel" aria-labelledby="bp-tab-abstract" className="space-y-5">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-cyan-400 font-semibold mb-2">
                  Technical Abstract
                </h2>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {blueprintItem.abstract}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2.5">
                  Core Engineering Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blueprintItem.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-cyan-200 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "architecture" && (
            <div role="tabpanel" aria-labelledby="bp-tab-architecture" className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-cyan-400 font-semibold">
                End-to-End Hardware &amp; AI Pipeline Flow
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {blueprintItem.blockDiagram.map((node, i) => (
                  <div
                    key={node.stage}
                    className="relative p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-cyan-500/25 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-cyan-400">
                        {node.stage}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                        {node.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                        {node.detail}
                      </p>
                    </div>
                    {i < blueprintItem.blockDiagram.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-sky-600 dark:bg-cyan-500 text-white dark:text-slate-950 items-center justify-center text-xs font-bold shadow"
                      >
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div role="tabpanel" aria-labelledby="bp-tab-specs" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-cyan-400 font-semibold mb-3">
                  System Specifications
                </h2>
                <div className="divide-y divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  {blueprintItem.specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-3.5 bg-slate-50/70 dark:bg-slate-900/60 flex items-center justify-between gap-4 text-xs sm:text-sm"
                    >
                      <span className="text-slate-500 dark:text-slate-400 font-medium">{spec.label}</span>
                      <span className="font-semibold text-slate-900 dark:text-white text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold mb-3">
                  R&amp;D &amp; Learning Outcomes
                </h2>
                <ul className="space-y-2.5">
                  {blueprintItem.learningOutcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">✓</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Bar */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Available for Enterprise Deployment, Custom Prototypes, &amp; Academic Mentorship
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={closeBlueprint}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleRequestProject}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              Start This Project / Request Demo →
            </button>
          </div>
        </div>
      </div>
    </ModalDialog>
  );
}

export default BlueprintModal;
