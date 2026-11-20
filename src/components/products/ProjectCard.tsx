"use client";

import React from "react";
import { motion } from "framer-motion";

export type ProjectStatus = "Deployed" | "In Development" | "Prototype" | string;

export interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  status: ProjectStatus;
  imageGradient?: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  category,
  technologies,
  status,
  imageGradient = "from-cyan-950/60 via-blue-950/50 to-slate-950",
  index = 0,
}: ProjectCardProps) {
  // Status styling logic: green = Deployed, yellow = In Development, blue = Prototype
  const getStatusConfig = (statusStr: string) => {
    const s = statusStr.toLowerCase().trim();
    if (s === "deployed") {
      return {
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
        dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
        label: "Deployed",
        isPulse: true,
      };
    }
    if (s === "in development" || s === "development" || s === "in-dev") {
      return {
        badge: "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
        dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
        label: "In Development",
        isPulse: false,
      };
    }
    // Prototype or default to blue
    return {
      badge: "bg-blue-500/10 text-blue-300 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
      dot: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]",
      label: statusStr || "Prototype",
      isPulse: false,
    };
  };

  const statusConfig = getStatusConfig(status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10"
    >
      {/* Top ambient highlight on hover */}
      <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />

      {/* Gradient Image Placeholder Area */}
      <div className="relative w-full h-52 overflow-hidden bg-slate-950 flex-shrink-0">
        {/* Dynamic gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${imageGradient} transition-transform duration-700 ease-out group-hover:scale-105`}
        />

        {/* High-tech engineering grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] opacity-40 mix-blend-overlay" />

        {/* Radial highlight for lighting depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.14),transparent_65%)]" />

        {/* Ambient bottom shadow gradient to seamlessly blend into card body */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Corner HUD Marks */}
        <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-white/20 pointer-events-none group-hover:border-cyan-400/70 transition-colors" />
        <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-white/20 pointer-events-none group-hover:border-cyan-400/70 transition-colors" />

        {/* Centered abstract schematic watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-500">
            <div className="w-16 h-16 rounded-full border border-dashed border-white/15 animate-[spin_25s_linear_infinite]" />
            <div className="absolute w-2 h-2 rounded-full bg-cyan-400/40 group-hover:bg-cyan-300 transition-colors" />
          </div>
        </div>

        {/* Category Pill - Top Left */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md border border-white/15 text-cyan-300 shadow-sm">
            {category}
          </span>
        </div>

        {/* Status Badge - Top Right */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border backdrop-blur-md shadow-sm transition-all duration-200 ${statusConfig.badge}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} ${
                statusConfig.isPulse ? "animate-pulse" : ""
              }`}
            />
            <span>{statusConfig.label}</span>
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Title */}
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-200 tracking-tight leading-snug">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed flex-grow line-clamp-3">
          {description}
        </p>

        {/* Technology Tags */}
        <div className="pt-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
            Technologies & Frameworks
          </div>
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 group-hover:border-white/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer / Specs Action */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-medium text-zinc-400 group-hover:text-cyan-300 transition-colors">
          <span className="flex items-center gap-1 font-mono">
            <span>SPECIFICATIONS</span>
          </span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export { ProjectCard };
