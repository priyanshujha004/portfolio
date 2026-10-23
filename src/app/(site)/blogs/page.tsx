import { getAllPosts } from "@/lib/mdx";
import { BlogsDirectory } from "@/components/blog/BlogsDirectory";
import { profile } from "@/data/profile";

export const metadata = {
  title: "Blogs",
  description: `Writing on full-stack engineering, distributed systems, and developer tooling by ${profile.name}.`,
};

export default function BlogsPage() {
  const posts = getAllPosts();

  return <BlogsDirectory initialPosts={posts} />;
}
