import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { Camera } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-8 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Intro Copy */}
        <div className="md:col-span-7 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            iamprynshu
          </h1>

          <div className="space-y-3 text-[#A3A3A3] text-sm sm:text-base leading-relaxed">
            <p>
              Product-focused Software Engineer who builds scalable systems and
              data-intensive applications. I turn complex problems into
              reliable, high-performance software and obsess over execution.
            </p>
            <p>
              My work spans full-stack development with React, Node.js,
              Express, NestJS, PostgreSQL, MongoDB, and Prisma, alongside
              machine learning with Python. I care about maintainable
              architecture, data integrity, and building with purpose.
            </p>
            <p className="pt-2 text-white font-medium">
              Open to Internships & Full-Time Roles {" "}
            </p>
          </div>
        </div>

        {/* Right Column: Photo Booth widget matching Ayushworks */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <div className="w-full max-w-[280px] bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg overflow-hidden shadow-none">
            {/* Photo Booth Header */}
            <div className="px-3 py-1.5 bg-[#141414] border-b border-[#2A2A2A] flex items-center justify-between text-[11px] text-[#A3A3A3]">
              <span className="font-mono">Photo Booth</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3A3A3A]" />
                <span className="w-2 h-2 rounded-full bg-[#3A3A3A]" />
              </div>
            </div>

            {/* Profile Photo */}
            <div className="relative aspect-square w-full bg-[#111111]">
              <Image
                src="/me2.jpeg"
                alt={profile.name}
                fill
                priority
                loading="eager"
                className="object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                sizes="(max-width: 768px) 280px, 280px"
              />
            </div>

            {/* Photo Booth Footer Controls */}
            <div className="px-3 py-2 bg-[#141414] border-t border-[#2A2A2A] flex items-center justify-between text-[10px] text-[#A3A3A3] font-mono">
              <span className="flex items-center gap-2">
                {profile.location.split(",")[0]}
              </span>
              <span className="text-[#A3A3A3]">Engineer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
