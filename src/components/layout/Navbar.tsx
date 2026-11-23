"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Research", href: "/research" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // Scroll listener for dynamic glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu on route change
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  // Close mobile menu with Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isLinkActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-gray-950/80 backdrop-blur-md border-b border-gray-800/80 shadow-lg shadow-black/40 py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Gradient Text */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-lg p-1 transition-all"
            aria-label="SSAIR - Sri Srinivasa AI Robotics Home"
          >
            {/* Tech Emblem */}
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-cyan-500/30 group-hover:border-cyan-400/70 shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all duration-300">
              <svg
                className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" className="fill-blue-500/30" />
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:brightness-110 transition-all font-mono">
                SSAIR
              </span>
              <span className="hidden sm:inline-block text-[10px] tracking-wider uppercase font-semibold text-gray-400 -mt-1">
                Sri Srinivasa AI Robotics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    active
                      ? "text-cyan-400 font-semibold"
                      : "text-gray-300 hover:text-white hover:bg-gray-900/60"
                  }`}
                >
                  {item.name}
                  {active && (
                    <motion.div
                      layoutId="desktop-active-pill"
                      className="absolute inset-0 rounded-lg bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.25)] -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {active && (
                    <motion.span
                      layoutId="desktop-active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 text-xs lg:text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 border border-cyan-400/20"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Right: Theme Toggle & Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="relative p-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-900/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-colors"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between items-center relative">
                {/* Top line */}
                <motion.span
                  animate={
                    isMobileMenuOpen
                      ? { rotate: 45, y: 9, backgroundColor: "#22d3ee" }
                      : { rotate: 0, y: 0, backgroundColor: "#d1d5db" }
                  }
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-6 h-0.5 rounded-full block origin-center"
                />
                {/* Middle line */}
                <motion.span
                  animate={
                    isMobileMenuOpen
                      ? { opacity: 0, scale: 0.2, x: -10 }
                      : { opacity: 1, scale: 1, x: 0, backgroundColor: "#d1d5db" }
                  }
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="w-6 h-0.5 rounded-full block"
                />
                {/* Bottom line */}
                <motion.span
                  animate={
                    isMobileMenuOpen
                      ? { rotate: -45, y: -9, backgroundColor: "#22d3ee" }
                      : { rotate: 0, y: 0, backgroundColor: "#d1d5db" }
                  }
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-6 h-0.5 rounded-full block origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay with Slide-in Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav-overlay"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-gray-950/95 backdrop-blur-2xl z-40 md:hidden flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="flex flex-col space-y-3">
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase px-3 font-mono">
                Menu
              </p>

              <nav className="flex flex-col space-y-2">
                {NAV_ITEMS.map((item, index) => {
                  const active = isLinkActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                          active
                            ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                            : "text-gray-300 hover:text-white hover:bg-gray-900/80 border border-transparent"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              active ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : "bg-gray-700"
                            }`}
                          />
                          {item.name}
                        </span>

                        {active && (
                          <span className="text-xs text-cyan-400 font-mono tracking-wider font-semibold">
                            ACTIVE
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Drawer Bottom Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="pt-6 border-t border-gray-800/80 flex flex-col gap-4 mt-6"
            >
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900/60 border border-gray-800/80">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-400">Display Theme</span>
                <ThemeToggle showLabel />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                <span>SSAIR (Sister Co.)</span>
                <span className="text-cyan-400">Main: Sri Saraswathi AI</span>
              </div>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl text-center text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all border border-cyan-400/20"
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
