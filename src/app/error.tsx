"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center">
            <AlertTriangle size={36} className="text-amber-500" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
          An unexpected error occurred. You can try refreshing the page or go
          back home.
        </p>

        {/* Error detail (dev only) */}
        {process.env.NODE_ENV === "development" && error?.message && (
          <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-3 text-left">
            <p className="text-xs font-mono text-red-600 break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw size={15} /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold text-sm px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Home size={15} /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
