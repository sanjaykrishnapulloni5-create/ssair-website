import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import StatsCounter from "@/components/home/StatsCounter";
import FeaturedServices from "@/components/home/FeaturedServices";

export const metadata: Metadata = {
  title: "Sri Srinivasa AI Robotics (SSAIR) | Sovereign AI & Robotics R&D",
  description:
    "Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR) is a premier Indian deep-tech enterprise pioneering indigenous AI, robotics, and defense technologies. Founded by former DRDO CAIR Scientist 'D' Dadireddy Srinivasulu Reddy (IISc alumnus).",
  keywords: [
    "Sri Srinivasa AI Robotics",
    "SSAIR",
    "Dadireddy Srinivasulu Reddy",
    "DRDO CAIR",
    "IISc Bangalore",
    "Five-Bar Mechanism",
    "Parallel Robotics",
    "YOLOv3",
    "OpenCV DNN",
    "Defense Robotics",
    "Autonomous Systems",
    "Bengaluru Robotics",
  ],
  openGraph: {
    title: "Sri Srinivasa AI Robotics (SSAIR) | Defense AI & Robotics R&D",
    description:
      "Deep-tech innovation in robotics kinematics, computer vision, and autonomous systems founded by former DRDO Scientist 'D' Dadireddy Srinivasulu Reddy.",
    type: "website",
  },
};

/**
 * 4. Why Choose Us Section
 * Inline component featuring 4 comprehensive value-pillar cards with icons,
 * highlighting SSAIR's DRDO heritage, IISc academic rigor, proprietary robotics kinematics,
 * and certified sovereign deep-tech credentials.
 */
