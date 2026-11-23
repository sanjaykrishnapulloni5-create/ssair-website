"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden font-sans">
      {/* High-tech ambient background glow effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-cyan-600/20 via-blue-600/10 to-transparent blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-[35%] -left-48 w-[400px] h-[400px] bg-blue-600/15 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-[60%] -right-48 w-[450px] h-[450px] bg-indigo-600/15 blur-[140px] rounded-full" />

      {/* Cyber grid background overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 mb-6 shadow-lg shadow-cyan-500/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 -ml-3" />
            SSAIR • SISTER COMPANY OF SRI SARASWATHI AI & ROBOTICS
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Contact{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
              Us
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Connect with our engineering leadership for defence collaborations, advanced robotics R&amp;D, autonomous systems integration, or technical inquiries.
          </p>
        </motion.div>

        {/* Two-Column Responsive Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-20"
        >
          {/* Left Column: Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <ContactForm />
          </motion.div>

          {/* Right Column: Contact Information Cards & Map */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
            {/* Headquarters Card */}
            <div className="rounded-3xl p-6 sm:p-7 bg-zinc-950/70 border border-zinc-800/80 shadow-xl backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                    Corporate Headquarters
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-0.5">
                    Office Address
                  </h3>
                  <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                    No. 198, CMH Road, 2nd Floor, Desk No. 324,
                    <br />
                    Indiranagar, Bengaluru,
                    <br />
                    Karnataka - 560038, India
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href="https://maps.google.com/?q=No.+198,+CMH+Road,+Indiranagar,+Bengaluru,+Karnataka+560038"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>Open in Google Maps</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Communications Card */}
            <div className="rounded-3xl p-6 sm:p-7 bg-zinc-950/70 border border-zinc-800/80 shadow-xl backdrop-blur-xl hover:border-blue-500/40 transition-all duration-300 space-y-5">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Email Us Directly
                  </span>
                  <div className="mt-0.5">
                    <a
                      href="mailto:srinivasulureddydadireddy@gmail.com"
                      className="text-base font-semibold text-white hover:text-cyan-400 transition-colors break-all"
                    >
                      srinivasulureddydadireddy@gmail.com
                    </a>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    We reply promptly to inquiries and project proposals.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 pt-4 border-t border-zinc-900">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Call Us
                  </span>
                  <div className="mt-0.5">
                    <a
                      href="tel:+919848126456"
                      className="text-base font-semibold text-white hover:text-emerald-400 transition-colors"
                    >
                      +91 98481 26456
                    </a>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Available during business hours (Mon – Sat)
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-zinc-900">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-violet-400">
                    Operating Schedule
                  </span>
                  <h4 className="text-base font-semibold text-white mt-0.5">
                    Mon - Fri: 9:00 AM - 6:00 PM IST
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Saturday &amp; Sunday: Closed (Special defence emergency R&amp;D support on call)
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder Card */}
            <div className="relative rounded-3xl overflow-hidden bg-zinc-950/70 border border-zinc-800/80 shadow-xl backdrop-blur-xl">
              <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/40">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Geospatial Location
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  12.9784° N, 77.6408° E
                </span>
              </div>

              {/* Map Canvas / Placeholder Box */}
              <div className="relative w-full h-56 sm:h-64 bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
                {/* Embedded Map iframe with dark styling */}
                <iframe
                  title="Sri Srinivasa AI Robotics Location Map"
                  src="https://maps.google.com/maps?q=198+CMH+Road+Indiranagar+Bengaluru+560038&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-70 hover:opacity-90 transition-opacity duration-300"
                  loading="lazy"
                />

                {/* Map Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 pointer-events-none flex items-center justify-between">
                  <div className="px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-cyan-500/30 text-xs text-zinc-200 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="font-medium">Indiranagar Desk 324</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=No.+198,+CMH+Road,+Indiranagar,+Bengaluru,+Karnataka+560038"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto px-3 py-1.5 rounded-xl bg-cyan-600/90 hover:bg-cyan-500 text-white font-medium text-xs shadow-md transition-colors"
                  >
                    View Map
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Corporate Profile & Leadership Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-16 border-t border-zinc-900"
        >
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Corporate Governance &amp; Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Registered Entity Information
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Sri Srinivasa AI Robotics Pvt. Ltd. is an incorporated deep-tech enterprise dedicated to research and experimental development in advanced engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Corporate Registration Details */}
            <div className="rounded-2xl p-6 bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-sm space-y-3.5">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Legal Registration
              </div>
              <h3 className="text-lg font-bold text-white">Company Identity</h3>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-500">Legal Name:</span>
                  <span className="font-semibold text-right text-zinc-200">Sri Srinivasa AI Robotics Pvt. Ltd.</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-500">CIN:</span>
                  <span className="font-mono text-cyan-400">U72100KA2026PTC222434</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-500">Incorporation Date:</span>
                  <span className="text-zinc-200">June 17, 2026</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-500">Registrar of Companies:</span>
                  <span className="text-zinc-200">ROC Bangalore, Karnataka</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-500">Authorized Capital:</span>
                  <span className="text-zinc-200">INR 10,00,000 (₹10 Lakhs)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Paid-up Capital:</span>
                  <span className="text-zinc-200">INR 1,00,000 (₹1 Lakh)</span>
                </div>
              </div>
            </div>

            {/* Core Classification & Sister Venture */}
            <div className="rounded-2xl p-6 bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-sm space-y-3.5">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Industry &amp; Alliance
              </div>
              <h3 className="text-lg font-bold text-white">Business Scope</h3>
              <div className="space-y-3 text-xs text-zinc-300">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">NIC Classification (7210)</span>
                  <p className="mt-1 text-zinc-300 leading-relaxed">
                    Research &amp; experimental development on natural sciences and engineering.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Sister Organization (Est. 2022)</span>
                  <p className="mt-1 text-white font-medium">
                    Sri Saraswathi Artificial Intelligence and Robotics Pvt. Ltd.
                  </p>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    Joint ecosystem in AI platforms, industrial automation, and embedded intelligence.
                  </p>
                </div>
              </div>
            </div>

            {/* Leadership Profile */}
            <div className="rounded-2xl p-6 bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-sm space-y-3.5 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Executive Leadership
              </div>
              <h3 className="text-lg font-bold text-white">Scientific Leadership</h3>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Dadireddy Srinivasulu Reddy</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">Founder</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    Former Scientist 'D' at CAIR, DRDO Bengaluru (15+ Years R&amp;D) • M.E. CSA, IISc Bangalore • B.Tech First Class with Distinction (SVU) • DRDO Best Team Award Recipient
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-900">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Anusha Nagella</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">Co-Director</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    Whole-time Director steering operations and strategic governance.
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-900">
                  <span className="text-[10px] uppercase font-bold text-zinc-500">Core Defence R&amp;D Competencies:</span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {["AI & Robotics", "Missile Technology", "Fighter Aircraft Systems", "Computer Vision", "Embedded Systems"].map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
