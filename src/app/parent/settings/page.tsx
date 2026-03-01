"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function ParentSettingsPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Settings"
        description="Account and notification settings are coming soon!"
        backHref="/parent"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
