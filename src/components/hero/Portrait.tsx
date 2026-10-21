import Image from "next/image";
import { BlueprintFrame } from "@/components/foundation/BlueprintFrame";
import { Annotation } from "@/components/foundation/Annotation";
import { profile } from "@/data/profile";

export function Portrait() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-subtle border border-border">
      <BlueprintFrame />
      <Image
        src="/images/profile/portrait.jpg"
        alt={`Portrait of ${profile.name}`}
        fill
        priority
        sizes="(min-width: 768px) 40vw, 90vw"
        className="object-cover"
      />
      <div className="absolute bottom-4 left-4 rounded-subtle bg-background/90 px-3 py-2 font-mono text-[11px] leading-relaxed text-text-primary">
        <Annotation>developer.json</Annotation>
        <pre className="mt-1 whitespace-pre-wrap">{profile.philosophy}</pre>
      </div>
    </div>
  );
}
