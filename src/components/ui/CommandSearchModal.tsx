"use client";

import React, { useState, useMemo, useId } from "react";
import { useRouter } from "next/navigation";
import ModalDialog from "@/components/ui/ModalDialog";
import { useUIModals } from "@/context/UIModalContext";
import { CATALOG_ITEMS, ACADEMY_PROGRAMS } from "@/data/catalog";
import { services } from "@/data/services";

export function CommandSearchModal() {
  const { searchOpen, closeSearch, openBlueprint } = useUIModals();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const headingId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    const matchedProjects = CATALOG_ITEMS.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 5);

    const matchedServices = services
      .filter(
        (s) =>
          !q ||
          s.title.toLowerCase().includes(q) ||
          s.categoryName.toLowerCase().includes(q) ||
          s.technologies.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 5);

    const matchedAcademy = ACADEMY_PROGRAMS.filter(
      (a) =>
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.domain.toLowerCase().includes(q)
    ).slice(0, 3);

    return { matchedProjects, matchedServices, matchedAcademy };
  }, [query]);

  return (
    <ModalDialog
      open={searchOpen}
      onClose={closeSearch}
      labelledBy={headingId}
      maxWidthClass="max-w-2xl"
    >
      <div className="rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#090f1d] text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden">
        <h1 id={headingId} className="sr-only">
          Search SSAIR Systems, Services &amp; Academic Tracks
        </h1>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <svg className="w-5 h-5 text-sky-600 dark:text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search drones, 5-bar kinematics, ROS 2, YOLOv8, internships, teaching..."
            className="w-full bg-transparent text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={closeSearch}
            className="px-2 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-pointer"
          >
            ESC
          </button>
        </div>

        <div className="p-4 max-h-[60dvh] overflow-y-auto space-y-5">
          {results.matchedProjects.length > 0 && (
            <div>
              <div className="px-2 text-[11px] font-mono uppercase tracking-wider text-sky-600 dark:text-cyan-400 font-semibold mb-2">
                Systems &amp; R&amp;D Projects (Click for Blueprint)
              </div>
              <div className="space-y-1">
                {results.matchedProjects.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      closeSearch();
                      openBlueprint(item);
                    }}
                    className="w-full text-left flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.code} · {item.domain} · {item.track}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-sky-600 dark:text-cyan-400 shrink-0">
                      Blueprint →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.matchedServices.length > 0 && (
            <div>
              <div className="px-2 text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold mb-2">
                Engineering Services (18 Domains)
              </div>
              <div className="space-y-1">
                {results.matchedServices.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push(`/services/${s.slug}`);
                    }}
                    className="w-full text-left flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {s.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {s.categoryName}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">Open →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.matchedAcademy.length > 0 && (
            <div>
              <div className="px-2 text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
                Academy, Workshops &amp; Teaching
              </div>
              <div className="space-y-1">
                {results.matchedAcademy.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => {
                      closeSearch();
                      router.push(a.type === "Teaching Fellowship" ? "/dashboard" : "/academy");
                    }}
                    className="w-full text-left flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {a.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {a.type} · {a.duration}
                      </div>
                    </div>
                    <span className="text-xs text-emerald-500">View →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.matchedProjects.length === 0 &&
            results.matchedServices.length === 0 &&
            results.matchedAcademy.length === 0 && (
              <div className="py-10 text-center text-sm text-slate-500">
                No matching systems or capabilities found for &ldquo;{query}&rdquo;.
              </div>
            )}
        </div>
      </div>
    </ModalDialog>
  );
}

export default CommandSearchModal;
