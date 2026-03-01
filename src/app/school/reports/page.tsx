"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function SchoolReportsPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Reports"
        description="School-wide reports and analytics are coming soon!"
        backHref="/school"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
