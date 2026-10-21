import { getAllPosts } from "@/lib/mdx";
import { BlogHero } from "@/sections/blog/BlogHero";
import { BlogList } from "@/sections/blog/BlogList";
import { Section } from "@/components/foundation/Section";

export const metadata = {
  title: "Blog — Priyanshu Jha",
  description: "Notes, insights and deep dives from my engineering journey.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <BlogHero />
      <BlogList posts={posts} />
    </Section>
  );
}
