"use client";

import dynamic from "next/dynamic";
import React, { Suspense, useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "@/context/ThemeContext";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

interface Scene3DProps {
  className?: string;
}

/**
 * Rotating wireframe icosahedron with an inner complementary core.
 * Adapts dynamically to light mode (royal/sapphire blue) and dark mode (neon cyan/electric blue).
 */
function WireframeIcosahedron({ isDark }: { isDark: boolean }) {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x += delta * 0.12;
      outerMeshRef.current.rotation.y += delta * 0.18;
      outerMeshRef.current.position.y = Math.sin(elapsed * 0.7) * 0.12;
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= delta * 0.08;
      innerMeshRef.current.rotation.y -= delta * 0.14;
      innerMeshRef.current.position.y = Math.sin(elapsed * 0.7) * 0.12;
    }
  });

  return (
    <group>
      {/* Outer primary wireframe icosahedron */}
      <mesh ref={outerMeshRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial
          color={isDark ? "#00f0ff" : "#1d4ed8"}
          emissive={isDark ? "#0284c7" : "#2563eb"}
          emissiveIntensity={isDark ? 0.25 : 0.35}
          wireframe
          transparent
          opacity={isDark ? 0.75 : 0.88}
          roughness={isDark ? 0.2 : 0.1}
          metalness={isDark ? 0.8 : 0.9}
        />
      </mesh>

      {/* Inner concentric wireframe dodecahedron */}
      <mesh ref={innerMeshRef}>
        <dodecahedronGeometry args={[1.35, 0]} />
        <meshStandardMaterial
          color={isDark ? "#38bdf8" : "#0284c7"}
          emissive={isDark ? "#0369a1" : "#0284c7"}
          emissiveIntensity={isDark ? 0.2 : 0.25}
          wireframe
          transparent
          opacity={isDark ? 0.45 : 0.6}
          roughness={isDark ? 0.3 : 0.2}
          metalness={isDark ? 0.7 : 0.8}
        />
      </mesh>
    </group>
  );
}

/**
 * Floating particle cloud surrounding the central wireframe geometry.
 * Uses high-contrast royal blue in light mode and glowing cyan in dark mode.
 */
function FloatingParticles({ count = 1200, isDark }: { count?: number; isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const radius = Math.cbrt(Math.random()) * 3.2 + 1.8;
      const sinPhi = Math.sin(phi);

      coords[i * 3] = radius * sinPhi * Math.cos(theta);
      coords[i * 3 + 1] = radius * sinPhi * Math.sin(theta);
      coords[i * 3 + 2] = radius * Math.cos(phi);
    }
    return coords;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta * 0.03;
      pointsRef.current.rotation.y -= delta * 0.05;
      pointsRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.08;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#38bdf8" : "#1e40af"}
        size={isDark ? 0.035 : 0.045}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isDark ? 0.75 : 0.85}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </Points>
  );
}

/**
 * Responsive scene container adapting to varying screen viewports and themes.
 */
function SceneContent({ isDark }: { isDark: boolean }) {
  const { viewport } = useThree();
  const responsiveScale = Math.min(Math.max(viewport.width / 5.5, 0.65), 1.15);

  return (
    <group scale={responsiveScale}>
      {/* Ambient lighting */}
      <ambientLight intensity={isDark ? 0.8 : 1.4} />

      {/* Primary point light */}
      <pointLight
        position={[10, 10, 10]}
        intensity={isDark ? 1.6 : 2.0}
        color={isDark ? "#00f0ff" : "#1d4ed8"}
      />

      {/* Secondary fill light */}
      <pointLight
        position={[-10, -10, -10]}
        intensity={isDark ? 1.0 : 1.2}
        color={isDark ? "#3b82f6" : "#0284c7"}
      />

      {/* Central rotating wireframe icosahedron */}
      <WireframeIcosahedron isDark={isDark} />

      {/* Ambient floating particle field */}
      <FloatingParticles isDark={isDark} />

      {/* Orbit controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        rotateSpeed={0.5}
      />
    </group>
  );
}

export default function Scene3D({ className = "" }: Scene3DProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto ${className}`.trim()}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Canvas
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          dpr={[1, 2]}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <SceneContent isDark={isDark} />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  );
}

export { Scene3D };
