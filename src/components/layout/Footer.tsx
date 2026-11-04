import Link from "next/link";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full mt-16 sm:mt-24 pb-12 pt-8 border-t border-[#1F1F1F]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3A3A3]">
        <p className="font-normal">© XXV/VI/MMIV PJ</p>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="https://github.com/priyanshujha004"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2.5 text-[#A3A3A3] hover:text-white transition-colors rounded hover:bg-[#141414] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <FaGithub size={18} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/priyanshujha971/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 text-[#A3A3A3] hover:text-white transition-colors rounded hover:bg-[#141414] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <IoLogoLinkedin size={18} />
          </Link>

          <Link
            href="https://x.com/__iampryanshu__"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="p-2.5 text-[#A3A3A3] hover:text-white transition-colors rounded hover:bg-[#141414] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <FaXTwitter size={18} />
          </Link>

          <Link
            href="https://www.instagram.com/__iamprynshu__/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2.5 text-[#A3A3A3] hover:text-white transition-colors rounded hover:bg-[#141414] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <RiInstagramFill size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
