"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Star,
  Zap,
  Home,
  RotateCcw,
  Trophy,
  Volume2,
} from "lucide-react";
import { useGame } from "@/store/game-store";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Mock lesson data
const MOCK_LESSONS: Record<
  string,
  {
    id: string;
    title: string;
    subject: string;
    grade: string;
    xpReward: number;
    slides: Array<{
      type: "content" | "quiz" | "result";
      title?: string;
      content?: string;
      emoji?: string;
      question?: string;
      options?: string[];
      correct?: number;
      explanation?: string;
    }>;
  }
> = {
  e4: {
    id: "e4",
    title: "Sight Words Practice",
    subject: "English",
    grade: "Class 2",
    xpReward: 40,
    slides: [
      {
        type: "content",
        title: "What are Sight Words?",
        emoji: "👁️",
        content:
          "Sight words are the most common words in the English language. We read them so often that we should know them by sight — without having to sound them out!\n\nExamples: the, a, is, are, was, were, I, you, he, she, it, we, they",
      },
      {
        type: "content",
        title: "Common Sight Words",
        emoji: "📚",
        content:
          'Let\'s learn some important sight words:\n\n🔵 THE — "The cat sat on the mat."\n🔵 AND — "Tom and Jerry are friends."\n🔵 IS — "She is happy."\n🔵 ARE — "They are playing."\n🔵 HAVE — "I have a book."',
      },
      {
        type: "quiz",
        question: "Which of these is a sight word?",
        options: ["Elephant", "The", "Crocodile", "Beautiful"],
        correct: 1,
        explanation:
          'Correct! "The" is one of the most common sight words in English.',
      },
      {
        type: "quiz",
        question: 'Complete the sentence: "Tom ____ Jerry are friends."',
        options: ["or", "but", "and", "with"],
        correct: 2,
        explanation:
          '"And" connects two things together. Tom AND Jerry are both mentioned here.',
      },
      {
        type: "quiz",
        question: "Which sentence uses a sight word correctly?",
        options: [
          "She are happy",
          "She is happy",
          "She be happy",
          "She am happy",
        ],
        correct: 1,
        explanation:
          '"Is" is the correct sight word here. "She is happy" is correct!',
      },
      {
        type: "quiz",
        question: 'Choose the sight word: "I ____ a book."',
        options: ["possess", "have", "owns", "holding"],
        correct: 1,
        explanation:
          '"Have" is a sight word. "I have a book" is perfectly correct!',
      },
      { type: "result" as const },
    ],
  },
  m4: {
    id: "m4",
    title: "Shapes & Patterns",
    subject: "Math",
    grade: "Class 2",
    xpReward: 40,
    slides: [
      {
        type: "content",
        title: "2D Shapes",
        emoji: "🔷",
        content:
          "Let's learn about 2D (flat) shapes!\n\n🔴 Circle — round, no corners\n🟦 Square — 4 equal sides, 4 corners\n🟩 Rectangle — 4 sides, opposite sides equal\n🔺 Triangle — 3 sides, 3 corners\n🔶 Rhombus — 4 equal sides, like a diamond",
      },
      {
        type: "quiz",
        question: "How many sides does a triangle have?",
        options: ["2", "3", "4", "5"],
        correct: 1,
        explanation: "A triangle has exactly 3 sides and 3 corners (angles).",
      },
      {
        type: "quiz",
        question: "Which shape has no corners?",
        options: ["Square", "Triangle", "Rectangle", "Circle"],
        correct: 3,
        explanation: "A circle is round and has no corners or straight sides!",
      },
      {
        type: "quiz",
        question: "A square has how many equal sides?",
        options: ["2", "3", "4", "6"],
        correct: 2,
        explanation: "A square has 4 equal sides — all the same length!",
      },
      { type: "result" as const },
    ],
  },
};

const DEFAULT_LESSON = MOCK_LESSONS.e4;

