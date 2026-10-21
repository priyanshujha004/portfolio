import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/foundation/icons/BrandIcons";

export function ProjectLinks({
  liveUrl,
  repoUrl,
}: {
  liveUrl?: string;
  repoUrl?: string;
}) {
  return (
    <div className="flex items-center gap-5 font-mono text-xs text-accent">
      {liveUrl && (
        <Link
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          Live Preview <ArrowUpRight size={12} />
        </Link>
      )}
      {repoUrl && (
        <Link
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          <GithubIcon size={12} /> Repo
        </Link>
      )}
    </div>
  );
}
