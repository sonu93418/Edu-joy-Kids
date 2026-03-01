"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function AdminUsersPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Users Management"
        description="User management tools are coming soon!"
        backHref="/admin"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
