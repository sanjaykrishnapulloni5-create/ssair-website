"use client";

import React, { useState } from "react";
import ProjectCard from "@/components/products/ProjectCard";

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
  imageUrl?: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: "aegis-uav",
    title: "Aegis-UAV Tactical Reconnaissance Drone",
    category: "Defence Products",
    categoryId: "defence",
    description:
      "Autonomous long-endurance tactical UAV built for GPS-denied environments with onboard multi-spectral thermal tracking, anti-jam telemetry, and edge-computed target classification.",
    technologies: ["Edge AI", "ROS 2", "FLIR Thermal", "AES-256", "PX4 Autopilot"],
    status: "Deployed",
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
    imageUrl: "/images/products/sentinel-cuas.jpg",
  },
  {
    id: "titanarm-cobot",
    title: "TitanArm 6-Axis Collaborative Manipulator",
    category: "Industrial Robotics",
    categoryId: "industrial",
    description:
      "Sub-millimeter precision collaborative robotic arm engineered for high-payload automotive welding, aerospace composite finishing, and safe human-robot shop floor collaboration.",
    technologies: ["Force/Torque Sensing", "EtherCAT", "Digital Twin", "Safety PLC", "Kinematics"],
    status: "Deployed",
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
    imageUrl: "/images/products/visionsort-ai.jpg",
  },
  {
    id: "neurofleet-os",
    title: "NeuroFleet Autonomous Swarm Orchestrator",
    category: "Software & AI",
    categoryId: "software",
    description:
      "Distributed mission control cloud providing real-time telemetry, synchronized multi-agent pathfinding, and fail-safe remote teleoperation across heterogeneous robotic fleets.",
    technologies: ["Distributed Systems", "WebRTC", "Go", "GraphQL", "Kubernetes", "Rust"],
    status: "Deployed",
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
    imageUrl: "/images/products/visioncore-sdk.jpg",
  },
];

export default function ProductsPage() {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("all");

  const filteredProjects =
    selectedFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categoryId === selectedFilter);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Product Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            Our Products &amp; Solutions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
            Autonomous defense drones, industrial robotic arms, and deep-learning software solutions engineered for sovereign reliability.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              category={project.category}
              technologies={project.technologies}
              status={project.status}
              imageUrl={project.imageUrl}
              index={idx}
            />
          ))}
        </div>

        {/* CTA Bar */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Need Custom Robotics or AI Engineering?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            Our research and engineering labs design custom hardware mechanisms, sensor payloads, and computer vision models to meet your exact specifications.
          </p>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex px-8 py-3.5 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all text-sm"
            >
              Contact Our Engineering Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
