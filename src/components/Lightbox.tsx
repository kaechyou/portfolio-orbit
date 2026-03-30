import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseButton } from "./CloseButton";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  screens: { src: string; label: string }[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ screens, index, onClose, onNavigate }: LightboxProps) {
  const total = screens.length;
  const screen = screens[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % total);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onClose, onNavigate]);

  return createPortal(
    <div className={styles.lightbox} onClick={onClose}>
      <CloseButton
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className={styles.closeBtn}
      />
      {total > 1 && (
        <button
          className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
          onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + total) % total); }}
          aria-label="Previous"
        >‹</button>
      )}
      <img
        src={screen.src}
        alt={screen.label}
        className={styles.lightboxImg}
        onClick={(e) => e.stopPropagation()}
      />
      {total > 1 && (
        <button
          className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
          onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % total); }}
          aria-label="Next"
        >›</button>
      )}
      <p className={styles.lightboxLabel}>
        {screen.label}{" "}
        <span className={styles.lightboxCounter}>{index + 1} / {total}</span>
      </p>
    </div>,
    document.body,
  );
}
