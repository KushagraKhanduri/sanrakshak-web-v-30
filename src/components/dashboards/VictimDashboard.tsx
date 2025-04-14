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
import { ElegantShape } from '../ui/DashboardBackground';

interface VictimDashboardProps {
  resourceData?: ReturnType<typeof useResourceData>;
}

const VictimDashboard: React.FC<VictimDashboardProps> = ({ resourceData }) => {
  const { resources, responses, loading } = resourceData || useResourceData();
  const [user, setUser] = useState<any>(null);
  const [showAllContacts, setShowAllContacts] = useState(false);
  
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
    <div className="relative min-h-screen w-full flex flex-col bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-purple-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-blue-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-purple-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-sky-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-teal-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-orange-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8">
        <AnimatedTransition>
          <div className="relative overflow-hidden glass-dark rounded-xl border border-white/10 p-4 sm:p-6 transition-transform duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-4 sm:mb-0 sm:mr-6">
                <div className="mb-2">
                  <h2 className="text-xl font-semibold">Need Help?</h2>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Request emergency assistance, find shelter, or access resources. Our priority is keeping you safe.
                </p>
                <div className="flex items-center text-xs text-gray-400">
                  <Info size={12} className="mr-1" />
                  <span>Your safety is our top priority</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Link to="/resources" className="px-4 py-2 rounded-full text-sm bg-white text-black hover:bg-white/90 transition-colors">
                  Request Help
                </Link>
                <Link to="/shelter-map" className="px-4 py-2 rounded-full text-sm bg-white/10 hover:bg-white/15 transition-colors">
                  Find Shelter
                </Link>
              </div>
            </div>
          </div>
        </AnimatedTransition>
      </div>
      
      <div className="w-full px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnimatedTransition className="mb-6" delay={100}>
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
          </AnimatedTransition>
          
          {myRequests.length > 0 && (
            <AnimatedTransition className="mb-6" delay={150}>
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
            </AnimatedTransition>
          )}
          
          <AnimatedTransition delay={200}>
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
          </AnimatedTransition>
        </div>
        
        <div>
          <AnimatedTransition className="mb-6" delay={150}>
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
          </AnimatedTransition>
          
          <AnimatedTransition delay={250}>
            <LocationFinder />
          </AnimatedTransition>
        </div>
      </div>
      
      <EmergencyContactsDialog 
        open={showAllContacts} 
        onOpenChange={setShowAllContacts} 
      />
    </div>
  );
};

export default VictimDashboard;
