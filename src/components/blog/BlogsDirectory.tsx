"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/types/blog";

interface Props {
  initialPosts: BlogPost[];
}

export function BlogsDirectory({ initialPosts }: Props) {
  const [query, setQuery] = useState("");

  const filtered = initialPosts.filter((post) => {
    const q = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="py-6 space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          All Blogs
        </h1>

        <div className="relative w-full sm:max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]"
          />
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#222222] rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#737373] focus:outline-none focus:border-white transition-colors"
          />
        </div>
      </div>

      {/* Blogs Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-sm text-[#737373]">
          No articles matched &quot;{query}&quot;
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((post, index) => (
            <article key={post.slug} className="group">
              <Link href={`/blogs/${post.slug}`} className="block">
                {/* Single Cover Image per card */}
                {post.image && (
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-[#222222] bg-[#0A0A0A] mb-3 group-hover:border-[#374151] transition-colors">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      loading="eager"
                      priority={index < 2}
                      className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </div>
                )}

                <h2 className="text-base font-semibold text-white group-hover:underline underline-offset-2 tracking-tight">
                  {post.title}
                </h2>

                <div className="flex items-center gap-4 text-xs text-[#A3A3A3] font-mono mt-1 mb-2">
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

                <p className="text-sm text-[#A3A3A3] line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
