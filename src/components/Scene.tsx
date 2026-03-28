import { Sparkles, Grid } from "@react-three/drei";
import FloatingObject from "./FloatingObject";
import { projects } from "../data/projects";
import { Project } from "../types";

interface Props {
  onSelect: (project: Project, position: [number, number, number]) => void;
  targetPosition: [number, number, number] | null;
}

export default function Scene({ onSelect, targetPosition }: Props) {
  return (
    <>
      <directionalLight
        position={[6, 10, 4]}
        intensity={3.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />

      <pointLight position={[5, 2, -3]} intensity={2.5} color="#00d4ff" />
      <pointLight position={[-5, 1.5, 2]} intensity={1.6} color="#7c3aed" />
      <pointLight position={[0, -1, 0]} intensity={0.5} color="#001a33" />
      <ambientLight intensity={0.55} color="#8ab4ff" />

      {projects.map((project, i) => (
        <FloatingObject
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
          onSelect={onSelect}
        />
      ))}

      <Grid
        position={[0, -1.12, 0]}
        args={[40, 40]}
        cellSize={1}
        cellThickness={0.4}
        cellColor="#1c3053"
        sectionSize={5}
        sectionThickness={0.8}
        sectionColor="#edefef"
        fadeDistance={28}
        fadeStrength={2}
        infiniteGrid
      />

      <mesh position={[0, -1.13, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial
          color="#03060f"
          roughness={0.05}
          metalness={0.9}
          transparent
          opacity={0.95}
        />
      </mesh>

      <Sparkles
        count={50}
        scale={[3, 4, 3]}
        position={[0, 0.5, 0]}
        size={0.6}
        speed={0.3}
        opacity={0.6}
        color="#ffeac0"
        noise={1}
      />
    </>
  );
}
