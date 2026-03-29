import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useEscapeKey } from "../hooks";
import {
  MousePointerIcon,
  MoveIcon,
  ZoomIcon,
  KeyboardIcon,
  SmartphoneIcon,
  HandIcon,
  ChevronDownIcon,
} from "./icons";
import styles from "./ControlsHint.module.css";

export default function ControlsHint() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEscapeKey(() => setExpanded(false), expanded);

  return (
    <div className={styles.controlsHint}>
      <button
        className={styles.toggle}
        onClick={() => setExpanded(!expanded)}
        aria-label={t("controls.toggle")}
      >
        <span className={styles.icon}>
          {isMobile ? <SmartphoneIcon /> : <MousePointerIcon />}
        </span>
        <span>{t("controls.title")}</span>
        <span className={`${styles.chevron}${expanded ? ` ${styles.rotated}` : ''}`}>
          <ChevronDownIcon rotated={expanded} />
        </span>
      </button>

      {expanded && (
        <div className={styles.panel}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <MousePointerIcon />
              <span>{t("controls.mouse")}</span>
            </div>
            <div className={styles.items}>
              <div className={styles.item}>
                <span className={styles.itemIcon}><MoveIcon /></span>
                <span className={styles.itemText}>{t("controls.rotate")}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.itemIcon}><ZoomIcon /></span>
                <span className={styles.itemText}>{t("controls.zoom")}</span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <KeyboardIcon />
              <span>{t("controls.character")}</span>
            </div>
            <div className={styles.items}>
              <div className={styles.item}>
                <div className={styles.keys}>
                  <kbd>W</kbd>
                  <kbd>A</kbd>
                  <kbd>S</kbd>
                  <kbd>D</kbd>
                </div>
                <span className={styles.itemText}>{t("controls.move")}</span>
              </div>
              <div className={styles.item}>
                <div className={styles.keys}>
                  <kbd>Space</kbd>
                </div>
                <span className={styles.itemText}>{t("controls.jump")}</span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <SmartphoneIcon />
              <span>{t("controls.touch")}</span>
            </div>
            <div className={styles.items}>
              <div className={styles.item}>
                <span className={styles.itemIcon}><HandIcon /></span>
                <span className={styles.itemText}>{t("controls.dragRotate")}</span>
              </div>
              <div className={styles.item}>
                <div className={styles.pinch}>
                  <span className={styles.pinchDot} />
                  <span className={styles.pinchLine} />
                  <span className={styles.pinchDot} />
                </div>
                <span className={styles.itemText}>{t("controls.pinchZoom")}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!expanded && (
        <div className={styles.collapsed}>
          {isMobile ? t("controls.hintTouch") : t("controls.hintMouse")}
        </div>
      )}
    </div>
  );
}
