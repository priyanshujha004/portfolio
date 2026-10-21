import { Chip } from "@/components/ui/Chip";

export function Categories({
  tags,
  active,
  onSelect,
}: {
  tags: string[];
  active: string | null;
  onSelect: (tag: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip active={active === null} onClick={() => onSelect(null)}>
        All
      </Chip>
      {tags.map((tag) => (
        <Chip
          key={tag}
          active={active === tag}
          onClick={() => onSelect(active === tag ? null : tag)}
        >
          {tag}
        </Chip>
      ))}
    </div>
  );
}
