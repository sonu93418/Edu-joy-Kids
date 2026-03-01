"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function AdminSchoolsPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Schools"
        description="School onboarding and management tools are coming soon!"
        backHref="/admin"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
