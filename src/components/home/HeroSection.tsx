"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Scene3D from "@/components/home/Scene3D";

// Particle configuration for animated CSS floating particles
const particles = [
  { top: "12%", left: "15%", size: 4, duration: 8, delay: 0, color: "bg-cyan-400" },
  { top: "22%", left: "82%", size: 6, duration: 11, delay: 1, color: "bg-blue-400" },
  { top: "42%", left: "8%", size: 3, duration: 9, delay: 2, color: "bg-cyan-300" },
  { top: "68%", left: "88%", size: 5, duration: 12, delay: 0.5, color: "bg-sky-400" },
  { top: "78%", left: "22%", size: 4, duration: 10, delay: 3, color: "bg-teal-300" },
  { top: "32%", left: "72%", size: 3, duration: 7, delay: 1.5, color: "bg-cyan-400" },
  { top: "58%", left: "14%", size: 5, duration: 13, delay: 2.5, color: "bg-blue-500" },
  { top: "16%", left: "64%", size: 4, duration: 8.5, delay: 4, color: "bg-sky-300" },
  { top: "84%", left: "68%", size: 6, duration: 11.5, delay: 1.8, color: "bg-cyan-400" },
  { top: "28%", left: "32%", size: 3, duration: 9.5, delay: 3.2, color: "bg-blue-400" },
  { top: "48%", left: "92%", size: 4, duration: 8, delay: 0.8, color: "bg-cyan-300" },
  { top: "8%", left: "42%", size: 5, duration: 14, delay: 2.1, color: "bg-teal-400" },
  { top: "74%", left: "48%", size: 3, duration: 10.5, delay: 3.8, color: "bg-sky-400" },
  { top: "62%", left: "38%", size: 4, duration: 9, delay: 1.2, color: "bg-cyan-400" },
  { top: "18%", left: "80%", size: 5, duration: 12, delay: 2.7, color: "bg-blue-400" },
  { top: "88%", left: "18%", size: 3, duration: 7.5, delay: 0.3, color: "bg-cyan-300" },
  { top: "38%", left: "6%", size: 5, duration: 13, delay: 4.5, color: "bg-teal-300" },
  { top: "52%", left: "62%", size: 4, duration: 8.8, delay: 1.9, color: "bg-blue-300" },
];

