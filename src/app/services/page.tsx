"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { services, categories, getCategoryById, type Category } from "@/data/services";
import ServiceCard from "@/components/services/ServiceCard";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Derive filter tab labels from categories while ensuring "All" is first
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
      "Innovation & Research",
    ])
  );

  // Match service to active filter tab
  const matchesCategory = (serviceCategory: string, filter: string) => {
    if (filter === "All") return true;

    const catInfo = getCategoryById(serviceCategory);
    const categoryName = catInfo?.name || serviceCategory;

    if (categoryName.toLowerCase() === filter.toLowerCase()) {
      return true;
    }
    if (serviceCategory.toLowerCase() === filter.toLowerCase()) {
      return true;
    }

    const sCat = categoryName.toLowerCase();
    const target = filter.toLowerCase();

    if (
      target.includes("ai") &&
      (sCat.includes("ai") || sCat.includes("software"))
    ) {
      return true;
    }
    if (
      (target.includes("defence") || target.includes("defense")) &&
      (sCat.includes("defence") ||
        sCat.includes("defense") ||
        sCat.includes("aerospace"))
    ) {
      return true;
    }
    if (
      target.includes("robotics") &&
      (sCat.includes("robotics") || sCat.includes("autonomous"))
    ) {
      return true;
    }
    if (
      (target.includes("innovation") || target.includes("research")) &&
      (sCat.includes("innovation") ||
        sCat.includes("research") ||
        sCat.includes("quantum") ||
        sCat.includes("swarm"))
    ) {
      return true;
    }

    return false;
  };

  // Filtered services based on current active tab
  const filteredServices = services.filter((service) =>
    matchesCategory(service.category, selectedCategory)
  );

  // Count items per category tab
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === "All") return services.length;
    return services.filter((s) => matchesCategory(s.category, categoryName)).length;
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Background Ambience & Cyber Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent blur-3xl opacity-75" />
        <div className="absolute top-[700px] -left-32 w-[550px] h-[550px] bg-blue-600/10 blur-[150px]" />
        <div className="absolute top-[1300px] -right-32 w-[550px] h-[550px] bg-indigo-600/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* ================= HERO SECTION ================= */}
        <header className="text-center space-y-6 pt-4 pb-12 sm:pb-16 max-w-4xl mx-auto">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono tracking-widest text-cyan-300 uppercase shadow-inner"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Core Capabilities • DRDO &amp; IISc Heritage
          </motion.div>

          {/* Hero Gradient Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
              Services &amp; Technologies
            </span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Pioneering autonomous robotics, combat-ready defense platforms, 
            high-performance artificial intelligence, and frontier deep-tech research.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: "Core Architectures", val: `${services.length}+ Ready` },
              { label: "Defense Standards", val: "MIL-STD Compliant" },
              { label: "Real-Time Inference", val: "<5ms Edge AI" },
              { label: "Mission Autonomy", val: "GPS-Denied Ops" },
            ].map((metric, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm"
              >
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">
                  {metric.val}
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ================= CATEGORY FILTER TABS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
          >
            {filterTabs.map((category) => {
              const isActive = selectedCategory === category;
              const count = getCategoryCount(category);

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                  }`}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceCategoryPill"
                      className="absolute inset-0 bg-cyan-500/20 border border-cyan-400/50 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                  <span
                    className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? "bg-cyan-400/20 text-cyan-200 border border-cyan-400/30"
                        : "bg-white/5 text-zinc-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </header>

        {/* ================= RESPONSIVE SERVICES GRID ================= */}
        <section className="mt-8 sm:mt-12">
          {filteredServices.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id || service.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 20 }}
                    transition={{
                      duration: 0.35,
                      delay: (index % 3) * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full"
                  >
                    <ServiceCard service={service} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 rounded-2xl bg-zinc-950/50 border border-white/5 max-w-xl mx-auto space-y-4"
            >
              <div className="text-4xl">🔍</div>
              <h3 className="text-xl font-bold text-white">
                No Services Found
              </h3>
              <p className="text-sm text-zinc-400">
                No capabilities currently found in the selected category.
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all cursor-pointer"
              >
                Reset to All Services
              </button>
            </motion.div>
          )}
        </section>

        {/* ================= BOTTOM CTA / ENGAGEMENT BANNER ================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-24 sm:mt-32 relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-b from-zinc-900/80 via-zinc-950/90 to-black border border-white/10 shadow-2xl"
        >
          {/* Top highlight line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* Radial lighting blur */}
          <div className="absolute -top-24 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                Custom Defence &amp; Enterprise R&amp;D
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Require a bespoke defense or robotics deployment?
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Our former DRDO CAIR leadership and senior researchers collaborate
                with defense organizations and enterprise innovators to architect
                tailored tactical systems and autonomous software.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-400/20 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Consult Our Engineers
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
              >
                View Deployed Products →
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
