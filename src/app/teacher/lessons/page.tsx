"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function TeacherLessonsPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Lessons"
        description="Lesson creation and management tools are coming soon!"
        backHref="/teacher"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
