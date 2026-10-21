import { getAllProjects } from "@/lib/mdx";
import { ProjectsHero } from "@/sections/projects/ProjectsHero";
import { ProjectsList } from "@/sections/projects/ProjectsList";
import { Section } from "@/components/foundation/Section";

export const metadata = {
  title: "Projects — Priyanshu Jha",
  description: "A collection of systems designed, built, and shipped.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Section>
      <ProjectsHero />
      <ProjectsList projects={projects} />
    </Section>
  );
}
