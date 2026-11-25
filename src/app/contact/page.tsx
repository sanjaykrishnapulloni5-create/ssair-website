import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import SpotlightCard from "@/components/ui/SpotlightCard";

export const metadata: Metadata = {
  title: "Contact Us | Sri Srinivasa AI Robotics (SSAIR)",
  description:
    "Get in touch with Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR) for defense robotics inquiries, AI computer vision partnerships, industrial automation, and R&D academy programs.",
};

export default function ContactPage() {
  return (
    <div className="relative w-full min-h-screen bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[780px] h-[360px] pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(6, 182, 212, 0.14), transparent)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-14">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-sky-700 dark:text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-3">
            Contact Our Engineering Lab
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            Have questions about defense drones, collaborative robotics, computer vision R&amp;D, or academic workshops? Connect directly with our Bengaluru team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <SpotlightCard className="p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Direct Contact Details
              </h2>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-sky-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/25">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-semibold uppercase tracking-wider block">
                    Phone Number
                  </span>
                  <a
                    href="tel:+919848126456"
                    className="text-base font-bold text-slate-900 dark:text-white hover:text-cyan-400 transition-colors"
                  >
                    +91 98481 26456
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Monday to Saturday, 9:00 AM – 6:30 PM IST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-200/80 dark:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-sky-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/25">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-semibold uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <a
                    href="mailto:srinivasulureddydadireddy@gmail.com"
                    className="text-sm font-bold text-slate-900 dark:text-white hover:text-cyan-400 transition-colors break-all"
                  >
                    srinivasulureddydadireddy@gmail.com
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We reply promptly to inquiries and proposals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-200/80 dark:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-sky-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/25">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-semibold uppercase tracking-wider block">
                    Bengaluru R&amp;D Headquarters
                  </span>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mt-0.5 leading-snug">
                    No. 198, CMH Road, 2nd Floor,
                    <br />
                    Desk No. 324, Indiranagar,
                    <br />
                    Bengaluru, Karnataka - 560038
                  </p>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <div className="font-mono font-semibold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
                Corporate Entity Details
              </div>
              <p>
                <strong className="text-slate-900 dark:text-slate-200">Main Company:</strong> Sri Saraswathi Artificial Intelligence and Robotics Pvt. Ltd. (Est. 2022)
              </p>
              <p>
                <strong className="text-slate-900 dark:text-slate-200">Sister Company:</strong> Sri Srinivasa AI Robotics Pvt. Ltd. (Est. 2026, CIN: U72100KA2026PTC222434)
              </p>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </div>
  );
}
