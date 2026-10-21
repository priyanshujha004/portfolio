import { getAllPosts } from "@/lib/mdx";
import { getAllProjects } from "@/lib/mdx";
import type { MetadataRoute } from "next";

const siteUrl = "https://priyanshujha.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  const projects = getAllProjects().map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    { url: siteUrl, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/projects`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/blog`, lastModified: new Date().toISOString() },
    ...projects,
    ...posts,
  ];
}
