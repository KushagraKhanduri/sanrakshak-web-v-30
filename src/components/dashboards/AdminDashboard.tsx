
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, AlertCircle, BarChart3, Clock, Users } from 'lucide-react';
import useResourceData from '@/hooks/useResourceData';

interface AdminDashboardProps {
  resourceData?: ReturnType<typeof useResourceData>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ resourceData }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Manage emergency response resources and operations</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 bg-gradient-to-br from-indigo-500/20 to-indigo-700/20 border-indigo-500/50">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-indigo-500/20 mr-4">
              <Users className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Users</p>
              <h3 className="text-2xl font-bold">2,543</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-500/20 to-amber-700/20 border-amber-500/50">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-amber-500/20 mr-4">
              <AlertCircle className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Alerts</p>
              <h3 className="text-2xl font-bold">17</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-rose-500/20 to-rose-700/20 border-rose-500/50">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-rose-500/20 mr-4">
              <Clock className="h-6 w-6 text-rose-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Response Time</p>
              <h3 className="text-2xl font-bold">4.2 min</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 border-emerald-500/50">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-emerald-500/20 mr-4">
              <Activity className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Resources Active</p>
              <h3 className="text-2xl font-bold">83%</h3>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4">System Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Health</p>
                  <p className="text-sm text-gray-400">All systems operational</p>
                </div>
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                  Operational
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Latest Deployment</p>
                  <p className="text-sm text-gray-400">v2.4.1 - 2 hours ago</p>
                </div>
                <div className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">
                  Success
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Database Status</p>
                  <p className="text-sm text-gray-400">4ms response time</p>
                </div>
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                  Healthy
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">API Performance</p>
                  <p className="text-sm text-gray-400">98.7% uptime</p>
                </div>
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                  Excellent
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts">
          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4">Alert Management</h3>
            <p className="text-gray-400">Manage and send emergency alerts to affected areas.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4">Resource Allocation</h3>
            <p className="text-gray-400">Distribute and track emergency resources across regions.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4">User Management</h3>
            <p className="text-gray-400">Manage system users, permissions and roles.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