export function HeroSection() {
  // Staggered reveal variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.15,
      },
    },
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-950 text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes gridSlide {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 60px 60px;
          }
        }

        @keyframes particleDrift {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-35px) translateX(15px);
            opacity: 0.85;
          }
          100% {
            transform: translateY(-70px) translateX(-10px);
            opacity: 0.15;
          }
        }

        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) rotate(2deg);
          }
        }

        @keyframes floatReverse {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(22px) rotate(-2deg);
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinSlowReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.65;
            transform: scale(1.06);
          }
        }

        @keyframes lineShimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>

      {/* 1. Base Dark Gradients: Gray-950 to transparent */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/70 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(14,165,233,0.12),rgba(3,7,18,0.95))] pointer-events-none z-[1]" />

      {/* 2. Animated Particle & Grid Background (Pure CSS) */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "gridSlide 20s linear infinite",
          maskImage: "radial-gradient(ellipse 85% 70% at 50% 50%, #000 35%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 70% at 50% 50%, #000 35%, transparent 85%)",
        }}
      />

      {/* CSS Animated Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        {particles.map((p, idx) => (
          <span
            key={idx}
            className={`absolute rounded-full ${p.color} shadow-[0_0_12px_currentColor]`}
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `particleDrift ${p.duration}s ease-in-out infinite alternate`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 3. Floating Decorative Elements (Circles, Lines) with CSS Animation */}
      {/* Ambient glowing blurred circles */}
      <div
        className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-cyan-600/15 blur-[120px] pointer-events-none z-[2]"
        style={{ animation: "pulseGlow 9s ease-in-out infinite" }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-700/15 blur-[140px] pointer-events-none z-[2]"
        style={{ animation: "pulseGlow 12s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[360px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none z-[2]"
        style={{ animation: "floatSlow 14s ease-in-out infinite" }}
      />

      {/* Floating geometric circles (dashed & solid rings) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-[2]">
        {/* Outer dashed orbital ring */}
        <div
          className="w-[720px] h-[720px] rounded-full border border-dashed border-cyan-500/20"
          style={{ animation: "spinSlow 65s linear infinite" }}
        />
        {/* Inner solid tactical orbital ring */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full border border-blue-500/15"
          style={{ animation: "spinSlowReverse 80s linear infinite" }}
        />
        {/* Core telemetry ring */}
        <div
          className="absolute w-[320px] h-[320px] rounded-full border border-cyan-400/10"
          style={{ animation: "pulseGlow 7s ease-in-out infinite" }}
        />
      </div>

      {/* Floating Decorative Lines */}
      {/* Shimmering horizontal accent lines */}
      <div
        className="absolute top-28 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent pointer-events-none overflow-hidden z-[2]"
        style={{ animation: "floatSlow 8s ease-in-out infinite" }}
      >
        <div
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
          style={{ animation: "lineShimmer 5s ease-in-out infinite" }}
        />
      </div>

      <div
        className="absolute bottom-28 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none overflow-hidden z-[2]"
        style={{ animation: "floatReverse 10s ease-in-out infinite" }}
      >
        <div
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          style={{ animation: "lineShimmer 6s ease-in-out infinite 2s" }}
        />
      </div>

      {/* Diagonal decorative lines */}
      <div
        className="absolute top-1/4 -left-20 w-80 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent rotate-[35deg] pointer-events-none z-[2]"
        style={{ animation: "floatSlow 11s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-80 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -rotate-[35deg] pointer-events-none z-[2]"
        style={{ animation: "floatReverse 12s ease-in-out infinite" }}
      />

      {/* Tactical HUD Corner Reticles */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40 pointer-events-none z-[3]" />
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 w-8 h-8 border-t-2 border-r-2 border-cyan-500/40 pointer-events-none z-[3]" />
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 w-8 h-8 border-b-2 border-l-2 border-cyan-500/40 pointer-events-none z-[3]" />
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40 pointer-events-none z-[3]" />

      {/* Telemetry Corner Indicators */}
      <div className="hidden lg:flex items-center gap-2 absolute top-24 left-16 font-mono text-[11px] tracking-wider text-cyan-400/60 uppercase pointer-events-none z-[3]">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>SYS.AUTONOMY // ACTIVE</span>
      </div>
      <div className="hidden lg:flex items-center gap-2 absolute top-24 right-16 font-mono text-[11px] tracking-wider text-cyan-400/60 uppercase pointer-events-none z-[3]">
        <span>DRDO CAIR &bull; IISc ALUMNI</span>
      </div>

      {/* 4. Scene3D (Positioned absolutely behind text) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Scene3D />
      </div>

      {/* 5. Main Content: Staggered Fade-up Text Reveal (Relative z-10) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Top Pill Badge */}
          <motion.div variants={itemFadeUp} className="mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gray-900/80 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-xs sm:text-sm font-medium tracking-wide text-cyan-300">
                Next-Gen Deep Tech & Autonomous Defense Systems
              </span>
            </div>
          </motion.div>

          {/* Large Animated Heading: text-4xl to text-7xl */}
          <motion.h1
            variants={itemFadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white max-w-5xl mb-6"
          >
            Pioneering{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
              AI & Robotics
            </span>{" "}
            for Defence & Beyond
          </motion.h1>

          {/* Animated Subheading about the company */}
          <motion.p
            variants={itemFadeUp}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed font-normal mb-10"
          >
            Sri Srinivasa AI Robotics (SSAIR) engineers sovereign autonomous systems,
            deep-tech defence solutions, and cognitive robotics. Founded by veteran DRDO
            CAIR research leadership and IISc alumni, we pioneer next-generation
            intelligence for mission-critical operations.
          </motion.p>

          {/* Two CTA Buttons */}
          <motion.div
            variants={itemFadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto mb-14"
          >
            {/* Primary CTA: Explore Services (gradient blue-cyan) */}
            <Link
              href="/services"
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white text-base bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:via-cyan-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 active:scale-95"
            >
              <span>Explore Services</span>
              <svg
                className="w-5 h-5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            {/* Outline CTA: Contact Us (outline) */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-cyan-300 hover:text-white text-base border border-cyan-500/40 hover:border-cyan-400 bg-gray-950/40 hover:bg-cyan-950/30 backdrop-blur-md shadow-sm transition-all duration-300 active:scale-95"
            >
              <span>Contact Us</span>
              <svg
                className="w-5 h-5 ml-2.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Quick Metrics / Strategic Pillars Grid */}
          <motion.div
            variants={itemFadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl"
          >
            <div className="flex flex-col items-center p-3.5 rounded-xl bg-gray-900/40 border border-gray-800/80 backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">100%</span>
              <span className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">Indigenous Tech</span>
            </div>
            <div className="flex flex-col items-center p-3.5 rounded-xl bg-gray-900/40 border border-gray-800/80 backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-bold font-mono text-blue-400">CAIR & IISc</span>
              <span className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">Research Pedigree</span>
            </div>
            <div className="flex flex-col items-center p-3.5 rounded-xl bg-gray-900/40 border border-gray-800/80 backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">Defence Grade</span>
              <span className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">Autonomy & Systems</span>
            </div>
            <div className="flex flex-col items-center p-3.5 rounded-xl bg-gray-900/40 border border-gray-800/80 backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-bold font-mono text-teal-300">Deep-Tech</span>
              <span className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">Robotics R&D</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60 z-[3]">
        <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400">Scroll to Explore</span>
        <div className="w-5 h-8 rounded-full border border-gray-600/70 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
