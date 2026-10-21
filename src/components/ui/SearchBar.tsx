import { Search } from "lucide-react";
import { useId } from "react";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search projects...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const id = useId();

  return (
    <div className="flex items-center gap-2 rounded-subtle border border-border px-3 py-2">
      <Search size={14} className="text-text-muted" aria-hidden />
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent font-mono text-xs text-text-primary placeholder:text-text-muted focus:outline-none"
      />
    </div>
  );
}
