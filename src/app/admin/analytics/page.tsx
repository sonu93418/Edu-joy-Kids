"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComingSoon from "@/components/ui/ComingSoon";

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Platform Analytics"
        description="Platform-wide analytics and reporting are coming soon!"
        backHref="/admin"
        backLabel="Back to Dashboard"
      />
    </DashboardLayout>
  );
}
