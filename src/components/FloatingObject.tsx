import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Float, Text, Image, RoundedBox } from "@react-three/drei";
import { Mesh, Color } from "three";
import { Project } from "../types";

interface Props {
  project: Project;
  index: number;
  total: number;
  onSelect: (project: Project, position: [number, number, number]) => void;
}

export default function FloatingObject({ project, index, total, onSelect }: Props) {
  const cardRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!project.logo) {
      setImageLoaded(false);
      return;
    }

    const img = document.createElement('img');
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
    img.src = project.logo;
  }, [project.logo]);

  const angle = (index / total) * Math.PI * 2;
  const radius = 3.2;
  const heights = [0.6, -0.1, 0.4, -0.3, 0.5, -0.2];
  const height = heights[index % heights.length];

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  useFrame(() => {
    if (cardRef.current) {
      const target = hovered ? 1.06 : 1.0;
      cardRef.current.scale.x += (target - cardRef.current.scale.x) * 0.12;
      cardRef.current.scale.y += (target - cardRef.current.scale.y) * 0.12;
      cardRef.current.scale.z += (target - cardRef.current.scale.z) * 0.12;

      const mat = (cardRef.current as Mesh).material as any;
      if (mat) {
        const targetEmissive = hovered ? 0.55 : 0.25;
        mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.12;
      }
    }
    if (glowRef.current) {
      const mat = (glowRef.current as Mesh).material as any;
      if (mat) {
        const targetOpacity = hovered ? 0.35 : 0.0;
        mat.opacity += (targetOpacity - mat.opacity) * 0.1;
      }
    }
  });

  const accentColor = new Color(project.accent);

  return (
    <Float
      speed={1.2 + index * 0.15}
      rotationIntensity={0.12}
      floatIntensity={0.35}
      floatingRange={[-0.1, 0.1]}
    >
      <Billboard
        position={[x, height, z]}
        follow
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <group
          onClick={(e) => {
            e.stopPropagation();
            onSelect(project, [x, height, z]);
          }}
          onPointerOver={() => {
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
        >
          <RoundedBox ref={cardRef} args={[1.6, 1.05, 0.055]} radius={0.075} smoothness={4} castShadow>
            <meshPhysicalMaterial
              color="#0c1830"
              roughness={0.06}
              metalness={0.25}
              transparent
              opacity={0.72}
              emissive={accentColor}
              emissiveIntensity={0.22}
            />
          </RoundedBox>

          {/* top accent bar */}
          <RoundedBox args={[1.53, 0.075, 0.007]} radius={0.03} smoothness={3} position={[0, 0.47, 0.03]}>
            <meshStandardMaterial
              color={project.accent}
              emissive={project.accent}
              emissiveIntensity={1.8}
              roughness={0.05}
            />
          </RoundedBox>

          {/* logo */}
          {imageLoaded && project.logo ? (
            <Image
              url={project.logo}
              position={[-0.56, 0.19, 0.035]}
              scale={[0.22, 0.22]}
              transparent
              toneMapped={false}
            />
          ) : null}

          {/* fallback initials */}
          {!imageLoaded && (
            <Text
              position={[-0.56, 0.30, 0.035]}
              fontSize={0.15}
              color={project.logoColor || project.accent}
              anchorX="center"
              anchorY="top"
              font={undefined}
            >
              {project.initials || project.company.slice(0, 2).toUpperCase()}
            </Text>
          )}

          {/* company name */}
          <Text
            position={[-0.36, 0.33, 0.035]}
            fontSize={0.12}
            color="#e2ecf8"
            anchorX="left"
            anchorY="top"
            maxWidth={1.0}
            font={undefined}
          >
            {project.company}
          </Text>

          {/* subtitle */}
          <Text
            position={[-0.36, 0.16, 0.035]}
            fontSize={0.078}
            color="#b8c8de"
            anchorX="left"
            anchorY="top"
            maxWidth={1.1}
            font={undefined}
          >
            {project.subtitle}
          </Text>

          {/* divider */}
          <mesh position={[0, -0.07, 0.03]}>
            <boxGeometry args={[1.2, 0.003, 0.001]} />
            <meshStandardMaterial
              color={project.accent}
              emissive={project.accent}
              emissiveIntensity={1.5}
              transparent
              opacity={0.35}
              roughness={0.05}
            />
          </mesh>

          {/* domains */}
          <Text
            position={[0, -0.19, 0.035]}
            fontSize={0.08}
            color="#c8d8f0"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.04}
            font={undefined}
          >
            {project.domains.slice(0, 3).join("  ·  ")}
          </Text>

          {/* tags */}
          <Text
            position={[0, -0.33, 0.035]}
            fontSize={0.072}
            color="#b8c8de"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.03}
            font={undefined}
          >
            {project.tags.slice(0, 3).join("  ·  ")}
          </Text>

          {/* hover glow border */}
          <RoundedBox ref={glowRef} args={[1.68, 1.13, 0.04]} radius={0.085} smoothness={4} position={[0, 0, -0.005]}>
            <meshStandardMaterial
              color={project.accent}
              emissive={project.accent}
              emissiveIntensity={1.0}
              transparent
              opacity={0.0}
              roughness={0.1}
            />
          </RoundedBox>
        </group>
      </Billboard>
    </Float>
  );
}
