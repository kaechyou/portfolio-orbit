import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useEscapeKey } from "../hooks";
import { CloseButton } from './CloseButton';
import { Project } from "../types";

interface Props {
  project: Project;
  onClose: () => void;
  clickOrigin: { x: number; y: number } | null;
}

export default function ProjectCard({ project, onClose, clickOrigin }: Props) {
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
      className={`overlay${closing ? " overlay--closing" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`project-card${closing ? " project-card--closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={() => { if (closing) onClose(); }}
        style={{
          "--card-accent": project.accent,
          "--origin-x": `${originX}px`,
          "--origin-y": `${originY}px`,
        } as React.CSSProperties}
      >
        <div
          className="card-accent-bar"
          style={{ background: `linear-gradient(90deg, ${project.accent}, ${project.accent}88)` }}
        />

        <CloseButton onClick={() => handleClose()} className="close-btn" />

        <div className="card-body">
          <div className="card-header">
            {project.logo ? (
              <img
                className="card-logo"
                src={project.logo}
                alt=""
                style={{ borderColor: `${project.accent}44`, background: `${project.accent}08` }}
              />
            ) : (
              <div
                className="card-initials"
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
              <h2 className="card-title">{project.company}</h2>
              <p className="card-subtitle">{project.subtitle}</p>
              <p className="card-domains" style={{ color: project.accent }}>
                {project.domains.join(" · ")}
              </p>
            </div>
          </div>

          <ul className="card-description">
            {project.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <div className="card-screens">
            {project.screens.map((screen, i) => (
              <figure
                key={screen.label}
                className="screen-thumb"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={screen.src}
                  alt={screen.label}
                  className="screen-img"
                  loading="lazy"
                />
                <figcaption className="screen-label">{screen.label}</figcaption>
              </figure>
            ))}
          </div>

          {lightboxIndex !== null && (() => {
            const screen = project.screens[lightboxIndex];
            const total = project.screens.length;
            return createPortal(
              <div className="lightbox" onClick={() => setLightboxIndex(null)}>
                <CloseButton onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }} className="close-btn" />
                {total > 1 && (
                  <button
                    className="lightbox-nav lightbox-nav--prev"
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + total) % total); }}
                    aria-label="Previous"
                  >‹</button>
                )}
                <img
                  src={screen.src}
                  alt={screen.label}
                  className="lightbox-img"
                  onClick={(e) => e.stopPropagation()}
                />
                {total > 1 && (
                  <button
                    className="lightbox-nav lightbox-nav--next"
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % total); }}
                    aria-label="Next"
                  >›</button>
                )}
                <p className="lightbox-label">{screen.label} <span className="lightbox-counter">{lightboxIndex + 1} / {total}</span></p>
              </div>,
              document.body,
            );
          })()}

          <p className="card-tech">{project.tags.join(" · ")}</p>
        </div>
      </div>
    </div>
  );
}
