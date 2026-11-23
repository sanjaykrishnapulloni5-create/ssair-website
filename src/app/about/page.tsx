import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "About Us | Sri Srinivasa AI Robotics (SSAIR)",
  description:
    "Discover Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR) — an advanced research and deep-tech robotics enterprise founded by former DRDO CAIR Scientist 'D' and IISc alumnus Dadireddy Srinivasulu Reddy.",
  keywords: [
    "Sri Srinivasa AI Robotics",
    "SSAIR",
    "Dadireddy Srinivasulu Reddy",
    "DRDO CAIR",
    "IISc Bangalore",
    "Robotics India",
    "Defense Robotics",
    "Autonomous Systems",
    "Computer Vision",
    "Artificial Intelligence",
  ],
  openGraph: {
    title: "About Us | Sri Srinivasa AI Robotics (SSAIR)",
    description:
      "Deep-tech innovation in robotics, autonomous systems, and defense technologies founded by defense scientist Dadireddy Srinivasulu Reddy.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-cyan-500 selection:text-black">
      {/* Background subtle glowing accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-indigo-600/10 blur-[130px] rounded-full" />
        <div className="absolute top-[45%] -right-48 w-[500px] h-[500px] bg-cyan-700/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 -left-48 w-[550px] h-[450px] bg-indigo-700/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto space-y-24 sm:space-y-32">
        {/* ========================================================= */}
        {/* SECTION 1: HERO BANNER                                    */}
        {/* ========================================================= */}
        <AnimatedSection className="w-full flex flex-col items-center text-center max-w-4xl pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs sm:text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Pioneering Sovereign Deep-Tech & Defense Robotics
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              SSAIR
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-3xl mb-8">
            <strong className="text-white font-semibold">
              Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR)
            </strong>{" "}
            is a premier deep-tech research and experimental engineering enterprise
            dedicated to pushing the boundaries of artificial intelligence, high-precision
            robotics, and mission-critical autonomous systems. Founded by a veteran
            defense scientist from CAIR (DRDO) and alumnus of the Indian Institute of Science
            (IISc), SSAIR transforms frontier scientific research into sovereign,
            resilient engineering solutions.
          </p>

          {/* Key Metric Highlights Badge Strip */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 text-left">
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono block">
                Statutory ID
              </span>
              <span className="text-xs sm:text-sm font-semibold text-cyan-400 font-mono break-all">
                U72100KA2026PTC222434
              </span>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono block">
                Core Domain
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                NIC 7210: Sciences & Engg R&D
              </span>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono block">
                Heritage
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                15+ Yrs DRDO CAIR R&D
              </span>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono block">
                Headquarters
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                Bengaluru, Karnataka
              </span>
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* SECTION 2: COMPANY OVERVIEW (Vision, Mission, Values)     */}
        {/* ========================================================= */}
        <AnimatedSection className="w-full space-y-12" id="overview">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Strategic Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Vision, Mission & Core Values
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Engineered on a foundation of scientific discipline, sovereign capability, and
              uncompromising technical rigor.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Vision */}
            <div className="group relative p-8 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 hover:border-cyan-500/50 transition-all duration-300 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                To establish SSAIR as an international epicenter for autonomous systems,
                cognitive robotics, and resilient cyber-physical intelligence — spearheading
                breakthroughs that empower nation-building, defense independence, and
                advanced scientific frontiers.
              </p>
            </div>

            {/* Mission */}
            <div className="group relative p-8 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 hover:border-blue-500/50 transition-all duration-300 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Bridging pure theoretical computer science with robust mechanical and
                electronic engineering. We research, design, and validate real-time intelligent
                robotics, computer vision algorithms, and embedded avionics capable of
                fault-tolerant execution in mission-critical environments.
              </p>
            </div>

            {/* Values */}
            <div className="group relative p-8 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 hover:border-indigo-500/50 transition-all duration-300 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Values</h3>
              <ul className="text-zinc-300 text-sm space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>
                    <strong className="text-white">Scientific Rigor:</strong> IISc-grade academic
                    depth combined with defense R&D discipline.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>
                    <strong className="text-white">Indigenous Sovereignty:</strong> Dedicated to
                    self-reliant engineering & strategic autonomy.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>
                    <strong className="text-white">Failsafe Reliability:</strong> Zero-tolerance
                    for failure in real-time embedded robotic control.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Corporate Details & Statutory Identity Box */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-800 pb-6 mb-6">
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block" />
                  Corporate & Statutory Registration
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Officially incorporated under the Companies Act, 2013 (Ministry of Corporate Affairs, Govt. of India).
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="px-3 py-1 text-xs font-mono rounded-lg bg-zinc-800/80 text-zinc-200 border border-zinc-700/60">
                  ROC: Bangalore, Karnataka
                </span>
                <span className="px-3 py-1 text-xs font-mono rounded-lg bg-zinc-800/80 text-zinc-200 border border-zinc-700/60">
                  Incorporated: June 17, 2026
                </span>
                <span className="px-3 py-1 text-xs font-mono rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-700/60">
                  NIC: 7210 (Natural Sciences & Engg)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <div className="text-zinc-500 font-medium">Corporate Identity Number (CIN)</div>
                <div className="font-mono font-semibold text-cyan-400 break-all">
                  U72100KA2026PTC222434
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-zinc-500 font-medium">Capital Structure</div>
                <div className="text-zinc-200">
                  <span className="font-semibold text-white">Auth: ₹10,00,000</span> (₹10 Lakhs)
                  <br />
                  <span className="font-semibold text-white">Paid-up: ₹1,00,000</span> (₹1 Lakh)
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-zinc-500 font-medium">Board of Directors</div>
                <div className="text-zinc-200 leading-snug">
                  <span className="text-white font-medium">Dadireddy Srinivasulu Reddy</span> (Founder & Director)
                  <br />
                  <span className="text-white font-medium">Anusha Nagella</span> (Whole-time Director)
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-zinc-500 font-medium">Registered Address</div>
                <div className="text-zinc-300 leading-snug text-xs">
                  No. 198, CMH Road, 2nd Floor, Desk No. 324, Indiranagar, Bengaluru, Karnataka - 560038
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* SECTION 3: FOUNDER PROFILE                                */}
        {/* ========================================================= */}
        <AnimatedSection className="w-full space-y-10" id="founder">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Scientific Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Founder Profile
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Decades of defense research experience and academic distinction powering
              next-generation autonomous robotics.
            </p>
          </div>

          {/* Main Founder Card */}
          <div className="relative rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 via-zinc-950/95 to-black p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
            {/* Ambient background glow inside card */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Left Column: Avatar & Quick Info */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-72 shrink-0">
                {/* Photo Placeholder replaced with Actual Founder Photo */}
                <div className="relative mb-6">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-700 p-1 shadow-2xl shadow-cyan-950/60 ring-2 ring-cyan-400/30">
                    <div className="w-full h-full rounded-[14px] bg-zinc-950 relative overflow-hidden group">
                      <img
                        src="/images/founder.jpg"
                        alt="Dr. Dadireddy Srinivasulu Reddy - Founder & Director"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  {/* DRDO Best Team badge floating */}
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-lg border border-amber-300/40 flex items-center gap-1 z-10">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Awardee
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  Dadireddy Srinivasulu Reddy
                </h3>
                <p className="text-cyan-400 font-medium text-sm mt-1">
                  Founder & Director
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Sri Srinivasa AI Robotics Pvt. Ltd.
                </p>

                {/* Co-Director Info */}
                <div className="mt-4 pt-4 border-t border-zinc-800/80 w-full text-xs text-zinc-400">
                  <span className="text-zinc-500 block text-[11px] uppercase tracking-wider">
                    Co-Director
                  </span>
                  <span className="text-zinc-200 font-semibold">Anusha Nagella</span>
                  <span className="text-zinc-400 block text-[11px]">
                    Whole-time Director
                  </span>
                </div>

                {/* Languages */}
                <div className="mt-4 w-full">
                  <span className="text-zinc-500 text-[11px] uppercase tracking-wider block mb-1.5">
                    Languages
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                    {["English", "Telugu", "Hindi"].map((lang) => (
                      <span
                        key={lang}
                        className="text-xs px-2.5 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/60"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Credentials, Experience, Awards & Skills */}
              <div className="flex-1 space-y-8 w-full">
                {/* Summary Intro */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 leading-relaxed text-sm text-zinc-300">
                  <p>
                    Dadireddy Srinivasulu Reddy brings over{" "}
                    <strong className="text-white font-semibold">
                      15+ years of defense R&D leadership
                    </strong>{" "}
                    as a former <strong className="text-cyan-300 font-medium">Scientist 'D'</strong> at the{" "}
                    <strong className="text-white">
                      Centre for Artificial Intelligence and Robotics (CAIR), DRDO Bengaluru
                    </strong>
                    . Coupled with{" "}
                    <strong className="text-white font-semibold">
                      4 years of university-level teaching
                    </strong>{" "}
                    as an Assistant Professor, he spearheads SSAIR’s research and experimental
                    development in defense robotics, autonomous flight control, and intelligent
                    embedded systems.
                  </p>
                </div>

                {/* Education & Experience Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Education */}
                  <div className="space-y-4 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/90">
                    <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                      Education
                    </h4>
                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="border-l-2 border-cyan-500 pl-3">
                        <div className="font-semibold text-white">
                          Master of Engineering (M.E.)
                        </div>
                        <div className="text-cyan-300 text-xs">
                          Computer Science & Automation
                        </div>
                        <div className="text-zinc-400 text-xs font-medium">
                          Indian Institute of Science (IISc), Bangalore
                        </div>
                      </div>
                      <div className="border-l-2 border-blue-500 pl-3">
                        <div className="font-semibold text-white">
                          Bachelor of Technology (B.Tech)
                        </div>
                        <div className="text-blue-300 text-xs">
                          Computer Science & Engineering
                        </div>
                        <div className="text-zinc-400 text-xs">
                          Sri Venkateswara University (SVU)
                        </div>
                        <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 font-medium">
                          First Class with Distinction
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-4 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/90">
                    <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Professional Experience
                    </h4>
                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="border-l-2 border-cyan-500 pl-3">
                        <div className="font-semibold text-white">
                          Scientist 'D' (15+ Years Defense R&D)
                        </div>
                        <div className="text-cyan-300 text-xs">
                          CAIR — Centre for Artificial Intelligence and Robotics
                        </div>
                        <div className="text-zinc-400 text-xs">
                          DRDO, Ministry of Defence, Bengaluru
                        </div>
                      </div>
                      <div className="border-l-2 border-indigo-500 pl-3">
                        <div className="font-semibold text-white">
                          Assistant Professor (4 Years)
                        </div>
                        <div className="text-indigo-300 text-xs">
                          Teaching & Advanced Computing Research
                        </div>
                        <div className="text-zinc-400 text-xs">
                          Higher Technical Education & University Academics
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DRDO Best Team Award Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-zinc-900/70 to-zinc-900/40 border border-amber-500/30 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wide">
                      DRDO Best Team Award Recipient
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                      Conferred the prestigious DRDO Best Team Award for pioneering contributions,
                      rigorous technical execution, and team excellence in mission-critical
                      national defense and robotics applications.
                    </p>
                  </div>
                </div>

                {/* Key Skills & Expertise Areas */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Core Technical Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Artificial Intelligence",
                      "Robotics",
                      "Missile Technology",
                      "Fighter Aircraft Systems",
                      "Computer Vision",
                      "Embedded Systems",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800/90 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* DRDO Key Projects Highlight */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Key DRDO CAIR Projects
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">
                        01. MECHANISMS & CONTROL
                      </div>
                      <div className="font-semibold text-white text-sm">
                        Industrial Robot (Five-Bar Mechanism)
                      </div>
                      <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                        End-to-end mathematical and dynamic modeling: kinematics, inverse dynamics,
                        precision motor selection & torque analysis, and singularity boundary
                        analysis for high-speed industrial manipulation.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">
                        02. INTELLIGENT VISION
                      </div>
                      <div className="font-semibold text-white text-sm">
                        Object Detection & Classification using YOLOv3
                      </div>
                      <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                        Real-time tactical detection and multi-class target classification using
                        COCO dataset categories, optimized with OpenCV DNN backend for high-frame-rate
                        embedded defense platforms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* SECTION 4: TIMELINE (Company Milestones)                   */}
        {/* ========================================================= */}
        <AnimatedSection className="w-full space-y-12" id="milestones">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Company Milestones & Evolution
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              From initial defense research translation to sovereign deep-tech enterprise scale.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Center vertical timeline bar */}
            <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-600 hidden sm:block" />

            <div className="space-y-12">
              {/* Milestone 1: 2022 - Main Flagship Enterprise */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center group">
                <div className="w-full sm:w-1/2 sm:pr-10 text-left sm:text-right">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-950/80 text-blue-300 border border-blue-800/60 mb-2">
                    Established 2022 • Main Company
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Sri Saraswathi Artificial Intelligence and Robotics
                  </h3>
                  <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                    Incorporation of the flagship parent company{" "}
                    <strong className="text-white">
                      Sri Saraswathi Artificial Intelligence and Robotics Pvt. Ltd.
                    </strong>{" "}
                    (est. 2022), spearheading core research, large-scale industrial automation,
                    and intelligent enterprise cybernetics across India.
                  </p>
                </div>

                {/* Timeline node */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-zinc-950 border-2 border-blue-400 items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-125 transition-transform z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                </div>

                <div className="w-full sm:w-1/2 sm:pl-10 mt-4 sm:mt-0">
                  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-300 space-y-1">
                    <div className="font-semibold text-cyan-300">Flagship Parent Enterprise</div>
                    <div>
                      Pioneered applied AI architectures, mechatronics testing, and proprietary
                      computational foundations that power the entire ecosystem.
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone 2: 2026 - Sister Company & Deep-Tech R&D Arm */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center group">
                <div className="w-full sm:w-1/2 sm:pr-10 text-left sm:text-right order-2 sm:order-1 mt-4 sm:mt-0">
                  <div className="p-4 rounded-xl border border-cyan-800/60 bg-cyan-950/20 text-xs text-zinc-300 space-y-1">
                    <div className="font-semibold text-cyan-300">Sister Company & Dedicated R&D Wing</div>
                    <div>
                      Formed as the specialized sovereign defense and natural sciences research arm
                      (NIC 7210) working in synergy with parent company Sri Saraswathi AI & Robotics.
                    </div>
                  </div>
                </div>

                {/* Timeline node */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-zinc-950 border-2 border-cyan-400 items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:scale-125 transition-transform z-10 order-1 sm:order-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                </div>

                <div className="w-full sm:w-1/2 sm:pl-10 text-left order-1 sm:order-3">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 mb-2">
                    June 17, 2026 • Sister Company
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Incorporation of SSAIR
                  </h3>
                  <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                    Formal incorporation of sister enterprise{" "}
                    <strong className="text-white">
                      Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR)
                    </strong>{" "}
                    in Bengaluru (CIN: U72100KA2026PTC222434) to advance sovereign defense
                    robotics, parallel kinematics (five-bar mechanisms), and real-time AI vision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* SECTION 5: CTA (Join Us / Contact Section)                */}
        {/* ========================================================= */}
        <AnimatedSection className="w-full" id="contact">
          <div className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-zinc-900 via-zinc-950 to-blue-950/40 p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl">
            {/* Top decorative gradient glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="inline-block text-xs uppercase tracking-widest font-mono text-cyan-400 font-semibold px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60">
                Collaborate & Innovate
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Partner with{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  SSAIR
                </span>
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                Whether you are seeking strategic R&D collaboration in defense robotics,
                advanced vision solutions, or looking to join our elite team of scientists and
                engineers, we invite you to connect with our laboratory in Bengaluru.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110 transition-all duration-200"
                >
                  <span>Contact Our R&D Lab</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>

                <a
                  href="mailto:srinivasulureddydadireddy@gmail.com"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:text-white hover:bg-zinc-800/90 font-medium text-sm transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>srinivasulureddydadireddy@gmail.com</span>
                </a>

                <a
                  href="tel:+919848126456"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:text-white hover:bg-zinc-800/90 font-medium text-sm transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+91 98481 26456</span>
                </a>
              </div>

              {/* Location Card Footer */}
              <div className="pt-8 mt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-cyan-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    No. 198, CMH Road, 2nd Floor, Desk No. 324, Indiranagar, Bengaluru, Karnataka - 560038
                  </span>
                </div>
                <div className="font-mono text-zinc-500">
                  CIN: U72100KA2026PTC222434
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
