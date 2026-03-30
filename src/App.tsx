import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { SceneReady, ResponsiveFov } from "./components/r3f";
import Scene from "./components/Scene";
import LanguageSwitcher from './components/LanguageSwitcher';
import { CloseButton } from './components/CloseButton';
import HeroIntro from "./components/HeroIntro";
import ControlsHint from "./components/ControlsHint";
import { Project } from "./types";
import { useProjects } from "./hooks";
import ProjectCard from "./components/ProjectCard";
import { ContactCard } from "./components/ContactCard";
import { AboutCard } from "./components/AboutCard";
import styles from "./App.module.css";

export default function App() {
  const { t } = useTranslation();
  const projects = useProjects();
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [clickOrigin, setClickOrigin] = useState<{ x: number; y: number } | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  function handleSelect(project: Project, _position: [number, number, number], origin: { x: number; y: number }) {
    const idx = projects.findIndex(p => p.id === project.id);
    setSelectedIndex(idx);
    setClickOrigin(origin);
  }

  function handleNavigate(i: number) {
    setSelectedIndex(i);
    setClickOrigin(null);
  }

  function handleFocusWork() {
    setMenuOpen(false);
    setSelectedIndex(0);
    setClickOrigin(null);
  }

  function handleClose() {
    setSelectedIndex(null);
    setClickOrigin(null);
  }

  function handleFocusAbout() {
    setMenuOpen(false);
    setAboutOpen(true);
    setContactOpen(false);
    setSelectedIndex(null);
  }

  function handleCloseAbout() {
    setAboutOpen(false);
  }

  function handleFocusContact() {
    setMenuOpen(false);
    setContactOpen(true);
    setAboutOpen(false);
    setSelectedIndex(null);
  }

  function handleCloseContact() {
    setContactOpen(false);
  }

  return (
    <div className={styles.appRoot}>
      <header className={styles.siteHeader}>
        <span className={styles.siteName}>
          {t('common.portfolio')}
        </span>
        <nav className={styles.siteNav}>
          <a href="#about" onClick={(e) => { e.preventDefault(); handleFocusAbout(); }}>{t('nav.about')}</a>
          <a href="#projects" onClick={handleFocusWork}>{t('nav.work')}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleFocusContact(); }}>{t('nav.contact')}</a>
          <LanguageSwitcher />
          <button className={styles.burgerBtn} onClick={() => setMenuOpen(true)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className={styles.mobileNavOverlay} onClick={() => setMenuOpen(false)}>
          <CloseButton onClick={(e) => { e?.stopPropagation(); setMenuOpen(false); }} className={styles.closeBtn} ariaLabel="Close menu" />
          <a href="#about" onClick={(e) => { e.preventDefault(); handleFocusAbout(); setMenuOpen(false); }}>{t('nav.about')}</a>
          <a href="#projects" onClick={handleFocusWork}>{t('nav.work')}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleFocusContact(); setMenuOpen(false); }}>{t('nav.contact')}</a>
        </div>
      )}

      {!ready && <div className={styles.sceneLoader}>◆</div>}

      <div className={`${styles.canvasWrapper}${ready ? ` ${styles.ready}` : ''}`}>
        <Canvas
          camera={{ position: [0, 3, 9], fov: 48 }}
          gl={{ antialias: true, alpha: false }}
          shadows
        >
          <color attach="background" args={["#05080f"]} />
          <fog attach="fog" args={["#05080f", 18, 38]} />

          <Suspense fallback={null}>
            <Scene onSelect={handleSelect} />
            <SceneReady onReady={() => setReady(true)} />
            <ResponsiveFov />
            <EffectComposer>
              <Bloom
                intensity={0.9}
                luminanceThreshold={0.55}
                luminanceSmoothing={0.85}
                mipmapBlur
              />
              <Vignette eskil={false} offset={0.15} darkness={0.65} />
            </EffectComposer>
          </Suspense>

          <OrbitControls
            makeDefault
            enablePan={false}
            minDistance={4}
            maxDistance={14}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.1}
            autoRotate
            autoRotateSpeed={0.35}
          />
        </Canvas>

        {selectedIndex !== null && (
          <ProjectCard
            projects={projects}
            index={selectedIndex}
            onNavigate={handleNavigate}
            onClose={handleClose}
            clickOrigin={clickOrigin}
          />
        )}

        {aboutOpen && <AboutCard onClose={handleCloseAbout} />}

        {contactOpen && <ContactCard onClose={handleCloseContact} />}

        {selectedIndex === null && (
          <>
            <HeroIntro ready={ready} />
            <ControlsHint />
          </>
        )}
      </div>
    </div>
  );
}
