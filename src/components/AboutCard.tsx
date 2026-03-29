import { useTranslation } from "react-i18next";
import { OverlayCard } from "./OverlayCard";
import styles from "./AboutCard.module.css";

interface AboutCardProps {
  onClose: () => void;
  clickOrigin?: { x: number; y: number } | null;
}

export function AboutCard({ onClose, clickOrigin }: AboutCardProps) {
  const { t } = useTranslation();
  const accent = "#00d4ff";

  return (
    <OverlayCard onClose={onClose} clickOrigin={clickOrigin}>
      <div className={styles.cardInner} style={{ "--card-accent": accent } as React.CSSProperties}>
        <div className={styles.accentBar}
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}88)` }}
        />
        <div className={styles.body}>
          <div className={styles.header}>
            <h2 className={styles.title}>{t("about.title")}</h2>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t("about.bioTitle")}</h3>
            <p className={styles.bio}>{t("about.bio")}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t("about.techStackTitle")}</h3>
            <div className={styles.techGrid}>
              {(t("about.techStack", { returnObjects: true }) as string[]).map((tech) => (
                <span key={tech} className={styles.techItem}>{tech}</span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t("about.approachTitle")}</h3>
            <ul className={styles.approachList}>
              {(t("about.approach", { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </OverlayCard>
  );
}
