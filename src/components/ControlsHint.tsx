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
    <div className={`controls-hint ${expanded ? "expanded" : ""}`}>
      <button
        className="controls-hint__toggle"
        onClick={() => setExpanded(!expanded)}
        aria-label={t("controls.toggle")}
      >
        <span className="controls-hint__icon">
          {isMobile ? <SmartphoneIcon /> : <MousePointerIcon />}
        </span>
        <span className="controls-hint__title">{t("controls.title")}</span>
        <span className={`controls-hint__chevron ${expanded ? "rotated" : ""}`}>
          <ChevronDownIcon rotated={expanded} />
        </span>
      </button>

      {expanded && (
        <div className="controls-hint__panel">
          {/* mouse */}
          <div className="controls-hint__section">
            <div className="controls-hint__section-header">
              <MousePointerIcon />
              <span>{t("controls.mouse")}</span>
            </div>
            <div className="controls-hint__items">
              <div className="controls-hint__item">
                <span className="controls-hint__item-icon"><MoveIcon /></span>
                <span className="controls-hint__item-text">
                  {t("controls.rotate")}
                </span>
              </div>
              <div className="controls-hint__item">
                <span className="controls-hint__item-icon"><ZoomIcon /></span>
                <span className="controls-hint__item-text">
                  {t("controls.zoom")}
                </span>
              </div>
            </div>
          </div>

          {/* character */}
          <div className="controls-hint__section">
            <div className="controls-hint__section-header">
              <KeyboardIcon />
              <span>{t("controls.character")}</span>
            </div>
            <div className="controls-hint__items">
              <div className="controls-hint__item">
                <div className="controls-hint__keys">
                  <kbd>W</kbd>
                  <kbd>A</kbd>
                  <kbd>S</kbd>
                  <kbd>D</kbd>
                </div>
                <span className="controls-hint__item-text">
                  {t("controls.move")}
                </span>
              </div>
              <div className="controls-hint__item">
                <div className="controls-hint__keys">
                  <kbd>Space</kbd>
                </div>
                <span className="controls-hint__item-text">
                  {t("controls.jump")}
                </span>
              </div>
            </div>
          </div>

          {/* touch */}
          <div className="controls-hint__section">
            <div className="controls-hint__section-header">
              <SmartphoneIcon />
              <span>{t("controls.touch")}</span>
            </div>
            <div className="controls-hint__items">
              <div className="controls-hint__item">
                <span className="controls-hint__item-icon"><HandIcon /></span>
                <span className="controls-hint__item-text">
                  {t("controls.dragRotate")}
                </span>
              </div>
              <div className="controls-hint__item">
                <div className="controls-hint__pinch">
                  <span className="controls-hint__pinch-dot" />
                  <span className="controls-hint__pinch-line" />
                  <span className="controls-hint__pinch-dot" />
                </div>
                <span className="controls-hint__item-text">
                  {t("controls.pinchZoom")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!expanded && (
        <div className="controls-hint__collapsed">
          <span className="controls-hint__collapsed-text">
            {isMobile ? t("controls.hintTouch") : t("controls.hintMouse")}
          </span>
        </div>
      )}
    </div>
  );
}
