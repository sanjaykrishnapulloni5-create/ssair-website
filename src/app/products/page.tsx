"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/products/ProjectCard";

// Categories definition
const CATEGORIES = [
  { id: "all", label: "All Systems" },
  { id: "defence", label: "Defence Products" },
  { id: "industrial", label: "Industrial Robotics" },
  { id: "software", label: "Software & AI" },
] as const;

type CategoryFilter = (typeof CATEGORIES)[number]["id"];

interface ProjectData {
  id: string;
  title: string;
  category: "Defence Products" | "Industrial Robotics" | "Software & AI";
  categoryId: "defence" | "industrial" | "software";
  description: string;
  technologies: string[];
  status: "Deployed" | "In Development" | "Prototype";
  imageGradient: string;
  imageUrl?: string;
}

const PROJECTS: ProjectData[] = [
  // --- Defence Products (3 Cards) ---
  {
    id: "aegis-uav",
    title: "Aegis-UAV Tactical Reconnaissance Drone",
    category: "Defence Products",
    categoryId: "defence",
    description:
      "Autonomous long-endurance tactical UAV built for GPS-denied environments with onboard multi-spectral thermal tracking, anti-jam telemetry, and edge-computed target classification.",
    technologies: ["Edge AI", "ROS 2", "FLIR Thermal", "AES-256", "PX4 Autopilot"],
    status: "Deployed",
    imageGradient: "from-red-950/70 via-amber-950/50 to-slate-950",
    imageUrl: "/images/products/aegis-uav.jpg",
  },
  {
    id: "vanguard-ugv",
    title: "Vanguard Heavy Autonomous Ground Vehicle",
    category: "Defence Products",
    categoryId: "defence",
    description:
      "All-terrain tracked robotic ground platform engineered for perimeter defense, hazardous ordnance disposal, and autonomous sensor payload delivery across rugged battlegrounds.",
    technologies: ["3D LiDAR SLAM", "NVIDIA Jetson AGX", "C++", "RTK-GPS", "CAN Bus"],
    status: "In Development",
    imageGradient: "from-amber-950/70 via-stone-900 to-slate-950",
    imageUrl: "/images/products/vanguard-ugv.jpg",
  },
  {
    id: "sentinel-cuas",
    title: "Sentinel-X Directed Counter-UAS Radar",
    category: "Defence Products",
    categoryId: "defence",
    description:
      "Intelligent RF spectrum analyzer and directional countermeasure system detecting, classifying, and neutralizing autonomous drone swarms within a 5-kilometer operational perimeter.",
    technologies: ["RF Spectrum AI", "SDR", "Phased Array", "FPGA", "CUDA"],
    status: "Prototype",
    imageGradient: "from-rose-950/70 via-red-900/40 to-slate-950",
    imageUrl: "/images/products/sentinel-cuas.jpg",
  },

  // --- Industrial Robotics (3 Cards) ---
  {
    id: "titanarm-cobot",
    title: "TitanArm 6-Axis Collaborative Manipulator",
    category: "Industrial Robotics",
    categoryId: "industrial",
    description:
      "Sub-millimeter precision collaborative robotic arm engineered for high-payload automotive welding, aerospace composite finishing, and safe human-robot shop floor collaboration.",
    technologies: ["Force/Torque Sensing", "EtherCAT", "Digital Twin", "Safety PLC", "Kinematics"],
    status: "Deployed",
    imageGradient: "from-cyan-950/70 via-teal-900/50 to-slate-950",
    imageUrl: "/images/products/titanarm-cobot.jpg",
  },
  {
    id: "nexus-amr",
    title: "Nexus-AMR Fleet Heavy Tugger",
    category: "Industrial Robotics",
    categoryId: "industrial",
    description:
      "Autonomous mobile intralogistics robot hauling up to 1,500 kg payloads through dynamic warehouse corridors using natural feature navigation without physical tracks or guide wires.",
    technologies: ["Natural SLAM", "VDA 5050", "Fleet Optimization", "Ultra-Wideband", "Python"],
    status: "Deployed",
    imageGradient: "from-blue-950/70 via-indigo-900/50 to-slate-950",
    imageUrl: "/images/products/nexus-amr.jpg",
  },
  {
    id: "visionsort-ai",
    title: "VisionSort Hyperspectral Defect Inspector",
    category: "Industrial Robotics",
    categoryId: "industrial",
    description:
      "High-speed delta sorting robot coupled with multi-angle hyperspectral computer vision, catching microscopic structural defects at 600+ components per minute.",
    technologies: ["High-Speed CV", "Delta Robot", "TensorRT", "GigE Vision", "OPC-UA"],
    status: "In Development",
    imageGradient: "from-sky-950/70 via-blue-900/40 to-slate-950",
    imageUrl: "/images/products/visionsort-ai.jpg",
  },

  // --- Software & AI (3 Cards) ---
  {
    id: "neurofleet-os",
    title: "NeuroFleet Autonomous Swarm Orchestrator",
    category: "Software & AI",
    categoryId: "software",
    description:
      "Distributed mission control cloud providing real-time telemetry, synchronized multi-agent pathfinding, and fail-safe remote teleoperation across heterogeneous robotic fleets.",
    technologies: ["Distributed Systems", "WebRTC", "Go", "GraphQL", "Kubernetes", "Rust"],
    status: "Deployed",
    imageGradient: "from-purple-950/70 via-indigo-900/50 to-slate-950",
    imageUrl: "/images/products/neurofleet-os.jpg",
  },
  {
    id: "cybertwin-sim",
    title: "CyberTwin Synthetic Physics Simulation Engine",
    category: "Software & AI",
    categoryId: "software",
    description:
      "High-fidelity digital twin simulation platform rendering sensor degradation, aerodynamics, and multi-body physics for training reinforcement learning agents at 100x wall-clock speed.",
    technologies: ["Isaac Sim", "PyTorch", "Ray Tracing", "OpenUSD", "RLlib"],
    status: "In Development",
    imageGradient: "from-fuchsia-950/70 via-violet-900/40 to-slate-950",
    imageUrl: "/images/products/cybertwin-sim.jpg",
  },
  {
    id: "visioncore-sdk",
    title: "VisionCore Embedded Neural Perception SDK",
    category: "Software & AI",
    categoryId: "software",
    description:
      "Sub-5ms latency computer vision foundation model runtime optimized for low-power micro-NPUs and microcontrollers deployed at the extreme physical edge.",
    technologies: ["Quantized ONNX", "Zero-Copy Pipeline", "C++20", "OpenVINO", "NPU Accel"],
    status: "Prototype",
    imageGradient: "from-emerald-950/70 via-cyan-900/40 to-slate-950",
    imageUrl: "/images/products/visioncore-sdk.jpg",
  },
];

