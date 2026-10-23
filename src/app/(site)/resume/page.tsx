import Link from "next/link";
import { Download, ExternalLink, ArrowLeft, FileText } from "lucide-react";
import { profile } from "@/data/profile";
import fs from "fs";
import path from "path";

export const metadata = {
  title: "Resume",
  description: `Official resume and technical qualifications of ${profile.name}.`,
};

export default function ResumePage() {
  const resumeFilePath = path.join(process.cwd(), "public/resume.pdf");
  const resumeExists = fs.existsSync(resumeFilePath);

  return (
    <div className="py-6 space-y-6">
      {/* Top back link */}
      <div className="border-b border-[#1F1F1F] pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-white transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Resume
          </h1>
          <p className="text-xs text-[#A3A3A3] mt-0.5">
            {profile.role} · {profile.location}
          </p>
        </div>

        {resumeExists && (
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download={`${profile.name.replace(/\s+/g, "_")}_Resume.pdf`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] border border-[#2A2A2A] text-xs font-medium text-white rounded hover:bg-[#1F1F1F] transition-colors"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white !text-black text-xs font-medium rounded hover:bg-[#E5E5E5] transition-colors"
            >
              <ExternalLink size={13} />
              <span>Open In New Tab</span>
            </a>
          </div>
        )}
      </div>

      {/* Embedded Document Viewer or Clear Unavailable State */}
      {resumeExists ? (
        <div className="bg-[#0A0A0A] border border-[#222222] rounded-lg p-2 sm:p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#A3A3A3] font-mono px-2 py-1">
            <span className="flex items-center gap-1.5">
              <FileText size={13} />
              {profile.name}
            </span>
            <span>PDF Document</span>
          </div>

          <div className="w-full aspect-[1/1.3] rounded border border-[#1A1A1A] overflow-hidden bg-[#111111]">
            <iframe
              src="/resume.pdf#view=FitH"
              title={`${profile.name} Resume`}
              className="w-full h-full border-none"
            />
          </div>
        </div>
      ) : (
        <div className="bg-[#0A0A0A] border border-[#222222] rounded-lg p-8 text-center space-y-3">
          <FileText size={32} className="mx-auto text-[#737373]" />
          <h2 className="text-base font-semibold text-white">
            Resume PDF Not Yet Attached
          </h2>
          <p className="text-sm text-[#A3A3A3] max-w-md mx-auto leading-relaxed">
            Please place your actual PDF file in{" "}
            <code className="text-white bg-[#141414] px-1.5 py-0.5 rounded font-mono text-xs">
              /public/resume.pdf
            </code>
            . Once placed, it will automatically render here and open when visitors click Resume.
          </p>
        </div>
      )}
    </div>
  );
}
