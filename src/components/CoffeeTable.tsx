import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Mesh } from "three";

const WISP_COUNT = 3;
const BASE_Y = 0.625;
const RISE = 0.28;
const PHASES = [0, 0.38, 0.7];

function SteamWisps() {
  const refs = [useRef<Mesh>(null), useRef<Mesh>(null), useRef<Mesh>(null)];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < WISP_COUNT; i++) {
      const mesh = refs[i].current;
      if (!mesh) continue;
      const progress = ((t * 0.38 + PHASES[i]) % 1);
      mesh.position.y = BASE_Y + progress * RISE;
      mesh.position.x = Math.sin(t * 1.8 + i * 2.1) * 0.025;
      const opacity = Math.sin(progress * Math.PI) * 0.28;
      (mesh.material as any).opacity = opacity;
    }
  });

  return (
    <>
      {refs.map((ref, i) => (
        <mesh key={i} ref={ref} scale={[0.018, 0.06, 0.018]}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0} roughness={1} depthWrite={false} />
        </mesh>
      ))}
    </>
  );
}

export default function CoffeeTable() {
  return (
    <Float speed={0.4} rotationIntensity={0.02} floatIntensity={0.06} floatingRange={[-0.01, 0.01]}>
      <group position={[-1.85, -1.13, 0.55]}>
        {/* tabletop */}
        <mesh position={[0, 0.37, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.055, 0.55]} />
          <meshStandardMaterial
            color="#6b3a1f"
            roughness={0.55}
            metalness={0.05}
          />
        </mesh>

        {/* lower shelf */}
        <mesh position={[0, 0.11, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.78, 0.04, 0.38]} />
          <meshStandardMaterial
            color="#5a3018"
            roughness={0.6}
            metalness={0.05}
          />
        </mesh>

        {/* 4 legs */}
        {([
          [-0.44, 0.17, -0.22],
          [-0.44, 0.17, 0.22],
          [0.44, 0.17, -0.22],
          [0.44, 0.17, 0.22],
        ] as [number, number, number][]).map((pos, i) => (
          <mesh key={i} position={pos} castShadow>
            <cylinderGeometry args={[0.022, 0.022, 0.34, 10]} />
            <meshStandardMaterial
              color="#4a2810"
              roughness={0.65}
              metalness={0.05}
            />
          </mesh>
        ))}

        {/* coffee mug - tabletop surface at y=0.3975, mug center at y=0.51 */}
        <group position={[-0.1, 0, 0.05]}>
          {/* outer */}
          <mesh position={[0, 0.51, 0]} castShadow>
            <cylinderGeometry args={[0.11, 0.093, 0.22, 28]} />
            <meshStandardMaterial color="#e8e0d8" roughness={0.55} metalness={0.0} />
          </mesh>

          {/* inner */}
          <mesh position={[0, 0.525, 0]}>
            <cylinderGeometry args={[0.088, 0.088, 0.195, 24]} />
            <meshStandardMaterial color="#1a0f08" roughness={1.0} metalness={0.0} side={1} />
          </mesh>

          {/* coffee */}
          <mesh position={[0, 0.617, 0]}>
            <cylinderGeometry args={[0.082, 0.082, 0.008, 24]} />
            <meshStandardMaterial
              color="#3b1a08"
              roughness={0.9}
              metalness={0.0}
              emissive="#1a0800"
              emissiveIntensity={0.4}
            />
          </mesh>

          {/* steam */}
          <SteamWisps />

          {/* handle*/}
          <mesh position={[0.17, 0.51, 0]} castShadow>
            <torusGeometry args={[0.075, 0.02, 10, 24]} />
            <meshStandardMaterial color="#d4ccc4" roughness={0.55} metalness={0.0} />
          </mesh>
        </group>

        {/* shadow */}
        <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.1, 0.65]} />
          <meshStandardMaterial color="#000010" transparent opacity={0.18} roughness={1} />
        </mesh>
      </group>
    </Float>
  );
}
