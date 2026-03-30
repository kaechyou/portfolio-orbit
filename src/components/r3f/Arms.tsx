export function Arms() {
  return (
    <>
      {/* left arm */}
      <mesh position={[-0.36, 0.25, 0.26]} rotation={[-0.78, 0, -0.22]} castShadow>
        <capsuleGeometry args={[0.095, 0.36, 6, 16]} />
        <meshStandardMaterial color="#4a0c2e" roughness={0.85} />
      </mesh>
      <mesh position={[-0.36, 0.1, 0.46]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#c8956c" roughness={0.75} />
      </mesh>

      {/* right arm */}
      <mesh position={[0.36, 0.25, 0.26]} rotation={[-0.78, 0, 0.22]} castShadow>
        <capsuleGeometry args={[0.095, 0.36, 6, 16]} />
        <meshStandardMaterial color="#4a0c2e" roughness={0.85} />
      </mesh>
      <mesh position={[0.36, 0.1, 0.46]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#c8956c" roughness={0.75} />
      </mesh>
    </>
  );
}
