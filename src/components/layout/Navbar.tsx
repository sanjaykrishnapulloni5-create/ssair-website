"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useUIModals } from "@/context/UIModalContext";
import { BrandEmblem } from "@/components/ui/BrandEmblem";

interface NavItem {
  name: string;
  href: string;
  hasMegaMenu?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Systems", href: "/products", hasMegaMenu: true },
  { name: "Services", href: "/services" },
  { name: "Academy", href: "/academy" },
  { name: "Research", href: "/research" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const { openSearch, openStartProject } = useUIModals();

  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideNavbar = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const clearMenuTimers = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleMegaEnter = () => {
    clearMenuTimers();
    openTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(true);
    }, 150);
  };

  const handleMegaLeave = () => {
    clearMenuTimers();
    closeTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 90);
  };

  const closeAllMenusImmediately = () => {
    clearMenuTimers();
    setMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isLinkActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (hideNavbar) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? "bg-white/95 dark:bg-[#050811]/95 border-b border-slate-200/90 dark:border-white/10 shadow-lg shadow-black/5"
          : "bg-white/90 dark:bg-[#050811]/90 border-b border-slate-200/60 dark:border-white/10"
      }`}
    >
      {/* Top Aerospace Utility Strip (Smoothly collapses on scroll) */}
      <div
        className={`hidden lg:block border-b border-slate-200/70 dark:border-white/5 bg-slate-100/80 dark:bg-[#080d1b] transition-all duration-200 overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0 border-b-0" : "max-h-10 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-9 flex items-center justify-between text-[11px] font-medium text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-sky-700 dark:text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              DRDO CAIR &amp; IISc Scientific Pedigree
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="font-mono">CIN: U72100KA2026PTC222434</span>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/academy#workshops"
              onClick={closeAllMenusImmediately}
              className="hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
            >
              Workshops
            </Link>
            <Link
              href="/academy#internships"
              onClick={closeAllMenusImmediately}
              className="hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
            >
              Internships
            </Link>
            <Link
              href="/academy#phd"
              onClick={closeAllMenusImmediately}
              className="hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
            >
              IEEE &amp; PhD R&amp;D
            </Link>
            <Link
              href={user ? "/dashboard" : "/login"}
              onClick={closeAllMenusImmediately}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              Apply to Teach →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-200 ${isScrolled ? "h-16" : "h-[70px]"}`}>
          {/* Brand Identity */}
          <Link
            href="/"
            onClick={closeAllMenusImmediately}
            onMouseEnter={closeAllMenusImmediately}
            className="flex items-center gap-3 group focus:outline-none shrink-0"
            aria-label="SSAIR - Sri Srinivasa AI Robotics Home"
          >
            <BrandEmblem
              className="w-10 h-10 group-hover:scale-105 transition-transform"
              showStatusDot
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                SS<span className="text-sky-600 dark:text-cyan-400">AIR</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono tracking-wider text-slate-500 dark:text-slate-400 mt-0.5 uppercase">
                Sri Srinivasa AI Robotics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary Navigation">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);

              if (item.hasMegaMenu) {
                return (
                  <div
                    key={item.href}
                    className="relative flex items-center"
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    <Link
                      href={item.href}
                      onClick={closeAllMenusImmediately}
                      className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                        active
                          ? "text-sky-600 dark:text-cyan-400 bg-sky-50 dark:bg-cyan-950/40 font-semibold"
                          : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <span>{item.name}</span>
                    </Link>

                    <button
                      type="button"
                      aria-expanded={megaMenuOpen}
                      aria-label="Toggle Systems & R&D tracks submenu"
                      onClick={() => {
                        clearMenuTimers();
                        setMegaMenuOpen((prev) => !prev);
                      }}
                      className={`p-1.5 -ml-1 rounded-md text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-cyan-400 cursor-pointer transition-transform ${
                        megaMenuOpen ? "rotate-180 text-sky-600 dark:text-cyan-400" : ""
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Clean Fast Mega-Menu Popover */}
                    {megaMenuOpen && (
                      <div className="absolute left-0 top-full pt-2 w-[540px] z-50">
                        <div className="rounded-2xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#0a1224] shadow-2xl p-5 grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="text-[11px] font-mono uppercase tracking-wider text-sky-600 dark:text-cyan-400 font-semibold px-2">
                              Flagship Systems
                            </div>
                            {[
                              { title: "Defence UAV & Counter-UAS", desc: "Aegis-UAV, Sentinel-X & Vanguard UGV", href: "/products?domain=Defence+%26+UAV" },
                              { title: "Industrial & 5-Bar Robotics", desc: "TitanArm Cobot & Nexus-AMR Tuggers", href: "/products?domain=Robotics+%26+Kinematics" },
                              { title: "AI Vision & Swarm OS", desc: "VisionSort, NeuroFleet & VisionCore", href: "/products?domain=AI+%26+Computer+Vision" },
                            ].map((entry) => (
                              <Link
                                key={entry.title}
                                href={entry.href}
                                onClick={closeAllMenusImmediately}
                                className="block p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                              >
                                <div className="text-sm font-semibold text-slate-900 dark:text-white">{entry.title}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">{entry.desc}</div>
                              </Link>
                            ))}
                          </div>

                          <div className="space-y-2 border-l border-slate-200 dark:border-white/10 pl-4">
                            <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold px-2">
                              Academic &amp; R&amp;D Tracks
                            </div>
                            {[
                              { title: "M.Tech / PhD & IEEE R&D", desc: "Simulation, Kinematics & Paper Support", href: "/products?track=M.Tech+%2F+PhD+R%26D" },
                              { title: "B.Tech Capstone & IoT Kits", desc: "Edge Vision, Drones & ROS 2 Builds", href: "/products?track=B.Tech+%2F+Capstone" },
                              { title: "Workshops & Internships", desc: "Hands-on Bengaluru & Campus Cohorts", href: "/academy" },
                            ].map((entry) => (
                              <Link
                                key={entry.title}
                                href={entry.href}
                                onClick={closeAllMenusImmediately}
                                className="block p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                              >
                                <div className="text-sm font-semibold text-slate-900 dark:text-white">{entry.title}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">{entry.desc}</div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAllMenusImmediately}
                  onMouseEnter={closeAllMenusImmediately}
                  className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                    active
                      ? "text-sky-600 dark:text-cyan-400 bg-sky-50 dark:bg-cyan-950/40 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div
            className="hidden lg:flex items-center gap-2.5 shrink-0"
            onMouseEnter={closeAllMenusImmediately}
          >
            <button
              type="button"
              onClick={() => {
                closeAllMenusImmediately();
                openSearch();
              }}
              aria-label="Search systems and projects"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 hover:border-cyan-500/40 text-xs text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden xl:inline">Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => {
                closeAllMenusImmediately();
                openStartProject();
              }}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-sky-500/40 dark:border-cyan-500/40 text-sky-700 dark:text-cyan-300 hover:bg-sky-50 dark:hover:bg-cyan-950/40 transition-colors cursor-pointer"
            >
              Start Project
            </button>

            {!loading && (
              user ? (
                <Link
                  href="/dashboard"
                  onClick={closeAllMenusImmediately}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-cyan-500/20 transition-all"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={closeAllMenusImmediately}
                  className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-cyan-500/20 transition-all"
                >
                  Student Login
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Open quick search"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d1d] px-4 pt-3 pb-6 space-y-2 max-h-[82dvh] overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  active
                    ? "text-sky-600 dark:text-cyan-400 bg-sky-50 dark:bg-cyan-950/40 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openStartProject();
              }}
              className="block w-full py-2.5 text-center text-sm font-semibold rounded-xl border border-sky-500/40 dark:border-cyan-500/40 text-sky-700 dark:text-cyan-300"
            >
              Start a Project
            </button>
            {!loading && (
              user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-2.5 text-center text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-500"
                >
                  Student Dashboard
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 text-center text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-500"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 text-center text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800"
                  >
                    Register
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
