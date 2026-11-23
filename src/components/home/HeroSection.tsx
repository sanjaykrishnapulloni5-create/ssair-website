"use client";

import React from "react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-white dark:bg-slate-950 pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Soft gradient blob behind content */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[120px] opacity-50 -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-[100px] opacity-40 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full text-center">
        {/* Small badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-sm text-gray-600 dark:text-slate-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          Sister company of Sri Saraswathi AI &amp; Robotics
        </div>

        {/* Big headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6 max-w-5xl mx-auto">
          Autonomous Robotics &amp;{" "}
          <span className="text-blue-600 dark:text-blue-400">
            Artificial Intelligence
          </span>
        </h1>

        {/* Simple subtitle */}
        <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          We build intelligent robots, defense drones, and computer vision systems. Founded by former DRDO CAIR scientist and IISc alumnus.
        </p>

        {/* Two buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            href="/products"
            className="px-8 py-3.5 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
          >
            Explore Products
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 rounded-full font-semibold text-gray-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 shadow-sm transition-all"
          >
            Learn About Us
          </Link>
        </div>

        {/* Simple stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { number: "15+", label: "Years DRDO Heritage" },
            { number: "100%", label: "Made in India" },
            { number: "50+", label: "Projects Delivered" },
            { number: "2", label: "Companies in Synergy" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.number}</div>
              <div className="text-sm text-gray-500 dark:text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
