
import React, { useState, useEffect } from 'react';
import { PageBackground } from '@/components/ui/DashboardBackground';
import Header from '../components/Header';
import AnimatedTransition from '@/components/AnimatedTransition';
import BackButton from '@/components/BackButton';
import StatusUpdate from '../components/StatusUpdate';
import { Bell, Filter, AlertTriangle, Info } from 'lucide-react';

const Alerts = () => {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  
  // Sample alerts data
  const alerts = [
    {
      id: '1',
      title: 'Flood Warning Issued',
      message: 'Flash flood warning for the eastern district. Seek higher ground immediately if in low-lying areas.',
      source: 'National Weather Service',
      timestamp: '25 minutes ago',
      priority: 'high' as const,
    },
    {
      id: '2',
      title: 'Power Restoration Progress',
      message: 'Crews are working to restore power to the eastern district. Estimated completion: 24 hours.',
      source: 'City Power & Utilities',
      timestamp: '1 hour ago',
      priority: 'high' as const,
    },
    {
      id: '3',
      title: 'Road Closure Update',
      message: 'Main Street between 5th and 8th Ave remains flooded and closed to traffic. Use alternate routes.',
      source: 'Department of Transportation',
      timestamp: '3 hours ago',
      priority: 'medium' as const,
    },
    {
      id: '4',
      title: 'Medical Supply Distribution',
      message: 'Medical supplies will be distributed at Community Center from 10 AM to 4 PM tomorrow.',
      source: 'Health Department',
      timestamp: '5 hours ago',
      priority: 'medium' as const,
    },
    {
      id: '5',
      title: 'Emergency Shelter Status',
      message: 'All emergency shelters have open capacity. Pets are now welcome at the North High School shelter.',
      source: 'Emergency Management',
      timestamp: '6 hours ago',
      priority: 'low' as const,
    },
    {
      id: '6',
      title: 'Boil Water Advisory',
      message: 'Boil water advisory in effect for downtown area. Boil water for at least one minute before consuming.',
      source: 'Water Authority',
      timestamp: '8 hours ago',
      priority: 'high' as const,
    },
    {
      id: '7',
      title: 'Volunteer Coordination',
      message: 'Volunteers needed for sandbag operations at the river front. Report to City Hall for assignment.',
      source: 'Volunteer Center',
      timestamp: '12 hours ago',
      priority: 'medium' as const,
    },
    {
      id: '8',
      title: 'Air Quality Alert',
      message: 'Air quality has improved to moderate levels. Those with respiratory conditions should still limit outdoor activity.',
      source: 'Environmental Protection',
      timestamp: '1 day ago',
      priority: 'low' as const,
    },
  ];
  
  const filteredAlerts = alerts.filter(
    alert => filter === 'all' || alert.priority === filter
  );
  
  return (
    <PageBackground>
      <div className="min-h-screen w-full text-white">
        <Header title="Emergency Alerts" />
        
        <AnimatedTransition>
          <main className="pt-20 pb-16 min-h-screen w-full">
            <div className="w-full px-4 sm:px-6 md:px-8">
              <div className="mb-4">
                <BackButton />
              </div>
            
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Emergency Alerts & Updates</h1>
                <p className="text-gray-400">Stay informed with the latest emergency information</p>
              </div>
              
              <div className="mb-6 flex items-center gap-3">
                <div className="flex items-center space-x-2">
                  <Filter size={16} className="text-gray-400" />
                  <span className="text-sm">Filter Priority:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filter === 'all' 
                        ? 'bg-white text-black' 
                        : 'bg-white/10 hover:bg-white/15'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('high')}
                    className={`px-3 py-1 rounded-full text-sm flex items-center ${
                      filter === 'high' 
                        ? 'bg-white text-black' 
                        : 'bg-white/10 hover:bg-white/15'
                    }`}
                  >
                    <AlertTriangle size={14} className="mr-1" />
                    Critical
                  </button>
                  <button
                    onClick={() => setFilter('medium')}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filter === 'medium' 
                        ? 'bg-white text-black' 
                        : 'bg-white/10 hover:bg-white/15'
                    }`}
                  >
                    Important
                  </button>
                  <button
                    onClick={() => setFilter('low')}
                    className={`px-3 py-1 rounded-full text-sm flex items-center ${
                      filter === 'low' 
                        ? 'bg-white text-black' 
                        : 'bg-white/10 hover:bg-white/15'
                    }`}
                  >
                    <Info size={14} className="mr-1" />
                    Info
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map(alert => (
                    <StatusUpdate
                      key={alert.id}
                      id={alert.id}
                      title={alert.title}
                      message={alert.message}
                      source={alert.source}
                      timestamp={alert.timestamp}
                      priority={alert.priority}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm">
                    <div className="flex justify-center mb-4">
                      <Bell size={48} className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Alerts</h3>
                    <p className="text-gray-400">
                      There are no alerts matching your current filter.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </AnimatedTransition>
      </div>
    </PageBackground>
  );
};

export default Alerts;
