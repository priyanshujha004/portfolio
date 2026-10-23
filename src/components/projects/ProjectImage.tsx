
"use client";

import { useState } from "react";
import Image from "next/image";
import { Code2 } from "lucide-react";

interface ProjectImageProps {
  src?: string;
  alt: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  sizes?: string;
  className?: string;
  imageExists?: boolean;
}

export function ProjectImage({
  src,
  alt,
  priority = false,
  loading = "lazy",
  sizes = "(max-width: 768px) 100vw, 360px",
  className = "object-contain",
  imageExists = true,
}: ProjectImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const showPlaceholder =
    !src || imageExists === false || failedSrc === src;

  const isPriority = priority || loading === "eager";

  if (showPlaceholder) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0D0D0D] bg-[radial-gradient(#1E1E1E_1px,transparent_1px)] [background-size:16px_16px] text-center p-4 select-none">
        <div className="w-10 h-10 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center text-[#A3A3A3] mb-3 shadow-inner">
          <Code2 size={18} className="text-[#A3A3A3]" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#141414] text-white border border-[#2A2A2A]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex rounded-full h-full w-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span>In Development</span>
        </div>

        <span className="text-[11px] text-[#737373] font-mono mt-2">
          Preview coming soon
        </span>
      </div>
    );
  }

  return (
    <Image
      key={src}
      src={src}
      alt={alt}
      fill
      priority={isPriority}
      loading={isPriority ? "eager" : "lazy"}
      className={className}
      sizes={sizes}
      onError={() => setFailedSrc(src)}
    />
  );
}
