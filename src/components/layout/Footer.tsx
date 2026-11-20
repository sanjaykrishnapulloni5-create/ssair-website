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
    { name: "Computer Vision & Object Detection", href: "/services#computer-vision" },
    { name: "Defense & Aerospace Engineering", href: "/services#defense-systems" },
    { name: "AI & Machine Learning Solutions", href: "/services#ai-solutions" },
    { name: "Embedded Systems & IoT", href: "/services#embedded-systems" },
    { name: "Industrial Automation & R&D", href: "/services#industrial-automation" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Company Info & Social Links */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-2xl font-extrabold tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                SS<span className="text-cyan-400">AIR</span>
              </span>
            </Link>

            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Sri Srinivasa AI Robotics Pvt. Ltd.
            </p>

            <p className="text-sm text-gray-400 leading-relaxed">
              Pioneering deep-tech research and development in natural sciences, robotics, 
              defense systems, and artificial intelligence. Founded by former DRDO CAIR 
              research leadership (IISc alumnus).
            </p>

            <div className="pt-1">
              <span className="inline-block px-2.5 py-1 text-[11px] font-mono tracking-tight bg-gray-900 text-gray-400 rounded border border-gray-800">
                CIN: U72100KA2026PTC222434
              </span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Connect With Us
              </p>
              <div className="flex items-center space-x-3">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SSAIR on LinkedIn"
                  className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-gray-800 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SSAIR on Twitter"
                  className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-gray-800 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SSAIR on GitHub"
                  className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-gray-800 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-cyan-400 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-cyan-400 transition-colors" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="space-y-3.5 text-sm">
              {/* Address */}
              <div className="flex items-start space-x-3 text-gray-400">
                <svg
                  className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="leading-snug">
                  <p>No. 198, CMH Road, 2nd Floor,</p>
                  <p>Desk No. 324, Indiranagar,</p>
                  <p>Bengaluru, Karnataka - 560038</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3 text-gray-400">
                <svg
                  className="w-5 h-5 text-cyan-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:info@ssair.in"
                  className="hover:text-cyan-400 transition-colors"
                >
                  info@ssair.in
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3 text-gray-400">
                <svg
                  className="w-5 h-5 text-cyan-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+918000000000"
                  className="hover:text-cyan-400 transition-colors"
                >
                  +91 80 0000 0000
                </a>
              </div>

              {/* ROC & Incorporation Note */}
              <div className="pt-2 text-xs text-gray-500 border-t border-gray-900">
                <p>ROC Bangalore • Inc. June 17, 2026</p>
                <p className="mt-0.5">NIC 7210: Natural Sciences & Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900 bg-gray-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p className="text-center sm:text-left">
              Copyright &copy; 2026 SSAIR. All rights reserved.
            </p>

            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="hover:text-cyan-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-800" aria-hidden="true">|</span>
              <Link
                href="/terms"
                className="hover:text-cyan-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
