import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils, Vector3 } from "three";

const SPEED = 3;
const BOUNDS = 8;
const JUMP_FORCE = 8;
const GRAVITY = 20;

export default function Character() {
  const groupRef = useRef<Group>(null);
  const leftLegRef = useRef<Group>(null);
  const rightLegRef = useRef<Group>(null);
  const longHairRef = useRef<Group>(null);
  const keys = useRef<Record<string, boolean>>({});
  const facingAngle = useRef(0);
  const walkTime = useRef(0);
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

    if (moving) {
      walkTime.current += delta * 7;
      const swing = Math.sin(walkTime.current) * 0.55;
      if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;

      const backHairSwing = Math.sin(walkTime.current * 0.8) * 0.32;
      if (longHairRef.current) longHairRef.current.rotation.z = backHairSwing;
    } else {
      if (leftLegRef.current)
        leftLegRef.current.rotation.x = MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.12);
      if (rightLegRef.current)
        rightLegRef.current.rotation.x = MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.12);

      if (longHairRef.current)
        longHairRef.current.rotation.z = MathUtils.lerp(longHairRef.current.rotation.z, 0, 0.08);
    }
  });

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

      {/* torso */}
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.34, 0.6, 8, 24]} />
        <meshStandardMaterial color="#4a0c2e" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.17, 0.19, 0.13, 20]} />
        <meshStandardMaterial color="#3d0a26" roughness={0.85} />
      </mesh>

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

      {/* arms */}
      <mesh position={[-0.36, 0.25, 0.26]} rotation={[-0.78, 0, -0.22]} castShadow>
        <capsuleGeometry args={[0.095, 0.36, 6, 16]} />
        <meshStandardMaterial color="#4a0c2e" roughness={0.85} />
      </mesh>
      <mesh position={[-0.36, 0.1, 0.46]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#c8956c" roughness={0.75} />
      </mesh>
      <mesh position={[0.36, 0.25, 0.26]} rotation={[-0.78, 0, 0.22]} castShadow>
        <capsuleGeometry args={[0.095, 0.36, 6, 16]} />
        <meshStandardMaterial color="#4a0c2e" roughness={0.85} />
      </mesh>
      <mesh position={[0.36, 0.1, 0.46]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#c8956c" roughness={0.75} />
      </mesh>

      {/* laptop */}
      <group position={[0, 0.05, 0.62]} rotation={[0, Math.PI, 0]}>
        {/* base */}
        <mesh castShadow>
          <boxGeometry args={[0.62, 0.034, 0.42]} />
          <meshStandardMaterial color="#b2b2ba" roughness={0.12} metalness={0.88} />
        </mesh>
        {/* keyboard deck */}
        <mesh position={[0, 0.019, 0]}>
          <boxGeometry args={[0.56, 0.003, 0.36]} />
          <meshStandardMaterial color="#1e1e24" roughness={0.65} />
        </mesh>
        {/* trackpad */}
        <mesh position={[0, 0.02, 0.1]}>
          <boxGeometry args={[0.18, 0.002, 0.11]} />
          <meshStandardMaterial color="#2a2a32" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* hinge pivot at back edge */}
        <group position={[0, 0.017, -0.21]}>
          <group rotation={[-Math.PI / 2 - 0.38, 0, 0]}>
            {/* lid shell */}
            <mesh position={[0, 0, 0.21]}>
              <boxGeometry args={[0.62, 0.028, 0.42]} />
              <meshStandardMaterial color="#b2b2ba" roughness={0.12} metalness={0.88} />
            </mesh>
            {/* screen */}
            <mesh position={[0, -0.016, 0.21]}>
              <boxGeometry args={[0.56, 0.005, 0.36]} />
              <meshStandardMaterial
                color="#0d1a3a"
                roughness={0.05}
                emissive="#3a6fff"
                emissiveIntensity={1.6}
              />
            </mesh>
            {/* screen bright highlight */}
            <mesh position={[0, -0.018, 0.21]}>
              <boxGeometry args={[0.34, 0.004, 0.2]} />
              <meshStandardMaterial
                color="#5a9fff"
                emissive="#7abfff"
                emissiveIntensity={2.0}
                roughness={0.05}
              />
            </mesh>
          </group>
        </group>
      </group>

      {/* legs + sneakers */}
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
    </group>
  );
}
