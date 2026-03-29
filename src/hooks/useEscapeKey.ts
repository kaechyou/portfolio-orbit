import { useEffect, useCallback } from "react";

export function useEscapeKey(
  onEscape: () => void,
  enabled: boolean = true
): void {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && enabled) {
        onEscape();
      }
    },
    [enabled, onEscape]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
