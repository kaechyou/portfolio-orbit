import { useTranslation } from "react-i18next";
import { Project } from "../types";
import { projects } from "../data/projects";

export function useProjects(): Project[] {
  const { t } = useTranslation();

  return projects.map((p) => ({
    ...p,
    company: t(`projects.${p.id}.company`),
    subtitle: t(`projects.${p.id}.subtitle`),
    description: t(`projects.${p.id}.description`, { returnObjects: true }) as string[],
    screens: p.screens.map((s) => ({
      ...s,
      label: t(`projects.${p.id}.screens.${s.id}`),
    })),
  }));
}
