import { Mail, FileText, type LucideIcon } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/foundation/icons/BrandIcons";
import type { ComponentType } from "react";

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon | ComponentType<{ size?: number; className?: string }>;
  external?: boolean;
}

export const socialLinks: SocialLink[] = [
  { label: "Email", href: "mailto:priyanshujha19.work@gmail.com", icon: Mail },
  {
    label: "GitHub",
    href: "https://github.com/priyanshujha004",
    icon: GithubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/priyanshujha971/",
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "Codolio",
    href: "https://codolio.com/profile/hnhwXBWI",
    icon: XIcon,
    external: true,
  },
  {
    label: "Resume",
    href: "https://drive.google.com/your-resume-link",
    icon: FileText,
    external: true,
  },
];
