import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils, Vector3 } from "three";

const SPEED = 3;
const BOUNDS = 8;
const JUMP_FORCE = 8;
const GRAVITY = 20;

export function useCharacterMovement(
  groupRef: React.RefObject<Group | null>,
  isMovingRef: React.RefObject<boolean>
) {
  const keys = useRef<Record<string, boolean>>({});
  const facingAngle = useRef(0);
  const camForward = useRef(new Vector3());
  const camRight = useRef(new Vector3());
  const velocityY = useRef(0);
  const isGrounded = useRef(true);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
      if (e.key === " " && isGrounded.current) {
        velocityY.current = JUMP_FORCE;
        isGrounded.current = false;
      }
    };
    const onUp = (e: KeyboardEvent) => { keys.current[e.key] = false; };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    state.camera.getWorldDirection(camForward.current);
    camForward.current.y = 0;
    camForward.current.normalize();
    camRight.current.crossVectors(camForward.current, { x: 0, y: 1, z: 0 } as Vector3).normalize();

    const k = keys.current;
    let moveX = 0;
    let moveZ = 0;
    if (k["ArrowUp"] || k["w"]) { moveX += camForward.current.x; moveZ += camForward.current.z; }
    if (k["ArrowDown"] || k["s"]) { moveX -= camForward.current.x; moveZ -= camForward.current.z; }
    if (k["ArrowRight"] || k["d"]) { moveX += camRight.current.x; moveZ += camRight.current.z; }
    if (k["ArrowLeft"] || k["a"]) { moveX -= camRight.current.x; moveZ -= camRight.current.z; }

    const moving = moveX !== 0 || moveZ !== 0;
    isMovingRef.current = moving;

    if (!isGrounded.current) {
      velocityY.current -= GRAVITY * delta;
      groupRef.current.position.y += velocityY.current * delta;

      if (groupRef.current.position.y <= 0.1) {
        groupRef.current.position.y = 0.1;
        velocityY.current = 0;
        isGrounded.current = true;
      }
    }

    if (moving) {
      const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
      moveX /= len;
      moveZ /= len;
      groupRef.current.position.x = MathUtils.clamp(
        groupRef.current.position.x + moveX * SPEED * delta, -BOUNDS, BOUNDS
      );
      groupRef.current.position.z = MathUtils.clamp(
        groupRef.current.position.z + moveZ * SPEED * delta, -BOUNDS, BOUNDS
      );
      facingAngle.current = Math.atan2(moveX, moveZ);
    }

    if (isGrounded.current) {
      groupRef.current.position.y = 0.1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.05;
    }

    if (moving) {
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y, facingAngle.current, 0.15
      );
    } else {
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y,
        facingAngle.current + Math.sin(state.clock.elapsedTime * 0.3) * 0.14,
        0.05
      );
    }
  });
}