export default function LessonViewerPage() {
  const { lessonId } = useParams() as { lessonId: string };
  const router = useRouter();
  const { addXP } = useGame();
  const lesson = MOCK_LESSONS[lessonId] || DEFAULT_LESSON;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalSlides = lesson.slides.length;
  const slide = lesson.slides[currentSlide];
  const quizSlides = lesson.slides.filter((s) => s.type === "quiz");
  const quizIndex = lesson.slides
    .slice(0, currentSlide + 1)
    .filter((s) => s.type === "quiz").length;
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [totalSlides]);

  const goPrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleAnswer = (idx: number) => {
    if (isAnswered || slide.type !== "quiz") return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    if (idx === slide.correct) {
      setCorrectCount((prev) => prev + 1);
      const xp = Math.round(lesson.xpReward / quizSlides.length);
      setXpEarned((prev) => prev + xp);
    }
  };

  useEffect(() => {
    if (slide.type === "result" && xpEarned > 0) {
      addXP(xpEarned, "Completed lesson: " + lesson.title);
    }
  }, [slide.type, xpEarned, addXP, lesson.title]);

  const stars =
    correctCount === quizSlides.length
      ? 3
      : correctCount >= quizSlides.length * 0.7
        ? 2
        : 1;

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/student/learn"
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h1 className="font-black text-gray-800 text-sm truncate">
                {lesson.title}
              </h1>
              <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                {currentSlide + 1}/{totalSlides}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-edujoy-primary-400 to-fun-purple transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-1 text-fun-orange font-black text-sm">
            <Zap size={14} />+{xpEarned}
          </div>
        </div>

        {/* Slide Content */}
        <div className="card-fun overflow-hidden min-h-[420px] flex flex-col relative">
          <div key={currentSlide} className="flex-1 p-6 flex flex-col">
            {slide.type === "content" && (
              <>
                <div className="text-center mb-6">
                  <div className="text-6xl mb-3">{slide.emoji}</div>
                  <h2 className="text-2xl font-black text-gray-800">
                    {slide.title}
                  </h2>
                </div>
                <div className="flex-1 bg-gradient-to-br from-edujoy-primary-50 to-fun-purple/10 rounded-2xl p-5">
                  <p className="text-gray-700 font-medium leading-relaxed whitespace-pre-line">
                    {slide.content}
                  </p>
                </div>
              </>
            )}

            {slide.type === "quiz" && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-black bg-fun-purple/10 text-fun-purple px-3 py-1 rounded-full">
                    Question {quizIndex} of {quizSlides.length}
                  </span>
                </div>
                <h2 className="text-xl font-black text-gray-800 mb-5">
                  {slide.question}
                </h2>
                <div className="space-y-3 flex-1">
                  {slide.options?.map((option, idx) => {
                    let btnClass =
                      "border-2 border-gray-200 bg-white hover:border-edujoy-primary-300 hover:bg-edujoy-primary-50 text-gray-700";
                    if (isAnswered) {
                      if (idx === slide.correct)
                        btnClass =
                          "border-2 border-fun-green bg-green-50 text-green-700";
                      else if (idx === selectedAnswer && idx !== slide.correct)
                        btnClass =
                          "border-2 border-red-300 bg-red-50 text-red-700";
                      else
                        btnClass =
                          "border-2 border-gray-100 bg-gray-50 text-gray-400 opacity-60";
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full p-4 rounded-2xl font-bold text-left transition-all flex items-center gap-3 ${btnClass} ${!isAnswered ? "cursor-pointer" : "cursor-not-allowed"}`}
                      >
                        <span
                          className={`w-7 h-7 rounded-xl font-black text-sm flex items-center justify-center flex-shrink-0 ${
                            isAnswered && idx === slide.correct
                              ? "bg-fun-green text-white"
                              : isAnswered && idx === selectedAnswer
                                ? "bg-red-400 text-white"
                                : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {["A", "B", "C", "D"][idx]}
                        </span>
                        {option}
                        {isAnswered && idx === slide.correct && (
                          <CheckCircle
                            size={18}
                            className="ml-auto text-fun-green flex-shrink-0"
                          />
                        )}
                        {isAnswered &&
                          idx === selectedAnswer &&
                          idx !== slide.correct && (
                            <XCircle
                              size={18}
                              className="ml-auto text-red-400 flex-shrink-0"
                            />
                          )}
                      </button>
                    );
                  })}
                </div>
                {isAnswered && (
                  <div
                    className={`mt-4 p-4 rounded-2xl ${selectedAnswer === slide.correct ? "bg-green-50 border border-green-200" : "bg-orange-50 border border-orange-200"}`}
                  >
                    <p className="text-sm font-bold mb-1">
                      {selectedAnswer === slide.correct
                        ? "🎉 Correct! +" +
                          Math.round(lesson.xpReward / quizSlides.length) +
                          " XP"
                        : "💡 Not quite right"}
                    </p>
                    <p className="text-sm text-gray-600">{slide.explanation}</p>
                  </div>
                )}
              </>
            )}

            {slide.type === "result" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
                <div className="text-8xl mb-4">🏆</div>
                <h2 className="text-3xl font-black text-gray-800 mb-1">
                  Lesson Complete!
                </h2>
                <p className="text-gray-500 mb-4">{lesson.title}</p>

                {/* Stars */}
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={s <= stars ? "opacity-100" : "opacity-30"}
                    >
                      <Star
                        size={48}
                        className={
                          s <= stars
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200 fill-gray-200"
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-xs">
                  <div className="bg-orange-50 rounded-2xl p-3">
                    <p className="text-2xl font-black text-fun-orange">
                      +{xpEarned}
                    </p>
                    <p className="text-xs text-gray-500">XP Earned</p>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-3">
                    <p className="text-2xl font-black text-fun-green">
                      {correctCount}/{quizSlides.length}
                    </p>
                    <p className="text-xs text-gray-500">Correct</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-3">
                    <p className="text-2xl font-black text-fun-purple">
                      {stars}
                    </p>
                    <p className="text-xs text-gray-500">Stars</p>
                  </div>
                </div>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => {
                      setCurrentSlide(0);
                      setCorrectCount(0);
                      setXpEarned(0);
                      setIsAnswered(false);
                      setSelectedAnswer(null);
                    }}
                    className="flex-1 py-3 rounded-2xl border-2 border-gray-200 font-black text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <RotateCcw size={16} /> Retry
                  </button>
                  <Link href="/student/learn" className="flex-1">
                    <div className="btn-fun py-3 font-black flex items-center justify-center gap-2 w-full">
                      <Home size={16} /> Done
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        {slide.type !== "result" && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={goPrev}
              disabled={currentSlide === 0}
              className="flex-shrink-0 p-3 rounded-2xl border-2 border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              disabled={slide.type === "quiz" && !isAnswered}
              className="flex-1 btn-fun py-3 font-black flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {currentSlide === totalSlides - 2 ? "See Results" : "Continue"}
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
