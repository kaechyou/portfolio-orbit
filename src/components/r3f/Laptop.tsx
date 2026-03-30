export function Laptop() {
  return (
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
  );
}
