"use client";

import React from "react";
import { motion } from "framer-motion";

export interface NewsCardProps {
  title: string;
  date: string;
  excerpt: string;
  category: "Research" | "News" | "Achievement" | string;
  link?: string;
}

export default function NewsCard({
  title,
  date,
  excerpt,
  category,
  link,
}: NewsCardProps) {
  // Determine badge styling and accents based on category
  const getCategoryConfig = (cat: string) => {
    const normalized = cat.toLowerCase();
    if (normalized.includes("research")) {
      return {
        badgeStyle:
          "bg-cyan-500/15 text-cyan-300 border-cyan-500/30 group-hover:border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
        glowColor: "from-cyan-500/15 via-blue-500/5 to-transparent",
        accentColor: "text-cyan-400",
        actionText: "Read Research",
      };
    }
    if (normalized.includes("achievement")) {
      return {
        badgeStyle:
          "bg-amber-500/15 text-amber-300 border-amber-500/30 group-hover:border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
        glowColor: "from-amber-500/15 via-orange-500/5 to-transparent",
        accentColor: "text-amber-400",
        actionText: "View Recognition",
      };
    }
    // Default to News
    return {
      badgeStyle:
        "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 group-hover:border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
      glowColor: "from-emerald-500/15 via-teal-500/5 to-transparent",
      accentColor: "text-emerald-400",
      actionText: "Read Article",
    };
  };

  const config = getCategoryConfig(category);

  const cardContent = (
    <div className="relative z-10 flex h-full flex-col justify-between">
      <div>
        {/* Top Header: Category badge & Date */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${config.badgeStyle}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-current"></span>
            </span>
            {category}
          </span>

          {/* Date display */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
            <svg
              className="h-3.5 w-3.5 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time dateTime={date}>{date}</time>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-lg font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-300 sm:text-xl line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed text-zinc-400 line-clamp-3">
          {excerpt}
        </p>
      </div>

      {/* Footer / Action */}
      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${config.accentColor} group-hover:gap-2.5`}
        >
          {config.actionText}
          <svg
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span>

        {link && (
          <span className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-400">
            Learn more &rarr;
          </span>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:shadow-2xl hover:shadow-cyan-500/10 sm:p-7"
    >
      {/* Ambient gradient glow on hover */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${config.glowColor} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Subtle top edge specular reflection */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {link ? (
        <a
          href={link}
          className="block h-full cursor-pointer focus:outline-none"
          tabIndex={0}
        >
          {cardContent}
        </a>
      ) : (
        <div className="h-full">{cardContent}</div>
      )}
    </motion.div>
  );
}
