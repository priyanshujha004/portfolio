import { experienceList, educationList } from "@/data/experience";
import { ExternalLink, GraduationCap, Briefcase } from "lucide-react";

export function ExperienceEducationSection() {
  return (
    <div className="space-y-12 py-8 border-t border-[#1F1F1F]">
      {/* Section 3: Experience */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Briefcase size={18} className="text-[#A3A3A3]" />
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Professional Experience
          </h2>
        </div>

        <div className="space-y-4">
          {experienceList.map((exp, idx) => (
            <div
              key={idx}
              className="bg-[#0A0A0A] border border-[#222222] rounded-lg p-4 sm:p-5 hover:border-[#374151] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                <div>
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    {exp.role}
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#A3A3A3] hover:text-white transition-colors"
                        aria-label={`External link for ${exp.organization}`}
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </h3>
                  <div className="text-sm text-[#A3A3A3]">
                    <span>{exp.organization}</span>
                    {exp.employmentType && (
                      <span className="text-xs text-[#737373]">
                        {" "}
                        · {exp.employmentType}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs font-mono text-[#A3A3A3] sm:text-right">
                  <div>{exp.period}</div>
                  <div className="text-[#737373]">{exp.location}</div>
                </div>
              </div>

              {/* Description */}
              <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-[#A3A3A3] mt-3">
                {exp.description.map((desc, dIdx) => (
                  <li key={dIdx} className="leading-relaxed">
                    {desc}
                  </li>
                ))}
              </ul>


              {/* Technologies */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#1A1A1A]">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#141414] text-[#A3A3A3] border border-[#222222]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Education */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap size={18} className="text-[#A3A3A3]" />
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Academic Background
          </h2>
        </div>

        <div className="space-y-4">
          {educationList.map((edu, idx) => (
            <div
              key={idx}
              className="bg-[#0A0A0A] border border-[#222222] rounded-lg p-4 sm:p-5 hover:border-[#374151] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                <div>
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    {edu.qualification} @ {edu.fieldOfStudy}
                    {edu.link && (
                      <a
                        href={edu.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#A3A3A3] hover:text-white transition-colors"
                        aria-label={`External link for ${edu.institution}`}
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </h3>
                  <div className="text-sm text-[#A3A3A3]">
                    {/* {edu.institution} */}
                    {edu.university && (
                      <span className="text-xs text-[#737373]">
                        {edu.university}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs font-mono text-[#A3A3A3] sm:text-right">
                  <div>{edu.duration}</div>
                  <div className="text-[#737373]">{edu.collegeLocation}</div>
                </div>
              </div>

              {/* Academic details */}
              <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-[#A3A3A3] mt-3">
                {edu.details.map((desc, dIdx) => (
                  <li key={dIdx} className="leading-relaxed">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
