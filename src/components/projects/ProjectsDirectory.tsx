"use client";

import { useState } from "react";
import { ProjectImage } from "./ProjectImage";
import Link from "next/link";
import { Search, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import type { Project } from "@/types/project";

interface Props {
  initialProjects: Project[];
}

export function ProjectsDirectory({ initialProjects }: Props) {
  const [query, setQuery] = useState("");

  const filtered = initialProjects.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      p.stack.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="py-6 space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          All Projects
        </h1>

        <div className="relative w-full sm:max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]"
          />
          <input
            type="text"
            placeholder="Search Projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#222222] rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-sm text-[#737373]">
          No projects matched &quot;{query}&quot;
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((project, index) => {
            const isLive = Boolean(project.liveUrl);

            return (
              <div
                key={project.slug}
                className="group flex flex-col justify-between"
              >
                <div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block relative aspect-video w-full rounded-lg overflow-hidden border border-[#222222] bg-[#0A0A0A] mb-3 group-hover:border-[#374151] transition-colors"
                  >
                    <ProjectImage
                      src={project.image}
                      alt={project.title}
                      loading="eager"
                      priority={index < 2}
                      imageExists={project.imageExists}
                      className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      {isLive ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/80 backdrop-blur-sm text-white border border-[#333333]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/80 backdrop-blur-sm text-[#A3A3A3] border border-[#2A2A2A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                          In Development
                        </span>
                      )}
                    </div>
                  </Link>

                  <h3 className="text-base font-semibold text-white tracking-tight">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="hover:underline underline-offset-2"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <div className="text-xs text-[#A3A3A3] font-mono mt-0.5 mb-2">
                    {project.stack.slice(0, 4).join(" / ")}
                  </div>

                  <p className="text-sm text-[#A3A3A3] line-clamp-2 leading-relaxed">
                    {project.description || project.summary}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-white pt-3 mt-2">
                  {isLive && project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
                    >
                      <ExternalLink size={12} />
                      Live Preview
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity text-[#A3A3A3] hover:text-white"
                    >
                      <GithubIcon size={12} />
                      Repo Url
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-[#A3A3A3] hover:text-white ml-auto"
                  >
                    Case Study
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
