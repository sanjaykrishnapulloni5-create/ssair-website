"use client";

import React, { useState } from "react";
import Link from "next/link";
import { services, categories, getCategoryById, type Category } from "@/data/services";
import ServiceCard from "@/components/services/ServiceCard";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const rawCategories = Array.isArray(categories)
    ? categories.map((cat: Category | string) =>
        typeof cat === "string" ? cat : cat.name
      )
    : [];

  const filterTabs = Array.from(
    new Set([
      "All",
      ...rawCategories,
      "AI & Software",
      "Defence & Aerospace",
      "Robotics & Autonomous",
    ])
  );

  const matchesCategory = (serviceCategory: string, filter: string) => {
    if (filter === "All") return true;
    const catInfo = getCategoryById(serviceCategory);
    const categoryName = catInfo?.name || serviceCategory;

    if (categoryName.toLowerCase() === filter.toLowerCase()) return true;
    if (serviceCategory.toLowerCase() === filter.toLowerCase()) return true;

    const sCat = categoryName.toLowerCase();
    const target = filter.toLowerCase();

    if (target.includes("ai") && (sCat.includes("ai") || sCat.includes("software"))) return true;
    if (
      (target.includes("defence") || target.includes("defense")) &&
      (sCat.includes("defence") || sCat.includes("defense") || sCat.includes("aerospace"))
    ) return true;
    if (target.includes("robotics") && (sCat.includes("robotics") || sCat.includes("autonomous"))) return true;

    return false;
  };

  const filteredServices = services.filter((service) =>
    matchesCategory(service.category, selectedCategory)
  );

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Engineering &amp; Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            Our Services &amp; Capabilities
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
            From autonomous defense drones to five-bar parallel robotics and AI computer vision algorithms, explore how SSAIR delivers sovereign engineering solutions.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab) => {
              const active = selectedCategory === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedCategory(tab)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => (
            <ServiceCard key={service.id || idx} service={service} index={idx} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Need Custom Robotics R&amp;D?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            We partner with aerospace, manufacturing, and defense entities to design bespoke autonomous mechanisms.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex px-8 py-3.5 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all text-sm"
            >
              Contact Our Engineers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
