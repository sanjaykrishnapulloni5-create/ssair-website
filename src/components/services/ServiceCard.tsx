"use client";

import React from "react";
import Link from "next/link";
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
    <div className="group flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <ServiceSvgIcon
              slug={slug}
              id={item.id}
              name={title}
              category={category}
              className="w-6 h-6"
            />
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {resolvedCategory}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
          <Link href={targetHref} className="focus:outline-none hover:underline">
            {title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
          {shortDescription || description}
        </p>

        {/* Capabilities Chips */}
        {displayItems && displayItems.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-1.5">
              {displayItems.slice(0, 4).map((itemText, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                >
                  {itemText}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
        <Link
          href={targetHref}
          className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <span>Learn More</span>
          <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}
