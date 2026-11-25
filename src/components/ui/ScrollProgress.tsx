"use client";

import { useEffect, useRef } from "react";

/**
 * Top viewport scroll progress bar using native CSS scroll-driven animations
 * where supported, with a passive listener fallback for older browsers.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      bar.style.display = "none";
      return;
    }

    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline", "scroll()")) {
      return;
    }

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
      bar.style.setProperty("--scroll-progress", String(ratio));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div id="ssair-scroll-progress" ref={barRef} aria-hidden="true" />;
}

export default ScrollProgress;
