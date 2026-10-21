import { Section } from "@/components/foundation/Section";
import { Typography } from "@/components/foundation/Typography";
import { ContactStrip } from "@/components/contact/ContactStrip";
import { Reveal } from "@/components/shared/Reveal";

export function ContactSection() {
  return (
    <Section index="05" label="Correspondence">
      <Reveal>
        <Typography as="h2" variant="heading-lg" className="mb-8">
          Let&apos;s build something great.
        </Typography>
      </Reveal>
      <ContactStrip />
    </Section>
  );
}
