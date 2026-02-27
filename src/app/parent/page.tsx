'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ParentDashboard from '@/components/dashboard/ParentDashboard';

export default function ParentPage() {
  return (
    <DashboardLayout>
      <ParentDashboard />
    </DashboardLayout>
  );
}
