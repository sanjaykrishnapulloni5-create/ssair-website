import Link from "next/link";
import React from "react";

export function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Research", href: "/research" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Autonomous Robotics & Kinematics", href: "/services#robotics" },
    { name: "Computer Vision & Detection", href: "/services#computer-vision" },
    { name: "Defense Drones & Systems", href: "/services#defense-systems" },
    { name: "AI & Machine Learning Solutions", href: "/services#ai-solutions" },
    { name: "Embedded Systems & IoT", href: "/services#embedded-systems" },
    { name: "Industrial Automation", href: "/services#industrial-automation" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                SS<span className="text-blue-600 dark:text-blue-400">AIR</span>
              </span>
            </Link>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                Sri Srinivasa AI Robotics Pvt. Ltd.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sister Company of <strong className="text-slate-700 dark:text-slate-200">Sri Saraswathi Artificial Intelligence and Robotics Pvt. Ltd.</strong> (Est. 2022)
              </p>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Engineering intelligent robotics, defense drones, and computer vision systems. Founded by former DRDO CAIR scientist Dr. Dadireddy Srinivasulu Reddy (IISc alumnus).
            </p>

            <div className="pt-1">
              <span className="inline-block px-2.5 py-1 text-xs font-mono bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700">
                CIN: U72100KA2026PTC222434
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Capabilities */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Core Capabilities
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-xs leading-relaxed">
                  <p>No. 198, CMH Road, 2nd Floor,</p>
                  <p>Desk No. 324, Indiranagar,</p>
                  <p>Bengaluru, Karnataka - 560038</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:srinivasulureddydadireddy@gmail.com"
                  className="text-xs hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
                >
                  srinivasulureddydadireddy@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href="tel:+919848126456"
                  className="text-xs hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-slate-800 dark:text-slate-200"
                >
                  +91 98481 26456
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; 2026 Sri Srinivasa AI Robotics Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Main Co: Sri Saraswathi AI &amp; Robotics (2022)</span>
            <span>•</span>
            <span>Sister Co: SSAIR (2026)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
