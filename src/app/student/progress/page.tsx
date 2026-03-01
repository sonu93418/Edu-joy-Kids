"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function StudentProgressPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="My Progress"
        description="Detailed progress tracking across all subjects is coming soon!"
        backHref="/student"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
