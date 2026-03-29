interface ProjectScreen {
  label: string;
  icon: string;
  src: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  domains: string[];
  tags: string[];
  accent: string;
  initials: string;
  logoColor: string;
  logo?: string;
  screens: ProjectScreen[];
}
