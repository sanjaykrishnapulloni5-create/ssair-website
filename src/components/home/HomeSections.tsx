"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ModalDialog from "@/components/ui/ModalDialog";
import { useUIModals } from "@/context/UIModalContext";
import {
  PROCESS_STEPS,
  TECH_STACK_ROW_1,
  TECH_STACK_ROW_2,
  TESTIMONIALS,
  CATALOG_ITEMS,
} from "@/data/catalog";

/* ────────────────────────────────────────────────────────────── */
/* 1. Bento Core Capabilities + Why Choose SSAIR                  */
/* ────────────────────────────────────────────────────────────── */
export function DomainBentoAndWhySection() {
  const { openStartProject } = useUIModals();

  const whyItems = [
    {
      num: "01",
      title: "15+ Years DRDO CAIR Pedigree",
      desc: "Direct defense engineering leadership from former CAIR Scientist 'D' Dr. Dadireddy Srinivasulu Reddy.",
      accent: "from-cyan-500 to-blue-600",
    },
    {
      num: "02",
      title: "IISc Analytical Kinematics",
      desc: "Rigorous mathematical modeling, five-bar closed-loop dynamics, and verifiable state-space stability.",
      accent: "from-blue-500 to-indigo-600",
    },
    {
      num: "03",
      title: "100% Indigenous Edge + AI",
      desc: "Full hardware fabrication paired with sub-10ms TensorRT vision and GPS-denied navigation.",
      accent: "from-emerald-500 to-teal-600",
    },
    {
      num: "04",
      title: "Student & Faculty Mentorship",
      desc: "Dedicated B.Tech, M.Tech, PhD IEEE R&D guidance, practical internships, and Teaching Fellowships.",
      accent: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#050811] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Bento Grid */}
        <div>
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
              Core Engineering Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
              Built for High-Consequence Missions &amp; Next-Gen Talent
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large Bento Card 1 */}
            <SpotlightCard className="lg:col-span-2 grid grid-cols-1 md:grid-cols-12 items-stretch group">
              <div className="md:col-span-6 p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-cyan-400">
                    Defence Autonomy
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-2 mb-3">
                    Tactical UAVs, UGVs &amp; Counter-UAS
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    GPS-denied Visual-Inertial Odometry drones, tracked heavy ground rovers, and RF spectrum counter-drone radar suites built to MIL-STD durability.
                  </p>
                </div>
                <div>
                  <Link
                    href="/services/drones-uavs"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-600 dark:text-cyan-400 hover:underline"
                  >
                    Explore Defense Capabilities →
                  </Link>
                </div>
              </div>
              <div className="md:col-span-6 relative min-h-[250px] md:min-h-[300px] overflow-hidden bg-slate-900">
                <Image
                  src="/images/products/vanguard-ugv.jpg"
                  alt="Vanguard Autonomous Ground Vehicle"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </SpotlightCard>

            {/* Bento Card 2 */}
            <SpotlightCard className="flex flex-col justify-between group">
              <div className="p-6 sm:p-7">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Parallel &amp; 6-Axis Kinematics
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2 mb-2">
                  Industrial Cobots &amp; AMRs
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Five-bar closed-loop manipulators and 1,500 kg factory autonomous mobile tuggers with EtherCAT precision.
                </p>
              </div>
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <Image
                  src="/images/products/titanarm-cobot.jpg"
                  alt="TitanArm Collaborative Robotic Manipulator"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </SpotlightCard>

            {/* Bento Card 3 */}
            <SpotlightCard className="flex flex-col justify-between group">
              <div className="p-6 sm:p-7">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Edge Perception
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2 mb-2">
                  Hyperspectral Vision &amp; Swarm OS
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Sub-5ms YOLOv8/TensorRT inference, defect inspection, and real-time multi-agent mission control.
                </p>
              </div>
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <Image
                  src="/images/products/visionsort-ai.jpg"
                  alt="VisionSort Hyperspectral Defect Inspector"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </SpotlightCard>

            {/* Bento Card 4 (Span 2): Digital Twin + Academy/Teaching */}
            <SpotlightCard className="lg:col-span-2 grid grid-cols-1 md:grid-cols-12 items-stretch group">
              <div className="md:col-span-6 p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Simulation &amp; Research Academy
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2 mb-3">
                    CyberTwin Physics, IEEE R&amp;D &amp; Teaching Portal
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    From reinforcement learning sim-to-real labs to B.Tech, M.Tech &amp; PhD mentorship and Teaching Fellowships—turn theory into working robotics hardware.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openStartProject()}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 cursor-pointer"
                  >
                    Launch R&amp;D Project →
                  </button>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 hover:border-cyan-400"
                  >
                    Student / Teaching Login
                  </Link>
                </div>
              </div>
              <div className="md:col-span-6 relative min-h-[250px] md:min-h-[300px] overflow-hidden bg-slate-900">
                <Image
                  src="/images/products/cybertwin-sim.jpg"
                  alt="CyberTwin Synthetic Physics Simulation Engine"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Why Choose SSAIR Strip */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
              The SSAIR Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Why Choose Sri Srinivasa AI Robotics?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyItems.map((item) => (
              <SpotlightCard key={item.num} className="p-6">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.accent} text-white font-mono text-xs font-bold flex items-center justify-center mb-4 shadow-md`}
                >
                  {item.num}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* 2. Corporate Synergy Section (2 Companies)                     */
/* ────────────────────────────────────────────────────────────── */
export function CorporateSynergySection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#070b17] border-y border-slate-200/80 dark:border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
            Corporate Ecosystem &amp; Synergy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
            Two Companies, One Unified Deep-Tech Mission
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
            A synchronized corporate lineage uniting enterprise AI software platforms with sovereign defense hardware &amp; R&amp;D.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <SpotlightCard className="p-8 sm:p-10" spotlightColor="rgba(16, 185, 129, 0.14)">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              MAIN COMPANY (EST. 2022)
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Sri Saraswathi Artificial Intelligence &amp; Robotics Pvt. Ltd.
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              The flagship AI &amp; software enterprise founded in 2022, driving foundational neural architectures, enterprise automation platforms, and scalable cybernetics.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2.5">
                <span className="text-emerald-500 font-bold">✓</span> Core AI, ML &amp; Computer Vision Pipelines
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-emerald-500 font-bold">✓</span> Enterprise Cloud &amp; Industrial Automation
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-emerald-500 font-bold">✓</span> Operating &amp; Delivering Since 2022
              </li>
            </ul>
          </SpotlightCard>

          <SpotlightCard className="p-8 sm:p-10" spotlightColor="rgba(6, 182, 212, 0.18)">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/15 text-sky-700 dark:text-cyan-300 border border-cyan-500/30 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              SISTER COMPANY (EST. 2026)
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Dedicated deep-tech defense robotics and experimental engineering wing (NIC 7210: Natural Sciences &amp; Engineering R&amp;D), headquartered in Indiranagar, Bengaluru.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2.5">
                <span className="text-cyan-500 font-bold">✓</span> Tactical UAVs, UGVs &amp; Defense AI Hardware
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-cyan-500 font-bold">✓</span> CIN: U72100KA2026PTC222434 (ROC Bengaluru)
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-cyan-500 font-bold">✓</span> 15+ Years DRDO CAIR Scientific Leadership
              </li>
            </ul>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* 3. Interactive 6-Stage Engineering Process Timeline            */
/* ────────────────────────────────────────────────────────────── */
export function ProcessTimelineSection() {
  const [activeStep, setActiveStep] = useState(0);
  const current = PROCESS_STEPS[activeStep];

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#050811] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
            Systematic R&amp;D Lifecycle
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
            How We Engineer From Concept to Deployment
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
            Select any phase below to explore our structured DRDO-heritage engineering and academic project execution pipeline.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {PROCESS_STEPS.map((s, idx) => {
            const active = activeStep === idx;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  active
                    ? "border-cyan-500 bg-gradient-to-br from-blue-600/15 to-cyan-500/15 dark:from-blue-600/25 dark:to-cyan-500/20 shadow-lg shadow-cyan-500/10"
                    : "border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 hover:border-cyan-400/50"
                }`}
              >
                <div
                  className={`text-xs font-mono font-bold mb-1 ${
                    active ? "text-sky-600 dark:text-cyan-300" : "text-slate-400"
                  }`}
                >
                  PHASE {s.step}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        <motion.div
          key={current.step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-slate-900/80 backdrop-blur-xl p-7 sm:p-10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sky-700 dark:text-cyan-300 text-xs font-mono font-semibold">
              STEP {current.step} · {current.subtitle}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {current.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {current.description}
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Phase Deliverable
            </div>
            <div className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {current.deliverable}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* 4. Academy, Workshops, Internships & Teaching Fellowship CTA   */
/* ────────────────────────────────────────────────────────────── */
export function AcademyHighlightSection() {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#070b17] border-y border-slate-200/80 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-cyan-500/30 shadow-2xl group">
            <div className="relative aspect-video w-full">
              <Image
                src="/images/academy-lab.jpg"
                alt="SSAIR Bengaluru Robotics & AI R&D Lab"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[11px] font-semibold backdrop-blur-md">
                  Bengaluru R&amp;D Training Lab
                </span>
                <p className="text-sm font-semibold text-white mt-1.5">
                  Real Quadcopters, Cobots &amp; LiDAR SLAM Workstations
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              SSAIR Academy · Research · Teaching
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
              Learn, Build &amp; Apply to Teach Alongside Scientists
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Whether you are an engineering student seeking B.Tech/M.Tech/PhD robotics mentorship, an intern mastering ROS 2 &amp; YOLO, or a passionate technologist applying to join our teaching team—everything runs inside your unified SSAIR portal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Workshops & Bootcamps", desc: "PX4 Drone Assembly, Edge AI & ROS 2", href: "/academy#workshops" },
              { title: "Industry Internships", desc: "4-Week to 6-Month Verified Tracks", href: "/academy#internships" },
              { title: "PhD & IEEE Mentorship", desc: "Simulations, Hardware & Paper Guidance", href: "/academy#phd" },
              { title: "Teaching Fellowships", desc: "Apply directly in Student Dashboard", href: "/dashboard", highlight: true },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={`p-4 rounded-2xl border transition-all ${
                  card.highlight
                    ? "bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 border-emerald-500/40 hover:border-emerald-400"
                    : "bg-slate-50 dark:bg-slate-900/70 border-slate-200 dark:border-white/10 hover:border-cyan-400/50"
                }`}
              >
                <div className="font-bold text-sm text-slate-900 dark:text-white">{card.title}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{card.desc}</div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/academy"
              className="px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/20"
            >
              Explore Academy Programs →
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 rounded-full text-sm font-semibold border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white hover:border-emerald-400"
            >
              Create Student Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* 5. Accessible Dual-Row Technology Stack Marquee                */
/* ────────────────────────────────────────────────────────────── */
export function TechMarqueeSection() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label="SSAIR Technology Ecosystem"
      className={`py-14 bg-slate-50 dark:bg-[#050811] border-b border-slate-200 dark:border-white/5 overflow-hidden ${
        paused ? "marquee-paused" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
            Core Engineering Toolchains
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Technologies Powering Our Labs
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-cyan-400 cursor-pointer"
        >
          {paused ? "Play Motion" : "Pause Motion"}
        </button>
      </div>

      <div className="space-y-3 select-none">
        <div className="flex w-max animate-marquee gap-3">
          {[...TECH_STACK_ROW_1, ...TECH_STACK_ROW_1].map((tech, i) => (
            <span
              key={`r1-${i}`}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 text-xs sm:text-sm font-mono font-semibold text-slate-800 dark:text-cyan-200 whitespace-nowrap shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex w-max animate-marquee-reverse gap-3">
          {[...TECH_STACK_ROW_2, ...TECH_STACK_ROW_2].map((tech, i) => (
            <span
              key={`r2-${i}`}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 text-xs sm:text-sm font-mono font-semibold text-slate-700 dark:text-blue-200 whitespace-nowrap shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* 6. Scientific Leadership, Hardware Gallery & Testimonials      */
/* ────────────────────────────────────────────────────────────── */
export function LeadershipAndGallerySection() {
  const [lightboxSrc, setLightboxSrc] = useState<{ src: string; title: string } | null>(null);
  const lightboxId = useId();

  const galleryItems = [
    { src: "/images/products/aegis-uav-hex.jpg", title: "Aegis-UAV Tactical Reconnaissance Drone" },
    { src: "/images/products/titanarm-cobot.jpg", title: "TitanArm 6-Axis & 5-Bar Manipulator" },
    { src: "/images/products/vanguard-ugv.jpg", title: "Vanguard Tracked Autonomous Ground Rover" },
    { src: "/images/products/sentinel-cuas.jpg", title: "Sentinel-X Counter-UAS Phased Array Radar" },
    { src: "/images/products/nexus-amr.jpg", title: "Nexus-AMR 1,500kg Heavy Factory Tugger" },
    { src: "/images/products/visionsort-ai.jpg", title: "VisionSort Hyperspectral Optical Sorting" },
    { src: "/images/products/visioncore-sdk.jpg", title: "VisionCore Edge AI Stereo Compute Module" },
    { src: "/images/academy-lab.jpg", title: "SSAIR Bengaluru Robotics & Drone Lab" },
  ];

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#070b17] space-y-24">
      {/* Comprehensive Founder & Scientific Leadership Card */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
            Scientific Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Founded by Veteran DRDO &amp; IISc Leadership
          </h2>
        </div>

        <SpotlightCard className="p-7 sm:p-11 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* Portrait Column */}
          <div className="w-full lg:w-64 shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative inline-block">
              <div className="w-48 h-60 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/15 bg-slate-900 relative">
                <Image
                  src="/images/founder.jpg"
                  alt="Dr. Dadireddy Srinivasulu Reddy"
                  fill
                  loading="lazy"
                  sizes="192px"
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[11px] font-extrabold px-3.5 py-1 rounded-full shadow-md">
                <span>★</span> DRDO Best Team Awardee
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 w-full space-y-2 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider block text-[10px] font-mono">
                  Co-Director
                </span>
                <span className="font-bold text-slate-900 dark:text-white">Anusha Nagella</span>
                <span className="text-slate-500 dark:text-slate-400 block">Whole-time Director</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider block text-[10px] font-mono">
                  Languages
                </span>
                <span className="text-slate-700 dark:text-slate-300">English · Telugu · Hindi</span>
              </div>
            </div>
          </div>

          {/* Credentials & Projects Column */}
          <div className="flex-1 space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Dr. Dadireddy Srinivasulu Reddy
                </h3>
                <p className="text-sm font-mono font-semibold text-sky-600 dark:text-cyan-400 mt-0.5">
                  Founder &amp; Director — Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR)
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600/10 dark:bg-cyan-500/15 text-sky-700 dark:text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 shrink-0"
              >
                Full Profile &amp; Milestones →
              </Link>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Brings over <strong className="text-slate-900 dark:text-white">15+ years of defense science &amp; R&amp;D leadership</strong> as a former{" "}
              <strong className="text-sky-700 dark:text-cyan-300">Scientist &apos;D&apos;</strong> at the{" "}
              <strong className="text-slate-900 dark:text-white">Centre for Artificial Intelligence and Robotics (CAIR), DRDO Bengaluru</strong>, combined with{" "}
              <strong className="text-slate-900 dark:text-white">4 years</strong> as an Assistant Professor in university computing research &amp; teaching.
            </p>

            {/* Education & Experience 2-col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 space-y-2.5">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-cyan-400">
                  Education
                </div>
                <div className="border-l-2 border-cyan-500 pl-3">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    M.E. (Computer Science &amp; Automation)
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Indian Institute of Science (IISc), Bangalore
                  </div>
                </div>
                <div className="border-l-2 border-blue-500 pl-3">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    B.Tech (CSE · First Class Distinction)
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Sri Venkateswara University (SVU)
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 space-y-2.5">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Key DRDO CAIR Programs
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong className="text-slate-900 dark:text-white">Five-Bar Mechanism Industrial Robot:</strong> Closed-loop kinematics, inverse dynamics, motor sizing &amp; singularity analysis.
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong className="text-slate-900 dark:text-white">Real-Time YOLOv3 Vision:</strong> Tactical multi-class detection &amp; OpenCV DNN deployment for airborne systems.
                </div>
              </div>
            </div>

            {/* Technical Expertise Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                "Artificial Intelligence",
                "Robotics & Kinematics",
                "Missile Technology",
                "Fighter Aircraft Systems",
                "Computer Vision (YOLO)",
                "Embedded Systems",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/25"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </div>

      {/* Hardware & Systems Visual Gallery */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
              Hardware &amp; Simulation Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              SSAIR Systems Gallery
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-sky-600 dark:text-cyan-400 hover:underline"
          >
            View Full Systems Catalog ({CATALOG_ITEMS.length} Projects) →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryItems.map((g) => (
            <button
              key={g.title}
              type="button"
              onClick={() => setLightboxSrc(g)}
              className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900 cursor-pointer text-left"
            >
              <Image
                src={g.src}
                alt={g.title}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2.5 left-3 right-3 text-xs font-semibold text-white line-clamp-1">
                {g.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
            Endorsements &amp; Cohort Feedback
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Trusted by Researchers, Engineers &amp; Students
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <SpotlightCard key={t.id} className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-cyan-500/10 text-sky-700 dark:text-cyan-300 border border-cyan-500/20">
                    {t.category}
                  </span>
                  <span className="text-amber-400 text-xs">★★★★★</span>
                </div>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10">
                <div className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t.role} · {t.affiliation}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <ModalDialog
        open={Boolean(lightboxSrc)}
        onClose={() => setLightboxSrc(null)}
        labelledBy={lightboxId}
        maxWidthClass="max-w-4xl"
      >
        {lightboxSrc ? (
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-cyan-500/30 shadow-2xl">
            <div className="relative aspect-video w-full">
              <Image
                src={lightboxSrc.src}
                alt={lightboxSrc.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain bg-slate-950"
              />
            </div>
            <div className="p-4 px-6 flex items-center justify-between bg-slate-900/95 border-t border-white/10">
              <h1 id={lightboxId} className="text-sm sm:text-base font-bold text-white">
                {lightboxSrc.title}
              </h1>
              <button
                type="button"
                onClick={() => setLightboxSrc(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div />
        )}
      </ModalDialog>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* 7. High-Impact Pre-Footer Conversion Banner                    */
/* ────────────────────────────────────────────────────────────── */
export function PreFooterCtaSection() {
  const { openStartProject } = useUIModals();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#050811]">
      <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-600 p-8 sm:p-14 text-center text-white shadow-2xl shadow-cyan-500/20">
        <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-xs font-mono uppercase tracking-wider">
            Need Help Selecting a System or Research Topic?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Ready to Build With SSAIR?
          </h2>
          <p className="text-sm sm:text-base text-blue-50 leading-relaxed">
            Partner with our Bengaluru robotics &amp; AI lab for defense autonomous systems, B.Tech/M.Tech/PhD R&amp;D projects, hands-on workshops, or join our teaching faculty.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openStartProject()}
              className="px-7 py-3.5 rounded-full font-bold text-sm bg-white text-blue-700 hover:bg-slate-100 shadow-lg transition-all cursor-pointer"
            >
              Start a Project Brief →
            </button>
            <Link
              href="/dashboard"
              className="px-7 py-3.5 rounded-full font-bold text-sm bg-slate-950/35 border border-white/30 text-white hover:bg-slate-950/55 transition-all"
            >
              Student &amp; Teaching Portal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
