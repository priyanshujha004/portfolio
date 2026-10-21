export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  order?: number;
  title: string;
  summary: string;
  description?: string;
  stack: string[];
  architecture?: string;
  metrics?: ProjectMetric[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}