function WhyChooseUsSection() {
  const cards = [
    {
      id: "drdo-heritage",
      badge: "DRDO CAIR Heritage",
      title: "15+ Years Defence R&D Pedigree",
      subtitle: "Scientist 'D' Veteran & Best Team Award",
      description:
        "Founded by Dadireddy Srinivasulu Reddy, former Scientist 'D' at CAIR, DRDO Bengaluru and recipient of the prestigious DRDO Best Team Award. Over 15 years of proven excellence engineering missile guidance technology, fighter aircraft systems, and embedded autonomy.",
      tags: ["DRDO CAIR Bengaluru", "Missile Technology", "Fighter Aircraft Systems", "Best Team Award"],
      icon: (
        <svg
          className="w-7 h-7 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
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
      badge: "Academic Excellence",
      title: "IISc Bangalore Research Foundation",
      subtitle: "M.E. in Computer Science & Automation",
      description:
        "Rooted in top-tier scientific training with an M.E. in Computer Science & Automation from the Indian Institute of Science (IISc), Bangalore, B.Tech in CS&E with Distinction from Sri Venkateswara University, and 4 years of university engineering teaching experience.",
      tags: ["IISc Bangalore (M.E. CSA)", "SVU First Class Distinction", "4+ Yrs Teaching Pedagogy"],
      icon: (
        <svg
          className="w-7 h-7 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
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
      badge: "Proprietary Tech",
      title: "Five-Bar Robotics & Real-Time AI Vision",
      subtitle: "Parallel Kinematics, Dynamics & YOLOv3",
      description:
        "Breakthrough proprietary engineering in parallel industrial robotics (five-bar mechanism kinematics, dynamics, motor selection, and singularity analysis) and real-time computer vision using YOLOv3 with OpenCV DNN across COCO classes.",
      tags: ["Five-Bar Mechanism", "Singularity Analysis", "Motor Selection", "YOLOv3 & OpenCV DNN"],
      icon: (
        <svg
          className="w-7 h-7 text-teal-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
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
      id: "sovereign-r-and-d",
      badge: "NIC 7210 Certified",
      title: "Sovereign Deep-Tech Enterprise",
      subtitle: "CIN: U72100KA2026PTC222434 | ROC Bangalore",
      description:
        "Registered corporate R&D enterprise in natural sciences & engineering headquartered in Indiranagar, Bengaluru. Directed by Anusha Nagella (Whole-time Director) and operating as the dedicated deep-tech sister enterprise to main flagship company Sri Saraswathi Artificial Intelligence and Robotics Pvt. Ltd. (est. 2022).",
      tags: ["Main Co: Sri Saraswathi AI", "Sister R&D Wing", "Indiranagar, Bengaluru", "Authorized ₹10 Lakhs"],
      icon: (
        <svg
          className="w-7 h-7 text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
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
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white overflow-hidden border-t border-zinc-800/80"
    >
      {/* Background glow effects */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-transparent blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-indigo-600/10 blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Engineering Excellence & Pedigree
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Sri Srinivasa AI Robotics
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
            Founded by former DRDO CAIR Scientist &apos;D&apos; and IISc Bangalore alumnus Dadireddy Srinivasulu Reddy, SSAIR delivers sovereign defense-grade engineering, parallel robotics kinematics, and real-time computer vision systems.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-cyan-500/50 p-7 sm:p-9 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 backdrop-blur-xl flex flex-col justify-between"
            >
              {/* Subtle top edge glossy highlight */}
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                aria-hidden="true"
              />

              <div>
                {/* Card Header with Icon and Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/60 group-hover:border-cyan-500/40 group-hover:bg-cyan-950/30 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-full">
                    {card.badge}
                  </span>
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-cyan-400/90 mt-1 mb-3">
                  {card.subtitle}
                </p>

                {/* Card Body */}
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Tags / Pillars */}
              <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-zinc-300 bg-zinc-800/60 border border-zinc-700/50 px-2.5 py-1 rounded-md"
                  >
                    {tag}
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
 * 5. CTA Section
 * Inline call-to-action section with vibrant gradient background,
 * trust indicators, company registration badges, and interactive navigation links.
 */
function CTASection() {
  return (
    <section
      id="cta"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/15 to-indigo-600/15 blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-cyan-950/80 via-blue-950/70 to-zinc-950/95 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-cyan-950/60 backdrop-blur-2xl">
        {/* Subtle grid texture overlay */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#0891b212_1px,transparent_1px),linear-gradient(to_bottom,#0891b212_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Glossy top edge highlight */}
        <div
          className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-900/40 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            DEFENSE & INDUSTRIAL AI COLLABORATION
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Ready to Build Sovereign{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              AI & Robotic Systems?
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            Partner with <strong className="text-white">Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR)</strong> — dedicated deep-tech sister enterprise to <strong className="text-white">Sri Saraswathi Artificial Intelligence and Robotics Pvt. Ltd.</strong> — to leverage 15+ years of DRDO CAIR defense science, five-bar parallel robotics kinematics, and real-time computer vision for your mission-critical initiatives.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
            <Link
              href="/contact"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm sm:text-base font-bold text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Schedule Technical Consultation</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm sm:text-base font-semibold text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 hover:border-cyan-500/60 transition-all duration-300 backdrop-blur-md"
            >
              <span>Explore All Capabilities</span>
              <span className="text-cyan-400" aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Corporate Trust & Entity Strip */}
          <div className="pt-8 border-t border-zinc-800/80 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-400 font-mono">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Corporate Identity</span>
              <span className="text-zinc-300 font-semibold mt-0.5">CIN: U72100KA2026PTC222434</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Headquarters</span>
              <span className="text-zinc-300 font-semibold mt-0.5">Indiranagar, Bengaluru - 560038</span>
            </div>
            <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px]">R&D Classification</span>
              <span className="text-cyan-300 font-semibold mt-0.5">NIC 7210 (Sciences & Eng.)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Main Homepage for SSAIR (Sri Srinivasa AI Robotics Pvt. Ltd.)
 * Server component that orchestrates sections in exact sequence:
 * 1. HeroSection (with 3D scene)
 * 2. Stats Counter (key numbers)
 * 3. FeaturedServices (6 highlighted services grid)
 * 4. Why Choose Us section (inline, 4 cards with icons)
 * 5. CTA section (inline, call to action with gradient background)
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black flex flex-col">
      {/* 1. HeroSection (with 3D scene) */}
      <HeroSection />

      {/* 2. Stats Counter (key numbers) */}
      <StatsCounter />

      {/* 3. FeaturedServices (6 highlighted services grid) */}
      <FeaturedServices />

      {/* 4. Why Choose Us section (inline, 4 cards with icons) */}
      <WhyChooseUsSection />

      {/* 5. CTA section (inline, call to action with gradient background) */}
      <CTASection />
    </main>
  );
}
