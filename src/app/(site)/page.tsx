import { HeroSection } from "@/components/home/HeroSection";
import { DeveloperActivitySection } from "@/components/home/DeveloperActivitySection";
import { ExperienceEducationSection } from "@/components/home/ExperienceEducationSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { FeaturedBlogsSection } from "@/components/home/FeaturedBlogsSection";
import { ContactPreviewSection } from "@/components/home/ContactPreviewSection";
import { getCombinedStats } from "@/lib/dynamicStats";
import { getFeaturedProjects, getFeaturedPosts } from "@/lib/mdx";

export const revalidate = 3600;

export default async function HomePage() {
  const [stats, featuredProjects, featuredPosts] = await Promise.all([
    getCombinedStats(),
    getFeaturedProjects(),
    getFeaturedPosts(),
  ]);

  return (
    <div className="space-y-2">
      {/* Section 1 — Hero / About Me */}
      <HeroSection />

      {/* Section 2 — Developer Activity */}
      <DeveloperActivitySection stats={stats} />

      {/* Section 3 & 4 — Experience & Education */}
      <ExperienceEducationSection />

      {/* Section 5 — Featured Projects */}
      <FeaturedProjectsSection projects={featuredProjects} />

      {/* Section 6 — Featured Blogs */}
      <FeaturedBlogsSection posts={featuredPosts} />

      {/* Section 7 — Contact Preview */}
      <ContactPreviewSection />
    </div>
  );
}
