"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
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
    <html>
      <body>
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center">
                <AlertTriangle size={36} className="text-red-500" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
              Critical Error
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              A critical error occurred. Please refresh the page.
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw size={15} /> Refresh Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
