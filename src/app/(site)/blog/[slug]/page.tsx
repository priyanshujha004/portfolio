import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { Section } from "@/components/foundation/Section";
import { Container } from "@/components/foundation/Container";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const post = getPostBySlug(params.slug);
    return {
      title: `${post.title} — Priyanshu Jha`,
      description: post.excerpt,
    };
  } catch {
    return {};
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <Section>
      <Container className="max-w-2xl">
        <BlogHeader post={post!} />
        <article className="prose prose-neutral max-w-none font-body text-text-primary prose-headings:font-display prose-a:text-accent">
          <MDXRemote source={post!.content} />
        </article>
      </Container>
    </Section>
  );
}
