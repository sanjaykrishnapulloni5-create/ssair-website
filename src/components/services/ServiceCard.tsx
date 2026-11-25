"use client";

import React from "react";
import Link from "next/link";
import type { Service } from "@/data/services";
import { getCategoryById } from "@/data/services";
import ServiceSvgIcon from "@/components/ui/ServiceSvgIcon";
import SpotlightCard from "@/components/ui/SpotlightCard";

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
  const displayItems = features.length > 0 ? features : technologies;

  return (
    <SpotlightCard className="group p-6 sm:p-7 flex flex-col justify-between h-full">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 dark:bg-cyan-500/10 border border-sky-500/20 dark:border-cyan-500/25 text-sky-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ServiceSvgIcon
                slug={slug}
                id={item.id}
                name={title}
                category={category}
                className="w-6 h-6"
              />
            </div>

            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-cyan-300 border border-slate-200 dark:border-white/10">
              {resolvedCategory}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors mb-2">
            <Link href={targetHref} className="focus:outline-none hover:underline">
              {title}
            </Link>
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
            {shortDescription || description}
          </p>

          {displayItems && displayItems.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-1.5">
                {displayItems.slice(0, 4).map((itemText, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs rounded-md bg-slate-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/70"
                  >
                    {itemText}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-white/10 mt-auto">
          <Link
            href={targetHref}
            className="inline-flex items-center text-xs font-semibold text-sky-600 dark:text-cyan-400 hover:text-sky-700 dark:hover:text-cyan-300"
          >
            <span>Explore Specifications</span>
            <span className="ml-1.5 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </SpotlightCard>
  );
}
