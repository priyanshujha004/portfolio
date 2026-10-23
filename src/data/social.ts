import { profile } from "./profile";

export interface SocialLink {
  label: string;
  href: string;
  external?: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    external: false,
  },
  {
    label: "GitHub",
    href: `https://github.com/${profile.githubUsername}`,
    external: true,
  },
  {
    label: "LinkedIn",
    href: `https://www.linkedin.com/in/${profile.linkedinUsername}/`,
    external: true,
  },
  {
    label: "LeetCode",
    href: `https://leetcode.com/u/${profile.leetcodeUsername}/`,
    external: true,
  },
  {
    label: "CodeChef",
    href: `https://www.codechef.com/users/${profile.codechefUsername}`,
    external: true,
  },
  {
    label: "HackerRank",
    href: `https://www.hackerrank.com/profile/${profile.hackerrankUsername}`,
    external: true,
  },
  {
    label: "Resume",
    href: "/resume",
    external: false,
  },
];
