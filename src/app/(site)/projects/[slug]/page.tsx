import { ProjectImage } from "@/components/projects/ProjectImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/mdx";
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const project = getProjectBySlug(slug);
    return {
      title: `${project.title} · Projects`,
      description: project.summary,
      openGraph: {
        title: `${project.title} · Priyanshu Jha`,
        description: project.summary,
        images: [project.image],
      },
    };
  } catch {
    return {
      title: "Project Case Study · Priyanshu Jha",
    };
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let project;
  try {
    project = getProjectBySlug(slug);
  } catch {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = currentIndex !== -1 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;

  const isLive = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);

  return (
    <article className="py-6 space-y-8">
      {/* Top Back Link & Status */}
      <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-white transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Projects</span>
        </Link>

        <div>
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#141414] text-white border border-[#2A2A2A]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#141414] text-[#A3A3A3] border border-[#2A2A2A]">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              In Development
            </span>
          )}
        </div>
      </div>

      {/* Header Info */}
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          {project.title}
        </h1>
        <p className="text-base text-white leading-relaxed">
          {project.summary}
        </p>
        {project.description && (
          <p className="text-sm text-[#A3A3A3] leading-relaxed">
            {project.description}
          </p>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#141414] text-[#A3A3A3] border border-[#222222]"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* Main Cover Image */}
      <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-[#222222] bg-[#0A0A0A]">
        <ProjectImage
          src={project.image}
          alt={project.title}
          priority
          imageExists={project.imageExists}
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-wrap items-center gap-3 py-2 border-y border-[#1F1F1F]">
        {isLive && project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-medium rounded hover:bg-[#E5E5E5] transition-colors"
          >
            <ExternalLink size={13} />
            Live Preview
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-transparent text-white border border-[#374151] text-xs font-medium rounded hover:bg-[#141414] transition-colors"
          >
            <GithubIcon size={13} />
            Source Repository
          </a>
        )}
      </div>

      {/* Verified Metrics Cards */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-[#0A0A0A] border border-[#222222] p-3 rounded-lg text-center"
            >
              <div className="text-[11px] font-mono text-[#A3A3A3] uppercase">
                {metric.label}
              </div>
              <div className="mt-1 text-base font-semibold text-white">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MDX Body Content */}
      <div className="prose prose-invert max-w-none pt-4 text-[#A3A3A3] prose-headings:text-white prose-headings:tracking-tight prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-sm prose-p:leading-relaxed prose-li:text-sm prose-li:leading-relaxed prose-pre:bg-[#0A0A0A] prose-pre:border prose-pre:border-[#222222] prose-a:text-white prose-a:underline prose-strong:text-white">
        <MDXRemote source={project.content} />
      </div>

      <div className="flex w-full items-center justify-between gap-4">
        {/* Next Case Study Navigation */}
        {
          previousProject && (
            <Link
              href={`/projects/${previousProject.slug}`}
              className="inline-flex items-center gap-3 p-3 bg-[#0A0A0A] border border-[#222222] rounded-lg hover:border-[#374151] transition-colors group max-w-sm"
            >
              <ArrowLeft
                size={16}
                className="shrink-0 text-[#A3A3A3] group-hover:text-white group-hover:-translate-x-1 transition-all"
              />
              <div className="min-w-0">
                <p className="text-xs text-[#A3A3A3]">Previous Project</p>
                <h3 className="text-sm font-semibold text-white group-hover:underline truncate">
                  {previousProject.title}
                </h3>
              </div>
            </Link>
          )
        }
        {
          nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="ml-auto inline-flex items-center gap-3 p-3 bg-[#0A0A0A] border border-[#222222] rounded-lg hover:border-[#374151] transition-colors group max-w-sm"
            >
              <div className="min-w-0 text-right">
                <p className="text-xs text-[#A3A3A3]">Next Project</p>
                <h3 className="text-sm font-semibold text-white group-hover:underline truncate">
                  {nextProject.title}
                </h3>
              </div>
              <ArrowRight
                size={16}
                className="shrink-0 text-[#A3A3A3] group-hover:text-white group-hover:translate-x-1 transition-all"
              />
            </Link>
          )
        }
      </div>
    </article>
  );
}
