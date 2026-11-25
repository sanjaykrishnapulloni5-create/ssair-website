"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATALOG_ITEMS, type CatalogDomain, type CatalogTrack } from "@/data/catalog";
import { useUIModals } from "@/context/UIModalContext";
import SpotlightCard from "@/components/ui/SpotlightCard";

const TRACK_FILTERS: ("All" | CatalogTrack)[] = [
  "All",
  "Enterprise & Defense",
  "M.Tech / PhD R&D",
  "B.Tech / Capstone",
  "Workshop & Training",
];

const DOMAIN_FILTERS: ("All" | CatalogDomain)[] = [
  "All",
  "Defence & UAV",
  "Robotics & Kinematics",
  "AI & Computer Vision",
  "Embedded & IoT",
  "Space & Civil AI",
];

interface ProjectFinderSectionProps {
  initialDomain?: string;
  initialTrack?: string;
  limit?: number;
  title?: string;
  subtitle?: string;
}

export function ProjectFinderSection({
  initialDomain = "All",
  initialTrack = "All",
  limit,
  title = "Systems, Products & Academic R&D Explorer",
  subtitle = "Filter defense platforms, industrial five-bar manipulators, edge AI toolkits, and M.Tech/B.Tech/PhD research tracks—and inspect full system block diagrams instantly.",
}: ProjectFinderSectionProps) {
  const [search, setSearch] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<string>(initialTrack);
  const [selectedDomain, setSelectedDomain] = useState<string>(initialDomain);
  const { openBlueprint, openStartProject } = useUIModals();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = CATALOG_ITEMS.filter((item) => {
      const matchTrack = selectedTrack === "All" || item.track === selectedTrack;
      const matchDomain = selectedDomain === "All" || item.domain === selectedDomain;
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.technologies.some((t) => t.toLowerCase().includes(q));
      return matchTrack && matchDomain && matchQuery;
    });
    return limit ? list.slice(0, limit) : list;
  }, [search, selectedTrack, selectedDomain, limit]);

  const resetFilters = () => {
    setSearch("");
    setSelectedTrack("All");
    setSelectedDomain("All");
  };

  return (
    <section
      id="project-finder"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#070b17] border-y border-slate-200/80 dark:border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 dark:bg-cyan-500/10 border border-sky-500/20 dark:border-cyan-500/25 text-sky-700 dark:text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Interactive Catalog &amp; R&amp;D Finder
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Advanced Filter Bar */}
        <div className="rounded-3xl border border-slate-200 dark:border-cyan-500/20 bg-slate-50 dark:bg-[#0b1224] p-5 sm:p-6 mb-10 shadow-lg space-y-5">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="relative flex-1">
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Filter projects by keyword, code, or technology"
                placeholder="Search by title, code (e.g. SSAIR-ROB-201), ROS 2, YOLOv8, PX4, SLAM..."
                className="w-full min-h-[44px] pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/70 text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => openStartProject()}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-sm cursor-pointer"
              >
                + Custom Topic Brief
              </button>
            </div>
          </div>

          {/* Track & Domain Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-slate-200/80 dark:border-white/10">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1.5">
                Track:
              </span>
              {TRACK_FILTERS.map((t) => {
                const active = selectedTrack === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTrack(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? "bg-sky-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm"
                        : "bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-400"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1.5">
                Domain:
              </span>
              {DOMAIN_FILTERS.map((d) => {
                const active = selectedDomain === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDomain(d)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
              No matching systems or R&amp;D projects found.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 cursor-pointer"
            >
              Show All Systems
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((item) => (
              <SpotlightCard key={item.id} className="group flex flex-col">
                {/* Media Container */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-950/80 border border-cyan-400/40 text-cyan-300 font-mono text-[11px] font-semibold backdrop-blur-md">
                      {item.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 text-[11px] font-semibold">
                      {item.domain}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-600/80 backdrop-blur-md font-medium text-[11px]">
                      {item.track}
                    </span>
                    <span className="font-mono text-cyan-300 font-semibold text-[11px]">
                      {item.metricLabel}: {item.metricValue}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {item.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => openBlueprint(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-cyan-400 hover:text-sky-700 dark:hover:text-cyan-300 cursor-pointer"
                    >
                      <span>Inspect Blueprint &amp; Specs</span>
                      <span>→</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openStartProject({
                          title: item.title,
                          domain: item.domain,
                          track: item.track,
                          projectCode: item.code,
                        })
                      }
                      className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-white/10 hover:bg-sky-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                    >
                      Request
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}

        {limit && CATALOG_ITEMS.length > limit && (
          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-sky-500/40 dark:border-cyan-500/40 text-sky-700 dark:text-cyan-300 hover:bg-sky-50 dark:hover:bg-cyan-950/50 transition-all"
            >
              <span>View All {CATALOG_ITEMS.length} Systems &amp; R&amp;D Projects</span>
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectFinderSection;
