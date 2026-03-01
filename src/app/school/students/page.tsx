"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function SchoolStudentsPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Students"
        description="Student enrollment and management tools are coming soon!"
        backHref="/school"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
