import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-subtle focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to main content
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="main-content">{children}</main>

      <Footer />
    </>
  );
}
