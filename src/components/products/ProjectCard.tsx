"use client";

import React from "react";
import Link from "next/link";

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
  imageGradient = "from-blue-600/10 to-indigo-600/10",
  imageUrl,
}: ProjectCardProps) {
  const getStatusConfig = (statusStr: string) => {
    const s = statusStr.toLowerCase().trim();
    if (s === "deployed") {
      return {
        badge: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
        label: "Ready & Deployed",
      };
    }
    if (s.includes("development") || s.includes("in-dev")) {
      return {
        badge: "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
        label: "In Development",
      };
    }
    return {
      badge: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      label: statusStr || "Prototype",
    };
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200">
      {/* Product Image */}
      <div className="relative w-full h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${imageGradient}`} />
        )}

        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-700">
            {category}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-sm ${statusConfig.badge}`}>
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer Link */}
        <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
          <Link
            href="/contact"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1"
          >
            <span>Inquire About This Product</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export { ProjectCard };