const SECTIONS = [
  {
    id: "defence" as const,
    title: "Defence Products",
    subtitle: "Tactical & Strategic Autonomous Systems",
    description:
      "Battlefield-tested unmanned aerial vehicles, rugged ground defense robotics, and directed countermeasure electronic warfare suites designed for high-stress defense environments.",
    icon: (
      <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    badgeColor: "border-red-500/30 text-red-400 bg-red-500/10",
  },
  {
    id: "industrial" as const,
    title: "Industrial Robotics",
    subtitle: "Automation & Factory Intelligence",
    description:
      "Precision collaborative manipulators, autonomous mobile intralogistics transports, and AI-accelerated automated quality inspection machinery for next-gen manufacturing lines.",
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.27.1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.27-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    badgeColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
  },
  {
    id: "software" as const,
    title: "Software & AI",
    subtitle: "Fleet Orchestration & Synthetic Intelligence",
    description:
      "Distributed mission management clouds, high-fidelity synthetic physics simulation platforms, and embedded neural networks designed for real-time robotic autonomy.",
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
        />
      </svg>
    ),
    badgeColor: "border-purple-500/30 text-purple-400 bg-purple-500/10",
  },
];

export default function ProductsPage() {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("all");

  const visibleSections =
    selectedFilter === "all"
      ? SECTIONS
      : SECTIONS.filter((sec) => sec.id === selectedFilter);

  return (
    <div className="relative min-h-screen bg-[#07090e] text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Background Ambience & Cyber Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-cyan-500/15 via-indigo-600/10 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] pointer-events-none" />
        <div className="absolute top-[1600px] left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* ================= HERO SECTION ================= */}
        <header className="text-center space-y-6 pt-4 pb-12 sm:pb-20 max-w-4xl mx-auto">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md text-xs font-medium tracking-wide text-cyan-300 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Robotics • Autonomous Drones • AI Software
          </motion.div>

          {/* Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
              Our Products &amp; Solutions
            </span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Explore our range of intelligent robots, autonomous defense drones, and computer vision platforms built to empower modern defense and industry.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: "Hardware & AI Systems", val: "9+ Solutions" },
              { label: "R&D Experience", val: "15+ Years" },
              { label: "Design & Engineering", val: "100% Indigenous" },
              { label: "Two Synergistic Arms", val: "Sri Saraswathi & SSAIR" },
            ].map((metric, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm"
              >
                <div className="text-xl sm:text-2xl font-bold text-cyan-300">
                  {metric.val}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Filter Tab Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 flex flex-wrap items-center justify-center gap-2"
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-cyan-500/20 border border-cyan-400/50 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </motion.div>
        </header>

        {/* ================= CATEGORY SECTIONS ================= */}
        <div className="space-y-24 sm:space-y-32">
          <AnimatePresence mode="wait">
            {visibleSections.map((section, sectionIdx) => {
              const sectionProjects = PROJECTS.filter(
                (p) => p.categoryId === section.id
              );

              return (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: sectionIdx * 0.1 }}
                  className="space-y-8 scroll-mt-24"
                >
                  {/* Category Section Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
                          {section.icon}
                        </span>
                        <span
                          className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border uppercase tracking-wider ${section.badgeColor}`}
                        >
                          {section.subtitle}
                        </span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {section.title}
                      </h2>
                      <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                        {section.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-end">
                      <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                        {sectionProjects.length} Systems Cataloged
                      </span>
                    </div>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {sectionProjects.map((project, cardIdx) => (
                      <ProjectCard
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        category={project.category}
                        technologies={project.technologies}
                        status={project.status}
                        imageGradient={project.imageGradient}
                        imageUrl={project.imageUrl}
                        index={cardIdx}
                      />
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ================= CALL TO ACTION SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-28 sm:mt-36 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 sm:p-14 text-center backdrop-blur-2xl"
        >
          {/* Background glow accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono tracking-widest text-cyan-300 uppercase bg-cyan-950/60 border border-cyan-500/30">
              Custom Engineering & Integration
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Require Bespoke Tactical or Industrial Robotics?
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Our engineering unit partners directly with aerospace, defense agencies, and enterprise manufacturing facilities to deliver custom hardware payloads, computer vision pipelines, and ROS 2 controllers.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Request Technical Dossier
              </a>
              <a
                href="#collaborate"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors duration-200"
              >
                Consult Our Systems Engineers
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
