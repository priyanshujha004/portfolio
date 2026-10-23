import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Lexend } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import { profile } from "@/data/profile";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://priyanshujha.dev"),
  title: {
    default: "iamprynshu",
    template: `%s · ${profile.name}`,
  },
  description: profile.bio,
  keywords: [
    "Priyanshu Jha",
    "Software Engineer",
    "Full-Stack Developer",
    "Distributed Systems",
    "Next.js",
    "Spring Boot",
    "PostgreSQL",
    "Docker",
    "Python",
    "Machine Learning",
  ],
  authors: [{ name: profile.name, url: "https://priyanshujha.dev" }],
  openGraph: {
    title: `${profile.name} · ${profile.role}`,
    description: profile.bio,
    url: "https://priyanshujha.dev",
    siteName: `${profile.name} · Software Engineer`,
    images: ["/me2.jpeg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.role}`,
    description: profile.bio,
    images: ["/me2.jpeg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${lexend.variable} dark`} data-scroll-behavior="smooth">
      <body className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white selection:text-black">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
