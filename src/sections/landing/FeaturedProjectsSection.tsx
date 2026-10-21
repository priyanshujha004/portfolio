import Link from "next/link";
import { Section } from "@/components/foundation/Section";
import { FeaturedProjects } from "@/components/project/FeaturedProjects";
import { getFeaturedProjects } from "@/lib/mdx";
import { Reveal } from "@/components/shared/Reveal";

export function FeaturedProjectsSection() {
  const projects = getFeaturedProjects();

  return (
    <Section index="03" label="Featured Projects">
      <Reveal>
        <div className="mb-6 flex justify-end">
          <Link
            href="/projects"
            className="link-underline font-mono text-xs text-accent"
          >
            View all projects →
          </Link>
        </div>
        <FeaturedProjects projects={projects} />
      </Reveal>
    </Section>
  );
}
