"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Star,
  Play,
  Lock,
  CheckCircle,
  Clock,
  Zap,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import {
  SUBJECTS,
  GRADES,
  getLessonsBySubjectAndGrade,
  getLessonsBySubject,
  getAvailableGradesForSubject,
  type Lesson,
} from "@/lib/lesson-data";
import {
  SUBJECT_ICON_MAP,
  LESSON_TYPE_ICON_MAP,
} from "@/components/ui/SubjectIcons";

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

export default function LearnPage() {
  const [activeSubject, setActiveSubject] = useState("english");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [searchQuery, setSearchQuery] = useState("");

  const subject = SUBJECTS.find((s) => s.id === activeSubject)!;
  const availableGrades = getAvailableGradesForSubject(activeSubject);

  const lessons: Lesson[] = useMemo(() => {
    let list =
      selectedGrade === "All Grades"
        ? getLessonsBySubject(activeSubject)
        : getLessonsBySubjectAndGrade(activeSubject, selectedGrade);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.grade.toLowerCase().includes(q),
      );
    }
    return list;
  }, [activeSubject, selectedGrade, searchQuery]);

  const completedCount = lessons.filter((l) => l.status === "completed").length;
  const progressPct =
    lessons.length > 0
      ? Math.round((completedCount / lessons.length) * 100)
      : 0;

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-edujoy-primary-500" />
            My Lessons
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Pakistan curriculum · Play Group – Class 5
          </p>
        </div>

        {/* Subject Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {SUBJECTS.map((s) => {
            const subLessons = getLessonsBySubject(s.id);
            const done = subLessons.filter(
              (l) => l.status === "completed",
            ).length;
            const pct =
              subLessons.length > 0
                ? Math.round((done / subLessons.length) * 100)
                : 0;
            const IconComponent = SUBJECT_ICON_MAP[s.id];
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSubject(s.id);
                  setSelectedGrade("All Grades");
                }}
                className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-2xl text-sm font-semibold transition-all min-w-[90px] ${
                  activeSubject === s.id
                    ? `bg-gradient-to-br ${s.color} text-white shadow-lg scale-105`
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {IconComponent && <IconComponent size={20} />}
                <span className="text-xs">{s.label}</span>
                <span
                  className={`text-xs ${activeSubject === s.id ? "opacity-80" : "text-gray-400"}`}
                >
                  {pct}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Grade + Search bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1">
            {["All Grades", ...availableGrades].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedGrade === g
                    ? "bg-edujoy-primary-600 text-white shadow"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-edujoy-primary-300"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                {g}
              </button>
            ))}
          </div>
          <div className="relative min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-edujoy-primary-300"
            />
          </div>
        </div>

        {/* Subject progress banner */}
        <div
          className={`rounded-2xl bg-gradient-to-r ${subject.color} p-4 text-white`}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              {(() => {
                const SubjectIcon = SUBJECT_ICON_MAP[activeSubject];
                return SubjectIcon ? (
                  <SubjectIcon size={24} className="inline mr-2" />
                ) : null;
              })()}
              <span className="font-bold text-lg">{subject.label}</span>
              {selectedGrade !== "All Grades" && (
                <span className="ml-2 text-sm opacity-80">
                  · {selectedGrade}
                </span>
              )}
            </div>
            <span className="text-sm opacity-90 font-medium">
              {completedCount}/{lessons.length} lessons
            </span>
          </div>
          <div className="bg-white/30 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs mt-1 opacity-80">{progressPct}% complete</p>
        </div>

        {/* Lesson Grid */}
        {lessons.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No lessons found</p>
            <p className="text-sm mt-1">Try a different grade or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} subject={subject} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function LessonCard({
  lesson,
  subject,
}: {
  lesson: Lesson;
  subject: { color: string };
}) {
  const isLocked = lesson.status === "locked";
  const isCompleted = lesson.status === "completed";

  return (
    <div
      className={`relative bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden shadow-sm ${
        isLocked
          ? "border-gray-200 opacity-60"
          : isCompleted
            ? "border-green-300 hover:shadow-md hover:-translate-y-0.5"
            : "border-edujoy-primary-200 hover:shadow-md hover:border-edujoy-primary-400 hover:-translate-y-0.5"
      }`}
    >
      <div
        className={`h-1.5 w-full ${isCompleted ? "bg-green-400" : isLocked ? "bg-gray-300" : "bg-gradient-to-r from-edujoy-primary-400 to-fun-pink"}`}
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          {(() => {
            const SubjectIcon = SUBJECT_ICON_MAP[lesson.subjectId];
            return SubjectIcon ? (
              <SubjectIcon size={32} className="text-edujoy-primary-500" />
            ) : null;
          })()}
          <StatusBadge status={lesson.status} />
        </div>
        <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">
          {lesson.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          {lesson.grade} ·
          {(() => {
            const TypeIcon = LESSON_TYPE_ICON_MAP[lesson.type];
            return TypeIcon ? <TypeIcon size={14} className="inline" /> : null;
          })()}{" "}
          {lesson.type}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {lesson.duration}
          </span>
          <span className="flex items-center gap-1 text-yellow-600">
            <Zap className="w-3.5 h-3.5" />
            {lesson.xpReward} XP
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${DIFFICULTY_COLOR[lesson.difficulty]}`}
          >
            {lesson.difficulty}
          </span>
        </div>
        {isCompleted && lesson.stars && (
          <div className="flex gap-0.5 mb-3">
            {[1, 2, 3].map((i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i <= lesson.stars! ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
              />
            ))}
          </div>
        )}
        {isLocked ? (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-100 text-gray-400 text-sm font-medium cursor-not-allowed"
          >
            <Lock className="w-4 h-4" />
            Locked
          </button>
        ) : (
          <Link
            href={`/student/lesson/${lesson.id}`}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-edujoy-primary-500 to-fun-pink text-white text-sm font-semibold hover:from-edujoy-primary-600 hover:to-fun-pink transition-all"
          >
            {isCompleted ? "Replay" : "Start Lesson"}
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "completed")
    return (
      <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
        <CheckCircle className="w-3 h-3" />
        Done
      </span>
    );
  if (status === "locked")
    return (
      <span className="flex items-center gap-1 bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">
        <Lock className="w-3 h-3" />
        Locked
      </span>
    );
  return (
    <span className="flex items-center gap-1 bg-edujoy-primary-100 text-edujoy-primary-700 text-xs font-bold px-2 py-1 rounded-full">
      <Play className="w-3 h-3 fill-edujoy-primary-700" />
      New
    </span>
  );
}
