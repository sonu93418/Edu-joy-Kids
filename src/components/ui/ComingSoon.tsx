"use client";

import { Rocket } from "lucide-react";
import Link from "next/link";

interface ComingSoonProps {
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

export default function ComingSoon({
  title = "Coming Soon",
  description = "We're working hard to build this feature. Check back soon!",
  backHref = "/",
  backLabel = "Go Back",
}: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-indigo-50 rounded-2xl p-6 mb-6 inline-block">
        <Rocket size={48} className="text-indigo-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-3">{title}</h1>
      <p className="text-gray-500 max-w-md mb-8">{description}</p>
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
      >
        {backLabel}
      </Link>
    </div>
  );
}
