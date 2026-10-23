import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 text-center space-y-4">
      <div className="text-xs font-mono text-[#A3A3A3]">404</div>
      <h1 className="text-3xl font-semibold text-white tracking-tight">
        Page Not Found
      </h1>
      <p className="text-sm text-[#A3A3A3] max-w-sm mx-auto">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-medium rounded hover:bg-[#E5E5E5] transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
