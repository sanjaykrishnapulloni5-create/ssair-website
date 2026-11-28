"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { ACADEMY_PROGRAMS } from "@/data/catalog";
import { useUIModals } from "@/context/UIModalContext";
import { useAuth } from "@/context/AuthContext";

function resolveFilterFromHash(hash: string): string | null {
  switch (hash.replace(/^#/, "").toLowerCase()) {
    case "workshops":
      return "Workshop";
    case "internships":
      return "Internship";
    case "phd":
      return "PhD & IEEE R&D";
    default:
      return null;
  }
}

export default function AcademyPage() {
  const [filter, setFilter] = useState<string>("All");
  const { openStartProject } = useUIModals();
  const { user } = useAuth();

  useEffect(() => {
    const syncHash = () => {
      const targetFilter = resolveFilterFromHash(window.location.hash);
      if (targetFilter) setFilter(targetFilter);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const types = ["All", "Workshop", "Internship", "PhD & IEEE R&D", "Teaching Fellowship"];
  const visiblePrograms =
    filter === "All"
      ? ACADEMY_PROGRAMS
      : ACADEMY_PROGRAMS.filter((p) => p.type === filter);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[820px] h-[440px] pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.08), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-20">
        {/* Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SSAIR Academy &amp; Research Division
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Master Autonomous Robotics,{" "}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Drones &amp; Edge AI
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Bridge university theory and real defense-grade engineering through hands-on Bengaluru lab workshops, industry internships, IEEE/PhD research guidance, and our{" "}
              <strong className="text-slate-900 dark:text-white">Teaching Fellowship</strong>.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() =>
                  openStartProject({
                    track: "Internship / Training",
                    domain: "Robotics & Kinematics",
                    title: "SSAIR Academy Workshop / Internship Enrollment",
                  })
                }
                className="px-6 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Enroll in Workshop / Internship →
              </button>
              <Link
                href={user ? "/dashboard" : "/login"}
                className="px-6 py-3.5 rounded-full font-semibold text-sm border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
              >
                Apply to Teach at SSAIR
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-cyan-500/30 shadow-2xl">
              <div className="relative aspect-video w-full">
                <Image
                  src="/images/academy-lab.jpg"
                  alt="SSAIR Robotics and Drone Training Lab"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white">
                <span className="font-mono text-cyan-300">Indiranagar, Bengaluru Lab</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-semibold">
                  2026–2027 Cohorts Open
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Programs Filter & Grid */}
        <section id="workshops" className="space-y-8 scroll-mt-28">
          <div id="internships" className="sr-only" aria-hidden="true" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Programs, Internships &amp; Fellowships
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Hands-on cohorts mentored directly by ex-DRDO &amp; IISc specialists.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {types.map((t) => {
                const active = filter === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilter(t)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? "bg-sky-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm"
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {visiblePrograms.map((prog) => {
              const isTeaching = prog.type === "Teaching Fellowship";
              return (
                <SpotlightCard key={prog.id} className="p-7 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-sky-700 dark:text-cyan-300 border border-cyan-500/25">
                        {prog.type}
                      </span>
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        {prog.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {prog.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Duration: {prog.duration} · Target: {prog.level}
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        Curriculum &amp; Mentorship Highlights
                      </div>
                      <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                        {prog.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2">
                            <span className="text-cyan-500 font-bold">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        Key Deliverables
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {prog.deliverables.map((d) => (
                          <span
                            key={d}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                    {isTeaching ? (
                      <Link
                        href={user ? "/dashboard" : "/login"}
                        className="w-full text-center py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-md"
                      >
                        Apply for Teaching Fellowship in Student Portal →
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          openStartProject({
                            track: prog.type,
                            domain: "Robotics & Kinematics",
                            title: prog.title,
                          })
                        }
                        className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md cursor-pointer"
                      >
                        Request Seat / Syllabus →
                      </button>
                    )}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </section>

        {/* PhD & IEEE Research Support Section */}
        <section id="phd" className="scroll-mt-28">
          <SpotlightCard className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  B.Tech · M.Tech · PhD &amp; IEEE 2026–2027 R&amp;D
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  End-to-End Capstone &amp; Thesis Engineering Support
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  From selecting an original IEEE-derived research topic across Robotics, Computer Vision, Defence UAVs, Embedded IoT, or Space AI to building working simulations (Gazebo, MATLAB/Simulink, CARLA), deploying on Jetson/STM32 hardware, and preparing viva-ready documentation.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "IEEE Topic Discovery",
                    "MATLAB & Gazebo Sim",
                    "Working Hardware Prototype",
                    "Paper & Patent Drafting Guidance",
                  ].map((pill) => (
                    <span
                      key={pill}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25"
                    >
                      ✓ {pill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() =>
                    openStartProject({
                      track: "PhD & IEEE Research",
                      domain: "AI & Computer Vision",
                      title: "Thesis / IEEE Research Consultation",
                    })
                  }
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg cursor-pointer"
                >
                  Book R&amp;D Topic Consultation →
                </button>
                <Link
                  href="/products"
                  className="w-full py-3.5 px-6 rounded-2xl font-semibold text-sm text-center border border-slate-300 dark:border-white/20 hover:border-cyan-400"
                >
                  Browse Ready R&amp;D Blueprints
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </section>
      </div>
    </div>
  );
}
