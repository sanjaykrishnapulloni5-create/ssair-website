"use client";

import React, { useState, useMemo, useId } from "react";
import NewsCard from "@/components/research/NewsCard";
import ModalDialog from "@/components/ui/ModalDialog";
import { useUIModals } from "@/context/UIModalContext";
import { RESEARCH_ARTICLES, type ResearchArticle } from "@/data/research";

type CategoryFilter = "all" | "Research" | "News" | "Achievement";

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const [selectedArticle, setSelectedArticle] = useState<ResearchArticle | null>(null);
  const { openStartProject } = useUIModals();
  const modalHeadingId = useId();

  const filteredArticles = useMemo(() => {
    if (activeTab === "all") return RESEARCH_ARTICLES;
    return RESEARCH_ARTICLES.filter((a) => a.category === activeTab);
  }, [activeTab]);

  return (
    <div className="relative w-full min-h-screen bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[780px] h-[360px] pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(6, 182, 212, 0.14), transparent)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-sky-700 dark:text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
            Publications &amp; Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-3">
            Research, Demos &amp; Honors
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
            Frontier scientific papers, defense milestones, and IEEE/R&amp;D insights from SSAIR&apos;s Bengaluru laboratory.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Items" },
              { id: "Research", label: "Research Papers" },
              { id: "News", label: "News & Demos" },
              { id: "Achievement", label: "Awards & Honors" },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as CategoryFilter)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-cyan-400"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredArticles.map((article) => (
            <NewsCard
              key={article.id}
              title={article.title}
              date={article.date}
              excerpt={article.excerpt}
              category={article.category}
              tags={article.tags}
              onReadMore={() => setSelectedArticle(article)}
            />
          ))}
        </div>
      </div>

      {/* Paper / Detail Modal */}
      <ModalDialog
        open={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
        labelledBy={modalHeadingId}
        maxWidthClass="max-w-2xl"
      >
        {selectedArticle ? (
          <div className="rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#090f1d] text-slate-900 dark:text-slate-100 p-7 sm:p-9 shadow-2xl space-y-5">
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/15 text-sky-700 dark:text-cyan-300 border border-cyan-500/30">
                {selectedArticle.category} · {selectedArticle.date}
              </span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>

            <h1 id={modalHeadingId} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {selectedArticle.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedArticle.fullText}
            </p>

            <div className="flex flex-wrap gap-2">
              {selectedArticle.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const title = selectedArticle.title;
                  setSelectedArticle(null);
                  openStartProject({
                    track: "PhD & IEEE Research",
                    domain: "Robotics & Kinematics",
                    title,
                  });
                }}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 cursor-pointer"
              >
                Explore IEEE / R&amp;D Collaboration →
              </button>
            </div>
          </div>
        ) : (
          <div />
        )}
      </ModalDialog>
    </div>
  );
}
