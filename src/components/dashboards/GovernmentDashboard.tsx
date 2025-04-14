
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import ResourceCard from '../ResourceCard';
import StatusUpdate from '../StatusUpdate';
import AnimatedTransition from '../AnimatedTransition';
import { Link } from 'react-router-dom';
import useResourceData from '@/hooks/useResourceData';
import { Button } from '@/components/ui/button';
import { GeometricBackground } from '@/components/ui/GeometricBackground';

interface GovernmentDashboardProps {
  resourceData?: ReturnType<typeof useResourceData>;
}

const GovernmentDashboard: React.FC<GovernmentDashboardProps> = ({ resourceData }) => {
  const { resources, responses, loading } = resourceData || useResourceData();
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const respondedRequestIds = useMemo(() => {
    if (!user?.id) return new Set<string>();
    
    const userResponses = JSON.parse(localStorage.getItem(`responses_${user.id}`) || '[]');
    return new Set(userResponses.map((response: any) => response.requestId));
  }, [user, responses]);
  
  const availableResources = useMemo(() => {
    return resources
      .filter(resource => resource.type === 'need')
      .sort((a, b) => {
        if (a.urgent && !b.urgent) return -1;
        if (!a.urgent && b.urgent) return 1;
        return b.timestamp - a.timestamp;
      })
      .slice(0, 4);
  }, [resources]);
  
  const myOffers = useMemo(() => {
    if (!user?.id) return [];
    
    return resources
      .filter(resource => 
        resource.type === 'offer' && 
        resource.userId === user.id
      )
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 2);
  }, [resources, user]);
  
  return (
    <div className="min-h-screen w-full bg-[#030303] text-white relative">
      <GeometricBackground />
      <div className="w-full px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <div className="lg:col-span-2">
          <AnimatedTransition className="mb-6" delay={100}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 p-4 sm:p-6 bg-black/40 backdrop-blur-sm shadow-lg">
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center rounded-full bg-purple-500/20 px-2.5 py-1 text-xs">
                  <Info size={12} className="mr-1 text-purple-300" />
                  <span className="text-purple-200">Critical</span>
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="mb-4 sm:mb-0 sm:mr-6">
                  <div className="mb-2">
                    <h2 className="text-xl font-semibold text-white">Hurricane Warning: Category 3</h2>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Evacuation orders in effect for coastal areas. Shelters are open at Central High School and Community Center.
                  </p>
                  <div className="flex items-center text-xs text-gray-400">
                    <Info size={12} className="mr-1 text-purple-300" />
                    <span>Updated 30 minutes ago from National Weather Service</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-all text-white border-none"
                  >
                    <Link to="/emergency-plan">Emergency Plan</Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="bg-white/10 hover:bg-white/15 text-white border-white/20"
                  >
                    <Link to="/shelter-map">Shelter Map</Link>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition className="mb-6" delay={100}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Available Requests</h2>
              <Button
                variant="ghost"
                asChild
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Link to="/resources" className="flex items-center">
                  <span className="mr-1">View All</span>
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading ? (
                Array(4).fill(0).map((_, index) => (
                  <div key={`loading-${index}`} className="animate-pulse rounded-2xl p-6 bg-white/5 h-64"></div>
                ))
              ) : availableResources.length > 0 ? (
                availableResources.map(resource => (
                  <ResourceCard
                    key={resource.id}
                    type="need"
                    category={resource.category}
                    title={resource.title}
                    description={resource.description}
                    location={resource.location}
                    locationDetails={resource.locationDetails}
                    contact={resource.contact}
                    contactName={resource.contactName}
                    urgent={resource.urgent}
                    requestId={resource.id}
                    isRequested={user?.id && user.role === 'government' && respondedRequestIds.has(resource.id)}
                    className="rounded-2xl"
                  />
                ))
              ) : (
                <div className="col-span-2 p-6 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-sm text-center">
                  <p className="text-gray-400">No requests available at the moment.</p>
                </div>
              )}
            </div>
          </AnimatedTransition>
          
          {myOffers.length > 0 && (
            <AnimatedTransition className="mb-6" delay={150}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">My Offers</h2>
                <Button
                  variant="ghost"
                  asChild
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Link to="/government-resources" className="flex items-center">
                    <span className="mr-1">View All</span>
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myOffers.map(resource => (
                  <ResourceCard
                    key={resource.id}
                    type="offer"
                    category={resource.category}
                    title={resource.title}
                    description={resource.description}
                    location={resource.location}
                    contact={resource.contact}
                    urgent={resource.urgent}
                    requestId={resource.id}
                    isRequested={true}
                    className="rounded-2xl"
                  />
                ))}
              </div>
            </AnimatedTransition>
          )}
          
          <AnimatedTransition delay={200}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Status Updates</h2>
              <Button
                variant="ghost"
                asChild
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Link to="/alerts" className="flex items-center">
                  <span className="mr-1">View All</span>
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              <StatusUpdate
                id="status-1"
                title="Power Restoration Progress"
                message="Crews are working to restore power to the eastern district. Estimated completion: 24 hours."
                source="City Power & Utilities"
                timestamp="1 hour ago"
                priority="high"
              />
              
              <StatusUpdate
                id="status-2"
                title="Road Closure Update"
                message="Main Street between 5th and 8th Ave remains flooded and closed to traffic. Use alternate routes."
                source="Department of Transportation"
                timestamp="3 hours ago"
                priority="medium"
              />
            </div>
          </AnimatedTransition>
        </div>
        
        <div>
          <AnimatedTransition className="mb-6" delay={150}>
            <div className="rounded-2xl border border-white/10 p-4 sm:p-6 bg-black/40 backdrop-blur-sm shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button asChild className="w-full">
                  <Link to="/government-resources">Offer Resources</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/government-tasks">View Assigned Tasks</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/alerts">Check Alerts</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/connect">Connect with Others</Link>
                </Button>
              </div>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition delay={250}>
            <div className="rounded-2xl border border-white/10 p-4 sm:p-6 bg-black/40 backdrop-blur-sm shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Government Stats</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Resources Deployed:</span>
                  <span className="font-semibold">42 Units</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Tasks Managed:</span>
                  <span className="font-semibold">15 Tasks</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Community Impact:</span>
                  <span className="font-semibold">38 People Helped</span>
                </div>
              </div>
              
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/government-stats">View Full Stats</Link>
              </Button>
            </div>
          </AnimatedTransition>
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;
