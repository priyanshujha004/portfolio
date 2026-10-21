import { Mail, MapPin, Clock } from "lucide-react";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { SocialLinks } from "./SocialLinks";
import { profile } from "@/data/profile";

// This is the rich Correspondence block — landing page ONLY.
// Footer.tsx (all pages) stays minimal; this is where email/location/
// availability live, per the "no contact form" + "moved to landing" decision.
export function ContactStrip() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-sm text-text-primary">
          <Mail size={14} className="text-accent" />{" "}
          {profile.meta.find((m) => m.label === "Email")?.value}
        </div>
        <div className="flex items-center gap-2 font-mono text-sm text-text-primary">
          <MapPin size={14} className="text-accent" /> {profile.location}
        </div>
        <div className="flex items-center gap-2 font-mono text-sm text-text-primary">
          <Clock size={14} className="text-accent" /> Usually responds within
          24–48 hours
        </div>
        <AvailabilityBadge>Open to new opportunities</AvailabilityBadge>
      </div>
      <div className="flex items-end justify-start md:justify-end">
        <SocialLinks />
      </div>
    </div>
  );
}
