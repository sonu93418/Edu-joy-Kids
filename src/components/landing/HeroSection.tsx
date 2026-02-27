"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Trophy,
  Star,
  Zap,
} from "lucide-react";

// Floating elements for background
const FloatingElement = ({
  emoji,
  initialX,
  initialY,
  delay,
}: {
  emoji: string;
  initialX: number;
  initialY: number;
  delay: number;
}) => (
  <motion.div
    className="absolute text-2xl sm:text-4xl pointer-events-none select-none z-0"
    initial={{ x: initialX, y: initialY, opacity: 0 }}
    animate={{
      y: [initialY, initialY - 20, initialY],
      opacity: [0.4, 0.8, 0.4],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    {emoji}
  </motion.div>
);

// Mascot Component
const Mascot = () => (
  <motion.div
    className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.5 }}
  >
    {/* Mascot character - an animated owl */}
    <div className="relative w-full h-full">
      {/* Body */}
      <motion.div
        className="w-32 h-40 sm:w-40 sm:h-48 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl mx-auto relative overflow-hidden shadow-2xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Face */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          {/* Eyes */}
          <div className="flex space-x-4 mb-2">
            <motion.div
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-inner"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-4 h-4 bg-gray-800 rounded-full" />
            </motion.div>
            <motion.div
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-inner"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1,
              }}
            >
              <div className="w-4 h-4 bg-gray-800 rounded-full" />
            </motion.div>
          </div>
          {/* Beak */}
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-10 border-l-transparent border-r-transparent border-t-orange-500 mx-auto" />
          {/* Smile */}
          <motion.div
            className="w-12 h-4 border-b-3 border-orange-600 rounded-full mx-auto mt-2"
            animate={{ scaleX: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Belly pattern */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-100 rounded-full opacity-50" />

        {/* Wings */}
        <motion.div
          className="absolute -left-6 top-8 w-10 h-16 bg-gradient-to-r from-orange-300 to-yellow-400 rounded-l-full opacity-80"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-6 top-8 w-10 h-16 bg-gradient-to-l from-orange-300 to-yellow-400 rounded-r-full opacity-80"
          animate={{ rotate: [10, -10, 10] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Hat */}
      <motion.div
        className="absolute -top-4 left-1/2 transform -translate-x-1/2"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-20 h-4 bg-purple-600 rounded-full" />
        <div className="w-12 h-14 bg-purple-600 mx-auto -mt-1 rounded-t-lg flex items-center justify-center">
          <Star className="w-4 h-4 text-yellow-300 fill-current" />
        </div>
      </motion.div>

      {/* Sparkles around mascot - fixed positions derived from index (no Math.random → no hydration mismatch) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${20 + ((i * 13) % 60)}%`,
            left: `${(i * 23) % 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// Stats counter component
const StatCounter = ({
  value,
  label,
  icon,
  delay,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
}) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <div className="w-12 h-12 bg-gradient-to-br from-edujoy-primary-400 to-fun-pink rounded-2xl flex items-center justify-center mx-auto mb-2">
      <div className="text-white">{icon}</div>
    </div>
    <div className="text-2xl font-bold gradient-text">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </motion.div>
);

// Class Card Component
const ClassCard = ({
  emoji,
  grade,
  ageRange,
  delay,
}: {
  emoji: string;
  grade: string;
  ageRange: string;
  delay: number;
}) => (
  <motion.div
    className="card-fun cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 text-center"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 100 }}
    whileHover={{ scale: 1.1, y: -5 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="text-4xl mb-2">{emoji}</div>
    <div className="font-bold text-gray-800">{grade}</div>
    <div className="text-sm text-gray-500">{ageRange}</div>
  </motion.div>
);

// Main Hero Section
const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Fun", "Easy", "Smart", "Safe", "Creative", "Amazing"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const classes = [
    { emoji: "🌱", grade: "Play Group", ageRange: "3-4 Years" },
    { emoji: "🌸", grade: "Nursery", ageRange: "4-5 Years" },
    { emoji: "🌿", grade: "LKG", ageRange: "5-6 Years" },
    { emoji: "🌻", grade: "UKG", ageRange: "6-7 Years" },
    { emoji: "⭐", grade: "Class 1", ageRange: "7-8 Years" },
    { emoji: "🏆", grade: "Class 2", ageRange: "8-9 Years" },
    { emoji: "🚀", grade: "Class 3", ageRange: "9-10 Years" },
    { emoji: "💡", grade: "Class 4", ageRange: "10-11 Years" },
    { emoji: "🎓", grade: "Class 5", ageRange: "11-12 Years" },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 overflow-hidden pt-16">
      {/* Background floating elements */}
      <FloatingElement emoji="⭐" initialX={50} initialY={100} delay={0} />
      <FloatingElement emoji="🌈" initialX={1100} initialY={200} delay={0.5} />
      <FloatingElement emoji="📚" initialX={100} initialY={400} delay={1} />
      <FloatingElement emoji="🎯" initialX={1050} initialY={500} delay={1.5} />
      <FloatingElement emoji="🌟" initialX={200} initialY={600} delay={0.3} />
      <FloatingElement emoji="🎨" initialX={1150} initialY={700} delay={0.8} />
      <FloatingElement emoji="🦁" initialX={300} initialY={200} delay={0.2} />
      <FloatingElement emoji="🐬" initialX={950} initialY={350} delay={0.7} />

      {/* Background circles */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-200 rounded-full opacity-30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main hero content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          {/* Left side: Text content */}
          <div>
            <motion.div
              className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-md mb-6 space-x-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                AI-Powered Learning Platform for Kids
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-gray-800">Learning Made</span>
              <br />
              <span className="relative">
                <motion.span
                  key={currentWord}
                  className="gradient-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {words[currentWord]}
                </motion.span>
              </span>
              <br />
              <span className="text-gray-800">for Every Child</span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              A safe, gamified, AI-powered educational platform for children
              from Play Group to Class 5. Earn XP, unlock adventures, and master
              every subject with your personal AI tutor!
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/auth/signup">
                <motion.button
                  className="btn-fun flex items-center justify-center space-x-2 text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="w-5 h-5" />
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link href="/auth/login">
                <motion.button
                  className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Parent Login</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap gap-4 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="flex items-center space-x-1">
                <span className="text-green-500">✓</span>
                <span>Free 7-day trial</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-green-500">✓</span>
                <span>No credit card required</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-green-500">✓</span>
                <span>100% safe for kids</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-green-500">✓</span>
                <span>COPPA Compliant</span>
              </span>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-3xl shadow-fun"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <StatCounter
                value="50K+"
                label="Happy Students"
                icon={<Star className="w-5 h-5 fill-current" />}
                delay={0.8}
              />
              <StatCounter
                value="500+"
                label="Lessons"
                icon={<BookOpen className="w-5 h-5" />}
                delay={0.9}
              />
              <StatCounter
                value="98%"
                label="Parent Trust"
                icon={<Trophy className="w-5 h-5" />}
                delay={1.0}
              />
            </motion.div>
          </div>

          {/* Right side: Mascot */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <Mascot />

              {/* Achievement popup */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-2 shadow-fun border-2 border-yellow-400"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🏆</span>
                  <div>
                    <div className="text-xs font-bold text-gray-800">
                      Level Up!
                    </div>
                    <div className="text-xs text-yellow-600">
                      +100 XP Earned
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Streak notification */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-2 shadow-fun border-2 border-orange-400"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2, type: "spring" }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🔥</span>
                  <div>
                    <div className="text-xs font-bold text-gray-800">
                      7 Day Streak!
                    </div>
                    <div className="text-xs text-orange-600">Keep it up!</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Class Selection Grid */}
        <motion.div
          className="pb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
            Select Your
            <span className="gradient-text"> Class</span>
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {classes.map((classItem, index) => (
              <ClassCard
                key={classItem.grade}
                emoji={classItem.emoji}
                grade={classItem.grade}
                ageRange={classItem.ageRange}
                delay={0.9 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
