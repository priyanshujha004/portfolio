import { ProjectImage } from "@/components/projects/ProjectImage";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import type { Project } from "@/types/project";

interface Props {
  projects: Project[];
}

export function FeaturedProjectsSection({ projects }: Props) {
  return (
    <section className="py-8 border-t border-[#1F1F1F]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Featured Projects
        </h2>
        <Link
          href="/projects"
          className="text-xs font-medium text-[#A3A3A3] hover:text-white transition-colors flex items-center gap-1 group"
        >
          View All Projects
          <ArrowRight
            size={13}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>

      {/* 2-Column Grid matching Ayushworks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, index) => {
          const isLive = Boolean(project.liveUrl);

          return (
            <div
              key={project.slug}
              className="group flex flex-col justify-between"
            >
              <div>
                {/* Single Image Card - No Carousel in listing */}
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
                  {/* Status Badge in corner */}
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

                {/* Project Title */}
                <h3 className="text-base font-semibold text-white tracking-tight">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:underline underline-offset-2"
                  >
                    {project.title}
                  </Link>
                </h3>

                {/* Tech Stack */}
                <div className="text-xs text-[#A3A3A3] font-mono mt-0.5 mb-2">
                  {project.stack.slice(0, 4).join(" / ")}
                </div>

                {/* Summary / Description */}
                <p className="text-sm text-[#A3A3A3] line-clamp-2 leading-relaxed">
                  {project.description || project.summary}
                </p>
              </div>

              {/* Action Links */}
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
    </section>
  );
}
