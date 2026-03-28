import { Canvas } from "@react-three/fiber";

export default function App() {

  return (
    <div className="app-root">
      <header className="site-header">
        <span className="site-name">
          <span>◆</span> Portfolio
        </span>
        <nav className="site-nav">
          <a href="#about">About</a>
          <a href="#projects">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <div className="canvas-wrapper">
        <Canvas
          camera={{ position: [0, 3, 9], fov: 48 }}
          gl={{ antialias: true, alpha: false }}
          shadows
        >

        </Canvas>

      </div>

    </div>
  );
}
