import { useTranslation } from "react-i18next";
import { Project } from "../types";
import { projects } from "./projects";

export function useProjects(): Project[] {
  const { t } = useTranslation();

  return projects.map((p) => ({
    ...p,
    company: t(`projects.${p.id}.company`),
    subtitle: t(`projects.${p.id}.subtitle`),
    description: t(`projects.${p.id}.description`),
    screens: p.screens.map((s) => ({
      ...s,
      label: t(`projects.${p.id}.screens.${s.id}`),
    })),
  }));
}
