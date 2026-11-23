"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export type ProjectStatus = "Deployed" | "In Development" | "Prototype" | string;

export interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  status: ProjectStatus;
  imageGradient?: string;
  imageUrl?: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  category,
  technologies,
  status,
  imageGradient = "from-cyan-950/60 via-blue-950/50 to-slate-950",
  imageUrl,
  index = 0,
}: ProjectCardProps) {
  const getStatusConfig = (statusStr: string) => {
    const s = statusStr.toLowerCase().trim();
    if (s === "deployed") {
      return {
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        dot: "bg-emerald-400",
        label: "Ready & Deployed",
        isPulse: true,
      };
    }
    if (s === "in development" || s === "development" || s === "in-dev") {
      return {
        badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
        dot: "bg-amber-400",
        label: "In Development",
        isPulse: false,
      };
    }
    return {
      badge: "bg-blue-500/10 text-blue-300 border-blue-500/30",
      dot: "bg-blue-400",
      label: statusStr || "Prototype",
      isPulse: false,
    };
  };

  const statusConfig = getStatusConfig(status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/5"
    >
      {/* Product Image Area */}
      <div className="relative w-full h-52 overflow-hidden bg-slate-950 flex-shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${imageGradient}`}
          />
        )}

        {/* Category Pill - Top Left */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-cyan-300 shadow-sm">
            {category}
          </span>
        </div>

        {/* Status Badge - Top Right */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md shadow-sm ${statusConfig.badge}`}
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
        <p className="text-sm text-slate-300 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Key Features / Technologies */}
        <div className="pt-2">
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Simple Action Link */}
        <div className="pt-4 border-t border-slate-800/80 mt-auto flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
          <Link href="/contact" className="inline-flex items-center gap-1 hover:underline">
            <span>Inquire About This Product</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export { ProjectCard };
