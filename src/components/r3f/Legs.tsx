import { RefObject } from "react";
import { Group } from "three";

interface LegsProps {
  leftLegRef: RefObject<Group | null>;
  rightLegRef: RefObject<Group | null>;
}

export function Legs({ leftLegRef, rightLegRef }: LegsProps) {
  return (
    <>
      {/* left leg + sneaker */}
      <group ref={leftLegRef} position={[-0.15, -0.7, 0]}>
        <mesh position={[0, -0.14, 0]} castShadow>
          <capsuleGeometry args={[0.11, 0.28, 6, 16]} />
          <meshStandardMaterial color="#4a0c2e" roughness={0.85} />
        </mesh>
        <mesh position={[-0.01, -0.38, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.095, 0.14, 6, 16]} />
          <meshStandardMaterial color="#e8e8f0" roughness={0.7} />
        </mesh>
      </group>

      {/* right leg + sneaker */}
      <group ref={rightLegRef} position={[0.15, -0.7, 0]}>
        <mesh position={[0, -0.14, 0]} castShadow>
          <capsuleGeometry args={[0.11, 0.28, 6, 16]} />
          <meshStandardMaterial color="#4a0c2e" roughness={0.85} />
        </mesh>
        <mesh position={[0.01, -0.38, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.095, 0.14, 6, 16]} />
          <meshStandardMaterial color="#e8e8f0" roughness={0.7} />
        </mesh>
      </group>
    </>
  );
}
