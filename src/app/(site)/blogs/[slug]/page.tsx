import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: `${post.title} · Blogs`,
      description: post.excerpt,
      openGraph: {
        title: `${post.title} · Priyanshu Jha`,
        description: post.excerpt,
        images: [post.image],
      },
    };
  } catch {
    return {
      title: "Blog · Priyanshu Jha",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex !== -1 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  return (
    <article className="py-6 space-y-8">
      {/* Back Link */}
      <div className="border-b border-[#1F1F1F] pb-4">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-white transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to posts</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-[#A3A3A3] font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} className="text-[#737373]" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-[#737373]" />
            <span>{post.readingTime}</span>
          </span>
        </div>

        <p className="text-sm text-[#A3A3A3] leading-relaxed pt-1">
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#141414] text-[#A3A3A3] border border-[#222222]"
              >{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Cover Image */}
      {post.image && (
        <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-[#222222] bg-[#0A0A0A]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            loading="eager"
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
      )}

      {/* MDX Article Body */}
      <div className="prose prose-invert max-w-none pt-4 text-[#A3A3A3] prose-headings:text-white prose-headings:tracking-tight prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-sm prose-p:leading-relaxed prose-li:text-sm prose-li:leading-relaxed prose-pre:bg-[#0A0A0A] prose-pre:border prose-pre:border-[#222222] prose-a:text-white prose-a:underline prose-strong:text-white">
        <MDXRemote source={post.content} />
      </div>

      {/* Previous & Next Article Card */}
      {nextPost && (
        <div className="pt-8 mt-12 border-t border-[#1F1F1F]">
          <div className="text-xs font-mono text-[#737373] uppercase mb-2">
            Next Post
          </div>
          <Link
            href={`/blogs/${nextPost.slug}`}
            className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#222222] rounded-lg hover:border-[#374151] transition-colors group"
          >
            <div>
              <h3 className="text-base font-semibold text-white group-hover:underline">
                {nextPost.title}
              </h3>
              <p className="text-xs text-[#A3A3A3] mt-0.5 line-clamp-1">
                {nextPost.excerpt}
              </p>
            </div>
            <ArrowRight
              size={16}
              className="text-[#A3A3A3] group-hover:text-white group-hover:translate-x-1 transition-all"
            />
          </Link>
        </div>
      )}
      {
        previousPost && (
          <Link
            href={`/blogs/${previousPost.slug}`}
            className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#222222] rounded-lg hover:border-[#374151] transition-colors group"
          >
            <div>
              <h3 className="text-base font-semibold text-white group-hover:underline">
                {previousPost.title}
              </h3>
              <p className="text-xs text-[#A3A3A3] mt-0.5 line-clamp-1">
                {previousPost.excerpt}
              </p>
            </div>
            <ArrowLeft
              size={16}
              className="text-[#A3A3A3] group-hover:text-white group-hover:translate-x-1 transition-all"
            />
          </Link>
        )
      }
    </article>
  );
}
