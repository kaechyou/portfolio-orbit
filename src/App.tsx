import { Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Scene from "./components/Scene";
import LanguageSwitcher from "./components/LanguageSwitcher";
import HeroIntro from "./components/HeroIntro";
import { PerspectiveCamera } from "three";
import { Project } from "./types";
import ProjectCard from "./components/ProjectCard";

function SceneReady({ onReady }: { onReady: () => void }) {
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

function ResponsiveFov() {
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

export default function App() {
  const { t } = useTranslation();
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [targetPosition, setTargetPosition] = useState<[number, number, number] | null>(null);

  function handleSelect(project: Project, position: [number, number, number]) {
    setSelectedProject(project);
    setTargetPosition(position);
  }

  function handleClose() {
    setSelectedProject(null);
    setTargetPosition(null);
  }

  return (
    <div className="app-root">
      <header className="site-header">
        <span className="site-name">
          {t('common.portfolio')}
        </span>
        <nav className="site-nav">
          <a href="#about">{t('nav.about')}</a>
          <a href="#projects">{t('nav.work')}</a>
          <a href="#contact">{t('nav.contact')}</a>
          <LanguageSwitcher />
          <button className="burger-btn" onClick={() => setMenuOpen(true)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMenuOpen(false)}>
          <button className="mobile-nav-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <span /><span />
          </button>
          <a href="#about" onClick={() => setMenuOpen(false)}>{t('nav.about')}</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>{t('nav.work')}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</a>
        </div>
      )}

      {!ready && <div className="scene-loader">◆</div>}

      <div className={`canvas-wrapper${ready ? " ready" : ""}`}>
        <Canvas
          camera={{ position: [0, 3, 9], fov: 48 }}
          gl={{ antialias: true, alpha: false }}
          shadows
        >
          <color attach="background" args={["#05080f"]} />
          <fog attach="fog" args={["#05080f", 18, 38]} />

          <Suspense fallback={null}>
            <Scene onSelect={handleSelect} targetPosition={targetPosition} />
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

        {selectedProject && (
          <ProjectCard project={selectedProject} onClose={handleClose} />
        )}

        {!selectedProject && (
          <>
            <HeroIntro />
            <div className="hint-label">{t('common.hint')}</div>
          </>
        )}
      </div>
    </div>
  );
}

