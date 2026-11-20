"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export interface ServiceCategoriesProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export default function ServiceCategories({
  categories,
  activeCategory,
  onCategoryChange,
  className = "",
}: ServiceCategoriesProps) {
  // Ensure "All" button is included without duplicates
  const allCategories = useMemo(() => {
    const hasAll = categories.some(
      (cat) => cat.trim().toLowerCase() === "all"
    );
    return hasAll ? categories : ["All", ...categories];
  }, [categories]);

  // Check if a category is active
  const isCategoryActive = (category: string) => {
    return (
      category.trim().toLowerCase() === activeCategory.trim().toLowerCase()
    );
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Horizontal scrollable container for mobile with hidden scrollbars */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-3 px-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-center">
        {allCategories.map((category) => {
          const active = isCategoryActive(category);

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              aria-pressed={active}
              className={`group relative flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 select-none ${
                active
                  ? "text-white font-semibold"
                  : "text-zinc-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-white/20 backdrop-blur-md"
              }`}
            >
              {/* Framer-motion active indicator animation */}
              {active && (
                <motion.span
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/30 border border-cyan-300/30"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {/* Label */}
              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
