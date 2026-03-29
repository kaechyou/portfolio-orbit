import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Scene from "./components/Scene";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { Project } from "./types";

export default function App() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [targetPosition, setTargetPosition] = useState<[number, number, number] | null>(null);

  function handleSelect(project: Project, position: [number, number, number]) {
    setSelectedProject(project);
    setTargetPosition(position);
  }

  return (
    <div className="app-root">
      <header className="site-header">
        <span className="site-name">
          <span>◆</span> {t('common.portfolio')}
        </span>
        <nav className="site-nav">
          <a href="#about">{t('nav.about')}</a>
          <a href="#projects">{t('nav.work')}</a>
          <a href="#contact">{t('nav.contact')}</a>
          <LanguageSwitcher />
        </nav>
      </header>

      <div className="canvas-wrapper">
        <Canvas
          camera={{ position: [0, 3, 9], fov: 48 }}
          gl={{ antialias: true, alpha: false }}
          shadows
        >
          <color attach="background" args={["#05080f"]} />
          <fog attach="fog" args={["#05080f", 18, 38]} />

          <Suspense fallback={null}>
            <Scene onSelect={handleSelect} targetPosition={targetPosition} />
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

        {!selectedProject && (
          <div className="hint-label">{t('common.hint')}</div>
        )}
      </div>
    </div>
  );
}

