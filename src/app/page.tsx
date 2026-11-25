import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ProjectFinderSection from "@/components/home/ProjectFinderSection";
import StatsCounter from "@/components/home/StatsCounter";
import {
  DomainBentoAndWhySection,
  CorporateSynergySection,
  ProcessTimelineSection,
  AcademyHighlightSection,
  TechMarqueeSection,
  LeadershipAndGallerySection,
  PreFooterCtaSection,
} from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: "Sri Srinivasa AI Robotics (SSAIR) | Autonomous Robotics, Defense AI & R&D Academy",
  description:
    "Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR) engineers autonomous drones, defense robotics, five-bar parallel kinematics, computer vision, and industry-mentored academic R&D. Sister company of Sri Saraswathi AI & Robotics.",
};

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* 1. Interactive 3D WebGL Aerospace & Robotics Hero */}
      <HeroSection />

      {/* 2. Core Domains Bento Grid & Why Choose SSAIR */}
      <DomainBentoAndWhySection />

      {/* 3. Interactive Systems, Products & Academic R&D Explorer */}
      <ProjectFinderSection limit={6} />

      {/* 4. Corporate Hierarchy & Two-Company Unified Synergy */}
      <CorporateSynergySection />

      {/* 5. Interactive 6-Phase Engineering & R&D Lifecycle */}
      <ProcessTimelineSection />

      {/* 6. Academy: Workshops, Internships, PhD & Teaching Portal */}
      <AcademyHighlightSection />

      {/* 7. Animated Track Record Telemetry Band */}
      <StatsCounter className="bg-slate-950" />

      {/* 8. Accessible Technology Ecosystem Marquee */}
      <TechMarqueeSection />

      {/* 9. Scientific Leadership, Systems Lightbox Gallery & Testimonials */}
      <LeadershipAndGallerySection />

      {/* 10. Pre-Footer Conversion CTA */}
      <PreFooterCtaSection />
    </div>
  );
}
