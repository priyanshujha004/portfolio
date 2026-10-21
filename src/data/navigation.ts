export interface NavItem {
  index: string;
  label: string;
  href: string;
  external?: boolean;
}

export const navItems: NavItem[] = [
  { index: "01", label: "INDEX", href: "/" },
  { index: "02", label: "PROJECTS", href: "/projects" },
  { index: "03", label: "BLOG", href: "/blog" },
  {
    index: "04",
    label: "RESUME",
    href: "https://drive.google.com/your-resume-link",
    external: true,
  },
];
