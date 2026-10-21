import { Section } from "@/components/foundation/Section";
import { Hero } from "@/components/hero/Hero";
import { Reveal } from "@/components/shared/Reveal";

export function HeroSection() {
  return (
    <Section className="pt-12 md:pt-16">
      <Reveal>
        <Hero />
      </Reveal>
    </Section>
  );
}
