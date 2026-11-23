"use client";

import React from "react";

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
  return (
    <div className="group flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
            {category}
          </span>
          <span className="text-xs text-slate-500">{date}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 leading-snug">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {excerpt}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
        <a
          href={link || "#"}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1"
        >
          <span>Read Details</span>
          <span>→</span>
        </a>
      </div>
    </div>
  );
}
