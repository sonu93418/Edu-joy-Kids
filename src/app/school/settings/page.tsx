"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function SchoolSettingsPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="School Settings"
        description="School configuration and billing settings are coming soon!"
        backHref="/school"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
