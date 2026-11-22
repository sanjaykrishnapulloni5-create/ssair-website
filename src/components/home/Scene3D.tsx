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
 * Articulated Autonomous Robotic Manipulator & Kinematic Core.
 * Represents SSAIR's core R&D in parallel robotics kinematics,
 * five-bar mechanisms, and automated defence systems.
 *
 * Engineered with pure procedural Three.js geometries for 0ms load time,
 * locked 60 FPS, and zero lag/jitters.
 */
function RoboticManipulator({ isDark }: { isDark: boolean }) {
  // Master hierarchy refs for kinematics animation
  const rootGroupRef = useRef<THREE.Group>(null);
  const turretRef = useRef<THREE.Group>(null);
  const shoulderRef = useRef<THREE.Group>(null);
  const elbowRef = useRef<THREE.Group>(null);
  const wristRef = useRef<THREE.Group>(null);
  const leftClawRef = useRef<THREE.Group>(null);
  const rightClawRef = useRef<THREE.Group>(null);
  const coreOrbRef = useRef<THREE.Mesh>(null);
  const lidarRingRef = useRef<THREE.Group>(null);
  const hudRingRef = useRef<THREE.Group>(null);

  // Dynamic theme colors
  const colors = useMemo(() => {
    return {
      metalDark: isDark ? "#090d16" : "#334155",
      metalBody: isDark ? "#172033" : "#e2e8f0",
      metalAccent: isDark ? "#1e293b" : "#cbd5e1",
      chrome: isDark ? "#94a3b8" : "#64748b",
      neonPrimary: isDark ? "#00f0ff" : "#1d4ed8",
      neonSecondary: isDark ? "#38bdf8" : "#2563eb",
      glowEmissive: isDark ? "#0284c7" : "#1e40af",
      laser: isDark ? "#22d3ee" : "#3b82f6",
    };
  }, [isDark]);

  // High performance shared materials
  const matBody = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: colors.metalBody,
        roughness: isDark ? 0.35 : 0.25,
        metalness: isDark ? 0.85 : 0.9,
      }),
    [colors.metalBody, isDark]
  );

  const matDarkMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: colors.metalDark,
        roughness: isDark ? 0.4 : 0.3,
        metalness: 0.9,
      }),
    [colors.metalDark, isDark]
  );

  const matNeon = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: colors.neonPrimary,
        emissive: colors.glowEmissive,
        emissiveIntensity: isDark ? 0.8 : 0.6,
        roughness: 0.1,
        metalness: 0.5,
      }),
    [colors.neonPrimary, colors.glowEmissive, isDark]
  );

  const matWireGlow = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: colors.neonSecondary,
        emissive: colors.glowEmissive,
        emissiveIntensity: isDark ? 0.6 : 0.4,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.8 : 0.65,
      }),
    [colors.neonSecondary, colors.glowEmissive, isDark]
  );

  // Smooth kinematics frame loop with zero allocations
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;

    // 1. Subtle mouse-reactive orientation with smooth damping (zero jitter)
    if (rootGroupRef.current) {
      const targetRotY = ptr.x * 0.45;
      const targetRotX = -ptr.y * 0.25;
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.y,
        targetRotY,
        delta * 3.0
      );
      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.x,
        targetRotX,
        delta * 3.0
      );
      // Gentle floating hover
      rootGroupRef.current.position.y = Math.sin(t * 0.8) * 0.08 - 0.2;
    }

    // 2. Base turret azimuthal scan
    if (turretRef.current) {
      turretRef.current.rotation.y = Math.sin(t * 0.5) * 0.35;
    }

    // 3. Articulated shoulder pitch
    if (shoulderRef.current) {
      shoulderRef.current.rotation.z = -0.45 + Math.sin(t * 0.7) * 0.15;
    }

    // 4. Articulated elbow flex
    if (elbowRef.current) {
      elbowRef.current.rotation.z = 0.85 + Math.sin(t * 0.7 + 1.2) * 0.2;
    }

    // 5. Wrist roll & pitch
    if (wristRef.current) {
      wristRef.current.rotation.x = Math.sin(t * 1.1) * 0.25;
      wristRef.current.rotation.y = t * 0.6;
    }

    // 6. Bionic gripper breathing actuation
    const clawOffset = Math.sin(t * 1.4) * 0.08 + 0.12;
    if (leftClawRef.current) {
      leftClawRef.current.position.x = -clawOffset;
    }
    if (rightClawRef.current) {
      rightClawRef.current.position.x = clawOffset;
    }

    // 7. Quantum energy orb rotation
    if (coreOrbRef.current) {
      coreOrbRef.current.rotation.x = t * 1.2;
      coreOrbRef.current.rotation.y = t * 1.5;
    }

    // 8. LiDAR scanner radar sweep
    if (lidarRingRef.current) {
      lidarRingRef.current.rotation.y = t * 1.8;
    }

    // 9. Coordinate HUD orbital telemetry
    if (hudRingRef.current) {
      hudRingRef.current.rotation.z = -t * 0.3;
      hudRingRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <group ref={rootGroupRef} position={[0, -0.2, 0]}>
      {/* ========================================================= */}
      {/* 1. INDUSTRIAL TURRET BASE & TELEMETRY GROUND RING        */}
      {/* ========================================================= */}
      <group position={[0, -1.8, 0]}>
        {/* Heavy Pedestal Base */}
        <mesh material={matDarkMetal}>
          <cylinderGeometry args={[1.6, 1.9, 0.35, 32]} />
        </mesh>

        {/* Machined Bevel Ring */}
        <mesh position={[0, 0.22, 0]} material={matBody}>
          <cylinderGeometry args={[1.35, 1.55, 0.15, 32]} />
        </mesh>

        {/* Glowing Encoder Status Ring */}
        <mesh position={[0, 0.31, 0]} material={matNeon}>
          <torusGeometry args={[1.25, 0.04, 16, 48]} />
        </mesh>

        {/* Rotating LiDAR Scanning Fan */}
        <group ref={lidarRingRef} position={[0, 0.35, 0]}>
          <mesh material={matWireGlow}>
            <ringGeometry args={[1.4, 2.5, 36]} />
          </mesh>
          {/* Laser scanning marker */}
          <mesh position={[2.0, 0.02, 0]} material={matNeon}>
            <boxGeometry args={[0.6, 0.02, 0.04]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 2. ROTATING AZIMUTH TURRET JOINT                          */}
      {/* ========================================================= */}
      <group ref={turretRef} position={[0, -1.35, 0]}>
        {/* Turret Main Hub */}
        <mesh material={matBody}>
          <cylinderGeometry args={[0.95, 1.15, 0.65, 24]} />
        </mesh>

        {/* Dual Actuator Flanges */}
        <mesh position={[0.65, 0.25, 0]} material={matDarkMetal}>
          <boxGeometry args={[0.22, 0.65, 0.75]} />
        </mesh>
        <mesh position={[-0.65, 0.25, 0]} material={matDarkMetal}>
          <boxGeometry args={[0.22, 0.65, 0.75]} />
        </mesh>

        {/* Status indicator on turret */}
        <mesh position={[0, 0.15, 0.96]} material={matNeon}>
          <boxGeometry args={[0.4, 0.1, 0.05]} />
        </mesh>

        {/* ======================================================= */}
        {/* 3. SHOULDER JOINT & LOWER ROBOTIC BICEP                 */}
        {/* ======================================================= */}
        <group ref={shoulderRef} position={[0, 0.45, 0]}>
          {/* Shoulder Rotary Servo Axis */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={matNeon}>
            <cylinderGeometry args={[0.42, 0.42, 1.55, 24]} />
          </mesh>

          {/* Primary Lower Arm (Double-Spar Carbon Linkages) */}
          <group position={[0, 1.15, 0]}>
            {/* Left Spar */}
            <mesh position={[-0.45, 0, 0]} material={matBody}>
              <boxGeometry args={[0.16, 2.1, 0.32]} />
            </mesh>
            {/* Right Spar */}
            <mesh position={[0.45, 0, 0]} material={matBody}>
              <boxGeometry args={[0.16, 2.1, 0.32]} />
            </mesh>
            {/* Cross-brace truss */}
            <mesh position={[0, 0.2, 0]} rotation={[0, 0, 0.7]} material={matDarkMetal}>
              <boxGeometry args={[0.1, 1.05, 0.18]} />
            </mesh>
            <mesh position={[0, -0.2, 0]} rotation={[0, 0, -0.7]} material={matDarkMetal}>
              <boxGeometry args={[0.1, 1.05, 0.18]} />
            </mesh>

            {/* Central Hydraulic Piston Actuator */}
            <mesh position={[0, 0, -0.28]} material={matDarkMetal}>
              <cylinderGeometry args={[0.14, 0.14, 1.5, 16]} />
            </mesh>
            {/* Chrome Piston Rod */}
            <mesh position={[0, 0.45, -0.28]} material={matNeon}>
              <cylinderGeometry args={[0.07, 0.07, 1.1, 16]} />
            </mesh>

            {/* ===================================================== */}
            {/* 4. ELBOW JOINT & UPPER FOREARM                       */}
            {/* ===================================================== */}
            <group ref={elbowRef} position={[0, 1.05, 0]}>
              {/* Elbow Servo Hub */}
              <mesh rotation={[0, 0, Math.PI / 2]} material={matDarkMetal}>
                <cylinderGeometry args={[0.35, 0.35, 1.1, 20]} />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 2]} material={matNeon}>
                <cylinderGeometry args={[0.22, 0.22, 1.25, 20]} />
              </mesh>

              {/* Forearm Housing */}
              <group position={[0, 0.95, 0]}>
                <mesh material={matBody}>
                  <boxGeometry args={[0.42, 1.65, 0.42]} />
                </mesh>
                {/* Exoskeleton Wireframe Cage */}
                <mesh material={matWireGlow}>
                  <boxGeometry args={[0.55, 1.75, 0.55]} />
                </mesh>
                {/* Tech Status Stripe */}
                <mesh position={[0, 0, 0.23]} material={matNeon}>
                  <boxGeometry args={[0.2, 1.3, 0.03]} />
                </mesh>

                {/* ================================================= */}
                {/* 5. 3-AXIS WRIST GIMBAL & BIONIC END-EFFECTOR     */}
                {/* ================================================= */}
                <group ref={wristRef} position={[0, 0.95, 0]}>
                  {/* Wrist Rotary Collar */}
                  <mesh material={matDarkMetal}>
                    <cylinderGeometry args={[0.28, 0.32, 0.25, 20]} />
                  </mesh>
                  <mesh position={[0, 0.18, 0]} material={matNeon}>
                    <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
                  </mesh>

                  {/* Gripper Base Block */}
                  <mesh position={[0, 0.32, 0]} material={matBody}>
                    <boxGeometry args={[0.7, 0.15, 0.3]} />
                  </mesh>

                  {/* Left Articulated Gripper Jaw */}
                  <group ref={leftClawRef} position={[-0.2, 0.45, 0]}>
                    <mesh position={[0, 0.18, 0]} material={matDarkMetal}>
                      <boxGeometry args={[0.08, 0.38, 0.14]} />
                    </mesh>
                    <mesh position={[0.06, 0.42, 0]} rotation={[0, 0, -0.45]} material={matNeon}>
                      <boxGeometry args={[0.06, 0.25, 0.12]} />
                    </mesh>
                  </group>

                  {/* Right Articulated Gripper Jaw */}
                  <group ref={rightClawRef} position={[0.2, 0.45, 0]}>
                    <mesh position={[0, 0.18, 0]} material={matDarkMetal}>
                      <boxGeometry args={[0.08, 0.38, 0.14]} />
                    </mesh>
                    <mesh position={[-0.06, 0.42, 0]} rotation={[0, 0, 0.45]} material={matNeon}>
                      <boxGeometry args={[0.06, 0.25, 0.12]} />
                    </mesh>
                  </group>

                  {/* Levitating Quantum Core / Holographic Sensor Orb */}
                  <mesh ref={coreOrbRef} position={[0, 0.65, 0]}>
                    <icosahedronGeometry args={[0.18, 1]} />
                    <meshStandardMaterial
                      color={colors.laser}
                      emissive={colors.neonPrimary}
                      emissiveIntensity={isDark ? 1.5 : 1.2}
                      wireframe
                    />
                  </mesh>

                  {/* Laser Target Diode Beam */}
                  <mesh position={[0, 1.2, 0]} material={matNeon}>
                    <cylinderGeometry args={[0.008, 0.008, 1.0, 8]} />
                  </mesh>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 6. HOLOGRAPHIC TELEMETRY ORBITAL HUD RINGS               */}
      {/* ========================================================= */}
      <group ref={hudRingRef} position={[0, 0.2, 0]}>
        <mesh material={matWireGlow}>
          <torusGeometry args={[2.5, 0.015, 12, 48]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={matWireGlow}>
          <torusGeometry args={[2.8, 0.012, 12, 48]} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Floating sensory particle cloud around the robot.
 * Adapts to dark mode (cyan) and light mode (high contrast royal blue).
 */
function FloatingParticles({ count = 900, isDark }: { count?: number; isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const radius = Math.cbrt(Math.random()) * 3.5 + 2.0;
      const sinPhi = Math.sin(phi);

      coords[i * 3] = radius * sinPhi * Math.cos(theta);
      coords[i * 3 + 1] = radius * sinPhi * Math.sin(theta);
      coords[i * 3 + 2] = radius * Math.cos(phi);
    }
    return coords;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta * 0.02;
      pointsRef.current.rotation.y -= delta * 0.04;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#38bdf8" : "#1d4ed8"}
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
 * Responsive 3D Scene setup with smooth lighting and controls.
 */
function SceneContent({ isDark }: { isDark: boolean }) {
  const { viewport } = useThree();
  const responsiveScale = Math.min(Math.max(viewport.width / 5.2, 0.65), 1.05);

  return (
    <group scale={responsiveScale}>
      {/* Crisp studio key and rim lighting */}
      <ambientLight intensity={isDark ? 1.0 : 1.8} />

      <directionalLight
        position={[6, 8, 6]}
        intensity={isDark ? 2.2 : 2.8}
        color={isDark ? "#e0f2fe" : "#ffffff"}
      />

      <pointLight
        position={[-6, 4, -4]}
        intensity={isDark ? 1.8 : 2.0}
        color={isDark ? "#00f0ff" : "#2563eb"}
      />

      <pointLight
        position={[0, -4, 4]}
        intensity={isDark ? 1.2 : 1.5}
        color={isDark ? "#38bdf8" : "#1d4ed8"}
      />

      {/* Articulated Robotic Manipulator Model */}
      <RoboticManipulator isDark={isDark} />

      {/* Telemetry Particles */}
      <FloatingParticles isDark={isDark} />

      {/* Smooth OrbitControls with heavy damping for butter-smooth interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.6}
        maxPolarAngle={Math.PI / 2 + 0.3}
        minPolarAngle={Math.PI / 4}
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
          camera={{ position: [0, 0.4, 6.2], fov: 45 }}
          dpr={[1, 1.5]}
          frameloop="always"
          className="w-full h-full touch-none"
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
