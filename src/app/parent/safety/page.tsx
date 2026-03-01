"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function ParentSafetyPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Safety & Controls"
        description="Parental controls and safety settings are coming soon!"
        backHref="/parent"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
