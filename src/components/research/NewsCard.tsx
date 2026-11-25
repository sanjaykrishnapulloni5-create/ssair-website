"use client";

import React from "react";
import SpotlightCard from "@/components/ui/SpotlightCard";

export interface NewsCardProps {
  title: string;
  date: string;
  excerpt: string;
  category: "Research" | "News" | "Achievement" | string;
  tags?: string[];
  onReadMore?: () => void;
}

export default function NewsCard({
  title,
  date,
  excerpt,
  category,
  tags = [],
  onReadMore,
}: NewsCardProps) {
  return (
    <SpotlightCard className="group p-6 sm:p-7 flex flex-col justify-between h-full">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-sky-700 dark:text-cyan-300 border border-cyan-500/25">
              {category}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{date}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors mb-2.5 leading-snug">
            {title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {excerpt}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/70"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 mt-5 border-t border-slate-100 dark:border-white/10">
          <button
            type="button"
            onClick={onReadMore}
            className="text-xs font-semibold text-sky-600 dark:text-cyan-400 hover:text-sky-700 dark:hover:text-cyan-300 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Read Full Abstract &amp; Details</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </SpotlightCard>
  );
}
