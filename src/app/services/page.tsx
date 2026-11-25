"use client";

import React, { useState, useMemo } from "react";
import { services, categories, getCategoryById, type Category } from "@/data/services";
import ServiceCard from "@/components/services/ServiceCard";
import { useUIModals } from "@/context/UIModalContext";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { openStartProject } = useUIModals();

  const rawCategories = Array.isArray(categories)
    ? categories.map((cat: Category | string) =>
        typeof cat === "string" ? cat : cat.name
      )
    : [];

  const filterTabs = Array.from(
    new Set([
      "All",
      ...rawCategories,
      "AI & Software",
      "Defence & Aerospace",
      "Robotics & Autonomous",
    ])
  );

  const matchesCategory = (serviceCategory: string, filter: string) => {
    if (filter === "All") return true;
    const catInfo = getCategoryById(serviceCategory);
    const categoryName = catInfo?.name || serviceCategory;

    if (categoryName.toLowerCase() === filter.toLowerCase()) return true;
    if (serviceCategory.toLowerCase() === filter.toLowerCase()) return true;

    const sCat = categoryName.toLowerCase();
    const target = filter.toLowerCase();

    if (target.includes("ai") && (sCat.includes("ai") || sCat.includes("software"))) return true;
    if (
      (target.includes("defence") || target.includes("defense")) &&
      (sCat.includes("defence") || sCat.includes("defense") || sCat.includes("aerospace"))
    ) return true;
    if (target.includes("robotics") && (sCat.includes("robotics") || sCat.includes("autonomous"))) return true;

    return false;
  };

  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return services.filter((service) => {
      const catOk = matchesCategory(service.category, selectedCategory);
      const queryOk =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.shortDescription.toLowerCase().includes(q) ||
        service.technologies.some((t) => t.toLowerCase().includes(q));
      return catOk && queryOk;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="relative w-full min-h-screen bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[780px] h-[360px] pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(6, 182, 212, 0.14), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-sky-700 dark:text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            18 Specialized Engineering Domains
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-3">
            Services &amp; Capabilities
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
            From autonomous defense UAVs and five-bar parallel robotics to AI computer vision pipelines, explore SSAIR&apos;s sovereign engineering catalog.
          </p>

          {/* Search & Category Filter */}
          <div className="mt-8 space-y-4">
            <div className="max-w-md mx-auto">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Filter engineering services"
                placeholder="Search capabilities (e.g. Missile, YOLOv8, ROS2, Space)..."
                className="w-full min-h-[44px] px-4 py-2.5 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900/80 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {filterTabs.map((tab) => {
                const active = selectedCategory === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedCategory(tab)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      active
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-cyan-400"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredServices.map((service, idx) => (
            <ServiceCard key={service.id || idx} service={service} index={idx} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900/75 border border-slate-200 dark:border-cyan-500/25 text-center max-w-3xl mx-auto shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Need Custom Robotics or Defense R&amp;D?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            We partner with aerospace, manufacturing, defense, and academic teams to design bespoke autonomous mechanisms.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => openStartProject()}
              className="inline-flex px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 transition-all text-sm cursor-pointer"
            >
              Start a Project Brief →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
