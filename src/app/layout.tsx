import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  metadataBase: new URL("https://priyanshujha.dev"),
  title: { default: "Priyanshu Jha — Software Engineer", template: "%s" },
  description: "Building scalable systems. Solving real world problems.",
  openGraph: {
    title: "Priyanshu Jha — Software Engineer",
    description: "Building scalable systems. Solving real world problems.",
    url: "https://priyanshujha.dev",
    siteName: "Priyanshu Jha",
    images: ["/images/og/default.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu Jha — Software Engineer",
    description: "Building scalable systems. Solving real world problems.",
    images: ["/images/og/default.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF8",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
