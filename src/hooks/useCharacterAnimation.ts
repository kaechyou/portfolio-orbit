import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";

export function useCharacterAnimation(
  leftLegRef: React.RefObject<Group | null>,
  rightLegRef: React.RefObject<Group | null>,
  longHairRef: React.RefObject<Group | null>,
  isMovingRef: React.RefObject<boolean>
) {
  const walkTime = useRef(0);

  useFrame((_, delta) => {
    const moving = isMovingRef.current ?? false;

    if (moving) {
      walkTime.current += delta * 7;
      const swing = Math.sin(walkTime.current) * 0.55;
      if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;

      const backHairSwing = Math.sin(walkTime.current * 0.8) * 0.32;
      if (longHairRef.current) longHairRef.current.rotation.z = backHairSwing;
    } else {
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.12);
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.12);
      }
      if (longHairRef.current) {
        longHairRef.current.rotation.z = MathUtils.lerp(longHairRef.current.rotation.z, 0, 0.08);
      }
      walkTime.current = 0;
    }
  });
}
