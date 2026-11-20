"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { services } from "@/data/services";

export function FeaturedServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Take the first 6 featured services
  const featuredServices = (services || []).slice(0, 6);

  // Stagger animation container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  // Card slide-up and fade-in variant
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-indigo-600/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Core Capabilities
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Our Services &amp; Technologies
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
            Delivering cutting-edge solutions across AI, Defence, and Robotics
          </p>
        </motion.div>

        {/* 6 Services Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id || service.slug || index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group relative h-full rounded-2xl p-[1px] overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              {/* Resting border: subtle dark glass boundary */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-white/[0.02] transition-opacity duration-500 group-hover:opacity-0" />

              {/* Hover gradient border: subtle cyan-blue-indigo glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />

              {/* Dark Glass Card Body */}
              <div className="relative flex flex-col justify-between h-full rounded-[15px] bg-zinc-950/80 backdrop-blur-xl p-6 sm:p-8 transition-colors duration-300 group-hover:bg-zinc-900/90">
                {/* Subtle top edge specular reflection */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                {/* Subtle background radial glow on hover */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Emoji Icon Container */}
                  <div className="w-14 h-14 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
                    <span role="img" aria-label={service.title}>
                      {service.icon || service.emoji || "⚡"}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors duration-300 mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                    {service.shortDescription || service.description}
                  </p>
                </div>

                {/* Learn More link */}
                <div className="pt-4 border-t border-white/[0.06] mt-auto">
                  <Link
                    href={
                      service.href ||
                      (service.slug ? `/services/${service.slug}` : "/services")
                    }
                    className="inline-flex items-center text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200"
                  >
                    <span>Learn More</span>
                    <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1.5">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="mt-14 sm:mt-20 flex justify-center"
        >
          <Link
            href="/services"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm sm:text-base font-semibold text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-cyan-500/60 shadow-lg hover:shadow-cyan-500/20 backdrop-blur-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>View All Services</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1 text-cyan-400">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedServices;
