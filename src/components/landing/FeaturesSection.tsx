"use client";

import Link from "next/link";
import {
  Brain, Shield, Gamepad2, BookOpen, BarChart3, Users,
  Clock, Award, Sparkles, MessageCircle, Music, Download,
  ArrowRight,
} from "lucide-react";

const FEATURES = [
  { icon: Brain,         title: "AI Study Buddy",       desc: "Personal AI tutor adapts to your child's learning style and identifies weak areas.",                    color: "bg-indigo-500"  },
  { icon: Gamepad2,      title: "Gamified Learning",    desc: "Earn XP, coins, and badges. Complete daily missions and level up through adventures.",                  color: "bg-violet-500"  },
  { icon: BookOpen,      title: "Curriculum-Aligned",   desc: "Structured lessons for English, Math, Science, and more — Play Group to Class 5.",                     color: "bg-blue-500"    },
  { icon: Shield,        title: "Child Safety First",   desc: "Zero ads, no external links, parental controls, and full COPPA compliance.",                           color: "bg-emerald-500" },
  { icon: BarChart3,     title: "Progress Analytics",   desc: "Real-time parent reports: subject performance, time spent, and improvement trends.",                   color: "bg-amber-500"   },
  { icon: Users,         title: "Multi-Role Platform",  desc: "Dedicated dashboards for students, parents, teachers, and school admins.",                             color: "bg-rose-500"    },
  { icon: MessageCircle, title: "AI Chat Tutor",        desc: "Student-safe AI chatbot answers questions and explains concepts at the right level.",                   color: "bg-teal-500"    },
  { icon: Clock,         title: "Screen Time Control",  desc: "Set daily time limits, restrict by day/hour, and monitor usage from the parent app.",                  color: "bg-orange-500"  },
  { icon: Award,         title: "Achievement System",   desc: "Hundreds of badges and rewards to celebrate milestones and keep kids motivated.",                      color: "bg-yellow-500"  },
  { icon: Music,         title: "Audio Learning",       desc: "Audio-assisted lessons and voice pronunciation practice for richer understanding.",                    color: "bg-pink-500"    },
  { icon: Download,      title: "Offline Access",       desc: "Download lessons for offline use — learning continues without internet.",                               color: "bg-slate-500"   },
  { icon: Sparkles,      title: "Smart Worksheets",     desc: "AI-generated worksheets and quizzes tailored to each child's performance gaps.",                       color: "bg-fuchsia-500" },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-block bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Everything Your Child Needs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Why Kids Love EduJoy Kids
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            A complete educational ecosystem combining structured curriculum with
            the excitement of games — making learning an adventure children look forward to.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-indigo-100 transition-all"
            >
              <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA BANNER */}
        <div className="mt-16 bg-indigo-600 rounded-2xl p-8 sm:p-10 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
            Ready to Start the Learning Adventure?
          </h3>
          <p className="text-indigo-200 text-base mb-7 max-w-xl mx-auto">
            Join over 50,000 students who have transformed their learning with EduJoy Kids.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-7 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Start Free Trial <ArrowRight size={16} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-7 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
