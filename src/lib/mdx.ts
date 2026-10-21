import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project } from "@/types/project";

import { calculateReadingTime } from "@/utils/readingTime";
import type { BlogPost } from "@/types/blog";

const blogDirectory = path.join(process.cwd(), "src/content/blog");
const projectsDirectory = path.join(process.cwd(), "src/content/projects");

export function getAllProjects(): Project[] {
  const filenames = fs
    .readdirSync(projectsDirectory)
    .filter((f) => f.endsWith(".mdx"));

  const projects = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fileContents = fs.readFileSync(
      path.join(projectsDirectory, filename),
      "utf8"
    );
    const { data } = matter(fileContents);
    return { slug, ...(data as Omit<Project, "slug">) };
  });

  return projects.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getAllStackTags(projects: Project[]): string[] {
  const tags = new Set<string>();
  projects.forEach((p) => p.stack.forEach((s) => tags.add(s)));
  return Array.from(tags).sort();
}

export function getAllPosts(): BlogPost[] {
  const filenames = fs
    .readdirSync(blogDirectory)
    .filter((f) => f.endsWith(".mdx"));

  const posts = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fileContents = fs.readFileSync(
      path.join(blogDirectory, filename),
      "utf8"
    );
    const { data, content } = matter(fileContents);
    return {
      slug,
      ...(data as Omit<BlogPost, "slug" | "readingTime">),
      readingTime: calculateReadingTime(content),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string) {
  const fileContents = fs.readFileSync(
    path.join(blogDirectory, `${slug}.mdx`),
    "utf8"
  );
  const { data, content } = matter(fileContents);
  return {
    slug,
    ...(data as Omit<BlogPost, "slug" | "readingTime">),
    readingTime: calculateReadingTime(content),
    content,
  };
}

export function getAllTags(posts: BlogPost[]): string[] {
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
export function getFeaturedProjects(): Project[] {
  return getAllProjects()
    .filter((p) => p.featured)
    .slice(0, 4);
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().slice(0, 4);
}

export function getProjectBySlug(slug: string) {
  const fileContents = fs.readFileSync(
    path.join(projectsDirectory, `${slug}.mdx`),
    "utf8"
  );
  const { data, content } = matter(fileContents);
  return { slug, ...(data as Omit<Project, "slug">), content };
}
