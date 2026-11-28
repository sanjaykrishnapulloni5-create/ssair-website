import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  services,
  getCategoryById,
  Service,
} from "@/data/services";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ServiceSvgIcon from "@/components/ui/ServiceSvgIcon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Static generation for all 18 service slugs
 */
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

/**
 * Dynamic metadata generation based on service slug
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | SSAIR",
      description: "The requested service could not be found.",
    };
  }

  const category = getCategoryById(service.category);
  const categoryName = category?.name ?? "Engineering & R&D";

  return {
    title: `${service.title} | ${categoryName} | SSAIR`,
    description: service.shortDescription,
    keywords: [
      service.title,
      categoryName,
      ...service.technologies,
      "Sri Srinivasa AI Robotics",
      "SSAIR",
      "Defense R&D",
      "Autonomous Systems",
      "DRDO CAIR",
      "Bangalore",
    ],
    openGraph: {
      title: `${service.title} | Sri Srinivasa AI Robotics (SSAIR)`,
      description: service.shortDescription,
      type: "article",
      url: `/services/${service.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | SSAIR`,
      description: service.shortDescription,
    },
  };
}

/**
 * Helper to obtain category-specific styling tokens
 */
function getCategoryTheme(category: string) {
  const cat = (category || "").toLowerCase();

  if (cat.includes("defence") || cat.includes("defense") || cat.includes("aerospace")) {
    return {
      badge: "bg-red-500/10 text-rose-400 border-rose-500/30",
      pillGlow: "shadow-[0_0_12px_rgba(244,63,94,0.2)]",
      gradient: "from-red-600 via-rose-500 to-amber-500",
      accent: "text-rose-400",
      borderAccent: "group-hover:border-rose-500/40",
    };
  }

  if (cat.includes("robotics") || cat.includes("autonomous")) {
    return {
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      pillGlow: "shadow-[0_0_12px_rgba(16,185,129,0.2)]",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      accent: "text-emerald-400",
      borderAccent: "group-hover:border-emerald-500/40",
    };
  }

  if (
    cat.includes("innovation") ||
    cat.includes("research") ||
    cat.includes("space") ||
    cat.includes("mba") ||
    cat.includes("civil")
  ) {
    return {
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      pillGlow: "shadow-[0_0_12px_rgba(168,85,247,0.2)]",
      gradient: "from-purple-600 via-violet-500 to-pink-500",
      accent: "text-purple-400",
      borderAccent: "group-hover:border-purple-500/40",
    };
  }

  // Default to AI & Software theme (cyan)
  return {
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    pillGlow: "shadow-[0_0_12px_rgba(6,182,212,0.2)]",
    gradient: "from-blue-600 via-cyan-500 to-teal-400",
    accent: "text-cyan-400",
    borderAccent: "group-hover:border-cyan-500/40",
  };
}

/**
 * Render distinct high-tech SVG icons for the 6 feature items
 */
