import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";

export const metadata: Metadata = {
  title: "Sri Srinivasa AI Robotics (SSAIR) | Autonomous Systems & AI",
  description:
    "Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR) is a premier Indian deep-tech enterprise pioneering autonomous robotics, defense systems, and computer vision. Sister company of Sri Saraswathi AI & Robotics.",
  keywords: [
    "Sri Srinivasa AI Robotics",
    "SSAIR",
    "Sri Saraswathi Artificial Intelligence and Robotics",
    "Dadireddy Srinivasulu Reddy",
    "DRDO CAIR",
    "IISc Bangalore",
    "Robotics India",
    "Autonomous Drones",
    "Industrial Robotics",
  ],
};

/**
 * 1. Innovation Bento Grid Section
 * Modern Apple / Linear style asymmetric layout showcasing core technology pillars.
 */
function InnovationBentoSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#090d16] text-white border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Core Technology Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Engineered for High-Consequence Missions
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            From autonomous defense drones to high-precision industrial robotics, we build systems that perform flawlessly in the most demanding environments.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Autonomous Defense Drones (Span 2) */}
          <div className="lg:col-span-2 group relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col md:flex-row justify-between">
            <div className="p-8 sm:p-10 flex flex-col justify-between max-w-md z-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Defense Autonomy
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-3">
                  Autonomous Tactical Drones
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  Long-endurance aerial reconnaissance engineered for GPS-denied zones, equipped with real-time thermal scanning and AI target classification.
                </p>
              </div>
              <div>
                <Link
                  href="/products#aegis-uav"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
                >
                  <span>Explore Aegis Drone System</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img
                src="/images/products/aegis-uav.jpg"
                alt="Aegis Tactical Drone"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Card 2: Industrial Robotics */}
          <div className="group relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between">
            <div className="p-7">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Manufacturing
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 mb-2">
                6-Axis Collaborative Arms
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Sub-millimeter precision robotics for automated welding, assembly lines, and human-robot shop floor collaboration.
              </p>
            </div>
            <div className="relative h-48 overflow-hidden">
              <img
                src="/images/products/titanarm-cobot.jpg"
                alt="TitanArm Cobot"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Card 3: Autonomous Mobile Tuggers */}
          <div className="group relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between">
            <div className="p-7">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Intralogistics
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 mb-2">
                Heavy-Payload AMRs
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Autonomous mobile robots moving up to 1,500 kg loads dynamically without physical magnetic floor tracks.
              </p>
            </div>
            <div className="relative h-48 overflow-hidden">
              <img
                src="/images/products/nexus-amr.jpg"
                alt="Nexus AMR"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Card 4: AI Computer Vision & Inspection (Span 2) */}
          <div className="lg:col-span-2 group relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col md:flex-row justify-between">
            <div className="p-8 sm:p-10 flex flex-col justify-between max-w-md z-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Real-Time AI Vision
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-3">
                  High-Speed Visual Quality Inspection
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  Industrial camera arrays powered by custom neural networks, detecting microscopic defects at over 600 components per minute.
                </p>
              </div>
              <div>
                <Link
                  href="/services#computer-vision"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors"
                >
                  <span>Learn About AI Vision Systems</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img
                src="/images/products/visionsort-ai.jpg"
                alt="VisionSort AI"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/**
 * 2. Two-Company Strategic Synergy Section
 * Highlights the clear relationship between the Main Company and the Sister R&D Arm.
 */
function CorporateSynergySection() {
  return (
    <section className="relative w-full py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#070b14] text-white border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Corporate Hierarchy &amp; Synergy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
              Two Companies, One Unified Mission
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              We operate as a dual-entity ecosystem combining foundational artificial intelligence research with advanced hardware manufacturing and defense robotics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Main Company Card */}
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-300 text-xs font-semibold mb-4">
                  ★ Main / Flagship Company (Est. 2022)
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Sri Saraswathi Artificial Intelligence &amp; Robotics Pvt. Ltd.
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Our parent enterprise leads core software innovation, machine learning models, cloud control software, and enterprise AI architectures.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-4">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Enterprise Machine Learning &amp; AI
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Fleet Management Operating Systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Cloud Robotics Analytics &amp; IoT
                </li>
              </ul>
            </div>

            {/* Sister Company Card */}
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-cyan-500/30 flex flex-col justify-between shadow-lg shadow-cyan-950/30">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-semibold mb-4">
                  🚀 Dedicated Sister Company (Est. 2026)
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR)
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Our advanced R&amp;D engineering wing dedicated to sovereign defense hardware, autonomous drones, 6-axis robotic arms, and military-grade sensor fusion.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-4">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Autonomous Defense UAVs &amp; Ground Vehicles
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Collaborative Industrial Manipulators
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Sovereign Indian Defense Technologies
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 3. Founder Spotlight (Editorial Magazine Layout)
 */
function FounderSpotlightSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#090d16] text-white border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (5 cols): Founder Portrait Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              <div className="w-72 sm:w-80 h-96 rounded-3xl p-1 bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-700 shadow-2xl shadow-cyan-950/50">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-950 relative">
                  <img
                    src="/images/founder.jpg"
                    alt="Dr. Dadireddy Srinivasulu Reddy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Award Badge Floating */}
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase shadow-xl flex items-center gap-2 border border-amber-300/40">
                <span>★</span>
                <span>DRDO Best Team Awardee</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Founder Pedigree & Mission */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              Scientific Leadership
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Dr. Dadireddy Srinivasulu Reddy
            </h2>

            <p className="text-lg font-medium text-cyan-300">
              Founder &amp; Research Director • Ex-Scientist &apos;D&apos; CAIR (DRDO), IISc Alumnus
            </p>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              With more than 15 years of dedicated scientific research at the Centre for Artificial Intelligence and Robotics (CAIR, DRDO) and an M.E. in Computer Science &amp; Automation from the Indian Institute of Science (IISc), Dr. Dadireddy Srinivasulu Reddy leads SSAIR&apos;s mission to engineer sovereign, high-consequence robotics and artificial intelligence solutions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block mb-1">Defense Service</span>
                <span className="text-white font-semibold text-sm">15+ Years CAIR DRDO</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block mb-1">Academic Rigor</span>
                <span className="text-white font-semibold text-sm">M.E. IISc Bangalore</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block mb-1">National Recognition</span>
                <span className="text-amber-400 font-semibold text-sm">DRDO Best Team Award</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about#founder"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-slate-900 border border-slate-700 hover:border-cyan-400 text-sm transition-all"
              >
                <span>Read Full Biography &amp; Publications</span>
                <span>→</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/**
 * 4. Minimalist Modern Call to Action
 */
function ModernCTASection() {
  return (
    <section className="relative w-full py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#070b14] text-white border-t border-slate-800/80 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Ready to Build the Future of{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
            Robotics &amp; AI?
          </span>
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Reach out to discuss customized defense robotics, industrial automation, or computer vision integrations with our research engineering team.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl font-semibold text-white text-base bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 transition-all"
          >
            <span>Get in Touch</span>
          </Link>

          <Link
            href="/products"
            className="px-8 py-3.5 rounded-xl font-semibold text-slate-200 hover:text-white text-base border border-slate-700 bg-slate-900/80 hover:bg-slate-800 transition-all"
          >
            <span>Explore All Products</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Modern Homepage
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white flex flex-col">
      <HeroSection />
      <InnovationBentoSection />
      <CorporateSynergySection />
      <FounderSpotlightSection />
      <ModernCTASection />
    </main>
  );
}
