import { Project } from "../types";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectCard({ project, onClose }: Props) {
  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="project-card"
        onClick={(e) => e.stopPropagation()}
        style={{ "--card-accent": project.accent } as React.CSSProperties}
      >
        <div
          className="card-accent-bar"
          style={{ background: `linear-gradient(90deg, ${project.accent}, ${project.accent}88)` }}
        />

        <button className="close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

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

          <p className="card-description">{project.description}</p>

          <div className="card-screens">
            {project.screens.map((screen) => (
              <figure key={screen.label} className="screen-thumb">
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

          <p className="card-tech">{project.tags.join(" · ")}</p>
        </div>
      </div>
    </div>
  );
}
