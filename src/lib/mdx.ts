import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project } from "@/types/project";

import { calculateReadingTime } from "@/utils/readingTime";
import type { BlogPost } from "@/types/blog";

const blogDirectory = path.join(process.cwd(), "src/content/blog");
const projectsDirectory = path.join(process.cwd(), "src/content/projects");

function checkImageExists(imagePath?: string): boolean {
  if (!imagePath) return false;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return true;
  }
  const cleanPath = imagePath.replace(/^\//, "");
  const fullPath = path.join(process.cwd(), "public", cleanPath);
  return fs.existsSync(fullPath);
}

import crypto from "node:crypto";

function getVersionedImagePath(imagePath?: string): string {
  if (!imagePath) return "";

  if (/^https?:\/\//.test(imagePath)) {
    return imagePath;
  }

  const cleanPath = imagePath.replace(/^\/+/, "");
  const fullPath = path.join(process.cwd(), "public", cleanPath);

  if (!fs.existsSync(fullPath)) {
    return imagePath;
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const hash = crypto
    .createHash("sha256")
    .update(fileBuffer)
    .digest("hex")
    .slice(0, 12);

  return `${imagePath.split("?")[0]}?v=${hash}`;
}


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
    const projectData = data as Omit<Project, "slug">;
    const images =
      Array.isArray(projectData.images) && projectData.images.length > 0
        ? projectData.images
        : projectData.image
          ? [projectData.image]
          : [];

    const primaryImage = images[0] || projectData.image || "";
    const imageExists = checkImageExists(primaryImage);

    const versionedImages = images.map(getVersionedImagePath);
    const versionedPrimaryImage = getVersionedImagePath(primaryImage);

    return {
      slug,
      ...projectData,
      images: versionedImages,
      image: versionedPrimaryImage,
      imageExists,
    };
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
  const projectData = data as Omit<Project, "slug">;
  const images =
    Array.isArray(projectData.images) && projectData.images.length > 0
      ? projectData.images
      : projectData.image
        ? [projectData.image]
        : [];

  const primaryImage = images[0] || projectData.image || "";
  const imageExists = checkImageExists(primaryImage);

  return {
    slug,
    ...projectData,
    images: images.map(getVersionedImagePath),
    image: getVersionedImagePath(primaryImage),
    imageExists,
    content,
  };
}
