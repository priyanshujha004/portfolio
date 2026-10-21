import Image from "next/image";
import { Tag } from "./Tag";
import { ReadingTime } from "./ReadingTime";
import { formatDate } from "@/utils/formatDate";
import type { BlogPost } from "@/types/blog";

export function BlogHeader({ post }: { post: BlogPost }) {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center gap-3 font-mono text-xs text-text-muted">
        <span>{formatDate(post.date)}</span>
        <ReadingTime value={post.readingTime} />
      </div>
      <h1 className="mb-4 font-display text-3xl text-text-primary md:text-4xl">
        {post.title}
      </h1>
      <div className="mb-6 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-subtle border border-border">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 768px) 640px, 90vw"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
