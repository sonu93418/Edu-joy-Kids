"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Layers, BookOpen, Trophy } from "lucide-react";

const StepCard = ({
  number,
  icon,
  title,
  description,
  color,
  delay,
}: {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, type: "spring" }}
    >
      {/* Number badge */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-edujoy-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold z-10 shadow-lg">
        {number}
      </div>

      {/* Icon */}
      <div
        className={`w-20 h-20 ${color} rounded-3xl flex items-center justify-center mb-6 shadow-fun transform hover:scale-110 transition-transform duration-300`}
      >
        <div className="text-white text-3xl">{icon}</div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed max-w-xs">{description}</p>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: 1,
      icon: <UserPlus className="w-8 h-8" />,
      title: "Parent Signs Up",
      description:
        "Create a parent account in 30 seconds. Complete safety verification and set up parental controls for your child.",
      color: "bg-gradient-to-br from-purple-500 to-edujoy-primary-500",
      delay: 0.2,
    },
    {
      number: 2,
      icon: <Layers className="w-8 h-8" />,
      title: "Create Child Profile",
      description:
        "Add your child's profile with their grade, name, and preferences. Our AI creates a personalized learning path instantly.",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      delay: 0.4,
    },
    {
      number: 3,
      icon: <BookOpen className="w-8 h-8" />,
      title: "Start Learning",
      description:
        "Your child begins their adventure with animated lessons, interactive activities, and fun games aligned to the curriculum.",
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      delay: 0.6,
    },
    {
      number: 4,
      icon: <Trophy className="w-8 h-8" />,
      title: "Track & Celebrate",
      description:
        "Monitor real-time progress, celebrate achievements, and watch your child's confidence and grades improve every week!",
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      delay: 0.8,
    },
  ];

  const features = [
    { emoji: "🎯", label: "Personalized curriculum" },
    { emoji: "🤖", label: "AI-powered insights" },
    { emoji: "🔒", label: "Zero ads, child-safe" },
    { emoji: "📊", label: "Live parent dashboard" },
    { emoji: "🎓", label: "Certified content" },
    { emoji: "📱", label: "All devices supported" },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            Simple 4-Step Process
          </motion.span>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Getting Started is
            <span className="gradient-text"> Super Easy!</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            From signup to first lesson in under 5 minutes. Our platform is
            designed to be intuitive for both parents and children of all ages.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative mb-20">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-edujoy-primary-300 via-blue-300 to-yellow-300" />

          {steps.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
              color={step.color}
              delay={step.delay}
            />
          ))}
        </div>

        {/* Feature highlights */}
        <motion.div
          className="bg-white rounded-3xl shadow-fun p-8 sm:p-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Built for the Modern Family 👨‍👩‍👧‍👦
              </h3>
              <p className="text-gray-600 mb-6">
                EduJoy Kids brings education, safety, and entertainment
                together. Parents stay in control while kids enjoy learning like
                never before.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-xl">{feature.emoji}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Mock dashboard preview */}
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6 shadow-inner">
                <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm">
                      🌟
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-800">
                        Level 5 • Math Master
                      </div>
                      <div className="text-xs text-gray-500">
                        350/400 XP to Level 6
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                      style={{ width: "87%" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {["English 90%", "Math 75%", "Science 85%"].map((subject) => (
                    <div
                      key={subject}
                      className="bg-white rounded-xl p-3 text-center shadow-sm"
                    >
                      <div className="text-lg mb-1">
                        {subject.split(" ")[0] === "English"
                          ? "📚"
                          : subject.split(" ")[0] === "Math"
                            ? "🔢"
                            : "🔬"}
                      </div>
                      <div className="text-xs font-bold text-gray-800">
                        {subject.split(" ")[1]}
                      </div>
                      <div className="text-xs text-gray-500">
                        {subject.split(" ")[0]}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 bg-white rounded-xl p-3 shadow-sm">
                  <div className="text-xs font-bold text-gray-700 mb-2">
                    🔥 7-Day Streak • Daily Goal: 80%
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div
                        key={day}
                        className={`flex-1 h-6 rounded-md ${day <= 5 ? "bg-orange-400" : "bg-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
