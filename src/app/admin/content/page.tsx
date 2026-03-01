"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function AdminContentPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Content Management"
        description="Curriculum and content management tools are coming soon!"
        backHref="/admin"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
