'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SchoolDashboard from '@/components/dashboard/SchoolDashboard';

export default function SchoolPage() {
  return (
    <DashboardLayout>
      <SchoolDashboard />
    </DashboardLayout>
  );
}
