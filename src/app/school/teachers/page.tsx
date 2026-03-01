"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function SchoolTeachersPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Teachers"
        description="Teacher management and classroom tools are coming soon!"
        backHref="/school"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
