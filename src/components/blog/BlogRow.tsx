import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "./Tag";
import { ReadingTime } from "./ReadingTime";
import { formatDate } from "@/utils/formatDate";
import type { BlogPost } from "@/types/blog";

export function BlogRow({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-[1fr_auto] items-center gap-6 border-b border-border py-6"
    >
      <div>
        <div className="mb-2 flex items-center gap-3 font-mono text-[11px] text-text-muted">
          <span>{formatDate(post.date)}</span>
          <ReadingTime value={post.readingTime} />
        </div>
        <h3 className="mb-2 font-body font-semibold text-text-primary group-hover:text-accent">
          {post.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden h-16 w-24 overflow-hidden rounded-subtle border border-border md:block">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <ArrowUpRight
          size={18}
          className="text-text-muted transition-colors duration-200 group-hover:text-accent"
        />
      </div>
    </Link>
  );
}
