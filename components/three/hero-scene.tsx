"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

const PALETTE = {
  light: { primary: "#2563eb", accent2: "#7c3aed" },
  dark: { primary: "#3b82f6", accent2: "#a78bfa" },
} as const;

function DistortedKnot({ color }: { color: string }) {
  const meshRef = React.useRef<THREE.Mesh>(null);

  const pointerLean = React.useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.x += delta * 0.04;

    // Gently lean toward the pointer instead of snapping to it.
    pointerLean.current.x += (state.pointer.y * 0.25 - pointerLean.current.x) * 0.02;
    pointerLean.current.y += (state.pointer.x * 0.35 - pointerLean.current.y) * 0.02;
    meshRef.current.rotation.x += pointerLean.current.x * delta;
    meshRef.current.rotation.y += pointerLean.current.y * delta;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[2.3, -0.2, -1]} scale={0.85}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.35}
          distort={0.28}
          speed={1.4}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  const { resolvedTheme } = useTheme();
  const palette = resolvedTheme === "dark" ? PALETTE.dark : PALETTE.light;

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color={palette.accent2} />
      <DistortedKnot color={palette.primary} />
      <Sparkles
        count={50}
        scale={[8, 5, 4]}
        size={2}
        speed={0.25}
        opacity={0.35}
        color={palette.accent2}
      />
    </>
  );
}

export default function HeroScene({ inView = true }: { inView?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={inView ? "always" : "never"}
    >
      <Scene />
    </Canvas>
  );
}