function FeatureIcon({ index }: { index: number }) {
  const iconClass = "w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300";

  switch (index) {
    case 0:
      // Neural / Intelligence Processor
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      );
    case 1:
      // Tactical Shield / Safety Compliance
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      );
    case 2:
      // Hardware / SoC Microchip
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
          />
        </svg>
      );
    case 3:
      // Sensor Telemetry & Multi-Spectral Signals
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M9.348 14.652a3.75 3.75 0 010-5.304m5.304 0a3.75 3.75 0 010 5.304m-7.425 2.121a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894a9.75 9.75 0 010-13.788m13.788 0a9.75 9.75 0 010 13.788M12 12h.008v.008H12V12z"
          />
        </svg>
      );
    case 4:
      // Real-time Bus & High-Speed Protocol Network
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
          />
        </svg>
      );
    case 5:
    default:
      // High-Velocity Execution & Deterministic Runtime
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      );
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  // If service does not exist, trigger Next.js notFound()
  if (!service) {
    notFound();
  }

  const category = getCategoryById(service.category);
  const theme = getCategoryTheme(service.category);

  // Retrieve 3 related services from the same category (excluding current)
  const sameCategoryServices = services.filter(
    (s) => s.category === service.category && s.slug !== service.slug
  );

  let relatedServices: Service[] = sameCategoryServices.slice(0, 3);

  // If the category has fewer than 3 other services, supplement with additional services
  if (relatedServices.length < 3) {
    const additionalServices = services.filter(
      (s) =>
        s.slug !== service.slug &&
        !relatedServices.some((rel) => rel.slug === s.slug)
    );
    relatedServices = [...relatedServices, ...additionalServices].slice(0, 3);
  }

  return (
    <div className="relative min-h-screen bg-[#07090e] text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden pt-28 sm:pt-36 pb-20 sm:pb-28">
      {/* High-Tech Background Cyber Grids & Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
          style={{ background: "radial-gradient(closest-side, rgba(6, 182, 212, 0.16), rgba(37, 99, 235, 0.08), transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* 1. BREADCRUMB NAVIGATION                                 */}
        {/* ========================================================= */}
        <AnimatedSection delay={0.05} className="mb-8 sm:mb-12">
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-xs sm:text-sm text-zinc-400 shadow-sm"
          >
            <Link
              href="/"
              className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 group"
            >
              <svg
                className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Home</span>
            </Link>

            <svg
              className="w-3.5 h-3.5 text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>

            <Link
              href="/services"
              className="hover:text-cyan-300 transition-colors font-medium"
            >
              Services
            </Link>

            <svg
              className="w-3.5 h-3.5 text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>

            <span className="text-cyan-300 font-semibold truncate max-w-[180px] sm:max-w-xs md:max-w-md">
              {service.title}
            </span>
          </nav>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* 2. SERVICE HERO SECTION                                   */}
        {/* ========================================================= */}
        <AnimatedSection delay={0.1} className="mb-20 sm:mb-28">
          <header className="relative rounded-3xl bg-slate-900/90 border border-white/10 p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden">
            {/* Top ambient highlight line */}
            <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

            {/* Corner Technical Crosshairs */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40 pointer-events-none" />
            <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40 pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
              <div className="space-y-6 flex-1">
                {/* Category Badge & Verification Status */}
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border backdrop-blur-md ${theme.badge} ${theme.pillGlow}`}
                  >
                    <ServiceSvgIcon category={service.category} className="w-4 h-4 text-cyan-400" />
                    <span>{category?.name ?? service.category}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-tight bg-white/5 border border-white/10 text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    DRDO CAIR Pedigree • Active R&D
                  </span>
                </div>

                {/* Hero Title */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                  {service.title}
                </h1>

                {/* Short Lead Description */}
                <p className="text-lg sm:text-xl text-cyan-100/90 font-medium leading-relaxed max-w-3xl">
                  {service.shortDescription}
                </p>

                {/* Full In-Depth Technical Description */}
                <div className="relative pl-5 sm:pl-6 py-2 border-l-2 border-cyan-500/50 bg-white/[0.02] rounded-r-2xl max-w-4xl">
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {service.fullDescription}
                  </p>
                </div>

                {/* Action CTA within Hero */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#features"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 text-xs sm:text-sm font-medium transition-all duration-200"
                  >
                    <span>Explore Specifications</span>
                    <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                  <Link
                    href={`/contact?subject=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-200"
                  >
                    <span>Request Technical Brief</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Service Hero Icon & Holographic Schematic Emblem */}
              <div className="flex-shrink-0 self-center lg:self-auto">
                <div className="relative group p-1">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-slate-950/80 border-2 border-white/20 flex flex-col items-center justify-center backdrop-blur-2xl shadow-2xl group-hover:border-cyan-400/60 transition-all duration-300">
                    {/* Rotating Tech Reticle */}
                    <div className="absolute inset-2 rounded-2xl border border-dashed border-cyan-500/30 animate-[spin_30s_linear_infinite]" />
                    <ServiceSvgIcon
                      slug={service.slug}
                      id={service.id}
                      name={service.title}
                      category={service.category}
                      className="w-14 h-14 sm:w-16 sm:h-16 text-cyan-400 transform group-hover:scale-110 transition-transform duration-300 relative z-10"
                    />
                    <span className="mt-2.5 text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                      SSAIR • SYS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* 3. FEATURES GRID (6 FEATURES IN A 2x3 GRID)               */}
        {/* ========================================================= */}
        <AnimatedSection delay={0.15} className="mb-20 sm:mb-28">
          <div id="features" className="scroll-mt-28 space-y-8">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Engineering Capabilities
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Core Technical Features
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
                  Rigorous hardware-software specifications and mission-critical competencies engineered for defense and high-reliability industrial operations.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <span>06 ARCHITECTURAL PILLARS</span>
              </div>
            </div>

            {/* 2x3 Grid of 6 Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-900/85 border border-white/10 hover:border-cyan-500/40 transition-colors duration-200 shadow-xl hover:-translate-y-1"
                >
                  {/* Subtle top edge glow on hover */}
                  <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      {/* High-Tech Icon Container */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-400/50 group-hover:bg-cyan-950/30 transition-all duration-300 shadow-inner">
                        <FeatureIcon index={idx} />
                      </div>

                      {/* Feature Counter */}
                      <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 group-hover:text-cyan-400 transition-colors">
                        0{idx + 1} {"//"} CAPABILITY
                      </span>
                    </div>

                    {/* Feature Description */}
                    <p className="text-base sm:text-lg text-zinc-200 group-hover:text-white font-medium leading-relaxed transition-colors">
                      {feature}
                    </p>
                  </div>

                  {/* Bottom Verification Accent */}
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-cyan-400/80 transition-colors">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                      MIL-SPEC & INDUSTRIAL READY
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      VERIFIED
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* 4. TECHNOLOGIES SECTION                                   */}
        {/* ========================================================= */}
        <AnimatedSection delay={0.2} className="mb-20 sm:mb-28">
          <div className="rounded-3xl bg-slate-900/85 border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Stack & Frameworks
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Technologies & Standards
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
                  Deep-tech toolchains, real-time operating systems, neural compilers, and hardware targets utilized across this service domain.
                </p>
              </div>

              <div className="text-xs font-mono text-zinc-500">
                {service.technologies.length} CORE ECOSYSTEM TARGETS
              </div>
            </div>

            {/* Tech Badges & Tags */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {service.technologies.map((tech) => (
                <div
                  key={tech}
                  className="group inline-flex items-center gap-3 px-4 sm:px-5 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/50 transition-all duration-200 shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-default"
                >
                  {/* Terminal Command Icon */}
                  <div className="flex items-center justify-center w-6 h-6 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                    &gt;
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-medium text-zinc-200 group-hover:text-cyan-300 transition-colors">
                    {tech}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 group-hover:shadow-[0_0_6px_#22d3ee] transition-all" />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* 5. RELATED SERVICES (3 SERVICES EXCLUDING CURRENT)        */}
        {/* ========================================================= */}
        <AnimatedSection delay={0.25} className="mb-20 sm:mb-28">
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Explore Domain
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Related Services
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
                  Complementary engineering capabilities from the {category?.name ?? "SSAIR"} catalog.
                </p>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>View All 18 Services</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* 3 Related Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedServices.map((rel) => {
                const relCategory = getCategoryById(rel.category);
                const relTheme = getCategoryTheme(rel.category);

                return (
                  <div
                    key={rel.slug}
                    className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/85 border border-white/10 hover:border-cyan-500/40 p-6 sm:p-7 transition-colors duration-200 shadow-xl hover:-translate-y-1"
                  >
                    {/* Top ambient highlight on hover */}
                    <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="space-y-4">
                      {/* Header with Icon & Category */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-400/40 text-cyan-400 transition-all shadow-inner">
                          <ServiceSvgIcon
                            slug={rel.slug}
                            id={rel.id}
                            name={rel.title}
                            category={rel.category}
                            className="w-6 h-6"
                          />
                        </div>
                        <span
                          className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${relTheme.badge}`}
                        >
                          {relCategory?.name ?? rel.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {rel.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                        {rel.shortDescription}
                      </p>

                      {/* Technology preview tags */}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {rel.technologies.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Action Link */}
                    <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      <Link
                        href={`/services/${rel.slug}`}
                        className="inline-flex items-center gap-1.5 after:absolute after:inset-0 focus:outline-none"
                      >
                        <span>Explore Service Details</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* 6. CALL TO ACTION SECTION: "Get in Touch"                */}
        {/* ========================================================= */}
        <AnimatedSection delay={0.3}>
          <div
            id="contact-cta"
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] via-slate-900/50 to-transparent p-8 sm:p-14 lg:p-16 text-center backdrop-blur-2xl shadow-2xl"
          >
            {/* Background cyber radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Corner Technical Crosshairs */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-white/20 pointer-events-none" />
            <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-white/20 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-white/20 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-white/20 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-cyan-300 uppercase bg-cyan-950/60 border border-cyan-500/30 shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Engineering Partnership & Procurement
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Ready to Deploy {service.title}?
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                Connect directly with our defense R&D specialists, autonomous systems researchers, and systems engineering leadership to formulate project specifications, architecture blueprints, and deployment timelines.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/contact?subject=${encodeURIComponent(service.title)}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:via-cyan-400 hover:to-teal-300 text-black shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Get in Touch</span>
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>

                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-sm text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <span>Explore All Services</span>
                </Link>
              </div>

              {/* Reassurance Footer */}
              <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-500">
                <span>CIN: U72100KA2026PTC222434</span>
                <span className="hidden sm:inline">•</span>
                <span>DRDO CAIR & IISc Research Pedigree</span>
                <span className="hidden sm:inline">•</span>
                <span>Bengaluru, Karnataka</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
