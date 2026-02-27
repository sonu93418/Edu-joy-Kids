'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';

export default function TeacherPage() {
  return (
    <DashboardLayout>
      <TeacherDashboard />
    </DashboardLayout>
  );
}
