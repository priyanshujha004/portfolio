import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/foundation/icons/BrandIcons";
import type { Project } from "@/types/project";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-subtle border border-border p-4 transition-colors duration-200 hover:border-accent">
      <Link href={`/projects/${project.slug}`}>
        <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-subtle border border-border">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
        <h3 className="font-body font-semibold text-text-primary group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mb-3 font-body text-sm text-text-muted">
          {project.summary}
        </p>
      </Link>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-subtle border border-border px-2 py-0.5 font-mono text-[10px] text-text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 font-mono text-xs text-accent">
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            Live <ArrowUpRight size={12} />
          </Link>
        )}
        {project.repoUrl && (
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <GithubIcon size={12} /> Repo
          </Link>
        )}
      </div>
    </div>
  );
}
