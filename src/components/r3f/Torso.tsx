export function Torso() {
  return (
    <>
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.34, 0.6, 8, 24]} />
        <meshStandardMaterial color="#4a0c2e" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.17, 0.19, 0.13, 20]} />
        <meshStandardMaterial color="#3d0a26" roughness={0.85} />
      </mesh>
    </>
  );
}
