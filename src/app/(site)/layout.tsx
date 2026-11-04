import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-1 w-full min-w-0">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
