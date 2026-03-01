"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function TeacherClassesPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="My Classes"
        description="Class management and student grouping features are coming soon!"
        backHref="/teacher"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
