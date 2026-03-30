import { RefObject } from "react";
import { Group } from "three";

interface HeadProps {
  longHairRef: RefObject<Group | null>;
}

export function Head({ longHairRef }: HeadProps) {
  return (
    <>
      {/* neck */}
      <mesh position={[0, 0.535, 0]}>
        <capsuleGeometry args={[0.1, 0.07, 6, 16]} />
        <meshStandardMaterial color="#c8956c" roughness={0.75} />
      </mesh>

      {/* head */}
      <mesh position={[0, 0.82, 0]} castShadow>
        <sphereGeometry args={[0.305, 32, 32]} />
        <meshStandardMaterial color="#d4956a" roughness={0.7} />
      </mesh>

      {/* hair */}
      {/* top cap */}
      <mesh position={[0, 1.01, -0.04]}>
        <sphereGeometry args={[0.29, 32, 32]} />
        <meshStandardMaterial color="#6b3a1f" roughness={0.88} />
      </mesh>
      {/* long back hair */}
      <group ref={longHairRef} position={[0, 0.795, -0.16]}>
        <mesh position={[0, -0.195, -0.2]} rotation={[0.18, 0, 0]}>
          <capsuleGeometry args={[0.22, 0.55, 8, 20]} />
          <meshStandardMaterial color="#6b3a1f" roughness={0.88} />
        </mesh>
      </group>
      {/* side hair */}
      <mesh position={[-0.25, 0.75, -0.06]} rotation={[0, 0, 0.22]}>
        <capsuleGeometry args={[0.09, 0.3, 6, 12]} />
        <meshStandardMaterial color="#6b3a1f" roughness={0.88} />
      </mesh>
      <mesh position={[0.25, 0.75, -0.06]} rotation={[0, 0, -0.22]}>
        <capsuleGeometry args={[0.09, 0.3, 6, 12]} />
        <meshStandardMaterial color="#6b3a1f" roughness={0.88} />
      </mesh>

      {/* eyebrows */}
      <mesh position={[-0.1, 0.93, 0.286]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.013, 0.072, 4, 8]} />
        <meshStandardMaterial color="#3a1a08" roughness={0.8} />
      </mesh>
      <mesh position={[0.1, 0.93, 0.286]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.013, 0.072, 4, 8]} />
        <meshStandardMaterial color="#3a1a08" roughness={0.8} />
      </mesh>

      {/* eyes */}
      <mesh position={[-0.1, 0.842, 0.28]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color="#4a2c1a" roughness={0.3} />
      </mesh>
      <mesh position={[0.1, 0.842, 0.28]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color="#4a2c1a" roughness={0.3} />
      </mesh>

      {/* glasses */}
      {/* left lens tinted glass */}
      <mesh position={[-0.1, 0.842, 0.298]}>
        <circleGeometry args={[0.063, 20]} />
        <meshStandardMaterial
          color="#5090cc"
          roughness={0.0}
          metalness={0.0}
          transparent
          opacity={0.28}
        />
      </mesh>
      {/* left lens rim */}
      <mesh position={[-0.1, 0.842, 0.3]}>
        <torusGeometry args={[0.065, 0.011, 8, 24]} />
        <meshStandardMaterial color="#c0a080" roughness={0.15} metalness={0.8} />
      </mesh>

      {/* right lens tinted glass */}
      <mesh position={[0.1, 0.842, 0.298]}>
        <circleGeometry args={[0.063, 20]} />
        <meshStandardMaterial
          color="#5090cc"
          roughness={0.0}
          metalness={0.0}
          transparent
          opacity={0.28}
        />
      </mesh>
      {/* right lens rim */}
      <mesh position={[0.1, 0.842, 0.3]}>
        <torusGeometry args={[0.065, 0.011, 8, 24]} />
        <meshStandardMaterial color="#c0a080" roughness={0.15} metalness={0.8} />
      </mesh>

      {/* bridge */}
      <mesh position={[0, 0.842, 0.302]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.006, 0.056, 4, 8]} />
        <meshStandardMaterial color="#c0a080" roughness={0.15} metalness={0.8} />
      </mesh>

      {/* smile */}
      <mesh position={[-0.02, 0.754, 0.295]} rotation={[0, 0, Math.PI / 2 - 0.7]}>
        <capsuleGeometry args={[0.009, 0.05, 4, 8]} />
        <meshStandardMaterial color="#b06040" roughness={0.7} />
      </mesh>
      <mesh position={[0.02, 0.754, 0.295]} rotation={[0, 0, Math.PI / 2 + 0.7]}>
        <capsuleGeometry args={[0.009, 0.05, 4, 8]} />
        <meshStandardMaterial color="#b06040" roughness={0.7} />
      </mesh>
    </>
  );
}
