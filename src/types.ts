interface ProjectScreen {
  label: string;
  icon: string;
  src: string;
}

export interface Project {
  id: string;
  company: string;
  subtitle: string;
  description: string;
  domains: string[];
  tags: string[];
  accent: string;
  initials: string;
  logoColor: string;
  logo?: string;
  screens: ProjectScreen[];
}
