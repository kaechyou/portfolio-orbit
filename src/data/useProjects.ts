import { useTranslation } from "react-i18next";
import { Project } from "../types";
import { projects } from "./projects";

export function useProjects(): Project[] {
  const { t } = useTranslation();

  return projects.map((p) => ({
    ...p,
    title: t(`projects.${p.id}.title`),
    description: t(`projects.${p.id}.description`),
    screens: p.screens.map((s) => ({
      ...s,
      label: t(`projects.${p.id}.screens.${s.id}`),
    })),
  }));
}
