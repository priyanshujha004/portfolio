import Fuse, { type IFuseOptions } from "fuse.js";
import type { Project } from "@/types/project";
import type { BlogPost } from "@/types/blog";

const options: IFuseOptions<Project> = {
  keys: ["title", "summary", "stack"],
  threshold: 0.35,
};

export function createProjectSearch(projects: Project[]) {
  return new Fuse(projects, options);
}
const blogOptions: IFuseOptions<BlogPost> = {
  keys: ["title", "excerpt", "tags"],
  threshold: 0.35,
};

export function createBlogSearch(posts: BlogPost[]) {
  return new Fuse(posts, blogOptions);
}
