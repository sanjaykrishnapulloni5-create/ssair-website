import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Sri Srinivasa AI Robotics (SSAIR)",
  description:
    "Learn about Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR), an advanced deep-tech engineering enterprise founded by former DRDO CAIR Scientist 'D' and IISc alumnus Dr. Dadireddy Srinivasulu Reddy.",
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            About SSAIR
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            Engineering Indigenous Deep-Tech &amp; Robotics
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
            <strong className="text-slate-900 dark:text-white font-semibold">
              Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR)
            </strong>{" "}
            is a dedicated deep-tech research and experimental engineering company. Founded by a veteran defense scientist from CAIR (DRDO) and alumnus of the Indian Institute of Science (IISc), we build sovereign, robust autonomous robotics and AI vision systems.
          </p>
        </div>

        {/* Founder Section */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Photo */}
          <div className="shrink-0 text-center">
            <div className="w-48 h-56 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-md">
              <img
                src="/images/founder.jpg"
                alt="Dr. Dadireddy Srinivasulu Reddy"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-sm">
              DRDO Best Team Awardee
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 flex-1">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Dr. Dadireddy Srinivasulu Reddy
              </h2>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Founder &amp; Director — Sri Srinivasa AI Robotics Pvt. Ltd.
              </p>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Dr. Dadireddy Srinivasulu Reddy brings over <strong>15+ years of defense science and R&amp;D experience</strong> as a former <strong>Scientist &apos;D&apos;</strong> at the Centre for Artificial Intelligence and Robotics (CAIR), DRDO Bengaluru. He has also dedicated 4 years to university-level academic research and teaching as an Assistant Professor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase">
                  Education &amp; Research
                </div>
                <div className="font-semibold text-sm text-slate-900 dark:text-white mt-1">
                  M.E. (Computer Science &amp; Automation)
                </div>
                <div className="text-xs text-slate-500">
                  Indian Institute of Science (IISc), Bangalore
                </div>
                <div className="font-semibold text-sm text-slate-900 dark:text-white mt-2">
                  B.Tech (CSE, First Class Distinction)
                </div>
                <div className="text-xs text-slate-500">
                  Sri Venkateswara University (SVU)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase">
                  Defense Expertise
                </div>
                <div className="font-semibold text-sm text-slate-900 dark:text-white mt-1">
                  Scientist &apos;D&apos; (15+ Years)
                </div>
                <div className="text-xs text-slate-500">
                  CAIR, DRDO, Ministry of Defence
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Pioneered industrial 5-bar robotic kinematic models, precision torque analysis, and tactical YOLO computer vision algorithms.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Ecosystem & Statutory Details */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Corporate Structure &amp; Registration
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Officially incorporated under the Companies Act, 2013 (Ministry of Corporate Affairs, Govt. of India).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Company */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                MAIN COMPANY (EST. 2022)
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-1">
                Sri Saraswathi Artificial Intelligence and Robotics Pvt. Ltd.
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Incorporated in 2022 as the flagship organization driving fundamental AI algorithms, machine learning models, and large-scale industrial cybernetics across India.
              </p>
            </div>

            {/* Sister Company */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                SISTER COMPANY (EST. 2026)
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-1">
                Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Incorporated on June 17, 2026 as the specialized deep-tech defense robotics and natural sciences research arm (NIC 7210) headquartered in Bengaluru.
              </p>
            </div>
          </div>

          {/* Statutory Grid */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-500 font-medium block">CIN</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white break-all">
                U72100KA2026PTC222434
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">ROC</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                Bangalore, Karnataka
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Authorized Capital</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                ₹10,00,000 (₹10 Lakhs)
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Board Members</span>
              <span className="font-semibold text-slate-900 dark:text-white leading-tight block">
                Dr. Dadireddy Srinivasulu Reddy &amp; Anusha Nagella
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/contact"
            className="inline-flex px-8 py-3.5 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all text-sm"
          >
            Connect With Our Leadership
          </Link>
        </div>
      </div>
    </div>
  );
}
