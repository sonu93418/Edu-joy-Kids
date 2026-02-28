"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Minus, Mail } from "lucide-react";

const FAQS = [
  {
    q: "What grades and age groups does EduJoy Kids cover?",
    a: "Play Group (ages 3-4) through Class 5 (ages 11-12). Every grade has curriculum-aligned content designed specifically for that level.",
  },
  {
    q: "Is EduJoy Kids safe for my child?",
    a: "Yes. Completely ad-free with no external links. We are COPPA compliant, and parents have full control including screen time limits and content restrictions.",
  },
  {
    q: "How does AI personalisation work?",
    a: "Our AI analyses quiz scores, time on task, and weak areas to adapt lesson difficulty automatically and suggest targeted practice. Parents receive weekly AI-generated progress insights.",
  },
  {
    q: "Can multiple children share one parent account?",
    a: "Yes. One parent account supports multiple child profiles, each with their own grade, progress, and gamification stats.",
  },
  {
    q: "Which subjects are covered?",
    a: "English, Mathematics, Science, EVS, General Knowledge, and Urdu/Hindi — with hundreds of lessons and quizzes per subject for every grade.",
  },
  {
    q: "How does the gamification system work?",
    a: "Children earn XP and coins for completing lessons. They level up, unlock avatar items, and earn badges — motivating consistent learning without peer competition.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. Lessons can be downloaded for offline use via the PWA. Progress syncs automatically when connectivity is restored.",
  },
  {
    q: "How much does it cost?",
    a: "There is a free plan with limited access. Premium plans include a 7-day free trial — no credit card required. School packages are also available.",
  },
  {
    q: "Is there a teacher or school version?",
    a: "Yes. Teachers have a dedicated dashboard to create lessons, assign work, and track student progress. Schools get bulk management, custom branding, and school-wide analytics.",
  },
  {
    q: "Which devices are supported?",
    a: "All modern browsers on desktops, tablets (iPad/Android), and smartphones (iOS/Android). Also installable as a PWA for a better mobile experience.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-sm pr-4">{q}</span>
        <div className={`w-7 h-7 min-w-[28px] rounded-lg flex items-center justify-center transition-colors ${open ? "bg-indigo-600" : "bg-indigo-50"}`}>
          {open ? <Minus size={13} className="text-white" /> : <Plus size={13} className="text-indigo-600" />}
        </div>
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed bg-gray-50 border-t border-gray-100">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-gray-500 text-base">
            Can't find what you need? Reach out to our support team.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-2 mb-12">
          {FAQS.map(({ q, a }) => (
            <FAQItem key={q} q={q} a={a} />
          ))}
        </div>

        {/* FOOTER CTA */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-7 text-center">
          <p className="text-gray-700 font-semibold mb-1">Still have questions?</p>
          <p className="text-sm text-gray-500 mb-5">Our support team is happy to help.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="mailto:support@edujoykids.com"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <Mail size={14} /> Email Support
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
