"use client";

import dynamic from "next/dynamic";
import React, { Suspense, useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";

// Dynamic import for Canvas with SSR disabled to prevent "window is not defined"
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

interface Scene3DProps {
  className?: string;
}

/**
 * Rotating wireframe icosahedron with an inner complementary core
 * styled in SSAIR's cyber cyan/blue palette.
 */
function WireframeIcosahedron() {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    if (outerMeshRef.current) {
      // Slow rotation on multiple axes
      outerMeshRef.current.rotation.x += delta * 0.12;
      outerMeshRef.current.rotation.y += delta * 0.18;
      // Gentle floating bob
      outerMeshRef.current.position.y = Math.sin(elapsed * 0.7) * 0.12;
    }

    if (innerMeshRef.current) {
      // Counter-rotation for visual depth
      innerMeshRef.current.rotation.x -= delta * 0.08;
      innerMeshRef.current.rotation.y -= delta * 0.14;
      innerMeshRef.current.position.y = Math.sin(elapsed * 0.7) * 0.12;
    }
  });

  return (
    <group>
      {/* Outer primary wireframe icosahedron in vivid cyan */}
      <mesh ref={outerMeshRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#0284c7"
          emissiveIntensity={0.25}
          wireframe
          transparent
          opacity={0.75}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner concentric wireframe dodecahedron in electric blue */}
      <mesh ref={innerMeshRef}>
        <dodecahedronGeometry args={[1.35, 0]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0369a1"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.45}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

/**
 * Floating particle cloud surrounding the central wireframe geometry.
 */
function FloatingParticles({ count = 1500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate spherical point distribution around the icosahedron
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
      // Slow continuous swirl animation
      pointsRef.current.rotation.x -= delta * 0.03;
      pointsRef.current.rotation.y -= delta * 0.05;
      pointsRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.08;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/**
 * Responsive scene container adapting to varying screen viewports.
 */
function SceneContent() {
  const { viewport } = useThree();

  // Scale geometry dynamically for mobile, tablet, and desktop viewports
  const responsiveScale = Math.min(Math.max(viewport.width / 5.5, 0.65), 1.15);

  return (
    <group scale={responsiveScale}>
      {/* Ambient lighting for soft base illumination */}
      <ambientLight intensity={0.8} />

      {/* Primary cyan point light */}
      <pointLight position={[10, 10, 10]} intensity={1.6} color="#00f0ff" />

      {/* Secondary blue fill point light */}
      <pointLight position={[-10, -10, -10]} intensity={1.0} color="#3b82f6" />

      {/* Central rotating wireframe icosahedron */}
      <WireframeIcosahedron />

      {/* Ambient floating particle field */}
      <FloatingParticles />

      {/* Orbit controls with continuous autoRotate and locked zoom/pan */}
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

/**
 * Scene3D Component
 *
 * Client-only 3D background scene for the SSAIR hero section.
 * Renders an interactive WebGL canvas with a rotating cyan/blue wireframe
 * icosahedron, ambient particles, and orbit controls behind page content.
 */
export default function Scene3D({ className = "" }: Scene3DProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null during server-side rendering to avoid hydration mismatch
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
            <SceneContent />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  );
}

// Named export for convenience
export { Scene3D };
