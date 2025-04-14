import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Resources from '@/pages/Resources';
import Map from '@/pages/Map';
import Alerts from '@/pages/Alerts';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import ChatSection from '@/pages/ChatSection';
import ForgotPassword from '@/pages/ForgotPassword';
import AdminDashboard from '@/pages/AdminDashboard';
import VolunteerDashboard from '@/components/dashboards/VolunteerDashboard';
import NGODashboard from '@/components/dashboards/NGODashboard';
import GovernmentDashboard from '@/components/dashboards/GovernmentDashboard';
import VictimDashboard from '@/components/dashboards/VictimDashboard';
import LandingPage from '@/pages/LandingPage';
import ResourceDetails from '@/pages/ResourceDetails';
import CommandCenter from '@/pages/CommandCenter';
import RecoveryPlan from '@/pages/RecoveryPlan';
import Reports from '@/pages/Reports';
import EmergencyPlan from '@/pages/EmergencyPlan';
import NotFound from '@/pages/NotFound';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/map" element={<Map />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chat/:contactId" element={<ChatSection />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/ngo-dashboard" element={<NGODashboard />} />
        <Route path="/government-dashboard" element={<GovernmentDashboard />} />
        <Route path="/victim-dashboard" element={<VictimDashboard />} />
        <Route path="/resource/:id" element={<ResourceDetails />} />
        <Route path="/command-center" element={<CommandCenter />} />
        <Route path="/recovery-plan" element={<RecoveryPlan />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/emergency-plan" element={<EmergencyPlan />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
