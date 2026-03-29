import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useEscapeKey } from "../hooks";
import { CloseButton } from './CloseButton';
import { Project } from "../types";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  projects: Project[];
  index: number;
  onNavigate: (i: number) => void;
  onClose: () => void;
  clickOrigin: { x: number; y: number } | null;
}

type NavPhase = 'idle' | 'exiting' | 'entering';

export default function ProjectCard({ projects, index, onNavigate, onClose, clickOrigin }: ProjectCardProps) {
  const total = projects.length;
  const [closing, setClosing] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [displayIndex, setDisplayIndex] = useState(index);
  const [navPhase, setNavPhase] = useState<NavPhase>('idle');
  const pendingIndex = useRef(index);
  const touchStartX = useRef(0);

  const project = projects[displayIndex];

  const originX = clickOrigin ? clickOrigin.x - window.innerWidth / 2 : 0;
  const originY = clickOrigin ? clickOrigin.y - window.innerHeight / 2 : 0;

  useEffect(() => {
    if (index === displayIndex) return;
    setLightboxIndex(null);
    pendingIndex.current = index;
    setNavPhase('exiting');
  }, [index, displayIndex]);

  const handleContentAnimEnd = () => {
    if (navPhase === 'exiting') {
      setDisplayIndex(pendingIndex.current);
      setNavPhase('entering');
    } else if (navPhase === 'entering') {
      setNavPhase('idle');
    }
  };

  const handleClose = useCallback(() => {
    if (closing) return;
    setNavPhase('idle');
    setClosing(true);
  }, [closing]);

  const navigatePrev = useCallback(() => onNavigate((index - 1 + total) % total), [index, total, onNavigate]);
  const navigateNext = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowRight") setLightboxIndex(i => i === null ? null : (i + 1) % project.screens.length);
        if (e.key === "ArrowLeft") setLightboxIndex(i => i === null ? null : (i - 1 + project.screens.length) % project.screens.length);
      } else {
        if (e.key === "ArrowLeft") navigatePrev();
        if (e.key === "ArrowRight") navigateNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, project.screens.length, navigatePrev, navigateNext]);

  useEscapeKey(handleClose, lightboxIndex === null);

  return (
    <div
      className={`${styles.overlay}${closing ? ` ${styles.closing}` : ''}`}
      onClick={handleClose}
    >
      {total > 1 && (
        <button
          className={`${styles.projectNav} ${styles.projectNavPrev}`}
          onClick={e => { e.stopPropagation(); navigatePrev(); }}
          aria-label="Previous project"
        >‹</button>
      )}

      <div className={styles.cardColumn} onClick={e => e.stopPropagation()}>
        <div
          className={`${styles.card}${closing ? ` ${styles.closing}` : ''}`}
          onAnimationEnd={(e) => { if (closing && e.target === e.currentTarget) onClose(); }}
          onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) {
              dx < 0 ? navigateNext() : navigatePrev();
            }
          }}
          style={{
            "--card-accent": project.accent,
            "--origin-x": `${originX}px`,
            "--origin-y": `${originY}px`,
          } as React.CSSProperties}
        >
          {/* <div className={styles.specular}></div> */}
          <CloseButton onClick={() => handleClose()} className={styles.closeBtn} />

          <div
            className={`${styles.content}${!closing && navPhase === 'exiting' ? ` ${styles.contentExiting}` : !closing && navPhase === 'entering' ? ` ${styles.contentEntering}` : ''}`}
            onAnimationEnd={(e) => { if (e.target === e.currentTarget) handleContentAnimEnd(); }}
          >
            <div className={styles.accentBar}
              style={{ background: `linear-gradient(90deg, ${project.accent}, ${project.accent}88)` }}
            />

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
                  <div className={styles.metaRow}>
                    <p className={styles.domains} style={{ color: project.accent }}>
                      {project.domains.join(" · ")}
                    </p>
                    <p className={styles.tech}>{project.tags.join(" · ")}</p>
                  </div>
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
                const screenTotal = project.screens.length;
                return createPortal(
                  <div className={styles.lightbox} onClick={() => setLightboxIndex(null)}>
                    <CloseButton onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }} className={styles.closeBtn} />
                    {screenTotal > 1 && (
                      <button
                        className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
                        onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + screenTotal) % screenTotal); }}
                        aria-label="Previous"
                      >‹</button>
                    )}
                    <img
                      src={screen.src}
                      alt={screen.label}
                      className={styles.lightboxImg}
                      onClick={(e) => e.stopPropagation()}
                    />
                    {screenTotal > 1 && (
                      <button
                        className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
                        onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % screenTotal); }}
                        aria-label="Next"
                      >›</button>
                    )}
                    <p className={styles.lightboxLabel}>{screen.label} <span className={styles.lightboxCounter}>{lightboxIndex + 1} / {screenTotal}</span></p>
                  </div>,
                  document.body,
                );
              })()}

            </div>
          </div>
        </div>

        {total > 1 && (
          <div className={styles.dots}>
            {projects.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot}${i === index ? ` ${styles.dotActive}` : ''}`}
                onClick={() => onNavigate(i)}
                aria-label={`Project ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {total > 1 && (
        <button
          className={`${styles.projectNav} ${styles.projectNavNext}`}
          onClick={e => { e.stopPropagation(); navigateNext(); }}
          aria-label="Next project"
        >›</button>
      )}
    </div>
  );
}
