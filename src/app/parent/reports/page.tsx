"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function ParentReportsPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Reports"
        description="Detailed learning reports for your children are coming soon!"
        backHref="/parent"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
