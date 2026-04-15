import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, OrthographicCamera, ContactShadows, PresentationControls } from "@react-three/drei";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";

/* ============================
   SCROLL-DRIVEN SPATIAL SHAPES
   ============================ */

function CentralCore({ scrollYProgress }) {
  const meshRef = useRef();
  const matRef = useRef();

  useFrame(() => {
    if (!meshRef.current || !matRef.current || !scrollYProgress) return;

    // Get the current scroll progress directly
    const progress = scrollYProgress.get() || 0;

    // Scale mapping [0, 0.25, 0.5, 0.75, 1] -> [0, 1.2, 1, 0.8, 1.5]
    let scale = 0;
    if (progress <= 0.25) scale = THREE.MathUtils.lerp(0.01, 1.2, progress / 0.25);
    else if (progress <= 0.5) scale = THREE.MathUtils.lerp(1.2, 1, (progress - 0.25) / 0.25);
    else if (progress <= 0.75) scale = THREE.MathUtils.lerp(1, 0.8, (progress - 0.5) / 0.25);
    else scale = THREE.MathUtils.lerp(0.8, 1.5, (progress - 0.75) / 0.25);

    meshRef.current.scale.setScalar(scale);

    // Rotation
    meshRef.current.rotation.y = progress * Math.PI * 4;
    meshRef.current.rotation.x = progress * Math.PI * 2;

    // Color mapping
    const colPhase1 = new THREE.Color("#f59e0b");
    const colPhase2 = new THREE.Color("#06b6d4");
    const colPhase3 = new THREE.Color("#a855f7");

    const col = new THREE.Color();
    if (progress <= 0.5) {
      col.lerpColors(colPhase1, colPhase2, progress / 0.5);
    } else {
      col.lerpColors(colPhase2, colPhase3, (progress - 0.5) / 0.5);
    }
    matRef.current.color.copy(col);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial ref={matRef} wireframe={true} wireframeLinewidth={2} roughness={0.2} metalness={0.8} />
    </mesh>
  );
}

function OrbitingNode({ scrollYProgress, targetProgress, index, type }) {
  const groupRef = useRef();
  const meshRef = useRef();

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current || !scrollYProgress) return;

    let progress = scrollYProgress.get() || 0;

    // Mapping X: [targetProgress - 0.25, targetProgress, targetProgress + 0.25] -> [...]
    let p = (progress - (targetProgress - 0.25)) / 0.5; // normalized 0 to 1 inside the window
    p = Math.max(0, Math.min(1, p)); // clamp

    const startX = index % 2 === 0 ? -10 : 10;
    const midX = index % 2 === 0 ? -2 : 2;
    const endX = index % 2 === 0 ? -15 : 15;

    let currentX = 0;
    if (p <= 0.5) currentX = THREE.MathUtils.lerp(startX, midX, p * 2);
    else currentX = THREE.MathUtils.lerp(midX, endX, (p - 0.5) * 2);

    const startZ = index > 1 ? -10 : 10;
    const midZ = index > 1 ? -1 : 1;
    const endZ = index > 1 ? -15 : 15;

    let currentZ = 0;
    if (p <= 0.5) currentZ = THREE.MathUtils.lerp(startZ, midZ, p * 2);
    else currentZ = THREE.MathUtils.lerp(midZ, endZ, (p - 0.5) * 2);

    const currentRotY = progress * Math.PI * index;

    groupRef.current.position.setX(currentX);
    groupRef.current.position.setZ(currentZ);
    groupRef.current.rotation.y = currentRotY;

    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.015;
  });

  const getGeometry = () => {
    switch (type) {
      case "box": return <boxGeometry args={[0.8, 0.8, 0.8]} />;
      case "torus": return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case "octahedron": return <octahedronGeometry args={[0.6]} />;
      default: return <sphereGeometry args={[0.5, 32, 32]} />;
    }
  };

  const getColor = () => {
    if (targetProgress <= 0.25) return "#f59e0b"; // amber for phase 1
    if (targetProgress <= 0.5) return "#06b6d4";  // cyan for phase 2
    return "#a855f7"; // purple for phase 3
  };

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef} castShadow receiveShadow>
          {getGeometry()}
          <meshPhysicalMaterial color={getColor()} roughness={0.1} metalness={0.5} clearcoat={1} />
        </mesh>
      </Float>
    </group>
  );
}

function DraggableShape({ initialPosition, color, type }) {
  const [active, setActive] = useState(false);
  const [{ x, y }, set] = useState({ x: initialPosition[0], y: initialPosition[1] });
  const bind = useDrag(({ offset: [ox, oy] }) => set({ x: ox / 50 + initialPosition[0], y: -oy / 50 + initialPosition[1] }));

  const getGeometry = () => {
    switch (type) {
      case "torusKnot": return <torusKnotGeometry args={[0.4, 0.1, 100, 16]} />;
      case "cylinder": return <cylinderGeometry args={[0.3, 0.3, 1, 32]} />;
      default: return <dodecahedronGeometry args={[0.5]} />;
    }
  };

  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(x, y, initialPosition[2]);
      const targetScale = active ? 1.2 : 1;
      // Simple manual lerp for hover scale could be done, but we'll just snap for now
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      {...bind()}
      onClick={() => setActive(!active)}
      onPointerOver={() => { document.body.style.cursor = 'grab'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      castShadow
      receiveShadow
    >
      {getGeometry()}
      <meshPhysicalMaterial color={color} transmission={0.9} thickness={0.5} roughness={0} />
    </mesh>
  );
}

/* ============================
   SCENE ASSEMBLY
   ============================ */
export default function HomeScene({ progress }) {
  // Using an orthographic camera and presentation controls to create that sleek isometric feel
  return (
    <Canvas shadows gl={{ antialias: true, alpha: true }} style={{ pointerEvents: 'auto' }}>
      <OrthographicCamera makeDefault position={[5, 5, 5]} zoom={80} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-10, 10, -10]} intensity={1} color="#f59e0b" />

      {/* Wrapping the main story items in presentation controls so the user can slightly twirl the scene like a toy */}
      <PresentationControls
        global={false}
        cursor={true}
        snap={true}
        speed={1}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <group position={[0, -1, 0]}>
          <CentralCore scrollYProgress={progress} />

          {/* Phase 1 Nodes (Create) */}
          <OrbitingNode scrollYProgress={progress} targetProgress={0.25} index={0} type="box" />
          <OrbitingNode scrollYProgress={progress} targetProgress={0.25} index={1} type="torus" />

          {/* Phase 2 Nodes (Protect) */}
          <OrbitingNode scrollYProgress={progress} targetProgress={0.5} index={2} type="octahedron" />
          <OrbitingNode scrollYProgress={progress} targetProgress={0.5} index={3} type="sphere" />

          {/* Phase 3 Nodes (Conquer) */}
          <OrbitingNode scrollYProgress={progress} targetProgress={0.75} index={4} type="box" />
          <OrbitingNode scrollYProgress={progress} targetProgress={0.75} index={5} type="torus" />

          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        </group>
      </PresentationControls>

      {/* Interactive loose items floating around just like Bezel's blobs */}
      <DraggableShape initialPosition={[-4, 2, -2]} color="#10b981" type="dodecahedron" />
      <DraggableShape initialPosition={[4, -3, 1]} color="#f43f5e" type="torusKnot" />
      <DraggableShape initialPosition={[-3, -2, 3]} color="#3b82f6" type="cylinder" />

      <Environment preset="city" />
    </Canvas>
  );
}