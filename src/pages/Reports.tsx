import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReportsSection from '@/components/ReportsSection';
import { GeometricBackground } from '@/components/ui/GeometricBackground';

const Reports = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#030303] text-white">
      <GeometricBackground />
      <div className="w-full px-4 sm:px-6 md:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center text-gray-400 hover:text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold">NGO Reports</h1>
          <p className="text-gray-400">Access and download all disaster response reports.</p>
        </div>
        
        <ReportsSection />
      </div>
    </div>
  );
};

export default Reports;
