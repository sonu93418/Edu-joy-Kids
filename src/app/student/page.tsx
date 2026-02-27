'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StudentDashboard from '@/components/dashboard/StudentDashboard';

export default function StudentPage() {
  return (
    <DashboardLayout>
      <StudentDashboard />
    </DashboardLayout>
  );
}
