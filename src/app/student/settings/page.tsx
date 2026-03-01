"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function StudentSettingsPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Settings"
        description="Profile and account settings are being built. Coming soon!"
        backHref="/student"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
