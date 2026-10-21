import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Wrench,
  Brain,
  type LucideIcon,
} from "lucide-react";

export interface TechCategory {
  label: string;
  icon: LucideIcon;
  items: string[];
}

export const technologies: TechCategory[] = [
  {
    label: "Languages",
    icon: Code2,
    items: ["TypeScript", "JavaScript", "Python", "Go"],
  },
  {
    label: "Frontend",
    icon: Layout,
    items: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    label: "Backend",
    icon: Server,
    items: ["Node.js", "Spring Boot", "Express"],
  },
  {
    label: "Databases",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "Redis"],
  },
  {
    label: "DevOps",
    icon: Cloud,
    items: ["Docker", "Vercel", "GitHub Actions"],
  },
  { label: "AI / ML", icon: Brain, items: ["OpenAI API", "LangChain"] },
  { label: "Tools", icon: Wrench, items: ["Git", "Figma", "Postman"] },
];
