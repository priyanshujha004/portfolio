import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";

export function ContactPreviewSection() {
  return (
    <section className="py-8 border-t border-[#1F1F1F]">
      <div className="bg-[#0A0A0A] border border-[#222222] rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-[#A3A3A3]" />
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Let’s Connect
            </h2>
          </div>
          <p className="text-sm text-[#A3A3A3] max-w-md leading-relaxed">
            Open to engineering roles, high-impact internships,
            and software collaborations. Drop me a line or send a direct
            message.

          </p>
          {/* <div className="text-sm font-mono text-white pt-1">
            <a
              href={`mailto:${profile.email}`}
              className="hover:underline underline-offset-4"
            >
              {profile.email}
            </a>
          </div> */}
        </div>

        <div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-white !text-black text-sm font-medium rounded hover:bg-[#E5E5E5] transition-colors"
          >
            Get In Touch
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
