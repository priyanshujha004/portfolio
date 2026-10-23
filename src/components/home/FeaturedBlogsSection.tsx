import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";

interface Props {
  posts: BlogPost[];
}

export function FeaturedBlogsSection({ posts }: Props) {
  return (
    <section className="py-8 border-t border-[#1F1F1F]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Featured Blogs
        </h2>
        <Link
          href="/blogs"
          className="text-xs font-medium text-[#A3A3A3] hover:text-white transition-colors flex items-center gap-1 group"
        >
          View All Blogs
          <ArrowRight
            size={13}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <article key={post.slug} className="group">
            <Link
              href={`/blogs/${post.slug}`}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              {/* Single Cover Image Thumbnail */}
              {post.image && (
                <div className="relative aspect-video w-full sm:w-[140px] shrink-0 rounded-lg overflow-hidden border border-[#222222] bg-[#0A0A0A] group-hover:border-[#374151] transition-colors">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    loading="eager"
                    priority={index < 2}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="140px"
                  />
                </div>
              )}

              {/* Blog Content Info */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 className="text-base font-semibold text-white group-hover:underline underline-offset-2 tracking-tight">
                  {post.title}
                </h3>

                {/* Date & Reading time */}
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

                {/* Excerpt */}
                <p className="text-sm text-[#A3A3A3] line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
