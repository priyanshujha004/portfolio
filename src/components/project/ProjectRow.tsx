import Image from "next/image";
import Link from "next/link";
import { ProjectMetrics } from "./ProjectMetrics";
import { ProjectLinks } from "./ProjectLinks";
import type { Project } from "@/types/project";

export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 border-b border-border py-8 md:gap-8 md:py-10 md:grid-cols-[1fr_1.2fr]">
      <Link
        href={`/projects/${project.slug}`}
        className="relative aspect-[16/10] overflow-hidden rounded-subtle border border-border"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 45vw, 90vw"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-col justify-between">
        <div>
          <p className="mb-2 font-mono text-xs text-accent">
            {String(index + 1).padStart(2, "0")}
          </p>
          <Link href={`/projects/${project.slug}`}>
            <h3 className="mb-3 font-display text-2xl text-text-primary hover:text-accent">
              {project.title}
            </h3>
          </Link>
          <p className="mb-4 font-body text-sm text-text-muted">
            {project.description ?? project.summary}
          </p>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-subtle border border-border px-2 py-0.5 font-mono text-[10px] text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.architecture && (
            <p className="mb-4 font-body text-sm text-text-muted">
              <span className="font-mono text-[11px] uppercase text-accent">
                Architecture —{" "}
              </span>
              {project.architecture}
            </p>
          )}
          {project.metrics && <ProjectMetrics metrics={project.metrics} />}
        </div>
        <div className="mt-6">
          <ProjectLinks liveUrl={project.liveUrl} repoUrl={project.repoUrl} />
        </div>
      </div>
    </div>
  );
}
