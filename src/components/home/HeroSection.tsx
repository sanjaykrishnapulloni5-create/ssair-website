"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ShowcaseProduct {
  id: string;
  name: string;
  tagline: string;
  category: string;
  status: string;
  imageUrl: string;
  metricLabel: string;
  metricValue: string;
}

const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    id: "aegis-uav",
    name: "Aegis-UAV Tactical Drone",
    tagline: "Autonomous surveillance with thermal tracking",
    category: "Defense Drones",
    status: "Operational",
    imageUrl: "/images/products/aegis-uav.jpg",
    metricLabel: "Operational Range",
    metricValue: "45+ km",
  },
  {
    id: "titanarm-cobot",
    name: "TitanArm 6-Axis Cobot",
    tagline: "Sub-millimeter precision manufacturing arm",
    category: "Industrial Robotics",
    status: "Active",
    imageUrl: "/images/products/titanarm-cobot.jpg",
    metricLabel: "Payload Capacity",
    metricValue: "16 kg",
  },
  {
    id: "nexus-amr",
    name: "Nexus-AMR Heavy Tugger",
    tagline: "Trackless autonomous warehouse navigation",
    category: "Autonomous Ground",
    status: "Active",
    imageUrl: "/images/products/nexus-amr.jpg",
    metricLabel: "Towing Capacity",
    metricValue: "1,500 kg",
  },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const currentProduct = SHOWCASE_PRODUCTS[activeTab];

  return (
    <section className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-[#070b14] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      
      {/* Subtle modern dot matrix pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Main Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (7 cols): Bold Headline, Description & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Sister Company Corporate Pill */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 shadow-md backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-cyan-300">
                Sri Srinivasa AI Robotics • Sister Company to Sri Saraswathi AI &amp; Robotics
              </span>
            </motion.div>

            {/* Main Punchy Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
            >
              Autonomous Robotics &amp;{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </motion.h1>

            {/* Clear, Everyday Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal"
            >
              We engineer intelligent autonomous systems, defense drones, and computer vision technologies built for real-world impact. Founded by former DRDO CAIR scientist Dr. Dadireddy Srinivasulu Reddy (IISc alumnus).
            </motion.p>

            {/* Primary Action Buttons (NO phone or email clutter) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="/products"
                className="px-7 py-3.5 rounded-xl font-semibold text-white text-base bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-95 flex items-center gap-2"
              >
                <span>Explore Products</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              <Link
                href="/about"
                className="px-7 py-3.5 rounded-xl font-semibold text-slate-200 hover:text-white text-base border border-slate-700/80 hover:border-cyan-400/60 bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center gap-2"
              >
                <span>About Our Heritage</span>
              </Link>
            </motion.div>

            {/* Clean Trust Pillars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full border-t border-slate-800/80 text-left"
            >
              <div>
                <span className="text-xl sm:text-2xl font-bold text-cyan-400 block">15+ Yrs</span>
                <span className="text-xs text-slate-400 mt-0.5 block">DRDO Defense R&amp;D</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-blue-400 block">100%</span>
                <span className="text-xs text-slate-400 mt-0.5 block">Indigenous Innovation</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-teal-300 block">IISc &amp; CAIR</span>
                <span className="text-xs text-slate-400 mt-0.5 block">Scientist Leadership</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-indigo-300 block">2 Arms</span>
                <span className="text-xs text-slate-400 mt-0.5 block">Sri Saraswathi &amp; SSAIR</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column (5 cols): Interactive Modern System Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 w-full"
          >
            <div className="relative rounded-3xl p-6 bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden group">
              {/* Top Selector Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 mb-5">
                {SHOWCASE_PRODUCTS.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => setActiveTab(idx)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      activeTab === idx
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    {prod.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Product Visual Container */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 mb-5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentProduct.id}
                    src={currentProduct.imageUrl}
                    alt={currentProduct.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Status Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700/80 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-300">
                    {currentProduct.status}
                  </span>
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700/80 backdrop-blur-md">
                  <span className="text-[11px] font-medium text-cyan-300">
                    {currentProduct.category}
                  </span>
                </div>
              </div>

              {/* Product Information Card */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {currentProduct.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {currentProduct.tagline}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">{currentProduct.metricLabel}</span>
                    <span className="text-base font-bold text-cyan-400">{currentProduct.metricValue}</span>
                  </div>
                </div>

                {/* Direct Link to Products */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Autonomous Hardware</span>
                  <Link
                    href={`/products`}
                    className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>View Specifications</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
