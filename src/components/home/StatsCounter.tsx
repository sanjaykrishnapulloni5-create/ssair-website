"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
}

const STATS_DATA: StatItem[] = [
  {
    id: "services-tech",
    value: 18,
    suffix: "+",
    label: "Services & Technologies",
    sublabel: "Specialized Deep-Tech Domains",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m16-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
  },
  {
    id: "rd-experience",
    value: 15,
    suffix: "+",
    label: "Years of R&D Experience",
    sublabel: "DRDO CAIR & IISc Heritage",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    id: "projects-delivered",
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    sublabel: "Mission-Critical Systems",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m9.888-9.888a3 3 0 11-4.243 4.243 3 3 0 014.243-4.243z"
        />
      </svg>
    ),
  },
  {
    id: "defence-branches",
    value: 3,
    suffix: "",
    label: "Defence Branches Served",
    sublabel: "Army, Navy & Air Force",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
  },
];

interface StatCardProps {
  stat: StatItem;
  index: number;
}

function StatCard({ stat, index }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-40px" });
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds animation
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic curve: 1 - (1 - progress)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * stat.value);

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(stat.value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-between p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 hover:bg-white/[0.06] backdrop-blur-md transition-all duration-300 group shadow-lg shadow-black/20"
    >
      {/* Top subtle highlight line */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 group-hover:via-cyan-400/60 to-transparent transition-all duration-500"
        aria-hidden="true"
      />

      {/* High-tech Icon Badge */}
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        {stat.icon}
      </div>

      {/* Large Stat Number with Blue-Cyan Gradient */}
      <div className="flex items-center justify-center my-1">
        <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight tabular-nums bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.25)]">
          {count}
          {stat.suffix}
        </span>
      </div>

      {/* Label and Sublabel */}
      <div className="mt-3 flex flex-col items-center text-center">
        <h3 className="text-sm sm:text-base font-semibold text-gray-200 tracking-wide">
          {stat.label}
        </h3>
        {stat.sublabel && (
          <p className="mt-1 text-xs text-gray-400 font-medium tracking-normal">
            {stat.sublabel}
          </p>
        )}
      </div>

      {/* Subtle corner glow effect on hover */}
      <div
        className="absolute -bottom-1 -right-1 w-16 h-16 bg-gradient-to-br from-transparent to-cyan-500/10 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      />
    </motion.div>
  );
}

export interface StatsCounterProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function StatsCounter({
  eyebrow = "Proven Track Record",
  title = "Engineered for Defence & Deep-Tech Excellence",
  subtitle = "Powering mission-critical robotics, autonomous systems, and advanced AI for national security and industry.",
  className = "",
}: StatsCounterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      aria-label="SSAIR Key Statistics and Achievements"
      className={`relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
    >
      {/* Background Ambient Glows */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Dark Glass Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative max-w-7xl mx-auto rounded-3xl bg-gray-950/70 border border-white/10 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] overflow-hidden"
      >
        {/* Subtle top edge glossy highlight line */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Ambient radial gradient overlay inside the glass container */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Optional Header */}
        {(eyebrow || title || subtitle) && (
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-sm sm:text-base text-gray-400 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Responsive Grid: 2x2 on Mobile, 4 in a row on Desktop */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {STATS_DATA.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default StatsCounter;
