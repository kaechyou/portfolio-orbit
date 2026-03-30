import { useRef } from "react";
import { Group } from "three";
import { useCharacterMovement, useCharacterAnimation } from "../hooks";
import { Torso, Head, Arms, Laptop, Legs } from "./r3f";

export default function Character() {
  const groupRef = useRef<Group>(null);
  const leftLegRef = useRef<Group>(null);
  const rightLegRef = useRef<Group>(null);
  const longHairRef = useRef<Group>(null);
  const isMovingRef = useRef(false);

  useCharacterMovement(groupRef, isMovingRef);
  useCharacterAnimation(leftLegRef, rightLegRef, longHairRef, isMovingRef);

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* screen glow */}
      <pointLight
        position={[0, 0.05, 0.6]}
        intensity={1.6}
        color="#6ab4ff"
        distance={1.6}
        decay={2}
      />

      <Torso />
      <Head longHairRef={longHairRef} />
      <Arms />
      <Laptop />
      <Legs leftLegRef={leftLegRef} rightLegRef={rightLegRef} />
    </group>
  );
}
