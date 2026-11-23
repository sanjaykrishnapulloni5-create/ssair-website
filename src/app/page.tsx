import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";

export const metadata: Metadata = {
  title: "Sri Srinivasa AI Robotics (SSAIR) | Intelligent Robotics & AI Solutions",
  description:
    "Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR) is a premier Indian technology company engineering intelligent robotics, defense drones, and computer vision systems. Sister company of Sri Saraswathi AI & Robotics.",
};

const SERVICES = [
  {
    title: "Tactical Defense Drones",
    description: "Autonomous unmanned aerial vehicles designed for reconnaissance, surveillance, and tactical operations in GPS-denied environments.",
    icon: (
      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
  {
    title: "Industrial Robotic Arms",
    description: "High-precision 5-bar mechanism and collaborative robotic arms engineered for high-speed pick-and-place, welding, and assembly lines.",
    icon: (
      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "AI Computer Vision",
    description: "Real-time object detection, facial recognition, defect inspection, and spatial tracking powered by custom neural networks.",
    icon: (
      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: "Autonomous Navigation",
    description: "Self-navigating mobile robots (AMRs) with LiDAR SLAM, obstacle avoidance, and intelligent multi-agent fleet dispatching.",
    icon: (
      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: "Embedded Systems & IoT",
    description: "Custom firmware, hardware boards, and edge computing controllers built to function reliably under extreme operating conditions.",
    icon: (
      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m16-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    title: "Defense R&D Consulting",
    description: "Specialized engineering research in guidance algorithms, missile simulation, fighter aircraft systems, and sovereign tech development.",
    icon: (
      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. What We Build (Services Overview) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
              What We Build &amp; Engineer
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
              From autonomous aerial systems to factory floor robots, our technology is engineered for high precision, safety, and mission-critical performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center mb-5">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">
                  {service.description}
                </p>
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href="/services"
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1"
                  >
                    <span>Learn more</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Two Companies Synergy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Corporate Hierarchy &amp; Synergy
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
              Two Companies, One Unified Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
              A collaborative corporate ecosystem delivering complete end-to-end AI software and sovereign defense robotics hardware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Main Company */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                MAIN COMPANY (EST. 2022)
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Sri Saraswathi Artificial Intelligence and Robotics
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                The flagship enterprise founded in 2022. Directs overarching AI research, neural network algorithms, enterprise automation platforms, and foundational robotics software.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span> Core AI &amp; Machine Learning Architectures
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span> Enterprise Industrial Automation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span> Founded &amp; Operating Since 2022
                </li>
              </ul>
            </div>

            {/* Sister Company (SSAIR) */}
            <div className="bg-blue-50/50 dark:bg-blue-950/20 p-8 rounded-3xl border border-blue-200 dark:border-blue-900/40 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                SISTER COMPANY (EST. 2026)
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Sri Srinivasa AI Robotics (SSAIR)
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                The dedicated deep-tech defense and experimental hardware wing (NIC 7210: Natural Sciences &amp; Engineering R&amp;D). Headquartered in Indiranagar, Bengaluru.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span> Tactical UAVs &amp; Unmanned Defense Robotics
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span> CIN: U72100KA2026PTC222434 (ROC Bengaluru)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span> 15+ Years DRDO CAIR Scientific Lineage
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Founder Spotlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Founder Image */}
            <div className="relative shrink-0">
              <div className="w-44 h-52 sm:w-52 sm:h-64 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-md relative">
                <img
                  src="/images/founder.jpg"
                  alt="Dr. Dadireddy Srinivasulu Reddy"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                DRDO Awardee
              </div>
            </div>

            {/* Founder Bio */}
            <div className="space-y-4 text-center md:text-left">
              <div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Scientific Leadership
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                  Dr. Dadireddy Srinivasulu Reddy
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Founder &amp; Director — Sri Srinivasa AI Robotics Pvt. Ltd.
                </p>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                With over 15 years of defense R&amp;D experience as a former <strong className="text-slate-900 dark:text-white">Scientist &apos;D&apos;</strong> at CAIR (DRDO Bengaluru) and an alumnus of the prestigious <strong className="text-slate-900 dark:text-white">Indian Institute of Science (IISc), Bangalore</strong>, Dr. Dadireddy Srinivasulu Reddy leads our engineering team in creating cutting-edge, sovereign robotics and AI systems for India.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start text-xs font-medium text-slate-700 dark:text-slate-300">
                <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  IISc Bangalore (M.E. CSA)
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  Ex-Scientist &apos;D&apos; CAIR DRDO
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  DRDO Best Team Awardee
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call To Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Ready to Build With Us?
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Whether you need customized autonomous robotics, defense solutions, or advanced AI computer vision systems, our team is ready to assist.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
            >
              Get in Touch
            </Link>
            <Link
              href="/products"
              className="px-8 py-3.5 rounded-full font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
