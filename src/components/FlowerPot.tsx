import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Group } from "three";

export default function FlowerPot() {
  const leafRef1 = useRef<Group>(null);
  const leafRef2 = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (leafRef1.current) leafRef1.current.rotation.z = Math.sin(t * 0.9) * 0.07;
    if (leafRef2.current) leafRef2.current.rotation.z = Math.sin(t * 0.9 + 1.1) * 0.07;
  });

  return (
    <Float speed={0.6} rotationIntensity={0.03} floatIntensity={0.1} floatingRange={[-0.02, 0.02]}>
      <group position={[1.6, -0.97, 0.9]}>
        {/* pot */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.15, 0.32, 24]} />
          <meshStandardMaterial color="#c2622a" roughness={0.8} metalness={0.04} />
        </mesh>

        {/* rim */}
        <mesh position={[0, 0.168, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.225, 0.037, 8, 24]} />
          <meshStandardMaterial color="#a84e1a" roughness={0.75} metalness={0.04} />
        </mesh>

        {/* soil */}
        <mesh position={[0, 0.142, 0]}>
          <cylinderGeometry args={[0.193, 0.193, 0.055, 20]} />
          <meshStandardMaterial color="#1e0e02" roughness={1.0} metalness={0.0} />
        </mesh>

        {/* stem */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.022, 0.028, 0.5, 8]} />
          <meshStandardMaterial color="#2e7d32" roughness={0.8} metalness={0.0} />
        </mesh>

        {/* left leaf */}
        <group ref={leafRef1} position={[-0.05, 0.44, 0]}>
          <mesh rotation={[0.15, 0.1, -0.55]} scale={[0.65, 1, 0.3]}>
            <sphereGeometry args={[0.16, 10, 8]} />
            <meshStandardMaterial color="#388e3c" roughness={0.75} metalness={0.0} />
          </mesh>
        </group>

        {/* right leaf */}
        <group ref={leafRef2} position={[0.05, 0.56, 0]}>
          <mesh rotation={[-0.1, -0.1, 0.55]} scale={[0.6, 1, 0.28]}>
            <sphereGeometry args={[0.14, 10, 8]} />
            <meshStandardMaterial color="#43a047" roughness={0.75} metalness={0.0} />
          </mesh>
        </group>

        {/* flower center */}
        <mesh position={[0, 0.685, 0]} castShadow>
          <sphereGeometry args={[0.068, 14, 14]} />
          <meshStandardMaterial
            color="#fdd835"
            roughness={0.35}
            emissive="#f9a825"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* petals */}
        {([0, 1, 2, 3, 4] as const).map((i) => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.13, 0.685, Math.sin(angle) * 0.13]}
              rotation={[0, -angle, 0.15]}
              scale={[0.9, 1, 0.5]}
              castShadow
            >
              <sphereGeometry args={[0.078, 10, 8]} />
              <meshStandardMaterial
                color="#f48fb1"
                roughness={0.45}
                emissive="#e91e63"
                emissiveIntensity={0.2}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}
