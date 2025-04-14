import React, { useMemo, useState, useEffect } from 'react';
import { Info, ArrowRight } from 'lucide-react';
import ResourceCard from '../ResourceCard';
import StatusUpdate from '../StatusUpdate';
import EmergencyContact from '../EmergencyContact';
import LocationFinder from '../LocationFinder';
import AnimatedTransition from '../AnimatedTransition';
import { Link } from 'react-router-dom';
import useResourceData from '@/hooks/useResourceData';
import EmergencyContactsDialog from '../EmergencyContactsDialog';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeProvider';

interface VictimDashboardProps {
  resourceData?: ReturnType<typeof useResourceData>;
}

const VictimDashboard: React.FC<VictimDashboardProps> = ({ resourceData }) => {
  const { resources, responses, loading } = resourceData || useResourceData();
  const [user, setUser] = useState<any>(null);
  const [showAllContacts, setShowAllContacts] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
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
      .filter(resource => resource.type === 'offer')
      .sort((a, b) => {
        if (a.urgent && !b.urgent) return -1;
        if (!a.urgent && b.urgent) return 1;
        return b.timestamp - a.timestamp;
      })
      .slice(0, 4);
  }, [resources]);
  
  const myRequests = useMemo(() => {
    if (!user?.id) return [];
    
    return resources
      .filter(resource => 
        resource.type === 'need' && 
        resource.userId === user.id
      )
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 2);
  }, [resources, user]);
  
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <AnimatedTransition className="mb-6" delay={100}>
          <div className={cn(
            "p-6 rounded-2xl backdrop-blur-sm transition-all duration-300",
            isLight
              ? "bg-white/80 border border-gray-200 shadow-soft"
              : "bg-black/40 border border-white/10"
          )}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Available Resources</h2>
              <Link to="/resources" className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                <span className="mr-1">View All</span>
                <ArrowRight size={14} />
              </Link>
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
                    type="offer"
                    category={resource.category}
                    title={resource.title}
                    description={resource.description}
                    location={resource.location}
                    locationDetails={resource.locationDetails}
                    contact={resource.contact}
                    contactName={resource.contactName}
                    urgent={resource.urgent}
                    requestId={resource.id}
                    isRequested={user?.id && user.role === 'victim' && respondedRequestIds.has(resource.id)}
                    className="rounded-2xl"
                  />
                ))
              ) : (
                <div className="col-span-2 p-6 border border-white/10 rounded-2xl text-center">
                  <p className="text-gray-400">No resources available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </AnimatedTransition>
        
        {myRequests.length > 0 && (
          <AnimatedTransition className="mb-6" delay={150}>
            <div className={cn(
              "p-6 rounded-2xl backdrop-blur-sm transition-all duration-300",
              isLight
                ? "bg-white/80 border border-gray-200 shadow-soft"
                : "bg-black/40 border border-white/10"
            )}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">My Requests</h2>
                <Link to="/victim-resources" className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                  <span className="mr-1">View All</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myRequests.map(resource => (
                  <ResourceCard
                    key={resource.id}
                    type="need"
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
            </div>
          </AnimatedTransition>
        )}
        
        <AnimatedTransition delay={200}>
          <div className={cn(
            "p-6 rounded-2xl backdrop-blur-sm transition-all duration-300",
            isLight
              ? "bg-white/80 border border-gray-200 shadow-soft"
              : "bg-black/40 border border-white/10"
          )}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Status Updates</h2>
              <Link to="/alerts" className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                <span className="mr-1">View All</span>
                <ArrowRight size={14} />
              </Link>
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
          </div>
        </AnimatedTransition>
      </div>
      
      <div>
        <AnimatedTransition className="mb-6" delay={150}>
          <div className={cn(
            "p-6 rounded-2xl backdrop-blur-sm transition-all duration-300",
            isLight
              ? "bg-white/80 border border-gray-200 shadow-soft"
              : "bg-black/40 border border-white/10"
          )}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Emergency Contacts</h2>
              <button 
                onClick={() => setShowAllContacts(true)}
                className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
              >
                <span className="mr-1">View All</span>
                <ArrowRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              <EmergencyContact
                name="Emergency Response"
                role="Coordination Center"
                phone="555-911"
                contactId="emergency-1"
                available={true}
              />
              
              <EmergencyContact
                name="Dr. Sarah Johnson"
                role="Medical Coordinator"
                phone="555-123-7890"
                contactId="medical-1"
                available={true}
              />
            </div>
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition delay={250}>
          <div className={cn(
            "rounded-2xl backdrop-blur-sm transition-all duration-300",
            isLight
              ? "bg-white/80 border border-gray-200 shadow-soft"
              : "bg-black/40 border border-white/10"
          )}>
            <LocationFinder />
          </div>
        </AnimatedTransition>
      </div>
      
      <EmergencyContactsDialog 
        open={showAllContacts} 
        onOpenChange={setShowAllContacts} 
      />
    </div>
  );
};

export default VictimDashboard;
