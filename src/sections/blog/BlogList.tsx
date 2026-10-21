"use client";

import { useSearch } from "@/hooks/useSearch";
import { getAllTags } from "@/lib/mdx";
import { SearchBar } from "@/components/ui/SearchBar";
import { Categories } from "./Categories";
import { BlogRow } from "@/components/blog/BlogRow";
import { EmptyState } from "@/components/shared/EmptyState";
import type { BlogPost } from "@/types/blog";
import { Reveal } from "@/components/shared/Reveal";

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const { query, setQuery, activeFilter, setActiveFilter, results } = useSearch(
    posts,
    { keys: ["title", "excerpt", "tags"], threshold: 0.35 },
    "tags"
  );
  const allTags = getAllTags(posts);

  return (
    <Reveal>
      <div>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Categories
            tags={allTags}
            active={activeFilter}
            onSelect={setActiveFilter}
          />
          <div className="w-full md:w-64">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search posts..."
            />
          </div>
        </div>

        {results.length === 0 ? (
          <EmptyState message="No dispatches match your search." />
        ) : (
          <div>
            {results.map((post) => (
              <BlogRow key={post.slug} post={post} />
            ))}
          </div>
        )}
        <p className="pt-10 text-center font-mono text-xs text-text-muted">
          — End of archive —
        </p>
      </div>
    </Reveal>
  );
}
