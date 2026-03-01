"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function TeacherAnalyticsPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Analytics"
        description="Class analytics and learning insights are coming soon!"
        backHref="/teacher"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
