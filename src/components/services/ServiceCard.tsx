"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Service } from "@/data/services";
import { getCategoryById } from "@/data/services";
import ServiceSvgIcon from "@/components/ui/ServiceSvgIcon";

export interface ServiceCardProps {
  service?: Service;
  id?: string;
  slug?: string;
  title?: string;
  icon?: string;
  emoji?: string;
  shortDescription?: string;
  description?: string;
  category?: string;
  categoryName?: string;
  features?: string[];
  technologies?: string[];
  href?: string;
  index?: number;
}

export default function ServiceCard(props: ServiceCardProps) {
  const item = props.service || props;
  const {
    slug = "",
    title = "",
    icon,
    emoji,
    shortDescription,
    description,
    category = "general",
    categoryName,
    features = [],
    technologies = [],
    href,
  } = item;

  const targetHref = href || `/services/${slug}`;
  const resolvedCategory = getCategoryById(category)?.name || categoryName || category;

  // Theme configuration based on category
  const getCategoryTheme = (cat: string) => {
    const normalized = cat.toLowerCase();
    if (
      normalized.includes("defence") ||
      normalized.includes("defense") ||
      normalized.includes("aerospace")
    ) {
      return {
        badge: "bg-red-500/10 text-rose-400 border-rose-500/30",
        accent: "text-rose-400",
        glow: "group-hover:border-rose-500/40 group-hover:shadow-rose-500/10",
        iconBg: "bg-rose-500/10 border-rose-500/20 text-rose-300",
        dot: "bg-rose-400",
      };
    }
    if (
      normalized.includes("robotics") ||
      normalized.includes("autonomous")
    ) {
      return {
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        accent: "text-emerald-400",
        glow: "group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10",
        iconBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
        dot: "bg-emerald-400",
      };
    }
    if (
      normalized.includes("innovation") ||
      normalized.includes("research") ||
      normalized.includes("quantum")
    ) {
      return {
        badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
        accent: "text-purple-400",
        glow: "group-hover:border-purple-500/40 group-hover:shadow-purple-500/10",
        iconBg: "bg-purple-500/10 border-purple-500/20 text-purple-300",
        dot: "bg-purple-400",
      };
    }
    // Default: AI & Software (Cyan)
    return {
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      accent: "text-cyan-400",
      glow: "group-hover:border-cyan-500/40 group-hover:shadow-cyan-500/10",
      iconBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
      dot: "bg-cyan-400",
    };
  };

  const theme = getCategoryTheme(category);
  const displayItems = features.length > 0 ? features : technologies;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`group relative flex flex-col justify-between h-full rounded-2xl bg-zinc-950/80 border border-white/10 ${theme.glow} backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden`}
    >
      {/* Specular highlight at top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Ambient background glow on hover */}
      <div className="absolute -top-20 -right-20 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Top Header: Icon & Category Badge */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div
            className={`w-13 h-13 rounded-xl border p-3 flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-105 ${theme.iconBg}`}
          >
            <ServiceSvgIcon
              slug={slug}
              id={item.id}
              name={title}
              category={category}
              className="w-6 h-6 transition-colors"
            />
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border backdrop-blur-md ${theme.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} animate-pulse`} />
            {resolvedCategory}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors duration-200 tracking-tight mb-3">
          <Link href={targetHref} className="focus:outline-none focus:underline">
            {title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
          {shortDescription || description}
        </p>

        {/* Features / Capabilities Chips */}
        {displayItems && displayItems.length > 0 && (
          <div className="mb-6">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2.5">
              Key Capabilities:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {displayItems.slice(0, 4).map((itemText, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs rounded-md bg-white/[0.04] border border-white/5 text-zinc-300 group-hover:border-white/10 transition-colors"
                >
                  {itemText}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Link to /services/[slug] */}
      <div className="pt-4 border-t border-white/[0.06] mt-auto">
        <Link
          href={targetHref}
          className="inline-flex items-center text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200"
        >
          <span>Explore Architecture</span>
          <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1.5 text-cyan-400">
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
