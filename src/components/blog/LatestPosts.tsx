import { BlogRow } from "./BlogRow";
import type { BlogPost } from "@/types/blog";

export function LatestPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <div>
      {posts.map((post) => (
        <BlogRow key={post.slug} post={post} />
      ))}
    </div>
  );
}
