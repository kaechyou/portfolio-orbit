import { useCallback, useState, type ReactNode } from "react";
import { useEscapeKey } from "../hooks";
import { CloseButton } from "./CloseButton";
import styles from "./OverlayCard.module.css";

interface OverlayCardProps {
  children: ReactNode;
  onClose: () => void;
  clickOrigin?: { x: number; y: number } | null;
  className?: string;
  closeButtonClassName?: string;
}

export function OverlayCard({
  children,
  onClose,
  clickOrigin = null,
  className = "",
  closeButtonClassName = "",
}: OverlayCardProps) {
  const [closing, setClosing] = useState(false);

  const originX = clickOrigin ? clickOrigin.x - window.innerWidth / 2 : 0;
  const originY = clickOrigin ? clickOrigin.y - window.innerHeight / 2 : 0;

  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
  }, [closing]);

  const handleAnimationEnd = useCallback(() => {
    if (closing) {
      onClose();
    }
  }, [closing, onClose]);

  useEscapeKey(handleClose);

  return (
    <div
      className={`${styles.overlay}${closing ? ` ${styles.closing}` : ""}`}
      onClick={handleClose}
    >
      <div className={styles.cardColumn} onClick={(e) => e.stopPropagation()}>
        <div
          className={`${styles.card}${closing ? ` ${styles.closing}` : ""}${className ? ` ${className}` : ""}`}
          onAnimationEnd={handleAnimationEnd}
          style={{
            "--origin-x": `${originX}px`,
            "--origin-y": `${originY}px`,
          } as React.CSSProperties}
        >
          <CloseButton
            onClick={handleClose}
            className={`${styles.closeBtn}${closeButtonClassName ? ` ${closeButtonClassName}` : ""}`}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
