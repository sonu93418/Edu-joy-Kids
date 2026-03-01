"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function AdminSecurityPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Security"
        description="Security settings and audit logs are coming soon!"
        backHref="/admin"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
