"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, BookOpen, Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? "shadow-sm" : ""} border-b border-gray-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-gray-900 leading-none">
                EduJoy Kids
              </p>
              <p className="text-xs text-gray-400 leading-none mt-0.5">
                Where Learning Feels Like Play
              </p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-semibold text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <Zap size={13} /> Start Free
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-center text-gray-700 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-indigo-600 px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <Zap size={13} /> Start Learning Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
