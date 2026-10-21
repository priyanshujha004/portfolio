import { Container } from "@/components/foundation/Container";
import { SocialLinks } from "@/components/contact/SocialLinks";

// Minimal footer — copyright + social icons only.
// Rendered on EVERY page via the (site) layout, so the icon row is
// guaranteed identical on landing, projects, and blog.
export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container>
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} Priyanshu Jha. All rights reserved.
          </p>
          <SocialLinks />
        </div>
      </Container>
    </footer>
  );
}
