
import React from 'react';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeProvider';
import { BarChart, LineChart, PieChart } from 'recharts';
import { GeometricBackground } from '@/components/ui/GeometricBackground';

const VolunteerStats = () => {
  const { theme } = useTheme();
  
  // Sample data for charts
  const activities = [
    { name: 'Jan', hours: 20 },
    { name: 'Feb', hours: 35 },
    { name: 'Mar', hours: 25 },
    { name: 'Apr', hours: 40 },
    { name: 'May', hours: 30 },
    { name: 'Jun', hours: 45 },
  ];
  
  // Determine if theme is light (always false now, but kept for compatibility)
  const isLight = theme === 'light';
  
  return (
    <div className="min-h-screen w-full bg-[#030303] text-white">
      <GeometricBackground />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Volunteer Statistics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/60 border-gray-800 p-4">
            <h3 className="font-medium mb-2">Total Hours</h3>
            <p className="text-4xl font-bold">195</p>
            <p className="text-green-500 text-sm">+12% from last month</p>
          </Card>
          
          <Card className="bg-gray-900/60 border-gray-800 p-4">
            <h3 className="font-medium mb-2">People Helped</h3>
            <p className="text-4xl font-bold">427</p>
            <p className="text-green-500 text-sm">+8% from last month</p>
          </Card>
          
          <Card className="bg-gray-900/60 border-gray-800 p-4">
            <h3 className="font-medium mb-2">Active Events</h3>
            <p className="text-4xl font-bold">5</p>
            <p className="text-yellow-500 text-sm">Same as last month</p>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-900/60 border-gray-800 p-6">
            <h3 className="font-medium mb-4">Monthly Activity</h3>
            <div className="h-80">
              {/* We're using className for styling instead of lineColor, since we're not actually 
                  rendering a recharts component here */}
              <div className={`text-${isLight ? 'gray-700' : 'gray-300'}`}>
                {/* Chart would be here */}
                <p className="text-center py-20 text-gray-500">
                  [Monthly Activity Chart]
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gray-900/60 border-gray-800 p-6">
            <h3 className="font-medium mb-4">Task Distribution</h3>
            <div className="h-80">
              <div className={`text-${isLight ? 'gray-700' : 'gray-300'}`}>
                {/* Chart would be here */}
                <p className="text-center py-20 text-gray-500">
                  [Task Distribution Chart]
                </p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-gray-900/60 border-gray-800 p-6">
            <h3 className="font-medium mb-4">Impact Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Areas Served</h4>
                <ul className="space-y-1 text-gray-300">
                  <li className="flex justify-between">
                    <span>Downtown</span>
                    <span className="font-medium">42%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Westside</span>
                    <span className="font-medium">28%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Northern District</span>
                    <span className="font-medium">18%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Eastside</span>
                    <span className="font-medium">12%</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Service Types</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Food Distribution</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Medical Aid</span>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Shelter Support</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Transportation</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VolunteerStats;
