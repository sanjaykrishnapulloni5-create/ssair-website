import Link from "next/link";
import React from "react";

export function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About & Leadership", href: "/about" },
    { name: "Systems & R&D Finder", href: "/products" },
    { name: "Engineering Services", href: "/services" },
    { name: "Academy & Workshops", href: "/academy" },
    { name: "Research & Publications", href: "/research" },
    { name: "Student & Teaching Login", href: "/login" },
    { name: "Contact Lab", href: "/contact" },
  ];

  const capabilities = [
    { name: "Drones & Tactical UAVs", href: "/services/drones-uavs" },
    { name: "Five-Bar & Industrial Robotics", href: "/services/ai-robotics-industrial" },
    { name: "AI Computer Vision (YOLO)", href: "/services/ai-computer-vision" },
    { name: "Embedded AI & Edge IoT", href: "/services/embedded-ai-iot" },
    { name: "Missile & Flight Guidance", href: "/services/modern-missile-technology" },
    { name: "Autonomous Ground & EVs", href: "/services/self-driving-e-vehicles" },
  ];

  const academyTracks = [
    { name: "Hands-On Robotics Workshops", href: "/academy#workshops" },
    { name: "Industrial AI Internships", href: "/academy#internships" },
    { name: "B.Tech / M.Tech / PhD R&D", href: "/academy#phd" },
    { name: "Apply for Teaching Fellowship", href: "/dashboard" },
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-900 dark:bg-[#040710] text-slate-300 border-t border-slate-800">
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Corporate Lineage */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                SS
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                SS<span className="text-cyan-400">AIR</span>
              </span>
            </Link>

            <div className="space-y-1">
              <p className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                Sri Srinivasa AI Robotics Pvt. Ltd.
              </p>
              <p className="text-xs text-slate-400">
                Sister Company of{" "}
                <strong className="text-slate-200">
                  Sri Saraswathi Artificial Intelligence and Robotics Pvt. Ltd.
                </strong>{" "}
                (Est. 2022)
              </p>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Engineering sovereign autonomous robotics, defense UAVs, computer vision, and industry-mentored academic R&amp;D programs. Founded by former DRDO CAIR Scientist &apos;D&apos; Dr. Dadireddy Srinivasulu Reddy (IISc alumnus).
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-block px-2.5 py-1 text-xs font-mono bg-slate-800/80 text-cyan-300 rounded border border-cyan-500/20">
                CIN: U72100KA2026PTC222434
              </span>
              <span className="inline-block px-2.5 py-1 text-xs font-mono bg-slate-800/80 text-emerald-300 rounded border border-emerald-500/20">
                NIC 7210 • ROC Bengaluru
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Engineering */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
              Core Domains
            </h3>
            <ul className="space-y-2.5">
              {capabilities.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Academy & Lab HQ */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
              Academy &amp; Contact
            </h3>
            <ul className="space-y-2">
              {academyTracks.map((t) => (
                <li key={t.name}>
                  <Link
                    href={t.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-slate-800 space-y-2.5 text-xs text-slate-400">
              <p className="leading-relaxed">
                No. 198, CMH Road, 2nd Floor, Desk No. 324, Indiranagar, Bengaluru, Karnataka - 560038
              </p>
              <a
                href="mailto:srinivasulureddydadireddy@gmail.com"
                className="block hover:text-cyan-400 transition-colors break-all"
              >
                srinivasulureddydadireddy@gmail.com
              </a>
              <a
                href="tel:+919848126456"
                className="block text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
              >
                +91 98481 26456
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; 2026 Sri Srinivasa AI Robotics Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span>Main Co: Sri Saraswathi AI &amp; Robotics (Est. 2022)</span>
            <span>•</span>
            <span>Sister Co: SSAIR (Est. 2026)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
