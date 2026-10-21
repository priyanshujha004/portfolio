import { MetadataLabel } from "@/components/foundation/MetadataLabel";
import { Typography } from "@/components/foundation/Typography";

export function ProjectsHero() {
  return (
    <div className="mb-10">
      <MetadataLabel label="Project Archive" className="mb-3" />
      <Typography as="h1" variant="heading-lg" className="mb-2">
        All Projects
      </Typography>
      <Typography variant="body-muted">
        A collection of systems I&apos;ve designed, built, and shipped.
      </Typography>
    </div>
  );
}
