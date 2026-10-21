import Link from "next/link";
import { Section } from "@/components/foundation/Section";
import { LatestPosts } from "@/components/blog/LatestPosts";
import { getFeaturedPosts } from "@/lib/mdx";
import { Reveal } from "@/components/shared/Reveal";

export function LatestBlogsSection() {
  const posts = getFeaturedPosts();

  return (
    <Section index="04" label="Latest Dispatches">
      <Reveal>
        <div className="mb-2 flex justify-end">
          <Link
            href="/blog"
            className="link-underline font-mono text-xs text-accent"
          >
            View all dispatches →
          </Link>
        </div>
        <LatestPosts posts={posts} />
      </Reveal>
    </Section>
  );
}
