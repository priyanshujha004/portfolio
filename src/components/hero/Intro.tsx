import { Typography } from "@/components/foundation/Typography";
import { MetadataLabel } from "@/components/foundation/MetadataLabel";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

export function Intro() {
  return (
    <div>
      <MetadataLabel index="01" label={profile.role} className="mb-4" />
      <Typography as="h1" variant="display" className="mb-6">
        {profile.headline.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Typography>
      <Typography variant="body-muted" className="mb-8 max-w-md">
        {profile.intro}
      </Typography>
      <dl className="mb-8 space-y-2 border-t border-border pt-6">
        {profile.meta.map((item) => (
          <div key={item.label} className="flex gap-4 font-mono text-xs">
            <dt className="w-24 uppercase tracking-wide text-text-muted">
              {item.label}
            </dt>
            <dd className="text-text-primary">{item.value}</dd>
          </div>
        ))}
      </dl>
      <Button href="https://drive.google.com/your-resume-link" external>
        Resume ↗
      </Button>
    </div>
  );
}
