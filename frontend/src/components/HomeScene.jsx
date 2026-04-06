import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ============================
   PARTICLE FIELD
   ============================ */
function ParticleField({ scrollRef }) {
  const meshRef = useRef();
  const count = 1200;

  const [positions, basePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 7;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
    }
    return [pos, base];
  }, []);

  const colorA = useMemo(() => new THREE.Color("#f59e0b"), []);
  const colorB = useMemo(() => new THREE.Color("#06b6d4"), []);
  const colorC = useMemo(() => new THREE.Color("#a855f7"), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const posAttr = meshRef.current.geometry.attributes.position;
    const sp = scrollRef.current;

    // Color
    const col = new THREE.Color();
    if (sp < 0.4) col.lerpColors(colorA, colorB, sp / 0.4);
    else if (sp < 0.7) col.lerpColors(colorB, colorC, (sp - 0.4) / 0.3);
    else col.copy(colorC);
    meshRef.current.material.color.copy(col);

    for (let i = 0; i < count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      const speed = 0.1 + (i % 5) * 0.02;
      posAttr.array[i * 3] = bx + Math.sin(t * speed + i) * 0.3;
      posAttr.array[i * 3 + 1] = by + Math.cos(t * speed * 0.7 + i * 0.5) * 0.25;
      posAttr.array[i * 3 + 2] = bz + Math.sin(t * speed * 0.5 + i * 0.3) * 0.2;
    }
    posAttr.needsUpdate = true;
    meshRef.current.rotation.y = t * 0.02 + sp * Math.PI * 0.3;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#f59e0b"
        transparent opacity={0.6}
        sizeAttenuation depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ============================
   FLOATING SHAPES
   ============================ */
function FloatingShape({ position, geometry, index }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15 + index;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1 + index * 0.5;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={position}>
        {geometry}
        <meshBasicMaterial color="#ffffff" transparent opacity={0.06} wireframe depthWrite={false} />
      </mesh>
    </Float>
  );
}

/* ============================
   EXPORT
   ============================ */
export default function HomeScene({ scrollRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <ParticleField scrollRef={scrollRef} />
      <FloatingShape position={[-4, 2, -3]} geometry={<icosahedronGeometry args={[1, 1]} />} index={0} />
      <FloatingShape position={[4, -1, -5]} geometry={<octahedronGeometry args={[0.8]} />} index={1} />
      <FloatingShape position={[-2, -3, -2]} geometry={<torusGeometry args={[0.7, 0.2, 8, 16]} />} index={2} />
      <FloatingShape position={[3, 3, -4]} geometry={<dodecahedronGeometry args={[0.6]} />} index={3} />
    </Canvas>
  );
}
