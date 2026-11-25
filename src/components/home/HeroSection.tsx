"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import HeroBackdropVFX from "@/components/home/HeroBackdropVFX";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { CATALOG_ITEMS } from "@/data/catalog";
import { useUIModals } from "@/context/UIModalContext";

const HERO_SHOWCASE = CATALOG_ITEMS.slice(0, 4);

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { openBlueprint, openStartProject } = useUIModals();

  const currentItem = HERO_SHOWCASE[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SHOWCASE.length) % HERO_SHOWCASE.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SHOWCASE.length);
  };

  return (
    <section className="relative w-full min-h-[88dvh] flex items-center bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-white pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Zero-Lag Aerospace Grid, Radial Auras & Telemetry Ring VFX */}
      <HeroBackdropVFX />

      {/* Subtle Floating Micro-Nodes */}
      <ParticleBackground count={20} />

      {/* Main Split Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column (7 cols): Aerospace Brand Messaging, Domain Chips & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-300/60 dark:border-cyan-500/35 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-medium text-sky-700 dark:text-cyan-300">
                SSAIR • Sister Co. of Sri Saraswathi AI &amp; Robotics (Est. 2022)
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold tracking-tight leading-[1.07] text-slate-900 dark:text-white"
            >
              Autonomous Robotics,{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent animate-shimmer">
                Defense AI
              </span>{" "}
              &amp; Deep-Tech R&amp;D
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed"
            >
              Engineering indigenous tactical UAVs, five-bar parallel robotic arms, and edge computer vision—plus hands-on student fellowships, IEEE R&amp;D mentorship, and workshops led by former DRDO CAIR Scientist &apos;D&apos;{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">
                Dr. Dadireddy Srinivasulu Reddy
              </strong>{" "}
              (M.E., IISc Bangalore).
            </motion.p>

            {/* Quick Domain Access Chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="flex flex-wrap gap-2"
            >
              {[
                { label: "Defence UAVs & UGVs", href: "#project-finder" },
                { label: "5-Bar & Cobot Kinematics", href: "#project-finder" },
                { label: "YOLOv8 & Edge Vision", href: "/services/ai-computer-vision" },
                { label: "Workshops & Internships", href: "/academy" },
                { label: "Student & Teaching Login", href: "/login" },
              ].map((chip) => (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/85 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-cyan-300 backdrop-blur-md transition-all"
                >
                  {chip.label}
                </Link>
              ))}
            </motion.div>

            {/* Primary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <a
                href="#project-finder"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Explore Systems &amp; R&amp;D</span>
                <span>→</span>
              </a>

              <button
                type="button"
                onClick={() => openStartProject()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-slate-800 dark:text-white bg-white/90 dark:bg-white/10 border border-slate-300 dark:border-white/20 hover:border-cyan-400 backdrop-blur-md hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Start a Project</span>
              </button>

              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-sky-700 dark:text-cyan-300 hover:underline"
              >
                <span>Leadership &amp; Story →</span>
              </Link>
            </motion.div>

            {/* Telemetry Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-4 w-full max-w-xl border-t border-slate-200/80 dark:border-white/10">
              {[
                { val: "15+", lbl: "Yrs DRDO Lineage" },
                { val: "18+", lbl: "Deep-Tech Domains" },
                { val: "50+", lbl: "Systems Delivered" },
                { val: "100%", lbl: "Indigenous Build" },
              ].map((s) => (
                <div key={s.lbl}>
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-300 dark:to-blue-400 bg-clip-text text-transparent font-display">
                    {s.val}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Aerospace Hardware Telemetry Showcase */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="relative rounded-3xl border border-slate-200/90 dark:border-cyan-500/35 bg-white/95 dark:bg-[#091124]/90 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              {/* Top Specular Beam + Aerospace HUD Corner Ticks */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-30" />

              {/* Product Image with Holographic Scanline & HUD Crosshairs */}
              <div className="relative h-60 sm:h-68 w-full overflow-hidden bg-slate-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentItem.imageUrl}
                      alt={currentItem.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-[#091124] via-transparent to-black/25 pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cyan-400/20 to-transparent animate-scanline pointer-events-none" />

                {/* Top Meta & Carousel Controls */}
                <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between gap-2 z-20">
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-cyan-400/40 text-cyan-300 font-mono text-[11px] font-semibold backdrop-blur-md">
                    {currentItem.code}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 text-[11px] font-semibold backdrop-blur-md">
                      {currentItem.status}
                    </span>
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous featured system"
                      className="w-7 h-7 rounded-full bg-slate-950/75 hover:bg-slate-900 border border-white/20 text-white flex items-center justify-center text-xs cursor-pointer"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next featured system"
                      className="w-7 h-7 rounded-full bg-slate-950/75 hover:bg-slate-900 border border-white/20 text-white flex items-center justify-center text-xs cursor-pointer"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-3.5 left-4 right-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300">
                    {currentItem.domain}
                  </span>
                  <h2 className="text-lg font-bold text-white leading-snug">
                    {currentItem.title}
                  </h2>
                </div>
              </div>

              {/* Spec Strip, Live Pipeline Nodes & Actions */}
              <div className="p-5 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {currentItem.tagline}
                </p>

                {/* Compact Live Architecture Nodes Preview */}
                <div className="grid grid-cols-3 gap-2">
                  {currentItem.blockDiagram.slice(0, 3).map((node) => (
                    <div
                      key={node.stage}
                      className="px-2.5 py-2 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10"
                    >
                      <div className="text-[9px] font-mono text-sky-600 dark:text-cyan-400 truncate">
                        {node.stage}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {node.title}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 py-2.5 px-3.5 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">
                      {currentItem.metricLabel}
                    </div>
                    <div className="text-sm font-bold text-sky-700 dark:text-cyan-300">
                      {currentItem.metricValue}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openBlueprint(currentItem)}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-sm cursor-pointer transition-all"
                  >
                    Inspect Blueprint →
                  </button>
                </div>

                {/* Switcher Tabs */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {HERO_SHOWCASE.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`px-2 py-2 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer truncate ${
                        activeIndex === idx
                          ? "bg-sky-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm"
                          : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
                      }`}
                    >
                      {item.id.split("-")[0].toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
