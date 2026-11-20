"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NewsCard from "@/components/research/NewsCard";

type CategoryFilter = "all" | "Research" | "News" | "Achievement";

interface ArticleItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: "Research" | "News" | "Achievement";
  link?: string;
  featured?: boolean;
  tags?: string[];
}

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const articles: ArticleItem[] = useMemo(
    () => [
      // Research Papers (DRDO Projects, Industrial Robotics, YOLOv3)
      {
        id: "res-1",
        title: "Autonomous 6-DOF Industrial Robotic Manipulator for Defense Assembly",
        date: "October 2024",
        excerpt:
          "Developed under DRDO collaboration: A high-precision closed-loop impedance control architecture and kinematic trajectory planning system engineered for heavy payload assembly and munitions handling in hazardous defense manufacturing environments.",
        category: "Research",
        link: "#research-robot-manipulator",
        featured: true,
        tags: ["DRDO", "Robotics", "Industrial Arm", "Kinematics"],
      },
      {
        id: "res-2",
        title: "Real-Time Aerial Object Detection & Tracking in Cluttered Scenes Using YOLOv3",
        date: "August 2024",
        excerpt:
          "High-speed edge computer vision framework optimized from the YOLOv3 architecture for low-altitude UAV tactical reconnaissance. Delivers robust multi-spectral target detection and tracking with sub-12ms frame latency under extreme environmental noise.",
        category: "Research",
        link: "#research-yolov3-detection",
        featured: true,
        tags: ["YOLOv3", "Computer Vision", "DRDO", "UAV", "Edge AI"],
      },
      {
        id: "res-3",
        title: "Decentralized Swarm SLAM & Multi-Agent Tactical Mapping in GPS-Denied Environments",
        date: "May 2024",
        excerpt:
          "Robust multi-robot collaborative mapping architecture combining LiDAR-inertial odometry with peer-to-peer consensus algorithms, tailored for autonomous unmanned ground exploration in contested subterranean structures.",
        category: "Research",
        link: "#research-swarm-slam",
        tags: ["SLAM", "Swarm Robotics", "LiDAR", "Autonomous Systems"],
      },
      {
        id: "res-4",
        title: "Deep Reinforcement Learning for Adaptive Gripping & Hazardous Material Sorting",
        date: "January 2024",
        excerpt:
          "Integration of multi-axis tactile sensor feedback with soft actor-critic policy learning, allowing autonomous robotic end-effectors to manipulate fragile ordnance and hazardous chemicals with zero human intervention.",
        category: "Research",
        link: "#research-deep-rl-manipulator",
        tags: ["Reinforcement Learning", "Tactile Sensing", "Hazardous Handling"],
      },

      // News & Updates
      {
        id: "news-1",
        title: "SSAIR Demonstrates Autonomous Defense Robotics at National DefTech Summit 2024",
        date: "November 14, 2024",
        excerpt:
          "Our research team successfully demonstrated the heavy-duty 6-DOF robotic manipulator alongside real-time YOLOv3 edge vision pods to defense leadership, scientists, and international delegates.",
        category: "News",
        link: "#news-deftech-2024",
        tags: ["Summit", "Live Demo", "Defense Expo"],
      },
      {
        id: "news-2",
        title: "Strategic Joint R&D Partnership Initiated for Autonomous Aerial Surveillance",
        date: "September 22, 2024",
        excerpt:
          "SSAIR signs a collaborative development pact with leading defense aerospace manufacturers to integrate our low-latency edge-inference intelligence onto tactical unmanned aerial fleets.",
        category: "News",
        link: "#news-partnership-2024",
        tags: ["Partnership", "Aerospace", "Autonomous Fleet"],
      },
      {
        id: "news-3",
        title: "Inauguration of SSAIR's Advanced High-Speed Robotics & Optical Telemetry Arena",
        date: "July 08, 2024",
        excerpt:
          "Expanded our laboratory footprint with an advanced 5,000 sq ft physical testing facility equipped with sub-millimeter 12-camera optical motion capture, vibration stress simulators, and thermal profiling.",
        category: "News",
        link: "#news-lab-expansion",
        tags: ["Facility", "R&D Lab", "Motion Capture"],
      },
      {
        id: "news-4",
        title: "Milestone: YOLOv3 Neural Inference Accelerated by 42% on Embedded Defense Chips",
        date: "March 18, 2024",
        excerpt:
          "The computer vision team finalized custom INT8 tensor quantization pipelines, delivering unprecedented frame rates and micro-watt efficiency on ruggedized defense edge computing units.",
        category: "News",
        link: "#news-inference-milestone",
        tags: ["Edge AI", "Quantization", "Performance"],
      },

      // Achievements
      {
        id: "ach-1",
        title: "DRDO Best Team Award for Outstanding Robotic Systems Development",
        date: "December 2024",
        excerpt:
          "Awarded the prestigious DRDO Best Team Recognition for pioneering technological excellence, rapid defense prototyping, and delivering mission-ready autonomous robotic manipulation hardware.",
        category: "Achievement",
        link: "#achievement-drdo-award",
        featured: true,
        tags: ["DRDO Award", "Best Team", "Excellence"],
      },
      {
        id: "ach-2",
        title: "Founded & Directed by Indian Institute of Science (IISc) Alumni",
        date: "Institutional Heritage",
        excerpt:
          "SSAIR's foundational core, principal scientists, and systems architects represent premier engineering pedagogy and breakthrough patented robotics research originating from IISc Bangalore.",
        category: "Achievement",
        link: "#achievement-iisc-alumni",
        featured: true,
        tags: ["IISc Alumni", "Academic Rigor", "Patents"],
      },
      {
        id: "ach-3",
        title: "National Innovation Excellence Award in AI & Defense Robotics",
        date: "August 2024",
        excerpt:
          "Honored as one of India's leading deep-tech innovators in autonomous defense engineering, cited for sovereign technological contributions in multi-agent robotics and embedded vision.",
        category: "Achievement",
        link: "#achievement-national-award",
        tags: ["National Honor", "Deep Tech", "Defense Innovation"],
      },
      {
        id: "ach-4",
        title: "Officially Empaneled as Specialized R&D Partner for Autonomous Systems",
        date: "February 2024",
        excerpt:
          "Formally recognized and empaneled as a verified technology development partner for tactical defense automation, computer vision surveillance, and high-reliability robotic systems.",
        category: "Achievement",
        link: "#achievement-empanelment",
        tags: ["Accreditation", "Defense Partner", "Certified"],
      },
    ],
    []
  );

  const tabs: { key: CategoryFilter; label: string; count: number }[] = [
    { key: "all", label: "All Items", count: articles.length },
    {
      key: "Research",
      label: "Research Papers",
      count: articles.filter((a) => a.category === "Research").length,
    },
    {
      key: "News",
      label: "News & Updates",
      count: articles.filter((a) => a.category === "News").length,
    },
    {
      key: "Achievement",
      label: "Achievements",
      count: articles.filter((a) => a.category === "Achievement").length,
    },
  ];

  // Filtered list
  const filteredArticles = useMemo(() => {
    return articles.filter((item) => {
      const matchesTab = activeTab === "all" || item.category === activeTab;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags &&
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      return matchesTab && matchesSearch;
    });
  }, [articles, activeTab, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[#07090e] text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Decorative Mesh & Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-600/15 via-blue-600/15 to-purple-600/10 blur-[140px]" />
        <div className="absolute top-1/3 -left-48 h-[400px] w-[500px] rounded-full bg-cyan-700/10 blur-[130px]" />
        <div className="absolute bottom-10 -right-48 h-[450px] w-[550px] rounded-full bg-indigo-700/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* HERO SECTION */}
        <header className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-cyan-300 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
            </span>
            DEFENSE ROBOTICS & EDGE AI LAB
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-400 bg-clip-text text-transparent">
              Research & News
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl"
          >
            Discover our breakthrough research in autonomous 6-DOF industrial
            manipulators, real-time aerial YOLOv3 object detection, institutional
            milestones, and honors including the{" "}
            <span className="font-semibold text-amber-300">
              DRDO Best Team Award
            </span>
            , proudly spearheaded by{" "}
            <span className="font-semibold text-cyan-300">IISc alumni</span>.
          </motion.p>

          {/* Quick Metrics & Highlights Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          >
            <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-4 backdrop-blur-md">
              <div className="text-2xl font-bold text-white sm:text-3xl">DRDO</div>
              <div className="mt-1 text-xs text-zinc-400">
                Key Robotics & Vision Projects
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-4 backdrop-blur-md">
              <div className="text-2xl font-bold text-cyan-400 sm:text-3xl">IISc</div>
              <div className="mt-1 text-xs text-zinc-400">
                Alumni-Founded Engineering Core
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-4 backdrop-blur-md">
              <div className="text-2xl font-bold text-amber-400 sm:text-3xl">
                Best Team
              </div>
              <div className="mt-1 text-xs text-zinc-400">
                DRDO Technology Award
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-4 backdrop-blur-md">
              <div className="text-2xl font-bold text-emerald-400 sm:text-3xl">
                &lt;12ms
              </div>
              <div className="mt-1 text-xs text-zinc-400">
                YOLOv3 Edge Inference
              </div>
            </div>
          </motion.div>
        </header>

        {/* TABS & SEARCH NAVIGATION BAR */}
        <section className="mt-16 sm:mt-20">
          <div className="flex flex-col items-center justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row">
            {/* Tabs */}
            <div className="flex w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-zinc-900/60 p-1.5 backdrop-blur-xl sm:w-auto">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 sm:text-sm ${
                      isActive
                        ? "text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                    <span
                      className={`relative z-10 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? "bg-cyan-500/30 text-cyan-200"
                          : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search DRDO, YOLOv3, robot..."
                className="w-full rounded-xl border border-white/10 bg-zinc-900/60 py-2 pl-10 pr-9 text-xs text-white placeholder-zinc-500 backdrop-blur-xl transition-all duration-200 focus:border-cyan-500/50 focus:bg-zinc-900/90 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 sm:text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* SECTION / CARD VIEW */}
        <main className="mt-10">
          {filteredArticles.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-zinc-900/40 p-8 text-center backdrop-blur-md">
              <svg
                className="mx-auto h-12 w-12 text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-base font-semibold text-white">
                No matching results found
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                Try searching for keywords like &ldquo;DRDO&rdquo;, &ldquo;Robot&rdquo;, &ldquo;YOLOv3&rdquo;, or reset the active filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="mt-5 rounded-lg bg-cyan-500/20 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/30"
              >
                Clear Filters
              </button>
            </div>
          ) : activeTab === "all" && searchQuery.trim() === "" ? (
            // Grouped Section View for "All" tab
            <div className="space-y-16">
              {/* 1. Research Papers Section */}
              <section id="research-papers">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-400 uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      DRDO &amp; Robotics Research
                    </div>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      Research Papers &amp; Publications
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab("Research")}
                    className="text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    View all research ({articles.filter((a) => a.category === "Research").length}) &rarr;
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                  {articles
                    .filter((a) => a.category === "Research")
                    .map((item) => (
                      <NewsCard
                        key={item.id}
                        title={item.title}
                        date={item.date}
                        excerpt={item.excerpt}
                        category={item.category}
                        link={item.link}
                      />
                    ))}
                </div>
              </section>

              {/* 2. News & Updates Section */}
              <section id="news-updates">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-400 uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Announcements &amp; Field Deployments
                    </div>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      News &amp; Updates
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab("News")}
                    className="text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    View all news ({articles.filter((a) => a.category === "News").length}) &rarr;
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                  {articles
                    .filter((a) => a.category === "News")
                    .map((item) => (
                      <NewsCard
                        key={item.id}
                        title={item.title}
                        date={item.date}
                        excerpt={item.excerpt}
                        category={item.category}
                        link={item.link}
                      />
                    ))}
                </div>
              </section>

              {/* 3. Achievements Section */}
              <section id="achievements">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-amber-400 uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      Institutional Recognition &amp; Pedigree
                    </div>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      Honors &amp; Achievements
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab("Achievement")}
                    className="text-xs font-semibold text-amber-400 hover:underline"
                  >
                    View all honors ({articles.filter((a) => a.category === "Achievement").length}) &rarr;
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                  {articles
                    .filter((a) => a.category === "Achievement")
                    .map((item) => (
                      <NewsCard
                        key={item.id}
                        title={item.title}
                        date={item.date}
                        excerpt={item.excerpt}
                        category={item.category}
                        link={item.link}
                      />
                    ))}
                </div>
              </section>
            </div>
          ) : (
            // Filtered Grid View when a specific tab or search query is active
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeTab + searchQuery}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredArticles.map((item) => (
                  <NewsCard
                    key={item.id}
                    title={item.title}
                    date={item.date}
                    excerpt={item.excerpt}
                    category={item.category}
                    link={item.link}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </main>

        {/* CALL TO ACTION / COLLABORATION BANNER */}
        <section className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-8 text-center backdrop-blur-2xl sm:p-12"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />

            <span className="inline-block rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              R&amp;D Partnerships &amp; Grants
            </span>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Collaborate With SSAIR Research Labs
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Whether you are looking to sponsor sovereign defense robotics initiatives,
              deploy low-latency edge vision systems, or collaborate with our IISc alumni research team, we welcome joint ventures and research inquiries.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30"
              >
                Inquire for Collaboration
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
              <a
                href="#publications"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition-colors duration-200 hover:bg-white/10 hover:text-white"
              >
                Request Publications Whitepaper
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
