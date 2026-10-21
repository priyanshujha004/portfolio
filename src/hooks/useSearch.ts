"use client";

import { useMemo, useState } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";

export function useSearch<T>(
  items: T[],
  options: IFuseOptions<T>,
  filterKey: keyof T
) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const fuse = useMemo(() => new Fuse(items, options), [items, options]);

  const results = useMemo(() => {
    let filtered = query ? fuse.search(query).map((r) => r.item) : items;
    if (activeFilter) {
      filtered = filtered.filter((item) => {
        const value = item[filterKey];
        return Array.isArray(value)
          ? value.includes(activeFilter)
          : value === activeFilter;
      });
    }
    return filtered;
  }, [query, activeFilter, fuse, items, filterKey]);

  return { query, setQuery, activeFilter, setActiveFilter, results };
}
