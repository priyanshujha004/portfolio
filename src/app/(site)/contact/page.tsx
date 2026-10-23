import { ContactForm } from "@/components/contact/ContactForm";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} for software engineering roles, collaboration, and inquiries.`,
};

export default function ContactPage() {
  const contactSocials = ["GitHub", "LinkedIn", "Email"];

  return (
    <div className="py-6 space-y-8">
      {/* Header and Introduction matching Ayushworks */}
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Contact
        </h1>

        <div className="space-y-3 text-[#A3A3A3] text-sm sm:text-base leading-relaxed">
          <p>
            You can reach out to me via my email. I will try to reach out to you within 24 hours.
          </p>

          <p>
            You can also connect with me on LinkedIn. For quick questions, a direct message works; for anything involving
            work, scope, or projects, use email so there’s a written record.
          </p>

          <p>
            I’m based in Delhi NCR and open to
            on-site opportunities wherever required and remote collaborations.
          </p>
        </div>

        {/* Social channels pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {socialLinks
            .filter((s) => contactSocials.includes(s.label))
            .map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[#0A0A0A] border border-[#222222] rounded text-xs text-[#A3A3A3] hover:text-white hover:border-[#374151] transition-colors"
              >
                <span>{s.label}</span>
                {s.external && <ArrowUpRight size={11} />}
              </a>
            ))}
        </div>
      </div>

      {/* Functional Interactive Form with Resend */}
      <div className="pt-2">
        <h2 className="text-lg font-semibold text-white tracking-tight mb-4">
          Send a Direct Message
        </h2>
        <ContactForm />
      </div>
    </div>
  );
}
