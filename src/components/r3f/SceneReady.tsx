import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function SceneReady({ onReady }: { onReady: () => void }) {
  const called = useRef(false);
  const frame = useRef(0);

  useFrame(() => {
    if (called.current) return;
    frame.current++;
    if (frame.current >= 3) {
      called.current = true;
      onReady();
    }
  });

  return null;
}
