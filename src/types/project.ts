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
  category?: string;
  status?: string;
  architecture?: string;
  metrics?: ProjectMetric[];
  image: string;
  images?: string[];
  imageExists?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}
