import { MetadataLabel } from "@/components/foundation/MetadataLabel";
import type { Project } from "@/types/project";

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <div>
      <MetadataLabel label="Project Archive" className="mb-3" />
      <h1 className="mb-2 font-display text-3xl text-text-primary md:text-4xl">
        {project.title}
      </h1>
      <p className="font-body text-text-muted">{project.summary}</p>
    </div>
  );
}
