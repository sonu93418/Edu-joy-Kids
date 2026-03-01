"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function TeacherStudentsPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Students"
        description="Student roster and performance tracking is coming soon!"
        backHref="/teacher"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
