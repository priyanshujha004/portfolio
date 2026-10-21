"use client";

import { useSearch } from "@/hooks/useSearch";
import { getAllStackTags } from "@/lib/mdx";
import { SearchBar } from "@/components/ui/SearchBar";
import { Filters } from "./Filters";
import { ProjectRow } from "@/components/project/ProjectRow";
import { EmptyState } from "@/components/shared/EmptyState";
import type { Project } from "@/types/project";

export function ProjectsList({ projects }: { projects: Project[] }) {
  const { query, setQuery, activeFilter, setActiveFilter, results } = useSearch(
    projects,
    { keys: ["title", "summary", "stack"], threshold: 0.35 },
    "stack"
  );
  const allTags = getAllStackTags(projects);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Filters
          tags={allTags}
          active={activeFilter}
          onSelect={setActiveFilter}
        />
        <div className="w-full md:w-64">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      {results.length === 0 ? (
        <EmptyState message="No projects match your search." />
      ) : (
        <div>
          {results.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      )}
      <p className="pt-10 text-center font-mono text-xs text-text-muted">
        — End of archive —
      </p>
    </div>
  );
}
