
import React from 'react';
import { HeroGeometric } from '@/components/ui/HeroGeometric';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Download, Share2 } from 'lucide-react';

const EmergencyPlan = () => {
  return (
    <HeroGeometric
      badge="Emergency Plan"
      title1="Stay Prepared"
      title2="Stay Safe"
      description="Access your personalized emergency response plan and essential resources for immediate action during critical situations."
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center gap-4">
          <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download Plan
          </Button>
          <Button variant="outline" className="border-white/20" size="lg">
            <Share2 className="mr-2 h-4 w-4" />
            Share Plan
          </Button>
        </div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <span className="text-sm text-red-200">
            Review and update your plan regularly
          </span>
        </div>
      </div>
    </HeroGeometric>
  );
};

export default EmergencyPlan;
