import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SpotlightCard from "@/components/ui/SpotlightCard";

export const metadata: Metadata = {
  title: "About Us | Sri Srinivasa AI Robotics (SSAIR)",
  description:
    "Discover Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR) — founded by former DRDO CAIR Scientist 'D' and IISc alumnus Dr. Dadireddy Srinivasulu Reddy.",
};

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[820px] h-[440px] pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(6, 182, 212, 0.16), transparent)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-24">
        {/* SECTION 1: HERO BANNER + STATUTORY METRICS */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sky-700 dark:text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Pioneering Sovereign Deep-Tech &amp; Defense Robotics
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              SSAIR
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            <strong className="text-slate-900 dark:text-white font-semibold">
              Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR)
            </strong>{" "}
            is an advanced research and experimental engineering enterprise founded by a veteran defense scientist from CAIR (DRDO) and alumnus of the Indian Institute of Science (IISc). We bridge theoretical computer science and defense robotics into sovereign, real-world autonomous systems and practical research fellowships.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-left">
            <SpotlightCard className="p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                Statutory ID
              </span>
              <span className="text-xs sm:text-sm font-bold text-sky-700 dark:text-cyan-400 font-mono break-all mt-1 block">
                U72100KA2026PTC222434
              </span>
            </SpotlightCard>
            <SpotlightCard className="p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                Core Domain
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1 block">
                NIC 7210: Sciences &amp; Engg R&amp;D
              </span>
            </SpotlightCard>
            <SpotlightCard className="p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                Heritage
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1 block">
                15+ Yrs DRDO CAIR R&amp;D
              </span>
            </SpotlightCard>
            <SpotlightCard className="p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                Headquarters
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1 block">
                Indiranagar, Bengaluru
              </span>
            </SpotlightCard>
          </div>
        </section>

        {/* SECTION 2: FOUNDER FULL CREDENTIALS PROFILE */}
        <section id="founder" className="space-y-8 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
              Scientific Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Founder Profile
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Decades of DRDO defense research experience and IISc academic distinction powering autonomous robotics.
            </p>
          </div>

          <SpotlightCard className="p-7 sm:p-11 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
            {/* Left Portrait Column */}
            <div className="w-full lg:w-68 shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative">
                <div className="w-48 h-60 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl bg-slate-900 relative">
                  <Image
                    src="/images/founder.jpg"
                    alt="Dr. Dadireddy Srinivasulu Reddy - Founder & Director"
                    fill
                    sizes="192px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[11px] font-extrabold px-3.5 py-1 rounded-full shadow-md">
                  <span>★</span> DRDO Best Team Awardee
                </div>
              </div>

              <div className="mt-5 space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Dr. Dadireddy Srinivasulu Reddy
                </h3>
                <p className="text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400">
                  Founder &amp; Director · SSAIR
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 w-full space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider block text-[10px] font-mono">
                    Co-Director
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white block">Anusha Nagella</span>
                  <span className="text-slate-500 dark:text-slate-400">Whole-time Director</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider block text-[10px] font-mono mb-1.5">
                    Languages
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                    {["English", "Telugu", "Hindi"].map((lang) => (
                      <span
                        key={lang}
                        className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Detailed Credentials Column */}
            <div className="flex-1 space-y-6 w-full">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Dr. Dadireddy Srinivasulu Reddy brings over{" "}
                <strong className="text-slate-900 dark:text-white">15+ years of defense R&amp;D leadership</strong> as a former{" "}
                <strong className="text-sky-700 dark:text-cyan-300">Scientist &apos;D&apos;</strong> at the{" "}
                <strong className="text-slate-900 dark:text-white">Centre for Artificial Intelligence and Robotics (CAIR), DRDO Bengaluru</strong>. Coupled with{" "}
                <strong className="text-slate-900 dark:text-white">4 years of university-level teaching</strong> as an Assistant Professor, he leads SSAIR&apos;s experimental development in defense robotics, autonomous flight control, and intelligent embedded systems.
              </div>

              {/* Education & Professional Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-cyan-400">
                    Education
                  </h4>
                  <div className="border-l-2 border-cyan-500 pl-3">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      Master of Engineering (M.E.)
                    </div>
                    <div className="text-xs text-sky-600 dark:text-cyan-300">
                      Computer Science &amp; Automation
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Indian Institute of Science (IISc), Bangalore
                    </div>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-3">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      Bachelor of Technology (B.Tech)
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-300">
                      Computer Science &amp; Engineering
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Sri Venkateswara University (SVU)
                    </div>
                    <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold">
                      First Class with Distinction
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-cyan-400">
                    Professional Experience
                  </h4>
                  <div className="border-l-2 border-cyan-500 pl-3">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      Scientist &apos;D&apos; (15+ Years Defense R&amp;D)
                    </div>
                    <div className="text-xs text-sky-600 dark:text-cyan-300">
                      CAIR — Centre for Artificial Intelligence and Robotics
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      DRDO, Ministry of Defence, Bengaluru
                    </div>
                  </div>
                  <div className="border-l-2 border-indigo-500 pl-3">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      Assistant Professor (4 Years)
                    </div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-300">
                      Teaching &amp; Advanced Computing Research
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Higher Technical Education &amp; University Academics
                    </div>
                  </div>
                </div>
              </div>

              {/* DRDO Best Team Award Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-500 flex items-center justify-center shrink-0 font-bold">
                  ★
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                    DRDO Best Team Award Recipient
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                    Conferred the prestigious DRDO Best Team Award for pioneering contributions, rigorous technical execution, and team excellence in mission-critical national defense and robotics applications.
                  </p>
                </div>
              </div>

              {/* Technical Expertise Tags */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
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
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key DRDO CAIR Projects */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Key DRDO CAIR Projects
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10">
                    <div className="text-[11px] font-mono text-sky-600 dark:text-cyan-400 font-bold mb-1">
                      01. MECHANISMS &amp; CONTROL
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      Industrial Robot (Five-Bar Mechanism)
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      End-to-end mathematical and dynamic modeling: kinematics, inverse dynamics, precision motor selection &amp; torque analysis, and singularity boundary analysis for high-speed manipulation.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10">
                    <div className="text-[11px] font-mono text-sky-600 dark:text-cyan-400 font-bold mb-1">
                      02. INTELLIGENT VISION
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      Object Detection &amp; Classification using YOLOv3
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      Real-time tactical detection and multi-class target classification across COCO categories, optimized with OpenCV DNN backend for embedded defense platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </section>

        {/* SECTION 3: STRATEGIC FOUNDATION (VISION, MISSION, VALUES) */}
        <section id="overview" className="space-y-10 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
              Strategic Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Vision, Mission &amp; Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard className="p-7 space-y-3">
              <div className="text-xs font-mono font-bold text-sky-600 dark:text-cyan-400 uppercase">01 · Vision</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                To establish SSAIR as an international epicenter for autonomous systems, cognitive robotics, and resilient cyber-physical intelligence—empowering national defense independence and engineering talent.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-7 space-y-3">
              <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">02 · Mission</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Bridging theoretical computer science with rugged mechanical and electronic engineering—validating fault-tolerant real-time robotics, avionics, and edge computer vision.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-7 space-y-3">
              <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">03 · Core Values</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Values</h3>
              <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                <li><strong className="text-slate-900 dark:text-white">Scientific Rigor:</strong> IISc academic depth + defense R&amp;D discipline.</li>
                <li><strong className="text-slate-900 dark:text-white">Indigenous Sovereignty:</strong> Self-reliant engineering IP.</li>
                <li><strong className="text-slate-900 dark:text-white">Failsafe Reliability:</strong> Deterministic embedded control.</li>
              </ul>
            </SpotlightCard>
          </div>
        </section>

        {/* SECTION 4: CORPORATE STRUCTURE, STATUTORY REGISTRATION & MILESTONES */}
        <section id="milestones" className="space-y-8 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
              Evolution &amp; Compliance
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Corporate Structure &amp; Registration
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Incorporated under the Companies Act, 2013 (Ministry of Corporate Affairs, Govt. of India).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpotlightCard className="p-7 space-y-2.5">
              <span className="inline-block text-xs font-mono font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                MAIN COMPANY · EST. 2022
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-1">
                Sri Saraswathi Artificial Intelligence and Robotics Pvt. Ltd.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Flagship parent enterprise established in 2022 driving foundational AI algorithms, machine learning models, and enterprise industrial cybernetics across India.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-7 space-y-2.5">
              <span className="inline-block text-xs font-mono font-semibold px-3 py-1 rounded-full bg-cyan-500/15 text-sky-700 dark:text-cyan-300 border border-cyan-500/25">
                SISTER COMPANY · INC. JUNE 17, 2026
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-1">
                Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Specialized deep-tech defense robotics, five-bar kinematics, and natural sciences R&amp;D wing (NIC 7210) headquartered in Bengaluru.
              </p>
            </SpotlightCard>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/75 border border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs shadow-sm">
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-mono block">CIN (Incorporated June 17, 2026)</span>
              <span className="font-mono font-bold text-slate-900 dark:text-cyan-300 break-all mt-1 block">
                U72100KA2026PTC222434
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-mono block">Capital Structure (ROC Bengaluru)</span>
              <span className="font-semibold text-slate-900 dark:text-white mt-1 block">
                Auth: ₹10,00,000 · Paid-up: ₹1,00,000
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-mono block">Board of Directors</span>
              <span className="font-semibold text-slate-900 dark:text-white mt-1 block leading-snug">
                Dr. Dadireddy Srinivasulu Reddy (Founder) &amp; Anusha Nagella (Whole-time Director)
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-mono block">Registered HQ</span>
              <span className="text-slate-700 dark:text-slate-300 mt-1 block leading-snug">
                No. 198, CMH Road, 2nd Floor, Desk No. 324, Indiranagar, Bengaluru - 560038
              </span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 transition-all text-sm"
          >
            Connect With Our Leadership →
          </Link>
          <Link
            href="/academy"
            className="inline-flex px-8 py-3.5 rounded-full font-semibold border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white hover:border-cyan-400 transition-all text-sm"
          >
            Explore SSAIR Academy
          </Link>
        </div>
      </div>
    </div>
  );
}
