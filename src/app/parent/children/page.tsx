"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function ParentChildrenPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="My Children"
        description="Manage and monitor your children's learning profiles here. Coming soon!"
        backHref="/parent"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
