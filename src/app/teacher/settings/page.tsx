"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function TeacherSettingsPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Settings"
        description="Teacher profile and notification settings are coming soon!"
        backHref="/teacher"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
