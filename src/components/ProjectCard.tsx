import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useEscapeKey } from "../hooks";
import { CloseButton } from './CloseButton';
import { Project } from "../types";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  onClose: () => void;
  clickOrigin: { x: number; y: number } | null;
}

export default function ProjectCard({ project, onClose, clickOrigin }: ProjectCardProps) {
  const [closing, setClosing] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const originX = clickOrigin ? clickOrigin.x - window.innerWidth / 2 : 0;
  const originY = clickOrigin ? clickOrigin.y - window.innerHeight / 2 : 0;

  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
  }, [closing]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => i === null ? null : (i + 1) % project.screens.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => i === null ? null : (i - 1 + project.screens.length) % project.screens.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, project.screens.length]);

  useEscapeKey(handleClose, lightboxIndex === null);

  return (
    <div
      className={`${styles.overlay}${closing ? ` ${styles.closing}` : ''}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.card}${closing ? ` ${styles.closing}` : ''}`}
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={() => { if (closing) onClose(); }}
        style={{
          "--card-accent": project.accent,
          "--origin-x": `${originX}px`,
          "--origin-y": `${originY}px`,
        } as React.CSSProperties}
      >
        <div
          className={styles.accentBar}
          style={{ background: `linear-gradient(90deg, ${project.accent}, ${project.accent}88)` }}
        />

        <CloseButton onClick={() => handleClose()} className={styles.closeBtn} />

        <div className={styles.body}>
          <div className={styles.header}>
            {project.logo ? (
              <img
                className={styles.logo}
                src={project.logo}
                alt=""
                style={{ borderColor: `${project.accent}44`, background: `${project.accent}08` }}
              />
            ) : (
              <div
                className={styles.initials}
                style={{
                  color: project.logoColor,
                  borderColor: `${project.accent}44`,
                  background: `${project.accent}12`,
                }}
              >
                {project.initials}
              </div>
            )}
            <div>
              <h2 className={styles.title}>{project.company}</h2>
              <p className={styles.subtitle}>{project.subtitle}</p>
              <p className={styles.domains} style={{ color: project.accent }}>
                {project.domains.join(" · ")}
              </p>
            </div>
          </div>

          <ul className={styles.description}>
            {project.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <div className={styles.screens}>
            {project.screens.map((screen, i) => (
              <figure
                key={screen.label}
                className={styles.screenThumb}
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={screen.src}
                  alt={screen.label}
                  className={styles.screenImg}
                  loading="lazy"
                />
                <figcaption className={styles.screenLabel}>{screen.label}</figcaption>
              </figure>
            ))}
          </div>

          {lightboxIndex !== null && (() => {
            const screen = project.screens[lightboxIndex];
            const total = project.screens.length;
            return createPortal(
              <div className={styles.lightbox} onClick={() => setLightboxIndex(null)}>
                <CloseButton onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }} className={styles.closeBtn} />
                {total > 1 && (
                  <button
                    className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + total) % total); }}
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
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % total); }}
                    aria-label="Next"
                  >›</button>
                )}
                <p className={styles.lightboxLabel}>{screen.label} <span className={styles.lightboxCounter}>{lightboxIndex + 1} / {total}</span></p>
              </div>,
              document.body,
            );
          })()}

          <p className={styles.tech}>{project.tags.join(" · ")}</p>
        </div>
      </div>
    </div>
  );
}
