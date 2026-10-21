import { Section } from "@/components/foundation/Section";
import { EngineeringRecords } from "@/components/engineering/EngineeringRecords";
import { Reveal } from "@/components/shared/Reveal";

export function EngineeringSection() {
  return (
    <Section index="02" label="Engineering Records">
      <Reveal>
        <EngineeringRecords />
      </Reveal>
    </Section>
  );
}
