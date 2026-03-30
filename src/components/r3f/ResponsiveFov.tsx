import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";

export function ResponsiveFov() {
  const camera = useThree((s) => s.camera);
  const width = useThree((s) => s.size.width);

  useEffect(() => {
    if (camera instanceof PerspectiveCamera) {
      camera.fov = width < 768 ? 65 : 48;
      camera.updateProjectionMatrix();
    }
  }, [camera, width]);

  return null;
}
