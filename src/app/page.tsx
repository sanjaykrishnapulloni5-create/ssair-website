import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import StatsCounter from "@/components/home/StatsCounter";
import FeaturedServices from "@/components/home/FeaturedServices";

export const metadata: Metadata = {
  title: "Sri Srinivasa AI Robotics (SSAIR) | Intelligent Robotics & AI Solutions",
  description:
    "Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR) is a premier Indian technology company engineering intelligent robotics, defense drones, and computer vision systems. Sister company of Sri Saraswathi AI & Robotics.",
  keywords: [
    "Sri Srinivasa AI Robotics",
    "SSAIR",
    "Sri Saraswathi Artificial Intelligence and Robotics",
    "Dadireddy Srinivasulu Reddy",
    "DRDO CAIR",
    "IISc Bangalore",
    "Robotics India",
    "Defense Drones",
    "Autonomous Systems",
    "Industrial Robotics",
    "Bengaluru Robotics",
  ],
  openGraph: {
    title: "Sri Srinivasa AI Robotics (SSAIR) | Intelligent Robotics & AI",
    description:
      "Intelligent robotics, autonomous systems, and computer vision founded by former DRDO Scientist 'D' Dr. Dadireddy Srinivasulu Reddy (IISc alumnus).",
    type: "website",
  },
};

/**
 * Why Choose Us Section
 * Simple, human-friendly cards explaining SSAIR's strengths in plain English.
 */
function WhyChooseUsSection() {
  const cards = [
    {
      id: "drdo-heritage",
      badge: "Defense Heritage",
      title: "15+ Years Defense Engineering",
      subtitle: "Led by Ex-DRDO Scientist 'D'",
      description:
        "Founded by Dr. Dadireddy Srinivasulu Reddy, former Scientist 'D' at CAIR DRDO and recipient of the DRDO Best Team Award. We bring over 15 years of defense-grade engineering to every autonomous system we create.",
      highlights: ["Ex-Scientist 'D' CAIR DRDO", "DRDO Best Team Awardee", "Missile & Defense Guidance"],
      icon: (
        <svg
          className="w-6 h-6 text-cyan-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
    },
    {
      id: "iisc-foundation",
      badge: "Academic Rigor",
      title: "IISc Bangalore Research Foundation",
      subtitle: "Top-Tier Scientific Excellence",
      description:
        "Trained at the Indian Institute of Science (IISc), Bangalore with a Master of Engineering in Computer Science & Automation. We combine deep academic research with practical, real-world execution.",
      highlights: ["IISc Bangalore (M.E. CSA)", "SVU First Class Distinction", "Deep Research Rigor"],
      icon: (
        <svg
          className="w-6 h-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
          />
        </svg>
      ),
    },
    {
      id: "robotics-vision",
      badge: "Intelligent Tech",
      title: "Smart Robotics & AI Computer Vision",
      subtitle: "Hardware & Software Built in India",
      description:
        "Proprietary parallel robotics kinematics and real-time computer vision algorithms. Our robots can see, analyze, and act precisely in high-speed manufacturing lines and security environments.",
      highlights: ["Parallel Robotic Arms", "Real-Time AI Camera Vision", "High-Precision Motion"],
      icon: (
        <svg
          className="w-6 h-6 text-teal-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m16-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
    },
    {
      id: "corporate-synergy",
      badge: "Two Strong Companies",
      title: "Backed by Sri Saraswathi AI & SSAIR",
      subtitle: "Complete Hardware & AI Synergy",
      description:
        "Sri Srinivasa AI Robotics operates in close synergy with its parent company, Sri Saraswathi Artificial Intelligence & Robotics Pvt. Ltd. (est. 2022), providing complete end-to-end AI and robotics systems.",
      highlights: ["Main Co: Sri Saraswathi AI (2022)", "Sister Arm: SSAIR (2026)", "Bengaluru Tech Hub"],
      icon: (
        <svg
          className="w-6 h-6 text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden border-t border-slate-800/80"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Why Partner With{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Sri Srinivasa AI Robotics
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            We deliver trusted, reliable, and intelligent robotics built with 15+ years of defense science pedigree and top-tier academic research.
          </p>
        </div>

        {/* 4 Clean Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between"
            >
              <div>
                {/* Card Header with Icon and Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                    {card.icon}
                  </div>
                  <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/70 border border-cyan-800/60 px-3 py-1 rounded-full">
                    {card.badge}
                  </span>
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-cyan-400/90 mt-1 mb-3">
                  {card.subtitle}
                </p>

                {/* Card Body */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap gap-2">
                {card.highlights.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700/60 px-3 py-1 rounded-lg"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Call to Action Section
 * Clean, inviting, and direct communication.
 */
function CTASection() {
  return (
    <section
      id="cta"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden"
    >
      <div className="relative max-w-5xl mx-auto rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 sm:p-12 lg:p-16 shadow-2xl text-center flex flex-col items-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/50 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          START A CONVERSATION
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight">
          Ready to Build Intelligent{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            Robotics &amp; AI Systems?
          </span>
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
          Whether you need autonomous defense solutions, industrial robotics, or custom AI computer vision, our engineering team is here to help.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
          >
            <span>Get in Touch With Us</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          <a
            href="tel:+919848126456"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all active:scale-95"
          >
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call +91 98481 26456</span>
          </a>
        </div>

        {/* Corporate Trust Strip */}
        <div className="pt-8 border-t border-slate-800 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div>
            <span className="text-slate-500 block text-[11px]">Sister Company</span>
            <span className="text-slate-200 font-medium">To Sri Saraswathi AI (Est. 2022)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Office Headquarters</span>
            <span className="text-slate-200 font-medium">Indiranagar, Bengaluru, India</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Direct Liaison</span>
            <span className="text-cyan-400 font-medium">srinivasulureddydadireddy@gmail.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Main Homepage
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-black flex flex-col">
      <HeroSection />
      <StatsCounter />
      <FeaturedServices />
      <WhyChooseUsSection />
      <CTASection />
    </main>
  );
}
