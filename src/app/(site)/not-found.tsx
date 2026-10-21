import Link from "next/link";
import { Section } from "@/components/foundation/Section";

export default function NotFound() {
  return (
    <Section>
      <div className="py-24 text-center">
        <p className="mb-2 font-mono text-xs text-accent">{"// 404"}</p>
        <h1 className="mb-4 font-display text-3xl text-text-primary">
          Page not found
        </h1>
        <Link href="/" className="font-mono text-xs text-accent">
          ← Back to index
        </Link>
      </div>
    </Section>
  );
}
