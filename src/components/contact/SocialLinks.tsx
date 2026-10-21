import { socialLinks } from "@/data/social";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/utils/cn";

// This is the ONLY place social icons are rendered from.
// Footer.tsx (all pages) and ContactSection.tsx (landing) both import this.
export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socialLinks.map((social) => (
        <IconButton
          key={social.label}
          icon={social.icon}
          href={social.href}
          label={social.label}
          external={social.external}
        />
      ))}
    </div>
  );
}
