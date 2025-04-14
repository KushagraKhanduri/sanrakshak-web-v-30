import React from 'react';
import { GeometricBackground } from '@/components/ui/GeometricBackground';
import AdminDashboardComponent from '@/components/dashboards/AdminDashboard';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-[#030303] text-white">
      <GeometricBackground />
      <AdminDashboardComponent />
    </div>
  );
};

export default AdminDashboard;
