import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, AdditiveBlending } from "three";

export function RisingParticles() {
  const pointsRef = useRef<Points>(null);
  const count = 80;

  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const r = Math.random() * 10 + 2;
    const theta = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(theta) * r;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = Math.sin(theta) * r;
    speeds[i] = 0.004 + Math.random() * 0.006;
  }

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      pos.setY(i, pos.getY(i) + speeds[i]);
      if (pos.getY(i) > 5) {
        const r = Math.random() * 10 + 2;
        const theta = Math.random() * Math.PI * 2;
        pos.setX(i, Math.cos(theta) * r);
        pos.setY(i, -4);
        pos.setZ(i, Math.sin(theta) * r);
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#00d4ff"
        transparent
        opacity={0.55}
        blending={AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
