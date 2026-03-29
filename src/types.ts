type Locale = "ru" | "en";
type LocalizedString = Record<Locale, string>;

interface ProjectScreen {
  label: LocalizedString;
  icon: string;
  src: string;
}

export interface Project {
  id: string;
  title: string;
  description: LocalizedString;
  domains: string[];
  tags: string[];
  accent: string;
  initials: string;
  logoColor: string;
  logo?: string;
  screens: ProjectScreen[];
}
