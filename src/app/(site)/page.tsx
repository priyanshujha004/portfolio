import { HeroSection } from "@/sections/landing/HeroSection";
import { EngineeringSection } from "@/sections/landing/EngineeringSection";
import { FeaturedProjectsSection } from "@/sections/landing/FeaturedProjectsSection";
import { LatestBlogsSection } from "@/sections/landing/LatestBlogsSection";
import { ContactSection } from "@/sections/landing/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EngineeringSection />
      <FeaturedProjectsSection />
      <LatestBlogsSection />
      <ContactSection />
    </>
  );
}
