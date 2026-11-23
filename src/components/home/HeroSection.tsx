"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Scene3D from "@/components/home/Scene3D";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-gray-950 text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Base Subtle Ambient Glow (Clean, minimal, 60fps) */}
      <div className="hero-dark-overlay absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/70 to-gray-950 pointer-events-none z-[1]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-[1]" />

      {/* 2. Responsive 3D Scene (Placed behind text with smooth pointer controls) */}
      <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
        <Scene3D />
      </div>

      {/* 3. Main Content: Elegant, Clear & Spaced */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Sister Company Badge */}
          <motion.div variants={itemFadeUp} className="mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-950/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-cyan-300">
                Sister Company of Sri Saraswathi AI &amp; Robotics • Autonomous Defense Systems
              </span>
            </div>
          </motion.div>

          {/* Clean, Impactful Heading */}
          <motion.h1
            variants={itemFadeUp}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white max-w-4xl mb-6"
          >
            Intelligent Robotics &amp;{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Autonomous Systems
            </span>
          </motion.h1>

          {/* Simple, Easy-to-Understand Subheading */}
          <motion.p
            variants={itemFadeUp}
            className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl leading-relaxed font-normal mb-8"
          >
            Sri Srinivasa AI Robotics (SSAIR) engineers sovereign robotics, defense drones,
            and computer vision systems. Founded by former DRDO CAIR scientist Dadireddy Srinivasulu Reddy (IISc alumnus).
          </motion.p>

          {/* Direct Contact Liaison Strip */}
          <motion.div
            variants={itemFadeUp}
            className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 mb-10 font-mono"
          >
            <a
              href="mailto:srinivasulureddydadireddy@gmail.com"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/70 border border-gray-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
            >
              <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>srinivasulureddydadireddy@gmail.com</span>
            </a>

            <a
              href="tel:+919848126456"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/70 border border-gray-800 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 98481 26456</span>
            </a>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemFadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto mb-14"
          >
            {/* Primary CTA */}
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white text-base bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Explore Products</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            {/* Outline CTA */}
            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-cyan-300 hover:text-white text-base border border-cyan-500/40 hover:border-cyan-400 bg-gray-900/60 hover:bg-cyan-950/30 backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>View Services</span>
            </Link>
          </motion.div>

          {/* 4 Simple, High-Trust Strategic Cards */}
          <motion.div
            variants={itemFadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl text-left"
          >
            <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/80 backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 block">15+ Yrs</span>
              <span className="text-xs text-gray-400 mt-1 block">Defense &amp; DRDO Heritage</span>
            </div>
            <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/80 backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-bold font-mono text-blue-400 block">100%</span>
              <span className="text-xs text-gray-400 mt-1 block">Sovereign Indigenous Tech</span>
            </div>
            <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/80 backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 block">CAIR &amp; IISc</span>
              <span className="text-xs text-gray-400 mt-1 block">Scientist &apos;D&apos; Leadership</span>
            </div>
            <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/80 backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-bold font-mono text-teal-300 block">Sister Firm</span>
              <span className="text-xs text-gray-400 mt-1 block">To Sri Saraswathi AI (2022)</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none opacity-50 z-[2]">
        <div className="w-1 h-3 rounded-full bg-cyan-400 animate-bounce" />
        <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400">Scroll</span>
      </div>
    </section>
  );
}

export default HeroSection;
