import { getAllProjects } from "@/lib/mdx";
import { ProjectsDirectory } from "@/components/projects/ProjectsDirectory";
import { profile } from "@/data/profile";

export const metadata = {
  title: "Projects",
  description: `Production systems, open-source software, and distributed architectures built by ${profile.name}.`,
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return <ProjectsDirectory initialProjects={projects} />;
}
