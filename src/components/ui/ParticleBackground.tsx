"use client";

import { useMemo, type HTMLAttributes } from "react";

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export interface ParticleBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  count?: number;
  particleClassName?: string;
}

const DEFAULT_PARTICLE_COUNT = 25;

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    // Deterministic pseudo-random generation to avoid hydration mismatch
    const rand1 = Math.abs(Math.sin((i + 1) * 12.9898 + 78.233) * 43758.5453) % 1;
    const rand2 = Math.abs(Math.sin((i + 1) * 39.346 + 11.135) * 23421.631) % 1;
    const rand3 = Math.abs(Math.sin((i + 1) * 73.156 + 45.132) * 54321.987) % 1;
    const rand4 = Math.abs(Math.sin((i + 1) * 91.247 + 63.721) * 31415.926) % 1;

    return {
      id: i,
      x: Number((rand1 * 96 + 2).toFixed(2)),
      y: Number((rand2 * 96 + 2).toFixed(2)),
      size: Number((rand3 * 3 + 2).toFixed(1)), // 2px to 5px
      duration: Number((rand4 * 10 + 12).toFixed(1)), // 12s to 22s
      delay: Number((rand1 * 6).toFixed(1)), // 0s to 6s
      opacity: Number((rand2 * 0.35 + 0.15).toFixed(2)), // 0.15 to 0.5 (subtle)
    };
  });
}

export function ParticleBackground({
  className = "",
  count = DEFAULT_PARTICLE_COUNT,
  particleClassName = "",
  ...props
}: ParticleBackgroundProps) {
  // Ensure particle count stays within the 20-30 range
  const particleCount = Math.min(Math.max(count, 20), 30);
  const particles = useMemo(() => createParticles(particleCount), [particleCount]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`.trim()}
      aria-hidden="true"
      {...props}
    >
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`absolute rounded-full bg-blue-400/40 dark:bg-cyan-300/35 ${particleClassName}`.trim()}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationName: "float-particle",
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}

export default ParticleBackground;
