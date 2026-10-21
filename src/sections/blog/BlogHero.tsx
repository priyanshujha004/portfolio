import { MetadataLabel } from "@/components/foundation/MetadataLabel";
import { Typography } from "@/components/foundation/Typography";

export function BlogHero() {
  return (
    <div className="mb-10">
      <MetadataLabel label="Dispatches Archive" className="mb-3" />
      <Typography as="h1" variant="heading-lg" className="mb-2">
        All Dispatches
      </Typography>
      <Typography variant="body-muted">
        Notes, insights and deep dives from my engineering journey.
      </Typography>
    </div>
  );
}
