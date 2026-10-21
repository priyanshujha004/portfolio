import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/mdx";
import { Section } from "@/components/foundation/Section";
import { Container } from "@/components/foundation/Container";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectMetrics } from "@/components/project/ProjectMetrics";
import { ProjectLinks } from "@/components/project/ProjectLinks";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const project = getProjectBySlug(params.slug);
    return {
      title: `${project.title} — Priyanshu Jha`,
      description: project.summary,
    };
  } catch {
    return {};
  }
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let project;
  try {
    project = getProjectBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <Section>
      <Container className="max-w-3xl">
        <ProjectHeader project={project!} />
        <div className="relative my-8 aspect-[16/9] overflow-hidden rounded-subtle border border-border">
          <Image
            src={project!.image}
            alt={project!.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mb-6 flex flex-wrap gap-1.5">
          {project!.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-subtle border border-border px-2 py-0.5 font-mono text-[10px] text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
        {project!.architecture && (
          <p className="mb-6 font-body text-sm text-text-muted">
            <span className="font-mono text-[11px] uppercase text-accent">
              Architecture —{" "}
            </span>
            {project!.architecture}
          </p>
        )}
        {project!.metrics && <ProjectMetrics metrics={project!.metrics} />}
        <article className="prose prose-neutral mt-8 max-w-none font-body text-text-primary prose-headings:font-display prose-a:text-accent">
          <MDXRemote source={project!.content} />
        </article>
        <div className="mt-8">
          <ProjectLinks liveUrl={project!.liveUrl} repoUrl={project!.repoUrl} />
        </div>
      </Container>
    </Section>
  );
}
